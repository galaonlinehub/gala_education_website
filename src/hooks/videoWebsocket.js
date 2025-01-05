import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

export const setupSocketAndMediaSoup = (localVideoRef, videoContainerRef) => {
  const roomName = window.location.pathname.split('/')[2];
  const socket = io('http://localhost:3001/mediasoup');

  let device;
  let rtpCapabilities;
  let producerTransport;
  let consumerTransports = [];
  let audioParams;
  let videoParams;

  const streamSuccess = (stream) => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    audioParams = { track: stream.getAudioTracks()[0] };
    videoParams = { track: stream.getVideoTracks()[0], params: { /* Your Params */ } };
    joinRoom();
  };

  const joinRoom = () => {
    socket.emit('joinRoom', { roomName }, (data) => {
      rtpCapabilities = data.rtpCapabilities;
      createDevice();
    });
  };

  const createDevice = async () => {
    try {
      device = new Device();
      await device.load({ routerRtpCapabilities: rtpCapabilities });
      createSendTransport();
    } catch (error) {
      console.error(error);
    }
  };

  const createSendTransport = () => {
    socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
      if (params.error) {
        console.error(params.error);
        return;
      }

      producerTransport = device.createSendTransport(params);

      producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        try {
          await socket.emit('transport-connect', { dtlsParameters });
          callback();
        } catch (error) {
          errback(error);
        }
      });

      producerTransport.on('produce', async (parameters, callback, errback) => {
        try {
          await socket.emit(
            'transport-produce',
            {
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData,
            },
            ({ id }) => callback({ id })
          );
        } catch (error) {
          errback(error);
        }
      });

      connectSendTransport();
    });
  };

  const connectSendTransport = async () => {
    try {
      const audioProducer = await producerTransport.produce(audioParams);
      const videoProducer = await producerTransport.produce(videoParams);

      audioProducer.on('trackended', () => console.log('Audio track ended'));
      videoProducer.on('trackended', () => console.log('Video track ended'));
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize media stream
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: { width: { min: 640, max: 1920 }, height: { min: 400, max: 1080 } } })
    .then(streamSuccess)
    .catch((error) => console.error(error.message));
};
