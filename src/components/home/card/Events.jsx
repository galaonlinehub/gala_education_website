import Image from 'next/image'
import React from 'react'

function Events({img,title,desc}) {
  return (
    <div className='flex flex-col sm:w-[22vw] 2xl:w-[14vw] w-[80vw] h-[40vh] 2xl:h-[20vh]'>
        <Image  src={img} width={200} height={200} alt="event pic" className='w-full h-1/3 object-cover' />
        <div className='bg-[#001840] h-2/3 flex-col justify-around flex items-center p-10 '>
            <h1 className='text-white font-black text-xs'>{title}</h1>
            <div className='text-xs text-white text-center'>{desc}</div>
        </div>
    </div>
  )
}

export default Events