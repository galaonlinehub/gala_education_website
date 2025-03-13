import { useEffect, useState } from "react";
import { Avatar, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useChat } from "@/src/hooks/useChat";
import { img_base_url, PREVIEW_CHAT_KEY } from "@/src/config/settings";
import useChatStore from "@/src/store/chat/chat";


const RenderSidebar = ({ currentTab, setCurrentTab, MAIN_COLOR }) => {
  const [searchValue, setSearchValue] = useState("");
  const { currentChatId, setCurrentChatId } = useChatStore();
  const { sendMessage, chats, preparePayLoad, messages } = useChat();
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const viewOnClickedUser = (idx) => {
    setCurrentChatId(idx);
  };


  return (
    <div className="p-4 h-full">
      <h2 className={`font-bold text-lg text-[${MAIN_COLOR}]`}>Messages</h2>
      <div className="flex justify-between gap-2 mb-4">
        {["Direct", "Groups", "Public"].map((tab) => (
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
        {chats?.length > 0 &&
          chats
            .filter((chat) => {
              return chat.participants.some(
                (participant) =>
                  participant.user.first_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  participant.user.last_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              );
            })
            .map((chat, _) => (
              <div
                key={chat.id}
                onClick={() => viewOnClickedUser(chat.id)}
                className={`p-3 mb-2 transition-all duration-200 flex items-center cursor-pointer rounded-xl ${
                  currentChatId === chat.id
                    ? "bg-opacity-20 bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                style={{
                  borderLeft:
                    currentChatId === chat.id
                      ? `3px solid ${MAIN_COLOR}`
                      : "none",
                  backgroundColor:
                    currentChatId === chat.id
                      ? "rgba(0, 24, 64, 0.08)"
                      : "transparent",
                }}
              >
                {chat.participants.map((participant, _) => (
                  <div key={participant.user.id} className="relative mr-3">
                    <Avatar
                      src={`${img_base_url}${participant.user.profile_picture}`}
                      alt={participant.user.email}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    {participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                ))}
                <div className="flex-grow overflow-hidden pr-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">
                      {chat.participants
                        .map(
                          (participant) =>
                            `${participant.user.first_name} ${participant.user.last_name}`
                        )
                        .join(", ")}
                    </span>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export { RenderSidebar };
