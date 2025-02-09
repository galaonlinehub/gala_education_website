"use client";

import { Tooltip, Tour, Popconfirm } from "antd";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { LuLogOut } from "react-icons/lu";
import { Signout } from "../ui/auth/signup/Signout";
import { useUser } from "@/src/hooks/useUser";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();
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
          <Link href={"#"} className="hover:cursor-pointer">
            About Us
          </Link>
        </li>

        {!user && (
          <div className="flex gap-2" onClick={() => {}}>
            <ChooseAccont />
            <Link href={""} className="hover:cursor-pointer">
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
              <CloseOutlined style={{ fontSize: "20px" }} />
            ) : (
              <MenuOutlined style={{ fontSize: "20px" }} />
            )}
          </button>
        )}

        {user && <Signout />}
      </ul>
    </nav>
  );
};

export default Navbar;
