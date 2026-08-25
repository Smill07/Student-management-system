import React from 'react'
import Studentwelcome from '../components/Studentwelcome'
import Searchbar from '../components/Searchbar'
import Studenttable from '../components/Studenttable'
const Students = (props) => {
  return (
    <div className='px-16 pt-5'>
     <Studentwelcome /> 
     <Searchbar />
     <Studenttable student={props.student} deletestu={props.deletestu} />
    </div>
  )
}

export default Students
