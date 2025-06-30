import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD:src/hooks/useAi.js
import { openai_base_url, USER_COOKIE_KEY } from "../config/settings";
import { cookieFn } from "../utils/fns/client";
import { decrypt } from "../utils/fns/encryption";
import { fetchWithStream, generateRandomUUID } from "../utils/fns/ai";
=======
import { USER_COOKIE_KEY } from "../../config/settings";
import { cookieFn } from "../../utils/fns/client";
import { decrypt } from "../../utils/fns/encryption";
>>>>>>> a0cfcd2b22653650f94b665aef1d3bef6537c785:src/hooks/ui/useAi.js

export const useAi = () => {
    const [isStreaming, setIsStreaming] = React.useState(false);
    const [openAiMessage, setOpenAiMessage] = React.useState({});
    const [windowWidth, setWindowWidth] = React.useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    const contentRef = React.useRef(null);
    const token = decrypt(cookieFn.get(USER_COOKIE_KEY));

    const { register, reset, watch } = useForm();
    const prompt = watch("prompt");

    const askGala = async () => {
        if (prompt.trim() === "") return;
        setIsStreaming(true);
        const userMessage = handleUserMessage();
        handleMessage(userMessage);
        reset();

        // const galaId = generateRandomUUID();
        // const galaMessage = { id: galaId, role: "gala", content: "" };
        // handleMessage(galaMessage);
        // setMarkDown("");
        try {
            // await fetchWithStream(token, prompt, (chunk) => {
            //     setMarkDown((prev) => prev + chunk);
            // });
            const { data } = await axios.post(
                `https://ai.galahub.org/ask-gala`,
                { question: prompt },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const msg = handleOpenAiResponse(data);
            handleMessage(msg);
        } catch (e) {
            console.error(e);
        } finally {
            setIsStreaming(false);
        }
    };

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [openAiMessage]);

    const handleReset = () => {
        setOpenAiMessage({});
    };

    const handleUserMessage = () => ({
        id: generateRandomUUID(),
        role: "user",
        content: prompt,
    });

    const handleOpenAiResponse = (res) => ({
        id: new Date().toISOString(),
        role: "gala",
        content: res?.answer,
    });

    const handleMessage = (message) => {
        return setOpenAiMessage((prev) => ({
            ...prev,
            [message?.id]: message,
        }));
    };

    const handleEnterSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            askGala();
        }
    };

    return {
        windowWidth,
        isStreaming,
        handleReset,
        contentRef,
        register,
        prompt,
        askGala,
        openAiMessage,
        handleEnterSubmit,
        isStreaming,
    };
};
