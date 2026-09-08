const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Request failed.')
  return data
}

export const api = {
  getStudents: () => request('/students'),
  getStudent: (id) => request(`/students/${id}`),
  createStudent: (student) => request('/students', { method: 'POST', body: JSON.stringify(student) }),
  updateStudent: (id, student) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(student) }),
  deleteStudent: (id) => request(`/students/${id}`, { method: 'DELETE' }),
  getCourses: () => request('/courses'),
  createCourse: (name) => request('/courses', { method: 'POST', body: JSON.stringify({ name }) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
}
