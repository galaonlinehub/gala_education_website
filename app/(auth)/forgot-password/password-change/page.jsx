"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Card, Typography, message } from "antd";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { HiCheckCircle } from "react-icons/hi2";
import { IoIosCloseCircle } from "react-icons/io";
import { decrypt } from "@/src/utils/fns/encryption";
import Error from "../../error";
import { apiPost } from "@/src/services/api_service";

const { Title, Text } = Typography;

const ChangePassword = () => {
  const router = useRouter();
  const [passwordChecks, setPasswordChecks] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const password = watch("password");

  useEffect(() => {
    if (password) {
      setPasswordChecks({
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$_\-%^&*(),.?":{}|<>]/.test(password),
        hasMinLength: password.length >= 8,
      });
    } else {
      setPasswordChecks({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
      });
    }
  }, [password]);

  useEffect(() => {
    decryptEmail();
  }, []);

  const decryptEmail = () => {
    const storedEmail = sessionStorage.getItem("Gala");
    const decryptedEmail = decrypt(storedEmail);
    if (decryptedEmail) {
      setEmail(decryptedEmail);
    } else {
      setError("Failed to decrypt email");
    }
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  const PasswordRequirement = ({ satisfied, label }) => (
    <div className="flex items-center gap-2 text-sm">
      {satisfied ? (
        <HiCheckCircle className="text-green-500" />
      ) : (
        <IoIosCloseCircle className="text-red-500" />
      )}
      <span className={satisfied ? "text-green-500" : "text-red-500"}>
        {label}
      </span>
    </div>
  );

  //   const validatePassword = (value) => {
  //     if (!value) return "Password is required";
  //     if (!allChecksPassed) {
  //       return "Password must meet all requirements";
  //     }
  //     return true;
  //   };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (!allChecksPassed) {
      return false;
      //   const missingRequirements = [];
      //   if (!passwordChecks.hasUpperCase) missingRequirements.push("uppercase letter");
      //   if (!passwordChecks.hasLowerCase) missingRequirements.push("lowercase letter");
      //   if (!passwordChecks.hasNumber) missingRequirements.push("number");
      //   if (!passwordChecks.hasSpecialChar) missingRequirements.push("special character");
      //   if (!passwordChecks.hasMinLength) missingRequirements.push("minimum length of 8 characters");

      //   return missingRequirements.length > 0
      //     ? `Missing requirements: ${missingRequirements.join(", ")}`
      //     : true;
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("newPassword", data.password);
      console.log(data, email);
      const response = await apiPost("/reset-password", formData);

      if (response.data.success) {
        message.success("Password changed successfully");
        router.push("/signin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(`Failed to change password: ${error.message}`);
    }
  };

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  //ERROR RETURNED IF DECRYPTION FAILS
  if (error) {
    return <Error error={{ message: error }} />;
  }

  //NORMAL FLOW
  return (
    <div className="flex items-center justify-center h-screen p-3 lg:p-0">
      <Card
        className="!w-full !max-w-xl !bg-white !p-8 !rounded-lg !shadow-sm"
        title={
          <div className="flex justify-start items-center gap-3">
            <Title className="self-center" level={3}>
              Change Password
            </Title>
          </div>
        }
      >
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              <LockOutlined className="mr-2" /> New Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                validate: validatePassword,
              }}
              shouldUnregister={false}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="password"
                  placeholder="Enter new password"
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  className="!h-input-height"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
            {errors.password && (
              <Text type="danger" className="!text-sm !mt-2">
                {errors.password.message}
              </Text>
            )}

            <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-md">
              <Text strong className="block mb-2">
                Password Requirements:
              </Text>
              <PasswordRequirement
                satisfied={passwordChecks.hasMinLength}
                label="At least 8 characters long"
              />
              <PasswordRequirement
                satisfied={passwordChecks.hasUpperCase}
                label="Contains at least one uppercase letter"
              />
              <PasswordRequirement
                satisfied={passwordChecks.hasLowerCase}
                label="Contains at least one lowercase letter"
              />
              <PasswordRequirement
                satisfied={passwordChecks.hasNumber}
                label="Contains at least one number"
              />
              <PasswordRequirement
                satisfied={passwordChecks.hasSpecialChar}
                label="Contains at least one special character"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              <LockOutlined className="mr-2" /> Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  className="!h-input-height"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            />
            {errors.confirmPassword && (
              <Text type="danger" className="!text-sm !mt-2">
                {errors.confirmPassword.message}
              </Text>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={!allChecksPassed}
            className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 !px-4 !rounded disabled:opacity-50"
          >
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
