import Image from 'next/image'
import React from 'react'

function News() {
  return (
    <div>
      <div className='flex w-full items-end justify-end p-5'>
          <div className='bg-blue-500 rounded shadow-md border-[0.8px] border-gray-200 p-2 text-xs font-black text-white'>+ create news</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
      { 
        Array(15).fill().map((item,i)=><div key={i} className='relative w-64 h-64 shadow-md'>
        <Image  src={"/news1.jpeg"} alt="news1" width={200} height={200} className='w-full object-cover h-1/2' />
        <h1 className='font-black text-sm text-center'>An initiative taken towards</h1>
        <p className='text-xs p-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora in libero labore obcaecati saepe, vero laudantium magnam neque ea provident.
        </p>
        <i className='text-xs text-right px-2 py-1'>published 23 Nov,2024</i>
      </div>)}
      </div>
    </div>
  )
}

export default News