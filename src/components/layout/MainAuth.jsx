"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/src/utils/fns/global";
import useUser from "@/src/store/auth/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { cookieFn } from "@/src/utils/fns/client";
import { USER_COOKIE_KEY } from "@/src/config/settings";

// const queryClient = new QueryClient();

const ClientWrapper = ({ children }) => {
  const { user, setUser } = useUser();
  const [queryClient] = useState(() => new QueryClient());
  const hasToken = cookieFn.get(USER_COOKIE_KEY);

  useEffect(() => {
    const checkUser = async () => {
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
    };

    if (!user && hasToken) {
      checkUser();
    }
  }, [hasToken, setUser, user]);

  if (!user && hasToken) {
    return (
      <QueryClientProvider client={queryClient}>
        <TemplateLoader />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientWrapper;
