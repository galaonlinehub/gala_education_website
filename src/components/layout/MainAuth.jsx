"use client";
import localFont from "next/font/local";
// import "../../../app/global.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import Link from "next/link";
import { Popconfirm } from "antd";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import useUser from "@/src/store/auth/user";
import Image from "next/image";

const AuthMain = ({ children }) => {
  const { user } = useUser();
  return (
    <div>
      <div className="w-screen max-w-screen-2xl mx-auto h-full ">
        <nav className="h-14 bg-white py-2 px-4 flex justify-between mx-auto max-w-screen items-center">
          {/*<div className="w-[40px] h-[40px] relative bg-[#d9d9d9]  rounded-full  ring-[#a0a0a0] ring-offset-1 ring-[2px] flex items-start flex-col ">*/}
          {/*  <div className="absolute left-2 top-1 flex flex-col">*/}
          {/*    <p className="text-black text-[12px] font-bold leading-tight">*/}
          {/*      Gala*/}
          {/*    </p>*/}
          {/*    <p className="text-black text-[12px] font-bold leading-tight">*/}
          {/*      Education*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <Image
              alt={"Gala logo"}
              width={200}
              height={200}
              src={'/gala-logo.png'}
              className={'w-16 h-16 object-cover bg-white/45 rounded-full '}
          />


          <ul className="text-black font-black flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px]">
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
            {!user  && (
              <>
                <ChooseAccont />
                <Link href={"/signin"} className="hover:cursor-pointer">
                  <li>Login</li>
                </Link>
              </>
            )}
          </ul>
          {/* <div/> */}
        </nav>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthMain;
