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
    const [sectionPage,setSectionPage] = useState("participants")
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);



    const localVideoRef = useRef(null);
    const peersRef = useRef({});
    const socketRef = useRef(null);

    
    const createPeer = useCallback(
        (userId, stream, isInitiator) => {
            console.log(`[Peer Creation] Starting for user ${userId}`, {
                isInitiator,
                hasStream: !!stream,
                streamTracks: stream?.getTracks().map(track => ({
                    kind: track.kind,
                    enabled: track.enabled,
                    id: track.id
                }))
            });
    
            const peer = new Peer({
                initiator: isInitiator,
                trickle: true,
                stream: stream,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' }
                    ],
                    iceCandidatePoolSize: 10
                },
                debug: true // Enable simple-peer internal debugging
            });
    
            // Log connection state changes
            const logConnectionState = () => {
                const peerState = {
                    connected: peer.connected,
                    destroyed: peer.destroyed,
                    initiator: peer.initiator,
                    streamCount: peer._remoteStreams?.length || 0
                };
                console.log(`[Peer State] User ${userId}:`, peerState);
            };
    
            // Signal event - when local peer wants to send signaling data
            peer.on("signal", (signalData) => {
                console.log(`[Peer Signal] Generated for user ${userId}`, {
                    type: signalData.type,
                    sdpLength: signalData.sdp?.length,
                    candidate: signalData.candidate
                });
    
                socketRef.current.emit("signal", {
                    roomId,
                    targetUserId: userId,
                    signal: signalData
                });
            });
    
            // Connect event - when peer connection is established
            peer.on("connect", () => {
                console.log(`[Peer Connect] Successfully connected to user ${userId}`);
                logConnectionState();
            });
    
            // Stream event - when we receive a remote stream
            peer.on("stream", (remoteStream) => {
                console.log(`[Peer Stream] Received from user ${userId}`, {
                    trackCount: remoteStream.getTracks().length,
                    tracks: remoteStream.getTracks().map(track => ({
                        kind: track.kind,
                        enabled: track.enabled,
                        id: track.id
                    }))
                });
    
                setPeers((prev) => ({
                    ...prev,
                    [userId]: remoteStream
                }));
    
                // Store peer reference
                peersRef.current[userId] = {
                    peer,
                    stream: remoteStream
                };
            });
    
            // Track event - when individual tracks are received
            peer.on("track", (track, stream) => {
                console.log(`[Peer Track] New track from user ${userId}`, {
                    trackKind: track.kind,
                    trackEnabled: track.enabled,
                    trackId: track.id,
                    streamId: stream.id
                });
            });
    
            // Data channel events
            peer.on("data", data => {
                console.log(`[Peer Data] Received data from user ${userId}`, {
                    dataLength: data.length,
                    dataPreview: data.toString().substring(0, 100)
                });
            });
    
            // Close event
            peer.on("close", () => {
                console.log(`[Peer Close] Connection closed with user ${userId}`);
                // Clean up references
                if (peersRef.current[userId]) {
                    delete peersRef.current[userId];
                    setPeers(prev => {
                        const newPeers = { ...prev };
                        delete newPeers[userId];
                        return newPeers;
                    });
                }
            });
    
            // Error handling
            peer.on("error", (err) => {
                console.error(`[Peer Error] Error with user ${userId}:`, {
                    error: err.message,
                    errorName: err.name,
                    errorStack: err.stack
                });
    
                // Attempt to recreate the peer connection after error
                if (!peer.destroyed) {
                    console.log(`[Peer Recovery] Attempting to recover connection with user ${userId}`);
                    peer?.destroy();
                    // Wait a bit before trying to reconnect
                    setTimeout(() => {
                        if (peersRef.current[userId]) {
                            console.log(`[Peer Recovery] Recreating peer for user ${userId}`);
                            const newPeer = createPeer(userId, stream, isInitiator);
                            peersRef.current[userId] = newPeer;
                        }
                    }, 1000);
                }
            });
    
            // Ice connection state monitoring
            const originalOnIceStateChange = peer._onIceStateChange;
            peer._onIceStateChange = function(state) {
                console.log(`[ICE State] Changed for user ${userId}:`, {
                    state,
                    timestamp: new Date().toISOString()
                });
                originalOnIceStateChange.call(peer, state);
            };
    
            // Debug helper function
            const debugPeerState = () => {
                try {
                    const peerConnState = peer._pc?.connectionState;
                    const iceConnState = peer._pc?.iceConnectionState;
                    const iceGatherState = peer._pc?.iceGatheringState;
                    
                    console.log(`[Peer Debug] Connection states for user ${userId}`, {
                        peerConnectionState: peerConnState,
                        iceConnectionState: iceConnState,
                        iceGatheringState: iceGatherState,
                        signallingState: peer._pc?.signalingState
                    });
                } catch (err) {
                    console.error('[Peer Debug] Error getting state:', err);
                }
            };
    
            // Set up periodic state logging
            const stateInterval = setInterval(() => {
                if (!peer.destroyed) {
                    debugPeerState();
                } else {
                    clearInterval(stateInterval);
                }
            }, 5000);
    
            // Clean up interval on peer destroy
            peer.on("close", () => clearInterval(stateInterval));
    
            console.log(`[Peer Created] Successfully created peer for user ${userId}`);
            return peer;
        },
        [roomId]
    );
    
    // Add this useEffect to monitor peer connections
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('[Peers Status] Current peer connections:', {
                peerCount: Object.keys(peersRef.current).length,
                peers: Object.entries(peersRef.current).map(([userId, data]) => ({
                    userId,
                    connected: data.peer?.connected,
                    destroyed: data.peer?.destroyed,
                    hasStream: !!data.stream
                }))
            });
        }, 10000);
    
        return () => clearInterval(intervalId);
    }, []);
    
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


                socket.on("roomDetails", ({  userList }) => {
                    // setIsRoomCreator(isCreator);
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

                socket.on("signal", ({ userId, signal }) => {
                    if (!peersRef.current[userId]) {
                        const peer = createPeer(userId, localStream, false);
                        peersRef.current[userId] = peer;
                        if (signal) peer.signal(signal);
                    } else {
                        console.info(peersRef.current[userId])
                        peersRef?.current[userId]?.signal && peersRef?.current[userId]?.signal(signal);
                    }
                });

                socket.on("iceCandidate", ({ user, candidate }) => {
                    peersRef?.current[user]?.signal(candidate);
                });

               


                socket.on("userJoined", ({ userId }) => {
                    console.log("New user joined:", userId);
                    const peer = createPeer(userId, stream, true);
                    peersRef.current[userId] = peer;
                });


                // socket.on("userLeft", ({ userId }) => {
                //     const peer = peersRef.current[userId];
                //     if (peer) {
                //         peer.destroy();
                //         delete peersRef.current[userId];
                //         setPeers((prev) => {
                //             const newPeers = { ...prev };
                //             delete newPeers[userId];
                //             return newPeers;
                //         });
                //     }
                // });


                socket.on("userLeft", ({ userId }) => {
                    if (peersRef.current[userId]) {
                        peersRef.current[userId].destroy();
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
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            Object.values(peersRef.current).forEach(peer => peer?.destroy());
            socket.disconnect();
        };
    }, [roomId, createPeer]);


    const navigation_links = [
        "participants",
        "chatting",
        "board",
        "materials",
        
    ]
    
    console.log("peers are ",peers)

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

            
            <div className="flex w-full basis-2/5 gap-y-4 p-5 rounded-2xl shadow-xl bg-[#f6f6f6] flex-col">
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
                <div className="flex justify-between">

                    {navigation_links.map((item,index)=> <div key={index} onClick={(e)=>setSectionPage(item)} className="cursor-pointer flex  flex-col items-center">
                      <div  className={` w-14 h-10 p-3 rounded flex items-center justify-center ${sectionPage === item ? "bg-blue-200" : "bg-blue-50"}`}>
                      <FaUsers className={`${sectionPage === item ? "text-blue-800" : "text-gray-400"}  h-6 w-6`} />
                      </div>

                      <h1 className={`${sectionPage === item ? "text-blue-800" : "text-gray-400"} text-xs`}>{item}</h1>
                    </div>)}

                   

                </div>
                
            </div>
            </div>
            {/* Side panel */}
            <div className="basis-1/3">
               
               {sectionPage === "participants" ?<div>
               <h3 className="font-semibold">Connected Users:</h3>
               <div className="grid grid-cols-3 gap-4">
    {Object.entries(peers).map(([userId, stream]) => (
        <video
            key={userId}
            autoPlay
            playsInline
            ref={(ref) => {
                if (ref) ref.srcObject = stream;
            }}
            className="w-full h-40 rounded-md"
        />
    ))}
</div>

               </div> : sectionPage === "chatting" ? <div>Chatting</div> : sectionPage === "materials"?<div>Materials</div>:<div>Board</div>}
            </div>
        </div>
    );
};

export default VideoConference;
