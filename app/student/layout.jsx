"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "@/src/components/layout/Navbar";
import StudentSearch from "@/src/components/student/Search";
import { student_links } from "@/src/utils/data/navigation_links";
import { FloatingActionButton } from "@/src/components/ui/Fab";
import useInstallPrompt from "@/src/hooks/useInstallPrompt";
import NewClass from "@/src/components/student/NewClass";
import { usePathname, useSearchParams } from "next/navigation";
import { CompleteProfile } from "@/src/components/student/CompleteProfile";
import Subscribe from "@/src/components/Pay/Subscribe";
import KidInPicture from "@/src/utils/vector-svg/vectors/KidInPicture";
import Clock from "@/src/utils/vector-svg/vectors/Clock";
import StudentsInClass from "@/src/utils/vector-svg/vectors/StudentsInClass";
import RightTiltedBook from "@/src/utils/vector-svg/vectors/CombinedBlock";
import StickyNotification from "@/src/components/ui/notification/StickyNotification";
import { useStickyNotification } from "@/src/store/notification/notification";

export default function StudentLayout({ children }) {
  const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();
  const currentUrl = usePathname();
  const notificationOpen = useStickyNotification(
    (state) => state.notificationOpen
  );
  const openStickyNotification = useStickyNotification(
    (state) => state.openStickyNotification
  );

  // useEffect(() => {
  //   openStickyNotification();
  // }, [openStickyNotification]);

  return (
    <>
      <Navbar />
      <StudentSearch />
      <main className="flex flex-col lg:flex-row w-full mt-20">
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
        <aside className="hidden lg:block sticky top-[90px] left-0 w-[16vw] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto">
          <ul className="space-y-4 pt-6">
            {student_links.map((item, i) => {
              const normalizedUrl = currentUrl.replace(/\/$/, "");

              const itemUrl = `/student${
                item.link === "." ? "" : `/${item.link}`
              }`;

              const isDashboard = itemUrl === "/student";

              const isActive = isDashboard
                ? normalizedUrl === itemUrl
                : normalizedUrl.startsWith(itemUrl);

              return (
                <li key={i}>
                  <Link
                    href={itemUrl}
                    className={clsx(
                      "flex items-center gap-3 py-2 px-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-[#001840] text-white"
                        : "hover:bg-blue-950/20"
                    )}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={clsx(
                        "text-sm font-black",
                        isActive && "font-[900]"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-2 xxs:px-3 lg:px-5 py-2 w-full lg:w-[80vw] overflow-y-auto h-[calc(100vh-90px)]">
          {children}
        </div>
      </main>

      {!isInstalled && installPrompt && (
        <FloatingActionButton
          position="bottom-center"
          onClick={handleInstallClick}
        ></FloatingActionButton>
      )}

      <NewClass />
      <CompleteProfile />
      <Subscribe />
      {notificationOpen && <StickyNotification />}
    </>
  );
}
