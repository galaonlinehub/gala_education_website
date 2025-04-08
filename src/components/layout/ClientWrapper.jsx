"use client";

import { Button, Tooltip, Avatar } from "antd";
import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { useUser } from "@/src/hooks/useUser";
import { cookieFn } from "@/src/utils/fns/client";
import { useEffect } from "react";
import { USER_COOKIE_KEY } from "@/src/config/settings";
import { useLoading } from "@/src/store/loading";
import notificationService from "../ui/notification/Notification";
import { useRouter } from "next/navigation";
import { toToday } from "date-fns";
import { LuBellRing, LuX } from "react-icons/lu";


const ClientWrapper = ({ children }) => {
  const { userLoading, userError, user } = useUser();
  const { loading, toggleLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    if (userError) {
      notificationService.error({
        message: "",
        description:
          "Fatal error occurred,\n Please try again later!, \t  Redirecting to home page... ",
        duration: 5,
        closable: true,
        customStyle: { paddingTop: "0px" },
      });

      // cookieFn.remove(USER_COOKIE_KEY);
      // router.push("/");
    }
  }, [router, userError]);

  useEffect(() => {
    !userLoading && toggleLoading();
  }, [toggleLoading, userLoading]);

  if (loading) {
    return <TemplateLoader />;
  }

  //  if(user){
  //   notificationService.info({
  //     message: null,
  //     description: (
  //       <div className="">
  //         {/* Header with lesson title */}
  //         <div className="flex justify-between items-center mb-3">
  //           <div className="font-bold text-white text-base">Lesson Alert</div>
  //           <div className="text-xs text-blue-300 bg-blue-800/50 px-2 py-1 rounded-full">
  //             Starts in 15min
  //           </div>
  //         </div>

  //         {/* Course information */}
  //         <div className="bg-blue-900/70 rounded-md p-2 mb-3">
  //           <div className="flex items-center gap-2 text-sm text-white">
  //             <span className="font-medium">Algebra</span>
  //             <span className="text-blue-300">→</span>
  //             <span className="font-medium">Complex numbers</span>
  //           </div>
  //         </div>

  //         {/* Bottom row with teacher and join button */}
  //         <div className="flex justify-between items-center">
  //           {/* Teacher information */}
  //           <div className="flex items-center gap-2">
  //             <div
  //               className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
  //               style={{ backgroundColor: "#1a3a7d" }}
  //             >
  //               DM
  //             </div>
  //             <div className="flex flex-col">
  //               <span className="text-xs font-medium text-white line-clamp-1">
  //                 Denis Mgaya
  //               </span>
  //               <span className="text-xs text-blue-300">13:00 pm</span>
  //             </div>
  //           </div>

  //           {/* Join button */}
  //           <button
  //             className="text-white px-4 py-1.5 rounded-md text-xs font-medium transition-colors"
  //             style={{
  //               backgroundColor: "#3b82f6",
  //               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  //             }}
  //             onMouseOver={(e) =>
  //               (e.currentTarget.style.backgroundColor = "#2563eb")
  //             }
  //             onMouseOut={(e) =>
  //               (e.currentTarget.style.backgroundColor = "#3b82f6")
  //             }
  //           >
  //             Join Now
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     duration: 1,
  //     position: "bottomRight",
  //     customStyle: {
  //       backgroundColor: "#001840",
  //       color: "white",
  //       borderRadius: "8px",
  //       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  //       padding: "14px 60px",
  //       width: "480px",
  //     },
  //     icon: <LuBellRing />,
  //     closeIcon: <LuX />,
  //   });
  //  }

  return children;
};

export default ClientWrapper;
