import React from 'react';
import { IoMic, IoMicOff, IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { PhoneTwoTone } from '@ant-design/icons';

const VideoControls = ({ 
  isMuted, 
  isVideoOff, 
  onToggleAudio, 
  onToggleVideo, 
  onLeaveRoom 
}) => {
  return (
    <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
      <button
        onClick={onToggleAudio}
        className={`p-3 rounded-full ${
          isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {isMuted ? (
          <IoMicOff className="w-6 h-6 text-white" />
        ) : (
          <IoMic className="w-6 h-6 text-white" />
        )}
      </button>

      <button
        onClick={onToggleVideo}
        className={`p-3 rounded-full ${
          isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {isVideoOff ? (
          <IoVideocamOff className="w-6 h-6 text-white" />
        ) : (
          <IoVideocam className="w-6 h-6 text-white" />
        )}
      </button>

      <button
        onClick={onLeaveRoom}
        className="bg-red-500 hover:bg-red-600 p-3 rounded-full"
      >
        <PhoneTwoTone className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default VideoControls;