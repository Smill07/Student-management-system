import React, { useState } from 'react'

const Courseswelcome = (props) => {
  const[inpcourse,setInpcourse]=useState('')
  const addcourse=()=>{ if (inpcourse.trim()) { props.addCourse(inpcourse); setInpcourse('') } }
  return (
     <div>
        <div className='flex justify-between items-center mb-8'>
      <div className='rounded-2xl bg-blue-500 flex-col px-5 py-3 w-1/2'>
      <h1 className='text-white font-medium text-2xl'>Manage courses</h1>
      <p className='text-gray-300'>View and edit course information</p>
      </div>
    {props.isAdmin && <button onClick={()=>{props.setShowform(true)}} className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md">
  + Add Course
</button>}
<div>
  {props.showform &&  (
  <div className='flex gap-2'>
    <input
      type="text"
      placeholder="Enter course name"
     className='border border-gray-200 rounded-xl px-3 py-3 w-1/2'
     value={inpcourse}
     onChange={(e)=>{setInpcourse(e.target.value)}}
    />

    <button onClick={addcourse} className="bg-blue-600 text-white px-3.5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200" >Add</button>

    <button  className="bg-white text-gray-600 border border-gray-200 px-3.5 py-2.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200" onClick={() => props.setShowform(false)}>
      Cancel
    </button>
  </div>
)}
</div>
    </div>
    </div>
  )
}

export default Courseswelcome
