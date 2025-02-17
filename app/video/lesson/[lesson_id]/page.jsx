"use client"
import BottomVideoControls from '@/src/components/websockets/video/BottomVideoControls'
import WhiteBoard from '@/src/components/websockets/video/WhiteBoard'
import useControlStore from '@/src/store/video/contols';
import {decrypt} from "@/src/utils/fns/encryption"
import Cookies from 'js-cookie';
import React, { useEffect,useState,useRef, useMemo, useCallback } from 'react'
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import { ChatSection } from '@/src/components/websockets/video/ChatSection';
import { useUser } from '@/src/hooks/useUser';


export default  function Lesson({ params }){
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
  const { user } = useUser();
  const socketRef = useRef(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const screenProducerRef = useRef(null);
  const videoProducerRef = useRef(null);
  const audioProducerRef = useRef(null);
  // const roomId = "zh8bL2WebxzUxDid"

  const [roomId, setRoomId] = useState(null);

  const roomIdFn = useCallback(async () => {
    const roomId = (await params).lesson_id; 
    return roomId;
  }, [params]); 
  
  useEffect(() => {
    const fetchRoomId = async () => {
      const resolvedRoomId = await roomIdFn();
      setRoomId(resolvedRoomId);
      console.log("The roomId is", resolvedRoomId);
    };
    fetchRoomId();
  }, [roomIdFn]); 


  // Refs
  // const mainVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const participantsRef = useRef(null);
  const containerRef = useRef(null);
  const {setControlVisibility, controls:{audio,video,board,raise,materials,end,attendees,chat,share} } = useControlStore();

  

    
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!videoProducerRef.current) {
        console.log('No video producer available');
        return;
      }

      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });

        await videoProducerRef.current.replaceTrack({ 
          track: screenStream.getVideoTracks()[0] 
        });

        screenStream.getVideoTracks()[0].onended = async () => {
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { min: 640, max: 1920 },
              height: { min: 400, max: 1080 },
            }
          });
          await videoProducerRef.current.replaceTrack({ 
            track: cameraStream.getVideoTracks()[0] 
          });
          setIsScreenSharing(false);
        };

        setIsScreenSharing(true);
      } else {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, max: 1920 },
            height: { min: 400, max: 1080 },
          }
        });

        await videoProducerRef.current.replaceTrack({ 
          track: cameraStream.getVideoTracks()[0] 
        });

        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
      setIsScreenSharing(false);
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

    

    // useEffect(() => {
    //   const userToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d")
    //   if(!userToken){
    //     return
    //   }
      
    //   const userDecrypted = decrypt(
    //       userToken
    //     );
    
    //     if (userDecrypted) {
    //       setUser(userDecrypted);
    //     }
    //   }, [setUser]);
  
  useEffect(() => {

    if(!user || !roomId){
      return
    }

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
      } 
      else if (roleName === "student"){
        setStudentStreams(prev => new Map(prev).set(user.id, {
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
            socket.emit('transport-connect', { dtlsParameters, transportId: params.id });
            callback();
          } catch (error) {
            errback(error);
          }
        });

        producerTransport.on('produce', async (parameters, callback, errback) => {
          
          console.log("producer transport produce was called here ",params)
            try {
            socket.emit(
                'transport-produce',
                { kind: parameters.kind, rtpParameters: parameters.rtpParameters, appData: parameters.appData, transportId: params.id },
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
      audioProducerRef.current = await producerTransport.produce(audioParams);
      videoProducerRef.current = await producerTransport.produce(videoParams);

      audioProducerRef.current.on('trackended', () => console.log('audio track ended'));
      audioProducerRef.current.on('transportclose', () => console.log('audio transport ended'));

      videoProducerRef.current.on('trackended', () => console.log('video track ended'));
      videoProducerRef.current.on('transportclose', () => console.log('video transport ended'));

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
            socket.emit('transport-recv-connect', {
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
            console.log("user id is "+user?.id+"while params user id is ",params.user)
            setStudentStreams(prev => new Map(prev).set(params.user.id, {
              stream,
              user: { ...params.user, isLocal: false }
            }));
          }

          socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
        }
      );
    };


    const handleStopScreenShare = async (originalTrack) => {
      try {
        // Get new camera stream
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, max: 1920 },
            height: { min: 400, max: 1080 },
          }
        });
  
        // Replace track in producer
        if (videoProducer) {
          await videoProducer.replaceTrack({ track: cameraStream.getVideoTracks()[0] });
        }
  
        setIsScreenSharing(false);
      } catch (error) {
        console.error('Error stopping screen share:', error);
      }
    };
  

    socket.on("message",(data)=>{
      console.log(data)
      setMessages(prev=>[...prev,{sender:data.userName,message:data.message}])
    })


    socket.on('connect', () => {
        console.log('Connected to server');
         
      });

    socket.on('connection-success', ({ socketId,role,name }) => {
      console.log("connection success "+socketId+" role, "+role);
      setUserName(name);
      setRole(role);
      getLocalStream(role);
    });

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
  }, [user,roomId, userName]);



  const renderInstructorVideo = useMemo(() => {
    if (!instructorStream) return null;
  
    const { stream, user } = instructorStream;
    return (
      <div className={`w-full h-full ${(chat || attendees) ? 'basis-2/3':'basis-11/12'} relative `}>
        <video
          key={user.id}
          autoPlay
          muted={user.isLocal}
          playsInline
          className={`w-full h-full object-cover rounded-2xl outline-none focus:outline-none border-none shadow-none bg-transparent ${!isScreenSharing  ? 'transform scale-x-[-1]' : ''}`}
          ref={el => {
            if (el) el.srcObject = stream;
          }}
        /> 
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded">
          {user.name} (Instructor) {user.isLocal ? "(You)" : ""}
        </div>
      </div>
    );
  }, [instructorStream, attendees, chat, isScreenSharing]);

  
  const renderStudentVideos = useMemo(() => {
    return Array.from(studentStreams.entries()).map(([producerId, { stream, user }]) => (
      <div key={producerId} className="relative w-full h-40 rounded-md overflow-hidden">
        <video
          autoPlay
          muted={user.isLocal}
          playsInline
          className="w-full h-full object-cover outline-none focus:outline-none border-none shadow-none bg-transparent transform scale-x-[-1]"
          ref={el => {
            if (el) el.srcObject = stream;
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {user.name} (Student)
        </div>
      </div>
    ));
  }, [studentStreams]);
  
  return (
    <div className='w-screen h-screen flex   overflow-hidden justify-center  bg-[#747487] relative'>
    { !board ?
    <div className='flex w-full items-center  gap-x-5 px-5'>
    {video ?  renderInstructorVideo : <div className={`w-[80%] h-[90%] flex items-center justify-center ${(chat || attendees)?"basis-2/3":"basis-11/12"}   bg-[#232333] rounded-2xl`}>
              <div className="bg-[#747487] w-48 h-48 rounded-full text-white flex items-center justify-center font-bold">
                {user?.name} (Instructor)
              </div>
        </div>}
        <>
  {chat ? (
    <div className={`bg-[#232333] p-5 rounded-xl h-[90vh] basis-1/3`}>
      <div className={"text-white text-center border-b-2 py-2"}>
        Room Group Chat
      </div>
      <ChatSection 
        socketRef={socketRef}
        roomId={roomId}
        sender={user}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  ) : attendees ? (
    <div className={"bg-[#232333] p-5 rounded-xl h-[90vh] basis-1/3 flex flex-col overflow-y-scroll"}>
    {renderStudentVideos}
    </div>
  ) : (
    <div></div>
  )}
  
</>
    </div>:
    <WhiteBoard
    socketRef={socketRef} 
    roomId={roomId} 
    role={role}
    />
    }
    <BottomVideoControls audioProducerRef={audioProducerRef} videoProducerRef={videoProducerRef} role={role} toggleScreenShare={toggleScreenShare} />
    </div>
  )
}

