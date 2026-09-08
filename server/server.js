import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_management_system'

app.use(cors())
app.use(express.json())

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

app.delete('/api/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) return res.status(404).json({ message: 'Student not found.' })
    res.json({ message: 'Student deleted.' })
  } catch (error) { next(error) }
})

app.get('/api/courses', async (_req, res, next) => {
  try { res.json(await Course.find().sort({ name: 1 })) } catch (error) { next(error) }
})

app.post('/api/courses', async (req, res, next) => {
  try {
    if (!req.body.name?.trim()) return res.status(400).json({ message: 'Course name is required.' })
    res.status(201).json(await Course.create({ name: req.body.name.trim() }))
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'That course already exists.' })
    next(error)
  }
})

app.delete('/api/courses/:id', async (req, res, next) => {
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
