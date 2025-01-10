"use client";

import { Tooltip, Tour, Popconfirm } from "antd";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/src/store/auth/user";
import React, { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();
  const [openLogout, setOpenLogout] = useState(false);

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
    <nav className="h-14 bg-white flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-24 px-2 ">
      <Image
        alt={"Gala logo"}
        width={200}
        height={200}
        src={"/gala-logo.png"}
        className={"w-16 h-16 object-cover bg-white/45 rounded-full "}
      />

      <ul className="text-black font-black flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px] items-center justify-center">
        <li>
          <Link href={"/"} className="hover:cursor-pointer">
            Home
          </Link>
        </li>
        <li>
          <Link href={"#"} className="hover:cursor-pointer">
            About Us
          </Link>
        </li>

        {!user && (
          <div className="flex gap-3 pointer-events-none" onClick={() => {}}>
            <ChooseAccont />
            <Link href={""} className="hover:cursor-pointer">
              <li>Login</li>
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

        {user && (
          <div className="">
            <Popconfirm
              // zIndex={1000}
              placement="bottom"
              title="Are you sure you want to logout?"
              open={openLogout}
              onConfirm={() => {}}
              okButtonProps={{
                loading: false,
              }}
              onCancel={() => {
                setOpenLogout(false);
              }}
              destroyTooltipOnHide={true}
              // getPopupContainer={(trigger) => trigger.parentElement} 
            >
              <Tooltip color="black" title="Logout" placement="right">
                <LuLogOut
                  onClick={() => setOpenLogout(true)}
                  className="hover:cursor-pointer hover:bg-transparent/10 p-1 hover:rounded-md text-2xl"
                />
              </Tooltip>
            </Popconfirm>
          </div>
        )}
      </ul>
    </nav>
  );
};

{
  /* <Popconfirm
  title="Title"
  description="Open Popconfirm with async logic"
  open={open}
  onConfirm={handleOk}
  okButtonProps={{
    loading: confirmLoading,
  }}
  onCancel={handleCancel}
>
  <Button type="primary" onClick={showPopconfirm}>
    Open Popconfirm with async logic
  </Button>
</Popconfirm>; */
}

// const WaitForLaunch = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold text-center">Launching soon...</h1>
//     </div>
//   );
// };

// const steps = [
//   {
//     title: "Launch Information",
//     content: <WaitForLaunch />,
//     target: ".some-target-class",
//   },
// ];

// <Tour
//   open={true}
//   onClose={() => setOpen(false)}
//   mask={false}
//   type="primary"
//   steps={steps}
// />;

export default Navbar;
