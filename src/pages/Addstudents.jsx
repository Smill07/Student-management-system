import React from 'react'
import Addstudentwelcome from '../components/Addstudentwelcome'
import Addstudentform from '../components/Addstudentform'
const Addstudents = (props) => {
  return (
    <div className='px-16 pt-5'>
    <Addstudentwelcome />
    <Addstudentform student={props.student} setStudent={props.setStudent} />  
    </div>
  )
}

export default Addstudents
