import React from 'react'
import {Users} from 'lucide-react'
import { Link } from 'react-router-dom'
const Studentwelcome = () => {
  return (
    <div>
        <div className='flex justify-between items-center mb-8'>
      <div className='rounded-2xl bg-blue-500 flex-col px-5 py-3 w-1/2'>
      <h1 className='text-white font-medium text-2xl'>Students</h1>
      <p className='text-gray-300'>Manage and view all registered students</p>
      </div>
      <Link to='/addstudents'>
    <button className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md">
  + Add Student
</button>
</Link>
    </div>
    </div>
  )
}

export default Studentwelcome
