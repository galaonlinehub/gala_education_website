"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { decrypt } from "@/src/utils/constants/encryption";
import useUser from "@/src/store/auth/user";

const VideoConference = ({ roomId }) => {
    const [localStream, setLocalStream] = useState(null);
    const [peers, setPeers] = useState({});
    const [isRoomCreator, setIsRoomCreator] = useState(false);
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    


    const localVideoRef = useRef(null);
    const peersRef = useRef({});
    const socketRef = useRef(null);

    const createPeer = useCallback(
        (userId, stream, isInitiator) => {
            const peer = new Peer({
                initiator: isInitiator,
                trickle: false,
                stream: stream,
            });

            peer.on("signal", (signalData) => {
                socketRef.current.emit("offer", {
                    roomId,
                    offer: signalData,
                    targetUserId: userId,
                });
            });

            peer.on("stream", (remoteStream) => {
                setPeers((prev) => ({
                    ...prev,
                    [userId]: remoteStream,
                }));
            });

            return peer;
        },
        [roomId]
    );

    const sendMessage = () => {
        if (message.trim()) {
            socketRef.current.emit("chatMessage", { roomId, message });
            setChatMessages((prev) => [...prev, { userId: "You", message }]);
            setMessage("");
        }
    };

    const getToken = ()=>{

        const encryptedToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d");
  
    if (!encryptedToken) {
      console.error("No token found in cookies");
      return null;
    }
  
    try {
      const decryptedToken = decrypt(encryptedToken);
      console.log("Decrypted Token:", decryptedToken);
      return decryptedToken;
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
    }

    useEffect(() => {
        const token = getToken();
        console.log("The token in the signaling is", token);
    
        const socket = io("http://localhost:3001/signaling", {
            query: { token: token },
        });
        socketRef.current = socket;
    
        socket.on('connect', () => {
            console.log('Connected to Signalling server');
            socket.emit('newConnection', {
                userId: 1,
                roomId: roomId,
            });
        });
    
        socket.on('newConnectionConfirmed', (data) => {
            console.log('New Connection Confirmed by Server:', data);
        });
    
        const getMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
    
                setLocalStream(stream);
    
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
    
                console.log("Attempting to join room with ID:", roomId);
                socket.emit("joinRoom", roomId);
                console.log("joinRoom event emitted");
    
                socket.on("roomDetails", ({ isCreator, userList }) => {
                    setIsRoomCreator(isCreator);
                    setUserList(userList);
                });
    
                socket.on("offer", async ({ user, offer }) => {
                    if (!peersRef.current[user]) {
                        const peer = createPeer(user, localStream, false);
                        peersRef.current[user] = peer;
                    }
                    peersRef.current[user].signal(offer);
                });
    
                socket.on("answer", ({ user, answer }) => {
                    peersRef.current[user]?.signal(answer);
                });
    
                socket.on("iceCandidate", ({ user, candidate }) => {
                    peersRef.current[user]?.signal(candidate);
                });
    
                socket.on("userJoined", ({ userId }) => {
                    const peer = createPeer(userId, localStream, true);
                    peersRef.current[userId] = peer;
    
                    setUserList((prev) => [
                        ...prev,
                        { id: userId, isCreator: false },
                    ]);
                });
    
                socket.on("userLeft", ({ userId }) => {
                    const peer = peersRef.current[userId];
                    if (peer) {
                        peer.destroy();
                        delete peersRef.current[userId];
                        setPeers((prev) => {
                            const newPeers = { ...prev };
                            delete newPeers[userId];
                            return newPeers;
                        });
                    }
                });
    
                socket.on("chatMessage", ({ userId, message }) => {
                    console.log("A message was sent here");
                    setChatMessages((prev) => [...prev, { userId, message }]);
                });
    
                socket.on('connect_error', (error) => {
                    console.error('Connection Error:', error);
                });
    
                socket.on('error', (error) => {
                    console.error('Socket Error:', error);
                });
            } catch (error) {
                console.error("Media stream error:", error);
            }
        };
    
        getMediaStream();
    
        // Store the current value of peersRef in a variable
        const currentPeers = peersRef.current;
    
        return () => {
            socket.disconnect();
            // Use the variable in the cleanup function
            Object.values(currentPeers).forEach((peer) => peer.destroy());
        };
    }, [roomId, createPeer, localStream]);
    
    return (
        <div className="flex w-screen h-screen items-center p-4 bg-[#f0eecd]">
            <h2 className="text-xl font-bold mb-4">Room: {roomId}</h2>

            <div className="flex w-full">
                {/* Main Video Stream */}
                <div className="flex-grow mr-4">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className={`${
                            isRoomCreator
                                ? "w-full h-[600px]"
                                : "w-[300px] h-[200px]"
                        }`}
                    />
                    {isRoomCreator && (
                        <div className="text-center">
                            Room Creator 
                        </div>
                    )}
                </div>

                {/* Mini Screens for Other Participants */}
                <div className="flex flex-col space-y-2 w-1/4">
                    {Object.entries(peers).map(([userId, stream]) => (
                        <div key={userId} className="relative">
                            <video
                                srcObject={stream}
                                autoPlay
                                className="w-full h-[150px] object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center">
                                Participant {userId}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="w-full mt-4">
                <div className="border p-2 h-[200px] overflow-y-auto">
                    {chatMessages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 ${
                                msg.userId === "You"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <strong>{msg.userId}: </strong>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="flex mt-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-grow border p-2 mr-2"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* User List */}
            <div className="mt-4 w-full">
                <h3 className="font-semibold">Connected Users:</h3>
                <ul className="flex space-x-2">
                    {userList.map((user) => (
                        <li
                            key={user.id}
                            className={`px-2 py-1 rounded ${
                                user.isCreator
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {user.id}
                            {user.isCreator && " (Creator)"}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoConference;
