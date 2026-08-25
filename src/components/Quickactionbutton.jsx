import React from 'react'
import {Users} from 'lucide-react'
import {Link} from 'react-router-dom'
const Quickactionbutton = (props) => {
  return (
    <Link className='bg-white rounded-xl py-5 shadow-sm w-1/3 text-left px-3 hover:shadow-lg hover:border-gray-400 transition-all' to={props.path}>
     {props.logo}
     <h2 className='font-medium text-l mt-1'>{props.title}</h2>
     <p className='text-sm text-gray-500'>{props.discription}</p> 
    </Link>
  )
}

export default Quickactionbutton
