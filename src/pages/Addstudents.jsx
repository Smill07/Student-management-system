import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Addstudentwelcome from '../components/Addstudentwelcome'
import { api } from '../api'

const emptyForm = { name: '', email: '', course: '', status: '' }
const Addstudents = ({ courses, onSaved }) => {
  const { id } = useParams(); const navigate = useNavigate(); const [form, setForm] = useState(emptyForm); const [error, setError] = useState('')
  useEffect(() => { if (id) api.getStudent(id).then(setForm).catch((err) => setError(err.message)) }, [id])
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.course || !form.status) { setError('Please complete every field with a valid email address.'); return }
    try { if (id) await api.updateStudent(id, form); else await api.createStudent(form); await onSaved(); navigate('/students') } catch (err) { setError(err.message) }
  }
  return <div className="px-16 pt-5"><Addstudentwelcome editing={Boolean(id)} /><div className="mt-8 rounded-2xl border border-gray-200 px-10 py-6"><form onSubmit={submit}><h2 className="text-lg font-medium">Student Information</h2>{error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<label className="mt-5 block text-sm font-medium">Student Name<input name="name" value={form.name} onChange={update} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3" placeholder="Enter student's full name" /></label><label className="mt-5 block text-sm font-medium">Email<input name="email" value={form.email} onChange={update} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3" placeholder="Enter student's email" /></label><div className="flex gap-5"><label className="mt-5 block w-1/2 text-sm font-medium">Course<select name="course" value={form.course} onChange={update} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3"><option value="">Select a course</option>{courses.map((course) => <option key={course._id} value={course.name}>{course.name}</option>)}</select></label><label className="mt-5 block w-1/2 text-sm font-medium">Status<select name="status" value={form.status} onChange={update} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3"><option value="">Select status</option><option>Active</option><option>Inactive</option></select></label></div><div className="mt-8 flex justify-end gap-3"><button type="button" onClick={() => navigate('/students')} className="rounded-xl border border-gray-200 px-5 py-2.5 text-gray-600">Cancel</button><button className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white">{id ? 'Save changes' : 'Add student'}</button></div></form></div></div>
}
export default Addstudents
