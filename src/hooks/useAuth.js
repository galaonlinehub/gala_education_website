//Student sign up

import { CheckCircleFilled } from "@ant-design/icons";
import { apiPost } from "@/src/services/api_service";
import { encrypt } from "@/src/utils/fns/encryption";
import { useState } from "react";
import { App } from "antd";
import { useMutation } from "@tanstack/react-query";




export const useAuth = (password) => {
  const [emailExists, setEmailExists] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { message } = App.useApp();


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

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    formData.append("role", "student");
    formData.append("country", "Tanzania");

    try {
      const response = await mutation.mutateAsync(formData);

      if (response.status === 201) {
        message.success({
          content: "Account created successfully!",
          icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
        });
        sessionStorage.setItem(
          "e67e4931-4518-4369-b011-fa078beefac1",
          encrypt(values.email)
        );
        setOpenEmailVerificationModal(true);
      }
    } catch (error) {
      if (error.response?.data?.email?.[0]) {
        setEmailExists(error.response.data.email[0]);
      } else {
        message.error("Something went wrong. Please try again later.");
      }
    }
  };
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await apiPost("/register", formData);
      return response;
    },
  });

  return {
    calculatePasswordStrength,
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onSubmit,
    emailExists,
    passwordStrength,
    passwordFocused,
    setPasswordStrength,
    setPasswordFocused,
    setEmailExists,
    loading: mutation.isPending,

  };
};
