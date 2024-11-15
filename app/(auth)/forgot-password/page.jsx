// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { message, Input, Button, Card, Space, Typography } from "antd";
// import {
//   MailOutlined,
//   KeyOutlined,
//   ArrowLeftOutlined,
// } from "@ant-design/icons";
// import { api } from "@/src/config/settings";

// const { Title, Text } = Typography;

// const ForgotPassword = () => {
//   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [email, setEmail] = useState("");

//   const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm();

//   const onSubmit = async (data) => {
//     message.success("OTP sent to your email");

//     try {
//       setLoading(true);
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
//     } catch {
//       message.error("Failed to send OTP");
//     } finally {
//     //   setLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (data) => {
//     try {
//       setLoading(true);
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
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <Card
//         className="!w-full !max-w-xl !bg-white !p-8 !rounded-lg !shadow-sm"
//         title={
//           <div className="!flex !justify-start !items-center gap-3">
//             {/* <ArrowLeftOutlined
//               onClick={() => router.push("/login")}
//               className="cursor-pointer !self-center"
//             /> */}
//             <Title className="!self-center" level={3}>
//               Forgot Password
//             </Title>
//           </div>
//         }
//       >
//         {!otpSent ? (
//           <form
//             className="flex flex-col gap-2"
//             onSubmit={handleSubmit(onSubmit)}    
//                   >
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 <MailOutlined className="!mr-2" /> Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="!h-input-height"
//                 {...register("email", {
//                   required: true,
//                   pattern: /^\S+@\S+$/i,
//                 })}
//               />
//               {errors.email?.message && (
//                 <Text type="danger" className="text-sm mt-2">
//                   {errors.email?.message}
//                 </Text>
//               )}
//             </div>
//             <Button
//               type="primary" 
//               htmlType="submit" 
//               loading={isSubmitting}
//               className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 !px-4 !rounded"
//             >
//               Send OTP
//             </Button>
//           </form>
//         ) : (  ""
//         //   <form onSubmit={handleSubmit(handleOtpSubmit)}>
//         //     <div className="mb-4">
//         //       <label
//         //         htmlFor="otp"
//         //         className="block text-gray-700 font-bold mb-2"
//         //       >
//         //         <KeyOutlined className="mr-2" /> OTP
//         //       </label>
//         //       <Input
//         //         id="otp"
//         //         type="text"
//         //         placeholder="Enter the OTP"
//         //         {...register("otp", { required: true, pattern: /^\d{6}$/ })}
//         //       />
//         //       {formState.errors.otp?.message && (
//         //         <Text type="danger" className="text-sm mt-2">
//         //           {formState.errors.otp?.message}
//         //         </Text>
//         //       )}
//         //     </div>
//         //     <Button
//         //       type="primary" htmlType="submit"
//         //       loading={loading}
//         //       className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         //     >
//         //       Verify OTP
//         //     </Button>
//         //   </form>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default ForgotPassword;


"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form"; 
import { message, Input, Button, Card, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { api } from "@/src/config/settings";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");

  const {
    control, 
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      message.destroy();
      const response = await api.post("/forgot-password", {
        email: data.email,
      });
      if (response.data.success) {
        setEmail(data.email);
        setOtpSent(true);
        message.success("OTP sent to your email");
      } else {
        message.error(response.data.message);
      }
    } catch {
      message.error("Failed to send OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card
        className="!w-full !max-w-xl !bg-white !p-8 !rounded-lg !shadow-sm"
        title={
          <div className="flex justify-start items-center gap-3">
            <Title className="self-center" level={3}>
              Forgot Password
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
                    className="!h-input-height"
                  />
                )}
              />
              {errors.email && (
                <Text type="danger" className="!text-sm !mt-2">
                  {errors.email.message}
                </Text>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 !px-4 !rounded"
            >
              Send OTP
            </Button>
          </form>
        ) : null}
      </Card>
    </div>
  );
};

export default ForgotPassword;