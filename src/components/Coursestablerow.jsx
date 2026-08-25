import React from 'react'

const Coursestablerow = (props) => {
  return (
  <>
     {props.courses.map(function(elem,idx){
        return(
        <div key={idx} className='flex px-6 py-4 border-b border-gray-100'>
            <div className='w-2/5'>{elem}
            </div>
        <div className='w-2/5 text-gray-500' >
            20
        </div>
        <div>
            <button onClick={()=>props.deletecourse(idx)} className=' border border-gray-200 py-1.5 px-3 hover:shadow-lg hover:border-gray-300 transition-all rounded-3xl'>Delete</button>
        </div>
        </div>
        )
     })}
   </>
  )
}

export default Coursestablerow
