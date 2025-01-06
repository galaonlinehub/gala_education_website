'use client';

import React, { useEffect, useRef,useState } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import Cookies from 'js-cookie';
import { decrypt } from '@/src/utils/constants/encryption';

const VideoComponent = ({params:{id_no}}) => {
  const localVideoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [userName,setUserName] = useState("")
  const [role,setRole] = useState("")
  

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
    const socket = io("http://localhost:3001/signaling", {
      query: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    const roomName = meeting_link;

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

    const streamSuccess = (stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
      videoParams = { track: stream.getVideoTracks()[0], ...videoParams };

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

    const removeParticipant = (producerId) => {
      setParticipants((prev) =>
        prev.filter((participant) => participant.producerId !== producerId)
      );
      if (instructor && instructor.producerId === producerId) {
        setInstructor(null);
      }
    };

    const getLocalStream = () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: { min: 640, max: 1920 },
            height: { min: 400, max: 1080 },
          },
        })
        .then(streamSuccess)
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

          
          const newElem = document.createElement('div');
          newElem.setAttribute('id', `td-${remoteProducerId}`);
          newElem.setAttribute('data-username', params?.user?.name);
          

          if (params.kind === 'audio') {
            newElem.innerHTML = `<audio id="${remoteProducerId}" autoplay></audio>`;
          } else {
            newElem.setAttribute('className', 'remoteVideo');
            newElem.innerHTML = `<div>
            <video id="${remoteProducerId}" autoplay className="video"></video> 
            <p>${params.user.name} (${params?.user?.role})</p>
            </div>`;
          }

          if (videoContainerRef.current) {
            videoContainerRef.current.appendChild(newElem);
          }

          const { track } = consumer;
          document.getElementById(remoteProducerId).srcObject = new MediaStream([track]);

          socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId });
        }
      );
    };
    socket.on('connect', () => {
        console.log('Connected to server');
        
       
      });

    socket.on('connection-success', ({ socketId,role,name }) => {
      console.log(socketId);
      setUserName(name);
      setRole(role);
      getLocalStream();
    });

    socket.on('new-producer', ({ producerId,user }) => {
        console.log("New producer connected : "+producerId)
        signalNewConsumerTransport(producerId,user)});


    socket.on('producer-closed', ({ remoteProducerId }) => {
      const producerToClose = consumerTransports.find((transportData) => transportData.producerId === remoteProducerId);
      if (producerToClose) {
        producerToClose.consumerTransport.close();
        producerToClose.consumer.close();

        const index = consumerTransports.indexOf(producerToClose);
        consumerTransports.splice(index, 1);
      }

      if (videoContainerRef.current) {
        const element = document.getElementById(`td-${remoteProducerId}`);
        if (element) videoContainerRef.current.removeChild(element);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);



  return (
    <div id="video">
      <table className="mainTable">
        <tbody>
          <tr>
            <td className="localColumn">
              <video ref={localVideoRef} id="localVideo" autoPlay muted className="video"></video>
            </td>
            <td className="remoteColumn">
              <div id="videoContainer" ref={videoContainerRef}></div>
            </td>
          </tr>
        </tbody>
      </table>
      <style>{`
        .video {
          width: 360px;
          background-color: black;
          padding: 10px;
          margin: 1px;
        }
        .mainTable {
          width: 100%;
        }
        .localColumn {
          width: 246px;
        }
        .remoteColumn {
          display: flex;
          flex-wrap: wrap;
        }
        #localVideo {
          width: 240px;
        }
        .remoteVideo {
          float: left;
        }
        .videoWrap {
          margin: 3px;
          display: flex;
          justify-content: center;
        }
        @media only screen and (max-width: 1060px) {
          .video {
            width: 300px;
          }
        }
        @media only screen and (max-width: 940px) {
          .video {
            width: 240px;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoComponent;
