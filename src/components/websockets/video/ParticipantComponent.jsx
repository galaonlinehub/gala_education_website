import React, { useEffect, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';


const ParticipantVideo = ({ participant, isInstructor, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div className="relative w-full h-full">
      {participant.hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={participant.isLocal}
          className={`${className} bg-gray-900`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <FaSpinner className="w-20 h-20 text-gray-600" />
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg">
        <span className="text-white text-sm">
          {participant.name}
        </span>
        {isInstructor && (
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
            Instructor
          </span>
        )}
        {participant.isMuted && (
          <span className="text-red-500 text-xs">
            Muted
          </span>
        )}
      </div>
    </div>
  );
};

export default ParticipantVideo;