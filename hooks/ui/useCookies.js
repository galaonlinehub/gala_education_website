import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCookiesStore } from "@/store/auth/cookiesStore";
import { COOKIES_OPTIONS } from "@/utils/data/variables";

export const useCookies = () => {
  const router = useRouter();
  const { setCookieIsAccepted } = useCookiesStore();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const onClick = () => {
    setCookieIsAccepted(COOKIES_OPTIONS.accept);
  };

  return {
    router,
    visible,
    onClick,
  };
};
