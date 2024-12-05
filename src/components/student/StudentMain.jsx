"use client";
import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import Link from "next/link";
import {
  MenuOutlined,
  CloseOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import RightTiltedBook from "@/components/vectors/CombinedBlock";
import KidInPicture from "@/components/vectors/KidInPicture";
import Clock from "@/components/vectors/Clock";
import StudentsInClass from "@/components/vectors/StudentsInClass";
import Image from "next/image";
import { student_links } from "@/constants/navigation_links";
import { Drawer } from "antd";
import { Input } from "antd";
import { IoMenu, IoSearch } from "react-icons/io5";
import StudentSearch from "./Search";
import useUser from "@/src/store/auth/user";

function StudentMain({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <>
      <AntdRegistry>
        <div>
          <nav className="h-16 border-b-[1.2px] bg-white fixed inset-0 border-[#d9d9d9] px-4 shadow-sm w-full flex justify-between items-center z-50">
            {/*<div className="flex items-center gap-2">*/}
            {/*  <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">*/}
            {/*    <div className="text-center">*/}
            {/*      <p className="text-white text-[10px] font-bold leading-tight">*/}
            {/*        Gala*/}
            {/*      </p>*/}
            {/*      <p className="text-white text-[10px] font-bold leading-tight">*/}
            {/*        Education*/}
            {/*      </p>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <Image
                alt={"Gala logo"}
                width={200}
                height={200}
                src={'/gala-logo.png'}
                className={'w-10 h-10 object-cover  rounded-full '}
            />


            <ul className="hidden md:flex items-center text-xs font-bold gap-8 text-gray-700">
              <li className="hover:text-blue-600 transition-colors">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors">
                <Link href="/about">About Us</Link>
              </li>
             { !user &&<> <li className="hover:text-blue-600 transition-colors">
                <Link href="/signup">Register</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors">
                <Link href="/signin">Login</Link>
              </li></>}
            </ul>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? (
                <CloseOutlined style={{ fontSize: "20px" }} />
              ) : (
                <MenuOutlined style={{ fontSize: "20px" }} />
              )}
            </button>
          </nav>

          {/* Search Bar */}
          <StudentSearch/> 

          <main className="flex flex-col lg:flex-row w-full mt-[110px]">
            <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
              <div className="absolute left-1/2 top-20 w-52 h-52 hidden md:block">
                <RightTiltedBook />
              </div>
              <div className="absolute left-96 top-20 w-32 h-32 hidden lg:block">
                <KidInPicture />
              </div>
              <div className="absolute left-0 top-20 w-32 h-32 hidden sm:block">
                <Clock />
              </div>
              <div className="absolute left-0 top-2/3 w-20 h-20 hidden sm:block">
                <StudentsInClass />
              </div>
            </div>
            {/* Sidebar */}
            <div className="hidden lg:block sticky top-32 left-0 w-[20vw] h-[calc(100vh-128px)] border-r border-[#d9d9d9] p-4">
              <ul className="space-y-4 ">
                {student_links.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="flex items-center gap-4 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      <span className="text-blue-600">{item.icon}</span>
                      <span className="font-black text-xs text-black">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
                {/* <li className="absolute bottom-0 left-10">
                  <Image
                    src={"/svg/reminderIcon.svg"}
                    className={"w-[10rem] h-[10rem] object-cover"}
                    width={150}
                    height={150}
                  />
                </li> */}
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-6 py-2 w-full lg:w-[80vw] overflow-hidden">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AntdRegistry>

      {/* Drawer for Mobile Sidebar */}
      <Drawer
        title={
          <div className="flex flex-col gap-2 items-center">
            <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#d9d9d9] text-[10px] font-bold leading-tight">
                  Gala
                </p>
                <p className="text-[#d9d9d9] text-[10px] font-bold leading-tight">
                  Education
                </p>
              </div>
            </div>
            <div>Gala Education</div>
          </div>
        }
        placement="left"
        closable={false}
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
        className="!lg:hidden !relative"
      >
        <ul className="space-y-4">
          {student_links.map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className="flex items-center gap-1 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-blue-600">{item.icon}</span>
                <span className="font-medium text-xs text-gray-700">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <CloseCircleFilled
              onClick={() => setIsSidebarOpen(false)}
              className="!text-red-500 absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl p-3 cursor-pointer"
            />
          </li>
        </ul>
      </Drawer>
    </>
  );
}

export default StudentMain;
