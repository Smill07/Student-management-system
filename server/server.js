import 'dotenv/config'
import crypto from 'node:crypto'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_management_system'

app.disable('x-powered-by')
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use((req, _res, next) => { req.cookies = Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map((part) => { const [key, ...value] = part.trim().split('='); return [key, decodeURIComponent(value.join('='))] })); next() })
app.use((_req, res, next) => { res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('X-Frame-Options', 'DENY'); res.setHeader('Referrer-Policy', 'no-referrer'); next() })

const jwtSecret = process.env.JWT_SECRET || 'development-only-change-this-secret'
const isProduction = process.env.NODE_ENV === 'production'
const refreshTtl = 7 * 24 * 60 * 60
const attempts = new Map()
app.use('/api/auth', (req, res, next) => { const key = req.ip || 'unknown'; const now = Date.now(); const recent = (attempts.get(key) || []).filter((time) => now - time < 15 * 60 * 1000); if (recent.length >= 20) return res.status(429).json({ message: 'Too many authentication attempts. Try again later.' }); recent.push(now); attempts.set(key, recent); next() })

const userSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, maxlength: 80 }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true }, role: { type: String, enum: ['admin', 'staff'], default: 'staff' } }, { timestamps: true })
const refreshSchema = new mongoose.Schema({ tokenHash: { type: String, unique: true }, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, expiresAt: { type: Date, required: true }, revokedAt: Date }, { timestamps: true })
const User = mongoose.model('User', userSchema)
const RefreshToken = mongoose.model('RefreshToken', refreshSchema)
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex')
const passwordRecord = (password, salt = crypto.randomBytes(16).toString('hex')) => new Promise((resolve, reject) => crypto.scrypt(password, salt, 64, (err, derived) => err ? reject(err) : resolve(`${salt}:${derived.toString('hex')}`)))
const verifyPassword = (password, record) => new Promise((resolve, reject) => { const [salt, expected] = record.split(':'); crypto.scrypt(password, salt, 64, (err, derived) => err ? reject(err) : resolve(crypto.timingSafeEqual(Buffer.from(expected, 'hex'), derived))) })
const b64 = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
const signAccess = (user) => { const h = b64({ alg: 'HS256', typ: 'JWT' }); const p = b64({ sub: user._id.toString(), role: user.role, name: user.name, exp: Math.floor(Date.now() / 1000) + 900 }); const input = `${h}.${p}`; return `${input}.${crypto.createHmac('sha256', jwtSecret).update(input).digest('base64url')}` }
const readAccess = (token) => { try { const [h, p, signature] = token.split('.'); const expected = crypto.createHmac('sha256', jwtSecret).update(`${h}.${p}`).digest('base64url'); if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null; const payload = JSON.parse(Buffer.from(p, 'base64url')); return payload.exp > Date.now() / 1000 ? payload : null } catch { return null } }
const issueRefresh = async (user) => { const token = crypto.randomBytes(48).toString('base64url'); await RefreshToken.create({ tokenHash: hash(token), user: user._id, expiresAt: new Date(Date.now() + refreshTtl * 1000) }); return token }
const cookieSameSite = process.env.COOKIE_SAMESITE || (isProduction ? 'None' : 'Lax')
const setRefreshCookie = (res, token) => res.setHeader('Set-Cookie', `refreshToken=${encodeURIComponent(token)}; Max-Age=${refreshTtl}; Path=/api/auth; HttpOnly; SameSite=${cookieSameSite}${isProduction ? '; Secure' : ''}`)
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role })
const auth = (req, res, next) => { const user = readAccess((req.headers.authorization || '').replace('Bearer ', '')); if (!user) return res.status(401).json({ message: 'Authentication required.' }); req.user = user; next() }
const adminOnly = (req, res, next) => req.user.role === 'admin' ? next() : res.status(403).json({ message: 'Administrator access required.' })

