"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { LuBrain } from "react-icons/lu";

const AiChatInterface = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamedText, setStreamedText] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );
    const streamingRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const galaEducationResponse = `Gala Education represents a revolutionary approach to learning that transforms traditional educational paradigms through innovative technology and personalized learning experiences. At its core, Gala Education is designed to make learning more engaging, accessible, and effective by leveraging cutting-edge artificial intelligence and adaptive learning systems.

The platform creates individualized learning pathways that adapt to each student's unique pace, learning style, and interests. What sets Gala Education apart is its commitment to democratizing quality education by breaking down geographical and economic barriers.

Key features include:
• Real-time & advanced learning mechanisms
• Advanced analytics for progress tracking
• Collaborative learning communities
• Focus on critical thinking and digital literacy

The system uses data-driven approaches to ensure no student is left behind, while fostering curious, confident, and capable learners who can thrive in our rapidly evolving world.`;

    const handleSubmit = () => {
        if (isStreaming) return;
        setHasSubmitted(true);
        setIsStreaming(true);
        setStreamedText("");

        let currentIndex = 0;
        const streamInterval = setInterval(() => {
            if (currentIndex < galaEducationResponse.length) {
                setStreamedText(galaEducationResponse.substring(0, currentIndex + 1));
                currentIndex++;

                if (contentRef.current) {
                    contentRef.current.scrollTop = contentRef.current.scrollHeight;
                }
            } else {
                clearInterval(streamInterval);
                setIsStreaming(false);
            }
        }, 30);

        streamingRef.current = streamInterval;
    };

    const handleReset = () => {
        if (streamingRef.current) clearInterval(streamingRef.current);
        setIsStreaming(false);
        setStreamedText("");
        setHasSubmitted(false);
    };

    useEffect(() => {
        return () => {
            if (streamingRef.current) clearInterval(streamingRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col max-h-screen bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
            {/* Content area with proper flex sizing */}
            <div
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6 bg-white shadow-inner min-h-0"
            >
                {!hasSubmitted ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                            <LuBrain className="text-white text-2xl" />
                        </div>
                        <p className="max-w-xl px-4 text-sm md:text-lg font-semibold">
                            We're building something special —{" "}
                            <span className="text-purple-600 font-bold">GalaAI</span> — an
                            intelligent assistant designed to help you learn faster, think
                            deeper, and get things done smarter.
                        </p>
                        <p className="max-w-xl px-4 mt-4 text-xs md:text-sm text-gray-600">
                            While it's not quite ready to launch just yet, we're working hard
                            behind the scenes to bring you a next-generation AI experience
                            that's worth the wait.
                        </p>
                        <div className="text-sm md:text-lg mt-4 font-medium text-gray-900">
                            It’s coming. <span className="text-gray-500">Not today. Not tomorrow.</span><br />
                            <span className="text-purple-600 font-semibold">But soon enough to get excited.</span>
                        </div>
                        <p className="mt-8 text-xs md:text-sm text-gray-500">
                            While you wait, try this out 👇!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {/* User Message */}
                        <div className="flex justify-end">
                            <div className="flex items-start gap-3 max-w-[85%]">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl rounded-tr-md shadow-lg order-2">
                                    <p className="text-sm">What is Gala Education?</p>
                                </div>
                                <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full flex-shrink-0 order-1">
                                    <UserOutlined className="text-white text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-start">
                            <div className="flex items-start gap-3 max-w-[90%]">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0">
                                    <LuBrain className="text-white text-sm" />
                                </div>
                                <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-md relative whitespace-pre-line leading-relaxed">
                                    <p className="text-sm text-gray-800">{streamedText}</p>
                                    {isStreaming && (
                                        <span className="inline-block w-0.5 h-5 bg-blue-500 ml-1 animate-pulse" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed input at bottom - flex-shrink-0 ensures it stays visible */}
            <div className="bg-white border-t border-gray-300 shadow-lg p-4 flex-shrink-0">
                <div className="max-w-4xl mx-auto flex gap-3 items-center">
                    <textarea
                        readOnly
                        value="What is Gala Education?"
                        rows={2}
                        className="flex-1 p-3 border border-gray-300 rounded-xl resize-none cursor-not-allowed text-sm"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isStreaming}
                        className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px]"
                    >
                        {isStreaming ? <LoadingOutlined /> : <SendOutlined />}
                        {!isStreaming && <span className="hidden md:inline text-sm">Submit</span>}
                    </button>
                    {hasSubmitted && (
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
