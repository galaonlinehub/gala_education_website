// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button, Input, Tooltip } from "antd";
// import {
//   PaperClipOutlined,
//   SmileOutlined,
//   AudioOutlined,
//   SendOutlined,
//   VideoCameraOutlined,
//   PhoneOutlined,
//   EllipsisOutlined,
// } from "@ant-design/icons";

// const StudentSocial = () => {
//   const [currentTab, setCurrentTab] = useState("direct");
//   const [searchValue, setSearchValue] = useState("");
//   const [clickedUserIndex, setClickedUserIndex] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const handleAttachment = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log("File selected:", file.name);
//     }
//   };

//   const handleEmojiButtonClick = (e) => {
//     e.preventDefault();
//     const input = document.createElement("input");
//     input.setAttribute("type", "text");
//     input.setAttribute("inputmode", "none");
//     input.classList.add("emoji-input");
//     input.style.position = "fixed";
//     input.style.opacity = "0";
//     input.style.pointerEvents = "none";
//     document.body.appendChild(input);

//     input.addEventListener("input", (event) => {
//       if (event.data) {
//         setNewMessage((prev) => prev + event.data);
//       }
//       input.remove();
//     });

//     input.focus();
//   };

//   const users = [
//     { name: "Sarah Mwangi", message: "Hi, just confirming the meeting time" },
//     {
//       name: "Peter Kimaro",
//       message: "Can I reschedule my appointment for next week?",
//     },
//     {
//       name: "Aisha Hassan",
//       message: "Thank you, I received the document you sent",
//     },
//     { name: "David Mutua", message: "When is the next class scheduled?" },
//     { name: "Leah Nyambura", message: "Do we have homework for tomorrow?" },
//     {
//       name: "James Banda",
//       message: "I'm having trouble with the math assignment",
//     },
//   ];

//   const notifications = [
//     {
//       name: "@Sara Mwangi",
//       head: "Reminder",
//       msg: "Check if class contents for tomorrow are uploaded.",
//     },
//     {
//       name: "@Peter Kimaro",
//       head: "Assignment",
//       msg: "Math homework due in 2 days.",
//     },
//     {
//       name: "@Aisha Hassan",
//       head: "Event",
//       msg: "Science fair next week. Prepare your projects.",
//     },
//     {
//       name: "@David Mutua",
//       head: "Exam",
//       msg: "English test scheduled for Friday.",
//     },
//     {
//       name: "@Leah Nyambura",
//       head: "Meeting",
//       msg: "Parent-teacher conference on Monday.",
//     },
//     {
//       name: "@James Banda",
//       head: "Update",
//       msg: "New study materials available in the library.",
//     },
//   ];

//   const onlineUsers = [
//     { name: "Sarah Mwangi", status: "Online" },
//     { name: "Peter Kimaro", status: "Online" },
//     { name: "Aisha Hassan", status: "Online" },
//     { name: "David Mutua", status: "Online" },
//     { name: "Leah Nyambura", status: "Online" },
//   ];

