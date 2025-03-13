import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../utils/fns/global";
import { cookieFn } from "../utils/fns/client";
import { USER_COOKIE_KEY } from "../config/settings";
import { globalOptions } from "../config/tanstack";
import { useRouter, usePathname } from "next/navigation";
import { roleRedirects } from "../utils/data/redirect";
import { apiPost, apiPut } from "../services/api_service";

export const useUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    enabled: !!cookieFn.get(USER_COOKIE_KEY),
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1,
    ...globalOptions,
    onSuccess: (user) => {
      if (user?.role && pathname === "/signin") {
        router.push(roleRedirects[user.role] || "/signin");
      }
    },
    onError: (error) => {
      console.error("User fetch error:", error);
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data) => {
      const response = await apiPut(`/update-user/${user.id}`, data, {
        "Content-Type": "multipart/form-data",
      });
      console.log("response", response);
      return response.data;
    },
    enabled: !!user,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (data) => {},
  });

  const verifyOtp = useMutation({
    mutationFn: async ({ otp, phone_number }) => {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("phone_number", phone_number);

      const response = await apiPost("/verify-otp", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  const resendOtp = useMutation({
    mutationFn: async (phone_number) => {
      const response = await api.post("/resend-otp", { phone_number });
      return response.data;
    },
  });

  return {
    // User data and loading states
    user,
    userLoading: isLoading,
    userError: error,
    userFetching: isFetching,
    userPending: isPending,
    refetchUser: refetch,

    // Profile update functionality
    updateProfile: updateProfile.mutate,
    isUpdatingProfile: updateProfile.isPending,
    updateProfileError: updateProfile.error,
    updateProfileSuccess: updateProfile.isSuccess,

    // OTP verification functionality
    verifyOtp: verifyOtp.mutate,
    isVerifyingOtp: verifyOtp.isPending,
    verifyOtpError: verifyOtp.error,
    verifyOtpSuccess: verifyOtp.isSuccess,

    // OTP resend functionality
    resendOtp: resendOtp.mutate,
    isResendingOtp: resendOtp.isPending,
    resendOtpError: resendOtp.error,
    resendOtpSuccess: resendOtp.isSuccess,
  };
};
