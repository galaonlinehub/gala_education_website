"use client";
import LoginVectorSvg from "@/src/utils/vector-svg/sign-in/LoginVectorSvg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { api } from "@/src/config/settings";
import GoogleSvg from "@/src/utils/vector-svg/sign-in/GoogleSvg";
import LoadingState from "@/src/components/ui/loading/LoadingSpinner";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      message.destroy();

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await api.post("/login", formData, {});

      if (response.data) {
        message.success("Login successful!");
        router.push("/teacher");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      // setLoading(false);
    }
  };

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/google");
      window.location.href = response.data.authUrl;
    } catch (error) {
      message.error("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex lg:items-center justify-center h-screen px-3 md:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-xl z-10">
        <span className="font-black">Login</span>
        <span className="font-black text-4xl">Welcome Back</span>
        <span className="text-sm font-medium text-center px-4 sm:px-8">
          &quot; Welcome back! We&#39;re excited to see you again, let&#39;s
          pick up where you left off and continue your learning journey!&quot;
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full gap-4"
        >
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
            className="text-white text-base h-12 bg-[#030DFE] rounded-md w-60 font-bold mt-5 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingState /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <span className="text-sm font-semibold mt-3">
          Don&#34;t have an account?{" "}
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
          className="rounded-md h-12 w-3/4 md:w-full bg-[#001840] mt-10 text-white text-base font-black disabled:opacity-70 flex items-center justify-center gap-5"
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
