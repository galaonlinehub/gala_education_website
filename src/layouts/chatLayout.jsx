"use client";
import { useChatSocket } from "@/src/hooks/chat/useChatSocket";
import { useClientWrapper } from "@/src/hooks/ui/useClientWrapper";

export default function ChatLayout({ children }) {
  const { user, connections } = useClientWrapper();

  useChatSocket("chat", connections);

  return (
    <div className="flex h-screen">
      {children}
    </div>
  );
}