import React, { useState,useEffect,useRef } from 'react';
import { FaPlane, FaRegPaperPlane } from 'react-icons/fa';

export const ChatSection = ({ socketRef, roomId, sender,messages,setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  
  const messagesEndRef = useRef(null);



useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }
}, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current?.emit('message', {
        roomId,
        message: newMessage,
        userName:sender.first_name + " " + sender.last_name
      });
      
      setMessages(prev => [...prev, {message:newMessage,sender:sender.first_name + " " + sender.last_name}]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full relative py-2">
      <div ref={messagesEndRef} className=" overflow-y-auto h-[60vh] ">
        {messages.map(({sender:senderName,message}, idx) => (
          <div key={idx} className="mb-2 flex flex-col items-start">
            <span className={`text-xs ${senderName == sender.first_name + " " + sender.last_name ? "bg-green-300 text-green-800" :"bg-blue-300 text-blue-800"} px-2 py-1 rounded`}>
              {senderName} 
            </span>
            <span className={"text-[#d0d0d0]"}>
               {message}</span>
          </div>
        ))}
        {/* <div ref={messagesEndRef} /> */}
      </div>
      <div className="flex gap-2 h-5[vh]   bottom-0 border-t-[1px] border-gray-800 w-full ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-4 py-2 focus:outline-none focus:border-none  bg-transparent placeholder:text-white border-b-[1px] border-gray-200 text-white "
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 h-8 w-12 bg-blue-500 text-white rounded-md"
        >
          <FaRegPaperPlane className={'text-md'} />
        </button>
      </div>
    </div>
  );
};