import  {USER_COOKIE_KEY}  from "@/src/config/settings";
import  {cookieFn} from "@/src/utils/fns/client";
import { decrypt } from "@/src/utils/fns/encryption";
import axios from "axios";

export const askGalaAi = async (prompt) => {
     const token = decrypt(cookieFn.get(USER_COOKIE_KEY));
    const { data:{answer} } = await axios.post(
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
