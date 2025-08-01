import { useMutation } from "@tanstack/react-query";

import { verifyEmailTokenLink } from "@/features/activation";

export const useVerifyAccountMutation = () => {
  return useMutation({
    mutationFn: ({ email, token }) => verifyEmailTokenLink(email, token),
  });
};
