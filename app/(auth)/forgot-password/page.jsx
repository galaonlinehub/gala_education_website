"use client";
import { Controller } from "react-hook-form";
import { Input, Button, Card, Space } from "antd";
import {
  LuCircleCheckBig,
  LuKeySquare,
  LuMail,
  LuRotateCw,
  LuSendHorizontal,
  LuX,
} from "react-icons/lu";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { usePassword } from "@/src/hooks/usePassword";
import { SUPPORT_EMAIL } from "@/src/config/settings";
import { Contact } from "@/src/components/layout/Contact";

const ForgotPassword = () => {
  const {
    onSubmit,
    resetPasswordMutation,
    control,
    handleSubmit,
    errors,
    handleKeyDown,
    handleOtpChange,
    handlePaste,
    verificationMutation,
    handleResendOtp,
    resendOtpMutation,
    width,
    otpStatus,
    otpValues,
    resendCounter,
    otpRefs,
    setOtpStatus,
  } = usePassword();

  return (
    <div className="flex items-center justify-center px-2 py-2 md:py-6">
      <Card
        className={`!w-full !max-w-md !py-4 bg-white rounded-xl transition-all ${
          width < 768 ? "shadow-none border-none" : "shadow-sm"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <LuKeySquare className="text-[#030DFE] text-2xl" />
          </div>
        </div>

        <h1 className="font-bold mb-6 text-2xl text-center text-gray-800">
          {!resetPasswordMutation.isSuccess
            ? "Verify Email"
            : "Enter Verification Code"}
        </h1>

        {!resetPasswordMutation.isSuccess ? (
          <form
            className="flex flex-col gap-4 pb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {otpStatus.message && (
              <div className="text-red-500 bg-red-50  text-center w-full text-xs font-medium border-[.1px] border-red-500 p-1 rounded">
                {otpStatus.message}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-gray-700 font-medium mb-2"
              >
                <LuMail className="mr-2" /> Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please enter email registered with your account",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setOtpStatus({ status: "", message: "" });
                    }}
                    id="email"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Enter your email"
                    prefix={<LuMail className="text-gray-400" />}
                    className="rounded-lg !text-xs"
                    size="large"
                  />
                )}
              />
              {errors.email && (
                <div className="mt-1 px-2 block text-red-500 text-xs">
                  {errors?.email?.message}
                </div>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              disabled={resetPasswordMutation.isPending}
              className="!h-12 !bg-[#030DFE] hover:!bg-[#0000dd] disabled:!opacity-40 disabled:!cursor-not-allowed disabled:!pointer-events-none !text-white !font-semibold !rounded-lg !flex !items-center !justify-center !gap-2 !mt-4"
              size="large"
            >
              {resetPasswordMutation.isPending ? (
                <div className="flex justify-center items-center gap-2">
                  <SlickSpinner size={14} color="white" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <span>Send Verification Code</span>
                  <LuSendHorizontal />
                </div>
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center pb-2">
            <p className="text-gray-600 mb-4 text-center">
              We&apos;ve sent a 6-digit verification code to your email.
              <br />
              Please enter it below.
            </p>

            {otpStatus.message && (
              <div className="text-red-500 text-xs text-center w-full mb-6 font-medium border-[.1px] border-red-500 p-1 rounded">
                {otpStatus.message}
              </div>
            )}

            <div className="mb-4 w-full">
              <Space
                size={[8, 8]}
                className="w-full justify-center flex flex-wrap"
                onPaste={handlePaste}
              >
                {otpValues.map((value, index) => (
                  <div key={index} className="relative">
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={(el) => (otpRefs.current[index] = el)}
                      value={value}
                      onChange={(e) => {
                        const val = e.target.value.slice(-1);
                        if (/^\d?$/.test(val)) {
                          handleOtpChange(val, index);
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`
                        w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl md:text-4xl border rounded-lg font-black
                        focus:border-4 focus:outline-none transition-all
                        ${
                          verificationMutation.isSuccess
                            ? "border-green-500 text-green-600"
                            : otpStatus.status === "error"
                            ? "border-red-500 text-red-600"
                            : "border-black focus:border-[#030DFE] text-gray-800"
                        }
                      `}
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                        appearance: "none",
                      }}
                    />
                  </div>
                ))}
              </Space>
            </div>

            {verificationMutation.isPending && (
              <div className="w-full flex flex-col items-center justify-center mb-4 text-blue-500">
                <SlickSpinner size={24} color="blue" />
                <span className="mt-2">Verifying your code...</span>
              </div>
            )}
            {verificationMutation.isError && (
              <div className="w-full flex flex-col items-center justify-center mb-4 text-red-500">
                <LuX strokeWidth={3.5} size={32} />
                <span className="font-medium text-center">
                  OTP Verification failed
                </span>
              </div>
            )}
            {verificationMutation.isSuccess && (
              <div className="w-full flex flex-col items-center justify-center mb-4 text-green-500">
                <LuCircleCheckBig strokeWidth={3} size={32} />
                <span className="font-medium">Success!</span>
                <p className="text-sm">
                  Redirecting you to reset your password...
                </p>
              </div>
            )}

            <div className="text-center mt-4">
              <p className="text-gray-500 text-xs mb-2">
                Didn&apos;t receive the code?
              </p>
              <Button
                type="link"
                onClick={handleResendOtp}
                disabled={resendCounter > 0 || resendOtpMutation.isPending}
                className={`
                  !px-4 !py-2 !h-auto !flex !items-center !justify-center !mx-auto !border-none !text-[#030DFE] disabled:!text-gray-400`}
              >
                {resendOtpMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <SlickSpinner size={14} color="blue" />
                    Sending...
                  </div>
                ) : resendCounter > 0 ? (
                  `Resend in ${resendCounter}s`
                ) : (
                  <div className="flex items-center gap-2">
                    <LuRotateCw />
                    Resend code
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
        <div className="w-full flex justify-end">
          <Contact />
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
