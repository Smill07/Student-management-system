import { useMemo, useState } from 'react'
import Studentwelcome from '../components/Studentwelcome'
import Searchbar from '../components/Searchbar'
import Studenttable from '../components/Studenttable'

const Students = ({ student, deleteStudent }) => {
  const [query, setQuery] = useState(''); const [status, setStatus] = useState('All Students')
  const filtered = useMemo(() => student.filter((item) => {
    const matchesText = `${item.name} ${item.email} ${item.course}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (status === 'All Students' || item.status === status)
  }), [student, query, status])
  return <div className="px-16 pt-5"><Studentwelcome /><Searchbar query={query} setQuery={setQuery} status={status} setStatus={setStatus} /><Studenttable student={filtered} deleteStudent={deleteStudent} /></div>
}
export default Students
