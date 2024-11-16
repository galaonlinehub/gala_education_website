"use client";

import { useAccountType } from "@/src/store/auth/signup";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function RegisterCard({ image, title, desc, type }) {
  const { setAccountType } = useAccountType();
  const router = useRouter();



  const handleRegister = () => {
    message.destroy();
    if (!type) {
      message.error("Error occurred, Account type is not set");
      return;
    }
    setAccountType(type);
    router.push("/signup");
  };

  console.log("Rendering RegisterCard with type:", type);

  return (
    <div
      className="flex-col flex w-[20rem] sm:w-[18rem] shadow-xl shadow-black cursor-pointer"
      onClick={handleRegister}
    >
      <div className="w-full h-[12rem]">
        <Image
          alt="image Data"
          src={image}
          className="w-full h-full border-white border-[1px] object-cover"
          width={100}
          height={100}
        />
      </div>

      <div className="h-[10rem] bg-[#001840] flex flex-col items-center px-2 py-4">
        <span className="text-white font-black">{title}</span>
        <span className="text-white text-sm">{desc}</span>
      </div>
    </div>
  );
}

export default RegisterCard;
