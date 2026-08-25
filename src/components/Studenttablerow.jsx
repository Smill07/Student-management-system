import React from 'react'

const Studenttablerow = (props) => {
  const deletehandler=()=>{
     props.deletestu(props.key)
  }
  return (
    <div className='flex items-center px-4 py-4 border-gray-100 border-b'>
     <div className='w-1/4'>{props.name}</div>
     <div className='w-1/4 text-gray-500'>{props.email}</div> 
     <div className='w-1/5'>{props.course}</div>
     <div className='w-[15%]'>{props.status}</div>
     <div className='flex gap-1 w-[15%]'>
     <button className='w-1/2 border border-gray-200 py-1.5 hover:shadow-lg hover:border-gray-300 transition-all rounded-3xl'>Edit</button>
     <button onClick={deletehandler} className='w-1/2 border border-gray-200 py-1.5 hover:shadow-lg hover:border-gray-300 transition-all rounded-3xl'>Delete</button>
     </div>
    </div>
  )
}

export default Studenttablerow
