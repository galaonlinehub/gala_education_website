import {
  useEmailVerificationModalOpen,
  useTabNavigator,
} from "@/src/store/auth/signup";
import React, { useState, useEffect } from "react";
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
} from "@ant-design/icons";
import { disabilities } from "@/src/utils/data/disabilities";
import { GoShieldCheck } from "react-icons/go";
import { useAuth } from "@/src/hooks/useAuth";
import EmailVerification from "./EmailVerification";

const { Title, Text, Paragraph } = Typography;

const SignUpForm = () => {
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
  } = useAuth(password);

  return (
    <div className="flex justify-center lg:px-8 lg:mt-4">
      <Card className="!w-full max-w-3xl !border-0">
        <div className="text-center mb-8">
          <Title
            level={2}
            className="!text-2xl !font-bold !text-gray-900 !mb-2"
          >
            Sign Up
          </Title>
          <Paragraph className="!text-sm !text-gray-600">
            Step into the realm of endless possibilities! Your adventure in
            knowledge begins here.
          </Paragraph>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          className="!space-y-4"
        >
          <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-4">
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              className="!mb-0"
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="First Name"
                className="!h-11 signup-input"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
              className="!mb-0"
            >
              <Input
                prefix={<UserOutlined className="!text-gray-400" />}
                placeholder="Last Name"
                className="!h-11 signup-input"
              />
            </Form.Item>
          </div>

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
              autoComplete="off"
                prefix={<MailOutlined className="!text-gray-400" />}
                placeholder="Email Address"
                className="!h-11 signup-input"
                onChange={() => {
                  setEmailExists(false);
                }}
              />
              {emailExists && (
                <div className="ant-form-item-explain-error">{emailExists}</div>
              )}
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              // { min: 8, message: "Password must be at least 8 characters!" },
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
            <div className="space-y-2">
              <Input.Password
                prefix={<LockOutlined className="!text-gray-400" />}
                placeholder="Password"
                className="!h-11 signup-input"
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
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<SafetyOutlined className="!text-gray-400" />}
              placeholder="Confirm Password"
              className="!h-11 signup-input"
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

          <Form.Item initialValue="student" name="role" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item className="!mb-0">
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!w-full !h-11 !rounded-lg !bg-[#010798] hover:!bg-[#010798]/80 !transition-colors !text-base !text-white !font-medium"
              icon={<GoShieldCheck />}
            >
              {!loading && "Create Account"}
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
      <EmailVerification />
    </div>
  );
};

export default SignUpForm;
