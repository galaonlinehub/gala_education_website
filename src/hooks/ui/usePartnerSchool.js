import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { apiPost } from "@/src/services/api/api_service";
import { useSchoolPartnerStore } from "@/src/store/student/schoolPartnerStore";

export const usePartnerSchool = () => {

  const [isAffiliated, setIsAffiliated] = useState(false);
  const { open, isOpen, close, toggleOpen } = useSchoolPartnerStore();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const timeoutRef = useRef(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await apiPost(`/join-partner-school/${data?.code}`);
    },
    onSuccess: (response) => {
      const message =
        response?.data?.message || "Successfully matched up with school";
      const schoolName = response?.data?.school_name || null;

      clearErrors();
      setError("_success", {
        type: "manual",
        message,
        schoolName,
      });

      queryClient.invalidateQueries({ queryKey: ["auth-user"] });

      timeoutRef.current = setTimeout(() => {
        close();
        resetForm();
      }, 3000);
    },
    onError: (err) => {
      const message =
        err?.response?.data?.errors?.partner_school?.[0] ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";
      clearErrors("_success");
      setError("code", {
        type: "manual",
        message,
      });
    },
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const resetMutation = useCallback(() => {
    const debounced = debounce(() => {
      mutation.reset();
    }, 500);

    debounced();
  }, [mutation]);

  const toggleAffiliate = () => {
    setIsAffiliated((p) => !p);
  };

  const resetForm = () => {
    setIsAffiliated(false);
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
    resetMutation,
    resetForm,
    clearErrors,
  };
};

export const useRemoveSchoolPartner = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => apiPost("/leave-partner-school"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success("You've been removed from the school.", {
        style: {
          borderRadius: "20px",
          background: "#fff",
          color: "#001840",
          fontSize: "13px",
        },
      });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.", {
        style: {
          borderRadius: "20px",
          background: "#fff",
          color: "#001840",
          fontSize: "13px",
        },
      });
    },
  });

  const onConfirm = () => {
    mutation.mutate();
  };

  return {
    onConfirm,
    isLoading: mutation.isPending,
  };
};
