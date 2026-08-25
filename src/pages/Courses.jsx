import React from 'react'
import Courseswelcome from '../components/Courseswelcome'
import Coursestableheader from '../components/Coursestableheader'
import Coursestablerow from '../components/Coursestablerow'
const Courses = () => {
  return (
    <div className='px-16 pt-5'>
     <Courseswelcome />
     <Coursestableheader/>
     <Coursestablerow/>
    </div>
  )
}

export default Courses