import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api'

const Studentdetails = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { api.getStudent(id).then(setStudent).catch((err) => setError(err.message)) }, [id])
  if (error) return <p className="px-16 pt-8 text-red-700">{error}</p>
  if (!student) return <p className="px-16 pt-8">Loading student...</p>
  return <div className="px-16 pt-5"><div className="rounded-2xl bg-blue-500 px-8 py-5 text-white"><h1 className="text-2xl font-medium">Student details</h1><p className="text-blue-100">Full record for {student.name}</p></div><div className="mt-6 rounded-2xl border border-gray-200 p-6"><p><span className="font-medium">Name:</span> {student.name}</p><p className="mt-3"><span className="font-medium">Email:</span> {student.email}</p><p className="mt-3"><span className="font-medium">Course:</span> {student.course}</p><p className="mt-3"><span className="font-medium">Status:</span> {student.status}</p><div className="mt-6 flex gap-3"><Link to={`/students/${student._id}/edit`} className="rounded-xl bg-blue-600 px-5 py-2.5 text-white">Edit</Link><Link to="/students" className="rounded-xl border border-gray-200 px-5 py-2.5">Back</Link></div></div></div>
}
export default Studentdetails
