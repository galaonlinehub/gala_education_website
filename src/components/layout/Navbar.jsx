"use client";

import { Popconfirm, Tooltip, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { Signout } from "../ui/auth/signup/Signout";
import { useUser } from "@/src/hooks/useUser";
import AboutUs from "../home/modals/AboutUs";
import MobileSideBar from "./MobileSideBar";
import { useDevice } from "@/src/hooks/useDevice";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import useNetwork from "@/src/hooks/useNetwork";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const { width } = useDevice();

  const { isOnline, connectionQuality } = useNetwork();

  const [openLogout, setOpenLogout] = useState(false);

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
                message={"Your internet connection is weak and may be unstable."}
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
    <nav className="h-12 flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-4 px-2 bg-white">
      <Image
        alt={"Gala logo"}
        width={150}
        height={150}
        src={"/gala-logo.png"}
        className={"w-16 h-16 object-cover rounded-full "}
      />

      <ul className="text-black font-black flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px] items-center justify-center">
        <div className="mr-2 lg:mr-6 cursor-pointer">{getIcon()}</div>

        <Popconfirm
          title={<div className="text-xs font-light mt-1">Choose language</div>}
          open={open}
          onOpenChange={handleOpenChange}
          onConfirm={confirm}
          onCancel={cancel}
          okText={<div className="flex flex-col items-center">English</div>}
          cancelText={<div className="flex flex-col items-center">Swahili</div>}
          okButtonProps={{
            className: "font-thin h-auto",
            style: {
              backgroundColor: "#001840",
              color: "white",
              fontSize: "12px",
              padding: "4px 8px",
            },
          }}
          cancelButtonProps={{
            className: "font-thin h-auto",
            style: {
              backgroundColor: "#001840",
              color: "white",
              border: "none",
              fontSize: "12px",
              padding: "4px 8px",
            },
          }}
          icon={
            <SettingOutlined
              style={{
                color: "darkBlue",
                fontSize: "10px",
              }}
            />
          }
        >
          <Image
            width={200}
            height={200}
            alt="Language translate image"
            src={"/language_translate.png"}
            className={"w-5 h-5 object-cover bg-white/45 cursor-pointer"}
          />
        </Popconfirm>

        <li>
          <Link href={"/"} className="hover:cursor-pointer tex-black">
            Home
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`${user.role}`} className="hover:cursor-pointer">
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
          <div className="flex gap-3" onClick={() => {}}>
            <ChooseAccont />
            <Link href={"/signin"} className="hover:cursor-pointer">
              <li>Sign In</li>
            </Link>
          </div>
        )}

        {user && (
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <CloseOutlined className="text-[20px]" />
            ) : (
              <MenuOutlined className="text-[20px]" />
            )}
          </button>
        )}

        {user && <Signout />}
      </ul>

      {width < 768 && (
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
