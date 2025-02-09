// import React, { useState } from "react";
// import { message } from "antd";
// import { useForm } from "react-hook-form";
// import LoadingState from "../../loading/template/LoadingSpinner";
// import EmailVerification from "./EmailVerification";
// import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
// import InstructorSignUpPageSvg from "@/src/utils/vector-svg/sign-up/InstructorSignUpPageSvg";
// import { encrypt } from "@/src/utils/fns/encryption";
// import { apiPost } from "@/src/services/api_service";
// import { preventCopyPaste } from "@/src/utils/fns/general";

// const InstructorSignUpForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
//     (state) => state.setOpenEmailVerificationModal
//   );
//   const [loading, setLoading] = useState(false);
//   const password = watch("password", "");

//   const [files, setFiles] = useState({
//     cv: null,
//     oLevelCertificate: null,
//     aLevelCertificate: null,
//     transcript: null,
//   });

//   const handleFileChange = (event, fieldName) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFiles((prevFiles) => ({
//         ...prevFiles,
//         [fieldName]: file,
//       }));
//       message.success(
//         `File "${file?.name}" for ${fieldName.replace(
//           /([A-Z])/g,
//           " $1"
//         )} uploaded successfully!`
//       );
//     }
//   };

//   const dropKeys = (obj, keysToDrop) => {
//     return Object.fromEntries(
//       Object.entries(obj).filter(([key]) => !keysToDrop.includes(key))
//     );
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     message.destroy();
//     const formData = new FormData();

//     const keysToRemove = [
//       "o_level_certificate",
//       "a_level_certificate",
//       "cv",
//       "transcript",
//     ];
//     const cleanedData = dropKeys(data, keysToRemove);

//     Object.keys(cleanedData).forEach((key) => {
//       formData.append(key, cleanedData[key]);
//     });

//     formData.append("role", "instructor");

//     if (files.cv) formData.append("curriculum_vitae", files.cv);
//     if (files.transcript) formData.append("transcript", files.transcript);
//     if (files.aLevelCertificate)
//       formData.append("a_level_certificate", files.aLevelCertificate);
//     if (files.oLevelCertificate)
//       formData.append("o_level_certificate", files.oLevelCertificate);

//     try {
//       const response = await apiPost(
//         "/register",
//         formData,
//         {
//           "Content-Type": "multipart/form-data",
//         }
//       );
//       if (response.status === 201) {
//         message.success("Data Saved Successfully!");
//         sessionStorage.setItem(
//           "e67e4931-4518-4369-b011-fa078beefac1",
//           encrypt(data.email)
//         );
//         setOpenEmailVerificationModal(true);
//       }
//     } catch (error) {
//       message.error("Oops!! Something Went Wrong, Try again Later.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex justify-center items-center w-full pb-24 mt-6">
//       <div className="flex flex-col gap-6 w-full lg:mx-12">
//         <div className="flex flex-col gap-2 justify-center items-center w-full">
//           <span className="font-bold text-[16px]">Sign Up</span>
//           <span className="font-medium text-[12px] w-full text-center">
//             When registering with Gala, teachers undergo a vetting process to
//             ensure only qualified candidates are selected, maintaining service
//             quality. The first payment, which is non-refundable, serves as an
//             application fee. Applications are processed within 2-3 business days
//             and may be approved or denied.
//           </span>
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-6 w-full"
//         >
//           <div className="flex flex-col gap-3 w-full lg:w-8/12">
//             <div className="flex flex-col gap-1 items-start justify-center">
//               <label htmlFor="first-name" className="font-bold text-[13px]">
//                 First Name *
//               </label>
//               <input
//                 type="text"
//                 id="first-name"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 placeholder="Enter Your First Name"
//                 className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px]`}
//                 {...register("first_name", {
//                   required: "First name is required",
//                 })}
//               />
//               {errors.firstName && (
//                 <span className="text-red-500 text-xs">
//                   {errors.firstName.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-1 items-start justify-center">
//               <label htmlFor="last-name" className="font-bold text-[13px]">
//                 Last Name *
//               </label>
//               <input
//                 type="text"
//                 id="last-name"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 placeholder="Enter Your Last Name"
//                 className="border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px]"
//                 {...register("last_name", {
//                   required: "Last name is required",
//                 })}
//               />
//               {errors.last_name && (
//                 <span className="text-red-500 text-xs">
//                   {errors.last_name.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start">
//               <label htmlFor="email" className="font-bold text-[13px]">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 placeholder="Enter Your Email"
//                 className="border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none  h-input-height pl-3 placeholder:font-semibold placeholder:text-[14px]"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-xs">
//                   {errors.email.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start">
//               <label htmlFor="password" className="font-bold text-[13px]">
//                 Password *
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 placeholder="Enter Your Password"
//                 onCopy={preventCopyPaste}
//                 onPaste={preventCopyPaste}
//                 onCut={preventCopyPaste}
//                 className="border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-xs">
//                   {errors.password.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-1 justify-center items-start">
//               <label
//                 htmlFor="confirm_password"
//                 className="font-bold text-[13px]"
//               >
//                 Confirm Password *
//               </label>
//               <input
//                 type="password"
//                 id="confirm_password"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 placeholder="Confirm your Password"
//                 onCopy={preventCopyPaste}
//                 onPaste={preventCopyPaste}
//                 onCut={preventCopyPaste}
//                 className="border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3"
//                 {...register("confirmPassword", {
//                   required: "Confirm password is required",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//               />
//               {errors.confirmPassword && (
//                 <span className="text-red-500 text-xs">
//                   {errors.confirmPassword.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start">
//               <label htmlFor="nida-number" className="font-bold text-[13px]">
//                 National ID Number (NIDA) *
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Your NIDA Number"
//                 autoComplete="off"
//                 autoCapitalize="off"
//                 autoCorrect="off"
//                 id="nida-number"
//                 className="border-[1px] focus:border-[2.5px] w-full focus:outline-none rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3"
//                 {...register("nida", {
//                   required: "NIDA number is required",
//                 })}
//               />
//               {errors.nida && (
//                 <span className="text-red-500 text-xs">
//                   {errors.nida.message}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col mx-auto items-center justify-center gap-4 w-full lg:w-4/12">
//             <div className="flex flex-col gap-1 justify-center items-start w-full">
//               <span className="font-bold text-[13px]">
//                 Upload Curriculum vitae (CV)
//               </span>
//               <label className="cursor-pointer w-full">
//                 <div className="h-input-height w-full bg-[#001840] rounded-md text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
//                   {files.cv ? files.cv?.name : `Upload CV`}
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   {...register("cv", {
//                     required: "Curriculum vitae(CV) must be provided",
//                     onChange: (e) => handleFileChange(e, "cv"),
//                   })}
//                 />
//               </label>
//               {errors.cv && (
//                 <span className="text-red-500 text-xs">
//                   {errors.cv.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start w-full">
//               <span className="font-bold text-[13px]">Upload Transcript</span>
//               <label className="cursor-pointer w-full">
//                 <div className="h-input-height w-full bg-[#001840] rounded-md text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
//                   {files.transcript
//                     ? files.transcript?.name
//                     : `Upload Transcript`}
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   {...register("transcript", {
//                     required: "Transcript must be provided",
//                     onChange: (e) => handleFileChange(e, "transcript"),
//                   })}
//                 />
//               </label>
//               {errors.transcript && (
//                 <span className="text-red-500 text-xs">
//                   {errors.transcript.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start w-full">
//               <span className="font-bold text-[13px]">
//                 Upload O-Level Certificate
//               </span>
//               <label className="cursor-pointer w-full">
//                 <div className="h-input-height w-full bg-[#001840] rounded-md text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
//                   {files.oLevelCertificate
//                     ? files.oLevelCertificate?.name
//                     : "Upload O-Level Certificate"}
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   {...register("o_level_certificate", {
//                     required: "O-Level Certificate must be provided",
//                     onChange: (e) => handleFileChange(e, "oLevelCertificate"),
//                   })}
//                 />
//               </label>
//               {errors.o_level_certificate && (
//                 <span className="text-red-500 text-xs">
//                   {errors.o_level_certificate.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-1 justify-center items-start w-full">
//               <span className="font-bold text-[13px]">
//                 Upload A-Level Certificate
//               </span>
//               <label className="cursor-pointer w-full">
//                 <div className="h-input-height w-full bg-[#001840] rounded-md text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
//                   {files.aLevelCertificate
//                     ? files.aLevelCertificate?.name
//                     : "Upload A-Level Certificate"}
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   {...register("a_level_certificate", {
//                     onChange: (e) => handleFileChange(e, "aLevelCertificate"),
//                   })}
//                 />
//               </label>
//               {errors.a_level_certificate && (
//                 <span className="text-red-500 text-xs">
//                   {errors.a_level_certificate.message}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center w-[150px]">
//             <button
//               type="submit"
//               className="h-[45.27px] w-full bg-[#030DFE] text-white font-bold rounded-md flex items-center justify-center"
//             >
//               {loading ? <LoadingState /> : "Apply"}
//             </button>
//           </div>
//         </form>
//       </div>
//       <EmailVerification />
//     </main>
//   );
// };

// export default InstructorSignUpForm;

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Upload,
  message,
  Progress,
  Tooltip,
  Divider,
  Alert,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  UploadOutlined,
  CheckCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/src/hooks/useAuth";

const { Text, Paragraph } = Typography;

const InstructorRegistrationForm = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");

  const {
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onFinish,
    emailExists,
    passwordStrength,
    passwordFocused,
    loading,
    setPasswordStrength,
    setPasswordFocused,
    setEmailExists,
    setFileList,
    fileList,
  } = useAuth(password);

  const beforeUpload = (file) => {
    const isValidSize = file.size / 1024 / 1024 < 5;
    if (!isValidSize) {
      message.error("File must be smaller than 5MB");
    }
    return false;
  };

  const handleFileChange = ({ fileList }, type) => {
    setFileList((prev) => ({
      ...prev,
      [type]: fileList,
    }));
  };

  const uploadButton = (text) => (
    <Button
      icon={<UploadOutlined />}
      className="!w-full !h-[42px] !border-dashed"
    >
      {text}
    </Button>
  );

  return (
    <div className="!min-h-screen !py-2">
      <Card className="!max-w-[800px] !mx-auto !border-0">
        {/* <div className="!mb-6">
          <div className="!w-full !bg-blue-50 !p-4 !rounded-lg !mb-6">
          <Alert
            type="info"
            message="Attention"
            icon={<InfoCircleOutlined />}
            description="When registering with Gala, teachers undergo a vetting process to
              ensure only qualified candidates are selected, maintaining service
              quality. The first payment, which is non-refundable, serves as an
              application fee. Applications are processed within 2-3 business
              days and may be approved or denied."
          />
          </div>
        </div> */}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="!max-w-[780px] !mx-auto"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="First Name"
                className="!h-[42px]"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="Last Name"
                className="!h-[42px]"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email address is requried" },
              { type: "email", message: "Invalid email address" },
            ]}
            validateStatus={emailExists ? "error" : undefined}
            help={emailExists}
          >
            <Input
              prefix={<MailOutlined className="!text-gray-400" />}
              placeholder="Email Address"
              className="!h-[42px]"
              onChange={() => {
                setEmailExists(false);
                form.validateFields(["email"]);
              }}
            />
          </Form.Item>

          <div className="!space-y-4 mb-4">
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              className="!mb-0"
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Password"
                className="!h-[42px]"
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </Form.Item>

            {passwordFocused && (
              <div className="!bg-gray-50 !p-3 !rounded-lg">
                <Progress
                  percent={passwordStrength}
                  size="small"
                  status="active"
                  strokeColor={getPasswordStatus().color}
                  className="!mb-2"
                />
                <div className="!grid !grid-cols-2 !gap-2">
                  {getPasswordRequirements(password).map((req, index) => (
                    <div key={index} className="!flex !items-center !gap-2">
                      <CheckCircleFilled
                        className={
                          req.met ? "!text-green-500" : "!text-gray-300"
                        }
                      />
                      <span className="!text-xs !text-gray-600">
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm password is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
              className="!mb-0"
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Confirm Password"
                className="!h-[42px]"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="nida"
            rules={[
              { required: true, message: "Nida number is required" },
              {
                pattern: /^\d+$/,
                message: "Please enter numbers only",
              },
              {
                len: 20,
                message: "NIDA number must be exactly 20 digits",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="!text-gray-400" />}
              suffix={
                <Tooltip title="National ID Number">
                  <InfoCircleOutlined className="!text-gray-400" />
                </Tooltip>
              }
              placeholder="NIDA Number"
              className="!h-[42px]"
              maxLength={20}
            />
          </Form.Item>

          <Form.Item hidden name="role" initialValue="instructor" />

          <Divider className="!my-6">Documents</Divider>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Form.Item
              name="cv"
              rules={[{ required: true, message: "CV is required" }]}
              className="!w-full"
            >
              <Upload
                listType="text"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "cv")}
                fileList={fileList.cv}
                maxCount={1}
                style={{ width: "100%" }}
              >
                {uploadButton("Upload CV")}
              </Upload>
            </Form.Item>

            <Form.Item
              name="transcript"
              rules={[{ required: true, message: "Transcript is required" }]}
            >
              <Upload
                listType="text"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "transcript")}
                fileList={fileList.transcript}
                maxCount={1}
              >
                {uploadButton("Upload Transcript")}
              </Upload>
            </Form.Item>

            <Form.Item
              name="oLevelCertificate"
              rules={[
                {
                  required: true,
                  message: "Ordinary level certificate is required",
                },
              ]}
            >
              <Upload
                listType="text"
                className="!w-full"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "oLevelCertificate")}
                fileList={fileList.oLevelCertificate}
                maxCount={1}
              >
                {uploadButton("O-Level Certificate")}
              </Upload>
            </Form.Item>

            <Form.Item name="aLevelCertificate">
              <Upload
                listType="text"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "aLevelCertificate")}
                fileList={fileList.aLevelCertificate}
                maxCount={1}
              >
                {uploadButton("A-Level Certificate")}
              </Upload>
            </Form.Item>
          </div>

          <Form.Item className="!text-center !mt-8 !mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="!h-[42px] !px-8 !w-full !font-bold !bg-[#010798] hover:!bg-blue-700"
            >
              {loading ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                "Submit Application"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default InstructorRegistrationForm;
