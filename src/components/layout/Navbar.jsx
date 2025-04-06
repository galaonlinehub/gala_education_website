"use client";

import { Tooltip, message, Dropdown, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { Signout } from "../ui/auth/signup/Signout";
import { useUser } from "@/src/hooks/useUser";
import AboutUs from "../home/modals/AboutUs";
import MobileSideBar from "./MobileSideBar";
import { useDevice } from "@/src/hooks/useDevice";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import useNetwork from "@/src/hooks/useNetwork";
import { LuGlobe } from "react-icons/lu";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const { width } = useDevice();
  const { isOnline, connectionQuality } = useNetwork();

  const [showLanguage, setShowLanguage] = useState(false);
  const [language, setLanguage] = useState("english");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(false);
  const changeCondition = (checked) => {
    setCondition(checked);
  };

  const items = [
    {
      key: "1",
      icon: <LuGlobe className="text-xl" />,
      label: (
        <div className="flex flex-col items-center text-sm font-medium">
          English
        </div>
      ),
      onClick: () => {},
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col items-center text-sm px-3 font-medium">
          Swahili
        </div>
      ),
      onClick: () => {},
      disabled: true,
    },
  ];

  const confirm = () => {
    setOpen(false);
    message.success("English language chosen.");
  };
  const cancel = () => {
    setOpen(false);
    message.success("Swahili language chosen.");
  };
  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
    if (condition) {
      confirm();
    } else {
      setOpen(newOpen);
    }
  };

  const getIcon = () => {
    if (!isOnline) {
      return (
        <Tooltip
          placement="bottom"
          title={
            <NetworkMessage
              message={
                "You're offline. Please connect to Wi-Fi or enable mobile data."
              }
            />
          }
        >
          <BiWifiOff className="text-red-600 text-xl animate-bounce" />
        </Tooltip>
      );
    }
    switch (connectionQuality) {
      case "good":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={"Your internet connection is strong and stable."}
              />
            }
          >
            <BiWifi className="text-green-600 text-xl animate-pulse" />
          </Tooltip>
        );
      case "moderate":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={"Your connection is working but could be better."}
              />
            }
          >
            <BiWifi className="text-yellow-600 text-xl" />
          </Tooltip>
        );
      case "weak":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={
                  "Your internet connection is weak and may be unstable."
                }
              />
            }
          >
            <BiWifi className="text-orange-600 text-xl animate-bounce" />
          </Tooltip>
        );
      default:
        return <BiWifi className="text-gray-600 text-xl" />;
    }
  };

  return (
    <nav className="h-12 flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-10 sm:px-6 px-2 bg-white">
      <Image
        alt={"Gala logo"}
        width={150}
        height={150}
        src={"/gala-logo.png"}
        className={"w-16 h-16 object-cover rounded-full "}
      />

      <ul className="text-black flex sm:gap-x-4 gap-x-2 sm:text-[12px] text-[8px] leading-[5px] items-center justify-center font-black">
        <div className="cursor-pointer">{getIcon()}</div>

        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          open={open}
          onOpenChange={handleOpenChange}
          overlayClassName="rounded-md shadow-lg border border-gray-100"
          arrow={true}
          placement="bottomCenter"
          // dropdownRender={(menu) => (
          //   <div>
          //     <div className="text-xs font-light text-black px-4 py-2">
          //       Choose language
          //     </div>
          //     {menu}
          //   </div>
          // )}
        >
          <Image
            width={200}
            height={200}
            alt="Language translate image"
            src="/language_translate.png"
            className="w-5 h-5 object-cover bg-white/45 cursor-pointer"
          />
        </Dropdown>

        <li>
          <Link href={"/"} className="hover:cursor-pointer tex-black">
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/${user.role}`} className="hover:cursor-pointer">
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link href={"/about-us"} className="hover:cursor-pointer tex-black">
            About Us
          </Link>
        </li>
        {!user && (
          <div
            className="flex gap-3 items-center justify-center"
            onClick={() => {}}
          >
            <ChooseAccont />
            <Link href={"/signin"} className="hover:cursor-pointer">
              <li>Sign In</li>
            </Link>
          </div>
        )}
        {width <= 768 && user && !isSidebarOpen && (
          <MenuOutlined
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className="text-[20px] p-2 hover:bg-gray-100 rounded-lg transition-colors"
          />
        )}
        {user && width > 768 && <Signout />}
      </ul>

      {user && width <= 768 && (
        <MobileSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </nav>
  );
};

const NetworkMessage = ({ message }) => {
  return <div className="text-xs text-center p-1">{message}</div>;
};
export default Navbar;
