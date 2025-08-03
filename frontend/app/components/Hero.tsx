"use client";
import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Michroma } from 'next/font/google';
import useAuth from '../hooks/useAuth';

const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
});

const Hero = () => {
  const { user } = useAuth();
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/bg2.jpg"
        alt="hero"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      <div className="absolute inset-0 flex justify-center items-center z-20 px-4">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 md:p-16 max-w-4xl text-center text-white shadow-2xl">
          <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 leading-snug ${michroma.className}`}>
            Connect with Nature Freely<br className="hidden md:block" />Anywhere, Anytime
          </h1>
          <p className="text-lg md:text-xl mb-4 opacity-90 leading-relaxed">
            With us, you can experience the true essence of yoga without hassle.
            We make the impossible possible — with cutting-edge technology, you're free
            to connect with nature from your comfort zone.
          </p>
          <p className="text-base md:text-lg mb-8 italic tracking-wide opacity-80">
            Slow Down, Just Breathe.
          </p>
          {
            user ?
              <Link href={"/session/my"} className='flex justify-center'>
                <button className="bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-300 px-10 py-4 flex items-center gap-3 rounded-full text-white font-semibold text-lg shadow-xl">
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
              : <Link href={"/auth/login"} className='flex justify-center'>
                <button className="bg-green-700 hover:bg-green-800 hover:scale-105 transition-all duration-300 px-10 py-4 flex items-center gap-3 rounded-full text-white font-semibold text-lg shadow-xl">
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
          }

        </div>
      </div>
    </div>
  );
};

export default Hero;
