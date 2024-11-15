import React  from "react";
import SignupPage from "@/app/(auth)/signup/page";
import StudentSignUpVectorSvg from "@/src/utils/vector-svg/sign-up/StudentSignUpVectorSvg";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { api } from "@/src/config/settings";
import LoadingState from "../../loading/LoadingSpinner";
import EmailVerification from "./EmailVerification";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const setOpenEmailVerificationModal = useEmailVerificationModalOpen((state) => state.setOpenEmailVerificationModal);
  const [loading , setLoading] = React.useState(false)
  const password = watch('password', '');

  const preventCopyPaste = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true)
    message.destroy() 
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    
    formData.append('role', 'student');
    formData.append('country', 'Tanzania');
    formData.append('subscription', 'yearly');

    try {
      const response = await api.post("/register", formData, {
      });
      message.success("Data Saved Successfully!");
      setOpenEmailVerificationModal(true)

    } catch (error) { 
      message.error("Oops!! Something Went Wrong, Try again Later.");
      console.error(error);
    }finally{
        setLoading(false)
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full w-screen py-12">
      <div className="flex flex-col items-center justify-center h-full w-screen lg:w-1/2 gap-4">
        <span className="font-bold text-[16px]">Sign Up</span>
        <span className={"text-center text-[12px] leading-5 font-semibold"}>
          Step into the realm of endless possibilities! Your adventure in
          knowledge begins here—unlock doors to boundless learning, forge your
          path, and let curiosity be your guide. Sign up and let the journey of
          brilliance unfold!
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-full px-5 md:px-10 gap-3">
          <div className="flex flex-col gap-1 items-start justify-center w-full">
            <label for="first-name" className="font-bold text-[13px]">
              First Name *
            </label>
            <input
              type="text"
              id="first-name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your First Name"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px] ${errors.firstName ? "border-red-500 focus:border-red-500" : ""}`}
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 items-start justify-center w-full">
            <label for="last-name" className="font-bold text-[13px]">
              Last Name *
            </label>
            <input
              type="text"
              id="last-name"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your Last Name"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px] ${errors.lastName ? "border-red-500 focus:border-red-500" : ""}`}
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 justify-center items-start w-full">
            <label for="email" className="font-bold text-[13px]">
              Email *
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Enter Your Email"
              className={`border-[1px] focus:border-[2.5px] w-full rounded-md border-[#030DFE] focus:outline-none  h-input-height pl-3 placeholder:font-semibold placeholder:text-[14px] ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
              {...register("email", {
                required: "Email is required",
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
          </div>
          <div className="flex flex-col gap-1 justify-center items-start w-full">
            <label for="password" className="font-bold text-[13px]">
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
              className={`border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
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
            <label for="confirm_password" className="font-bold text-[13px]">
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
              className={`border-[1px] focus:border-[2.5px] focus:outline-none w-full rounded-md border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3 ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}`}
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

          <button
            type="submit"
            disabled={loading}
            className="w-[117.46px] rounded-md h-[35px] bg-[#030DFE] self-center text-[14px] font-semibold !text-[#FFFFFF] mt-4 disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? <LoadingState/> : 'Sign Up'}
          </button>
        </form>

        <span className="text-center text-[12px]">
          Creating an account means you’re okay with our{" "}
          <span className="text-[#030DFE] font-bold"> Terms of Service</span> &
          <span className="text-[#030DFE] font-bold"> Privacy Policy</span>.
        </span>
      </div>

      <StudentSignUpVectorSvg />
      <EmailVerification/>

    </section>
  );
};

export default SignUpForm;
