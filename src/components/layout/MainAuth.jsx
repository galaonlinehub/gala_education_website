"use client";
import { useEffect, useCallback } from "react";
import { getUser } from "@/src/utils/fns/global";
import useUser from "@/src/store/auth/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { cookieFn } from "@/src/utils/fns/client";
import { USER_COOKIE_KEY } from "@/src/config/settings";

const queryClient = new QueryClient();

const ClientWrapper = ({ children }) => {
  const { user, setUser } = useUser();
  const hasToken = cookieFn.get(USER_COOKIE_KEY);

  const checkUser = useCallback(async () => {
    try {
      const result = await getUser();
      if (result?.status) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      setUser(null);
    }
  }, [setUser]);

  useEffect(() => {
    if (!user && hasToken) {
      checkUser();
    }
  }, [hasToken, checkUser, user]);

  if (!user && hasToken) {
    return <TemplateLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientWrapper;