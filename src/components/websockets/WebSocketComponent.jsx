'use client'; 

import { useState, useEffect } from 'react';
import useWebSocket from '@/src/hooks/useWebSocket';
import VideoConference from './video/VideoConference';

const WebSocketComponent = () => {
  const { socket, message } = useWebSocket();
  const [roomId, setRoomId] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('joinRoom', roomId, (response) => {
        console.log('Room join response:', response);
    });
      setIsJoined(true);
    }
  };
  
  

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', 'Hello, Server!');
      console.log("Message sent")
    }
  };

  return (
    <div className="">
      <h1>Join a live lesson</h1>
      
        <div>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <button onClick={joinRoom}>Join Lesson</button>
        </div>
      
    </div>
  );
};

export default WebSocketComponent;




// "use client"
// import useWebSocket from '@/src/hooks/useWebSocket'; 
// import axios from 'axios';

// export default function Home() {
//     // const { socket, message } = useWebSocket();

//     // const fetchMessages = async () => {
//     //     const response = await axios.get('http://localhost:8000/api/reminders', {
//     //         withCredentials: true,
//     //     });
//     //     console.log(response.data);
//     // };

//     // const sendMessage = () => {
//     //     socket.emit('message', 'Hello from Next.js!');
//     // };

//     return (
//         <div>
//             <h1>Real-Time Messaging</h1>
//             {/* <button onClick={fetchMessages}>Fetch Messages</button>
//             <button onClick={sendMessage}>Send Message</button>
//             {message && <p>Message: {message}</p>} */}
//         </div>
//     );
// }
