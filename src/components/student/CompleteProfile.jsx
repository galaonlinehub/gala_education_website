import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import {
  LoadingOutlined,
  CheckOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useUser } from "@/src/hooks/useUser";
import Image from "next/image";
import {
  handlePhoneInput,
  mask_phone_number,
  reformat_phone_number,
} from "@/src/utils/fns/format_phone_number";

import { LuImage, LuRotateCcw, LuUser } from "react-icons/lu";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import SlickSpinner from "../ui/loading/template/SlickSpinner";
import { Signout } from "../ui/auth/signup/Signout";

export const Stage = {
  SAVE: "save",
  VERIFY: "verify",
  EDIT: "edit",
  SUCCESS: "success",
  FAILURE: "failure",
};

const CompleteProfile = () => {
  const [status, setStatus] = useState(Stage.SAVE);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const { user } = useUser();

  const render = () => {
    switch (status) {
      case Stage.SAVE:
      case Stage.EDIT:
        return (
          <Save
            status={status}
            setStatus={setStatus}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case Stage.VERIFY:
        return <Verify phone_number={phoneNumber} setStatus={setStatus} />;
      case Stage.SUCCESS:
        return <Success />;
    }
  };
  return (
    <Modal
      open={!user?.completed_profile && user?.has_active_subscription}
      footer={null}
      styles={{ body: { height: "400px", overflowY: "auto" } }}
      title={
        <div className="flex items-center justify-between w-full">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {status === Stage.SAVE || status === Stage.EDIT
              ? "Quick Setup"
              : status === Stage.VERIFY
              ? "Verify Phone Number"
              : "Profile Complete! 🎉"}
          </span>

          <Signout />
        </div>
      }
      width={450}
      maskClosable={false}
      closable={false}
      className="rounded-xl overflow-hidden"
    >
      {render()}
    </Modal>
  );
};

const Save = ({ status, setStatus, setPhoneNumber }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = React.useRef(null);
  const { updateProfile, isUpdatingProfile, updateProfileSuccess, user } =
    useUser();

  const handleFinish = (values) => {
    setPhoneNumber(`255${reformat_phone_number(values.phone_number)}`);
    const formData = new FormData();
    formData.append(
      "phone_number",
      `255${reformat_phone_number(values.phone_number)}`
    );
    if (imageUrl) {
      const blob = dataURLtoBlob(imageUrl);
      formData.append("profile_picture", blob, "profile-pic.jpg");
    }

    updateProfile(formData, {
      onSuccess: () => {
        setStatus(Stage.VERIFY);
        form.resetFields();
        setImageUrl(null);
      },
      onError: (error) => {
        message.error("Failed to update profile: " + error.message);
      },
    });
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.warn("file input ref not available");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return;
    }

    setUploadLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      setUploadLoading(false);
      message.success("Photo uploaded successfully!");
    };
    reader.onerror = () => {
      message.error("Failed to load image");
      setUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const validateNumber = (_, value) => {
    if (!value) return Promise.reject("Phone number is required");

    const cleanedValue = value.replace(/\D/g, "");
    if (!/^[0-9]{9}$/.test(cleanedValue)) {
      return Promise.reject("Please enter 9 digits (e.g., 752451811)");
    }

    if (!/^[76][1-9][0-9]{7}$/.test(cleanedValue)) {
      return Promise.reject("Enter valid phone number");
    }

    return Promise.resolve();
  };

  return (
    <div
      className={clsx({
        "pt-12": status === Stage.EDIT,
        "py-4 flex flex-col items-center justify-center h-full w-full":
          status === Stage.SAVE,
      })}
    >
      {status !== Stage.EDIT && (
        <div className="mb-6 w-full">
          <div className="flex gap-2 justify-start items-center mb-5 font-medium">
            <span>Upload your profile picture</span>
            <span className="text-xs font-light">Optional</span>
          </div>
          <div
            className="relative cursor-pointer transition-all duration-300 mx-auto w-32 h-32"
            onClick={handleImageClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
            />

            {imageUrl ? (
              <div className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300">
                <Image
                  width={200}
                  height={200}
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                {uploadLoading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                    <LoadingOutlined className="text-white text-xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-60 flex items-center justify-center rounded-full transition-all duration-300">
                  <LuImage className="text-white text-2xl" />
                </div>
                {imageUrl && !uploadLoading && (
                  <div className="absolute bottom-3 right-1 bg-green-500 rounded-full h-6 w-6 flex items-center justify-center p-1 border-2 border-white shadow-md">
                    <CheckOutlined className="text-white text-xs" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-2 border-gray-900 hover:border-blue-700 transition-all duration-300 mx-auto shadow-sm hover:shadow-md transform hover:scale-105 relative group">
                {uploadLoading ? (
                  <LoadingOutlined className="text-blue-500 text-xl" />
                ) : (
                  <>
                    <div className="flex flex-col items-center transition-opacity duration-300 group-hover:opacity-0">
                      <LuUser className="text-[#001840] text-6xl" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 flex items-center justify-center rounded-full transition-all duration-300">
                      <LuImage className="text-white text-2xl" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {status === Stage.EDIT && (
        <div className="text-xl font-black mb-6">Change your phone number</div>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={true}
        initialValues={{
          phone_number: user?.phone_number
            ? user.phone_number?.replace(/^(\+?255)/, "")
            : " ",
        }}
        className="w-full"
      >
        <Form.Item
          name="phone_number"
          label={
            <span className="text-gray-700 font-medium text-sm">
              Phone Number
            </span>
          }
          rules={[{ validator: validateNumber }]}
          className="mb-8"
        >
          <Input
            addonBefore={
              <span className="text-gray-700 font-medium py-1 bg-gray-50 border-r-0">
                +255
              </span>
            }
            placeholder="752-451-811"
            maxLength={11}
            onChange={(e) => {
              const formattedValue = handlePhoneInput(e);
              form.setFieldsValue({ phone_number: formattedValue });
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={updateProfileSuccess || isUpdatingProfile}
          className={
            "!w-full !h-10 !text-base !font-bold !rounded-xl !shadow-md !transition-all !duration-300 !flex !items-center !justify-center !bg-[#001840] disabled:!opacity-70 hover:!bg-opacity-80 !text-white"
          }
        >
          {!isUpdatingProfile ? (
            <span className="flex items-center">
              Continue
              <ArrowRightOutlined className="ml-2" />
            </span>
          ) : (
            <SlickSpinner size={14} color="white" />
          )}
        </Button>

        <p className="text-center text-gray-500 text-xs mt-4">
          You can update your details anytime in your profile
        </p>
      </Form>
    </div>
  );
};

const Verify = ({ phone_number, setStatus }) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const inputs = useRef([]);
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const {
    verifyOtp,
    isVerifyingOtp,
    verifyOtpSuccess,
    verifyOtpError,
    verifyOtpReset,
    resendOtp,
  } = useUser();

  const handleChange = (value, index) => {
    if (isNaN(value) || value.length > 1) return;

    verifyOtpReset();
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newValues.every((val) => val !== "")) {
      const otp = newValues.join("");
      verifyOtp(
        { otp, phone_number },
        {
          onSuccess: (data) => {
            setStatus(Stage.SUCCESS);
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["auth-user"] });
            }, 8000);
          },
          onError: (error) => {
            message.error(
              error?.response?.data?.message || "Invalid OTP provided"
            );
            setErrorMessage(
              error?.response?.data?.message || "Invalid OTP provided"
            );
            // setValues(Array(6).fill(""));
          },
        }
      );
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (resendOtp.isPending || isVerifyingOtp || !phone_number || !canResend)
      return;
    resendOtp.mutate(phone_number, {
      onSuccess: () => {
        message.success("OTP resent successfully");
        resetTimer();
      },
      onError: (error) =>
        message.error("Failed to resend OTP, Please try again", 8),
    });
  };

  useEffect(() => {
    let interval;
    if (!canResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer, canResend]);

  const resetTimer = () => {
    setTimer(30);
    setCanResend(false);
  };

  const handleResendWithTimer = () => {
    handleResend();
    resetTimer();
  };

  return (
    <div className="flex flex-col gap-6 items- h-full pt-12 pb-4">
      <div className="text-base font-medium px-6 text-center md:text-left">
        Enter code sent to{" "}
        <span className="text-blue-700 font-extrabold">
          {phone_number && phone_number}
        </span>{" "}
        via SMS
      </div>
      {(verifyOtpError || verifyOtpSuccess) && (
        <div className="w-full flex items-center justify-center">
          <div
            className={clsx(
              "w-3/4 text-xs text-center border-[.8px] p-2 rounded-md",
              {
                "bg-red-50 border-red-500 text-red-500": verifyOtpError,
                "bg-green-50 border-green-500 text-green-500": verifyOtpSuccess,
              }
            )}
          >
            {errorMessage}
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-2 py-3">
        {Array(6)
          .fill()
          .map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={values[index]}
              onInput={(e) => {
                const value = e.target.value;
                if (!/^[0-9]$/.test(value)) {
                  e.target.value = "";
                }
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isVerifyingOtp}
              className={`text-2xl font-black w-12 h-12 text-center text-black rounded-md focus:outline-none focus:ring transition-all duration-300 ${
                verifyOtpSuccess
                  ? "border-2 border-green-500 focus:ring-green-500 text-green-600"
                  : verifyOtpError
                  ? "border-2 border-red-500 focus:ring-red-500 text-red-600 input-shake"
                  : "border-2 border-[#030DFE] focus:ring-[#030DFE] text-black"
              }`}
            />
          ))}
      </div>
      <div className="w-full flex justify-center items-center">
        {isVerifyingOtp && <SlickSpinner size={28} color="#030DFE" />}
      </div>
      <div className="w-full flex items-center justify-end">
        Didn&apos;t receive the code?
        <Button
          icon={resendOtp.isPending ? null : <LuRotateCcw />}
          type="link"
          onClick={handleResendWithTimer}
          disabled={
            resendOtp.isPending ||
            isVerifyingOtp ||
            verifyOtpSuccess ||
            !canResend
          }
          className="disabled:!text-gray-500 disabled:cursor-not-allowed"
        >
          {resendOtp.isPending
            ? "Sending..."
            : !canResend
            ? `Resend in ${timer}s`
            : "Resend"}
        </Button>
      </div>

      {!canResend && (
        <div className="text-xs text-gray-500 text-center mt-1">
          You can resend OTP in {timer} second{timer !== 1 ? "s" : ""}
        </div>
      )}

      <div className="w-full mt-3">
        <Button type="link" onClick={() => setStatus(Stage.EDIT)}>
          Change Phone number
        </Button>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-3/4 bg-white p-6 rounded-lg">
      <div className="p-4 rounded-full mb-4">
        <CheckCircleFilled className="text-6xl text-green-500" />
      </div>
      <div className="text-2xl font-semibold text-gray-800 mb-3">
        Verification Complete
      </div>
      <p className="text-gray-500 text-center mt-4">
        Your phone number has been successfully verified !!
      </p>
      <p className="text-gray-500 text-center mt-2">
        Hold on, we are setting up your profile...
      </p>
    </div>
  );
};

export { CompleteProfile, Success, Verify, Save };
