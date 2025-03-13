import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "antd";
import {
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  EllipsisOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useChat } from "@/src/hooks/useChat";
import { useUser } from "@/src/hooks/useUser";
import useChatStore from "@/src/store/chat/chat";
import { img_base_url } from "@/src/config/settings";

const RenderChat = ({
  users,
  isSmallScreen,
  MAIN_COLOR,
  TEXT_COLOR,
  MAIN_COLOR_LIGHT,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { sendMessage, chats, messages } = useChat();
  const { user } = useUser();

  // Check if it's a preview chat
  const isPreviewChat = currentChatId === "preview";

  // Get current chat from chats array (which now includes previewChat)
  const currentChat = chats?.find((chat) => chat.id === currentChatId);

  // Define recipient (the other participant in the chat)
  const recipient = currentChat?.participants.find((p) => p.user.id !== user.id);

  // Calculate display name
  const displayName = currentChat?.participants
    .filter((p) => p.user.id !== user.id)
    .map((p) => `${p.user.first_name} ${p.user.last_name}`)
    .join(", ") || "Chat";

  // Debug logging
  console.log("Chats:", chats);
  console.log("Current Chat ID:", currentChatId);
  console.log("Current Chat:", currentChat);
  console.log("Is Preview Chat:", isPreviewChat);
  console.log("Recipient:", recipient);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const handleEmojiButtonClick = (e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("inputmode", "none");
    input.style.position = "fixed";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    document.body.appendChild(input);

    input.addEventListener("input", (event) => {
      if (event.data) {
        setNewMessage((prev) => prev + event.data);
      }
      input.remove();
    });

    input.focus();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      let recipientId = recipient?.user.id;
      let chatId = currentChatId;

      if (!recipientId) {
        throw new Error("No recipient ID found");
      }

      if (isPreviewChat) {
        chatId = null; // Force creation of a new chat for preview
      }

      console.log("Sending message with:", { content: newMessage, recipientId, chatId });
      await sendMessage(newMessage, recipientId, chatId);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getSenderName = (senderId) => {
    if (senderId === user.id) return "You";
    const sender = currentChat?.participants.find((p) => p.user.id === senderId);
    return sender ? `${sender.user.first_name} ${sender.user.last_name}` : "Unknown";
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={`p-3 flex items-center border-b text-[${TEXT_COLOR}] bg-[${MAIN_COLOR}]`}
      >
        {isSmallScreen && (
          <button
            onClick={() => setCurrentChatId(null)}
            className="mr-3 hover:text-gray-300"
            style={{ color: TEXT_COLOR }}
          >
            <ArrowLeftOutlined />
          </button>
        )}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={
                  recipient?.user.profile_picture
                    ? `${img_base_url}${recipient.user.profile_picture}`
                    : "/default-avatar.png"
                }
                alt={displayName}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded-full"
              />
              {recipient?.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white">
                {displayName}
              </h2>
              <p className="text-xs opacity-75 text-white">
                {recipient?.online ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="hover:text-gray-300 transition-colors">
              <PhoneOutlined className={`text-[${TEXT_COLOR}] text-[18px]`} />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <VideoCameraOutlined className={`text-[${TEXT_COLOR}] text-[18px]`} />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <EllipsisOutlined className={`text-[${TEXT_COLOR}] text-[18px]`} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-3"
      >
        <div className="text-center mb-4">
          <span
            className="inline-block px-3 py-1 text-xs rounded-full text-gray-600"
            style={{ backgroundColor: "rgba(0, 24, 64, 0.08)" }}
          >
            Today
          </span>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender_id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender_id !== user.id && (
              <div className="mr-2 self-end mb-1">
                <Image
                  src={
                    recipient?.user.profile_picture
                      ? `${img_base_url}${recipient.user.profile_picture}`
                      : "/default-avatar.png"
                  }
                  alt={getSenderName(message.sender_id)}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-cover rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col max-w-[75%]">
              <span className="text-xs text-gray-600 mb-1">
                {getSenderName(message.sender_id)}
              </span>
              <div
                className={`px-3 py-2 rounded-2xl ${
                  message.sender_id === user.id
                    ? "text-white bg-[#001840] rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <p className="text-xs">{message.content}</p>
              </div>
              <span className="text-xs mt-1 text-gray-500">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t bg-white">
        <div
          className="flex items-center gap-2 rounded-full p-2"
          style={{ backgroundColor: "rgba(0, 24, 64, 0.05)" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleAttachment}
            className="ml-2 text-gray-500 hover:text-blue-500 transition-colors"
            style={{ color: MAIN_COLOR_LIGHT }}
          >
            <PaperClipOutlined style={{ fontSize: "18px" }} />
          </button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-transparent outline-none text-sm px-2"
          />
          <button
            type="button"
            onClick={handleEmojiButtonClick}
            className="text-gray-500 hover:text-blue-500 transition-colors"
            style={{ color: MAIN_COLOR_LIGHT }}
          >
            <SmileOutlined style={{ fontSize: "18px" }} />
          </button>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={clsx(
              "p-2 h-8 w-8 rounded-full transition-colors flex items-center justify-center",
              newMessage.trim()
                ? `bg-[${MAIN_COLOR}] text-white`
                : "bg-[#ccc] text-[#666]"
            )}
          >
            <SendOutlined className="text-xs" />
          </button>
        </div>
      </form>
    </div>
  );
};

export { RenderChat };