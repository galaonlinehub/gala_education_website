"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Input, Tooltip } from "antd";
import { PaperClipOutlined, SmileOutlined, AudioOutlined, SendOutlined, VideoCameraOutlined, PhoneOutlined, EllipsisOutlined } from "@ant-design/icons";

const InstructorSocial = () => {
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

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const handleEmojiButtonClick = (e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("inputmode", "none");
    input.classList.add("emoji-input");
    input.style.position = "fixed";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    document.body.appendChild(input);

    input.addEventListener("input", (event) => {
      if (event.data) {
        setNewMessage((prev) => prev + event.data);
      }
      input.remove();
    });

    input.focus();
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

  const renderContent = () => {
    const filteredUsers = users.filter((user) => user?.name.toLowerCase().includes(searchValue.toLowerCase()) || user.message.toLowerCase().includes(searchValue.toLowerCase()));

    return filteredUsers.map((item, index) => (
      <div key={index} onClick={() => viewOnClickedUser(index)} className={`p-2 mb-3 bg-[#001840] shadow-md flex items-center cursor-pointer rounded-lg ${clickedUserIndex === index ? "bg-[#001840] text-white" : "bg-white"}`}>
        <div className="flex pr-3">
          <Image src="/necklace.png" alt="avatar" width={100} height={100} className="w-8 h-8 object-cover rounded-full" />
        </div>

        <div className="flex flex-col basis-5/6 flex-grow overflow-hidden">
          <div className="text-xs font-bold truncate">{item.name}</div>
          <div className="text-xs truncate text-gray-400">{item.message}</div>
        </div>
      </div>
    ));
  };

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="bg-gray-200 p-2 text-black font-bold flex items-center">
        {isSmallScreen && (
          <button onClick={() => setClickedUserIndex(null)} className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Image src="/necklace.png" alt="avatar" width={80} height={80} className="w-8 h-8 object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <h2 style={{ fontSize: "10px" }}>{users[clickedUserIndex].name} </h2>
              <h2 style={{ fontSize: "8px" }} className=" text-gray-400">
                Last seen: 3 hours ago
              </h2>
            </div>
          </div>
          <div className="flex gap-3"></div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg w-fit ${message.sender === "You" ? "bg-[#070B65] ml-auto text-right" : "bg-[#8E8C90]"}`}>
            {/* <p className="font-bold text-xs">{message.sender}</p> */}
            <p className="text-xs text-white">{message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message here..." className="flex-grow" />
          <Tooltip title="Emoji">
            <Button icon={<SmileOutlined />} className="text-gray-500" onClick={handleEmojiButtonClick} />
          </Tooltip>
          <Button type="primary" icon={<SendOutlined />} onClick={sendMessage} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full items-center px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full flex">
          <div className=" rounded-lg shadow-md w-full overflow-hidden h-[600px]">
            {(!isSmallScreen || clickedUserIndex === null) && (
              <div className="flex flex-col w-full md:flex-row h-full">
                <div className="w-full md:w-1/3 p-4 pl-3 border-r  border-gray-300">
                  <h2 className="font-bold text-sm mb-4">Chats</h2>
                  <div className="flex justify-evenly gap-1 mb-4">
                    {["Direct", "Groups", "Public"].map((tab) => (
                      <button key={tab} onClick={() => setCurrentTab(tab.toLowerCase())} className={`px-2 text-xs py-1 font-bold  items-center rounded ${currentTab === tab.toLowerCase() ? " text-white bg-[#001840]" : "text-white bg-gray-400"}`}>
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-4">
                    <input type="text" placeholder="Search" value={searchValue} onChange={handleChange} className="w-full p-2 pl-8 text-xs border rounded-full" />
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <div className="overflow-y-auto h-96">{renderContent()}</div>
                </div>
                <div className="w-full md:w-full">
                  {clickedUserIndex !== null ? (
                    renderChat()
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center md:block hidden text-gray-500">Select a chat to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {isSmallScreen && clickedUserIndex !== null && renderChat()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSocial;
