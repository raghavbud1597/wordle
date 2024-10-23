"use client";

import  useTheme  from '../hooks/useTheme';

import React from 'react'

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex items-center justify-center w-100 border-b-2 py-2 border-black dark:border-white '>
        <span className='font-secondary text-black text-4xl font-bold dark:text-white'>Wordle</span>
        <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800">
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
    </div>
  )
}

export default Navbar