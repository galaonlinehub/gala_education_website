import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";

import { generateRandomUUID } from "@/utils/fns/ai";

import { USER_COOKIE_KEY } from "../../config/settings";
import { cookieFn } from "../../utils/fns/client";
import { decrypt } from "../../utils/fns/encryption";

export const useAi = () => {
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [openAiMessage, setOpenAiMessage] = React.useState({});
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const contentRef = React.useRef(null);
  const token = decrypt(cookieFn.get(USER_COOKIE_KEY));

  const { register, reset, watch } = useForm({
    defaultValues: { prompt: "" }, // ensures reset clears input
  });
  const prompt = watch("prompt");

  const askGala = async () => {
    if (prompt.trim() === "") return;
    setIsStreaming(true);

    const userMessage = handleUserMessage();
    handleMessage(userMessage);
    reset({ prompt: "" }); // clear textarea immediately

    try {
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

  // 🔽 Auto-scroll when messages or streaming update
  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [openAiMessage, isStreaming]);

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
    if (e.key === "Enter" && !e.shiftKey) {
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
  };
};
