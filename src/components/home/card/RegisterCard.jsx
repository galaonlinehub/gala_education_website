import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



function RegisterCard({image,link,title,desc}) {
  return (
    <Link href={link} className='flex-col flex w-[70vw] h-fit sm:w-[20vw] 2xl:w-[10vw] shadow-sm shadow-black'>
  {/* Wrap the image in a div */}
  {/* <div className='flex-col flex w-[20vw] h-[12vh]'> */}
  {/* Wrap the image in a div */}
  <div className='w-full h-[12vh]'>
    <Image 
      alt="image Data"
      src={image} 
      className='w-full h-full border-white border-[1px] object-cover' 
      width={100} 
      height={100} 
      
    />
  </div>
  
  
  
  <div className='h-[20vh] register-as-text-card bg-[#001840] flex flex-col px-10 py-8'>
    <span className='text-white font-black 2xl:text-xs'>{title}</span>
    <span className='text-white text-xs'>{desc}</span>
  </div>
</Link>


  )
}

export default RegisterCard