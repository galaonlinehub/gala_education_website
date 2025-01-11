import React, { useEffect, useRef, useCallback } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import useUser from "@/src/store/auth/user";

const Notification = ({ showNotification }) => {
  const [api, contextHolder] = notification.useNotification();
  const hasShownNotification = useRef(false);
  const { user } = useUser();

  const openNotification = useCallback(() => {
    api.open({
      message: (
        <span className="!text-xs !font-thin !text-gray-800">
          Welcome, {user?.first_name}
        </span>
      ),
      description: (
        <p className="!text-xs !text-gray-600">
          You have successfully logged in.
        </p>
      ),
      style: {
        height: "80px",
        padding: "10px",
        borderRadius: "0.375rem",
      },
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
            fontSize: "18px",
          }}
        />
      ),
    });
  }, [api, user]);

  useEffect(() => {
    if (showNotification && !hasShownNotification.current) {
      openNotification();
      hasShownNotification.current = true;
    }
  }, [showNotification, openNotification]);

  return <>{contextHolder}</>;
};

export default Notification;