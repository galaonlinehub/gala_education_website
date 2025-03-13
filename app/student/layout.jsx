"use client";
import Link from "next/link";
import { Drawer } from "antd";
import Clock from "@/src/utils/vector-svg/vectors/Clock";
import React, { useState, useEffect } from "react";
import Footer from "@/src/components/layout/footer";
import Navbar from "@/src/components/layout/Navbar";
import { CloseCircleFilled } from "@ant-design/icons";
import StudentSearch from "@/src/components/student/Search";
import KidInPicture from "@/src/utils/vector-svg/vectors/KidInPicture";
import { student_links } from "@/src/utils/data/navigation_links";
import RightTiltedBook from "@/src/utils/vector-svg/vectors/CombinedBlock";
import StudentsInClass from "@/src/utils/vector-svg/vectors/StudentsInClass";
import { FloatingActionButton } from "@/src/components/ui/Fab";
import useInstallPrompt from "@/src/hooks/useInstallPrompt";
import NewClass from "@/src/components/student/NewClass";
import { useNewClass } from "@/src/store/student/class";
import { getUser } from "@/src/utils/fns/global";
import { usePathname, useSearchParams } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import CompleteProfile from "@/src/components/student/CompleteProfile";

export default function StudentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();
  const currentUrl = usePathname();

  return (
    <>
      <Navbar />
      <StudentSearch />
      <main className="flex flex-col lg:flex-row w-full mt-20">
        {/* <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
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
        </div> */}

        {/* Sidebar */}
        <div className="hidden lg:block sticky top-[90px] left-0 w-[16vw] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto">
          <ul className="space-y-4 pt-6">
            {student_links.map((item, i) => (
              <li key={i}>
                <Link
                  href={`/student/${item.link}`}
                  className={`flex items-center gap-4 py-2 px-2 rounded-lg transition-colors ${
                    currentUrl.replace(/\/$/, "") ===
                    `/student${item.link === "." ? "" : `/${item.link}`}`
                      ? "bg-[#001840] text-white"
                      : "hover:bg-blue-950/20"
                  }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <span className="">{item.icon}</span>
                  <span className="text-sm font-normal">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-2 lg:px-6 py-2 w-full lg:w-[80vw] overflow-y-auto h-[calc(100vh-90px)]">
          {children}
        </div>
      </main>

      {!isInstalled && installPrompt && (
        <FloatingActionButton
          position="bottom-center"
          onClick={handleInstallClick}
        ></FloatingActionButton>
      )}

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
          {student_links.map((item, i) => {
            const href = `/student/${item.link}`;
            return (
              <li key={i}>
                <Link
                  href={href}
                  className="flex items-center gap-1 p-1 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="text-blue-600">{item.icon}</span>
                  <span className="font-medium text-xs text-gray-700">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <CloseCircleFilled
              onClick={() => setIsSidebarOpen(false)}
              className="!text-red-500 absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl p-3 cursor-pointer"
            />
          </li>
        </ul>
      </Drawer>
      <NewClass />
      <CompleteProfile />
    </>
  );
}
