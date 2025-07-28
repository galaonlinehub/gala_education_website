import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { LuCircleCheckBig, LuX } from "react-icons/lu";

import { apiPost } from "@/src/services/api/api_service";
import { footer_links } from "@/src/utils/data/links";
import FooterVectors from "@/src/utils/vector-svg/FooterVectors";

import SlickSpinner from "../ui/loading/template/SlickSpinner";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [status, setStatus] = React.useState({ type: "", message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailSubscriptionMutation = useMutation({
    mutationFn: (data) => apiPost("/subscribe-mail-list", data),
    onSuccess: (res) => {
      if (res.status === 201 || 200) {
        setStatus((p) => ({
          ...p,
          type: "success",
          message:
            res?.data?.message ??
            "Email added successfully, You will be notified for all updates from Gala Education",
        }));
      }
    },
    onError: (err) => {
      const error = err?.response;
      setStatus((p) => ({
        ...p,
        type: "error",
        message:
          error?.data?.email?.[0] ??
          error?.data?.message ??
          "Unexpected error occurred, Try again later",
      }));
    },
    onSettled: () => {},
  });

  const onSubmit = (data) => {
    emailSubscriptionMutation.mutate(data);
  };

  return (
    <div className="bg-[#0d0d0d] min-h-screen/2 py-24 px-6 relative bottom-0">
      <div className="max-w-screen-2xl mx-auto h-full justify-start flex lg:items-center flex-col lg:flex-row lg:px-16 lg:justify-between w-full">
        <div className="text-white lg:w-[30rem] md:w-[40rem] items-center justify-center flex-col">
          <h1 className="font-black text-sm mb-2">Join the Mailing List</h1>
          <div className="text-xs">
            <h2>
              Be the first to experience content, receive real-time updates and
            </h2>
            <h2>
              participate in live events. Sign up now to join the mailing list.
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-4 flex flex-col gap-2 w-full"
          >
            {status.message && (
              <div
                className={clsx(
                  "text-xs border-[0.1px] p-2 w-full rounded-md mb-2 text-center",
                  status.type === "success" &&
                    " border-green-600 text-green-600",
                  status.type === "error" && "border-red-500 text-red-500"
                )}
              >
                {status.message}
              </div>
            )}
            <div className="flex w-full gap-4">
              <div className="flex flex-col w-[75%]">
                <input
                  placeholder="Email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="new-password"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                    onChange: () => {
                      setStatus({ type: "", message: "" });
                      emailSubscriptionMutation.reset();
                    },
                  })}
                  className={clsx(
                    "border-[1px] rounded-md w-full text-xs p-2 bg-transparent  outline-none focus:border-2 hover:scale-105 transform delay-200 ease-in-out",
                    emailSubscriptionMutation.isSuccess
                      ? "border-green-700 text-green-700"
                      : emailSubscriptionMutation.isError
                      ? "border-red-700 text-red-700"
                      : "border-white text-white"
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-[10px] p-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <button
                disabled={
                  emailSubscriptionMutation.isPending ||
                  emailSubscriptionMutation.isSuccess
                }
                type="submit"
                className={clsx(
                  "flex items-center justify-center p-2 text-center border-[1px] rounded-md text-[10px] md:text-xs w-[25%] h-9 overflow-hidden disabled:cursor-not-allowed",
                  emailSubscriptionMutation.isSuccess
                    ? "bg-green-700 border-green-700 hover:bg-green-700 cursor-not-allowed"
                    : emailSubscriptionMutation.isError
                    ? "bg-red-700 border-red-700 hover:bg-red-700 cursor-not-allowed"
                    : "bg-gray-500 hover:bg-gray-600 border-white"
                )}
              >
                {emailSubscriptionMutation.isPending ? (
                  <SlickSpinner size={14} color="white" />
                ) : emailSubscriptionMutation.isSuccess ? (
                  <div className="flex gap-1 items-center font-bold">
                    <LuCircleCheckBig strokeWidth={3} size={14} />
                    JOINED
                  </div>
                ) : emailSubscriptionMutation.isError ? (
                  <div className="flex gap-1 items-center">
                    <LuX strokeWidth={2.5} size={14} />
                    TRY AGAIN
                  </div>
                ) : (
                  "JOIN NOW"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col pt-10 pb-6 gap-y-12">
          <div className="flex flex-wrap !justify-between gap-x-12">
            {Object.entries(footer_links).map(([item, links], itemKey) => (
              <div key={itemKey}>
                <h1 className="font-bold text-[#8C8B8D] py-2">{item}</h1>
                <ul>
                  {links.map((item, i) => (
                    <li key={i} className="text-white text-xs">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div />
          </div>
          <div>
            <p className="text-white text-xs">
              © {currentYear} Gala Education. All rights reserved. All content,
              trademarks, and intellectual <br /> property on this website are
              protected by law. Unauthorized use or reproduction of <br /> any
              materials without prior written consent is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
      <FooterVectors />
    </div>
  );
}

export default Footer;