//   const viewOnClickedUser = (index) => {
//     setClickedUserIndex(index);
//     setMessages([
//       { text: "Hello! How can I help you today?", sender: users[index].name },
//       { text: "Hi! I wanted to ask about the upcoming exam.", sender: "You" },
//       { text: "Sure, what would you like to know?", sender: users[index].name },
//       { text: "When is it scheduled?", sender: "You" },
//       {
//         text: "The exam is scheduled for next Friday at 10 AM.",
//         sender: users[index].name,
//       },
//       {
//         text: "Thank you! Is there anything specific I should prepare?",
//         sender: "You",
//       },
//       {
//         text: "Focus on chapters 5-8 and review the practice questions we did in class.",
//         sender: users[index].name,
//       },
//     ]);
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() !== "") {
//       setMessages([...messages, { text: newMessage, sender: "You" }]);
//       setNewMessage("");
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             text: "Thanks for your message! I'll get back to you soon.",
//             sender: users[clickedUserIndex].name,
//           },
//         ]);
//       }, 1000);
//     }
//   };

//   const renderContent = () => {
//     const filteredUsers = users.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
//         user.message.toLowerCase().includes(searchValue.toLowerCase())
//     );

//     return filteredUsers.map((item, index) => (
//       <div
//         key={index}
//         onClick={() => viewOnClickedUser(index)}
//         className={`p-2 mb-3 bg-[#001840] border flex items-center cursor-pointer rounded-lg ${
//           clickedUserIndex === index ? "bg-[#001840] text-white" : "bg-white"
//         }`}
//       >
//         <div className="flex pr-3">
//           <Image
//             src="/necklace.png"
//             alt="avatar"
//             width={100}
//             height={100}
//             className="w-8 h-8 object-cover rounded-full"
//           />
//         </div>

//         <div className="flex flex-col basis-5/6 flex-grow overflow-hidden">
//           <div className="text-xs font-bold truncate">{item.name}</div>
//           <div className="text-xs truncate text-gray-400">{item.message}</div>
//         </div>
//       </div>
//     ));
//   };

//   const renderChat = () => (
//     <div className="flex flex-col h-full">
//       <div className="bg-gray-200 p-2 text-black font-bold flex items-center">
//         {isSmallScreen && (
//           <button onClick={() => setClickedUserIndex(null)} className="mr-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//         )}
//         <div className="flex justify-between w-full">
//           <div className="flex gap-2">
//             <div className="flex items-center justify-center">
//               <Image
//                 src="/necklace.png"
//                 alt="avatar"
//                 width={80}
//                 height={80}
//                 className="w-8 h-8 object-cover rounded-full"
//               />
//             </div>
//             <div className="flex flex-col">
//               <h2 style={{ fontSize: "10px" }}>
//                 {users[clickedUserIndex].name}{" "}
//               </h2>
//               <h2 style={{ fontSize: "8px" }} className=" text-gray-400">
//                 Last seen: 3 hours ago
//               </h2>
//             </div>
//           </div>
//           <div className="flex gap-3"></div>
//         </div>
//       </div>
//       <div className="flex-grow overflow-y-auto p-4 space-y-2">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg w-fit ${
//               message.sender === "You"
//                 ? "bg-[#070B65] ml-auto text-right"
//                 : "bg-[#8E8C90]"
//             }`}
//           >
//             {/* <p className="font-bold text-xs">{message.sender}</p> */}
//             <p className="text-xs text-white">{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className="p-4 bg-white border-t">
//         <div className="flex items-center gap-2">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message here..."
//             className="flex-grow"
//           />
//           <Tooltip title="Emoji">
//             <Button
//               icon={<SmileOutlined />}
//               className="text-gray-500"
//               onClick={handleEmojiButtonClick}
//             />
//           </Tooltip>
//           <Button
//             type="primary"
//             icon={<SendOutlined />}
//             onClick={sendMessage}
//           />
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="w-full items-center px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="w-full flex">
//           <div className=" rounded-lg w-full overflow-hidden h-[600px]">
//             {(!isSmallScreen || clickedUserIndex === null) && (
//               <div className="flex flex-col w-full md:flex-row h-full">
//                 <div className="w-full md:w-1/3 p-4 pl-3 border-r  border-gray-300">
//                   <h2 className="font-bold text-sm mb-4">Chats</h2>
//                   <div className="flex justify-evenly gap-1 mb-4">
//                     {["Direct", "Groups", "Public"].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setCurrentTab(tab.toLowerCase())}
//                         className={`px-2 text-xs py-1 font-bold  items-center rounded ${
//                           currentTab === tab.toLowerCase()
//                             ? " text-white bg-[#001840]"
//                             : "text-white bg-gray-400"
//                         }`}
//                       >
//                         <span>{tab}</span>
//                       </button>
//                     ))}
//                   </div>
//                   <div className="relative mb-4">
//                     <Input
//                       type="text"
//                       placeholder="Search chats"
//                       value={searchValue}
//                       onChange={handleChange}
//                       className="w-full p-2 pl-8 text-xs border rounded-full"
//                     />
//                     <svg
//                       className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       ></path>
//                     </svg>
//                   </div>
//                   <div className="overflow-y-auto h-96">{renderContent()}</div>
//                 </div>
//                 <div className="w-full md:w-full">
//                   {clickedUserIndex !== null ? (
//                     renderChat()
//                   ) : (
//                     <div className="flex items-center justify-center h-full">
//                       <p className="text-center md:block hidden text-gray-500">
//                         Select a chat to start messaging
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {isSmallScreen && clickedUserIndex !== null && renderChat()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentSocial;

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input } from "antd";
import {
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  EllipsisOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const StudentSocial = () => {
  const [currentTab, setCurrentTab] = useState("direct");
  const [searchValue, setSearchValue] = useState("");
  const [clickedUserIndex, setClickedUserIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Main theme color
  const MAIN_COLOR = "#001840";
  const MAIN_COLOR_LIGHT = "#0c2b5e";
  const ACCENT_COLOR = "#4682B4";
  const TEXT_COLOR = "#f8f9fa";

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to bottom of messages when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
    {
      name: "Sarah Mwangi",
      message: "Hi, just confirming the meeting time",
      avatar: "/necklace.png",
      online: true,
      time: "2m ago",
    },
    {
      name: "Peter Kimaro",
      message: "Can I reschedule my appointment for next week?",
      avatar: "/necklace.png",
      online: true,
      time: "1h ago",
    },
    {
      name: "Aisha Hassan",
      message: "Thank you, I received the document you sent",
      avatar: "/necklace.png",
      online: true,
      time: "3h ago",
    },
    {
      name: "David Mutua",
      message: "When is the next class scheduled?",
      avatar: "/necklace.png",
      online: true,
      time: "5h ago",
    },
    {
      name: "Leah Nyambura",
      message: "Do we have homework for tomorrow?",
      avatar: "/necklace.png",
      online: false,
      time: "Yesterday",
    },
    {
      name: "James Banda",
      message: "I'm having trouble with the math assignment",
      avatar: "/necklace.png",
      online: false,
      time: "2d ago",
    },
  ];

  const viewOnClickedUser = (index) => {
    setClickedUserIndex(index);
    setMessages([
      {
        text: "Hello! How can I help you today?",
        sender: users[index].name,
        time: "10:05 AM",
      },
      {
        text: "Hi! I wanted to ask about the upcoming exam.",
        sender: "You",
        time: "10:06 AM",
      },
      {
        text: "Sure, what would you like to know?",
        sender: users[index].name,
        time: "10:07 AM",
      },
      { text: "When is it scheduled?", sender: "You", time: "10:07 AM" },
      {
        text: "The exam is scheduled for next Friday at 10 AM.",
        sender: users[index].name,
        time: "10:08 AM",
      },
      {
        text: "Thank you! Is there anything specific I should prepare?",
        sender: "You",
        time: "10:09 AM",
      },
      {
        text: "Focus on chapters 5-8 and review the practice questions we did in class.",
        sender: users[index].name,
        time: "10:10 AM",
      },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages([
        ...messages,
        { text: newMessage, sender: "You", time: timeString },
      ]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Thanks for your message! I'll get back to you soon.",
            sender: users[clickedUserIndex].name,
            time: timeString,
          },
        ]);
      }, 1000);
    }
  };

  const renderContent = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.message.toLowerCase().includes(searchValue.toLowerCase())
    );

    return filteredUsers.map((user, index) => (
      <div
        key={index}
        onClick={() => viewOnClickedUser(index)}
        className={`p-3 mb-2 transition-all duration-200 flex items-center cursor-pointer rounded-xl ${
          clickedUserIndex === index
            ? `bg-opacity-20 bg-blue-100 border-l-2 border-${MAIN_COLOR}`
            : "hover:bg-gray-50"
        }`}
        style={{
          borderLeft:
            clickedUserIndex === index ? `3px solid ${MAIN_COLOR}` : "none",
          backgroundColor:
            clickedUserIndex === index
              ? "rgba(0, 24, 64, 0.08)"
              : "transparent",
        }}
      >
        <div className="relative mr-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full"
          />
          {user.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        <div className="flex-grow overflow-hidden pr-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-sm">{user.name}</span>
            <span className="text-xs text-gray-400">{user.time}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{user.message}</p>
        </div>
      </div>
    ));
  };

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div
        className="p-3 flex items-center border-b"
        style={{ backgroundColor: MAIN_COLOR, color: TEXT_COLOR }}
      >
        {isSmallScreen && (
          <button
            onClick={() => setClickedUserIndex(null)}
            className="mr-3 hover:text-gray-300"
            style={{ color: TEXT_COLOR }}
          >
            <ArrowLeftOutlined />
          </button>
        )}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={users[clickedUserIndex].avatar}
                alt={users[clickedUserIndex].name}
                width={40}
                height={40}
                className="w-10 h-10 object-cover rounded-full"
              />
              {users[clickedUserIndex].online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-sm">
                {users[clickedUserIndex].name}
              </h2>
              <p className="text-xs opacity-75">
                {users[clickedUserIndex].online
                  ? "Online"
                  : "Last seen " + users[clickedUserIndex].time}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="hover:text-gray-300 transition-colors"
              style={{ color: TEXT_COLOR }}
            >
              <PhoneOutlined style={{ fontSize: "18px" }} />
            </button>
            <button
              className="hover:text-gray-300 transition-colors"
              style={{ color: TEXT_COLOR }}
            >
              <VideoCameraOutlined style={{ fontSize: "18px" }} />
            </button>
            <button
              className="hover:text-gray-300 transition-colors"
              style={{ color: TEXT_COLOR }}
            >
              <EllipsisOutlined style={{ fontSize: "18px" }} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-3"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center mb-4">
          <span
            className="inline-block px-3 py-1 text-xs rounded-full text-gray-600"
            style={{ backgroundColor: "rgba(0, 24, 64, 0.08)" }}
          >
            Today
          </span>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender !== "You" && (
              <div className="mr-2 self-end mb-1">
                <Image
                  src={users[clickedUserIndex].avatar}
                  alt={message.sender}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-cover rounded-full"
                />
              </div>
            )}

            <div className="flex flex-col max-w-[75%]">
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === "You"
                    ? "text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none"
                }`}
                style={{
                  backgroundColor:
                    message.sender === "You" ? MAIN_COLOR : "white",
                  boxShadow:
                    message.sender !== "You"
                      ? "0 1px 2px rgba(0, 0, 0, 0.05)"
                      : "none",
                }}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <span
                className={`text-xs mt-1 ${
                  message.sender === "You" ? "text-right" : ""
                } text-gray-500`}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-3 border-t bg-white">
        <div
          className="flex items-center gap-2 rounded-full p-2"
          style={{ backgroundColor: "rgba(0, 24, 64, 0.05)" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button
            type="button"
            onClick={handleAttachment}
            className="ml-2 text-gray-500 hover:text-blue-500 transition-colors"
            style={{ color: MAIN_COLOR_LIGHT }}
          >
            <PaperClipOutlined style={{ fontSize: "18px" }} />
          </button>

          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-transparent outline-none text-sm px-2"
          />

          <button
            type="button"
            onClick={handleEmojiButtonClick}
            className="text-gray-500 hover:text-blue-500 transition-colors"
            style={{ color: MAIN_COLOR_LIGHT }}
          >
            <SmileOutlined style={{ fontSize: "18px" }} />
          </button>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full text-white transition-colors`}
            style={{
              backgroundColor: newMessage.trim() ? MAIN_COLOR : "#ccc",
              color: newMessage.trim() ? "white" : "#666",
            }}
          >
            <SendOutlined style={{ fontSize: "16px" }} />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="w-full mt-14">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 ">
        <div className=" h-[700px] w-full">
          {(!isSmallScreen || clickedUserIndex === null) && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/3 border-r border-gray-200">
                <div className="p-4">
                  <h2
                    className="font-bold text-lg mb-4"
                    style={{ color: MAIN_COLOR }}
                  >
                    Messages
                  </h2>
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
                            currentTab === tab.toLowerCase()
                              ? MAIN_COLOR
                              : "#f1f1f1",
                          color:
                            currentTab === tab.toLowerCase() ? "white" : "#555",
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
                  <div className="overflow-y-auto h-[550px]">
                    {renderContent()}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 h-full">
                {clickedUserIndex !== null ? (
                  renderChat()
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50">
                    <div className="text-center p-6">
                      <div
                        className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: "rgba(0, 24, 64, 0.1)" }}
                      >
                        <SendOutlined
                          style={{ fontSize: "32px", color: MAIN_COLOR }}
                        />
                      </div>
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: MAIN_COLOR }}
                      >
                        Your Messages
                      </h3>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Select a conversation or start a new one to chat with
                        your classmates and teachers.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isSmallScreen && clickedUserIndex !== null && renderChat()}
        </div>
      </div>
    </div>
  );
};

export default StudentSocial;
