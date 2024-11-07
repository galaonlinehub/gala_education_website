"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Switch } from 'antd'
import { IoDiamond } from "react-icons/io5";

function ProfileId({params:{id}}) {
    const [active,setActive] = useState(true)

  return (
    <div>
        <div className='flex justify-between'>

        <span>
        {id}
        </span>
        <div className='flex gap-x-3 items-center'>
            
            <span className='text-blue-900'>{active?"active":"inactive"}</span>
            <Switch checked={active} onChange={()=>setActive(!active)}  />
        </div>
        </div>

        <div>
            <div className='flex items-center flex-col h-[40vh] w-[40vh] relative shadow bg-white'>
                <div className='h-[20vh] w-full bg-blue-400 absolute' />
                <div className="absolute flex flex-col items-center top-16 ">

                <Image alt="image" src={'/man.jpg'} width={200} height={200} className='object-cover z-50 w-32 h-32 rounded-full shadow-sm' />
                <div>
                    <h1 className='text-gray-500 font-black text-center'>Frank Jonas Ndagula </h1>
                    <h2 className='italic text-xs text-gray-400 text-center'>Student</h2>

                </div>
                <div className='flex justify-end pb-4'>
                    <div className='flex flex-col items-center'>

                    <IoDiamond />
                    <span className='italic text-xs'>Monthly membership</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileId