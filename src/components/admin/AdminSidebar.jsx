"use client"
import { adminLinks } from '@/constants/links'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AdminSidebar() {
    const pathname = usePathname()

  return (
    <div className='h-screen fixed sm:block hidden w-[240px] border-black/20 border-r-[0.8px] '>
        <div className='h-[64px] px-[20px] border-b-[0.8px]  border-gray-400  py-[15px] flex items-center justify-center'>
            <div className="w-[40px] h-[40px] relative bg-[#d9d9d9]  rounded-full  ring-[#a0a0a0] ring-offset-1 ring-[2px] flex items-start flex-col ">
                <div className="absolute left-2 top-1 flex flex-col">
                    <p className="text-black text-[12px] font-bold leading-tight">
                        Gala
                    </p>
                    <p className="text-black text-[12px] font-bold leading-tight">
                        Education
                    </p>
                </div>
            </div>

        </div>
        <div>
            <div className='flex items-center justify-center py-14 flex-col gap-2'>
                <div className='w-16 h-16 relative '>
                    <Image alt="image" src={'/man.jpg'} className='outline outline-[#001840] shadow-2xl outline-[3px] outline-offset-2 rounded-full object-cover' layout='fill' />
                    
                    <span className='w-3 h-3 absolute bottom-0 right-0 bg-green-500 animate-wave-pulse rounded-full' />
                </div>
                <div className='flex flex-col items-center '>
                    <h1 className='font-black'>Frank Ndagula</h1>
                    <h2 className='text-[#8991a5]'>System Administrator</h2>
                </div>
            </div>
            <div className='py-2'>
                {
                    adminLinks.map(({name,link,icon:Icon},i)=>(
                        <Link key={i} href={link} className={`flex items-center justify-between px-4 py-2 w-full ${pathname === link && "bg-blue-900 text-white font-black"} `}>
                            <h1>{name}</h1>
                            <Icon />
                            
                        </Link>
                    ))
                }
            </div>


        </div>

    </div>
  )
}

export default AdminSidebar