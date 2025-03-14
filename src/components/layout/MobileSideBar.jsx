import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Menu, Avatar, Typography, Divider } from "antd";
import { useUser } from "@/src/hooks/useUser";
import { MdLiveTv, MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { Signout } from "../ui/auth/signup/Signout";
import { img_base_url } from "@/src/config/settings";
import { LuX, LuUser } from "react-icons/lu";
import {
  student_links,
  teacher_links,
} from "@/src/utils/data/navigation_links";
import { usePathname, useSearchParams } from "next/navigation";

const { Text, Title } = Typography;

const MobileSideBar = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const currentUrl = usePathname();

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar
                size={54}
                src={
                  user?.profile_picture &&
                  `${img_base_url + user?.profile_picture}`
                }
                icon={<LuUser className="text-black" />}
              />
              <div className="flex flex-col">
                <Text className="text-base font-black">
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text className="text-[10px] capitalize font-thin pl-1">
                  {user?.role}
                </Text>
              </div>
            </div>
            <LuX
              className="text-3xl cursor-pointer hover:bg-gray-800 p-1 rounded-md hover:text-white"
              onClick={onClose}
            />
          </div>
        }
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={380}
        closeIcon={null}
      >
        {/* <Menu
          mode="inline"
          items={
            user?.role == "student" ? student_links : teacher_links
          }
          defaultSelectedKeys={["home"]}
          onClick={onClose}
        /> */}

        <ul className="space-y-4 pt-6">
          {student_links.map((item, i) => (
            <li key={i}>
              <Link
                href={`/student/${item.link}`}
                className={`flex items-center gap-4 py-2 px-2 rounded-lg transition-colors ${
                  currentUrl.replace(/\/$/, "") ===
                  `/student${item.link === "." ? "" : `/${item.link}`}`
                    ? "bg-[#001840] text-white"
                    : "hover:bg-blue-950/20 hover:text-black"
                }`}
                // onClick={() => isMobile && setIsSidebarOpen(false)}
                onClick={onClose}
              >
                <span className="">{item.icon}</span>
                <span className="text-sm font-normal">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Divider style={{ margin: "12px 0" }} />

        <div className="px-4 pb-4">
          {user && <Signout signOutWord={"Sign Out"} />}
        </div>

        <div className="px-4 pt-4 mt-auto">
          <Text type="secondary" className="text-xs">
            © 2025 Gala. All rights reserved.
          </Text>
        </div>
      </Drawer>
    </>
  );
};

export default MobileSideBar;
