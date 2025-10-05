// "use client";

// import "../globals.css";
// import { Tooltip } from "antd";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useTranslations } from "next-intl";

// import Navbar from "@/components/layout/Navbar";
// import Subscribe from "@/components/pay/Subscribe";
// import StudentSearch from "@/components/student/Search";
// import InstructorCompleteProfile from "@/components/teacher/InstructorCompleteProfile";
// import StickyNotification from "@/components/ui/notification/StickyNotification";
// import { useUser } from "@/hooks/data/useUser";
// import useInstallPrompt from "@/hooks/misc/useInstallPrompt";
// import { useStickyNotification } from "@/store/notification/notification";
// import { useTeacherLinks } from "@/utils/data/navigation_links";
// import Clock from "@/utils/vector-svg/vectors/Clock";
// import RightTiltedBook from "@/utils/vector-svg/vectors/CombinedBlock";
// import KidInPicture from "@/utils/vector-svg/vectors/KidInPicture";
// import StudentsInClass from "@/utils/vector-svg/vectors/StudentsInClass";

// export default function TeacherLayout({ children }) {
//   const pathname = usePathname();
//   const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();
//   const { user } = useUser();

//   const notificationOpen = useStickyNotification(
//     (state) => state.notificationOpen
//   );
//   const openStickyNotification = useStickyNotification(
//     (state) => state.openStickyNotification
//   );

//   const teacher_links = useTeacherLinks();

//   const tdash = useTranslations("teacher_dash");

//   return (
//     <>
//       <Navbar />
//       <StudentSearch />

//       {/* Sidebar */}
//       <aside
//         className={
//           "hidden md:block fixed top-[6rem] left-0 w-[24vw] lg:w-[17rem] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto"
//         }
//       >
//         <ul className="space-y-4 pt-6">
//           {teacher_links.map((item, i) => {
//             const href = `/instructor/${item.link}`;
//             const isDashboard = item.link === ".";
//             const isSubscriptions = item.link === "subscriptions";

//             // Extract the language prefix from pathname (sw or en)
//             const langPrefix = pathname.match(/^\/(sw|en)\//)?.[1] || "";

//             // Create the full href with language prefix
//             const fullHref = langPrefix
//               ? `/${langPrefix}/instructor/${
//                   item.link === "." ? "" : item.link
//                 }`
//               : href;

//             const isActive =
//               pathname === fullHref ||
//               (isDashboard &&
//                 (pathname === `/sw/instructor` ||
//                   pathname === `/en/instructor`));

//             const hasFreeTrial = user?.has_free_trial;
//             const isDisabled =
//               hasFreeTrial && !(isDashboard || isSubscriptions);

//             return (
//               <Tooltip
//                 color="#001840"
//                 title={isDisabled ? tdash("only_in_premium") : ""}
//                 key={i}
//               >
//                 <Link
//                   href={href}
//                   onClick={(e) => {
//                     if (isDisabled) e.preventDefault();
//                   }}
//                   className={`flex items-center gap-3 p-2 rounded-lg transition-colors
//               ${
//                 isActive
//                   ? "bg-[#001840] text-white hover:bg-[#001840] font-extrabold"
//                   : "text-black hover:bg-blue-950/20"
//               }
//               ${
//                 isDisabled
//                   ? "text-gray-400 cursor-not-allowed hover:bg-transparent"
//                   : ""
//               }
//             `}
//                 >
//                   <span className="text-2xl">{item.icon}</span>
//                   <span className="font-semibold text-sm">{item.name}</span>
//                 </Link>
//               </Tooltip>
//             );
//           })}
//         </ul>
//       </aside>

//       <main className="md:fixed mt-[6rem] md:mt-0 top-[6rem] left-[24vw] lg:left-[17rem] lg:w-[calc(100vw-17rem)] h-[calc(100vh-6rem)] px-2">
//         <div className="fixed inset-0 -z-1 opacity-95 pointer-events-none">
//           <div className="absolute left-1/2 top-20 w-52 h-52 hidden md:block">
//             <RightTiltedBook />
//           </div>
//           <div className="absolute left-96 top-20 w-32 h-32 hidden lg:block">
//             <KidInPicture />
//           </div>
//           <div className="absolute left-0 top-20 w-32 h-32 hidden sm:block">
//             <Clock />
//           </div>
//           <div className="absolute left-0 top-2/3 w-20 h-20 hidden sm:block">
//             <StudentsInClass />
//           </div>
//         </div>

