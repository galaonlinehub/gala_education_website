// "use client";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import Peer from "simple-peer";
// import { io } from "socket.io-client";
// import Cookies from "js-cookie";
// import { decrypt } from "@/src/utils/constants/encryption";
// import useUser from "@/src/store/auth/user";
// import { Badge } from "antd";
// import { FaExpand, FaExpandArrowsAlt, FaMicrophone, FaPhone, FaPhoneSlash, FaSmile, FaUser, FaUserAltSlash, FaUsers, FaVideo } from "react-icons/fa";
// import { FaPhoneFlip } from "react-icons/fa6";

// const VideoConference = ({ params:{id:roomId} }) => {
//     const [localStream, setLocalStream] = useState(null);
//     const [peers, setPeers] = useState({});
//     const [isRoomCreator, setIsRoomCreator] = useState(false);
//     const [userList, setUserList] = useState([]);
//     const [message, setMessage] = useState("");
//     const [chatMessages, setChatMessages] = useState([]);
//     const [sectionPage,setSectionPage] = useState("participants")
//     const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//     const [isVideoEnabled, setIsVideoEnabled] = useState(true);



//     const localVideoRef = useRef(null);
//     const peersRef = useRef({});
//     const socketRef = useRef(null);

    
//     const createPeer = useCallback(
//         (userId, stream, isInitiator) => {
//             console.log(`[Peer Creation] Starting for user ${userId}`, {
//                 isInitiator,
//                 hasStream: !!stream,
//                 streamTracks: stream?.getTracks().map(track => ({
//                     kind: track.kind,
//                     enabled: track.enabled,
//                     id: track.id
//                 }))
//             });
    
//             const peer = new Peer({
//                 initiator: isInitiator,
//                 trickle: true,
//                 stream: stream,
//                 config: {
//                     iceServers: [
//                         { urls: 'stun:stun.l.google.com:19302' },
//                         { urls: 'stun:stun1.l.google.com:19302' }
//                     ],
//                     iceCandidatePoolSize: 10
//                 },
//                 debug: true // Enable simple-peer internal debugging
//             });
    
//             // Log connection state changes
//             const logConnectionState = () => {
//                 const peerState = {
//                     connected: peer.connected,
//                     destroyed: peer.destroyed,
//                     initiator: peer.initiator,
//                     streamCount: peer._remoteStreams?.length || 0
//                 };
//                 console.log(`[Peer State] User ${userId}:`, peerState);
//             };
    
//             // Signal event - when local peer wants to send signaling data
//             peer.on("signal", (signalData) => {
//                 console.log(`[Peer Signal] Generated for user ${userId}`, {
//                     type: signalData.type,
//                     sdpLength: signalData.sdp?.length,
//                     candidate: signalData.candidate
//                 });
    
//                 socketRef.current.emit("signal", {
//                     roomId,
//                     targetUserId: userId,
//                     signal: signalData
//                 });
//             });
    
//             // Connect event - when peer connection is established
//             peer.on("connect", () => {
//                 console.log(`[Peer Connect] Successfully connected to user ${userId}`);
//                 logConnectionState();
//             });
    
//             // Stream event - when we receive a remote stream
//             peer.on("stream", (remoteStream) => {
//                 console.log(`[Peer Stream] Received from user ${userId}`, {
//                     trackCount: remoteStream.getTracks().length,
//                     tracks: remoteStream.getTracks().map(track => ({
//                         kind: track.kind,
//                         enabled: track.enabled,
//                         id: track.id
//                     }))
//                 });
    
//                 setPeers((prev) => ({
//                     ...prev,
//                     [userId]: remoteStream
//                 }));
    
//                 // Store peer reference
//                 peersRef.current[userId] = {
//                     peer,
//                     stream: remoteStream
//                 };
//             });
    
//             // Track event - when individual tracks are received
//             peer.on("track", (track, stream) => {
//                 console.log(`[Peer Track] New track from user ${userId}`, {
//                     trackKind: track.kind,
//                     trackEnabled: track.enabled,
//                     trackId: track.id,
//                     streamId: stream.id
//                 });
//             });
    
//             // Data channel events
//             peer.on("data", data => {
//                 console.log(`[Peer Data] Received data from user ${userId}`, {
//                     dataLength: data.length,
//                     dataPreview: data.toString().substring(0, 100)
//                 });
//             });
    
