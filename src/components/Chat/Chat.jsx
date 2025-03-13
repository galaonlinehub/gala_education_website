import { useState, useEffect, useRef } from "react";
import { SendOutlined } from "@ant-design/icons";
import { RenderChat } from "./ChatBody";
import { RenderSidebar } from "./ChatSidebar";
import { useChat } from "@/src/hooks/useChat";
import useChatStore from "@/src/store/chat/chat";

const Chat = () => {
  const MAIN_COLOR = "#001840";
  const MAIN_COLOR_LIGHT = "#0c2b5e";
  const ACCENT_COLOR = "#4682B4";
  const TEXT_COLOR = "#f8f9fa";

  const [currentTab, setCurrentTab] = useState("direct");
  const { currentChatId, setCurrentChatId } = useChatStore();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { users } = useChat();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full lg:mt-14 shadow-md rounded-md">
      <div className="h-[630px] w-full">
        {(!isSmallScreen || currentChatId === null) && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <RenderSidebar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                MAIN_COLOR={MAIN_COLOR}
                users={users}
                currentChatId={currentChatId}
                setCurrentChatId={setCurrentChatId}
              />
            </div>
            <div className="w-full md:w-2/3 h-full">
              {currentChatId !== null ? (
                <RenderChat
                  users={users}
                  currentChatId={currentChatId}
                  setCurrentChatId={setCurrentChatId}
                  isSmallScreen={isSmallScreen}
                  MAIN_COLOR={MAIN_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                  MAIN_COLOR_LIGHT={MAIN_COLOR_LIGHT}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50">
                  <div className="text-center p-6">
                    <div
                      className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(0, 24, 64, 0.1)" }}
                    >
                      <SendOutlined
                        className={`text-[${MAIN_COLOR}] text-[32px]`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold mb-2 text-[${MAIN_COLOR}]`}
                    >
                      Your Messages
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                      Select a conversation or start a new one to chat with your
                      classmates and teachers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {isSmallScreen && currentChatId !== null && (
          <RenderChat
            users={users}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            isSmallScreen={isSmallScreen}
            MAIN_COLOR={MAIN_COLOR}
            TEXT_COLOR={TEXT_COLOR}
            MAIN_COLOR_LIGHT={MAIN_COLOR_LIGHT}
          />
        )}
      </div>
    </div>
  );
};

export { Chat };
