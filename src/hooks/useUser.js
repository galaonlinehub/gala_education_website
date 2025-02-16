import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/fns/global";
import { cookieFn } from "../utils/fns/client";
import { USER_COOKIE_KEY } from "../config/settings";
import { globalOptions } from "../config/tanstack";
import { useRouter, usePathname } from "next/navigation";
import { roleRedirects } from "../utils/data/redirect";

export const useUser = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, error, isFetching, isPending } = useQuery({
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
      alert(JSON.stringify(error));
    },
  });

  return {
    user: data,
    userLoading: isLoading,
    userError: error,
    userFetching: isFetching,
    userPending: isPending,
  };
};
