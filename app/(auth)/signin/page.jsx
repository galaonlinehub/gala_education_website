"use client";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { login } from "@/src/utils/fns/auth";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { getUser } from "@/src/utils/fns/global";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { roleRedirects } from "@/src/utils/data/redirect";
import { preventCopyPaste } from "@/src/utils/fns/general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoginVectorSvg from "@/src/utils/vector-svg/sign-in/LoginVectorSvg";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";

const SignInPage = () => {
  // const key = crypto.randomUUID();
  // alert(key);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const [localFeedback, setLocalFeedback] = useState({
    show: false,
    message: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const watchedFields = useWatch({ name: ["email", "password"], control });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      setLocalFeedback((prev) => ({
        ...prev,
        show: true,
        message: "Signed in successfully, Redirecting you now…",
      }));

      if (res === 1) {
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
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unexpected error occurred, Try again later";
      setLocalFeedback((prev) => ({ ...prev, show: true, message }));
    },
    onSettled: () => {},
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    const resetFeedback = debounce(() => {
      if (localFeedback.show) {
        setLocalFeedback({ show: false, message: "" });
        loginMutation.reset();
      }
    }, 500);

    resetFeedback();

    return () => resetFeedback.cancel();
  }, [watchedFields]);

  return (
    <div className="px-6 md:px-8 lg:px-12 xl:px-16 flex justify-center h-full">
      <div className="flex flex-col items-center pt-14 gap-2 lg:gap-3 w-full max-w-xl">
        <span className="font-black text-xs md:text-base">Sign In</span>
        <span className="font-black text-2xl md:text-4xl">Welcome Back</span>
        <span className="text-xs md:text-sm font-medium text-center px-4 sm:px-8">
          Welcome back! We&#39;re excited to see you again, let&#39;s pick up
          where you left off and continue your learning journey!
        </span>

        <motion.div
          animate={
            loginMutation.isError
              ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.6 }}
          key={loginMutation.isError ? "error-shake" : "no-shake"}
          className="w-full"
        >
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full gap-2 md:gap-3 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {localFeedback.show && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    "w-full text-xs font-medium text-center py-2 px-3 border-[0.8px] rounded-lg shadow-sm",
                    loginMutation.isError
                      ? "border-red-500 text-red-600 bg-red-50"
                      : loginMutation.isSuccess
                      ? "border-green-500 text-green-600 bg-green-50"
                      : ""
                  )}
                >
                  {localFeedback.message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="font-black text-xs lg:text-sm">
                Email *
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Please enter your email address",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter valid email address",
                  },
                  // onChange: handleChange,
                })}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className={`h-input-height border-[0.5px] focus:border-[1.5px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full text-xs ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-[12px] font-normal">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full relative">
              <label
                htmlFor="password"
                className="font-black text-xs lg:text-sm"
              >
                Password *
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    // onChange: handleChange,
                  })}
                  autoComplete="new-password"
                  autoCorrect="off"
                  className={`h-input-height border-[0.5px] focus:border-[1.5px] rounded-md focus:outline-none p-2 pr-10 w-full text-xs ${
                    errors.password ? "border-red-500" : "border-[#030DFE]"
                  }`}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-[12px] font-normal">
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
              disabled={
                loginMutation.isPending ||
                loginMutation.isError ||
                loginMutation.isSuccess
              }
              className="text-white text-base py-2 bg-[#030DFE] rounded-md w-full font-bold mt-5 disabled:opacity-50 flex items-center justify-center gap-2 disabled:cursor-not-allowed h-11"
            >
              {loginMutation.isPending ? (
                <SlickSpinner size={14} color="white" />
              ) : (
                "Sign In"
              )}
            </button>
          </motion.form>
        </motion.div>

        <span className="text-xs font-semibold mt-1 md:mt-2">
          Don&#39;t have an account?{" "}
          <span
            className="text-[#030DFE] cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </span>
      </div>

      <LoginVectorSvg />
    </div>
  );
};

export default SignInPage;
