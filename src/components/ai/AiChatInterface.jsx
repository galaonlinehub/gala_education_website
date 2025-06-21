"use client";
import React from "react";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { LuBrain } from "react-icons/lu";
import { useAi } from "@/src/hooks/useAi";
import { getLength, getValues } from "@/src/utils/fns/general";
import SlickSpinner from "../ui/loading/template/SlickSpinner";

const AiChatInterface = () => {
  const {
    isStreaming,
    handleReset,
    contentRef,
    prompt,
    register,
    askGala,
    openAiMessage,
    handleEnterSubmit,
  } = useAi();

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white overflow-hidden">
      <div
        ref={contentRef}
        className="overflow-y-scroll p-6 h-[90%] md:h-[85%] bg-whit shadow-inner"
      >
        {getLength(openAiMessage) === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <LuBrain className="text-white text-2xl" />
            </div>
            <p className="text-2xl font-bold mt-3">
              Welcome to <span className="text-purple-600"> GalaAI!</span> 🎉
            </p>

            <p className="w-full md:w-3/4 mt-3">
              Experience the power of our fully functional AI right now - ask
              questions, explore ideas, and get instant insights. While our core
              intelligence is ready to assist you today, we&apos;re actively
              crafting even more advanced features behind the scenes. Thank you
              for joining our journey as we evolve!
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {getValues(openAiMessage).map(({ id, role, content }) => (
              <React.Fragment key={id}>
                {role === "user" && (
                  <div className="flex justify-end">
                    <div className="flex items-start gap-3 max-w-[85%]">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl rounded-tr-md shadow-lg order-2">
                        <p className="text-sm">{content}</p>
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full flex-shrink-0 order-1">
                        <UserOutlined className="text-white text-sm" />
                      </div>
                    </div>
                  </div>
                )}
                {role === "assistant" && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[90%]">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0">
                        <LuBrain className="text-white text-sm" />
                      </div>
                      <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-md relative whitespace-pre-line leading-relaxed">
                        <p className="text-sm text-gray-800">{content}</p>
                        {isStreaming && (
                          <span className="inline-block w-0.5 h-5 bg-blue-500 ml-1 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-300 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex gap-3 items-center">
          <textarea
            onKeyDown={handleEnterSubmit}
            placeholder="Ask GalaAI"
            rows={2}
            className="flex-1 p-3 border border-gray-300 rounded-xl resize-none text-sm outline-none focus-visible:border-2 focus-visible:border-blue-800"
            {...register("prompt")}
          />
          <button
            disabled={!prompt?.trim().length > 0 || isStreaming}
            onClick={askGala}
            className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px]"
          >
            {isStreaming ? <SlickSpinner color="white" size={16} /> : <SendOutlined />}
            {!isStreaming && (
              <span className="hidden md:inline text-sm">Submit</span>
            )}
          </button>
          {getLength(openAiMessage) > 0 && !isStreaming && (
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChatInterface;
