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
import Subscribe from "@/src/components/Pay/Subscribe";
import StudentSearch from "@/src/components/student/Search";
import InstructorCompleteProfile from "@/src/components/teacher/InstructorCompleteProfile";

export default function TeacherLayout({ children }) {
  const pathname = usePathname();
  const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();

  return (
    <>
      <Navbar />
      <StudentSearch />

      <main className="flex flex-col md:flex-row w-full mt-20 overflow-hidden">
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
          className={
            "hidden md:block sticky top-[90px] left-0 w-[24vw] lg:w-[16vw] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto"
          }
        >
          <ul className="space-y-4 pt-6">
            {teacher_links.map((item, i) => {
              const href = `/instructor/${item.link}`;

              const isActive =
                pathname.startsWith(href) ||
                (item.link === "." && "/instructor" == pathname);

              return (
                <li key={i}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#001840] text-white hover:bg-[#001840] font-extrabold"
                        : "text-black hover:bg-blue-950/20"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

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
      <Subscribe />
      <InstructorCompleteProfile />
    </>
  );
}
