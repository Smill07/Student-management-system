import React, { useState } from 'react'

const Addstudentform = (props) => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const[course,setCourse]=useState('')
  const[status,setStatus]=useState('')
  const addstudent=(e)=>{
        e.preventDefault();
        const copyStudent=[...props.student];
        copyStudent.push({name,email,course,status});
        props.setStudent(copyStudent);
        setName('');
        setCourse('');
        setEmail('');
        setStatus('');
  }
  return (
    <div className='border border-gray-200 mt-8 px-10 py-6 rounded-2xl' >
      <form onSubmit={(e)=>{addstudent(e)}}> 
      <h2 className='font-medium text-lg'>Student Information</h2>
      <h2 className='font-medium text-sm mt-5 ml-1.5 mb-1.5'>Student Name:</h2>
      <input value={name} onChange={(e)=>{setName(e.target.value)}} className='border border-gray-200 rounded-xl px-4 py-3 w-full' type="text" placeholder="Enter student's full name" />
      <h2 className='font-medium text-sm mt-5 ml-1.5 mb-1.5'>Email:</h2>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-full border border-gray-200 rounded-xl px-3 py-3' type="text" placeholder="Enter Student's Email" />
      <div className='flex gap-5'>
        <div className='w-1/2'>
            <h2 className='font-medium text-sm mt-5 ml-1.5 mb-1.5'>Course:</h2>
            <select value={course} onChange={(e)=>{setCourse(e.target.value)}} className='border border-gray-200 px-4 py-3 w-full rounded-xl' name="Select course" id="">
              <option value="">Select a course</option>
              {props.courses.map(function(course,idx){
                return <option key={idx} value={course}>{course}</option>
              })}
                </select>
        </div>
        <div className='w-1/2'>
            <h2 className='font-medium text-sm mt-5 ml-1.5 mb-1.5'>Status:</h2>
            <select value={status} onChange={(e)=>{setStatus(e.target.value)}} className='border border-gray-200 px-4 py-3 w-full rounded-xl'>
                <option value="">Select status</option>
                <option value='Active' >Active</option>
                <option value='Inactive' >Inactive</option>
            </select>
        </div>
      </div>
      <div className='flex justify-end gap-3 mt-8'>
        <button  className="
  bg-white
  text-gray-600
  border border-gray-200
  px-5 py-2.5
  rounded-xl
  font-medium
  hover:bg-gray-50
  hover:border-gray-300
  hover:shadow-sm
  transition-all
  duration-200
" >Cancel</button>
        <button  className="
  bg-blue-600
  text-white
  px-5 py-2.5
  rounded-xl
  font-medium
  shadow-sm
  hover:bg-blue-700
  hover:shadow-md
  transition-all
  duration-200
">Add</button>
      </div>
      </form>
    </div>
  )
}

export default Addstudentform
