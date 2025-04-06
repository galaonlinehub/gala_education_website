import Image from 'next/image'
import React from 'react'
import { IoDiamond } from 'react-icons/io5'

function UserCard({user:{name,role}}) {
  return (
    <div className='flex items-center flex-col h-[12rem] sm:h-[16rem] w-[12rem] sm:w-[16rem] relative shadow bg-white'>
    <div className='h-[6rem] sm:h-[8rem] w-full bg-blue-400 absolute' />
    <div className="absolute flex flex-col items-center top-16 ">

    <Image alt="image" src={'/man.jpg'} width={100} height={100} className='object-cover z-50 w-10 sm:w-20 h-10 sm:h-20 rounded-full shadow-sm' />
    <div>
        <h1 className='text-gray-500 font-black text-center'>{name} </h1>
        <h2 className='italic text-xs text-gray-400 text-center capitalize'>{role}</h2>

    </div>
    <div className='flex justify-end '>
        <div className='flex flex-col items-center'>

        <IoDiamond />
        <span className='italic text-xs'>Monthly membership</span>
        </div>
    </div>
    </div>
    
</div>
  )
}

export default UserCard