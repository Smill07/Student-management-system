import React from 'react'
import Studenttableheader from '../components/Studenttableheader'
import Studenttablerow from '../components/Studenttablerow'
const Studenttable = (props) => {
    
  return (
    <div>
     <Studenttableheader />
     {props.student.map(function(student){
     return <Studenttablerow key={student._id} student={student} deleteStudent={props.deleteStudent}/>
     })}
    </div>
  )
}

export default Studenttable
