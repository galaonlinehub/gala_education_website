
import { useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import  { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

import { roleRedirects } from "@/utils/data/redirect";
import { login } from "@/utils/fns/auth";
import { getUser } from "@/utils/fns/global";


export const useLogin = () => {

  // const key = crypto.randomUUID();
  // alert(key);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [loginModal, setLoginModal] = useState({ open: false, message: "" });

  const [localFeedback, setLocalFeedback] = useState({
    show: false,
    status: "",
    message: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const watchedFields = useWatch({ name: ["email", "password"], control });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      if (res === 1) {
        const userData = await queryClient.fetchQuery({
          queryKey: ["auth-user"],
          queryFn: getUser,
          staleTime: Infinity,
        });

        if (userData?.role) {
          setLocalFeedback((prev) => ({
            ...prev,
            show: true,
            status: "success",
            message: "Signed in successfully, Redirecting you now…",
          }));

          const redirectPath = roleRedirects[userData.role] || "/";

          router.push(redirectPath);
        }
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unexpected error occurred, Try again later";
      if (error?.status === 403 && message.includes("vetting")) {
        setLoginModal((p) => ({ ...p, open: true, message: message }));
      }

      setLocalFeedback((prev) => ({
        ...prev,
        show: true,
        status: "error",
        message,
      }));
    },
    onSettled: () => {},
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  const debouncedResetRef = useRef(
    debounce(() => {
      setLocalFeedback((prev) => {
        if (prev.show) {
          loginMutation.reset();
          return { show: false, message: "", status: "" };
        }
        return prev;
      });
    }, 700)
  );

  const prevFieldsRef = useRef(watchedFields);

  useEffect(() => {
    const debouncedReset = debouncedResetRef.current;
    const fieldsChanged = watchedFields.some(
      (field, index) => field !== prevFieldsRef.current[index]
    );

    if (
      localFeedback.show &&
      fieldsChanged &&
      watchedFields.some((field) => field)
    ) {
      debouncedReset();
    }
    prevFieldsRef.current = watchedFields;

    return () => debouncedReset.cancel();
  }, [watchedFields, localFeedback.show]);


    return{
        localFeedback,
        loginMutation,
        onSubmit,
        register,
        handleSubmit,
        togglePasswordVisibility,
        showPassword,
        loginModal,
        errors,
        setLoginModal

    }
}