import React from 'react'

function PioneerCard({icon,title,desc}) {
  return (
    <div className='sm:w-[259px] w-[190px] !z-[70] px-2 border-gray-300 h-[200px] flex items-center flex-col justify-center bg-white shadow-2xl  border-[1px]'>
        <span>
        {icon}
        </span>
        
            <h1 className='font-bold'>{title}</h1>
            <p className='text-xs text-center'>{desc}</p>
        

    </div>
  )
}

export default PioneerCard