import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
     <Link to='/'>
    <button className='py-1 px-6 rounded-full text-xs hover:shadow-lg hover:border-gray-400 transition-all text-gray-400 hover:text-black'>Dashboard</button>
    </Link>
    <Link to='/students'>
    <button className='py-1 px-6 rounded-full text-xs hover:shadow-lg hover:border-gray-400 transition-all text-gray-400 hover:text-black'>Students</button>
     </Link>
     <Link to='/addstudents'>
    <button className='py-1 px-6 rounded-full text-xs hover:shadow-lg hover:border-gray-400 transition-all text-gray-400 hover:text-black'>Add Students</button>
     </Link> 
    </div>
  )
}

export default Navigation
