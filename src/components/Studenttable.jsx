import React from 'react'
import Studenttableheader from '../components/Studenttableheader'
import Studenttablerow from '../components/Studenttablerow'
const Studenttable = (props) => {
    
  return (
    <div>
     <Studenttableheader />
     {props.student.map(function(student,idx){
     return <Studenttablerow key={idx} name={student.name} email={student.email} course={student.course} status={student.status} deletestu={props.deletestu}/>
     })}
    </div>
  )
}

export default Studenttable
