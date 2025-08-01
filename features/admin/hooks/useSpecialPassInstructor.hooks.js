"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuCircleCheckBig } from "react-icons/lu";

import { apiPost } from "@/services/api/api_service";

export const useSpecialPassInstructor = () => {
  const [emailExists, setEmailExists] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [fileList, setFileList] = useState({
    cv: [],
    transcript: [],
    oLevelCertificate: [],
    aLevelCertificate: [],
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ formData, headers }) =>
      apiPost("/register-special-pass-instructor", formData, headers),
    retry: false,
    onSuccess: (data, variables, context) => {
      message.success({
        content: "Account created successfully!",
        icon: <LuCircleCheckBig size={20} className="text-[#52c41a] !mx-1" />,
      });
      router.push("/admin/instructors/");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.email?.[0] ??
        error?.response?.data?.message ??
        "Something went wrong. Please try again later.";

      if (error?.response?.data?.email) {
        setEmailExists(`${errorMessage}😔`);
        setRegisterError(errorMessage);
      } else {
        setRegisterError(errorMessage);
        message.error(errorMessage);
      }
    },
  });

  const onFinish = (values) => {
    const formData = new FormData();

    const fileMapping = {
      cv: "curriculum_vitae",
      transcript: "transcript",
      oLevelCertificate: "o_level_certificate",
      aLevelCertificate: "a_level_certificate",
    };

    Object.entries(values).forEach(([key, value]) => {
      if (!Object.keys(fileMapping).includes(key)) {
        formData.append(key, value);
      }
    });

    Object.entries(fileMapping).forEach(([key, formKey]) => {
      if (fileList[key]?.[0]) {
        formData.append(formKey, fileList[key][0].originFileObj);
      }
    });

    formData.append("country", "Tanzania");
    console.time("signup");
    mutation.mutate({
      formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.timeEnd("signup");
  };

  return {
    onFinish,
    emailExists,
    setEmailExists,
    mutation,
    fileList,
    setFileList,
    registerError,
    setRegisterError,
  };
};
