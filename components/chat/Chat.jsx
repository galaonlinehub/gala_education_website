import { useTranslations } from "next-intl";
import { LuSendHorizontal } from "react-icons/lu";

import { useDevice } from "@/hooks/misc/useDevice";
import useChatStore from "@/store/chat/chat";

import { RenderChat } from "./ChatBody";
import { RenderSidebar } from "./ChatSidebar";

const Chat = () => {
  const MAIN_COLOR = "#001840";
  const MAIN_COLOR_LIGHT = "#0c2b5e";
  const TEXT_COLOR = "#f8f9fa";
  const { currentChatId } = useChatStore();
  const { width } = useDevice();
  const isSmallScreen = width <= 768;

  const chat = useTranslations('chat');

  const NoChatsMessage = () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center p-6">
        <div
          className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(0, 24, 64, 0.1)" }}
        >
          <LuSendHorizontal className={`text-[32px] text-[${MAIN_COLOR}]`} />
        </div>
        <h3 className={`text-lg font-semibold mb-2 text-[${MAIN_COLOR}]`}>
          {chat('your_messages')}
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          {chat('no_conversations_yet')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full md:shadow-md mt-2 md:mt-4 md:rounded-md md:border flex items-center justify-center">
      <div className="md:h-[650px] h-[calc(100vh-105px)] w-full">
        {!isSmallScreen && (
          <div className="flex h-full">
            <div className="w-1/3 border-r border-gray-200">
              <RenderSidebar
                MAIN_COLOR={MAIN_COLOR}
                TEXT_COLOR={TEXT_COLOR}
                currentTab="direct"
                setCurrentTab={() => { }}
              />
            </div>
            <div className="w-2/3 h-full">
              {currentChatId !== null ? (
                <RenderChat
                  isSmallScreen={false}
                  MAIN_COLOR={MAIN_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                  MAIN_COLOR_LIGHT={MAIN_COLOR_LIGHT}
                />
              ) : (
                <NoChatsMessage />
              )}
            </div>
          </div>
        )}
        {isSmallScreen && (
          <div className="h-full w-full">
            {currentChatId !== null ? (
              <RenderChat
                isSmallScreen={true}
                MAIN_COLOR={MAIN_COLOR}
                TEXT_COLOR={TEXT_COLOR}
                MAIN_COLOR_LIGHT={MAIN_COLOR_LIGHT}
              />
            ) : (
              <RenderSidebar
                MAIN_COLOR={MAIN_COLOR}
                TEXT_COLOR={TEXT_COLOR}
                currentTab="direct"
                setCurrentTab={() => { }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Chat };
