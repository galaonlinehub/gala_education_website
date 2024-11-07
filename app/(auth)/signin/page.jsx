'use client'
import LoginVectorSvg from "@/src/utils/vector-svg/sign-in/LoginVectorSvg";
import React from "react";
import { useRouter } from 'next/navigation';


const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="flex lg:items-center justify-center h-screen px-3 md:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md z-10">
        <span className="font-black">Login</span>
        <span className="font-black text-4xl">Welcome Back</span>
        <span className="text-sm font-medium text-center px-4 sm:px-8">
          "Welcome back! We're excited to see you again, let's pick up where you
          left off and continue your learning journey!"
        </span>
        <form className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="login-email" className="font-black">
              Email *
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="off"
              autoCorrect="off"
              className="h-input-height border-[3px] rounded-[3px] focus:outline-none p-2 border-[#030DFE] w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="login-password" className="font-black">
              Password *
            </label>
            <input
              id="login-password"
              autoComplete="off"
              autoCorrect="off"
              className="h-12 border-[3px] rounded-[3px] focus:outline-none p-2 border-[#030DFE] w-full"
            />
          </div>
          <span className="font-bold text-sm self-end">
            Forgot
            <span className="font-bold text-sm text-[#030DFE] ml-2">
              Password?
            </span>
          </span>
          <button
           onClick={()=>router.push('/teacher')}
           className="text-white text-base h-12 bg-[#030DFE] rounded-md w-60 font-black mt-5">
          
            Login
          </button>
        </form>
        <span className="text-sm font-semibold mt-3">
          Don't have an account? <span className="text-[#030DFE]">Sign Up</span>
        </span>

        <button className="rounded-md h-12 w-3/4 md:w-full bg-[#001840] mt-10 text-white text-base font-black">
          Continue with Google
        </button>
      </div>

      <LoginVectorSvg/>

    </div>
  );
};

export default SignInPage;
