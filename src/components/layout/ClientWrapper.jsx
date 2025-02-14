"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { useUser } from "@/src/hooks/useUser";
import { cookieFn } from "@/src/utils/fns/client";
import {  useEffect } from "react";
import { USER_COOKIE_KEY } from "@/src/config/settings";
import { useLoading } from "@/src/store/loading";


const ClientWrapper = ({ children }) => {
  // const { userLoading, userError, user } = useUser();
  const {loading,toggleLoading} = useLoading();


  // useEffect(() => {
  //   if (userError) {
  //     cookieFn.remove(USER_COOKIE_KEY);
  //   }
  // }, [userError]);

  useEffect(()=>{
    toggleLoading();
  },[toggleLoading])
  console.log(loading)


  if (loading) {
    return <TemplateLoader />;
  }


  return children;
};

export default ClientWrapper;