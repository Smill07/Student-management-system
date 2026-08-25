import React from 'react'

const Studenttableheader = () => {
  return (
    <div>
    <div className='flex mt-6 border-gray-200 shadow-lg  px-4 py-3 font-medium'>
     <h2 className='w-1/4'>Student</h2> 
     <h2 className='w-1/4'>Email</h2>
     <h2 className='w-1/5'>Course</h2>
     <h2 className='w-[15%]'>Status</h2>
     <h2 className='w-[15%]'>Action</h2>
     </div>
    </div>
  )
}

export default Studenttableheader
