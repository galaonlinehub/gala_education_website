import { RenderChat } from "./ChatBody";
import { RenderSidebar } from "./ChatSidebar";
import useChatStore from "@/src/store/chat/chat";
import { useDevice } from "@/src/hooks/useDevice";
import { useChat } from "@/src/hooks/useChat";
import { LuSendHorizontal } from "react-icons/lu";
import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

const Chat = () => {
  const MAIN_COLOR = "#001840";
  const MAIN_COLOR_LIGHT = "#0c2b5e";
  const TEXT_COLOR = "#f8f9fa";

  const { currentChatId } = useChatStore();
  const { chats, isFetchingChats } = useChat();
  const { width } = useDevice();
  const isSmallScreen = width <= 768;
  const hasChats = chats && chats.length > 0;

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
          Your Messages
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          You don&apos;t have any conversations yet. Start a new one to chat
          with your classmates and teachers.
        </p>
      </div>
    </div>
  );

  const SidebarSkeleton = () => (
    <div className="w-full flex items-center gap-2 p-6 h-16">
      <Skeleton.Avatar active size={40} shape="circle" />
      <Skeleton.Button active className="!w-full" />
    </div>
  );
  return (
    <div className="w-full md:shadow-md mt-2 -mx-2 md:mt-14 md:rounded-md md:border">
      <div className="md:h-[650px] h-[680px] w-full">
        {/* Large Screen Layout */}
        {!isSmallScreen && (
          <div className="flex h-full">
            {isFetchingChats ? (
              <div className="w-1/3 border-r flex flex-col h-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarSkeleton key={i} />
                ))}
              </div>
            ) : hasChats ? (
              <div className="w-1/3 border-r border-gray-200">
                <RenderSidebar
                  MAIN_COLOR={MAIN_COLOR}
                  TEXT_COLOR={TEXT_COLOR}
                />
              </div>
            ) : (
              <div className="w-1/3 border-r border-gray-200">
                <NoChatsMessage />
              </div>
            )}
            <div className="w-2/3 h-full">
              {isFetchingChats ? (
                <LoadingOutlined className="text-2xl animate-spin" />
              ) : currentChatId !== null && hasChats ? (
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

        {/* Small Screen Layout */}
        {isSmallScreen && (
          <div className="h-full">
            {isFetchingChats ? (
              <LoadingOutlined className="text-2xl animate-spin" />
            ) : currentChatId !== null && hasChats ? (
              <RenderChat
                isSmallScreen={true}
                MAIN_COLOR={MAIN_COLOR}
                TEXT_COLOR={TEXT_COLOR}
                MAIN_COLOR_LIGHT={MAIN_COLOR_LIGHT}
              />
            ) : hasChats ? (
              <RenderSidebar MAIN_COLOR={MAIN_COLOR} TEXT_COLOR={TEXT_COLOR} />
            ) : (
              <NoChatsMessage />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Chat };
