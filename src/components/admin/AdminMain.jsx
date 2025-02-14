"use client";
import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useStore } from "@/src/store/navigation";
import { Drawer } from "antd";
import { adminLinks } from "@/src/utils/data/links";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";

function AdminMain({ children }) {
  const openMenu = useStore((state) => state.openMenu);
  const setOpen = useStore((state) => state.setOpenMenu);
  const pathname = usePathname();

  return (
    <div className="flex w-screen">
      <AdminSidebar />
      <main className="fixed left-0 sm:left-[240px] ">
        <AdminNavbar />
        <section className="bg-[#ecf0fa] h-[calc(100vh-64px)] overflow-auto ">
          <div className="p-4 min-h-screen">{children}</div>
          <footer className="w-full text-[#d9d9d9] text-center py-2 bg-blue-900">
            Galahub @2024 v1.0
          </footer>
        </section>
      </main>

      <Drawer
        title="Gala Education"
        placement={"left"}
        closable={false}
        onClose={() => setOpen(false)}
        open={openMenu}
        key={"left"}
        className="!sm:hidden !relative !px-0"
      >
        <div className="flex items-center justify-center py-14 flex-col gap-2">
          <div className="w-16 h-16 relative ">
            <Image
              alt="image"
              src={"/man.jpg"}
              className="outline outline-[#001840] shadow-2xl outline-[3px] outline-offset-2 rounded-full object-cover"
              layout="fill"
            />

            <span className="w-3 h-3 absolute bottom-0 right-0 bg-green-500 animate-wave-pulse rounded-full" />
          </div>
          <div className="flex flex-col items-center ">
            <h1 className="font-black">Frank Ndagula</h1>
            <h2 className="text-[#8991a5]">System Administrator</h2>
          </div>
        </div>
        <div className="py-2">
          {adminLinks.map(({ name, link, icon: Icon }, i) => (
            <Link
              onClick={() => setOpen(false)}
              key={i}
              href={link}
              className={`flex  items-center justify-between px-4 py-2 w-full ${
                pathname === link
                  ? "bg-blue-900 text-white font-black"
                  : "text-gray-600"
              } `}
            >
              <h1>{name}</h1>
              <Icon />
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-10 left-0 ">
          <MdClose
            className="text-red bg-gray-300 h-10 w-10 rounded-full p-2"
            onClick={() => setOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default AdminMain;
