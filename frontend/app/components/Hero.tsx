import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/bg2.jpg"
        alt="hero"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <div className="absolute inset-0 flex justify-between items-start mt-10 text-white z-20 px-4">
        <div className="flex items-center gap-2 w-1/4 ml-8">
          <Image src="/icon.png" alt="logo" width={50} height={50} />
          <h1 className="font-bold text-3xl">Verdantia</h1>
        </div>
        <div className="flex text-white justify-evenly text-xl w-1/4">
          <span className="p-4 hover:underline cursor-pointer">Home</span>
          <span className="p-4 hover:underline cursor-pointer">About</span>
          <span className="p-4 hover:underline cursor-pointer">Contact</span>
          <span className="p-4 hover:underline cursor-pointer">App</span>
        </div>
        <div className="flex text-white justify-evenly font-bold text-xl w-1/4">
          <span className="p-4 hover:underline cursor-pointer">Login</span>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Embrace Nature</h1>
        <p className="text-lg md:text-2xl max-w-2xl">
          Discover the beauty and serenity of the natural world. Breathe in the
          fresh air, listen to the rustling leaves, and reconnect with the earth.
        </p>
        <Link href={"/auth/login"}>
          <button className="bg-[#052E16] hover:bg-green-900 transition mt-6 px-20 py-4 cursor-pointer flex rounded-3xl text-white font-semibold text-xl shadow-lg">
            <span className='mr-4'> Get Started </span>
            <ArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
