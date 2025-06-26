import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Avatar, Typography, Divider, Button } from "antd";
import { useUser } from "@/src/hooks/data/useUser";
import { Signout } from "../ui/auth/signup/Signout";
import { img_base_url } from "@/src/config/settings";
import { LuX, LuUser, LuLogOut, LuLoaderCircle } from "react-icons/lu";
import { usePathname, useSearchParams } from "next/navigation";
import { links } from "@/src/utils/data/redirect";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const MobileSideBar = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const currentUrl = usePathname();
  const router = useRouter();

  return (
    <>
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className=" border-2 border-gray-500 rounded-full">
                <Avatar
                  size={54}
                  src={
                    user?.profile_picture &&
                    `${img_base_url + user?.profile_picture}`
                  }
                  icon={<LuUser className="text-black" />}
                  onClick={() => {
                    router.push(`/${user?.role}/profile`);
                    onClose();
                  }}
                />
              </div>
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
        <ul className="space-y-4">
          {links[user?.role]?.map((item, i) => (
            <li key={i}>
              <Link
                href={`/${user?.role}/${item.link}`}
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

        {<Signout onCloseSidebar={onClose} />}

        <div className="pt-4 mt-auto">
          <Text type="secondary" className="text-xs">
            © {new Date().getFullYear()} Gala. All rights reserved.
          </Text>
        </div>
      </Drawer>
    </>
  );
};

export default MobileSideBar;
