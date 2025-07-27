import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Input, Skeleton } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { LuUser, LuMessagesSquare } from "react-icons/lu";

import { img_base_url } from "@/src/config/settings";
import { useChat } from "@/src/hooks/chat/useChat";
import { useUser } from "@/src/hooks/data/useUser";
import useChatStore from "@/src/store/chat/chat";



import SlickSpinner from "../ui/loading/template/SlickSpinner";

const RenderSidebar = ({ currentTab, setCurrentTab, MAIN_COLOR }) => {
  const [searchValue, setSearchValue] = useState("");
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { chats, isFetchingChats, sidebarTyping, unreadCounts } = useChat();
  const { user } = useUser();
  const hasChats = chats && chats.length > 0;

  const handleChange = (e) => setSearchValue(e.target.value);

  const viewOnClickedUser = (idx) => setCurrentChatId(idx);

  const NoChat = () => (
    <div className="flex flex-col items-center mt-24 h-full">
      <LuMessagesSquare className="w-12 h-12 mb-2 text-[#001840]" />
      <div className="text-center flex flex-col text-gray-500">
        <span className="text-xs">You have no chats yet</span>
        {user?.role === "student" && (
          <span className="text-xs">
            Start by messaging teachers by searching them through above search
            bar...!!
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-2 lg:p-4 h-full">
      <h2 className={`font-bold text-lg text-[${MAIN_COLOR}]`}>Messages</h2>
      <div className="flex justify-between gap-2 mb-4">
        {["Direct", "Groups"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab.toLowerCase())}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentTab === tab.toLowerCase()
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                currentTab === tab.toLowerCase() ? MAIN_COLOR : "#f1f1f1",
              color: currentTab === tab.toLowerCase() ? "white" : "#555",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {hasChats && (
        <div className="relative mb-4">
          <input
            placeholder="Search conversations..."
            value={searchValue}
            onChange={handleChange}
            className="rounded-md border border-gray-200 flex items-center justify-center focus:border-2 focus:border-[#001840] px-2 w-full p-1 placeholder:text-xs placeholder:px-1 outline-none "
          />
        </div>
      )}
      <div className="flex flex-col overflow-y-auto h-[450px]">
        {isFetchingChats ? (
          <div className="w-full flex justify-center pt-6">
            <SlickSpinner color="blue" strokeWidth={6} size={20} />
          </div>
        ) : hasChats ? (
          chats
            .filter((chat) =>
              chat.participants.some((participant) =>
                `${participant.user.first_name} ${participant.user.last_name}`
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
            )
            .map((chat) => {
              const participantsData = chat.participants.map((participant) => ({
                id: participant.user.id,
                fullName: `${participant.user.first_name} ${participant.user.last_name}`,
                profilePicture: `${img_base_url}${participant.user.profile_picture}`,
                email: participant.user.email,
                online: participant.online,
              }));
              const typingUsers = (sidebarTyping[chat.id] || []).filter(
                (id) => id !== user.id
              );
              const isTyping = typingUsers.length > 0;
              const unreadCount = unreadCounts[chat.id] || 0;

              return (
                <div
                  key={chat.id}
                  onClick={() => viewOnClickedUser(chat.id)}
                  className={clsx(
                    "p-3 mb-2 transition-all duration-200 flex items-center cursor-pointer rounded-xl",
                    currentChatId === chat.id
                      ? "bg-blue-100/20 border-l-4 border-l-[#001840]"
                      : "hover:bg-gray-50 border-l-0"
                  )}
                >
                  {participantsData.map((participant) => (
                    <div key={participant.id} className="relative mr-3">
                      <Avatar
                        src={participant.profilePicture}
                        alt={participant.email}
                        size={52}
                        icon={<LuUser className="text-black" />}
                        className="border-2 border-[#001840]"
                      />
                      {participant.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  ))}
                  <div className="flex-grow overflow-hidden pr-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm w-3/4 line-clamp-1">
                        {participantsData.map((p) => p.fullName).join(", ")}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {chat?.last_message?.sent_at}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate">
                        {isTyping
                          ? "Typing..."
                          : chat?.last_message?.content || "No messages yet"}
                      </p>
                      {unreadCount > 0 && (
                        <span className="bg-[#001840]  text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <NoChat />
        )}
      </div>
    </div>
  );
};

export { RenderSidebar };
