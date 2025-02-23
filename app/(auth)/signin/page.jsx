"use client";
import LoginVectorSvg from "@/src/utils/vector-svg/sign-in/LoginVectorSvg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { message, Alert } from "antd";
import GoogleSvg from "@/src/utils/vector-svg/sign-in/GoogleSvg";
import { handleGoogleLogin, login } from "@/src/utils/fns/auth";
import { preventCopyPaste } from "@/src/utils/fns/general";
import { useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/src/utils/fns/global";
import { roleRedirects } from "@/src/utils/data/redirect";

const SignInPage = () => {
  const key = crypto.randomUUID();
  // alert(key);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [localFeedback, setLocalFeedback] = useState({
    show: false,
    type: "",
    message: "",
  });

  const errorMessage = "Unexpected Error. Try again later.";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      if (res === 1) {
        // await queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        const userData = await queryClient.fetchQuery({
          queryKey: ["auth-user"],
          queryFn: getUser,
          staleTime: Infinity,
        });

        if (userData?.role) {
          const redirectPath = roleRedirects[userData.role] || "/";
          router.push(redirectPath);
        }
      }
    } catch (error) {
      showError(error?.message);
    } finally {
      setTimeout(() => clearFeedback(), 10000);
    }
  };

  const showError = (message) => {
    setLocalFeedback({
      show: true,
      type: "error",
      message,
    });
  };

  const clearFeedback = () => {
    setLocalFeedback({
      show: false,
      type: "",
      message: "",
    });
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 xl:px-16 flex justify-center h-full">
      <div className="flex flex-col items-center pt-14 gap-2 lg:gap-3 w-full max-w-xl">
        <span className="font-black text-xs md:text-base">Sign In</span>
        <span className="font-black text-2xl md:text-4xl">Welcome Back</span>
        <span className="text-xs md:text-sm font-medium text-center px-4 sm:px-8">
          Welcome back! We&#39;re excited to see you again, let&#39;s pick up
          where you left off and continue your learning journey!
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full gap-2 md:gap-3 lg:gap-4"
        >
          {localFeedback.show && (
            <Alert
              showIcon
              closable
              message={localFeedback.message}
              type={localFeedback.type}
              className="!my-2 !w-full"
            />
          )}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-black text-xs lg:text-sm">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              autoComplete="off"
              autoCorrect="off"
              className={`h-input-height border-[0.5px] focus:border-[1.5px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full text-xs ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] font-light">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-black text-xs lg:text-sm">
              Password *
            </label>
            <input
              id="password"
              type="password"
              onCopy={preventCopyPaste}
              onPaste={preventCopyPaste}
              onCut={preventCopyPaste}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              autoComplete="off"
              autoCorrect="off"
              className={`h-input-height border-[0.5px] focus:border-[1.5px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full text-xs ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-[10px] font-light">
                {errors.password.message}
              </span>
            )}
          </div>

          <span className="font-bold text-sm self-end">
            Forgot
            <span
              className="font-bold sm:text-sm text-[#030DFE] ml-2 cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Password?
            </span>
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white text-base py-2 bg-[#030DFE] rounded-md w-3/4 lg:w-1/2 font-bold mt-5 disabled:opacity-60 flex items-center justify-center gap-2 text-xsdisabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <span className="text-xs font-semibold mt-1 md:mt-2">
          Don&#39;t have an account?{" "}
          <span
            className="text-[#030DFE] cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </span>

        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="rounded-md h-12 w-full lg:w-3/4 md:w-full bg-[#001840] mt-10 text-white lg:text-base font-black disabled:opacity-70 flex items-center justify-center gap-3 lg:gap-5 px-4 py-2 text-xs md:text-sm"
        >
          <GoogleSvg />
          Continue with Google
        </button>
      </div>

      {/* <LoginVectorSvg /> */}
    </div>
  );
};

export default SignInPage;
