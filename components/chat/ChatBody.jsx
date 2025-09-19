
import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Skeleton } from "antd";
import clsx from "clsx";
import { format, isToday, isYesterday } from "date-fns";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import {
  LuEllipsisVertical,
  LuArrowLeft,
  LuUser,
  LuSendHorizontal,
  LuCheck,
  LuCheckCheck,
  LuVideoOff,
  LuPhoneOff,
  LuPaperclip,
  LuClock4,
  LuCircleAlert,
} from "react-icons/lu";

import { img_base_url } from "@/config/settings";
import { useChat } from "@/hooks/chat/useChat";
import { useUser } from "@/hooks/data/useUser";
import useChatStore from "@/store/chat/chat";
import { getEntries, getValues, hasData } from "@/utils/fns/general";

import SlickSpinner from "../ui/loading/template/SlickSpinner";
import TypingIndicator from "../ui/loading/template/Typing";

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
    isFetchingChats,
    messages,
    typingUsers,
    sendTypingStatus,
    deleteChatMutation,
    isFetchingChatMessages,
    messageReceipts,
    markMessageAsRead,
    onlineUsers,
  } = useChat();
  const { user } = useUser();

  const isPreviewChat = currentChatId === "preview";
  const currentChat = chats?.find((chat) => chat.id === currentChatId);
  const recipient = currentChat?.participants.find(
    (p) => p.user?.id !== user?.id
  );
  const displayName =
    currentChat?.participants
      .filter((p) => p.user?.id !== user?.id)
      .map((p) => `${p.user.first_name} ${p.user.last_name}`)
      .join(", ") || "Chat";
  const isRecipientTyping =
    recipient && typingUsers.includes(recipient.user?.id);
  const isRecipientOnline =
    recipient && onlineUsers.includes(recipient.user?.id);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isRecipientTyping]);

  useEffect(() => {
    if (!isPreviewChat && hasData(messages)) {
      const unread_messages = getValues(messages).filter((m) => {
        if (m.isTemp) return false;
        const isNotSender = m.sender_id !== user?.id;
        const userStatus = m.statuses?.find((s) => s.user_id === user?.id);
        const needsMarking = !userStatus
          ? true
          : (userStatus.status === "sent" ||
            userStatus.status === "delivered") &&
          userStatus.status !== "read";
        return isNotSender && needsMarking;
      });

      if (unread_messages.length > 0) {
        markMessageAsRead(unread_messages);
      }
    }
  }, [currentChatId, isPreviewChat, markMessageAsRead, messages, user?.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) console.log("File selected:", file.name);
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
      if (event.data) setNewMessage((prev) => prev + event.data);
      input.remove();
    });
    input.focus();
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendTypingStatus(true);
    typingTimeoutRef.current = setTimeout(() => sendTypingStatus(false), 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      const recipientId = recipient?.user?.id;
      if (!recipientId) throw new Error("No recipient ID found");
      const chatId = isPreviewChat ? null : currentChatId;
      await sendMessage(newMessage, recipientId, chatId);
      sendTypingStatus(false);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getSenderName = (senderId) => {
    if (senderId === user?.id) return "You";
    const sender = currentChat?.participants.find(
      (p) => p.user?.id === senderId
    );
    return sender
      ? `${sender.user.first_name} ${sender.user.last_name}`
      : "Unknown";
  };

  const isSender = (idx) => idx === user?.id;

  const renderTicks = (message) => {
    if (message.sender_id !== user?.id) return null;
    const recipientId = recipient?.user?.id;
    const socketStatus = messageReceipts[message.id]?.[recipientId];
    const fetchedStatus = message.statuses?.find(
      (s) => s.user_id === recipientId
    )?.status;
    const status = socketStatus ?? fetchedStatus ?? message.status;
    switch (status) {
      case "sending":
        return <LuClock4 size={12} className="animate-spin text-white" />;
      case "sent":
        return <LuCheck size={14} strokeWidth={3} className="text-gray-200" />;
      case "delivered":
        return (
          <LuCheckCheck size={14} strokeWidth={3} className="text-gray-200" />
        );
      case "read":
        return (
          <LuCheckCheck size={14} strokeWidth={3} className="text-blue-500" />
        );
      case "failed":
        return <LuCircleAlert size={12} className="text-red-500" />;
      default:
        return <LuClock4 size={12} className="animate-spin text-white" />;
    }
  };

  const groupedMessages = getValues(messages).reduce((acc, msg) => {
    const date = new Date(msg.sent_at_iso);
    const key = isToday(date)
      ? "Today"
      : isYesterday(date)
        ? "Yesterday"
        : format(date, "MMMM d, yyyy");
    acc[key] = acc[key] || [];
    acc[key].push(msg);
    return acc;
  }, {});

  const chat = useTranslations('chat');

  return (
    <div className="flex flex-col h-full w-full ">
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
          {isFetchingChats ? (
            <div className="p-3">
              <SlickSpinner size={16} color="white" />
            </div>
          ) : (
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
                {isRecipientOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white line-clamp-1">
                  {displayName}
                </h2>
                <p className="text-xs text-gray-500">
                  {isRecipientTyping
                    ? chat('typing')
                    : isRecipientOnline
                      ? chat('online')
                      : `${chat('last_seen')} ${recipient?.user?.last_active_at
                        ? recipient.user?.last_active_at
                        : chat('recently')
                      }`}
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <LuPhoneOff className="text-gray-500 text-[16px] cursor-not-allowed" />
            <LuVideoOff className="text-gray-500 text-[16px] cursor-not-allowed" />
            {currentChatId !== "preview" && (
              <Dropdown
                arrow
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: deleteChatMutation.isLoading
                        ? chat('deleting')
                        : chat('delete_chat'),
                      onClick: () =>
                        currentChatId &&
                        !isPreviewChat &&
                        deleteChatMutation.mutate(),
                      disabled: deleteChatMutation.isLoading,
                    },
                    {
                      key: "archive",
                      label: chat('archive'),
                      onClick: () =>
                        console.log("Archive chat:", currentChatId),
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
          <div className="shadow-xl rounded-full p-1 w-8 h-8 bg-[#001840] flex items-center justify-center">
            <SlickSpinner size={24} color="white" />
          </div>
        </div>
      ) : getValues(groupedMessages).length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full w-full text-gray-500">
          <div className="text-2xl text-center">{chat('no_messages_yet')}</div>
          <div className="text-center text-sm">
            {chat('start_conversation')}
          </div>
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-4 space-y-3 overflow-x-clip"
        >
          {getEntries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 text-xs rounded-full text-gray-600">
                  {date}
                </span>
              </div>
              {msgs.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    "flex my-3",
                    isSender(message.sender_id)
                      ? "justify-end"
                      : "justify-start"
                  )}
                >
                  {message.sender_id !== user?.id && (
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
                      className={clsx(
                        "text-[10px] text-gray-600 mb-[1px] pr-2",
                        { "self-end": isSender(message.sender_id) }
                      )}
                    >
                      {getSenderName(message.sender_id)}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-2xl w-full ${isSender(message.sender_id)
                        ? "text-white bg-[#001840] rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                        }`}
                    >
                      <div className="flex flex-wrap items-end gap-x-2">
                        <p className="text-xs flex-1 min-w-0 whitespace-normal break-words">
                          {message.content}
                        </p>
                        <div
                          className={`text-[8px] shrink-0 whitespace-nowrap flex gap-2 items-end justify-center ml-2 ${isSender(message.sender_id)
                            ? "text-gray-100"
                            : "text-gray-500"
                            }`}
                        >
                          {message.sent_at} {renderTicks(message)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
      <form
        onSubmit={handleSendMessage}
        className="p-2 md:p-3 border-t bg-white sticky bottom-0 inset-x-0"
      >
        <div className="flex items-center gap-2 rounded-full p-1 bg-gray-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <LuPaperclip className="cursor-not-allowed ml-2 text-gray-400 transition-colors" />
          <input
            value={newMessage}
            onChange={handleTyping}
            placeholder={chat('type_a_message')}
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

// const ChatHeaderSkeleton = ({ TEXT_COLOR, MAIN_COLOR, isSmallScreen }) => (
//   <div className={`p-1 md:p-3 flex items-center text-[${TEXT_COLOR}] bg-white`}>
//     {isSmallScreen && (
//       <Skeleton.Button active size="small" shape="circle" className="mr-3" />
//     )}
//     <div className="flex justify-between items-center w-full">
//       <div className="flex items-center gap-3">
//         <div>
//           <Skeleton.Avatar active size={48} shape="circle" />
//         </div>
//         <div className="flex gap-3">
//           <Skeleton.Input
//             active
//             size="small"
//             style={{ width: 120, color: "white" }}
//           />
//           <Skeleton.Input
//             active
//             size="small"
//             style={{ width: 80, height: 12, marginTop: 4 }}
//           />
//         </div>
//       </div>
//       <div className="flex gap-3 items-center">
//         <Skeleton.Button active size="small" shape="circle" />
//         <Skeleton.Button active size="small" shape="circle" />
//         <Skeleton.Button active size="small" shape="circle" />
//       </div>
//     </div>
//   </div>
// );

export { RenderChat };
