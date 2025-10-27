import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='bg-slate-900 text-white'>
        <div className='container mx-auto flex justify-between items-center h-14 px-5'>
        <div className='text-2xl font-bold'>
                <span className='text-purple-700'>&lt;</span>
                Pass<span className='text-purple-700'>Reaper/</span>
                <span className='text-purple-700'>&gt;</span></div>
        <div>
            <ul className='flex gap-3'>
                <li><a href='#' className='font-semibold hover:font-bold text-white'>Home</a></li>
                <li><a href='#' className='font-semibold hover:font-bold text-white'>About</a></li>
            </ul>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
