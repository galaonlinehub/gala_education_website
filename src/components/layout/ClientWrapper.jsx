"use client";

import ErrorScreen from "@/src/components/ui/ErrorScreen";
import { useClientWrapper } from "@/src/hooks/ui/useClientWrapper";
import TemplateLoader from "@/src/components/ui/loading/template/TemplateLoader";

const ClientWrapper = ({ children }) => {
  const { loading, error, userFetching, handleRetry, isReady, connections } =
    useClientWrapper();

  if (loading) {
    return <TemplateLoader />;
  }

  if (error) {
    return <ErrorScreen isRetrying={userFetching} onRetry={handleRetry} />;
  }

  return children;
};

export default ClientWrapper;
