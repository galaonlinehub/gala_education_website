"use client";
import { useEffect, useState } from "react";
import { useCookies } from "@/src/store/auth/signup";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const AcceptCookies = () => {
  const router = useRouter();
  const { setCookieIsAccepted } = useCookies();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const onClick = () => {
    setCookieIsAccepted(1);
  };

  return (
    <div
      className={`bg-white fixed bottom-0 inset-x-0 p-2 sm:p-4 lg:p-6 flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-8 z-[90] shadow-2xl border-t min-h-[150px] lg:h-44 transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-black w-full lg:w-1/2 text-[10px] xs:text-[11px] sm:text-[12px] md:text-sm leading-relaxed px-1 lg:px-0">
        We use cookies and similar technologies on our website to enhance site
        navigation, analyze site usage, and assist in our marketing efforts.
        Accept all cookies or customize your settings to individually select
        which cookies you allow. For more information see our{" "}
        <span
          className="text-blue-600 underline underline-offset-2 xs:underline-offset-4 cursor-pointer hover:text-blue-800 transition-colors whitespace-nowrap"
          onClick={() => router.push("/cookies-policy")}
        >
          Cookies Policy
        </span>
        .
      </div>

      <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap justify-center lg:justify-end gap-2 sm:gap-3 lg:gap-8 px-1 lg:px-0">
        <Button
          className="!text-black !border-black !w-[30%] lg:!w-1/3 min-w-[80px] !h-8 xs:!h-9 sm:!h-10 !rounded-none !text-[10px] xs:!text-[11px] sm:!text-sm hover:!bg-gray-100 transition-colors !px-6"
          onClick={() => router.push("/terms-and-privacy")}
        >
          Terms of Service
        </Button>
        <Button
          className="!border-transparent !text-white !h-8 xs:!h-9 sm:!h-10 !rounded-none !bg-black !w-[30%] lg:!w-1/3 min-w-[80px] !text-[10px] xs:!text-[11px] sm:!text-sm hover:!bg-gray-800 transition-colors"
          onClick={onClick}
        >
          Reject
        </Button>
        <Button
          className="!border-transparent !bg-black !h-8 xs:!h-9 sm:!h-10 !rounded-none !text-white !w-[30%] lg:!w-1/3 min-w-[80px] !text-[10px] xs:!text-[11px] sm:!text-sm hover:!bg-gray-800 transition-colors"
          onClick={onClick}
        >
          Accept All
        </Button>
      </div>
    </div>
  );
};

export default AcceptCookies;
