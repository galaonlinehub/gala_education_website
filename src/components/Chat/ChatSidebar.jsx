import { useState } from "react";
import { Avatar, Input, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useChat } from "@/src/hooks/useChat";
import { img_base_url } from "@/src/config/settings";
import useChatStore from "@/src/store/chat/chat";
import { LuUser, LuMessagesSquare } from "react-icons/lu";
import { useUser } from "@/src/hooks/useUser";
import clsx from "clsx";

const RenderSidebar = ({ currentTab, setCurrentTab, MAIN_COLOR }) => {
  const [searchValue, setSearchValue] = useState("");
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { chats, isFetchingChats } = useChat();
  const { user } = useUser();
  console.log(chats, "IN SIDEBR OF CHATS")
  const hasChats = chats && chats.length > 0;

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const viewOnClickedUser = (idx) => {
    setCurrentChatId(idx);
  };

  const ChatSkeleton = () => (
    <div className="w-full flex items-center gap-1 p-6 h-16">
      <Skeleton.Avatar active size={40} shape="circle" />
      <Skeleton.Button active className="!w-full" />
    </div>
  );

  const NoChat = () => (
    <div className="flex flex-col items-center mt-24 h-full ">
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
      <div className="relative mb-4">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search conversations"
          value={searchValue}
          onChange={handleChange}
          className="rounded-lg py-2 border-gray-200"
        />
      </div>
      <div className="flex flex-col overflow-y-auto h-[450px]">
        {isFetchingChats ? (
          Array.from({ length: 5 }).map((_, i) => <ChatSkeleton key={i} />)
        ) : hasChats ? (
          chats
            .filter((chat) =>
              chat.participants.some(
                (participant) =>
                  participant.user.first_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  participant.user.last_name
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
                  {/* Avatars */}
                  {participantsData.map((participant) => (
                    <div key={participant.id} className="relative mr-3">
                      <Avatar
                        src={participant.profilePicture}
                        alt={participant.email}
                        size={52}
                        icon={<LuUser className="text-black" />}
                      />
                      {participant.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  ))}
                  {/* Names and Message */}
                  <div className="flex-grow overflow-hidden pr-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm w-3/4 line-clamp-1">
                        {participantsData.map((p) => p.fullName).join(", ")}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {chat?.last_message?.sent_at}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate first-letter:uppercase">
                      {chat?.last_message?.content}
                    </p>
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
