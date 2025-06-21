import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { openai_api_key, openai_base_url } from "../config/settings";

export const useAi = () => {
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [openAiMessage, setOpenAiMessage] = React.useState({});
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const contentRef = React.useRef(null);

  const { register, reset, watch } = useForm();
  const prompt = watch("prompt");

  const askGala = async () => {
    if (prompt.trim() === "") return;
    setIsStreaming(true);
    const userMessage = handleUserMessage();
    handleMessage(userMessage);
    reset();

    try {
      const { data } = await axios.post(
        `${openai_base_url}chat/completions`,
        askGalaObject(),
        {
          headers: {
            Authorization: `Bearer ${openai_api_key}`,
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

  const askGalaObject = () => ({
    model: "gpt-4.1-mini",
    store: true,
    messages: [{ role: "user", content: prompt }],
  });

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
    id: new Date().toISOString(),
    role: "user",
    content: prompt,
  });

  const handleOpenAiResponse = (res) => ({
    id: res?.id,
    role: res?.choices[0]?.message?.role,
    content: res?.choices[0]?.message?.content,
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
  };
};
