// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm, Controller } from "react-hook-form";
// import { message, Input, Button, Card, Typography } from "antd";
// import { MailOutlined, KeyOutlined } from "@ant-design/icons";
// import { api } from "@/src/config/settings";
// import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";

// const { Title, Text } = Typography;

// const ForgotPassword = () => {
//   const router = useRouter();
//   const [otpSent, setOtpSent] = useState(false);
//   const [email, setEmail] = useState("");
//   const { setOpenEmailVerificationModal } = useEmailVerificationModalOpen();

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       message.destroy();
//       const response = await api.post("/forgot-password", {
//         email: data.email,
//       });
//       if (response.data.success) {
//         setEmail(data.email);
//         setOtpSent(true);
//         message.success("OTP sent to your email");
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (e) {
//       message.error(`Failed to send OTP, ${e.message}`);
//       setOtpSent(true);

//       //   router.push("/forgot-password/password-change");
//     }
//   };

//   const handleOtpSubmit = async (data) => {
//     try {
//     //   setLoading(true);
//       message.destroy();
//       const response = await api.post("/verify-otp", { email, otp: data.otp });
//       if (response.data.success) {
//         message.success("OTP verified. Reset password now.");
//         router.push("/reset-password");
//       } else {
//         message.error(response.data.message);
//       }
//     } catch {
//       message.error("Failed to verify OTP");
//     } finally {
//     //   setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <Card
//         className="!w-full !max-w-xl !bg-white !p-8 !rounded-lg !shadow-sm"
//         title={
//           <div className="flex justify-start items-center gap-3">
//             <Title className="self-center" level={3}>
//               Forgot Password
//             </Title>
//           </div>
//         }
//       >
//         {!otpSent ? (
//           <form
//             className="flex flex-col gap-2"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 <MailOutlined className="mr-2" /> Email
//               </label>
//               <Controller
//                 name="email"
//                 control={control}
//                 rules={{
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\S+@\S+$/i,
//                     message: "Please enter a valid email",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <Input
//                     {...field}
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     className="!h-input-height"
//                   />
//                 )}
//               />
//               {errors.email && (
//                 <Text type="danger" className="!text-sm !mt-2">
//                   {errors.email.message}
//                 </Text>
//               )}
//             </div>
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={isSubmitting}
//               className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 !px-4 !rounded"
//             >
//               {isSubmitting ? "Sending OTP" : "Send OTP"}
//             </Button>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmit(handleOtpSubmit)}>
//             <div className="mb-4">
//               <label
//                 htmlFor="otp"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 <KeyOutlined /> OTP
//               </label>
//               <Input
//                 id="otp"
//                 type="text"
//                 placeholder="Enter the OTP"
//                 {...register("otp", { required: true, pattern: /^\d{6}$/ })}
//               />
//               {errors.otp?.message && (
//                 <Text type="danger" className="text-sm">
//                   {errors.otp?.message}
//                 </Text>
//               )}
//             </div>
//             <Button
//               type="submit"
//               loading={isSubmitting}
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Verify OTP
//             </Button>
//           </form>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default ForgotPassword;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { message, Input, Button, Card, Typography, Space } from "antd";
import {
  MailOutlined,
  SendOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { api } from "@/src/config/settings";
import { FaKey } from "react-icons/fa6";
import LoadingState from "@/src/components/ui/loading/LoadingSpinner";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCounter, setResendCounter] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("");
  const otpRefs = useRef([]);

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
      message.destroy();
      const response = await api.post("/forgot-password", {
        email: data.email,
      });
      if (response.data.success) {
        setEmail(data.email);
        setOtpSent(true);
        setResendCounter(30); 
        message.success("OTP sent to your email");
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      message.error(`Failed to send OTP, ${e.message}`);
    } finally {
        setResendCounter(30); 
      setIsSendingOtp(false);
      setOtpSent(true);

    }
  };

  const handleResendOtp = async () => {
    if (resendCounter > 0) return;
    try {
      setIsSendingOtp(true);
      const response = await api.post("/forgot-password", {
        email: email,
      });
      if (response.data.success) {
        setResendCounter(30);
        message.success("OTP resent to your email");
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      message.error(`Failed to resend OTP, ${e.message}`);
    } finally {
      setIsSendingOtp(false);
      setResendCounter(200);

    }
  };

  const handleOtpChange = (value, index) => {
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
      setIsVerifyingOtp(true);
      const response = await api.post("/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        setOtpStatus("success");
        message.success("OTP verified. Redirecting to reset password...");
        setTimeout(() => {
          router.push("/reset-password");
        }, 1500);
      } else {
        setOtpStatus("error");
        message.error(response.data.message);
      }
    } catch (e) {
      setOtpStatus("error");
      message.error("Failed to verify OTP");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card
        className="!w-full !max-w-xl !bg-white !p-8 !rounded-lg !shadow-sm"
        title={
          <div className="!flex !justify-start !items-center !gap-3">
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
                  required: "Email is required",
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
                <Text type="danger" className="text-sm mt-2">
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
              {isSendingOtp ? "Sending OTP" : "Send OTP"}
            </Button>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-4 flex justify-center items-center">
                <FaKey className="mr-2" /> Enter OTP
              </label>
              <Space size="small" className="!w-full !justify-center">
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
                    className={`!w-12 !h-12 !text-center !text-lg !border-2 !ring-2 ${
                      otpStatus === "success"
                        ? "!border-green-500 !ring-green-500/70"
                        : otpStatus === "error"
                        ? "!border-red-500 !ring-red-500/70"
                        : "!border-[#030DFE] !ring-[#030DFE]/70"
                    }`}
                    maxLength={1}
                  />
                ))}
              </Space>
            </div>
            {isVerifyingOtp && (
              <div className="w-full flex flex-col items-center justify-center my-6">
                <LoadingState />
                <span> Verifying...</span>
              </div>
            )}
            <div className="text-center">
              <Button
                type="link"
                onClick={handleResendOtp}
                disabled={resendCounter > 0 || isVerifyingOtp || isSendingOtp}
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
