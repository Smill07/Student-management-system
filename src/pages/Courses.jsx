import React, { useState } from 'react'
import Courseswelcome from '../components/Courseswelcome'
import Coursestableheader from '../components/Coursestableheader'
import Coursestablerow from '../components/Coursestablerow'
const Courses = (props) => {
  const[showform,setShowform]=useState(false)
  return (
    <div className='px-16 pt-5'>
     <Courseswelcome showform={showform} setShowform={setShowform} courses={props.courses} setCourses={props.setCourses} />
     <Coursestableheader/>
     <Coursestablerow courses={props.courses} setCourses={props.setCourses} deletecourse={props.deletecourse}/>
    </div>
  )
}

export default Courses