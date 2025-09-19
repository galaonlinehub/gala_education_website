"use client";

import { useClientWrapper } from "@/hooks/ui/useClientWrapper";

import ErrorScreen from "../ui/ErrorScreen";
import TemplateLoader from "../ui/loading/template/TemplateLoader";

const ClientWrapper = ({ children }) => {
  const {
    loading,
    error,
    userFetching,
    handleRetry,
    isReady,
    connections,
    isPublicRoute,
  } = useClientWrapper();

  if (loading) {
    return <TemplateLoader />;
  }

  if (error) {
    return <ErrorScreen isRetrying={userFetching} onRetry={handleRetry} />;
  }

  return children;
};

export default ClientWrapper;
