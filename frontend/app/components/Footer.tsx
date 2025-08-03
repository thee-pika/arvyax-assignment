import Image from 'next/image';
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between p-4 bg-[#93A895] text-white'>

      <div className="flex items-center gap-2 w-1/4">
        <Image src="/icon.png" alt="logo" width={50} height={50} />
        <h1 className="font-bold text-xl">Verdantia</h1>
      </div>
      <span className='text-gray-50 mr-8 flex items-center'> &copy; 2025 All Rights Reserved</span>
    </div>
  )
}

export default Footer;
