import React from 'react'
import Welcomesection from '../components/Welcomesection'
import Statcard from '../components/Statcard'
import Quickactioncard from '../components/Quickactioncard'
const Dashboard = (props) => {
    const activestudents=props.student.filter(
        (student)=>student.status==="Active"
    );
    const inactivestudent=props.student.filter(
        (student)=>student.status==="Inactive"
    );
    const stats=[
        {
            title:'Total Students',
            logo:'https://static.vecteezy.com/system/resources/previews/017/395/385/original/google-contacts-icon-free-png.png',
            num:props.student.length,
            discription:'Registered students'
        },
        {
            title:'Active Students',
            logo:'https://img.freepik.com/premium-vector/business-growth-chart-red-blue-icon_1076610-56990.jpg',
            num:activestudents.length,
            discription:'60% of total'
        },
        {
            title:'Inactive Students',
            logo:'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png',
            num:inactivestudent.length,
            discription:'Need attention'
        },
        {
            title:'Total courses',
            logo:'https://png.pngtree.com/png-clipart/20230801/original/pngtree-open-book-logo-icon-page-picture-image_7810228.png',
            num:props.courses.length,
            discription:'Availible courses'
        }
    ]
    
  return (
    <div className='px-16 pt-5'>
     <Welcomesection /> 
     <div className='flex gap-10'>
     {stats.map((function(elem){
      return  <Statcard title={elem.title} logo={elem.logo} num={elem.num} discription={elem.discription} />
     }))}
     </div>
     <Quickactioncard />
    </div>
  )
}

export default Dashboard
