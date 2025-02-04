import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import { decrypt } from '@/src/utils/constants/encryption';
import Cookies from 'js-cookie';

export const useVideoRoom = ({ meetingLink, localVideoRef }) => {
  const [participants, setParticipants] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [device, setDevice] = useState(null);
  const [producerTransport, setProducerTransport] = useState(null);
  const [videoProducer, setVideoProducer] = useState(null);
  const [audioProducer, setAudioProducer] = useState(null);

  const socketRef = useRef(null);

  // Get decrypted token
  const getToken = useCallback(() => {
    const encryptedToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d");
    if (!encryptedToken) return null;
    try {
      return decrypt(encryptedToken);
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
  }, []);

  // Initialize socket connection
  const initializeSocket = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    const token = getToken();
    const socket = io("http://localhost:3001/signaling", {
      query: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connection-success", async ({ socketId, role, name }) => {
      setUserName(name);
      setUserRole(role);

      const stream = await getLocalStream();
      joinRoom(stream);
    });

    return socket;
  }, [getToken]);

  // Get local media stream
  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: { min: 640, max: 1920 }, height: { min: 400, max: 1080 } },
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Failed to get local stream:', error);
      throw error;
    }
  }, [localVideoRef]);

  // Initialize mediasoup device
  const initializeDevice = useCallback(async (rtpCapabilities) => {
    try {
      const newDevice = new mediasoupClient.Device();
      await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
      setDevice(newDevice);
      return newDevice;
    } catch (error) {
      console.error("Failed to initialize device:", error);
      throw error;
    }
  }, []);

  // Create transport for sending streams
  const createSendTransport = useCallback(() => {
    if (!socketRef.current || !device) return;

    socketRef.current.emit("createWebRtcTransport", { consumer: false }, ({ params }) => {
      if (params.error) {
        console.error(params.error);
        return;
      }

      const transport = device.createSendTransport(params);

      transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
        try {
          await socketRef.current.emit("transport-connect", {
            transportId: params.id,
            dtlsParameters,
          });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      transport.on("produce", async (parameters, callback, errback) => {
        try {
          const { id } = await new Promise((resolve) => {
            socketRef.current.emit("transport-produce", {
              transportId: params.id,
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            }, resolve);
          });
          callback({ id });
        } catch (error) {
          errback(error);
        }
      });

      setProducerTransport(transport);
    });
  }, [device]);

  // Join the room
  const joinRoom = useCallback(async (stream) => {
    if (!socketRef.current) return;

    socketRef.current.emit("joinRoom", { roomName: meetingLink }, async ({ rtpCapabilities }) => {
      const newDevice = await initializeDevice(rtpCapabilities);
      await createSendTransport();
    });
  }, [meetingLink, initializeDevice, createSendTransport]);

  // Effect to handle initialization
  useEffect(() => {
    const socket = initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [initializeSocket, localStream]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (audioProducer) {
      audioProducer.paused ? audioProducer.resume() : audioProducer.pause();
    }
  }, [audioProducer]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (videoProducer) {
      videoProducer.paused ? videoProducer.resume() : videoProducer.pause();
    }
  }, [videoProducer]);

  // Leave room and clean up resources
  const leaveRoom = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
  }, [localStream]);

  return {
    participants,
    instructor,
    localStream,
    userName,
    userRole,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};
