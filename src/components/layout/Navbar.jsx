"use client";

import { Tooltip, Tour, Popconfirm, Select, Button, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined, SettingOutlined } from "@ant-design/icons";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { LuLogOut } from "react-icons/lu";
import { Signout } from "../ui/auth/signup/Signout";
import { useUser } from "@/src/hooks/useUser";
import AboutUs from "../home/modals/AboutUs";
import { FaLanguage } from "react-icons/fa6";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();
  const [openLogout, setOpenLogout] = useState(false);

  const [showLanguage, setShowLanguage] = useState(false);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    console.log(condition);
    if (condition) {
      confirm();
    } else {
      setOpen(newOpen);
    }
  };

  return (
    <nav className="h-14 flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-24 px-2 bg-white">
      <Image
        alt={"Gala logo"}
        width={150}
        height={150}
        src={"/gala-logo.png"}
        className={"w-16 h-16 object-cover rounded-full "}
      />

      <ul className="text-black font-black flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px] items-center justify-center">
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
          <Image width={200} height={200} alt="Language translate image" src={"/language_translate.png"} className={"w-5 h-5 object-cover bg-white/45 cursor-pointer"} />
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
          <AboutUs />
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
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleSidebar} aria-label="Toggle menu">
            {isSidebarOpen ? <CloseOutlined style={{ fontSize: "20px" }} /> : <MenuOutlined style={{ fontSize: "20px" }} />}
          </button>
        )}

        {user && <Signout />}
      </ul>
    </nav>
  );
};

export default Navbar;
