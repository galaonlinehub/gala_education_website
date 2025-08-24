import { Tooltip, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiWifi, BiWifiOff } from "react-icons/bi";

import { NetworkMessage } from "@/src/components/ui/NetworkMessage";
import { useUser } from "@/src/hooks/data/useUser";
import { useDevice } from "@/src/hooks/misc/useDevice";
import useNetwork from "@/src/hooks/misc/useNetwork";

export const useNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const { width } = useDevice();
  const { isOnline, connectionQuality } = useNetwork();
  const router = useRouter();

  const [showLanguage, setShowLanguage] = useState(false);
  const [language, setLanguage] = useState("english");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(false);
  const changeCondition = (checked) => {
    setCondition(checked);
  };

  const gotoHomePage = () => {
    router.push("/");
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-col items-center text-sm font-medium">
          English
        </div>
      ),
      onClick: () => {},
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col items-center text-sm px-3 font-medium">
          Swahili
        </div>
      ),
      onClick: () => {},
      disabled: true,
    },
  ];

  const confirm = () => {
    setOpen(false);
    message.success("English language chosen.");
  };
  const cancel = () => {
    setOpen(false);
    message.success("Swahili language chosen.");
  };
  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
    if (condition) {
      confirm();
    } else {
      setOpen(newOpen);
    }
  };

  const getIcon = () => {
    if (!isOnline) {
      return (
        <Tooltip
          placement="bottom"
          title={
            <NetworkMessage
              message={
                "You're offline. Please connect to Wi-Fi or enable mobile data."
              }
            />
          }
        >
          <BiWifiOff className="text-red-600 text-xl animate-bounce" />
        </Tooltip>
      );
    }
    switch (connectionQuality) {
      case "good":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={"Your internet connection is strong and stable."}
              />
            }
          >
            <BiWifi className="text-green-600 text-xl animate-pulse" />
          </Tooltip>
        );
      case "moderate":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={"Your connection is working but could be better."}
              />
            }
          >
            <BiWifi className="text-yellow-600 text-xl" />
          </Tooltip>
        );
      case "weak":
        return (
          <Tooltip
            placement="bottom"
            title={
              <NetworkMessage
                message={
                  "Your internet connection is weak and may be unstable."
                }
              />
            }
          >
            <BiWifi className="text-orange-600 text-xl animate-bounce" />
          </Tooltip>
        );
      default:
        return <BiWifi className="text-gray-600 text-xl" />;
    }
  };

  return {
    user,
    width,
    gotoHomePage,
    toggleSidebar,
    isSidebarOpen,
    getIcon,
    items,
    handleOpenChange,
    setIsSidebarOpen
  };
};
