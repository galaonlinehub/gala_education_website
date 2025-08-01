"use client";

import { useEffect } from "react";

import { useUser } from "@/hooks/data/useUser";
import { useLoading } from "@/store/loading";

import TemplateLoader from "../ui/loading/template/TemplateLoader";

const ClientWrapper = ({ children }) => {
  const { userLoading, userError } = useUser();

  const { loading, toggleLoading } = useLoading();

  useEffect(() => {
    !userLoading && toggleLoading();
  }, [toggleLoading, userLoading]);

  if (loading) {
    return <TemplateLoader />;
  }

  return children;
};

export default ClientWrapper;
