import { useMutation } from "@tanstack/react-query";

import { resendActivationLink } from "@/features/activation";

export const useResendActivationMutation = () => {
  return useMutation({
    mutationFn: (email) => resendActivationLink(email),
  });
};
