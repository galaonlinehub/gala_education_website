// import React from "react";
// import SignupPage from "@/app/(auth)/signup/page";
// import StudentSignUpVectorSvg from "@/src/utils/vector-svg/sign-up/StudentSignUpVectorSvg";
// import { message, Select } from "antd";
// import { useForm } from "react-hook-form";
// import { api } from "@/src/config/settings";
// import LoadingState from "../../loading/template/LoadingSpinner";
// import EmailVerification from "./EmailVerification";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
// import { encrypt } from "@/src/utils/fns/encryption";
// import { disabilities } from "@/src/utils/data/disabilities";
// import "../../../../styles/auth/signup.css";
// import { apiPost } from "@/src/services/api_service";

// const SignUpForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
//     (state) => state.setOpenEmailVerificationModal
//   );
//   const [loading, setLoading] = React.useState(false);
//   const [emailExists, setEmailExists] = React.useState(false);

//   const password = watch("password", "");

//   const preventCopyPaste = (event) => {
//     event.preventDefault();
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     message.destroy();
//     const formData = new FormData();

//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });

//     formData.append("role", "student");
//     formData.append("country", "Tanzania");

//     try {
//       const response = await apiPost("/register", formData);
//       if (response.status === 201) {
//         message.success("Data Saved Successfully!");
//         sessionStorage.setItem(
//           "e67e4931-4518-4369-b011-fa078beefac1",
//           encrypt(data.email)
//         );
//         setOpenEmailVerificationModal(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         const errorMessage = error.response.data.email[0];
//         if (errorMessage && errorMessage.toLowerCase().includes("email")) {
//           setEmailExists(errorMessage);
//         } else {
//           message.error("Oops!! Something Went Wrong, Try again Later.");
//         }
//       } else {
//         message.error("Oops!! Something Went Wrong, Try again Later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="h-screen flex justify-center px-3 lg:px-0 mt-10">
//       <div className="flex flex-col items-center h-full w-screen lg:w-full gap-4">
//         <span className="font-black text-xl">Sign Up</span>
//         <span className="text-center text-[12px] leading-5 font-semibold lg:w-3/4">
//           Step into the realm of endless possibilities! Your adventure in
//           knowledge begins here—unlock doors to boundless learning, forge your
//           path, and let curiosity be your guide. Sign up and let the journey of
//           brilliance unfold!
//         </span>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col w-full lg:w-4/6 gap-3"
//         >
//           <div className="flex flex-col gap-1 items-start justify-center w-full">
//             <label htmlFor="first-name" className="font-bold text-[13px]">
//               First Name *
//             </label>
//             <input
//               type="text"
//               id="first-name"
//               autoComplete="off"
//               autoCapitalize="off"
//               autoCorrect="off"
//               placeholder="Enter Your First Name"
//               className={`border-[0.5px] focus:border-[1px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] h-input-height focus:outline-none text-xs pl-3 placeholder:text-xs flex items-center justify-center ${
//                 errors.first_name ? "border-red-500 focus:border-red-500" : ""
//               }`}
//               {...register("first_name", {
//                 required: "First name is required",
//               })}
//             />
//             {errors.first_name && (
//               <span className="text-red-500 text-xs">
//                 {errors.first_name.message}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col gap-1 items-start justify-center w-full">
//             <label htmlFor="last-name" className="font-bold text-[13px]">
//               Last Name *
//             </label>
//             <input
//               type="text"
//               id="last-name"
//               autoComplete="off"
//               autoCapitalize="off"
//               autoCorrect="off"
//               placeholder="Enter Your Last Name"
//               className={`border-[0.5px] focus:border-[1px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height text-xs placeholder:text-xs pl-3 ${
//                 errors.last_name ? "border-red-500 focus:border-red-500" : ""
//               }`}
//               {...register("last_name", { required: "Last name is required" })}
//             />
//             {errors.last_name && (
//               <span className="text-red-500 text-xs">
//                 {errors.last_name.message}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col gap-1 justify-center items-start w-full">
//             <label htmlFor="email" className="font-bold text-[13px]">
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               autoComplete="off"
//               autoCapitalize="off"
//               autoCorrect="off"
//               placeholder="Enter Your Email"
//               className={`border-[0.5px] focus:border-[1px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height text-xs placeholder:text-xs pl-3 ${
//                 errors.email ? "border-red-500 focus:border-red-500" : ""
//               }`}
//               {...register("email", {
//                 required: "Email is required",
//                 onChange: () => setEmailExists(false),
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             {errors.email && (
//               <span className="text-red-500 text-xs">
//                 {errors.email.message}
//               </span>
//             )}
//             {emailExists && !errors.email && (
//               <span className="text-red-500 text-xs">{emailExists}</span>
//             )}
//           </div>
//           <div className="flex flex-col gap-1 justify-center items-start w-full">
//             <label htmlFor="password" className="font-bold text-[13px]">
//               Password *
//             </label>
//             <input
//               type="password"
//               id="password"
//               autoComplete="off"
//               autoCapitalize="off"
//               autoCorrect="off"
//               placeholder="Enter Your Password"
//               onCopy={preventCopyPaste}
//               onPaste={preventCopyPaste}
//               onCut={preventCopyPaste}
//               className={`border-[0.5px] focus:border-[1px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height text-xs placeholder:text-xs pl-3 ${
//                 errors.password ? "border-red-500 focus:border-red-500" : ""
//               }`}
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters",
//                 },
//               })}
//             />
//             {errors.password && (
//               <span className="text-red-500 text-xs">
//                 {errors.password.message}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col gap-1 justify-center items-start w-full">
//             <label htmlFor="confirm_password" className="font-bold text-[13px]">
//               Confirm Password *
//             </label>
//             <input
//               type="password"
//               id="confirm_password"
//               autoComplete="off"
//               autoCapitalize="off"
//               autoCorrect="off"
//               placeholder="Confirm your Password"
//               onCopy={preventCopyPaste}
//               onPaste={preventCopyPaste}
//               onCut={preventCopyPaste}
//               className={`border-[0.5px] focus:border-[1px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height text-xs placeholder:text-xs pl-3 ${
//                 errors.confirmPassword
//                   ? "border-red-500 focus:border-red-500"
//                   : ""
//               }`}
//               {...register("confirmPassword", {
//                 required: "Confirm password is required",
//                 validate: (value) =>
//                   value === password || "Passwords do not match",
//               })}
//             />
//             {errors.confirmPassword && (
//               <span className="text-red-500 text-xs">
//                 {errors.confirmPassword.message}
//               </span>
//             )}
//           </div>

//           <div className="flex flex-col lg:flex-row items-center justify-between w-full self-start gap-4 mt-6">
//             <Select
//               placeholder="Special Needs"
//               placement="bottomRight"
//               options={disabilities}
//               className="special-disabilities-select !w-full !lg:w-[35rem] !h-[40px] !border-[#030DFE] !rounded-md"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="rounded-md h-[40px] w-full lg:w-1/2 bg-[#030DFE] text-[14px] font-semibold !text-[#FFFFFF] disabled:opacity-60 flex items-center justify-center p-2"
//             >
//               {loading ? <LoadingState /> : "Sign Up"}
//             </button>
//           </div>
//         </form>

//         <span className="text-center text-[12px] space-x-2 mt-5">
//           <span> Creating an account means you&apos;re okay with our</span>
//           <span className="text-[#030DFE] font-bold">Terms of Service</span>
//           <span>&</span>
//           <span className="text-[#030DFE] font-bold">Privacy Policy</span>.
//         </span>
//       </div>

//       {/* <StudentSignUpVectorSvg /> */}
//       <EmailVerification />
//     </section>
//   );
// };

// export default SignUpForm;

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Space,
  Card,
  Progress,
  Tooltip,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleFilled,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { disabilities } from "@/src/utils/data/disabilities";
import { GoShieldCheck } from "react-icons/go";
import { useAuth } from "@/src/hooks/useAuth";

const { Title, Text, Paragraph } = Typography;

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");

  const {
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onSubmit,
    emailExists,
    passwordStrength,
    passwordFocused,
    loading,
    setPasswordStrength,
    setPasswordFocused,setEmailExists
  } = useAuth(password);

  const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.setOpenEmailVerificationModal
  );

  const handleFormSubmit = async (values) => {
    await onSubmit(values);
  };

  return (
    <div className="min-h-scree  flex justify-center lg:px-8 mt-12">
      <Card className="!w-full max-w-3xl !border-0">
        <div className="text-center mb-8">
          <Title
            level={2}
            className="!text-2xl !font-bold !text-gray-900 !mb-2"
          >
            Create Your Account
          </Title>
          <Paragraph className="!text-sm !text-gray-600">
            Step into the realm of endless possibilities! Your adventure in
            knowledge begins here.
          </Paragraph>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={handleFormSubmit}
          layout="vertical"
          className="!space-y-4"
        >
          <div className="!grid !grid-cols-2 !gap-4">
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
              className="!mb-0"
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="First Name"
                className="!rounded-lg !h-11 hover:!border-blue-400 focus:!border-blue-500 !transition-colors"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              className="!mb-0"
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="Last Name"
                className="!rounded-lg !h-11 hover:!border-blue-400 focus:!border-blue-500 !transition-colors"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            ules={[
              { 
                required: true, 
                message: "Please input your email!" 
              },
              { 
                type: "email", 
                message: "Please enter a valid email!" 
              },
              {
                validator: async (_, value) => {
                  if (emailExists) {
                    return Promise.reject(new Error(emailExists));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            validateStatus={emailExists ? "error" : undefined}
            help={emailExists}
          >
            <Input
              prefix={<MailOutlined className="!text-gray-400" />}
              suffix={
                <Tooltip title="This will be your login email">
                  <InfoCircleOutlined className="!text-gray-400" />
                </Tooltip>
              }
              placeholder="Email Address"
              className="!rounded-lg !h-11 hover:!border-blue-400 focus:!border-blue-500 !transition-colors"
              onChange={() => {
                setEmailExists(false);
                form.validateFields(['email']); // Trigger validation on change
              }}            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <div className="space-y-2">
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Password"
                className="!rounded-lg !h-11 hover:!border-blue-400 focus:!border-blue-500 !transition-colors"
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                iconRender={(visible) => (
                  <span className="hover:!text-blue-500 !transition-colors">
                    {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  </span>
                )}
              />
              {passwordFocused && (
                <div className="!bg-gray-50 !p-3 !rounded-lg !border !border-gray-200">
                  <Progress
                    percent={passwordStrength}
                    size="small"
                    strokeColor={getPasswordStatus().color}
                    className="!mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {getPasswordRequirements(password).map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircleFilled
                          className={
                            req.met ? "!text-green-500" : "!text-gray-300"
                          }
                        />
                        <span className="text-xs text-gray-600">
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<SafetyOutlined className="!text-gray-400" />}
              placeholder="Confirm Password"
              className="!rounded-lg !h-11 hover:!border-blue-400 focus:!border-blue-500 !transition-colors"
              iconRender={(visible) => (
                <span className="hover:!text-blue-500 !transition-colors">
                  {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                </span>
              )}
            />
          </Form.Item>

          <Form.Item name="special_needs">
            <Select
              placeholder="Special Needs (Optional)"
              options={disabilities}
              className="!w-full !rounded-lg !min-h-[2.75rem]"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!w-full !h-11 !rounded-lg !bg-blue-600 hover:!bg-blue-700 !transition-colors !text-base !font-medium"
              icon={<GoShieldCheck />}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div className="!text-center !text-sm !text-gray-600 !mt-6">
          <Text>By creating an account, you agree to our </Text>
          <Button
            type="link"
            className="!p-0 !m-1 !text-blue-600 hover:!text-blue-700"
          >
            Terms of Service
          </Button>
          <Text> and </Text>
          <Button
            type="link"
            className="!p-0 !m-1 !text-blue-600 hover:!text-blue-700"
          >
            Privacy Policy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpForm;