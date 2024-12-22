"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { decrypt } from "@/src/utils/constants/encryption";
import useUser from "@/src/store/auth/user";
import { Badge } from "antd";
import { FaExpand, FaExpandArrowsAlt, FaMicrophone, FaPhone, FaPhoneSlash, FaSmile, FaUser, FaUserAltSlash, FaUsers, FaVideo } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";

const VideoConference = ({ params:{id:roomId} }) => {
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
        const token = getToken()
        console.log("the token in the signaling is",token)

        const socket = io("http://localhost:3001/signaling", {
            query: { token: token },
        });
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to Signalling server');
            socket.emit('newConnection', { 
                userId: 1, 
                roomId: roomId 
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
                    console.log("A message was sent here")
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

        return () => {
            socket.disconnect();
            Object.values(peersRef.current).forEach((peer) => peer.destroy());
        };
    }, [roomId, createPeer]);
    
    return (
        <div className="flex w-screen gap-x-3 max-h-screen overflow-auto p-4 bg-[#efefeb]">
            <div className="basis-2/3 h-screen flex flex-col gap-y-2">

            <div className="flex w-full basis-3/5 p-5 rounded-2xl shadow-xl bg-[#f6f6f6] flex-col">
              <div className="">
                {/* Main Video Stream */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <h2 className="text-xs font-light">Week 5</h2>
                    <span className='text-blue-600 text-xs bg-blue-200 rounded px-2 py-1'>class A</span>
                  </div>
                  <div>
                    <h2 className="text-gray-400">Time remaining</h2>
                    <div className="space-x-2">
                    <Badge status='processing' color={"red"}  />
                    <span className='text-gray-600'>2:48:20</span>
                    </div>
                  </div>

                </div>
                <h1>Science - Introduction to astronomy</h1>
                <div className="relative">

                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-[24rem]  object-cover rounded-2xl "
                  />
                  <div className='absolute bottom-3 flex items-center justify-center w-full  gap-x-4 text-white'>
                      <FaMicrophone size={10} className='p-2 bg-black/30 h-12 w-12 rounded-full text-white text-xs' />
                      <FaVideo className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
                      <FaPhoneFlip className='p-2 bg-red-500 h-12 w-12 rounded-full text-white' />
                      <FaSmile className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
                      <FaExpandArrowsAlt className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
                  </div>
                  </div>
              </div>

            </div>

            
            <div className="flex w-full basis-2/5 p-5 rounded-2xl shadow-xl bg-[#f6f6f6] flex-col">
                <div className="flex items-center gap-x-5">
                  <div className='flex items-center gap-x-2'>
                    <FaUser />
                    <span className='text-xs'>Attendee</span>
                    <span className='text-green-800 bg-green-300 text-xs p-1 h-6 w-6 rounded-md text-center'>27</span>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <FaUserAltSlash />
                    <span className='text-xs'>Absentee : </span>
                    <span className='text-red-800 bg-red-300 text-xs p-1 h-6 w-6 rounded-md text-center'>3</span>
                  </div>
                </div>
                {/* controls for the sidebar */}
                <div>

                    <div>
                      <div className='bg-blue-500/70 w-14 h-10 p-3 rounded text-center'>
                      <FaUsers className='text-white h-6 w-6' />
                      </div>

                      <h1>Participants</h1>
                    </div>

                </div>
                
            </div>
            </div>
            {/* Side panel */}
            <div className="basis-1/3">
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
