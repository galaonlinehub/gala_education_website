"use client";
import LoginVectorSvg from "@/src/utils/vector-svg/sign-in/LoginVectorSvg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { message, Alert } from "antd";
import GoogleSvg from "@/src/utils/vector-svg/sign-in/GoogleSvg";
import LoadingState from "@/src/components/ui/loading/template/LoadingSpinner";
import "@/src/styles/auth/signup.css";
import useUser from "@/src/store/auth/user";
import { encrypt } from "@/src/utils/fns/encryption";
import Cookies from "js-cookie";
import { apiGet, apiPost } from "@/src/services/api_service";
import { cookieFn } from "@/src/utils/fns/client";
import { getUser } from "@/src/utils/fns/global";

const SignInPage = () => {
  // const key = crypto.randomUUID();
  // console.log(key);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useUser((state) => state.setUser);
  const [localFeedback, setLocalFeedback] = useState({
    show: false,
    type: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      message.destroy();

      const response = await apiPost("/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const encryptedToken = encrypt(response.data.token);
        cookieFn.set("9fb96164-a058-41e4-9456-1c2bbdbfbf8d", encryptedToken, 7);

        if (getUser() === 1) {
          const roleRedirects = {
            student: "/student",
            instructor: "/teacher",
            admin: "/admin",
            parent: "/parent",
          };

          const redirectTo = roleRedirects[res.data.role] || "/signin";
          router.push(redirectTo);

          if (redirectTo === "/signin") {
            setLocalFeedback({
              show: true,
              type: "error",
              message: "Unexpected Error. Try again.",
            });
            return;
          }
        }else{
          setLocalFeedback({
            show: true,
            type: "error",
            message: "Unexpected Error. Try again.",
          });
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setLocalFeedback({
        show: true,
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLocalFeedback({
          show: false,
          type: "",
          message: "",
        });
      }, 10000);
    }
  };

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await apiGet("/auth/google");
      window.location.href = response.data.authUrl;
    } catch (error) {
      setLocalFeedback({
        show: true,
        type: "error",
        message: "Google login failed. Please try again later.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLocalFeedback({
          show: false,
          type: "",
          message: "",
        });
      }, 10000);
    }
  };

  return (
    <div className="login-bg bg-cover bg-center flex lg:items-center justify-center h-screen px-3 md:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-xl">
        <span className="font-black">Login</span>
        <span className="font-black text-4xl">Welcome Back</span>
        <span className="text-sm font-medium text-center px-4 sm:px-8">
          Welcome back! We&#39;re excited to see you again, let&#39;s pick up
          where you left off and continue your learning journey!
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full gap-4"
        >
          {localFeedback.show && (
            <Alert
              showIcon
              // closable
              message={localFeedback.message}
              type={localFeedback.type}
              className="!my-2 !w-full"
            />
          )}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="font-black">
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
              className={`h-input-height border-[1px] focus:border-[2.5px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-black">
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
              className={`h-input-height border-[1px] focus:border-[2.5px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <span className="font-bold text-sm self-end">
            Forgot
            <span
              className="font-bold text-sm text-[#030DFE] ml-2 cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Password?
            </span>
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white text-base h-12 bg-[#030DFE] rounded-md w-3/4 lg:w-1/2 font-bold mt-5 disabled:opacity-60 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <span className="text-sm font-semibold mt-3">
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
          disabled={loading}
          className="rounded-md h-12 w-full lg:w-3/4 md:w-full bg-[#001840] mt-10 text-white lg:text-base font-black disabled:opacity-70 flex items-center justify-center gap-3 lg:gap-5 px-4 py-2 text-xs md:text-sm"
        >
          <GoogleSvg />
          Continue with Google
        </button>
      </div>

      <LoginVectorSvg />
    </div>
  );
};

export default SignInPage;
