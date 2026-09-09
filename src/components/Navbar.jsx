import React from 'react'

const Navbar = ({ studentCount, user, onSignOut }) => {
  return (
    <div className=' flex justify-between px-19 py-3 items-center shadow-sm'>
        <div className='flex items-center gap-2'>
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
  <span className="text-white text-[11px] font-bold tracking-wide">
    SMS
  </span>
</div>
    <div className='flex flex-col' >
      <h3 className='font-bold text-lg'>Student Management System</h3>
      <p className='text-xs text-gray-400'>Manage your studies efficiently</p>
      </div>
      </div>
      <div className="flex items-center gap-4"><p className='text-xs text-gray-400'>{studentCount} Students registered</p><span className="text-sm text-slate-600">{user?.name} <span className="text-xs text-slate-400">({user?.role})</span></span><button onClick={onSignOut} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs">Sign out</button></div>
    </div>
  )
}

export default Navbar
