"use client";

import { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/src/components/layout/Navbar";
import { FloatingActionButton } from "@/src/components/ui/Fab";
import useInstallPrompt from "@/src/hooks/useInstallPrompt";
import RightTiltedBook from "@/src/utils/vector-svg/vectors/CombinedBlock";
import KidInPicture from "@/src/utils/vector-svg/vectors/KidInPicture";
import Clock from "@/src/utils/vector-svg/vectors/Clock";
import StudentsInClass from "@/src/utils/vector-svg/vectors/StudentsInClass";
import { teacher_links } from "@/src/utils/data/navigation_links";

export default function TeacherLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();

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
      <Navbar />
      {/* Top Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 h-16 px-4 bg-white shadow-sm flex justify-between items-center z-50">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-black text-[10px] font-bold leading-tight">Gala</p>
                    <p className="text-black text-[10px] font-bold leading-tight">Education</p>
                  </div>
                </div>
              </div>

              <ul className="hidden md:flex items-center text-xs font-bold gap-8 text-gray-700">
                <li className="hover:text-blue-600 transition-colors">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  <Link href="/signup">Register</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  <Link href="/signin">Login</Link>
                </li>
              </ul>

              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleSidebar} aria-label="Toggle menu">
                {isSidebarOpen ? <CloseOutlined style={{ fontSize: "20px" }} /> : <MenuOutlined style={{ fontSize: "20px" }} />}
              </button>
            </nav> */}

      {/* Search Bar */}
      <div className="fixed top-14 left-0 bg-white right-0 z-40 border-b">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4">
          <span className="text-sm text-gray-600 whitespace-nowrap">October 14, 2024</span>
          <div className="flex gap-3">
            <FaBell className="text-xl" />
            <FaUserCircle className="text-xl" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggleSidebar} />}

      <main className="flex-1 flex flex-row w-full h-screen overflow-hidden">
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
        <aside
          className={`fixed md:sticky border-r top-0 flex h-screen md:h-[calc(100vh-7rem)] overflow-y-auto transition-transform duration-300 ease-in-out
      md:translate-x-0 md:w-56 md:z-0 mt-16 md:mt-28
      ${isMobile ? "w-64" : ""}
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      shadow-xl md:shadow-none`}
        >
          <div className="p-4 w-full">
            <ul className="space-y-4">
              {teacher_links.map((item, i) => {
                const href = `/instructor/${item.link}`;
                const hrefRoot = `/instructor`;

                const isActive = pathname.startsWith(href) || (item.link === "." && "/instructor" == pathname);

                return (
                  <li key={i}>
                    <Link href={href} className={`flex items-center gap-1 p-1 rounded-lg transition-colors ${isActive ? "bg-[#001840] text-white hover:bg-[#001840]" : "text-gray-700 hover:bg-blue-50"}`} onClick={() => isMobile && setIsSidebarOpen(false)}>
                      <span className={isActive ? "text-white" : "text-[#001840]"}>{item.icon}</span>
                      <span className="font-medium text-xs">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-7rem)] mt-32 p-6">{children}</div>
      </main>

      {!isInstalled && installPrompt && (
        <FloatingActionButton position="bottom-center" onClick={handleInstallClick}>
          {/* &gt; Install Gala Education in Your device */}
        </FloatingActionButton>
      )}
    </>
  );
}
