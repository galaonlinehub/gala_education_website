import Image from 'next/image';
import React from 'react'



function Card1({image,title,desc}) {
  return (
    <div className='flex-col flex min-w-[15rem] max-w-[15rem]   h-[12rem] 2xl:w-[400px]  shadow-[0px_2px_2px_rgba(0,0,0,0.3)]'>
  
  <div className='w-full h-[4rem]'>
    <Image 
      alt="image Data"
      src={image} 
      className='w-full h-full border-white border-[1px] object-cover' 
      width={100} 
      height={100} 
      
    />
  </div>
  
  
  
  <div className='sm:h-[8rem] h-[10rem] 2xl:h-[10rem]  bg-[#001840] flex flex-col px-4 py-4'>
    <span className='text-white font-black'>{title}</span>
    <span className='text-white text-[12px]'>{desc}</span>
  </div>
</div>


  )
}

export default Card1