import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/src/services/api_service";
import Animator from "@/src/components/home/animations/Animator";
import clsx from "clsx";

const MailingList = () => {
  const [alert, setAlert] = useState({
    show: false,
    type: null,
    message: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const mailingMutation = useMutation({
    mutationFn: (data) => apiPost("/support", data),
    onSuccess: (data) => {
      setAlert({
        show: true,
        type: "success",
        message: data?.message ?? "Your data is successfully saved.",
      });
      reset();
    },
    onError: (error) => {
      setAlert({
        show: true,
        type: "error",
        message: error?.response?.data?.message ?? "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = (data) => {
    if (data.phone_number && !data.phone_number.startsWith("255")) {
      data.phone_number = `255${data.phone_number.replace(/^0+/, "")}`;
    }

    setAlert({
      show: true,
      type: "loading",
      message: "Submitting...",
    });

    mailingMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-6 py-4 md:w-[29rem] w-full mt-4 h-fit rounded-[15px]"
    >
      <Animator delay={0.2} direction="down">
        <h1 className="font-black sm:text-xs text-[12px] mb-2">
          Are you interested in a session and want to know more?
        </h1>
        <h2 className="sm:text-xs text-[10px]">
          Fill out the form and you will be contacted as soon as possible by our office
        </h2>

        {alert.show && (
          <div
            className={clsx(
              "p-1 text-[10px] text-center border-[.8px] rounded-[5px] my-2",
              alert.type === "success" && "border-green-500 text-green-600",
              alert.type === "error" && "border-red-500 text-red-600",
              alert.type === "loading" && "border-gray-500 text-gray-500"
            )}
          >
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-2 homepage-info-form gap-2 mt-3">
          {/* First Name */}
          <div className="flex flex-col gap-1 w-full">
            <input
              {...register("first_name", { required: "First name is required" })}
              type="text"
              autoComplete="off"
              placeholder="First Name"
              className="focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]"
            />
            {errors.first_name && <span className="text-red-500 text-[10px] px-2">{errors.first_name.message}</span>}
          </div>

          {/* Second Name */}
          <div className="flex flex-col gap-1 w-full">
            <input
              {...register("second_name", { required: "Second name is required" })}
              type="text"
              autoComplete="off"
              placeholder="Second Name"
              className="focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]"
            />
            {errors.second_name && <span className="text-red-500 text-[10px] px-2">{errors.second_name.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              autoComplete="off"
              placeholder="Email"
              className="focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]"
            />
            {errors.email && <span className="text-red-500 text-[10px] px-2">{errors.email.message}</span>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 w-full">
            <input
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{9,12}$/,
                  message: "Invalid phone number",
                },
              })}
              type="text"
              autoComplete="off"
              placeholder="Phone Number (0752 451 811)"
              className="focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]"
            />
            {errors.phone_number && <span className="text-red-500 text-[10px] px-2">{errors.phone_number.message}</span>}
          </div>

          {/* Level */}
          <div className="flex flex-col gap-1 w-full col-span-2">
            <select
              {...register("level", { required: "Level is required" })}
              className="focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]"
              defaultValue=""
            >
              <option value="" disabled>Select Level</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="donor">Donor</option>
              <option value="other">Other</option>
            </select>
            {errors.level && <span className="text-red-500 text-[10px] px-2">{errors.level.message}</span>}
          </div>
        </div>

        {/* More Details */}
        <div className="mt-4">
          <textarea
            {...register("more_details")}
            placeholder="Any additional details about your request"
            rows={3}
            className="!bg-[#001840] text-white p-2 w-full rounded-[5px] placeholder:italic placeholder:font-thin placeholder:text-xs focus:outline-none placeholder:text-white/50 text-xs"
          />
        </div>

        {/* Personal Data Consent */}
        <div className="flex items-start gap-2 mt-3">
          <input
            type="checkbox"
            {...register("personal_data_consent", { required: "You must authorize personal data processing" })}
          />
          <span className="text-[10px]">
            I authorize the processing of personal data for purposes related to the performance of institutional activities * (Information)
          </span>
        </div>
        {errors.personal_data_consent && <span className="text-red-500 text-[10px]">{errors.personal_data_consent.message}</span>}

        {/* Informative Material Consent */}
        <div className="flex items-start gap-2 mt-1">
          <input
            type="checkbox"
            {...register("informative_material_consent", { required: "You must authorize informative material processing" })}
          />
          <span className="text-[10px]">
            I authorize the processing of data for sending informative material (Information)
          </span>
        </div>
        {errors.informative_material_consent && <span className="text-red-500 text-[10px]">{errors.informative_material_consent.message}</span>}

        {/* Submit Button */}
        <div className="py-4">
          <button
            disabled={isSubmitting || mailingMutation.isPending}
            type="submit"
            className="!bg-[#800000] rounded-md !text-white text-xs sm:!px-5 !px-3 !py-2 disabled:opacity-70"
          >
            {isSubmitting || mailingMutation.isPending ? "Requesting..." : "Send your request"}
          </button>
        </div>
      </Animator>
    </form>
  );
};

export default MailingList;
