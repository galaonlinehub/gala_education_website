"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import { dashboard_links } from "@/constants/links";
import Link from "next/link";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import RightTiltedBook from "@/components/vectors/CombinedBlock";
import KidInPicture from "@/components/vectors/KidInPicture";
import Clock from "@/components/vectors/Clock";
import StudentsInClass from "@/components/vectors/StudentsInClass";
import { teacher_links } from "@/constants/teacher_links";
import Providers from "../providers";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AntdRegistry>
            {/* Top Navigation */}
            <nav className="h-16 px-4 shadow-sm flex justify-between items-center z-50">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-[10px] font-bold leading-tight">Gala</p>
                    <p className="text-white text-[10px] font-bold leading-tight">Education</p>
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
                  <Link href="/register">Register</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  <Link href="/login">Login</Link>
                </li>
              </ul>

              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleSidebar} aria-label="Toggle menu">
                {isSidebarOpen ? <CloseOutlined style={{ fontSize: "20px" }} /> : <MenuOutlined style={{ fontSize: "20px" }} />}
              </button>
            </nav>

            {/* Search Bar */}
            <div className="top-16 z-40  border-b">
              <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4">
                <input className="h-10 px-4 w-full md:w-1/3 rounded-lg border-2 border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="Search..." />
                <span className="text-sm text-gray-600 whitespace-nowrap">October 14, 2024</span>
                <div className="flex gap-3">
                  <FaBell className="text-xl" />
                  <FaUserCircle className="text-xl" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobile && <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggleSidebar} />}

            <main className="flex-1 flex flex-col md:flex-row w-full overflow-hidden">
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

              <aside
                className={` z-10 transition-transform duration-300 ease-in-out
                ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
                ${isMobile ? "fixed inset-y-0 left-0" : "relative"}
                ${isMobile ? "w-64" : "w-56"}
                 shadow-xl md:shadow-none
              `}
              >
                <div className="p-4">
                  <ul className="space-y-4">
                    {teacher_links.map((item, i) => (
                      <li key={i}>
                        <Link href={`/teacher/${item.link}`} className="flex items-center gap-1 p-1 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => isMobile && setIsSidebarOpen(false)}>
                          <span className="text-blue-600">{item.icon}</span>
                          <span className="font-medium text-xs text-gray-700">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Main Content */}
              <div className={`flex-1 transition-all duration-300 relative z-20 p-6 overflow-auto ${isMobile && isSidebarOpen ? "ml-64" : ""}`}>{children}</div>
            </main>

            {/* Footer */}
            <Footer className="w-full mt-auto" />
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
