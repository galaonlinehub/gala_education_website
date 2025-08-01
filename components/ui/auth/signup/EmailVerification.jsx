import { ReloadOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import clsx from "clsx";
import React from "react";
import { LuBan, LuCheck, LuTriangleAlert } from "react-icons/lu";

import { useEmailVerification } from "@/hooks/ui/useEmailVerification";
import { maskEmail } from "@/utils/fns/mask_email";

import LoadingState from "../../loading/template/LoadingSpinner";

const EmailVerification = () => {
  const {
    verifyMutate,
    handleResendMutation,
    handleResendOtp,
    handleKeyDown,
    handleChange,
    openEmailVerificationModal,
    handleCancel,
    email,
    resendCounter,
    inputs,
  } = useEmailVerification();

  return (
    <Modal
      title={<p>Verify Email</p>}
      closable={false}
      maskClosable={false}
      keyboard={false}
      destroyOnClose={false}
      footer={null}
      open={openEmailVerificationModal}
      onCancel={handleCancel}
    >
      <div className="mb-6 flex flex-col">
        <span className="block w-full space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>Enter Verification Code Sent through</span>
          <span className="font-bold">
            {openEmailVerificationModal && email ? maskEmail(email) : ""}
          </span>
        </span>
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
                  className={clsx(
                    " text-3xl font-black w-12 h-12 text-center text-black rounded-md focus:outline-none focus:ring",
                    verifyMutate.isSuccess
                      ? "border border-green-500 focus:ring-green-800 focus:outline-green-600 input-shake"
                      : verifyMutate?.error?.status === 429
                      ? "border border-yellow-500 focus:ring-yellow-500 focus:outline-yellow-500 input-shake failure"
                      : verifyMutate?.error
                      ? "border border-red-500 focus:ring-red-500 focus:outline-red-500 input-shake failure"
                      : "text-2xl font-black w-12 h-12 text-center text-black border border-[#030DFE] rounded-md focus:outline-none focus:ring focus:ring-[#030DFE]"
                  )}
                />
              ))}
          </div>
          {verifyMutate.isPending && (
            <div className="flex flex-col items-center justify-center p-3 gap-2">
              <LoadingState />
              <span className="font-bold">Verifying...</span>
            </div>
          )}
          {verifyMutate.isSuccess ? (
            <div className="text-green-500 flex flex-col items-center justify-center">
              <LuCheck className="text-2xl" />
              <span className="text-center">Email Successfully Verified!</span>
              <span className="text-center">
                Hold on a moment. You&apos;ll be directed to the next stage.
              </span>
            </div>
          ) : verifyMutate.isError ? (
            verifyMutate?.error?.status === 429 ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <LuTriangleAlert className="text-yellow-400 text-2xl" />
                <span className="font-bold text-center">
                  {verifyMutate.error?.response?.data?.message ||
                    verifyMutate.error?.message ||
                    "Email Verification Failed!"}
                </span>
              </div>
            ) : (
              <div className="text-red-500 flex flex-col items-center justify-center gap-2">
                <LuBan className="text-2xl" />
                <span>Email Verification Failed!</span>
                <span>
                  {verifyMutate.error?.response?.data?.message ||
                    verifyMutate.error?.message}
                </span>
              </div>
            )
          ) : (
            ""
          )}
          <div className="flex flex-wrap gap-2 text-xs w-full items-center justify-end overflow-hidden">
            <span>Didn&apos;t get the code?</span>
            <Button
              type="link"
              onClick={handleResendOtp}
              className={clsx(
                "!p-1 !bg-transparent !rounded-md !cursor-pointer !text-xs disabled:pointer-events-none",
                handleResendMutation.isPending && "!text-blue-600 !px-1"
              )}
              disabled={
                resendCounter > 0 ||
                verifyMutate.isPending ||
                handleResendMutation.isPending
              }
              icon={!handleResendMutation.isPending && <ReloadOutlined />}
            >
              {resendCounter > 0
                ? `Resend OTP in ${resendCounter}s`
                : handleResendMutation.isPending
                ? "Sending..."
                : "Resend OTP"}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleCancel}
          className="border border-black rounded-md px-2 hover:border-red-500 hover:text-red-500"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EmailVerification;
