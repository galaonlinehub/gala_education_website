"use client"
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/components/layout/footer";
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