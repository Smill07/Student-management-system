import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Addstudents from './pages/Addstudents'
import Courses from './pages/Courses'
import {Route,Routes} from 'react-router-dom'
const App = () => {
  const[student,setStudent]=useState([])
  const deletestu=(index)=>{
     const copyStudent=[...student];
     copyStudent.splice(index,1);
     setStudent(copyStudent);  
    } 
  return (
    <div>
     <Navbar />
     <Center />
    <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/students' element={<Students student={student} deletestu={deletestu} />} />
    <Route path='/addstudents' element={<Addstudents student={student} setStudent={setStudent} />} />
    <Route path='/courses' element={<Courses/>}/>
     </Routes>
    </div>
  )
}

export default App
