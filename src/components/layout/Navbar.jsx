"use client";

import { Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";

import MobileSideBar from "@/src/components/layout/MobileSideBar";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import { Signout } from "@/src/components/ui/auth/signup/Signout";
import { useNav } from "@/src/hooks/ui/useNav";

const Navbar = () => {
  const {
    width,
    user,
    gotoHomePage,
    toggleSidebar,
    isSidebarOpen,
    getIcon,
    items,
    handleOpenChange,
    setIsSidebarOpen,
  } = useNav();

  return (
    <nav className="h-12 flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-10 sm:px-6 px-2 bg-white">
      <Image
        alt={"Gala logo"}
        width={150}
        height={150}
        onClick={gotoHomePage}
        src={"/gala-logo.png"}
        className={"w-16 h-16 object-cover cursor-pointer rounded-full "}
      />

      <ul className="text-black flex sm:gap-x-6 gap-x-4 text-[12px] xxs:text-xs md:text-sm leading-[5px] items-center justify-center font-black">
        <div className="cursor-pointer">{getIcon()}</div>

        {/* <Dropdown
          menu={{ items }}
          trigger={["click"]}
          open={open}
          onOpenChange={handleOpenChange}
          overlayClassName="rounded-md shadow-lg border border-gray-100"
          arrow={true}
          placement="bottom"
        >
          <Image
            width={200}
            height={200}
            alt="Language translate image"
            src="/language_translate.png"
            className="w-5 h-5 object-cover bg-white/45 cursor-pointer"
          />
        </Dropdown> */}

        <li>
          <Link href={"/"} className="hover:cursor-pointer text-black">
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
          <Link href={"/about-us"} className="hover:cursor-pointer text-black">
            About Us
          </Link>
        </li>
        {!user && (
          <div
            className="flex gap-3 items-center justify-center"
            onClick={() => {}}
          >
            <ChooseAccont
              btnText={"Sign Up"}
              textColor={"black"}
              placement={"bottom"}
              trigger={"hover"}
            />
            <Link href={"/signin"} className="hover:cursor-pointer">
              <li>Sign In</li>
            </Link>
          </div>
        )}
        {width < 768 && user && !isSidebarOpen && (
          <LuMenu
            size={32}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className="text-[20px] p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          />
        )}
        {user && width > 768 && <Signout />}
      </ul>

      {user && width < 768 && (
        <MobileSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
