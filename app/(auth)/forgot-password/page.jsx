"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { message, Input, Button, Card, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { api } from "@/src/config/settings";
import EmailVerification from "@/src/components/ui/auth/signup/EmailVerification";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const { setOpenEmailVerificationModal } = useEmailVerificationModalOpen();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    } catch (e) {
      message.error(`Failed to send OTP, ${e.message}`);
      router.push('/forgot-password/password-change')
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
              {isSubmitting ? "Sending OTP" : "Send OTP"}
            </Button>
          </form>
        ) : null}
      </Card>

    </div>
  );
};

export default ForgotPassword;
