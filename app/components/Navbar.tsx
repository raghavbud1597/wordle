import React from 'react'

const Navbar: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-100 border-b-2 py-2 border-black dark:border-white '>
        <span className='font-secondary text-black text-4xl font-bold dark:text-white'>Wordle</span>
    </div>
  )
}

export default Navbar