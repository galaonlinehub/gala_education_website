"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { message, Input, Button, Card, Typography, Space, Alert } from "antd";
import LoadingState from "@/src/components/ui/loading/template/LoadingSpinner";
import { encrypt } from "@/src/utils/fns/encryption";
import { apiPost } from "@/src/services/api_service";
import {
  LuCircleCheckBig,
  LuKeySquare,
  LuLoaderCircle,
  LuMail,
  LuRotateCw,
  LuSendHorizontal,
  LuX,
} from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { useDevice } from "@/src/hooks/useDevice";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";

const { Text } = Typography;

const ForgotPassword = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(null);
  const [resendCounter, setResendCounter] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState({ status: "", message: "" });
  const otpRefs = useRef([]);
  const { width } = useDevice();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    let timer;
    if (resendCounter > 0) {
      timer = setInterval(() => {
        setResendCounter((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCounter]);

  const resetPasswordMutation = useMutation({
    mutationFn: (data) =>
      apiPost("/password/reset-request", { email: data.email }),

    onSuccess: (response, variables) => {
      if (response.status === 200) {
        const encryptedEmail = encrypt(variables.email);
        sessionStorageFn.set("Gala", encryptedEmail);

        setEmail(variables.email);
        setOtpSent(true);
        setResendCounter(30);

        message.success("OTP sent to your email");
      }
    },
    onError: (res) => {
      if (
        res.status === 422 &&
        Object.keys(res?.response?.data?.errors).includes("email")
      ) {
        setError("email", {
          type: "manual",
          message: "No account registered with this email 😕",
        });
      } else {
        message.error(
          "Something went wrong. Please try again later. If the issue persists, contact support."
        );
      }
    },
    onSettled: () => {},
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate(data);
  };

  const handleResendOtp = async () => {
    if (resendCounter > 0) return;
    try {
      setIsSendingOtp(true);
      const response = await apiPost("/request-otp", {
        email: email,
      });
      if (response.status === 200) {
        setResendCounter(30);
        message.success("OTP resent to your email", 6);
      }
    } catch (e) {
      message.error(`Failed to resend OTP: ${e.message}`);
    } finally {
      setIsSendingOtp(false);
      setResendCounter(30);
    }
  };

  const handleOtpChange = (value, index) => {
    setIsVerifyingOtp(null);
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }

    if (newOtpValues.every((v) => v !== "") && value) {
      verifyOtp(newOtpValues.join(""));
    }

    setOtpStatus((prev) => ({ ...prev, status: "", message: "" }));
  };

  const verifyOtp = async (otp) => {
    try {
      setIsVerifyingOtp("loading");
      const response = await apiPost("/verify-otp", {
        email,
        otp,
      });

      if (response.status === 200) {
        setIsVerifyingOtp("success");
        setOtpStatus({
          status: "success",
          message: "",
        });
        setTimeout(() => {
          router.push("/forgot-password/password-change");
        }, 3000);
      }
    } catch (e) {
      setOtpStatus({
        status: "error",
        message:
          e?.response?.data?.message ||
          "Invalid or expired OTP. Please try again.",
      });
      setIsVerifyingOtp("error");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d+$/.test(pastedData) && pastedData.length <= otpValues.length) {
      const newOtpValues = [...otpValues].map((_, index) =>
        index < pastedData.length ? pastedData[index] : ""
      );
      setOtpValues(newOtpValues);

      const nextEmptyIndex = newOtpValues.findIndex((value) => value === "");
      const focusIndex =
        nextEmptyIndex === -1 ? otpValues.length - 1 : nextEmptyIndex;
      otpRefs.current[focusIndex].focus();

      if (newOtpValues.every((v) => v !== "")) {
        verifyOtp(newOtpValues.join(""));
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-2 py-2 md:py-12 ">
      <Card
        className={`w-full max-w-md py-8 bg-white rounded-xl transition-all ${
          width < 768 ? "shadow-none border-none" : "shadow-sm"
        }`}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-50 p-3 rounded-full">
            <LuKeySquare className="text-[#030DFE] text-2xl" />
          </div>
        </div>

        <h1 className="font-bold mb-6 text-2xl text-center text-gray-800">
          {!otpSent ? "Verify Email" : "Enter Verification Code"}
        </h1>

        {!otpSent ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-gray-700 font-medium mb-2"
              >
                <LuMail className="mr-2" /> Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please enter email registered with your account",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Enter your email"
                    prefix={<LuMail className="text-gray-400" />}
                    className="rounded-lg"
                    size="large"
                  />
                )}
              />
              {errors.email && (
                <Text type="danger" className="mt-1 block">
                  {errors.email.message}
                </Text>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              disabled={resetPasswordMutation.isPending}
              className="!h-12 !bg-[#030DFE] hover:!bg-[#0000dd] disabled:!opacity-40  disabled:!cursor-not-allowed disabled:!pointer-events-none !text-white !font-semibold !rounded-lg !flex !items-center !justify-center !gap-2 !mt-4"
              size="large"
            >
              {resetPasswordMutation.isPending ? (
                <div className="flex justify-center items-center gap-2">
                  <SlickSpinner size={14} color="white" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Send Verification Code</span>
                  <LuSendHorizontal />
                </div>
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-6 text-center">
              We&apos;ve sent a 6-digit verification code to your email.
              <br />
              Please enter it below.
            </p>

            {otpStatus.message && (
              <div className="text-red-500 text-sm text-center w-full mb-6 font-medium border-[.1px] border-red-500 p-1 rounded">
                {otpStatus.message}
              </div>
            )}

            <div className="mb-4 w-full">
              <Space
                size={[8, 8]}
                className="w-full justify-center flex flex-wrap"
                onPaste={handlePaste}
              >
                {otpValues.map((value, index) => (
                  <div key={index} className="relative">
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={(el) => (otpRefs.current[index] = el)}
                      value={value}
                      onChange={(e) => {
                        const val = e.target.value.slice(-1);
                        if (/^\d?$/.test(val)) {
                          handleOtpChange(val, index);
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`
                        w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl md:text-4xl border rounded-lg font-black
                        focus:border-4 focus:outline-none transition-all
                        ${
                          otpStatus.status === "success"
                            ? "border-green-500 text-green-600"
                            : otpStatus.status === "error"
                            ? "border-red-500 text-red-600"
                            : "border-black focus:border-[#030DFE] text-gray-800"
                        }
                      `}
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />
                  </div>
                ))}
              </Space>
            </div>

            {isVerifyingOtp !== null && (
              <div
                className={`w-full flex flex-col items-center justify-center mb-4 transition-all ${
                  isVerifyingOtp === "loading"
                    ? "text-blue-500"
                    : isVerifyingOtp === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {isVerifyingOtp === "loading" && (
                  <>
                    <LoadingState />
                    <span className="mt-2">Verifying your code...</span>
                  </>
                )}
                {isVerifyingOtp === "error" && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <LuX strokeWidth={3.5} size={32} />
                    <span className="font-medium text-center">
                      OTP Verification failed
                    </span>
                  </div>
                )}
                {isVerifyingOtp === "success" && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <LuCircleCheckBig strokeWidth={3} size={32} />
                    <span className="font-medium">Success!</span>
                    <p className="text-sm">
                      Redirecting you to reset your password...
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-4">
              <p className="text-gray-500 text-xs mb-2">
                Didn&apos;t receive the code?
              </p>
              <Button
                type="link"
                onClick={handleResendOtp}
                disabled={resendCounter > 0 || isSendingOtp}
                className={`
                   !px-4 !py-2 !h-auto !flex !items-center !justify-center !mx-auto !border-none !text-[#030DFE] disabled:!text-gray-400`}
              >
                <div>
                  {!isSendingOtp ? (
                    <div>
                      {resendCounter > 0 ? (
                        `Resend in ${resendCounter}s`
                      ) : (
                        <div className="flex items-center gap-2">
                          <LuRotateCw />
                          Resend code
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LuLoaderCircle className="animate-spin" /> Sending...
                    </div>
                  )}
                </div>
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
