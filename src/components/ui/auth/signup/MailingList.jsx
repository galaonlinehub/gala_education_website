import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Button, Checkbox, Input, message, Select } from "antd";
import { apiPost } from "@/src/services/api_service";
import Animator from "@/src/components/home/animations/Animator";

const MailingList = () => {

  const [alert, setAlert] = useState({
    show: false,
    type: null,
    message: null,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
  } = useForm({});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      console.log("The form data", formData);

      const response = await apiPost("/support", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setAlert({
          show: true,
          type: "success",
          message: "Your data is successfully saved.",
        });
      }

        reset();
    } catch (e) {
      setAlert({
        show: true,
        type: "error",
        message: `Unexpected error occured, try again later, ${e?.message}`,
      });
    } finally {
      setTimeout(() => {
        setAlert({
          show: false,
          type: null,
          message: null,
        });
      }, 8000);
    }
  };

  const onError = (errors) => {
    if (errors?.personal_data_consent || errors?.informative_material_consent)
      setAlert({
        show: true,
        type: "error",
        message:
          errors.personal_data_consent?.message ||
          errors.informative_material_consent?.message,
      });
  };

  const hideAlert = () => {
    setAlert({ show: false, type: null, message: null });
  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-white px-6 py-4 md:w-[29rem] w-full mt-4  h-fit rounded-[15px]"
    >
      <Animator delay={0.2} direction="down">
        <h1 className="font-black sm:text-xs text-[12px] mb-2">
          Are you interested in a session and want to know more?
        </h1>
        <h2 className="sm:text-xs text-[10px]">
          Fill out the form and you will be contacted as soon as <br />
          possible by our office
        </h2>
        {alert.show && (
          <Alert
            className="!my-3 !text-[10px] !p-2 !flex !justify-center !items-center custom-alert"
            type={alert.type}
            closable
            showIcon
            description={alert.message}
            onClose={() => hideAlert()}
          />
        )}
        <div className="grid grid-cols-2 homepage-info-form gap-2 mt-3">
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="First Name"
              className={`focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]`}
              {...register("firstname", {
                required: "This field is mandatory.",
              })}
            />
            {errors.firstname && (
              <span className="text-red-500 text-[10px] px-2">
                {errors.firstname.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="Second Name"
              className={`focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]`}
              {...register("lastname", {
                required: "This field is mandatory.",
              })}
            />
            {errors.lastname && (
              <span className="text-red-500 text-[10px] px-2">
                {errors.lastname.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input
              type="email"
              {...register("email", {
                required: "This field is mandatory.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              autoComplete="off"
              autoCorrect="off"
              placeholder="Email"
              className={`focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]`}
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] px-2">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              {...register("phonenumber", {
                required: "This field is mandatory.",
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: "Invalid Phone number",
                },
              })}
              autoComplete="off"
              autoCorrect="off"
              placeholder="Phone Number"
              className={`focus:outline-none text-white text-[10px] h-[34px] bg-[#001840] placeholder:text-white/50 placeholder:text-xs py-1 px-2 rounded-[5px]`}
            />
            {errors.phonenumber && (
              <span className="text-red-500 text-[10px] px-2">
                {errors.phonenumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Controller
              name="level"
              control={control}
              rules={{
                required: "This field is mandatory.",
                validate: (value) =>
                  value !== "other" ||
                  "Please provide additional details for 'Other'",
              }}
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <Select
                  {...fieldProps}
                  placeholder="Level"
                  popupClassName="custom-select-dropdown"
                  className="custom-select !h-[34px] !focus:outline-none  !focus:border-none !rounded-[5px]"
                  options={[
                    { value: "student", label: "Student" },
                    { value: "teacher", label: "Teacher" },
                    { value: "donor", label: "Donor" },
                    { value: "other", label: "Other" },
                  ]}
                  onChange={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.level && (
              <span className="text-red-500 text-[10px] px-2">
                {errors.level.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <textarea
            placeholder="Any additional details about yout request"
            rows={3}
            className="!bg-[#001840] text-white p-2 w-full rounded-[5px] placeholder:italic placeholder:font-thin placeholder:text-xs focus:outline-none placeholder:text-white/50 text-xs"
            {...register("additional_details")}
          />
        </div>
        <div className="gap-x-2 flex justify-start items-center">
          <Controller
            name="personal_data_consent"
            control={control}
            rules={{
              required: "You must authorize personal data processing.",
            }}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  if (errors.personal_data_consent) {
                    clearErrors("personal_data_consent");
                    hideAlert();
                  }
                }}
              />
            )}
          />
          <span className="text-[10px]  py-3">
            I authorize the processing of personal data for purposes related to
            the performance of institutional activities * ( Information)
          </span>
        </div>

        <div className="gap-x-2 flex justify-start items-center">
          <Controller
            name="informative_material_consent"
            control={control}
            rules={{
              required: "You must authorize Informative material.",
            }}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  if (errors.informative_material_consent) {
                    clearErrors("informative_material_consent");
                    hideAlert();
                  }
                }}
              />
            )}
          />
          <span className="text-[10px] py-3">
            I authorize the processing of data for sending informative material
            (Information)
          </span>
        </div>

        <div className="py-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="!bg-[#800000] rounded-md !text-white text-xs sm:!px-5 !px-3 !py-2 disabled:opacity-70"
          >
            {isSubmitting ? "Requesting..." : "Send your request"}
          </button>
        </div>
      </Animator>
    </form>

  );
};

export default MailingList;
