"use client";

import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { useUser } from "@/src/hooks/data/useUser";
import { useEffect } from "react";
import { useLoading } from "@/src/store/loading";

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
