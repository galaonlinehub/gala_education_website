import Image from 'next/image'
import React from 'react'

function NewsCard({img,title,desc}) {
  return (
    <div className='flex'>
      <div className='flex bg-[#001840] text-white flex-col sm:h-[95px] h-fit basis-1/3 '>
      <Image src={img} width={200} height={200} className='w-full h-1/3 object-cover' />
      <h1 className='h-2/3 text-xs font-black text-center'>{title}</h1>
      </div>
      <div className='sm:p-2 p-1 basis-2/3 '>
        <p className='text-xs'>{desc}</p>
        <button className='border border-[#030DFE] rounded p-1 text-xs'>Read the Article</button>
      </div>
    </div>
  )
}

export default NewsCard