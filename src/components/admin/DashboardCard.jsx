import React from 'react'
import { FaArrowUp } from 'react-icons/fa6'

function DashboardCard({title,bg,value, compared,percentage}) {
  return (
    <div className={`${bg} rounded shadow-sm border-[0.8px] border-gray-300 p-2`}>
        <div className='font-semibold text-white text-sm'>
            {title}
        </div>
        <div className='flex justify-between'>
            <div>
                <h1 className='font-black text-white text-2xl'>{value}</h1>
                <h2 className='font-semibold text-gray-200 text-xs'>{compared}</h2>
            </div> 
            <div className='flex gap-x-2 items-center'>
            <FaArrowUp />
            <span>{percentage}</span>
            </div>   
        </div>
    </div>
  )
}

export default DashboardCard
