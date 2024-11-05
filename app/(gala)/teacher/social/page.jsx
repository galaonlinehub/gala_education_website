"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Input, Tooltip } from "antd";
import { PaperClipOutlined, SmileOutlined, AudioOutlined, SendOutlined } from "@ant-design/icons";

const TeacherSocial = () => {
  const [currentTab, setCurrentTab] = useState("direct");
  const [searchValue, setSearchValue] = useState("");
  const [clickedUserIndex, setClickedUserIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const users = [
    { name: "Sarah Mwangi", message: "Hi, just confirming the meeting time" },
    { name: "Peter Kimaro", message: "Can I reschedule my appointment for next week?" },
    { name: "Aisha Hassan", message: "Thank you, I received the document you sent" },
    { name: "David Mutua", message: "When is the next class scheduled?" },
    { name: "Leah Nyambura", message: "Do we have homework for tomorrow?" },
    { name: "James Banda", message: "I'm having trouble with the math assignment" },
  ];

  const notifications = [
    { name: "@Sara Mwangi", head: "Reminder", msg: "Check if class contents for tomorrow are uploaded." },
    { name: "@Peter Kimaro", head: "Assignment", msg: "Math homework due in 2 days." },
    { name: "@Aisha Hassan", head: "Event", msg: "Science fair next week. Prepare your projects." },
    { name: "@David Mutua", head: "Exam", msg: "English test scheduled for Friday." },
    { name: "@Leah Nyambura", head: "Meeting", msg: "Parent-teacher conference on Monday." },
    { name: "@James Banda", head: "Update", msg: "New study materials available in the library." },
  ];

  const onlineUsers = [
    { name: "Sarah Mwangi", status: "Online" },
    { name: "Peter Kimaro", status: "Online" },
    { name: "Aisha Hassan", status: "Online" },
    { name: "David Mutua", status: "Online" },
    { name: "Leah Nyambura", status: "Online" },
  ];

  const viewOnClickedUser = (index) => {
    setClickedUserIndex(index);
    setMessages([
      { text: "Hello! How can I help you today?", sender: users[index].name },
      { text: "Hi! I wanted to ask about the upcoming exam.", sender: "You" },
      { text: "Sure, what would you like to know?", sender: users[index].name },
      { text: "When is it scheduled?", sender: "You" },
      { text: "The exam is scheduled for next Friday at 10 AM.", sender: users[index].name },
      { text: "Thank you! Is there anything specific I should prepare?", sender: "You" },
      { text: "Focus on chapters 5-8 and review the practice questions we did in class.", sender: users[index].name },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "You" }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "Thanks for your message! I'll get back to you soon.", sender: users[clickedUserIndex].name }]);
      }, 1000);
    }
  };

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const renderContent = () => {
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()) || user.message.toLowerCase().includes(searchValue.toLowerCase()));

    return filteredUsers.map((item, index) => (
      <div key={index} onClick={() => viewOnClickedUser(index)} className={`p-3 mb-3 shadow-md flex cursor-pointer gap-2 rounded-lg ${clickedUserIndex === index ? "bg-[#001840] text-white" : "bg-white"}`}>
        <Image className="rounded-full" src="/necklace.png" alt="avatar" width={32} height={32} />
        <div className="flex flex-col flex-grow">
          <div className="text-sm font-bold truncate">{item.name}</div>
          <div className="text-xs truncate text-gray-400">{item.message}</div>
        </div>
      </div>
    ));
  };

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="bg-green-400 p-4 text-white font-bold flex items-center">
        {isSmallScreen && (
          <button onClick={() => setClickedUserIndex(null)} className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h2>{users[clickedUserIndex].name}</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg ${message.sender === "You" ? "bg-blue-100 ml-auto" : "bg-gray-100"} max-w-[70%]`}>
            <p className="font-bold text-xs">{message.sender}</p>
            <p className="text-sm">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <Tooltip title="Attach file">
            <Button icon={<PaperClipOutlined />} onClick={handleAttachment} />
          </Tooltip>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-grow" />
          <Tooltip title="Emoji">
            <Button icon={<SmileOutlined />} />
          </Tooltip>
          <Tooltip title="Voice message">
            <Button icon={<AudioOutlined />} />
          </Tooltip>
          <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden h-[600px]">
            {(!isSmallScreen || clickedUserIndex === null) && (
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 p-4 border-r border-gray-300">
                  <h2 className="font-bold text-lg mb-4">Chats</h2>
                  <div className="flex justify-between mb-4">
                    {["Direct", "Groups", "Public"].map((tab) => (
                      <button key={tab} onClick={() => setCurrentTab(tab.toLowerCase())} className={`px-3 py-1 rounded ${currentTab === tab.toLowerCase() ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <input type="text" placeholder="Search" value={searchValue} onChange={handleChange} className="w-full p-2 pl-8 border rounded-full" />
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <div className="overflow-y-auto h-96">{renderContent()}</div>
                </div>
                <div className="w-full md:w-2/3">
                  {clickedUserIndex !== null ? (
                    renderChat()
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-gray-500">Select a chat to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {isSmallScreen && clickedUserIndex !== null && renderChat()}
          </div>
        </div>

        {(!isSmallScreen || clickedUserIndex === null) && (
          <div className="w-full lg:w-1/3">
            <div className="bg-[#001840] rounded-xl p-6">
              <h2 className="text-white text-lg font-bold mb-4">Notifications</h2>
              <div className="space-y-4 mb-8">
                {notifications.map((item, index) => (
                  <div key={index} className="bg-white rounded-md p-3 flex items-start gap-3">
                    <Image className="rounded-full" src="/necklace.png" alt="avatar" width={32} height={32} />
                    <div>
                      <p className="text-blue-600 text-sm font-bold">{item.name}</p>
                      <p className="text-xs font-bold">{item.head}</p>
                      <p className="text-xs">{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-white text-lg font-bold mb-4">Online Users</h2>
              <div className="space-y-4">
                {onlineUsers.map((item, index) => (
                  <div key={index} className="bg-white rounded-md p-3 flex items-center gap-3">
                    <Image className="rounded-full" src="/necklace.png" alt="avatar" width={32} height={32} />
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-green-500">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherSocial;
