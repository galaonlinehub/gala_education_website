"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import * as mediasoupClient from "mediasoup-client";

const Room = ({ params: { no: roomName } }) => {
  const socketRef = useRef(null);
  const deviceRef = useRef(null);
  const producerTransportRef = useRef(null);
  const localVideoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  
  const consumerTransports = useRef([]);
  const audioProducer = useRef(null);
  const videoProducer = useRef(null);
  const consumingTransports = useRef([]);

  const videoParams = {
    encodings: [
      { rid: "r0", maxBitrate: 100000, scalabilityMode: "S1T3" },
      { rid: "r1", maxBitrate: 300000, scalabilityMode: "S1T3" },
      { rid: "r2", maxBitrate: 900000, scalabilityMode: "S1T3" },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };

  const initializeSocket = useCallback(() => {
    socketRef.current = io("http://localhost:3001/mediasoup", {
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to media server");
      setIsConnected(true);
      getLocalStream();
    });

    socketRef.current.on("connection-success", ({ socketId }) => {
      console.log("Socket connected with ID:", socketId);
    });

    socketRef.current.on("new-producer", ({ producerId }) => {
      signalNewConsumerTransport(producerId);
    });

    socketRef.current.on("producer-closed", ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.current.find(
        (transportData) => transportData.producerId === remoteProducerId
      );
      
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();
        
        consumerTransports.current = consumerTransports.current.filter(
          (transportData) => transportData.producerId !== remoteProducerId
        );

        const elementToRemove = document.getElementById(`td-${remoteProducerId}`);
        if (elementToRemove && videoContainerRef.current) {
          videoContainerRef.current.removeChild(elementToRemove);
        }
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = initializeSocket();
    return () => {
      cleanup();
      if (audioProducer.current) {
        audioProducer.current.close();
      }
      if (videoProducer.current) {
        videoProducer.current.close();
      }
      consumerTransports.current.forEach(({ consumerTransport, consumer }) => {
        if (consumer) consumer.close();
        if (consumerTransport) consumerTransport.close();
      });
      if (producerTransportRef.current) {
        producerTransportRef.current.close();
      }
    };
  }, [initializeSocket]);

  const getLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { min: 640, max: 1920 },
          height: { min: 400, max: 1080 },
        },
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      joinRoom({
        track: audioTrack,
      }, {
        track: videoTrack,
        ...videoParams,
      });

    } catch (error) {
      console.error("Error accessing media devices:", error);
      setError("Could not access camera or microphone");
    }
  };

  const joinRoom = async (audioParams, videoParams) => {
    socketRef.current.emit("joinRoom", { roomName }, async (data) => {
      if (data.error) {
        console.error("Join room error:", data.error);
        setError("Failed to join room");
        return;
      }

      try {
        deviceRef.current = new mediasoupClient.Device();
        await deviceRef.current.load({ routerRtpCapabilities: data.rtpCapabilities });
        createSendTransport(audioParams, videoParams);
      } catch (error) {
        console.error("Device creation error:", error);
        if (error.name === "UnsupportedError") {
          setError("Browser not supported");
        }
      }
    });
  };

  const createSendTransport = async (audioParams, videoParams) => {
    socketRef.current.emit("createWebRtcTransport", { consumer: false }, async ({ params }) => {
      if (params.error) {
        console.error("Transport creation failed:", params.error);
        return;
      }

      producerTransportRef.current = deviceRef.current.createSendTransport(params);

      producerTransportRef.current.on("connect", async ({ dtlsParameters }, callback, errback) => {
        try {
          await socketRef.current.emit("transport-connect", {
            dtlsParameters,
            
          });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      producerTransportRef.current.on("produce", async (parameters, callback, errback) => {
        try {
          socketRef.current.emit(
            "transport-produce",
            {
              transportId: producerTransportRef.current.id,
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            },
            ({ id, error }) => {
              if (error) {
                errback(error);
                return;
              }
              callback({ id });
            }
          );
        } catch (error) {
          errback(error);
        }
      });

      try {
        audioProducer.current = await producerTransportRef.current.produce(audioParams);
        videoProducer.current = await producerTransportRef.current.produce(videoParams);

        audioProducer.current.on("trackended", () => {
          console.log("Audio track ended");
        });

        videoProducer.current.on("trackended", () => {
          console.log("Video track ended");
        });
      } catch (error) {
        console.error("Failed to produce media:", error);
      }
    });
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    if (consumingTransports.current.includes(remoteProducerId)) return;
    consumingTransports.current.push(remoteProducerId);

    socketRef.current.emit("createWebRtcTransport", { consumer: true }, ({ params }) => {
      if (params.error) {
        console.error("Consumer transport creation failed:", params.error);
        return;
      }

      let consumerTransport = deviceRef.current.createRecvTransport(params);

      consumerTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
        try {
          await socketRef.current.emit("transport-recv-connect", {
            dtlsParameters,
            transportId: params.id,
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
    socketRef.current.emit(
      "consume",
      {
        rtpCapabilities: deviceRef.current.rtpCapabilities,
        remoteProducerId,
        transportId: serverConsumerTransportId,
      },
      async ({ params, error }) => {
        if (error) {
          console.error("Consume error:", error);
          return;
        }

        try {
          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          consumerTransports.current = [
            ...consumerTransports.current,
            {
              consumerTransport,
              serverConsumerTransportId: params.id,
              producerId: remoteProducerId,
              consumer,
            },
          ];

          const newElem = document.createElement("div");
          newElem.setAttribute("id", `td-${remoteProducerId}`);
          
          if (params.kind === "audio") {
            newElem.innerHTML = `<audio id="${remoteProducerId}" autoplay></audio>`;
          } else {
            newElem.innerHTML = `<video id="${remoteProducerId}" autoplay playsInline class="w-full rounded-md shadow-lg"></video>`;
          }
          
          videoContainerRef.current?.appendChild(newElem);

          const mediaElem = document.getElementById(remoteProducerId);
          mediaElem.srcObject = new MediaStream([consumer.track]);

          socketRef.current.emit("consumer-resume", { consumerId: params.id });
        } catch (error) {
          console.error("Failed to consume media:", error);
        }
      }
    );
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center p-4 bg-red-600 rounded-lg">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-6xl p-4 bg-gray-800 rounded-lg shadow-xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Room: {roomName}</h1>
          <p className="text-sm text-gray-400">
            {isConnected ? "Connected" : "Connecting..."}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/2">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg shadow-md"
            />
            <p className="mt-2 text-center">You</p>
          </div>
          <div
            ref={videoContainerRef}
            className="w-full md:w-1/2 flex flex-wrap gap-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Room;