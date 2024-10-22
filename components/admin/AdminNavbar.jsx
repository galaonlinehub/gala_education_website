"use client"
import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from 'antd';
import Image from 'next/image';
import { useStore } from '@/context/navigation';

function AdminNavbar() {
  const setOpen = useStore(state=>state.setOpenMenu)
  return (
    <nav className='flex w-screen sm:w-[calc(100vw-240px)] justify-between px-4 py-2 h-16  shadow-navbar '>
        <div className='flex items-center gap-x-4'>
        <RiMenu2Fill fontSize={24} className='hidden sm:block'  />
        <RiMenu2Fill fontSize={24} onClick={()=>setOpen(true)} className='sm:hidden'  />
        <div className='flex w-[12rem] rounded-3xl px-2 py-1 bg-[#ecf0fa]'>
        <input placeholder='Search here...' className=' border-none w-5/6 p-1 outline-none bg-transparent' />
        <IoIosSearch className='text-black w-1/6  h-10'/>
        </div>
        </div>

        <div className='flex items-center gap-x-7'>
            <div className='relative w-8 h-8 flex items-center justify-center'>

            <Badge status='processing' color={"green"} className='!absolute !top-0 !right-0' />
            <IoIosNotificationsOutline className='text-2xl ' />
            </div>
            <Image src={"/man.jpg"} width={200} height={200} className='object-cover h-12 w-12 rounded-full' />
            
            
        </div>


    </nav>
  )
}

export default AdminNavbar