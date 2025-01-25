import React from 'react'
import { useAuth } from '../../context/authContext';

const Navbar = () => {
    const {user} = useAuth();
  return (
    <div className='flex justify-between text-white h-14 items-center bg-gray-800 px-5'>
      <p>Welcome {user.name}</p>
      <button className='bg-red-500 px-4 py-2 hover:bg-red-600 rounded-md'>Logout</button>
    </div>
  )
}

export default Navbar
