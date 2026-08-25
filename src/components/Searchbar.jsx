import React from 'react'
import {Search} from 'lucide-react'
const Searchbar = () => {
  return (
    <div className="flex gap-4 mt-6">
  <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm flex-1">
    <Search size={20} className="text-gray-400" />

    <input
      type="text"
      placeholder="Search students..."
      className="w-full outline-none text-sm"
    />
  </div>

  <select className="border border-gray-200 rounded-xl px-4 py-3 bg-white text-sm text-gray-600 outline-none shadow-sm">
    <option>All Students</option>
    <option>Active</option>
    <option>Inactive</option>
  </select>
</div>
  )
}

export default Searchbar
