// ClientWrapper.jsx
"use client";
import { useEffect } from "react";
import { getUser } from "@/src/utils/fns/global";
import useUser from "@/src/store/auth/user";

export default function ClientWrapper({ children }) {
  const { loading } = useUser();

  useEffect(() => {
    console.log("ClientWrapper loading:", loading);
    if (loading) {
      getUser();
    }
  }, [loading]);

  return <>{children}</>;
}
