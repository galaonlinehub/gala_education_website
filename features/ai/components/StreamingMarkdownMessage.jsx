"use client";
import React, { useEffect, useState } from "react";
import { LuBrain } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const StreamingMarkdown = ({ markdown, showCursor = false }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown + (showCursor ? " ▍" : "")}
      </ReactMarkdown>
    </div>
  );
};

const StreamingMarkdownMessage = ({ fullText, isLoading }) => {
  const [streamedText, setStreamedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isLoading && fullText) {
      setIsStreaming(true);
      setStreamedText("");
      setIndex(0);
    }
  }, [isLoading, fullText]);

  useEffect(() => {
    if (isStreaming && index < fullText.length) {
      const timeout = setTimeout(() => {
        setStreamedText((prev) => prev + fullText[index]);
        setIndex((i) => i + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }

    if (index >= fullText.length) {
      setIsStreaming(false);
    }
  }, [index, isStreaming, fullText]);

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0">
          <LuBrain className="text-white text-sm" />
        </div>
        <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-md relative whitespace-pre-line leading-relaxed min-h-[40px]">
          {/* {(isLoading &&  isLastGala) ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-600" />
            </div>
          ) : ( */}
            <StreamingMarkdown markdown={streamedText} showCursor={isStreaming} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default StreamingMarkdownMessage;
