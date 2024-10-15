import Image from 'next/image';
import React from 'react'



function Card1({image,title,desc}) {
  return (
    <div className='flex-col flex w-[70vw] sm:w-[20vw] shadow-xl shadow-black'>
  {/* Wrap the image in a div */}
  {/* <div className='flex-col flex w-[20vw] h-[12vh]'> */}
  {/* Wrap the image in a div */}
  <div className='w-full h-[12vh]'>
    <img 
      src={image} 
      className='w-full h-full border-white border-[1px] object-cover' 
      width={100} 
      height={100} 
      // layout='fill' 
    />
  </div>
  
  
  
  <div className='h-[28vh] bg-[#001840] flex flex-col px-2 py-4'>
    <span className='text-white font-black'>{title}</span>
    <span className='text-white text-sm'>{desc}</span>
  </div>
</div>


  )
}

export default Card1