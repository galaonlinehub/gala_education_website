"use client";

import { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import Link from "next/link";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import RightTiltedBook from "@/components/vectors/CombinedBlock";
import KidInPicture from "@/components/vectors/KidInPicture";
import Clock from "@/components/vectors/Clock";
import StudentsInClass from "@/components/vectors/StudentsInClass";
import { teacher_links } from "@/constants/navigation_links";
import Providers from "../providers";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: "Gala Education",
  description: "Gala Education",
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
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
      <body className={`antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AntdRegistry>
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 h-16 px-4 bg-white shadow-sm flex justify-between items-center z-50">
              {/*<div className="flex items-center gap-2 hidden">*/}
              {/*  <div className="w-10 h-10 relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ring-2 ring-blue-400 ring-offset-2 flex items-center justify-center">*/}
              {/*    <div className="text-center">*/}
              {/*      <p className="text-black text-[10px] font-bold leading-tight">Gala</p>*/}
              {/*      <p className="text-black text-[10px] font-bold leading-tight">Education</p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <Image
                  alt={"Gala logo"}
                  width={1920}
                  height={1080}
                  src={'/gala-logo.png'}
                  className={'w-10 h-10 object-cover bg-white rounded-full border-[1px] border-blue-800'}
              />

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
            </nav>

            {/* Search Bar */}
            <div className="fixed top-16 left-0 bg-white right-0 z-40 border-b">
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
            {isMobile && (
              <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={toggleSidebar}
              />
            )}

            <main className="flex-1 flex flex-row w-full">
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
                className={`fixed border mt-16 md:mt-28 bg-white md:bg-transparent z-50 h-[calc(120vh-7rem)] overflow-y-auto transition-transform duration-300 ease-in-out
                  md:translate-x-0 md:relative md:w-56 md:z-0
                  ${isMobile ? "w-64 top-0 left-0" : ""}
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  shadow-xl md:shadow-none`}
              >
                <div className="p-4">
                  <ul className="space-y-4">
                    {teacher_links.map((item, i) => {
                      const href = `/teacher/${item.link}`;
                      const isActive = pathname.startsWith(href);

                      return (
                        <li key={i}>
                          <Link
                            href={href}
                            className={`flex items-center gap-1 p-1 rounded-lg transition-colors ${
                              isActive ? "bg-[#001840] text-white hover:bg-[#001840]" : "text-gray-700 hover:bg-blue-50"
                            }`}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                          >
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
              <div className="flex-1 relative mt-32 overflow-y-auto h-screen p-6">
                {children}
              </div>
            </main>

            {/* Footer */}
            <Footer className="w-full mt-auto" />
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}