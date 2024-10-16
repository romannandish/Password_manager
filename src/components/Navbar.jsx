import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[black] flex p-5 justify-between md:px-20 text-white'>
        <div className="logo flex font-bold text-xl ">

       Passop

        </div>
        <ul className='flex gap-5 text-lg'>
            <li className='hover:text-gray-600  hover:text-xl' >Home</li >
            <li className='hover:text-gray-600  hover:text-xl'>About</li >
            <li className='hover:text-gray-600  hover:text-xl'>Contact</li >
        </ul>
    </nav>
  )
}

export default Navbar
