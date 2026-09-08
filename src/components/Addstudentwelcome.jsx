import React from 'react'

const Addstudentwelcome = ({ editing = false }) => {
  return (
      <div className='flex flex-col bg-blue-500 px-8 py-5 rounded-2xl '>
      <h2 className='text-white font-medium text-2xl'>{editing ? 'Edit student' : 'Add new student'}</h2>
      <p className='text-gray-300'>{editing ? 'Update student information' : 'Register a new student in the system'}</p>
      </div>
  )
}

export default Addstudentwelcome
