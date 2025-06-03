import React, { useState, useEffect, useRef } from "react";
import { Input, Button, List, Avatar, Typography, Card, Badge, Divider, Space } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

export const ChatSection = ({ socketRef, roomId, sender, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const { Text } = Typography;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current?.emit("message", {
        roomId,
        message: newMessage,
        userName: sender.first_name + " " + sender.last_name,
      });

      setMessages((prev) => [
        ...prev,
        {
          message: newMessage,
          sender: sender.first_name + " " + sender.last_name,
        },
      ]);
      setNewMessage("");
    }
  };

  const isCurrentUser = (senderName) => {
    return senderName === `${sender.first_name} ${sender.last_name}`;
  };

  return (
    <Card variant={false} className="h-full flex flex-col" style={{ padding: 0 }}>
      <div
        ref={messagesEndRef}
        className="overflow-y-auto px-4 py-2"
        style={{
          height: "50vh",
          backgroundColor: "#f0f2f5",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={({ sender: senderName, message }, index) => {
            const isSelf = isCurrentUser(senderName);
            return (
              <List.Item
                key={index}
                style={{
                  display: "flex",
                  justifyContent: isSelf ? "flex-end" : "flex-start",
                  padding: "8px 0",
                  borderBottom: 'none'
                }}
              >
                <Space
                  direction="vertical"
                  size={0}
                  style={{
                    display: "flex",
                    alignItems: isSelf ? "flex-end" : "flex-start",
                  }}
                >
                  <Text className="text-xs text-blue-700 font-semibold">{senderName}</Text>
                  <div className="p-2 bg-[#dcdcdc] rounded-md w-full">
                    <Text>{message}</Text>
                  </div>
                </Space>
              </List.Item>
            );
          }}
        />
      </div>
      <div className="flex p-4 items-center" style={{ backgroundColor: "white" }}>
        <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onPressEnter={sendMessage} style={{ marginRight: 8 }} prefix={<UserOutlined style={{ color: "#bfbfbf" }} />} autoComplete="off" />
        <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} shape="circle" />
      </div>
    </Card>
  );
};
