const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
let accessToken = ''
let refreshing = null

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...options.headers },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  if (response.status === 401 && path !== '/auth/refresh' && path !== '/auth/login' && path !== '/auth/signup') { refreshing ||= request('/auth/refresh'); try { const session = await refreshing; accessToken = session.accessToken; refreshing = null; return request(path, options) } catch (err) { refreshing = null; throw err } }
  if (!response.ok) throw new Error(data.message || 'Request failed.')
  return data
}

export const api = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }).then((data) => { accessToken = data.accessToken; return data }),
  signup: (credentials) => request('/auth/signup', { method: 'POST', body: JSON.stringify(credentials) }).then((data) => { accessToken = data.accessToken; return data }),
  refresh: () => request('/auth/refresh').then((data) => { accessToken = data.accessToken; return data }),
  logout: () => request('/auth/logout', { method: 'POST' }).then(() => { accessToken = '' }),
  getStudents: () => request('/students'),
  getStudent: (id) => request(`/students/${id}`),
  createStudent: (student) => request('/students', { method: 'POST', body: JSON.stringify(student) }),
  updateStudent: (id, student) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(student) }),
  deleteStudent: (id) => request(`/students/${id}`, { method: 'DELETE' }),
  getCourses: () => request('/courses'),
  createCourse: (name) => request('/courses', { method: 'POST', body: JSON.stringify({ name }) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
}