app.post('/api/auth/signup', async (req, res, next) => { try { const { name, email, password } = req.body; if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !password || password.length < 8) return res.status(400).json({ message: 'Name, valid email, and a password of at least 8 characters are required.' }); const role = await User.exists({}) ? 'staff' : 'admin'; const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash: await passwordRecord(password), role }); setRefreshCookie(res, await issueRefresh(user)); res.status(201).json({ accessToken: signAccess(user), user: publicUser(user) }) } catch (error) { if (error.code === 11000) return res.status(409).json({ message: 'An account with that email already exists.' }); next(error) } })
app.post('/api/auth/login', async (req, res, next) => { try { const user = await User.findOne({ email: req.body.email?.toLowerCase().trim() }); if (!user || !(await verifyPassword(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' }); setRefreshCookie(res, await issueRefresh(user)); res.json({ accessToken: signAccess(user), user: publicUser(user) }) } catch (error) { next(error) } })
app.post('/api/auth/refresh', async (req, res, next) => { try { const current = await RefreshToken.findOne({ tokenHash: hash(req.cookies.refreshToken || ''), revokedAt: null, expiresAt: { $gt: new Date() } }).populate('user'); if (!current) return res.status(401).json({ message: 'Refresh token expired or revoked.' }); current.revokedAt = new Date(); await current.save(); setRefreshCookie(res, await issueRefresh(current.user)); res.json({ accessToken: signAccess(current.user), user: publicUser(current.user) }) } catch (error) { next(error) } })
app.post('/api/auth/logout', async (req, res, next) => { try { if (req.cookies.refreshToken) await RefreshToken.updateOne({ tokenHash: hash(req.cookies.refreshToken), revokedAt: null }, { revokedAt: new Date() }); res.setHeader('Set-Cookie', `refreshToken=; Max-Age=0; Path=/api/auth; HttpOnly; SameSite=${cookieSameSite}${isProduction ? '; Secure' : ''}`); res.status(204).end() } catch (error) { next(error) } })

app.use('/api', (req, res, next) => req.path.startsWith('/auth') ? next() : auth(req, res, next))

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  course: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
}, { timestamps: true })

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true })

const Student = mongoose.model('Student', studentSchema)
const Course = mongoose.model('Course', courseSchema)

const validateStudent = (body) => {
  const { name, email, course, status } = body
  if (!name?.trim() || !email?.trim() || !course?.trim() || !['Active', 'Inactive'].includes(status)) {
    return 'Name, email, course, and a valid status are required.'
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please provide a valid email address.'
  return null
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/api/students', async (_req, res, next) => {
  try { res.json(await Student.find().sort({ createdAt: -1 })) } catch (error) { next(error) }
})

app.get('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) return res.status(404).json({ message: 'Student not found.' })
    res.json(student)
  } catch (error) { next(error) }
})

app.post('/api/students', async (req, res, next) => {
  try {
    const message = validateStudent(req.body)
    if (message) return res.status(400).json({ message })
    res.status(201).json(await Student.create(req.body))
  } catch (error) { next(error) }
})

app.put('/api/students/:id', async (req, res, next) => {
  try {
    const message = validateStudent(req.body)
    if (message) return res.status(400).json({ message })
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!student) return res.status(404).json({ message: 'Student not found.' })
    res.json(student)
  } catch (error) { next(error) }
})

app.delete('/api/students/:id', adminOnly, async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) return res.status(404).json({ message: 'Student not found.' })
    res.json({ message: 'Student deleted.' })
  } catch (error) { next(error) }
})

app.get('/api/courses', async (_req, res, next) => {
  try { res.json(await Course.find().sort({ name: 1 })) } catch (error) { next(error) }
})

app.post('/api/courses', adminOnly, async (req, res, next) => {
  try {
    if (!req.body.name?.trim()) return res.status(400).json({ message: 'Course name is required.' })
    res.status(201).json(await Course.create({ name: req.body.name.trim() }))
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'That course already exists.' })
    next(error)
  }
})

app.delete('/api/courses/:id', adminOnly, async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    await Student.updateMany({ course: course.name }, { $set: { course: '' } })
    res.json({ message: 'Course deleted.' })
  } catch (error) { next(error) }
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

mongoose.connect(mongoUri)
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message)
    process.exit(1)
  })
