import Image from 'next/image'
import React from 'react'
import Animator from '../animations/Animator'

function Events({ img, title, desc }) {
  return (
    <div className='flex flex-col w-full md:w-[220px] lg:w-[332px] md:h-[440px] shrink-0'>
      <Image src={img} width={200} height={200} alt="event pic" className='md:h-[120px] lg:h-[170px] h-[120px] w-full md:w-[332px] object-cover' />
      <div className='bg-[#001840] flex-col justify-around  flex p-10 gap-y-4 '>
        <Animator direction='left' delay={0.4} >
          <h1 className='text-white font-black text-xs'>{title}</h1>
        </Animator>
        <Animator direction='left' delay={0.6} >
          <div className='text-xs text-white md:h-[130px] h-[70px] lg:h-[70px]'>{desc}</div>
        </Animator>
      </div>
      <div className={'font-extrabold mt-4 rounded border-[1px] text-center w-[141px] border-[#030DFE] p-1'}>
        Go to Event
      </div>
    </div>
  )
}

export default Events