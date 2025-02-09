import {
  useEmailVerificationModalOpen,
  useTabNavigator,
} from "@/src/store/auth/signup";
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
  const { activeTab, setActiveTab } = useTabNavigator();

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
          onFinish={onFinish}
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
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
              {
                validator: async (_, value) => {
                  if (emailExists) {
                    return Promise.reject(new Error(emailExists));
                  }
                  return Promise.resolve();
                },
              },
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
                form.validateFields(["email"]);
              }}
            />
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
          <Form.Item hidden name="role" initialValue="student" />

          <Form.Item name="special_needs">
            <Select
              placeholder="Special Needs (Optional)"
              options={disabilities}
              className="!w-full !rounded-lg !min-h-[2.75rem]"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
             onClick={()=>setActiveTab(1)}
              type="primary"
              htmlType="submit"
              loading={loading}
              className="!w-full !h-11 !rounded-lg !bg-[#010798] hover:!bg-[#010798]/80 !transition-colors !text-base !font-medium"
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
