"use client";
import { Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import Navbar from "@/components/layout/Navbar";
import Subscribe from "@/components/pay/Subscribe";
import { CompleteProfile } from "@/components/student/CompleteProfile";
import NewClass from "@/components/student/NewClass";
import { PartnerSchool } from "@/components/student/PartnerSchool";
import StudentSearch from "@/components/student/Search";
// import { FloatingActionButton } from "@/components/ui/Fab";
import StickyNotification from "@/components/ui/notification/StickyNotification";
import { useUser } from "@/hooks/data/useUser";
// import useInstallPrompt from "@/hooks/misc/useInstallPrompt";
import { useStickyNotification } from "@/store/notification/notification";
import { useStudentLinks } from "@/utils/data/navigation_links";
import Clock from "@/utils/vector-svg/vectors/Clock";
import RightTiltedBook from "@/utils/vector-svg/vectors/CombinedBlock";
import KidInPicture from "@/utils/vector-svg/vectors/KidInPicture";
import StudentsInClass from "@/utils/vector-svg/vectors/StudentsInClass";

export default function StudentLayout({ children }) {
  // const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();
  const currentUrl = usePathname();
  const { user } = useUser();
  const notificationOpen = useStickyNotification(
    (state) => state.notificationOpen
  );
  const openStickyNotification = useStickyNotification(
    (state) => state.openStickyNotification
  );

  const student_links = useStudentLinks();

  const tdash = useTranslations("teacher_dashboard");

  return (
    <>
      <Navbar />
      <StudentSearch />
      <aside
        className={
          "hidden md:block fixed top-[6rem] left-0 w-[24vw] lg:w-[17rem] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto"
        }
      >
        <ul className="space-y-4 pt-6">
          {student_links.map((item, i) => {
            const langPrefix = currentUrl.match(/^\/(sw|en)\//)?.[1] || "";
            const normalizedUrl = currentUrl.replace(/\/$/, "");

            const itemUrl = `${langPrefix ? `/${langPrefix}` : ""}/student${
              item.link === "." ? "" : `/${item.link}`
            }`;

            const isDashboard =
              itemUrl === `${langPrefix ? `/${langPrefix}` : ""}/student`;
            const isSubscriptions = item.link === "subscriptions";

            const isActive = isDashboard
              ? normalizedUrl === itemUrl
              : normalizedUrl.startsWith(itemUrl);

            const isInstructor = user?.role === "instructor";
            const hasFreeTrial = user?.has_free_trial;

            const isDisabled =
              isInstructor && hasFreeTrial && !(isDashboard || isSubscriptions);

            return (
              <Tooltip
                color="#001840"
                title={isDisabled ? tdash("only_in_premium") : ""}
                key={i}
              >
                <Link
                  key={i}
                  href={itemUrl}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                  }}
                  className={clsx(
                    "flex items-center gap-3 py-2 px-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-[#001840] text-white"
                      : "hover:bg-blue-950/20",
                    isDisabled
                      ? "text-gray-400 cursor-not-allowed hover:bg-transparent"
                      : ""
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className={clsx(
                      "text-base font-bold",
                      isActive && "font-[900]"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </Tooltip>
            );
          })}
        </ul>
      </aside>
      <main className="md:fixed mt-[6rem] md:mt-0 top-[6rem] left-[24vw] lg:left-[17rem] lg:w-[calc(100vw-17rem)] h-[calc(100vh-6rem)] px-2">
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

        <div className="relative overflow-y-scroll h-full">{children}</div>
      </main>

      {/* {!isInstalled && installPrompt && (
        <FloatingActionButton
          position="bottom-center"
          onClick={handleInstallClick}
        ></FloatingActionButton>
      )} */}

      <NewClass />
      <CompleteProfile />
      {/* <Subscribe /> */}
      <PartnerSchool />
      {notificationOpen && <StickyNotification />}
    </>
  );
}
