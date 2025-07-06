// src/layouts/ChatLayout.jsx
"use client";
import { useClientWrapper } from "@/src/hooks/ui/useClientWrapper";
import { useChatSocket } from "@/src/hooks/chat/useChatSocket";

export default function ChatLayout({ children }) {
  const { user, connections } = useClientWrapper();

  useChatSocket("chat", connections);

  return (
    <div className="flex h-screen">
      {children}
    </div>
  );
}