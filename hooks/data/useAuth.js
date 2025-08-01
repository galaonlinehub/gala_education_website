
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";
import { LuCircleCheckBig } from "react-icons/lu";

import { apiGet, apiPost } from "@/services/api/api_service";
import { encrypt } from "@/utils/fns/encryption";

import { EMAIL_VERIFICATION_KEY } from "../../config/settings";
import { globalOptions } from "../../config/tanstack";
import {
  useAccountType,
  useEmailVerificationModalOpen,
} from "../../store/auth/signup";
import { sessionStorageFn } from "../../utils/fns/client";

export const useAuth = () => {
  const [emailExists, setEmailExists] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [fileList, setFileList] = useState({
    cv: [],
    transcript: [],
    oLevelCertificate: [],
    aLevelCertificate: [],
  });

  const { setOpenEmailVerificationModal } = useEmailVerificationModalOpen();
  const { accountType } = useAccountType();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (password?.match(/[A-Z]/)) strength += 25;
    if (password?.match(/[0-9]/)) strength += 25;
    if (password?.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const getPasswordStatus = () => {
    if (passwordStrength >= 100) return { color: "#52c41a", text: "Strong" };
    if (passwordStrength >= 50) return { color: "#faad14", text: "Medium" };
    return { color: "#f5222d", text: "Weak" };
  };

  const getPasswordRequirements = (password) => {
    return [
      { text: "At least 8 characters", met: password?.length >= 8 },
      { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
      { text: "Contains number", met: /[0-9]/.test(password) },
      {
        text: "Contains special character",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];
  };

  const handlePasswordChange = (e) => {
    const strength = calculatePasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  const mutation = useMutation({
    mutationFn: ({ formData, headers }) =>
      apiPost("/register", formData, headers),
    retry: false,
    onSuccess: (data, variables, context) => {
      message.success({
        content: "Account created successfully!",
        icon: <LuCircleCheckBig size={20} className="text-[#52c41a] !mx-1" />,
      });

      sessionStorageFn.set(
        EMAIL_VERIFICATION_KEY,
        encrypt(variables.formData.get("email"))
      );
      setOpenEmailVerificationModal(true);
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
    const isInstructor = values.role === "instructor";
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

    if (isInstructor) {
      Object.entries(fileMapping).forEach(([key, formKey]) => {
        if (fileList[key]?.[0]) {
          formData.append(formKey, fileList[key][0].originFileObj);
        }
      });
    }

    formData.append("country", "Tanzania");
    console.time("signup");
    mutation.mutate({
      formData,
      headers: {
        "Content-Type": isInstructor
          ? "multipart/form-data"
          : "application/json",
      },
    });
    console.timeEnd("signup");
  };

  const {
    data: plans,
    isFetching: isFetchingPlans,
    error: errorOnFetchingPlans,
  } = useQuery({
    queryKey: ["payment-plan", accountType],
    queryFn: async () => {
      const response = await apiGet(`payment-plans?type=${accountType}`);
      return response.data;
    },
    enabled: !!accountType,
    retry: 1,
    ...globalOptions,
  });

  const savingsPercentage = (plans) => {
    const monthlyCost = plans[0]?.amount * 12;
    const annualCost = plans[1]?.amount;
    const savingsPercentage = Math.round(
      ((monthlyCost - annualCost) / monthlyCost) * 100
    );

    return savingsPercentage;
  };

  return {
    calculatePasswordStrength,
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onFinish,
    emailExists,
    passwordStrength,
    passwordFocused,
    setPasswordStrength,
    setPasswordFocused,
    setEmailExists,
    mutation,
    setFileList,
    fileList,
    plans,
    isFetchingPlans,
    errorOnFetchingPlans,
    savingsPercentage,
    registerError,
    setRegisterError,
  };
};
