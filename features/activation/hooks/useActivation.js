import { useCallback } from "react";

import {
  useResendActivationMutation,
  useVerifyAccountMutation,
} from "@/features/activation";

export const useActivation = () => {
  const {
    mutate: verifyLinkMutate,
    isPending: verifyLinkIsPending,
    isError: verifyLinkIsError,
    error: verifyLinkError,
  } = useVerifyAccountMutation();
  const {
    mutate: resendLinkMutate,
    isError: resendLinkIsError,
    error: resendLinkError,
  } = useResendActivationMutation();

  const verifyLink = useCallback(
    (email, token) => {
      verifyLinkMutate(
        { email, token },
        {
          onSuccess: (res) => {
            console.log(res);
          },
          onError: (err) => {
            console.log("we are here cause of error");
            console.log(err);
          },
        }
      );
    },
    [verifyLinkMutate]
  );

  return {
    verifyLink,
    verifyLinkIsError,
    verifyLinkError,
    verifyLinkIsPending,
    resendLinkMutate,
    resendLinkIsError,
    resendLinkError,
  };
};
