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
      return response.data;
    },
    enabled: !!user,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (data) => {},
  });

  const updateInstructorProfile = useMutation({
    mutationFn: async (data) => {
      const response = await apiPut(`/complete-instructor-profile`, data, {
        "Content-Type": "multipart/form-data",
      });
      return response.data;
    },
    enabled: !!user,
    onSuccess: (data) => {
      const keysToInvalidate = [
        ["instructor"],
        ["auth-user"],
        ["instructor-subjects"],
        ["instructor-profile"],
        ["instructor_cohorts"],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (data) => {},
  });

  const verifyOtp = useMutation({
    mutationFn: async (data) => {
      const response = await apiPost("/verify-otp", data);
      return response.data;
    },
    onSuccess: () => {},
  });

  const resendOtp = useMutation({
    mutationFn: async (phone_number) => {
      const response = await apiPost("/resend-otp", { phone_number });
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
    updateInstructorProfile: updateInstructorProfile.mutate,
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
