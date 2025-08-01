"use client";
import { Input, Button, Card, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiCheckCircle } from "react-icons/hi2";
import { IoIosCloseCircle } from "react-icons/io";
import { LuEye, LuEyeOff, LuLoaderCircle, LuLock } from "react-icons/lu";

import { RESET_PASSWORD_EMAIL_KEY } from "@/config/settings";
import { apiPost } from "@/services/api/api_service";
import { sessionStorageFn } from "@/utils/fns/client";
import { decrypt } from "@/utils/fns/encryption";

import Error from "../../error";

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
    const storedEmail = sessionStorageFn.get(RESET_PASSWORD_EMAIL_KEY);
    const decryptedEmail = decrypt(storedEmail);
    if (decryptedEmail) {
      setEmail(decryptedEmail);
    } else {
      setError("Failed to decrypt email");
    }
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  const PasswordRequirement = ({ satisfied, label }) => (
    <div className="flex items-center gap-2 text-[10px] sm:text-xs">
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

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (!allChecksPassed) {
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", data.password);
      const response = await apiPost("/password/reset", formData);
      if (response.status === 200) {
        message.success("Password changed successfully");
        router.push("/signin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      message.error(`Failed to change password: ${error.message}`);
    }
  };

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  if (error) {
    return <Error error={{ message: error }} />;
  }

  return (
    <div className="flex items-center justify-center h-5/6 p-3 lg:p-0">
      <Card
        className="!w-full !max-w-xl !bg-white !rounded-lg  !border-0"
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
              className="flex text-gray-700 font-bold mb-2"
            >
              <LuLock className="mr-2" /> New Password
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
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  className="!h-input-height"
                  iconRender={(visible) => (visible ? <LuEye /> : <LuEyeOff />)}
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
              className="flex text-gray-700 items-center font-bold mb-2"
            >
              <LuLock className="mr-2" /> Confirm Password
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
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  className="!h-input-height"
                  iconRender={(visible) => (visible ? <LuEye /> : <LuEyeOff />)}
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
            disabled={!allChecksPassed || isSubmitting}
            className="!w-full !bg-[#030DFE] !text-white !font-bold !py-5 !px-4 !rounded disabled:!opacity-60 disabled:cursor-not-allowed"
          >
            {!isSubmitting ? (
              <span>Change Password</span>
            ) : (
              <LuLoaderCircle className="animate-spin" />
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
