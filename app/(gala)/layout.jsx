"use client"
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import Sidebar from "@/src/components/layout/Sidebar";
import {Input} from "antd";
import { dashboard_links } from "@/constants/links";
import Link from "next/link";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import RightTiltedBook from "@/components/vectors/CombinedBlock";
import KidInPicture from "@/components/vectors/KidInPicture";
import Clock from "@/components/vectors/Clock";
import StudentsInClass from "@/components/vectors/StudentsInClass";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntdRegistry>
          {/* Top Navigation */}
          <nav className="h-16 bg-white px-4 shadow-sm flex justify-between items-center fixed w-full z-50">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-[10px] font-bold leading-tight">Gala</p>
                  <p className="text-white text-[10px] font-bold leading-tight">Education</p>
                </div>
              </div>
            </div>

            <ul className="hidden sm:flex items-center text-sm gap-8 text-gray-700">
              <li className="hover:text-blue-600 transition-colors"><Link href="/">Home</Link></li>
              <li className="hover:text-blue-600 transition-colors"><Link href="/about">About Us</Link></li>
              <li className="hover:text-blue-600 transition-colors"><Link href="/register">Register</Link></li>
              <li className="hover:text-blue-600 transition-colors"><Link href="/login">Login</Link></li>
            </ul>

            <button 
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >

              {isSidebarOpen ? (
                <CloseOutlined style={{ fontSize: '20px' }} />
              ) : (
                <MenuOutlined style={{ fontSize: '20px' }} />
              )}
            </button>
          </nav>

          {/* Search Bar */}
          <div className="fixed top-16 w-full z-40 bg-white border-b">
            <div className="flex items-center  w-1/2 justify-between px-4 py-2 gap-4">
              <input 
                className="flex-1 h-10 px-4 rounded-lg border-2 border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Search..." 
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">October 14, 2024</span>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobile && (
            <div 
              className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={toggleSidebar}
            />
          )}

          <main className="pt-28 min-h-screen w-full flex">
            {/* Sidebar */}
            <aside 
              className={`fixed top-28 bottom-0 left-0 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out z-40
                ${isSidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
                ${isMobile ? 'shadow-xl' : ''}
              `}
            >
              <div className="p-4">
                <ul className="space-y-4">
                  {dashboard_links.map((item, i) => (
                    <li key={i}>
                      <Link 
                        href={`/student/${item.link}`} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                      >
                        <span className="text-blue-600">{item.icon}</span>
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
{/*

            <AntdRegistry>
                <nav className="h-14 bg-white p-2 flex justify-between max-w-screen items-center">
                    <div
                        className="w-[40px] h-[40px] relative bg-[#d9d9d9]  rounded-full  ring-[#a0a0a0] ring-offset-1 ring-[2px] flex items-start flex-col ">
                        <div className="absolute left-2 top-1 flex flex-col">
                            <p className="text-black text-[12px] font-bold leading-tight">
                                Gala
                            </p>
                            <p className="text-black text-[12px] font-bold leading-tight">
                                Education
                            </p>
                        </div>
                    </div>

                    <ul className="text-black font-black mr-[10vw] flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px]">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Register</li>
                        <li>Login</li>
                    </ul>
                    {/* <div/> */}
                </nav>
                <nav
                    className="flex h-[79.41px] justify-between w-screen border-y-[2.01px] py-2 px-8  border-[#D9D9D9] items-center">
                    <Input
                        className="rounded-[10px] !w-[503px] !h-[34px] !border-[#030DFE] border px-2 "
                        placeholder="Hint search text "
                    />
                    <span className="leading-[14.52px] text-[12px] font-extrabold">
                             {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="gap-x-6 flex items-center">
                            <svg
                                width="25"
                                height="29"
                                viewBox="0 0 25 29"
                                fill="blue"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5002 0C11.5125 0 10.7145 0.797991 10.7145 1.78571V2.85714C6.64084 3.68304 3.57165 7.28795 3.57165 11.6071V13.0246C3.57165 15.558 2.70669 18.019 1.12745 19.9944L0.295976 21.0379C-0.0276848 21.4397 -0.0890687 21.9922 0.134146 22.4554C0.35736 22.9185 0.82611 23.2143 1.3395 23.2143H23.6609C24.1743 23.2143 24.6431 22.9185 24.8663 22.4554C25.0895 21.9922 25.0281 21.4397 24.7045 21.0379L23.873 20C22.2937 18.019 21.4288 15.558 21.4288 13.0246V11.6071C21.4288 7.28795 18.3596 3.68304 14.2859 2.85714V1.78571C14.2859 0.797991 13.4879 0 12.5002 0ZM12.5002 5.35714C15.9545 5.35714 18.7502 8.1529 18.7502 11.6071V13.0246C18.7502 15.6975 19.5259 18.3036 20.9656 20.5357H4.03481C5.47455 18.3036 6.25022 15.6975 6.25022 13.0246V11.6071C6.25022 8.1529 9.04598 5.35714 12.5002 5.35714ZM16.0716 25H12.5002H8.92879C8.92879 25.9487 9.30267 26.8583 9.97231 27.5279C10.642 28.1975 11.5516 28.5714 12.5002 28.5714C13.4489 28.5714 14.3585 28.1975 15.0281 27.5279C15.6978 26.8583 16.0716 25.9487 16.0716 25Z"
                                    fill="#001840"
                                />
                            </svg>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="green"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23.3789 22.5117C22.084 20.2617 19.6523 18.75 16.875 18.75H13.125C10.3477 18.75 7.91602 20.2617 6.62109 22.5117C8.68359 24.8086 11.6719 26.25 15 26.25C18.3281 26.25 21.3164 24.8027 23.3789 22.5117ZM0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM15 15.9375C16.1189 15.9375 17.1919 15.493 17.9831 14.7019C18.7743 13.9107 19.2188 12.8376 19.2188 11.7188C19.2188 10.5999 18.7743 9.52681 17.9831 8.73564C17.1919 7.94447 16.1189 7.5 15 7.5C13.8811 7.5 12.8081 7.94447 12.0169 8.73564C11.2257 9.52681 10.7812 10.5999 10.7812 11.7188C10.7812 12.8376 11.2257 13.9107 12.0169 14.7019C12.8081 15.493 13.8811 15.9375 15 15.9375Z"
                                    fill="#001840"
                                />
                            </svg>
                        </span>

                    </nav>
                    <main className="min-h-screen w-full flex">
                        <div className="w-[15vw] h-screen border-[0.9px] border-r p-4">
                           <ul className="flex flex-col gap-3 w-full ">
                            {
                              dashboard_links.map((item,i)=>(
                                <li key={i} className="gap-x-2 flex">
                                  <span>
                                    {item.icon}
                                  </span>
                                  <span className="font-bold">

*/}
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${
              !isMobile && 'ml-64'
            }`}>
              {/* Background Decorations */}
              <div className="fixed z-0 opacity-5">
                <div className="absolute left-1/2 top-20 w-52 h-52">
                  <RightTiltedBook />
                </div>
                <div className="absolute hidden lg:block left-96 top-20 w-32 h-32">
                  <KidInPicture />
                </div>
                <div className="absolute hidden md:block left-0 top-20 w-32 h-32">
                  <Clock />
                </div>
                <div className="absolute hidden md:block left-0 top-2/3 w-20 h-20">
                  <StudentsInClass />
                </div>
              </div>


              {/* Page Content */}
              <div className="relative z-10 p-6">
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}

