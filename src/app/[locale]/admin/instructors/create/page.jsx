"use client";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Upload,
  message,
  Tooltip,
  Select,
} from "antd";
import clsx from "clsx";
import React from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";

import SlickSpinner from "@/components/ui/loading/template/SlickSpinner";
import {
  PartnerSchoolSelect,
  useSpecialPassInstructor,
} from "@/features/admin";


const { Text } = Typography;

const CreateSpecialPassInstructor = () => {
  const [form] = Form.useForm();

  const {
    onFinish,
    emailExists,
    setEmailExists,
    setFileList,
    fileList,
    setRegisterError,
    registerError,
    mutation,
  } = useSpecialPassInstructor();

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

  const uploadButton = (text, miniText) => (
    <div className="flex flex-col gap-1">
      <Button
        icon={<LuUpload />}
        className="!w-full !bg-[#001840] hover:!opacity-90 !text-white !h-input-height !flex !items-center !justify-center !text-xs !outline-none focus:!outline-none hover:!outline-none hover:!border-transparent hover:!box-shadow-none"
      >
        {text}
      </Button>
      <Text className="text-[10px] font-normal text-gray-500 flex items-center gap-1">
        <FilePdfOutlined /> PDF only, max 2MB
        {miniText && (
          <span className="text-black mx-1 font-bold">({miniText})</span>
        )}
      </Text>
    </div>
  );

  return (
    <>
      <Card className="!border-0 -mx-5 lg:-mx-0 mt-3">
        <div className="flex flex-col gap-2 justify-center items-center w-full mb-6">
          <span className="font-black text-xl sm:text-2xl">
            Create Special Pass Instructor
          </span>
          <span className="font-medium text-[12px] w-full text-center">
            This will create a special pass instructor with a defined special
            pass, user account will be active upon email verification and
            setting password.
          </span>
        </div>
        {registerError && (
          <div
            className={clsx(
              "p-1 border-[0.8px] text-xs text-center mb-4 w-full rounded-md",
              mutation.isSuccess
                ? "border-green-700 text-green-400 bg-green-50"
                : mutation.isError
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-gray-700 text-gray-700"
            )}
          >
            {registerError}
          </div>
        )}

        <Form
          form={form}
          onFinish={onFinish}
          onFieldsChange={() => {
            mutation.reset();
            setRegisterError("");
          }}
          className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-6 !w-full"
        >
          <div className="w-full lg:w-6/12 flex flex-col">
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder="First Name"
                className="!h-[42px] signup-input"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder="Last Name"
                className="!h-[42px] signup-input"
              />
            </Form.Item>
            <Form.Item
              name="email"
              validateTrigger={["onBlur", "onChange", "onSubmit"]}
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
                {
                  type: "email",
                  message: "Please enter valid email address",
                },
              ]}
              validateStatus={emailExists ? "error" : undefined}
            >
              <div>
                <Input
                  prefix={<MailOutlined className="!text-gray-400" />}
                  autoComplete="new-password"
                  autoCapitalize="off"
                  spellCheck="false"
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
              name="nida"
              rules={[
                {
                  required: true,
                  message: "Please enter your NIDA number",
                },
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
                autoComplete="new-password"
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
            <Form.Item
              initialValue={"special_pass"}
              name="user_pass_type"
              rules={[
                {
                  // required: true,
                  message: "Please choose the user pass",
                },
              ]}
            >
              <Select
                suffixIcon={<IoChevronDownCircleOutline />}
                options={[
                  {
                    value: "special_pass",
                    label: "Special Pass",
                  },
                  // { value: "trial", label: "Trial" },
                ]}
                disabled
                className="!h-[42px]"
                placeholder={"User Pass"}
              />
            </Form.Item>
            <Form.Item
              name="user_pass_duration"
              rules={[
                {
                  required: true,
                  message: "Please choose the user pass duration",
                },
              ]}
            >
              <Select
                suffixIcon={<IoChevronDownCircleOutline />}
                options={[
                  { value: 7, label: "One week" },
                  { value: 30, label: "One Month" },
                  { value: 189, label: "Six Months" },
                  { value: 365, label: "One Year" },
                ]}
                className="!h-[42px]"
                placeholder={"User Pass Duration"}
              />
            </Form.Item>
            <Form.Item
              name="partner_school"
              rules={[
                {
                  required: true,
                  message: "Please select a partner school",
                },
              ]}
              getValueFromEvent={(val) => {
                console.log("📦 Raw event from Select:", val);
                return val; // or val?.value if you want just the ID
              }}
            >
              <PartnerSchoolSelect />
            </Form.Item>
            <Form.Item initialValue="instructor" name="role" hidden>
              <Input type="hidden" />
            </Form.Item>
          </div>

          <div className="flex flex-col w-full lg:w-4/12">
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
              >
                {uploadButton("Upload CV", "")}
              </Upload>
            </Form.Item>

            <Form.Item
              name="transcript"
              rules={[
                {
                  required: true,
                  message: "Transcript is required",
                },
              ]}
            >
              <Upload
                accept=".pdf"
                listType="text"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "transcript")}
                fileList={fileList.transcript}
                maxCount={1}
              >
                {uploadButton("Upload Certificate", "")}
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
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "oLevelCertificate")}
                fileList={fileList.oLevelCertificate}
                maxCount={1}
              >
                {uploadButton("O-Level Certificate", "")}
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
                {uploadButton("A-Level Certificate", "Optional")}
              </Upload>
            </Form.Item>
          </div>
          <Form.Item className="w-full lg:w-2/12">
            <Button
              disabled={
                mutation.isPending || mutation.isSuccess || mutation.isError
              }
              type="primary"
              htmlType="submit"
              className={
                "!flex !items-center !justify-center !w-full !font-normal !py-4 !text-white !border-transparent disabled:!cursor-not-allowed disabled:!opacity-70 !bg-[#010798] hover:!opacity-80"
              }
            >
              {mutation.isPending ? (
                <SlickSpinner size={14} color="white" />
              ) : (
                <span className="font-semibold">Create</span>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CreateSpecialPassInstructor;
