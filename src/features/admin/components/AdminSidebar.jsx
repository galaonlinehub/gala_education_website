"use client";
import { adminLinks } from "@/src/utils/data/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AdminSidebar() {
    const pathname = usePathname();

 function isExactOrSubPath(pathname, link) {
    if (pathname === link) return true;
    return pathname.startsWith(link + "/") && link !== '/admin';
}


    return (
        <div className="h-screen fixed sm:block hidden w-[240px] border-black/20 border-r-[0.8px] ">
            <div className="h-[64px] px-[20px]   py-[15px] flex items-center justify-center">
                <Image
                    alt="image"
                    src={"/gala_logo.png"}
                    className="h-14 w-14 object-cover"
                    width={100}
                    height={100}
                />
                <h1 className="text-primary-500 font-bold">Gala Education</h1>
            </div>

            <div className="p-4">
                {adminLinks.map(({ name, link, icon: Icon }, i) => (
                    <Link
                        key={i}
                        href={link}
                        className={`flex text-xs items-center space-x-4 px-4 py-2 w-full ${
                            isExactOrSubPath(pathname, link)
                                ? "bg-blue-300 text-blue-800 rounded-md font-black"
                                : ""
                        }`}
                    >
                        <Icon />
                        <h1>{name}</h1>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AdminSidebar;
