import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { useDevice } from "@/src/hooks/useDevice";
import { encrypt } from "@/src/utils/fns/encryption";
import { apiPost } from "@/src/services/api/api_service";
import { useForm } from "react-hook-form";
import { RESET_PASSWORD_EMAIL_KEY } from "../config/settings";
import { message } from "antd";

export const usePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
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
      const encryptedEmail = encrypt(variables.email);
      sessionStorageFn.set(RESET_PASSWORD_EMAIL_KEY, encryptedEmail);
      setEmail(variables.email);
      setResendCounter(30);
      message.success("OTP sent to your email");
    },
    onError: (error) => {
      if (
        error.status === 422 &&
        Object.keys(error?.response?.data?.errors || {}).includes("email")
      ) {
        setError("email", {
          type: "manual",
          message: "No account registered with this email 😕",
        });
      } else {
        setOtpStatus({
          status: "error",
          message:
            error?.response?.data?.message ||
            "Something went wrong. Please try again later. If the issue persists contact support.",
        });
      }
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: () => apiPost("/request-otp", { email }),
    onSuccess: () => {
      setResendCounter(30);
      message.success("OTP resent to your email", 6);
    },
    onError: (error) => {
      message.error(`Failed to resend OTP: ${error.message}`);
    },
  });

  const verificationMutation = useMutation({
    mutationFn: (otp) => apiPost("/verify-otp", { email, otp }),
    onSuccess: (response) => {
      setOtpStatus({ status: "success", message: "" });
      setTimeout(() => {
        router.push("/forgot-password/password-change");
      }, 3000);
    },
    onError: (error) => {
      setOtpStatus({
        status: "error",
        message:
          error?.response?.data?.message ||
          "Invalid or expired OTP. Please try again.",
      });
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate(data);
  };

  const handleResendOtp = () => {
    if (resendCounter > 0) return;
    resendOtpMutation.mutate();
  };

  const handleOtpChange = (value, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    verificationMutation.reset();

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }

    if (newOtpValues.every((v) => v !== "") && value) {
      verificationMutation.mutate(newOtpValues.join(""));
    }

    setOtpStatus({ status: "", message: "" });
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
        verificationMutation.mutate(newOtpValues.join(""));
      }
    }
  };

  return {
    resetPasswordMutation,
    resendOtpMutation,
    verificationMutation,
    control,
    handleSubmit,
    errors,
    onSubmit,
    handleKeyDown,
    handleOtpChange,
    handlePaste,
    handleResendOtp,
    email,
    width,
    otpStatus,
    router,
    otpValues,
    resendCounter,
    otpRefs,
    setOtpStatus,
  };
};