//             // Close event
//             peer.on("close", () => {
//                 console.log(`[Peer Close] Connection closed with user ${userId}`);
//                 // Clean up references
//                 if (peersRef.current[userId]) {
//                     delete peersRef.current[userId];
//                     setPeers(prev => {
//                         const newPeers = { ...prev };
//                         delete newPeers[userId];
//                         return newPeers;
//                     });
//                 }
//             });
    
//             // Error handling
//             peer.on("error", (err) => {
//                 console.error(`[Peer Error] Error with user ${userId}:`, {
//                     error: err.message,
//                     errorName: err.name,
//                     errorStack: err.stack
//                 });
    
//                 // Attempt to recreate the peer connection after error
//                 if (!peer.destroyed) {
//                     console.log(`[Peer Recovery] Attempting to recover connection with user ${userId}`);
//                     peer?.destroy();
//                     // Wait a bit before trying to reconnect
//                     setTimeout(() => {
//                         if (peersRef.current[userId]) {
//                             console.log(`[Peer Recovery] Recreating peer for user ${userId}`);
//                             const newPeer = createPeer(userId, stream, isInitiator);
//                             peersRef.current[userId] = newPeer;
//                         }
//                     }, 1000);
//                 }
//             });
    
//             // Ice connection state monitoring
//             const originalOnIceStateChange = peer._onIceStateChange;
//             peer._onIceStateChange = function(state) {
//                 console.log(`[ICE State] Changed for user ${userId}:`, {
//                     state,
//                     timestamp: new Date().toISOString()
//                 });
//                 originalOnIceStateChange.call(peer, state);
//             };
    
//             // Debug helper function
//             const debugPeerState = () => {
//                 try {
//                     const peerConnState = peer._pc?.connectionState;
//                     const iceConnState = peer._pc?.iceConnectionState;
//                     const iceGatherState = peer._pc?.iceGatheringState;
                    
//                     console.log(`[Peer Debug] Connection states for user ${userId}`, {
//                         peerConnectionState: peerConnState,
//                         iceConnectionState: iceConnState,
//                         iceGatheringState: iceGatherState,
//                         signallingState: peer._pc?.signalingState
//                     });
//                 } catch (err) {
//                     console.error('[Peer Debug] Error getting state:', err);
//                 }
//             };
    
//             // Set up periodic state logging
//             const stateInterval = setInterval(() => {
//                 if (!peer.destroyed) {
//                     debugPeerState();
//                 } else {
//                     clearInterval(stateInterval);
//                 }
//             }, 5000);
    
//             // Clean up interval on peer destroy
//             peer.on("close", () => clearInterval(stateInterval));
    
//             console.log(`[Peer Created] Successfully created peer for user ${userId}`);
//             return peer;
//         },
//         [roomId]
//     );
    
//     // Add this useEffect to monitor peer connections
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             console.log('[Peers Status] Current peer connections:', {
//                 peerCount: Object.keys(peersRef.current).length,
//                 peers: Object.entries(peersRef.current).map(([userId, data]) => ({
//                     userId,
//                     connected: data.peer?.connected,
//                     destroyed: data.peer?.destroyed,
//                     hasStream: !!data.stream
//                 }))
//             });
//         }, 10000);
    
//         return () => clearInterval(intervalId);
//     }, []);
    
//     const sendMessage = () => {
//         if (message.trim()) {
//             socketRef.current.emit("chatMessage", { roomId, message });
//             setChatMessages((prev) => [...prev, { userId: "You", message }]);
//             setMessage("");
//         }
//     };

//     const getToken = ()=>{

//         const encryptedToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d");
  
//     if (!encryptedToken) {
//       console.error("No token found in cookies");
//       return null;
//     }
  
//     try {
//       const decryptedToken = decrypt(encryptedToken);
//       console.log("Decrypted Token:", decryptedToken);
//       return decryptedToken;
//     } catch (error) {
//       console.error("Error decrypting token:", error);
//       return null;
//     }
//     }

//     useEffect(() => {
//         const token = getToken()
//         console.log("the token in the signaling is",token)

//         const socket = io("http://localhost:3001/signaling", {
//             query: { token: token },
//         });
//         socketRef.current = socket;

//         socket.on('connect', () => {
//             console.log('Connected to Signalling server');
//             socket.emit('newConnection', { 
//                 userId: 1, 
//                 roomId: roomId 
//             });
        
//         });

//         socket.on('newConnectionConfirmed', (data) => {
//             console.log('New Connection Confirmed by Server:', data);
//         });

        

//         const getMediaStream = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({
//                     video: true,
//                     audio: true,
//                 });

//                 setLocalStream(stream);

//                 if (localVideoRef.current) {
//                     localVideoRef.current.srcObject = stream;
//                 }

//                 console.log("Attempting to join room with ID:", roomId);
//                 socket.emit("joinRoom", roomId);
//                 console.log("joinRoom event emitted");


//                 socket.on("roomDetails", ({  userList }) => {
//                     // setIsRoomCreator(isCreator);
//                     setUserList(userList);
//                 });

//                 socket.on("offer", async ({ user, offer }) => {
//                     if (!peersRef.current[user]) {
//                         const peer = createPeer(user, localStream, false);
//                         peersRef.current[user] = peer;
//                     }
//                     peersRef.current[user].signal(offer);
//                 });

//                 socket.on("answer", ({ user, answer }) => {
//                     peersRef.current[user]?.signal(answer);
//                 });

//                 socket.on("signal", ({ userId, signal }) => {
//                     if (!peersRef.current[userId]) {
//                         const peer = createPeer(userId, localStream, false);
//                         peersRef.current[userId] = peer;
//                         if (signal) peer.signal(signal);
//                     } else {
//                         console.info(peersRef.current[userId])
//                         peersRef?.current[userId]?.signal && peersRef?.current[userId]?.signal(signal);
//                     }
//                 });

//                 socket.on("iceCandidate", ({ user, candidate }) => {
//                     peersRef?.current[user]?.signal(candidate);
//                 });

               


//                 socket.on("userJoined", ({ userId }) => {
//                     console.log("New user joined:", userId);
//                     const peer = createPeer(userId, stream, true);
//                     peersRef.current[userId] = peer;
//                 });


//                 // socket.on("userLeft", ({ userId }) => {
//                 //     const peer = peersRef.current[userId];
//                 //     if (peer) {
//                 //         peer.destroy();
//                 //         delete peersRef.current[userId];
//                 //         setPeers((prev) => {
//                 //             const newPeers = { ...prev };
//                 //             delete newPeers[userId];
//                 //             return newPeers;
//                 //         });
//                 //     }
//                 // });


//                 socket.on("userLeft", ({ userId }) => {
//                     if (peersRef.current[userId]) {
//                         peersRef.current[userId].destroy();
//                         delete peersRef.current[userId];
//                         setPeers((prev) => {
//                             const newPeers = { ...prev };
//                             delete newPeers[userId];
//                             return newPeers;
//                         });
//                     }
//                 });
               
                
               

//                 socket.on("chatMessage", ({ userId, message }) => {
//                     console.log("A message was sent here")
//                     setChatMessages((prev) => [...prev, { userId, message }]);
//                 });

//                 socket.on('connect_error', (error) => {
//                     console.error('Connection Error:', error);
//                 });
                
//                 socket.on('error', (error) => {
//                     console.error('Socket Error:', error);
//                 });
//             } catch (error) {
//                 console.error("Media stream error:", error);
//             }
//         };

//         getMediaStream();

//         return () => {
//             if (localStream) {
//                 localStream.getTracks().forEach(track => track.stop());
//             }
//             Object.values(peersRef.current).forEach(peer => peer?.destroy());
//             socket.disconnect();
//         };
//     }, [roomId, createPeer]);


//     const navigation_links = [
//         "participants",
//         "chatting",
//         "board",
//         "materials",
        
//     ]
    
//     console.log("peers are ",peers)

//     return (
//         <div className="flex w-screen gap-x-3 max-h-screen overflow-auto p-4 bg-[#efefeb]">
//             <div className="basis-2/3 h-screen flex flex-col gap-y-2">

//             <div className="flex w-full basis-3/5 p-5 rounded-2xl shadow-xl bg-[#f6f6f6] flex-col">
//               <div className="">
//                 {/* Main Video Stream */}
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-x-2">
//                     <h2 className="text-xs font-light">Week 5</h2>
//                     <span className='text-blue-600 text-xs bg-blue-200 rounded px-2 py-1'>class A</span>
//                   </div>
//                   <div>
//                     <h2 className="text-gray-400">Time remaining</h2>
//                     <div className="space-x-2">
//                     <Badge status='processing' color={"red"}  />
//                     <span className='text-gray-600'>2:48:20</span>
//                     </div>
//                   </div>

//                 </div>
//                 <h1>Science - Introduction to astronomy</h1>
//                 <div className="relative">

//                 <video
//                   ref={localVideoRef}
//                   autoPlay
//                   muted
//                   className="w-full h-[24rem]  object-cover rounded-2xl "
//                   />
//                   <div className='absolute bottom-3 flex items-center justify-center w-full  gap-x-4 text-white'>
//                       <FaMicrophone size={10} className='p-2 bg-black/30 h-12 w-12 rounded-full text-white text-xs' />
//                       <FaVideo className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
//                       <FaPhoneFlip className='p-2 bg-red-500 h-12 w-12 rounded-full text-white' />
//                       <FaSmile className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
//                       <FaExpandArrowsAlt className='p-2 bg-black/30 h-12 w-12 rounded-full text-white' />
//                   </div>
//                   </div>
//               </div>

//             </div>

            
//             <div className="flex w-full basis-2/5 gap-y-4 p-5 rounded-2xl shadow-xl bg-[#f6f6f6] flex-col">
//                 <div className="flex items-center gap-x-5">
//                   <div className='flex items-center gap-x-2'>
//                     <FaUser />
//                     <span className='text-xs'>Attendee</span>
//                     <span className='text-green-800 bg-green-300 text-xs p-1 h-6 w-6 rounded-md text-center'>27</span>
//                   </div>
//                   <div className='flex items-center gap-x-2'>
//                     <FaUserAltSlash />
//                     <span className='text-xs'>Absentee : </span>
//                     <span className='text-red-800 bg-red-300 text-xs p-1 h-6 w-6 rounded-md text-center'>3</span>
//                   </div>
//                 </div>
//                 {/* controls for the sidebar */}
//                 <div className="flex justify-between">

//                     {navigation_links.map((item,index)=> <div key={index} onClick={(e)=>setSectionPage(item)} className="cursor-pointer flex  flex-col items-center">
//                       <div  className={` w-14 h-10 p-3 rounded flex items-center justify-center ${sectionPage === item ? "bg-blue-200" : "bg-blue-50"}`}>
//                       <FaUsers className={`${sectionPage === item ? "text-blue-800" : "text-gray-400"}  h-6 w-6`} />
//                       </div>

//                       <h1 className={`${sectionPage === item ? "text-blue-800" : "text-gray-400"} text-xs`}>{item}</h1>
//                     </div>)}

                   

//                 </div>
                
//             </div>
//             </div>
//             {/* Side panel */}
//             <div className="basis-1/3">
               
//                {sectionPage === "participants" ?<div>
//                <h3 className="font-semibold">Connected Users:</h3>
//                <div className="grid grid-cols-3 gap-4">
//     {Object.entries(peers).map(([userId, stream]) => (
//         <video
//             key={userId}
//             autoPlay
//             playsInline
//             ref={(ref) => {
//                 if (ref) ref.srcObject = stream;
//             }}
//             className="w-full h-40 rounded-md"
//         />
//     ))}
// </div>

//                </div> : sectionPage === "chatting" ? <div>Chatting</div> : sectionPage === "materials"?<div>Materials</div>:<div>Board</div>}
//             </div>
//         </div>
//     );
// };

// export default VideoConference;



"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import Cookies from 'js-cookie';
import { decrypt } from '@/src/utils/constants/encryption';
import { Badge } from "antd";
import { 
  FaExpand, 
  FaExpandArrowsAlt, 
  FaMicrophone, 
  FaMicrophoneSlash,
  FaPhone, 
  FaPhoneSlash, 
  FaSmile, 
  FaUser, 
  FaUserAltSlash, 
  FaUsers, 
  FaVideo,
  FaVideoSlash 
} from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import useUser from '@/src/store/auth/user';

const VideoConference = ({ params: { id: roomId } }) => {
  const [sectionPage, setSectionPage] = useState("participants");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [mainVideoStream, setMainVideoStream] = useState(null);
  const [participantStreams, setParticipantStreams] = useState({});
  const [instructorStream, setInstructorStream] = useState(null);
  const [studentStreams, setStudentStreams] = useState(new Map());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user,setUser } = useUser();
  const socketRef = useRef(null);
  
  // Refs
  const mainVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const participantsRef = useRef(null);
  const containerRef = useRef(null);

  const navigation_links = [
    { id: "participants", icon: FaUsers, label: "Participants" },
    { id: "chatting", icon: FaSmile, label: "Chat" },
    { id: "board", icon: FaExpand, label: "Board" },
    { id: "materials", icon: FaUser, label: "Materials" },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Emit message to socket
      socketRef.current?.emit('message', {
        roomId,
        message: newMessage,
        sender: userName
      });
      
      // Add message to local state
    //   setMessages(prev => [...prev, {
    //     sender: userName,
    //     content: newMessage,
    //     timestamp: new Date().toISOString()
    //   }]);

    // setMessages(prev => [...prev, {
    //     sender: userName,
    //     content: newMessage,
    //     timestamp: new Date().toISOString()
    //   }]);

    setMessages(prev=>[...prev,newMessage])
      
      setNewMessage("");
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

    console.log("the user is ",user)

    useEffect(() => {
        const userDecrypted = decrypt(
          decrypt(localStorage.getItem("2171f701-2b0c-41f4-851f-318703867868"))
        );
    
        if (userDecrypted) {
          setUser(userDecrypted);
        }
      }, [setUser]);

  // Rest of the existing mediasoup implementation...
    useEffect(() => {
    const token = getToken()
    const socket = io("https://edusockets.galahub.org/signaling", {
      query: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;
    const roomName = roomId;

    let device;
    let rtpCapabilities;
    let producerTransport;
    let audioProducer;
    let videoProducer;
    const consumerTransports = [];
    const consumingTransports = [];

    const params = {
      encodings: [
        { rid: 'r0', maxBitrate: 100000, scalabilityMode: 'S1T3' },
        { rid: 'r1', maxBitrate: 300000, scalabilityMode: 'S1T3' },
        { rid: 'r2', maxBitrate: 900000, scalabilityMode: 'S1T3' },
      ],
      codecOptions: { videoGoogleStartBitrate: 1000 },
    };

    let audioParams;
    let videoParams = { params };

    const streamSuccess = (stream,roleName) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
      videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
    
      // If the user's role is "student", append their stream to remote streams
      console.log("In the stream success function role is ",roleName)
      if (roleName === "instructor") {
        setInstructorStream({
          stream,
          user: { name: userName, role: "instructor", isLocal: true }
        });
      }else if (roleName === "student"){
        setStudentStreams(prev => new Map(prev).set(socket.id, {
          stream,
          user: { name: userName, role: "student", isLocal: true }
        }));
      }
  
      joinRoom();
    };
    

    const addParticipant = (producerId, stream, participantRole) => {
      const newParticipant = { producerId, stream, role: participantRole };
      if (participantRole === 'instructor') {
        setInstructor(newParticipant);
      } else {
        setParticipants((prev) => [...prev, newParticipant]);
      }
    };

    const removeParticipant = (remoteProducerId) => {
        const elementToRemove = document.getElementById(`td-${remoteProducerId}`);
        if (elementToRemove) {
          const parentElement = elementToRemove.parentElement;
          if (parentElement) {
            parentElement.removeChild(elementToRemove);
          }
        }
      };
    

    const getLocalStream = (roleName) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: { min: 640, max: 1920 },
            height: { min: 400, max: 1080 },
          },
        })
        .then((stream)=>streamSuccess(stream,roleName))
        .catch((error) => console.log(error.message));
    };

    const joinRoom = () => {
      socket.emit('joinRoom', { roomName }, (data) => {
        if (data.error) {
          // Handle the error gracefully
          console.error('Error joining room:', data.error);
          alert(data.error)
          return;
        }
        rtpCapabilities = data.rtpCapabilities;
        createDevice().then(() => {
          // Connect to existing producers after device is created
          if (data.existingProducers && data.existingProducers.length > 0) {
            data.existingProducers.forEach(({ producerId }) => {
              signalNewConsumerTransport(producerId);
            });
          }
        });
      
      });
    };

    const createDevice = async () => {
      try {
        device = new mediasoupClient.Device();
        await device.load({ routerRtpCapabilities: rtpCapabilities });
        createSendTransport();
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        if (error.name === 'UnsupportedError') {
          console.warn('browser not supported');
        }
        return Promise.reject(error);
      }
    };

    const createSendTransport = () => {
      socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
        if (params.error) {
          console.log(params.error);
          return;
        }

        producerTransport = device.createSendTransport(params);

        producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.emit('transport-connect', { dtlsParameters,transportId:params.id });
            callback();
          } catch (error) {
            errback(error);
          }
        });

        producerTransport.on('produce', async (parameters, callback, errback) => {
          
          console.log("producer transport produce was called here ",params)
            try {
            await socket.emit(
              'transport-produce',
              { kind: parameters.kind, rtpParameters: parameters.rtpParameters, appData: parameters.appData,transportId:params.id },
              ({ id, producersExist }) => {
                callback({ id });
                if (producersExist) getProducers();
              }
            );
          } catch (error) {
            errback(error);
          }
        });

        connectSendTransport();
      });
    };

    const connectSendTransport = async () => {
      audioProducer = await producerTransport.produce(audioParams);
      videoProducer = await producerTransport.produce(videoParams);

        console.log("connect send transport was called")

      audioProducer.on('trackended', () => console.log('audio track ended'));
      audioProducer.on('transportclose', () => console.log('audio transport ended'));

      videoProducer.on('trackended', () => console.log('video track ended'));
      videoProducer.on('transportclose', () => console.log('video transport ended'));
    };

    const getProducers = () => {
        
        socket.emit('getProducers', (producerIds) => {
            console.log("Available producers", producerIds);
            producerIds.forEach(signalNewConsumerTransport);
        });
        
    };

    const signalNewConsumerTransport = async (remoteProducerId) => {
      if (consumingTransports.includes(remoteProducerId)) return;
      consumingTransports.push(remoteProducerId);

      socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
       
        if (!params || params.error) {
          console.error('Failed to create WebRTC transport:', params?.error || 'Unknown error');
          return;
        }

        const consumerTransport = device.createRecvTransport(params);

        consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          console.log('consumer transport connected');
          
            try {
            await socket.emit('transport-recv-connect', {
              dtlsParameters,
              serverConsumerTransportId: params.id,
            });
            callback();
          } catch (error) {
            errback(error);
          }
        });

        connectRecvTransport(consumerTransport, remoteProducerId, params.id);
      });
    };

    const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
      socket.emit(
        'consume',
        { rtpCapabilities: device.rtpCapabilities, remoteProducerId, serverConsumerTransportId },
        async ({ params }) => {
          if (params.error) {
            console.log('Cannot Consume');
            return;
          }
          console.log(params)
          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
            
            
          });

          consumerTransports.push({
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
            
          });

          
          const stream = new MediaStream([consumer.track]);

          // Store stream based on user role
          if (params?.user?.role === 'instructor') {
            setInstructorStream({
              stream,
              user: { ...params.user, isLocal: false }
            });
          } else {
            setStudentStreams(prev => new Map(prev).set(remoteProducerId, {
              stream,
              user: { ...params.user, isLocal: false }
            }));
          }

          socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
        }
      );
    };
    socket.on('connect', () => {
        console.log('Connected to server');
        
       
      });

    socket.on('connection-success', ({ socketId,role,name }) => {
      console.log("connection success "+socketId+" role, "+role);
      setUserName(name);
      setRole(role);
      getLocalStream(role);
    });

    socket.on('message',({senderId,message})=>{
        
        setMessages(prev=>[...prev,message])
    })

    socket.on('new-producer', ({ producerId,user }) => {
        console.log("New producer connected : "+producerId)
        signalNewConsumerTransport(producerId,user)});


    socket.on('producer-closed', ({ remoteProducerId, userRole }) => {
        const producerToClose = consumerTransports.find(
            (transportData) => transportData.producerId === remoteProducerId
        );
        
        if (producerToClose) {
            producerToClose.consumerTransport.close();
            producerToClose.consumer.close();
    
            const index = consumerTransports.indexOf(producerToClose);
            consumerTransports.splice(index, 1);
        }
    
        // Remove from appropriate state
        if (userRole === 'instructor') {
            setInstructorStream(null);
        } else {
            setStudentStreams(prev => {
            const newStreams = new Map(prev);
            newStreams.delete(remoteProducerId);
            return newStreams;
            });
        }
        });

    return () => {
      socket.disconnect();
    };
  }, []);


  const renderInstructorVideo = () => {
    if (!instructorStream) return null;

    const { stream, user } = instructorStream;
    return (
      <div className="w-full h-full relative">
        <video
          key={user.isLocal ? 'local-instructor' : 'remote-instructor'}
          autoPlay
          muted={user.isLocal}
          playsInline
          className="w-full h-full object-cover rounded-lg"
          ref={el => {
            if (el) el.srcObject = stream;
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
          {user.name} (Instructor) {user.isLocal ? "(You)" : ""}
        </div>
      </div>
    );
  };

  // Render student videos
  const renderStudentVideos = () => {
    return Array.from(studentStreams.entries()).map(([producerId, { stream, user }]) => (
      <div key={producerId} className="relative w-full h-40 rounded-md overflow-hidden">
        <video
          autoPlay
          muted={user.isLocal}
          playsInline
          className="w-full h-full object-cover"
          ref={el => {
            if (el) el.srcObject = stream;
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {user.name} (Student)
        </div>
      </div>
    ));
  };

  console.log("the student streams are ",studentStreams)
  console.log("the instructor stream is ",instructorStream)



  return (
    <div ref={containerRef} className="flex w-screen gap-x-3 max-h-screen overflow-auto p-4 bg-[#efefeb]">
      <div className="basis-2/3 h-screen flex flex-col gap-y-2">
        <div className="flex w-full basis-3/5 p-5">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-x-2">
                <h2 className="text-xs font-light">Week 5</h2>
                <Badge variant="secondary" className="bg-blue-200 text-blue-600">
                  class A
                </Badge>
              </div>
              <div>
                <h2 className="text-gray-400">Time remaining</h2>
                <div className="space-x-2">
                  <Badge variant="destructive" className="animate-pulse" />
                  <span className="text-gray-600">2:48:20</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-xl font-semibold mb-4">Science - Introduction to astronomy</h1>
            
            <div className="relative rounded-2xl overflow-hidden">
            
            {renderInstructorVideo()}
            {role === "student" && (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="absolute bottom-4 right-4 w-48 h-36 object-cover rounded-lg"
                />
              )}
              
              <div className="absolute bottom-3 flex items-center justify-center w-full gap-x-4">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-2 ${isAudioEnabled ? 'bg-black/30' : 'bg-red-500'} h-12 w-12 rounded-full text-white`}
                >
                  {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-2 ${isVideoEnabled ? 'bg-black/30' : 'bg-red-500'} h-12 w-12 rounded-full text-white`}
                >
                  {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button className="p-2 bg-red-500 h-12 w-12 rounded-full text-white">
                  <FaPhoneFlip />
                </button>
                <button className="p-2 bg-black/30 h-12 w-12 rounded-full text-white">
                  <FaSmile />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-black/30 h-12 w-12 rounded-full text-white"
                >
                  <FaExpandArrowsAlt />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full basis-2/5 p-5">
          <div className="w-full">
            <div className="flex items-center gap-x-5 mb-4">
              <div className="flex items-center gap-x-2">
                <FaUser />
                <span className="text-xs">Attendee</span>
                <Badge variant="secondary" className="bg-green-300 text-green-800">
                  27
                </Badge>
              </div>
              <div className="flex items-center gap-x-2">
                <FaUserAltSlash />
                <span className="text-xs">Absentee:</span>
                <Badge variant="destructive" className="bg-red-300 text-red-800">
                  3
                </Badge>
              </div>
            </div>

            <div className="flex justify-between">
              {navigation_links.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setSectionPage(id)}
                  className="flex flex-col items-center gap-y-1"
                >
                  <div className={`w-14 h-10 p-3 rounded flex items-center justify-center ${
                    sectionPage === id ? "bg-blue-200" : "bg-blue-50"
                  }`}>
                    <Icon className={`${
                      sectionPage === id ? "text-blue-800" : "text-gray-400"
                    } h-6 w-6`} />
                  </div>
                  <span className={`text-xs ${
                    sectionPage === id ? "text-blue-800" : "text-gray-400"
                  }`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="basis-1/3 p-4">
        {sectionPage === "participants" && (
            <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            {renderStudentVideos()}
          </div>
        )}

        {sectionPage === "chatting" && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  {/* <span className="font-semibold">{msg.sender}: </span> */}
                  <span>{msg}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-4 py-2 rounded-md border"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {sectionPage === "board" && (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-500">Whiteboard feature coming soon</span>
          </div>
        )}

        {sectionPage === "materials" && (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-500">Course materials feature coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoConference;

