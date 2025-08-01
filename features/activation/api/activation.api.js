import { apiPost } from "@/services/api/api_service";

export const verifyEmailTokenLink = async (email, token) => {
  const { data } = await apiPost("/verify-activation", { email, token });
  return data;
};

export const activateToken = async (email, token, password) => {
  const { data } = await apiPost("/activate-account", {
    email,
    token,
    password,
  });
  return data;
};

export const resendActivationLink = async (email) => {
  const { data } = await apiPost("/resend-activation", { email });
  return data;
};
