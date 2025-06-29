"use client";

import { isDev } from "@/src/config/settings";
import { useLoading } from "@/src/store/loading";
import { useUser } from "@/src/hooks/data/useUser";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSocketMultipleNamespaces } from "@/src/hooks/sockets/useSocketMultipleNamespaces";

export const useClientWrapper = () => {
  const { user, userError, userLoading, userFetching, refetchUser } = useUser();
  const { loading, toggleLoading } = useLoading();

  const [retrying, setRetrying] = useState(false);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!userLoading && isFirstLoadRef.current) {
      toggleLoading();
      isFirstLoadRef.current = false;
    }
  }, [userLoading, toggleLoading]);

  const handleRetry = async () => {
    setRetrying(true);
    await refetchUser();
    setRetrying(false);
  };

  const initialNamespaces = useMemo(() => {
    if (!user?.id) return [];
    return [
      {
        namespace: "chat",
        useInternalToken: true,
        userId: user.id,
        isDev,
      },
      {
        namespace: "notifications",
        useInternalToken: true,
        userId: user.id,
        isDev,
      },
    ];
  }, [user?.id]);

  const connections = useSocketMultipleNamespaces(initialNamespaces);

  const isAppReady = !userLoading && !loading && !userError && !retrying;

  return {
    loading: loading && isFirstLoadRef.current,
    error: userError || retrying,
    isReady: isAppReady,
    user,
    connections,
    userFetching: retrying || userFetching,
    retrying,
    handleRetry,
  };
};
