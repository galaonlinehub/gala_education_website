"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { message, Input, Button, Card, Typography, Space, Alert } from "antd";
import { MailOutlined, SendOutlined, ReloadOutlined } from "@ant-design/icons";
import { FaKey } from "react-icons/fa6";
import LoadingState from "@/src/components/ui/loading/template/LoadingSpinner";
import { encrypt } from "@/src/utils/fns/encryption";
import { apiPost, apiGet } from "@/src/services/api_service";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(null);
  const [resendCounter, setResendCounter] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("");
  const otpRefs = useRef([]);
  const [emailOtpFeedback, setEmailOtpFeedback] = useState({
    show: false,
    type: "",
    message: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data) => {
    try {
      setIsSendingOtp(true);
      // message.destroy();
      const response = await apiPost("/password/reset-request", {
        email: data.email,
      });
      if (response.status === 200) {
        const encryptedEmail = encrypt(data.email);
        sessionStorage.setItem("Gala", encryptedEmail);

        setEmail(data.email);
        setOtpSent(true);
        setResendCounter(30);

        setEmailOtpFeedback({
          show: true,
          type: "success",
          message: "OTP sent to your email!.",
        });
      }
    } catch (error) {
      setEmailOtpFeedback({
        show: true,
        type: "error",
        message: "Failed to send OTP, Try again!.",
      });
    } finally {
      setIsSendingOtp(false);

      setTimeout(() => {
        setEmailOtpFeedback({
          show: false,
          type: "",
          message: "",
        });
      }, 10000);
    }
  };

  const handleResendOtp = async () => {
    if (resendCounter > 0) return;
    try {
      setIsSendingOtp(true);
      const response = await apiPost("/resend-otp", {
        email: email,
      });
      alert(JSON.stringify(response));
      if (response.status === 200) {
        setResendCounter(30);
        message.success("OTP resent to your email");
      }
    } catch (e) {
      alert(JSON.stringify(e));
      message.error(`Failed to resend OTP, ${e.message}`);
    } finally {
      setIsSendingOtp(false);
      setResendCounter(200);
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

    setOtpStatus("");
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
        setOtpStatus("success");
        setTimeout(() => {
          router.push("/forgot-password/password-change");
        }, 8000);
      }
    } catch (e) {
      setOtpStatus("error");
      setIsVerifyingOtp("error");
    } finally {
      // setTimeout(() => {
      //   setIsVerifyingOtp(null);
      // }, 10000);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center px-2 h-5/6">
      <Card
        className="!w-full !max-w-xl !bg-white !rounded-lg !border-0"
        title={
          <div className="flex justify-start items-center gap-3">
            <Title level={3} className="!self-center !m-0">
              {!otpSent ? "Forgot Password" : "Verify Email"}
            </Title>
          </div>
        }
      >
        {!otpSent ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <MailOutlined className="mr-2" /> Email
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
                    placeholder="Enter your email"
                    prefix={<MailOutlined />}
                    className="h-10"
                  />
                )}
              />
              {errors.email && (
                <Text type="danger" className="text-[10px] mt-2">
                  {errors.email.message}
                </Text>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSendingOtp}
              icon={<SendOutlined />}
              className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 px-4 !rounded"
            >
              {!isSendingOtp && "Send OTP"}
            </Button>
          </form>
        ) : (
          <div>
            {emailOtpFeedback.show && (
              <Alert
                showIcon
                // closable
                message={emailOtpFeedback.message}
                type={emailOtpFeedback.type}
                className="!my-2 !w-full"
              />
            )}
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-4 flex justify-center items-center">
                <FaKey className="mr-2" /> Enter OTP
              </label>
              <Space
                size="small"
                className="!w-full !justify-center !flex !flex-wrap"
              >
                {otpValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d?$/.test(val)) {
                        handleOtpChange(val, index);
                      }
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`!w-12 !h-12 md:!w-16 md:!h-16 !text-center !text-2xl md:!text-4xl !border-4 !font-black ${
                      otpStatus === "success"
                        ? "!border-green-500"
                        : otpStatus === "error"
                        ? "!border-red-500"
                        : "!border-[#030DFE]"
                    }`}
                    maxLength={1}
                  />
                ))}
              </Space>
            </div>
            {isVerifyingOtp !== null && (
              <>
                {isVerifyingOtp === "loading" && (
                  <div className="w-full flex flex-col items-center justify-center my-6">
                    <LoadingState />
                    <span>Verifying...</span>
                  </div>
                )}
                {isVerifyingOtp === "error" && (
                  <div className="w-full flex text-xs flex-col items-center justify-center my-6 text-red-500">
                    <span>Verification Failed, Incorrect OTP provided!</span>
                  </div>
                )}
                {isVerifyingOtp === "success" && (
                  <div className="w-full flex text-xs flex-col items-center justify-center my-6 text-green-500">
                    <span>Successfully Verified!</span>
                    <span>
                      Hold on a moment. You&#39;ll be directed to the next
                      stage.
                    </span>
                  </div>
                )}
              </>
            )}
            <div className="text-center overflow-hidden">
              <Button
                type="link"
                onClick={handleResendOtp}
                disabled={resendCounter > 0 || isSendingOtp}
                icon={<ReloadOutlined />}
              >
                {resendCounter > 0 
                  ? `Resend OTP in ${resendCounter}s`
                  : "Resend OTP"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
