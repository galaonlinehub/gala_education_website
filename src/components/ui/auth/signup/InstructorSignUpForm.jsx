import React, { useState } from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { api } from "@/src/config/settings";
import LoadingState from "../../loading/LoadingSpinner";
import EmailVerification from "./EmailVerification";
import { useEmailVerificationModalOpen } from "@/src/store/auth/signup";


const InstructorSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setOpenEmailVerificationModal = useEmailVerificationModalOpen((state) => state.setOpenEmailVerificationModal);


  const [files, setFiles] = useState({
    cv: null,
    oLevelCertificate: null,
    aLevelCertificate: null,
    transcript: null,
  });

  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fieldName]: file,
      }));
      message.success(
        `File "${file.name}" for ${fieldName.replace(
          /([A-Z])/g,
          " $1"
        )} uploaded successfully!`
      );
    }
  };

  const dropKeys = (obj, keysToDrop) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keysToDrop.includes(key))
    );
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const keysToRemove = [
      "o_level_certificate",
      "a_level_certificate",
      "cv",
      "transcript",
    ];
    const cleanedData = dropKeys(data, keysToRemove);

    Object.keys(cleanedData).forEach((key) => {
      formData.append(key, cleanedData[key]);
    });

    formData.append('role', 'instructor');
    formData.append('country', 'Tanzania');
    formData.append('subscription', 'yearly');

    if (files.cv) formData.append("curriculum_vitae", files.cv);
    if (files.transcript) formData.append("transcript", files.transcript);
    if (files.aLevelCertificate)
      formData.append("a_level_certificate", files.aLevelCertificate);
    if (files.oLevelCertificate)
      formData.append("o_level_certificate", files.oLevelCertificate);

    try {
      const response = await api.post("/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success("Data Saved Successfully!");

    } catch (error) {
      message.error("Oops!! Something Went Wrong, Try again.");
      console.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center w-full pb-24 mt-6">
      <div className="flex flex-col gap-6 w-full lg:mx-24 z-10">
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <span className="font-black text-[16px]">Sign Up</span>
          <span className="font-medium text-[12px] w-full text-center">
            When registering with Gala, teachers undergo a vetting process to
            ensure only qualified candidates are selected, maintaining service
            quality. The first payment, which is non-refundable, serves as an
            application fee. Applications are processed within 2-3 business days
            and may be approved or denied.
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full"
        >
          <div className="flex flex-col gap-4 w-full lg:w-6/12">
            <div className="flex flex-col gap-1 items-start justify-center">
              <label for="first-name" className="font-black text-[16px]">
                First Name *
              </label>
              <input
                type="text"
                id="first-name"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Enter Your First Name"
                className={`border-[2.5px] w-full rounded-[2.5px] border-[#030DFE] focus:border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px]`}
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <label for="last-name" className="font-black text-[16px]">
                Last Name *
              </label>
              <input
                type="text"
                id="last-name"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Enter Your Last Name"
                className="border-[2.5px] w-full rounded-[2.5px] border-[#030DFE] focus:outline-none h-input-height placeholder:font-semibold pl-3 placeholder:text-[14px]"
                {...register("lastname", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 justify-center items-start">
              <label for="email" className="font-black text-[16px]">
                Email *
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Enter Your Email"
                className="border-[2.5px] w-full rounded-[2.5px] border-[#030DFE] focus:outline-none  h-input-height pl-3 placeholder:font-semibold placeholder:text-[14px]"
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

            <div className="flex flex-col gap-1 justify-center items-start">
              <label for="password" className="font-black text-[16px]">
                Password *
              </label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                placeholder="Enter Your Password"
                className="border-[2.5px] focus:outline-none w-full rounded-[2.5px] border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3"
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

            <div className="flex flex-col gap-1 justify-center items-start">
              <label for="nida-number" className="font-black text-[16px]">
                National ID Number (NIDA) *
              </label>
              <input
                type="text"
                placeholder="Enter Your NIDA Number"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                id="nida-number"
                className="border-[2.5px] w-full focus:outline-none rounded-[2.5px] border-[#030DFE] h-input-height placeholder:font-semibold placeholder:text-[14px] pl-3"
                {...register("nida", {
                  required: "NIDA number is required",
                })}
              />
              {errors.nidaNumber && (
                <span className="text-red-500 text-xs">
                  {errors.nidaNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col mx-auto items-center justify-center gap-4 w-full lg:w-4/12">
            <div className="flex flex-col gap-1 justify-center items-start w-full">
              <span className="font-black text-[16px]">
                Upload Curriculum vitae (CV)
              </span>
              <label className="cursor-pointer w-full">
                <div className="h-input-height w-full bg-[#001840] rounded-[2.5px] text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
                  {files.cv ? files.cv.name : `Upload CV`}
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("cv", {
                    required: "Curriculum vitae(CV) must be provided",
                    onChange: (e) => handleFileChange(e, "cv"),
                  })}
                />
              </label>
              {errors.cv && (
                <span className="text-red-500 text-xs">
                  {errors.cv.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 justify-center items-start w-full">
              <span className="font-black text-[16px]">Upload Transcript</span>
              <label className="cursor-pointer w-full">
                <div className="h-input-height w-full bg-[#001840] rounded-[2.5px] text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
                  {files.transcript
                    ? files.transcript.name
                    : `Upload Transcript`}
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("transcript", {
                    required: "Transcript must be provided",
                    onChange: (e) => handleFileChange(e, "transcript"),
                  })}
                />
              </label>
              {errors.transcript && (
                <span className="text-red-500 text-xs">
                  {errors.transcript.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 justify-center items-start w-full">
              <span className="font-black text-[16px]">
                Upload A-Level Certificate
              </span>
              <label className="cursor-pointer w-full">
                <div className="h-input-height w-full bg-[#001840] rounded-[2.5px] text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
                  {files.aLevelCertificate
                    ? files.aLevelCertificate.name
                    : "Upload A-Level Certificate"}
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("a_level_certificate", {
                    onChange: (e) => handleFileChange(e, "aLevelCertificate"),
                  })}
                />
              </label>
              {errors.a_level_certificate && (
                <span className="text-red-500 text-xs">
                  {errors.a_level_certificate.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 justify-center items-start w-full">
              <span className="font-black text-[16px]">
                Upload O-Level Certificate
              </span>
              <label className="cursor-pointer w-full">
                <div className="h-input-height w-full bg-[#001840] rounded-[2.5px] text-[14px] font-semibold text-[#D9D9D9] flex items-center justify-center">
                  {files.oLevelCertificate
                    ? files.aLevelCertificate.name
                    : "Upload O-Level Certificate"}
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("o_level_certificate", {
                    required: "O-Level Certificate must be provided",
                    onChange: (e) => handleFileChange(e, "oLevelCertificate"),
                  })}
                />
              </label>
              {errors.o_level_certificate && (
                <span className="text-red-500 text-xs">
                  {errors.o_level_certificate.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center w-[220px] lg:w-2/12">
            <button
              onClick={()=>setOpenEmailVerificationModal(true)}
              type="submit"
              className="h-[50.27px] w-full bg-[#030DFE] text-white font-black rounded-[2.5px] flex items-center justify-center">
             {true ? 'Apply' : <LoadingState/>}
            </button>
          </div>
        </form>
      </div>
      <EmailVerification/>
    </main>
  );
};

export default InstructorSignUpForm;
