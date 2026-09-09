import { useState } from 'react'
import Courseswelcome from '../components/Courseswelcome'
import Coursestableheader from '../components/Coursestableheader'
import Coursestablerow from '../components/Coursestablerow'
import { api } from '../api'
import { useAuth } from '../auth'
const Courses = ({ courses, students, onChanged }) => {
  const { user } = useAuth()
  const [showform, setShowform] = useState(false); const [error, setError] = useState('')
  const addCourse = async (name) => { try { await api.createCourse(name); setShowform(false); setError(''); await onChanged() } catch (err) { setError(err.message) } }
  const deleteCourse = async (id) => { if (!window.confirm('Delete this course?')) return; try { await api.deleteCourse(id); await onChanged() } catch (err) { setError(err.message) } }
  return <div className="px-16 pt-5"><Courseswelcome isAdmin={user?.role === 'admin'} showform={showform} setShowform={setShowform} addCourse={addCourse} />{error && <p className="mt-3 text-sm text-red-700">{error}</p>}<Coursestableheader /><Coursestablerow courses={courses} students={students} deleteCourse={deleteCourse} isAdmin={user?.role === 'admin'} /></div>
}
export default Courses
