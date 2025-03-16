import { useState, useEffect, useRef } from "react";
import { Avatar, Dropdown } from "antd";
import {
  LoadingOutlined,
  PaperClipOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { useChat } from "@/src/hooks/useChat";
import { useUser } from "@/src/hooks/useUser";
import useChatStore from "@/src/store/chat/chat";
import { img_base_url } from "@/src/config/settings";
import TypingIndicator from "../ui/loading/template/Typing";
import {
  LuVideo,
  LuPhone,
  LuEllipsisVertical,
  LuArrowLeft,
  LuUser,
  LuSendHorizontal,
} from "react-icons/lu";

const RenderChat = ({
  isSmallScreen,
  MAIN_COLOR,
  TEXT_COLOR,
  MAIN_COLOR_LIGHT,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const { currentChatId, setCurrentChatId } = useChatStore();
  const {
    sendMessage,
    chats,
    messages,
    typingUsers,
    sendTypingStatus,
    deleteChatMutation,
    isFetchingChatMessages,
  } = useChat();
  const { user } = useUser();

  const isPreviewChat = currentChatId === "preview";
  const currentChat = chats?.find((chat) => chat.id === currentChatId);
  const recipient = currentChat?.participants.find(
    (p) => p.user.id !== user.id
  );
  const displayName =
    currentChat?.participants
      .filter((p) => p.user.id !== user.id)
      .map((p) => `${p.user.first_name} ${p.user.last_name}`)
      .join(", ") || "Chat";
  const isRecipientTyping =
    recipient && typingUsers.includes(recipient.user.id);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isRecipientTyping]);

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

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    sendTypingStatus(true);

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 1000);
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
        chatId = null;
      }

      await sendMessage(newMessage, recipientId, chatId);
      sendTypingStatus(false);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getSenderName = (senderId) => {
    if (senderId === user.id) return "You";
    const sender = currentChat?.participants.find(
      (p) => p.user.id === senderId
    );
    return sender
      ? `${sender.user.first_name} ${sender.user.last_name}`
      : "Unknown";
  };

  const isSender = (idx) => idx === user.id;

  return (
    <div className="flex flex-col h-full">
      <div
        className={`p-2 md:p-3 flex items-center border-b text-[${TEXT_COLOR}] bg-[${MAIN_COLOR}]`}
      >
        {isSmallScreen && (
          <button
            onClick={() => setCurrentChatId(null)}
            className={`mr-3 hover:text-gray-300 text-[${TEXT_COLOR}]`}
          >
            <LuArrowLeft className="text-[16px] text-white" />
          </button>
        )}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar
                src={
                  recipient?.user.profile_picture &&
                  `${img_base_url}${recipient.user.profile_picture}`
                }
                alt={displayName}
                size={48}
                icon={<LuUser className="text-white" />}
              />
              {recipient?.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">
                {displayName}
              </h2>
              <p className="text-[10px] opacity-75 text-white">
                {isRecipientTyping
                  ? "Typing..."
                  : recipient?.online
                  ? "Online"
                  : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <LuPhone className="text-gray-500 text-[16px] cursor-not-allowed" />
            <LuVideo className="text-gray-500  text-[16px] cursor-not-allowed " />
            {currentChatId !== "preview" && (
              <Dropdown
                arrow
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: deleteChatMutation.isLoading
                        ? "Deleting..."
                        : "Delete Chat",
                      onClick: () => {
                        if (currentChatId && !isPreviewChat) {
                          deleteChatMutation.mutate();
                        }
                      },
                      disabled: deleteChatMutation.isLoading,
                    },
                    {
                      key: "archive",
                      label: "Archive",
                      onClick: () => {
                        console.log(
                          "Archive chat clicked for chat:",
                          currentChatId
                        );
                      },
                    },
                  ],
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <LuEllipsisVertical className="text-white text-[16px] cursor-pointer" />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      {isFetchingChatMessages ? (
        <div className="flex justify-center items-center h-full w-full">
          <LoadingOutlined spin />
        </div>
      ) : (
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
              className={clsx(
                "flex",
                isSender(message.sender_id) ? "justify-end" : "justify-start"
              )}
            >
              {message.sender_id !== user.id && (
                <div className="mr-2 self-end mb-1">
                  <Avatar
                    src={
                      recipient?.user.profile_picture
                        ? `${img_base_url}${recipient.user.profile_picture}`
                        : "/default-avatar.png"
                    }
                    alt={getSenderName(message.sender_id)}
                    size={32}
                    icon={<LuUser className="text-black" />}
                  />
                </div>
              )}
              <div className="flex flex-col max-w-[75%]">
                <span
                  className={clsx("text-[10px] text-gray-600 mb-[1px] pr-2", {
                    "self-end": isSender(message.sender_id),
                  })}
                >
                  {getSenderName(message.sender_id)}
                </span>
                <div
                  className={`px-3 py-2 rounded-2xl flex gap-2 w-full ${
                    isSender(message.sender_id)
                      ? "text-white bg-[#001840] rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-xs min-w-0">{message.content}</p>
                  <span
                    className={clsx(
                      "text-[8px] self-end shrink-0 whitespace-nowrap",
                      {
                        "text-gray-100": isSender(message.sender_id),
                        "text-gray-500": !isSender(message.sender_id),
                      }
                    )}
                  >
                    {message.sent_at}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isRecipientTyping && (
            <div className="flex justify-start items-center gap-2">
              <Avatar
                src={
                  recipient?.user.profile_picture
                    ? `${img_base_url}${recipient.user.profile_picture}`
                    : "/default-avatar.png"
                }
                alt={displayName}
                size={32}
                icon={<LuUser className="text-black" />}
              />
              <TypingIndicator />
            </div>
          )}
        </div>
      )}

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
            className={`ml-2 text-gray-500 hover:text-blue-500 transition-colors text-[${MAIN_COLOR_LIGHT}]`}
          >
            <PaperClipOutlined style={{ fontSize: "18px" }} />
          </button>
          <input
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-grow bg-transparent outline-none text-sm px-2"
          />
          <button
            type="button"
            onClick={handleEmojiButtonClick}
            className={`text-gray-500 hover:text-blue-500 transition-colors text-[${MAIN_COLOR_LIGHT}]`}
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
            <LuSendHorizontal className="text-xs" />
          </button>
        </div>
      </form>
    </div>
  );
};

export { RenderChat };
