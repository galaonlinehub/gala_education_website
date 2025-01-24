"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { useUser } from "@/src/hooks/useUser";
import { cookieFn } from "@/src/utils/fns/client";
import {  useEffect } from "react";
import { USER_COOKIE_KEY } from "@/src/config/settings";


const ClientWrapper = ({ children }) => {
  const { userLoading, userError, user } = useUser();


  useEffect(() => {
    if (userError) {
      cookieFn.remove(USER_COOKIE_KEY);
    }
  }, [userError]);

  if (userLoading) {
    return <TemplateLoader />;
  }

  return children;
};

export default ClientWrapper;