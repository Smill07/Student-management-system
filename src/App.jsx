import { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Addstudents from './pages/Addstudents'
import Studentdetails from './pages/Studentdetails'
import Courses from './pages/Courses'
import { api } from './api'
import ProtectedRoute from './components/ProtectedRoute'
import { Login, Signup } from './pages/Auth'
import { useAuth } from './auth'

const App = () => {
  const { user, signOut, loading } = useAuth()
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [error, setError] = useState('')
  const loadData = async () => {
    try { setError(''); const [studentData, courseData] = await Promise.all([api.getStudents(), api.getCourses()]); setStudents(studentData); setCourses(courseData) }
    catch (err) { setError(err.message) }
  }
  // Load the API data once when the application starts.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (user) loadData() }, [user])
  const deleteStudent = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try { await api.deleteStudent(id); setStudents((current) => current.filter((student) => student._id !== id)) }
    catch (err) { setError(err.message) }
  }
  if (loading) return <div className="p-12 text-slate-500">Loading…</div>
  return <div>{user && <><Navbar studentCount={students.length} user={user} onSignOut={signOut} /><Center /></>}{error && <div className="mx-16 mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
  <Routes>
    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /><Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
    <Route path="/*" element={<ProtectedRoute><Routes><Route path="/" element={<Dashboard student={students} courses={courses} />} /><Route path="/students" element={<Students student={students} deleteStudent={deleteStudent} />} /><Route path="/students/:id" element={<Studentdetails />} /><Route path="/students/:id/edit" element={<Addstudents courses={courses} onSaved={loadData} />} /><Route path="/addstudents" element={<Addstudents courses={courses} onSaved={loadData} />} /><Route path="/courses" element={<Courses courses={courses} students={students} onChanged={loadData} />} /><Route path="*" element={<Navigate to="/" />} /></Routes></ProtectedRoute>} />
  </Routes></div>
}
export default App
