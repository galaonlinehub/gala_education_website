'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Animator from '../home/animations/Animator';

const LibraryInterface = () => {

  return (
    <div className='w-full flex items-center justify-center p-4'>
      <div className='flex flex-col items-center mt-4 justify-center w-full max-w-6xl'>
        <Animator delay={0.4} direction='bottom'><p className="text-xs md:text-base text-center text-gray-800 mb-8" >
          Say goodbye to the limitations of traditional libraries and hello to a smarter, faster way to learn.
          Our soon-to-launch <span className='text-purple-600 font-semibold'>Online Library</span>  will connect you to a growing collection of eBooks, PDFs, academic papers,
          and learning tools — categorized, and easy to access from any device.
          <span className='text-purple-600 font-semibold'> Stay tuned — the gateway to a smarter future is just around the corner.</span>
        </p>
        </Animator>

        <div className='relative w-full max-w-sm h-[30rem] sm:max-w-md sm:h-[40rem] lg:w-2/3 lg:max-w-lg lg:h-[38rem]' style={{ animation: 'subtleBounce 3s ease-in-out infinite' }}>
          <Image
            src='/read.png'
            alt='Online Library'
            fill
            className='object-contain'
            sizes='(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 40vw'
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default LibraryInterface