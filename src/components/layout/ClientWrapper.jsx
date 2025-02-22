"use client";

import TemplateLoader from "../ui/loading/template/TemplateLoader";
import { useUser } from "@/src/hooks/useUser";
import { cookieFn } from "@/src/utils/fns/client";
import { useEffect } from "react";
import { USER_COOKIE_KEY } from "@/src/config/settings";
import { useLoading } from "@/src/store/loading";
import notificationService from "../ui/notification/Notification";
import { useRouter } from "next/navigation";

const ClientWrapper = ({ children }) => {
  const { userLoading, userError } = useUser();
  const { loading, toggleLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    if (userError) {
      notificationService.error({
        message: "",
        description:
          "Fatal error occurred,\n Please try again later!, \t  Redirecting to home page... ",
        duration: 5,
        closable: true,
        customStyle: { paddingTop: "0px" },
      });

      cookieFn.remove(USER_COOKIE_KEY);
      router.push("/");
    }
  }, [router, userError]);

  useEffect(() => {
    !userLoading && toggleLoading();
  }, [toggleLoading, userLoading]);

  if (loading) {
    return <TemplateLoader />;
  }

  return children;
};

export default ClientWrapper;
