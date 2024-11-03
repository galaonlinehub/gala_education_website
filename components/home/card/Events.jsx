import Image from 'next/image'
import React from 'react'

function Events({img,title,desc}) {
  return (
    <div className='flex flex-col sm:w-[25vw] w-[80vw] h-[40vh]'>
        <Image  src={img} width={200} height={200} alt="event pic" className='w-full h-1/4 object-cover' />
        <div className='bg-[#001840] h-3/4 flex-col justify-around flex items-center px-6 '>
            <h1 className='text-white font-black'>{title}</h1>
            <div className='text-xs text-white text-center'>{desc}</div>
        </div>
    </div>
  )
}

export default Events