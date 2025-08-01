import axios from "axios";

import { USER_COOKIE_KEY } from "@/config/settings";
import { cookieFn } from "@/utils/fns/client";
import { decrypt } from "@/utils/fns/encryption";

export const askGalaAi = async (prompt) => {
  const token = decrypt(cookieFn.get(USER_COOKIE_KEY));
  const {
    data: { answer },
  } = await axios.post(
    `https://ai.galahub.org/ask-gala`,
    { question: prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return answer;
};
