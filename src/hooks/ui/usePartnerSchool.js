import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/src/services/api/api_service";
import { useSchoolPartnerStore } from "@/src/store/student/schoolPartnerStore";

export const usePartnerSchool = () => {
  const [isAffiliated, setIsAffiliated] = useState(false);
  const { open, isOpen, close, toggleOpen } = useSchoolPartnerStore();
  const [errMessage, setErrMessage] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data, data.code);
      return await apiPost(`/join-partner-school/${data?.code}`);
    },
    onSuccess: (response) => {
      const message =
        response?.data?.message || "Successfully matched up with school";
      setErrMessage(message);
      reset();
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";
      setErrMessage(message);
    },
  });

  const resetMutation = useCallback(
    debounce(() => {
      mutation.reset();
      console.log("THIS IS THE CLICK");
    }, 500),
    []
  );

  const toggleAffiliate = () => {
    setIsAffiliated((p) => !p);
    reset();
    resetMutation();
  };

  const onSchoolPartnered = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    isAffiliated,
    toggleAffiliate,
    isOpen,
    toggleOpen,
    close,
    register,
    errors,
    onSchoolPartnered,
    mutation,
    reset,
    errMessage,
    resetMutation,
  };
};
