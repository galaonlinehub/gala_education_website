import Image from 'next/image';
import React from 'react'



function Card2({image,title,desc}) {
  return (
    <div className='flex-col flex w-[250px] sm:w-[300px] shadow-md shadow-black'>
  
  <div className='w-full h-[12vh]'>
    <Image 
      alt="image Data"
      src={image} 
      className='w-full h-full border-white border-[1px] object-cover' 
      width={100} 
      height={100} 
      
    />
  </div>
  
  
  
  <div className='h-[25vh] 2xl:h-[10vh] bg-[#001840]  flex flex-col px-4 py-8'>
    <span className='text-white font-black '>{title}</span>
    <span className='text-white text-[12px]'>{desc}</span>
  </div>
</div>


  )
}

export default Card2