import React from 'react'
import Quickactionbutton from './Quickactionbutton'
import {Users} from 'lucide-react'
import {GraduationCap} from 'lucide-react'
import {BookOpen} from 'lucide-react'
const Quickactioncard = () => {
   const quick=[
        {
            logo:<Users />,
            title:'View All Students',
            discription:'Browse and manage student records',
            path:'/students'
        },
        {
            logo:<GraduationCap />,
            title:'Add New Student',
            discription:'Register a new student',
            path:'/addstudents'
        },
        {
            logo:<BookOpen />,
            title:'Manage courses',
            discription:'Veiw and edit course information',
            path:'/courses'
        }
     ]
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-5 '>
     <h2 className='font-bold text-l'>Quick Actions</h2> 
     <p className='text-sm text-gray-500 mb-7'>Common tasks you might want to perform</p>
     <div className='flex gap-5'>
       {quick.map((function(elem){
        return <Quickactionbutton logo={elem.logo} title={elem.title} discription={elem.discription} path={elem.path} />
     }))} 
     </div>
    </div>
  )
}

export default Quickactioncard
