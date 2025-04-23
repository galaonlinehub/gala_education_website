import { Modal, Result } from "antd";
import React, { useEffect, useState } from "react";
import LoadingState from "../../loading/template/LoadingSpinner";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
import { useTabNavigator } from "@/src/store/auth/signup";
import { decrypt } from "@/src/utils/fns/encryption";
import { useRouter } from "next/navigation";
import { message, Button, Alert } from "antd";
import { maskEmail } from "@/src/utils/fns/mask_email";
import { ReloadOutlined } from "@ant-design/icons";
import { apiPost } from "@/src/services/api_service";
import { sessionStorageFn } from "@/src/utils/fns/client";
import {
  EMAIL_VERIFICATION_KEY,
  EMAIL_VERIFICATION_MODAL_KEY,
} from "@/src/config/settings";
import clsx from "clsx";

const EmailVerification = () => {
  const openEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.openEmailVerificationModal
  );
  const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.setOpenEmailVerificationModal
  );
  const setActiveTab = useTabNavigator((state) => state.setActiveTab);

  const inputs = React.useRef([]);
  const [values, setValues] = useState(Array(6).fill(""));
  const [hasVerified, setHasVerified] = useState(null);
  const [email, setEmail] = useState("");
  const [resendCounter, setResendCounter] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [localFeedback, setLocalFeedback] = useState({
    show: false,
    type: "",
    message: "",
  });

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getEmail = () => {
      const encryptedEmail = sessionStorageFn.get(EMAIL_VERIFICATION_KEY);
      if (encryptedEmail) {
        const decryptedEmail = decrypt(encryptedEmail);
        setEmail(decryptedEmail);
      } else {
        message.error("Unexpected Error Occured, Try again Later!");
        router.push("/");
      }
    };

    if (openEmailVerificationModal) {
      getEmail();
      setResendCounter(30);
    }
  }, [openEmailVerificationModal, router]);

  const handleChange = async (value, index) => {
    if (isNaN(value) || value.length > 1) return;

    setHasVerified(null);

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newValues.length === 6 && newValues.every((val) => val !== "")) {
      const code = Number(newValues.join(""));
      setLoading(true);

      const formData = new FormData();
      formData.append("otp", code);
      formData.append("email", email);

      try {
        const response = await apiPost("/verify-otp", formData);

        if (response.status === 200) {
          setHasVerified(true);
          setTimeout(() => {
            setActiveTab(1);
            setOpenEmailVerificationModal(false);
          }, 5000);
        }
      } catch (e) {
        console.error(e.response?.data?.message || e.message);
        setHasVerified(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    let timer;
    if (resendCounter > 0) {
      timer = setInterval(() => {
        setResendCounter((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCounter]);

  const handleResendOtp = async () => {
    if (resendCounter > 0) return;
    try {
      setIsSendingOtp(true);
      const response = await apiPost("/request-otp", {
        email: email,
      });
      if (response.status === 200) {
        setResendCounter(30);
        setLocalFeedback({
          show: true,
          type: "success",
          message: response?.data?.message ?? "OTP sent successfully.",
        });
      }
    } catch (e) {
      setLocalFeedback({
        show: true,
        type: "error",
        message: e?.response?.data?.message ?? "Sending OTP failed, Try again.",
      });
    } finally {
      setIsSendingOtp(false);

      setTimeout(() => {
        setLocalFeedback({
          show: false,
          type: "",
          message: "",
        });
      }, 10000);
    }
  };

  return (
    <Modal
      title={<p>Verify Email</p>}
      closable={false}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={false}
      footer={null}
      open={openEmailVerificationModal}
      onCancel={() => setOpenEmailVerificationModal(false)}
    >
      <div className="mb-6 flex flex-col">
        <span className="block w-full space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Enter Verification Code Sent through</span>
          <span className="font-bold">
            {openEmailVerificationModal && email ? maskEmail(email) : ""}
          </span>
        </span>
        {localFeedback.show && (
          <div
            className={clsx(
              "border-[0.8px] rounded-md p-1 my-2 text-center w-full self-center",
              localFeedback.type === "error"
                ? "border-red-500 text-red-500 bg-red-50"
                : "border-green-700 text-green-700 bg-green-50"
            )}
          >
            {localFeedback.message}
          </div>
        )}
        <div>
          <div
            className={"flex flex-wrap gap-2 items-center justify-center py-4"}
          >
            {Array(6)
              .fill()
              .map((_, index) => (
                <input
                  key={index}
                  ref={(e) => (inputs.current[index] = e)}
                  type="text"
                  inputMode={"numeric"}
                  maxLength="1"
                  onInput={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]$/.test(value)) {
                      e.target.value = "";
                    }
                  }}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`${
                    hasVerified !== null
                      ? hasVerified
                        ? "border border-green-500 focus:ring-green-800 focus:outline-green-600 input-shake hasVerified"
                        : "border border-red-500 focus:ring-red-800 focus:outline-red-600 input-shake failure"
                      : "text-2xl font-black w-12 h-12 text-center text-black border border-[#030DFE] rounded-md focus:outline-none focus:ring focus:ring-[#030DFE]"
                  } text-2xl font-black w-12 h-12 text-center text-black rounded-md focus:outline-none focus:ring`}
                />
              ))}
          </div>
          {loading && (
            <div className="flex flex-col items-center justify-center p-3 gap-2">
              <LoadingState />
              <span className="font-bold">Verifying...</span>
            </div>
          )}
          {hasVerified !== null &&
            (hasVerified ? (
              <Result
                status="success"
                title="Email successfully Verified!"
                subTitle="Hold on a moment. You&#39;ll be directed to the next stage."
              />
            ) : (
              <Result
                status="error"
                title="Email Verification Failed!"
                subTitle="Incorrect Code Provided."
              ></Result>
            ))}
          <div className="flex flex-wrap gap-2 text-xs w-full items-center justify-end overflow-hidden">
            <span>Didn&#39;t get the code?</span>
            <Button
              type="link"
              onClick={handleResendOtp}
              className={`!p-1 !bg-transparent !rounded-md !cursor-pointer !text-xs disabled:pointer-events-none ${
                isSendingOtp && "!text-blue-600 !px-1"
              }`}
              disabled={resendCounter > 0 || loading || isSendingOtp}
              icon={!isSendingOtp && <ReloadOutlined />}
            >
              {resendCounter > 0
                ? `Resend OTP in ${resendCounter}s`
                : isSendingOtp
                ? "Sending..."
                : "Resend OTP"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailVerification;
