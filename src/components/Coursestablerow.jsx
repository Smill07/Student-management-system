import React from 'react'

const Coursestablerow = () => {
    const data=[
        {
            cname:'Btech',
            students:42
        },
        {
            cname:'BBA',
            students:32,
        },
        {
            cname:'BCA',
            students:19
        }
    ]

  return (
  <>
     {data.map(function(elem){
        return(
        <div className='flex px-6 py-4 border-b border-gray-100'>
            <div className='w-2/5'>{elem.cname}
            </div>
        <div className='w-2/5 text-gray-500' >
            {elem.students}
        </div>
        <div>
            <button className='1/5 border border-gray-200 py-1.5 px-3 hover:shadow-lg hover:border-gray-300 transition-all rounded-3xl'>Delete</button>
        </div>
        </div>
        )
     })}
   </>
  )
}

export default Coursestablerow