//         <div className="overflow-y-scroll h-full">{children}</div>
//       </main>

//       {/* {!isInstalled && installPrompt && (
//         <FloatingActionButton
//           position="bottom-center"
//           onClick={handleInstallClick}
//         ></FloatingActionButton>
//       )} */}
//       <Subscribe />
//       <InstructorCompleteProfile />

//       {notificationOpen && <StickyNotification />}
//     </>
//   );
// }


"use client";

import "../globals.css";
import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import Navbar from "@/components/layout/Navbar";
import Subscribe from "@/components/pay/Subscribe";
import StudentSearch from "@/components/student/Search";
import InstructorCompleteProfile from "@/components/teacher/InstructorCompleteProfile";
import StickyNotification from "@/components/ui/notification/StickyNotification";
import { useUser } from "@/hooks/data/useUser";
import useInstallPrompt from "@/hooks/misc/useInstallPrompt";
import { useStickyNotification } from "@/store/notification/notification";
import { useTeacherLinks } from "@/utils/data/navigation_links";
import Clock from "@/utils/vector-svg/vectors/Clock";
import RightTiltedBook from "@/utils/vector-svg/vectors/CombinedBlock";
import KidInPicture from "@/utils/vector-svg/vectors/KidInPicture";
import StudentsInClass from "@/utils/vector-svg/vectors/StudentsInClass";


export default function TeacherLayout({ children }) {
  const pathname = usePathname();
  const { installPrompt, isInstalled, handleInstallClick } = useInstallPrompt();
  const { user } = useUser();

  const notificationOpen = useStickyNotification(
    (state) => state.notificationOpen
  );
  const openStickyNotification = useStickyNotification(
    (state) => state.openStickyNotification
  );

  const teacher_links = useTeacherLinks();

  const tdash = useTranslations('teacher_dashboard')

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
        <aside className="hidden md:block sticky top-[90px] left-0 w-[24vw] lg:w-[16vw] h-[calc(100vh-80px)] border-r border-[#d9d9d9] p-4 overflow-y-auto">
          <ul className="space-y-4 pt-6">
            {teacher_links.map((item, i) => {
              const href = `/instructor/${item.link}`;
              const isDashboard = item.link === ".";
              const isSubscriptions = item.link === "subscriptions";

              // Extract the language prefix from pathname (sw or en)
              const langPrefix = pathname.match(/^\/(sw|en)\//)?.[1] || '';

              // Create the full href with language prefix
              const fullHref = langPrefix ? `/${langPrefix}/instructor/${item.link === '.' ? '' : item.link}` : href;

              const isActive =
                pathname === fullHref ||
                (isDashboard && (pathname === `/sw/instructor` || pathname === `/en/instructor`));

              const hasFreeTrial = user?.has_free_trial;
              const isInstructor = user?.role === "instructor";

              const isDisabled =
                isInstructor && hasFreeTrial && !(isDashboard || isSubscriptions);

              return (
                <Tooltip
                  color="#001840"
                  title={isDisabled ? tdash('only_in_premium') : ""}
                  key={i}
                >
                  <Link
                    href={href}
                    onClick={(e) => {
                      if (isDisabled) e.preventDefault();
                    }}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors
              ${isActive
                        ? "bg-[#001840] text-white hover:bg-[#001840] font-extrabold"
                        : "text-black hover:bg-blue-950/20"
                      }
              ${isDisabled
                        ? "text-gray-400 cursor-not-allowed hover:bg-transparent"
                        : ""
                      }
            `}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                </Tooltip>
              );
            })}
          </ul>
        </aside>

        <div className="flex-1 px-2 lg:px-6 py-2 w-full lg:w-[80vw] overflow-y-auto h-[calc(100vh-90px)]">
          {children}
        </div>
      </main>

      {/* {!isInstalled && installPrompt && (
        <FloatingActionButton
          position="bottom-center"
          onClick={handleInstallClick}
        ></FloatingActionButton>
      )} */}
      <Subscribe />
      <InstructorCompleteProfile />

      {notificationOpen && <StickyNotification />}
    </>
  );
}
