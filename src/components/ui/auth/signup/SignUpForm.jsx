import React from "react";
import SignupPage from "@/app/(auth)/signup/page";
import StudentSignUpVectorSvg from "@/src/utils/vector-svg/sign-up/StudentSignUpVectorSvg";
import { message, Select } from "antd";
import { useForm } from "react-hook-form";
import { api } from "@/src/config/settings";
import LoadingState from "../../loading/template/LoadingSpinner";
import EmailVerification from "./EmailVerification";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";
import { encrypt } from "@/src/utils/fns/encryption";
import { disabilities } from "@/src/utils/data/disabilities";
import "../../../../styles/auth/signup.css";
import { apiPost } from "@/src/services/api_service";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const setOpenEmailVerificationModal = useEmailVerificationModalOpen(
    (state) => state.setOpenEmailVerificationModal
  );
  const [loading, setLoading] = React.useState(false);
  const [emailExists, setEmailExists] = React.useState(false);

  const password = watch("password", "");

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    message.destroy();
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append("role", "student");
    formData.append("country", "Tanzania");

    try {
      const response = await apiPost("/register", formData);
      if (response.status === 201) {
        message.success("Data Saved Successfully!");
        sessionStorage.setItem(
          "e67e4931-4518-4369-b011-fa078beefac1",
          encrypt(data.email)
        );
        setOpenEmailVerificationModal(true);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.email[0];
        if (errorMessage && errorMessage.toLowerCase().includes("email")) {
          setEmailExists(errorMessage);
        } else {
          message.error("Oops!! Something Went Wrong, Try again Later.");
        }
      } else {
        message.error("Oops!! Something Went Wrong, Try again Later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full w-screen overflow-hidden mt-8">
      <div className="flex flex-col items-center justify-center h-full w-screen  lg:w-1/2 gap-4">
        <span className="font-black text-[16px]">Sign Up</span>
        <span className={"text-center text-[12px] leading-5 font-semibold"}>
          Step into the realm of endless possibilities! Your adventure in
          knowledge begins here—unlock doors to boundless learning, forge your
          path, and let curiosity be your guide. Sign up and let the journey of
          brilliance unfold!
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-full px-5 md:px-10 gap-3"
        >
          <div className="flex flex-col gap-1 items-start justify-center w-full">
            <label htmlFor="first-name" className="font-bold text-[13px]">
              First Name *
            </label>
            <input
              type="text"
              id="first-name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your First Name"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px] ${
                errors.first_name ? "border-red-500 focus:border-red-500" : ""
              }`}
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start justify-center w-full">
            <label htmlFor="last-name" className="font-bold text-[13px]">
              Last Name *
            </label>
            <input
              type="text"
              id="last-name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your Last Name"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px] ${
                errors.last_name ? "border-red-500 focus:border-red-500" : ""
              }`}
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs">
                {errors.last_name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center items-start w-full">
            <label htmlFor="email" className="font-bold text-[13px]">
              Email *
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your Email"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none  h-input-height pl-3 placeholder:font-semibold placeholder:text-[14px] ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                onChange: () => setEmailExists(false),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
            {emailExists && !errors.email && (
              <span className="text-red-500 text-xs">{emailExists}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 justify-center items-start w-full">
            <label htmlFor="password" className="font-bold text-[13px]">
              Password *
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your Password"
              onCopy={preventCopyPaste}
              onPaste={preventCopyPaste}
              onCut={preventCopyPaste}
              className={`border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3 ${
                errors.password ? "border-red-500 focus:border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center items-start w-full">
            <label htmlFor="confirm_password" className="font-bold text-[13px]">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirm_password"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Confirm your Password"
              onCopy={preventCopyPaste}
              onPaste={preventCopyPaste}
              onCut={preventCopyPaste}
              className={`border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between w-3/3 self-start gap-4">
            <Select
              placeholder="Special Needs"
              placement="bottomRight"
              options={disabilities}
              className="special-disabilities-select !w-[15rem] !h-[35px] !border-[#030DFE] !rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-md h-[35px] bg-[#030DFE] text-[14px] font-semibold !text-[#FFFFFF] disabled:opacity-60 flex items-center justify-center p-2 w-1/2"
            >
              {loading ? <LoadingState /> : "Sign Up"}
            </button>
          </div>
        </form>

        <span className="text-center text-[12px] space-x-2">
          <span> Creating an account means you&apos;re okay with our</span>
          <span className="text-[#030DFE] font-bold">Terms of Service</span>
          <span>&</span>
          <span className="text-[#030DFE] font-bold">Privacy Policy</span>.
        </span>
      </div>

      <StudentSignUpVectorSvg />
      <EmailVerification />
    </section>
  );
};

export default SignUpForm;
