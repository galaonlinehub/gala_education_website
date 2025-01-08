import Image from 'next/image'
import React from 'react'

function Events({img,title,desc}) {
  return (
    <div className='flex flex-col w-[332px]  h-[396px] shrink-0'>
        <Image  src={img} width={200} height={200} alt="event pic" className='h-[170px] w-[332px] object-cover' />
        <div className='bg-[#001840] flex-col justify-around flex items-center p-10 gap-y-4 '>
            <h1 className='text-white font-black text-xs'>{title}</h1>
            <div className='text-xs text-white text-center'>{desc}</div>
        </div>
        <div className={'font-extrabold mt-2 rounded border-[1px] w-[141px] border-[#030DFE] p-2'}>
            Go to Event
        </div>
    </div>
  )
}

export default Events