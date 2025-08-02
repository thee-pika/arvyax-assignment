import Image from 'next/image';
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between p-4 bg-[#020f08] text-white'>

      <div className="flex items-center gap-2 w-1/4">
        <Image src="/icon.png" alt="logo" width={50} height={50} />
        <h1 className="font-bold text-xl">Verdantia</h1>
      </div>
      <span className='text-gray-500 mr-8'> &copy; 2025 All Rights Reserved</span>
    </div>
  )
}

export default Footer;
