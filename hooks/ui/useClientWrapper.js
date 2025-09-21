"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { isDev } from "@/config/settings";
import { useLoading } from "@/store/loading";

import { useUser } from "../data/useUser";
import { useSocketMultipleNamespaces } from "../sockets/useSocketMultipleNamespaces";

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
  const currentURL = usePathname();

  const actualPath = (() => {
    if (!currentURL) return "/";
    const segments = currentURL.split("/").filter(Boolean);
    if (segments.length > 0 && /^[a-z]{2}$/i.test(segments[0])) {
      return "/" + segments.slice(1).join("/");
    }
    return "/" + segments.join("/");
  })();

  const publicRoutes = ["/", "/about-us"];
  const isPublicRoute = publicRoutes.includes(actualPath);

  return {
    loading: loading && isFirstLoadRef.current,
    error: userError || retrying,
    isReady: isAppReady,
    user,
    connections,
    userFetching: retrying || userFetching,
    retrying,
    handleRetry,
    isPublicRoute,
  };
};
