"use client";
import Image from "next/image";
import { useEffect } from "react";
import useUser from "@/src/store/auth/user";

const TemplateLoader = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white z-[9999]">
      <div className="relative w-full h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/gala-logo.png"
            width={80}
            height={80}
            alt="Gala Logo"
            priority
          />
        </div>
        <div className="w-full pb-8 flex justify-center">
          <div className="font-black text-[14px]">
            Gala&nbsp;&nbsp;Education
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLoader;