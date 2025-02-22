import React, { useState, useEffect } from "react";
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
  FilePdfOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/src/hooks/useAuth";
import EmailVerification from "./EmailVerification";

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
    const isPdf = file.type === "application/pdf";
    const isValidSize = file.size / 1024 / 1024 < 2;

    if (!isPdf) {
      message.error("Only PDF files are allowed");
      return Upload.LIST_IGNORE;
    }

    if (!isValidSize) {
      message.error("File must be smaller than 2MB");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleFileChange = ({ fileList }, type) => {
    const validFiles = fileList.filter(
      (file) =>
        file.status !== "error" &&
        file.type === "application/pdf" &&
        file.size / 1024 / 1024 < 2
    );

    setFileList((prev) => ({
      ...prev,
      [type]: validFiles,
    }));
  };

  const uploadButton = (text) => (
    <div className="flex flex-col gap-1">
      <Button
        icon={<UploadOutlined />}
        className="!w-full !bg-[#001840] !text-white !h-input-height !flex !items-center !justify-center !text-xs !outline-none focus:outline-none !hover:outline-none !hover:border-transparent !hover:box-shadow-none"
      >
        {text}
      </Button>
      <Text className="text-[10px] font-extralight text-gray-500 flex items-center gap-1">
        <FilePdfOutlined /> PDF only, max 2MB
      </Text>
    </div>
  );

  return (
    <>
      <Card className="!border-0 !mt-12">
        <div className="flex flex-col gap-2 justify-center items-center w-full mb-6">
          <span className="font-bold text-2xl">Sign Up</span>
          <span className="font-medium text-[12px] w-full text-center">
            {" "}
            When registering with Gala, teachers undergo a vetting process to
            ensure only qualified candidates are selected, maintaining service
            quality. The first payment, which is non-refundable, serves as an
            application fee. Applications are processed within 2-3 business days
            and may be approved or denied.
          </span>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          className="flex flex-col lg:flex-row items-center justify-center gap-4 !w-full"
        >
          <div className="w-full lg:w-6/12 flex flex-col">
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="First Name"
                className="!h-[42px] signup-input"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="Last Name"
                className="!h-[42px] signup-input"
              />
            </Form.Item>
            <Form.Item
              name="email"
              validateTrigger={["onBlur", "onChange", "onSubmit"]}
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Invalid email address" },
              ]}
              validateStatus={emailExists ? "error" : undefined}
            >
              <div>
                <Input
                  prefix={<MailOutlined className="!text-gray-400" />}
                  placeholder="Email Address"
                  className="!h-[42px] signup-input"
                  onChange={() => {
                    setEmailExists(false);
                  }}
                />
                {emailExists && (
                  <div className="ant-form-item-explain-error">
                    {emailExists}
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  validator: (_, value) => {
                    if (value && passwordStrength < 100) {
                      return Promise.reject(
                        "Password must meet all requirements"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Password"
                className="!h-[42px] signup-input"
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </Form.Item>

            {passwordFocused && (
              <div className="!bg-gray-100 !p-3 !rounded-lg mb-3 -mt-1  !border !border-gray-200">
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
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Confirm Password"
                className="!h-[42px] signup-input"
              />
            </Form.Item>

            <Form.Item
              name="nida"
              rules={[
                { required: true, message: "Please enter your NIDA number" },
                {
                  pattern: /^\d+$/,
                  message: "Invalid NIDA number",
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
                className="!h-[42px] signup-input"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item initialValue="instructor" name="role" hidden>
              <Input type="hidden" />
            </Form.Item>
          </div>

          <div className="flex flex-col gap-1 w-full lg:w-4/12">
            <Form.Item
              name="cv"
              rules={[{ required: true, message: "CV is required" }]}
              className="!w-full"
            >
              <Upload
                accept=".pdf"
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
                accept=".pdf"
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
                  message: "O-level certificate is required",
                },
              ]}
            >
              <Upload
                accept=".pdf"
                listType="text"
                className="!w-full !bg-[#001840]"
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
                accept=".pdf"
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
          <Form.Item className="w-full lg:w-2/12">
            <Button
              disabled={true}
              type="primary"
              htmlType="submit"
              className="!flex !items-center !justify-center !w-full !font-semibold !bg-[#030DFE] !hover:bg-blue-700 !h-[40px] !text-white"
            >
              {loading ? <LoadingOutlined spin /> : "Apply"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <EmailVerification />
    </>
  );
};

export default InstructorRegistrationForm;
