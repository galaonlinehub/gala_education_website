"use client";
import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from "antd";
import { useStore } from "@/src/store/navigation";
import {  BiMessageSquareDetail } from "react-icons/bi";
import { Signout } from "@/src/components/ui/auth/signup/Signout";

function AdminNavbar() {
  const setOpen = useStore((state) => state.setOpenMenu);
  return (
    <nav className="flex w-screen sm:w-[calc(100vw-240px)] border-gray-200 border-b-[0.6px] justify-between px-4 py-2 h-16">
      <div className="flex items-center gap-x-4">
        <RiMenu2Fill
          fontSize={24}
          onClick={() => setOpen(true)}
          className="sm:hidden"
        />
        <div className="flex w-[16rem] items-center rounded-md px-2 py-1 bg-[#ecf0fa]">
          <input
            placeholder="Search here..."
            className=" border-none w-5/6 p-1 text-gray-400 text-xs placeholder:text-xs outline-none bg-transparent"
          />
          <IoIosSearch className="text-black w-1/6  h-5" />
        </div>
      </div>

      <div className="flex items-center gap-x-7">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Badge
            status="processing"
            color={"green"}
            className="!absolute !top-0 !right-0"
          />
          <IoIosNotificationsOutline className="text-2xl " />
        </div>
        <BiMessageSquareDetail />  
        <Signout />
      </div>
    </nav>
  );
}

export default AdminNavbar;
