import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
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
  Progress,
  Tooltip,
} from "antd";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { LuCheck, LuUpload } from "react-icons/lu";

import { Contact } from "@/components/layout/Contact";
import { useAuth } from "@/hooks/data/useAuth";
import { preventCopyPaste } from "@/utils/fns/general";

import EmailVerification from "./EmailVerification";
import SlickSpinner from "../../loading/template/SlickSpinner";

const { Text } = Typography;

const InstructorRegistrationForm = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const router = useRouter();

  const {
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onFinish,
    emailExists,
    passwordStrength,
    passwordFocused,
    setPasswordFocused,
    setEmailExists,
    setFileList,
    fileList,
    setRegisterError,
    registerError,
    mutation,
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

  const sut = useTranslations('sign_up')
  const ht = useTranslations('home_page')

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
          <span className="font-black text-xl sm:text-2xl">{sut('sign_up')}</span>
          <span className="font-medium text-[12px] w-full text-center">
            {sut('sign_up_statement_teachers')}
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
                { required: true, message: sut('enter_first_name') },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('first_name')}
                className="!h-[42px] signup-input"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: sut('enter_last_name') },
              ]}
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('second_name')}
                className="!h-[42px] signup-input"
              />
            </Form.Item>
            <Form.Item
              name="email"
              validateTrigger={["onBlur", "onChange", "onSubmit"]}
              rules={[
                { required: true, message: sut('enter_email') },
                { type: "email", message: sut('valid_email_address') },
              ]}
              validateStatus={emailExists ? "error" : undefined}
            >
              <div>
                <Input
                  prefix={<MailOutlined className="!text-gray-400" />}
                  autoComplete="new-password"
                  autoCapitalize="off"
                  spellCheck="false"
                  placeholder={ht('email')}
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
                { required: true, message: sut('enter_password') },
                {
                  validator: (_, value) => {
                    if (value && passwordStrength < 100) {
                      return Promise.reject(
                        sut('password_requirements')
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('password')}
                className="!h-[42px] signup-input"
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
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
                { required: true, message: sut('confirm_your_password') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(sut('password_mismatch'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('confirm_password')}
                className="!h-[42px] signup-input"
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
              />
            </Form.Item>

            <Form.Item
              name="nida"
              rules={[
                { required: true, message: sut('enter_nida_number') },
                {
                  pattern: /^\d+$/,
                  message: sut('invalid_nida_number'),
                },
                {
                  len: 20,
                  message: sut('nida_number_length'),
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="!text-gray-400" />}
                autoComplete="new-password"
                suffix={
                  <Tooltip title={ht('nida_number')}>
                    <InfoCircleOutlined className="!text-gray-400" />
                  </Tooltip>
                }
                placeholder={ht('nida_number')}
                className="!h-[42px] signup-input"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item initialValue="instructor" name="role" hidden>
              <Input type="hidden" />
            </Form.Item>
          </div>

          <div className="flex flex-col w-full lg:w-4/12">
            <Form.Item
              name="cv"
              rules={[{ required: true, message: sut('cv_required')}]}
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
                {uploadButton(sut('upload_cv'), "")}
              </Upload>
            </Form.Item>

            <Form.Item
              name="transcript"
              rules={[{ required: true, message: sut('transcript_required') }]}
            >
              <Upload
                accept=".pdf"
                listType="text"
                beforeUpload={beforeUpload}
                onChange={(info) => handleFileChange(info, "transcript")}
                fileList={fileList.transcript}
                maxCount={1}
              >
                {uploadButton(sut('upload_certificate'), "")}
              </Upload>
            </Form.Item>

            <Form.Item
              name="oLevelCertificate"
              rules={[
                {
                  required: true,
                  message: sut('o_level_cert_required')
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
                {uploadButton(sut('o_level_cert'), "")}
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
                {uploadButton(sut('a_level_cert'), ht('optional'))}
              </Upload>
            </Form.Item>
          </div>
          <Form.Item className="w-full lg:w-2/12">
            <Button
              disabled={
                mutation.isPending ||
                !isAgreementChecked ||
                mutation.isSuccess ||
                mutation.isError
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
                <span className="font-semibold">{sut('apply')}</span>
              )}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-sm text-gray-600 mt-2 flex items-center justify-center gap-2 flex-wrap">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={isAgreementChecked}
              onChange={(e) => setIsAgreementChecked(e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-[#010798] rounded 
                      checked:bg-[#010798] cursor-pointer
                      transition-all duration-300 ease-in-out
                      hover:border-opacity-80 focus:ring-2 focus:ring-[#010798] focus:ring-opacity-40 flex items-center justify-center outline-none"
            />
            <LuCheck
              className={clsx(
                "absolute left-0.5 top-0.5",
                "pointer-events-none transition-all duration-300 ease-in-out",
                {
                  "text-white": isAgreementChecked,
                  "text-transparent": !isAgreementChecked,
                }
              )}
              size={16}
              strokeWidth={4}
            />
          </div>

          <Text>{sut('read_and_agreed')}</Text>
          <Button
            type="link"
            className="!p-0 !m-1 !text-blue-600 hover:!text-blue-700"
            onClick={() => router.push("/terms-and-privacy")}
          >
            {sut('terms_of_service')}
          </Button>
          <Text> {sut('and')} </Text>
          <Button
            type="link"
            className="!p-0 !m-1 !text-blue-600 hover:!text-blue-700"
            onClick={() => router.push("/terms-and-privacy")}
          >
            {sut('privacy_policy')}
          </Button>
        </div>

        <div className="!text-center !text-sm !text-gray-600">
          <Text>{sut('already_have_account')}</Text>
          <Button
            type="link"
            className="!p-0 !m-1 !text-blue-600 hover:!text-blue-700"
            onClick={() => router.push("/signin")}
          >
            {sut('sign_in')}
          </Button>
        </div>

        <div className="w-full flex items-center justify-center mt-1">
          <Contact />
        </div>
      </Card>
      <EmailVerification />
    </>
  );
};

export default InstructorRegistrationForm;
