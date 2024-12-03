import React from 'react'

function PioneerCard({icon,title,desc}) {
  return (
    <div className='w-[259px] shrink-0  !z-[70] px-2 border-gray-300 h-[200px] gap-y-2  flex items-center flex-col justify-center bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.2)]  border-[1px]'>
        <span>
        {icon}
        </span>
        
            <h1 className='font-extrabold text-[16px] leading-[20px]'>{title}</h1>
            <p className='text-[10px] leading-[15px] text-center'>{desc}</p>
        

    </div>
  )
}

export default PioneerCard