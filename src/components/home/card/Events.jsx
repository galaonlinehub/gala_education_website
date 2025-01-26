import Image from 'next/image'
import React from 'react'

function Events({img,title,desc}) {
  return (
    <div className='flex flex-col w-[332px]  h-[410px] shrink-0'>
        <Image  src={img} width={200} height={200} alt="event pic" className='h-[170px] w-[332px] object-cover' />
        <div className='bg-[#001840] flex-col justify-around flex p-10 gap-y-4 '>
            <h1 className='text-white font-black text-xs'>{title}</h1>
            <div className='text-xs text-white h-[70px]'>{desc}</div>
        </div>
        <div className={'font-extrabold mt-6 rounded border-[1px] text-center w-[141px] border-[#030DFE] p-1'}>
            Go to Event
        </div>
    </div>
  )
}

export default Events