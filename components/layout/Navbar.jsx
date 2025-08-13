"use client";

import { Tooltip, message, Dropdown, Button } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { LuGlobe, LuMenu } from "react-icons/lu";

import ChooseAccont from "@/components/ui/auth/signup/ChooseAccount";
import { useUser } from "@/hooks/data/useUser";
import { useDevice } from "@/hooks/misc/useDevice";
import useNetwork from "@/hooks/misc/useNetwork";
import { useRouter, usePathname, Link } from "@/src/i18n/navigation";
import { useSubscribeStore } from "@/store/subscribeStore";

import MobileSideBar from "./MobileSideBar";
import AboutUs from "../home/modals/AboutUs";
import Subscribe from "../pay/Subscribe";
import { Signout } from "../ui/auth/signup/Signout";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const { user } = useUser();
  const { width } = useDevice();
  const { isOnline, connectionQuality } = useNetwork();
  const router = useRouter();
  const pathname = usePathname();

  const { setSubscribeOpen } = useSubscribeStore();

  const [messageApi, contextHolder] = message.useMessage();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(false);
  const changeCondition = (checked) => {
    setCondition(checked);
  };

  const gotoHomePage = () => {
    router.push("/");
  };

  // Get current locale using next-intl hook
  const currentLocale = useLocale();

  const handleLanguageToggle = () => {
    setIsLanguageLoading(true);
    
    const newLocale = currentLocale === 'en' ? 'sw' : 'en';
    const successMessage = newLocale === 'en' ? "English language chosen." : "Lugha ya Kiswahili imechaguliwa.";
    
    // Add loading delay for visual feedback
    setTimeout(() => {
      router.replace(pathname, { locale: newLocale });
      messageApi.info(successMessage);
      setIsLanguageLoading(false);
    }, 800);
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

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const internet = useTranslations('internet');

  const getIcon = () => {
    if (!isOnline) {
      return (
        <Tooltip
          color="#001840"
          placement="bottom"
          title={
            <NetworkMessage
              message={
                internet('offline')
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
            color="#001840"
            placement="bottom"
            title={
              <NetworkMessage
                message={internet('internet_stable')}
              />
            }
          >
            <BiWifi className="text-green-600 text-xl animate-pulse" />
          </Tooltip>
        );
      case "moderate":
        return (
          <Tooltip
            color="#001840"
            placement="bottom"
            title={
              <NetworkMessage
                message={internet('internet_mid')}
              />
            }
          >
            <BiWifi className="text-yellow-600 text-xl" />
          </Tooltip>
        );
      case "weak":
        return (
          <Tooltip
            color="#001840"
            placement="bottom"
            title={
              <NetworkMessage
                message={
                  internet('internet_unstable')
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

  const t = useTranslations('home_page');
  const at = useTranslations('about_us');
  const sut = useTranslations('sign_up');
  const navt = useTranslations('navbar');
  const navlinkt = useTranslations('nav_links');

  return (
    <>
      <nav className="h-12 flex justify-between max-w-screen items-center fixed top-0 inset-x-0 z-50 lg:px-10 sm:px-6 px-2 bg-white">
        {contextHolder}
        <Image
          alt={"Gala logo"}
          width={150}
          height={150}
          onClick={gotoHomePage}
          src={"/gala-logo.png"}
          className={"w-16 h-16 object-cover cursor-pointer rounded-full "}
        />

        <ul className="text-black flex sm:gap-x-4 gap-x-2 sm:text-[12px] text-[8px] leading-[5px] items-center justify-center font-black">
          {user?.has_free_trial && !user?.has_active_subscription && (
            <button
              onClick={() => setSubscribeOpen(true)}
              variant="solid"
              type="primary"
              className="rounded-full bg-[#001840] text-white hidden sm:block font-semibold text-sm hover:bg-[#001840]/80 px-5 py-2"
            >
              {navt('subscribe_now')}
            </button>
          )}
          <div className="cursor-pointer">{getIcon()}</div>

          {/* Language Toggle Button */}
          <button
            onClick={handleLanguageToggle}
            disabled={isLanguageLoading}
            className="bg-[#001840] text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-[#001840]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px]"
            title={`Switch to ${currentLocale === 'en' ? 'Swahili' : 'English'}`}
          >
            {isLanguageLoading ? '...' : (currentLocale === 'en' ? 'SW' : 'EN')}
          </button>

          <li>
            <Link href={"/"} className="hover:cursor-pointer tex-black">
              {t('home')}
            </Link>
          </li>
          {user && (
            <li>
              <Link href={`/${user.role}`} className="hover:cursor-pointer">
                {navlinkt('dashboard')}
              </Link>
            </li>
          )}
          <li>
            <Link href={"/about-us"} className="hover:cursor-pointer tex-black">
              {at('about_us')}
            </Link>
          </li>
          {!user && (
            <div
              className="flex gap-3 items-center justify-center"
              onClick={() => { }}
            >
              <ChooseAccont
                btnText={sut('sign_up')}
                textColor={"black"}
                placement={"bottom"}
                trigger={"hover"}
              />
              <Link href={"/signin"} className="hover:cursor-pointer">
                <li>{sut('sign_in')}</li>
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
        {/* <Subscribe openDrawer={drawerOpen} /> */}
      </nav>

      {/* Frost/Mirror Loading Overlay */}
      {isLanguageLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop with frost effect */}
          <div 
            className="absolute inset-0 bg-white/30 backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.4) 100%)',
              backdropFilter: 'blur(12px) saturate(150%)',
              WebkitBackdropFilter: 'blur(12px) saturate(150%)',
            }}
          >
            {/* Mirror/glass reflection effect */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%)',
              }}
            />
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
              }}
            />
          </div>

          {/* Loading content */}
          <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 px-8 py-6 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              {/* Logo */}
              <Image
                alt={"Gala logo"}
                width={80}
                height={80}
                src={"/gala-logo.png"}
                className={"w-20 h-20 object-cover rounded-full"}
              />
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NetworkMessage = ({ message }) => {
  return <div className="text-xs text-center p-1">{message}</div>;
};

export default Navbar;