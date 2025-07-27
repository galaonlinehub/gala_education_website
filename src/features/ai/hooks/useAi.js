"use client"
import * as React from "react";
import { useForm } from "react-hook-form";

import { useGalaAiResponse } from "@/src/features/ai";
import { generateRandomUUID } from "@/src/utils/fns/ai";

export const useAi = () => {
    const [isStreaming, setIsStreaming] = React.useState(false);
    const [openAiMessage, setOpenAiMessage] = React.useState([]);
    const [windowWidth, setWindowWidth] = React.useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    const contentRef = React.useRef(null);

    const { register, reset, watch } = useForm();
    const prompt = watch("prompt");

    const { mutate,isPending } = useGalaAiResponse();

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
            mutate(prompt, {
                onSuccess: (data) => {
                    
                    const msg = handleOpenAiResponse(data);
                    handleMessage(msg);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
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
        setOpenAiMessage([]);
    };

    const handleUserMessage = () => ({
        id: generateRandomUUID(),
        role: "user",
        content: prompt,
    });

    const handleOpenAiResponse = (res) => ({
        id: new Date().toISOString(),
        role: "gala",
        content: res,
    });

    const handleMessage = (message) => {
        return setOpenAiMessage((prev) => [...prev, message]);
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
        isPending
    };
};
