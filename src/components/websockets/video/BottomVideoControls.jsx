"use client"
import React, { useState, useEffect } from "react";
import { MdScreenshotMonitor } from "react-icons/md";
import { FaArrowUp, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { FaHand, FaMessage, FaPeopleGroup } from "react-icons/fa6";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaWindowClose } from "react-icons/fa";
import useControlStore from "@/src/store/video/contols";

function ControlItem({ icon: Icon, label, iconClass, labelClass,onClick }) {
  return (
    <li onClick={onClick} className="flex flex-col items-center cursor-pointer">
      <Icon className={`text-2xl ${iconClass}`} />
      <span className={`text-base ${labelClass}`}>{label}</span>
    </li>
  );
}

function BottomVideoControls({toggleScreenShare,role,audioProducerRef,videoProducerRef}) {
  const [isFocused, setIsFocused] = useState(true); 
  const [isAnimating, setIsAnimating] = useState(false); 
  const {controls,setControlVisibility} = useControlStore()
  

  useEffect(() => {
    let timer;

    if (!isFocused) {
      timer = setTimeout(() => {
        setIsAnimating(true); 
      }, 2000); 
    } else {
      setIsAnimating(false); 
    }

    return () => clearTimeout(timer); 
  }, [isFocused]);

  const toggleAudio = () => {
    if (audioProducerRef.current) {
      const audioTrack = audioProducerRef.current.track;
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setControlVisibility("audio",audioTrack.enabled)
      }
    }
  };
  
  const toggleVideo = () => {
    if (videoProducerRef.current) {
      const videoTrack = videoProducerRef.current.track;
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setControlVisibility("video",videoTrack.enabled)
      }
    }
  };

  return (
    <div
      className={`w-screen h-20 !z-[99] bottom-0 absolute rounded-t-xl bg-[#232333] transition-transform duration-500 ${
        isAnimating
          ? "translate-y-full opacity-0" 
          : "translate-y-0 opacity-100" 
      }`}
      onMouseEnter={() => setIsFocused(true)} 
      onMouseLeave={() => setIsFocused(false)} 
    >
      <ul className="flex items-center justify-between h-full px-10">
        <ControlItem
          icon={controls.audio ? FaMicrophone : FaMicrophoneSlash}
          label="Audio"
          iconClass={controls.audio?"text-white":"text-red-500"}
          labelClass="text-[#aaaaaa]"
          onClick={toggleAudio}
        />
        <ControlItem
          icon={controls.video ? FaVideo : FaVideoSlash}
          label="Video"
          iconClass={controls.video?"text-white":"text-red-500"}
          labelClass="text-[#aaaaaa]"
          onClick={toggleVideo}
        />
        <ControlItem
          icon={FaPeopleGroup}
          label="Attendees"
          iconClass="text-white"
          labelClass="text-[#aaaaaa]"
          onClick={()=>{
            setControlVisibility("attendees",!controls.attendees)
            setControlVisibility("chat",false)
          }}
        />
        <ControlItem
          icon={FaMessage}
          label="Chat"
          iconClass="text-white"
          labelClass="text-[#aaaaaa]"
          onClick={()=>{
            setControlVisibility("attendees",false)
            setControlVisibility("chat", !controls.chat)
          }}
        />
        {role ==="instructor" && <ControlItem
          icon={FaArrowUp}
          label="Share"
          iconClass="text-[#232333] rounded bg-green-600 p-1"
          labelClass="text-[#aaaaaa]"
          onClick={toggleScreenShare}
        />}
        <ControlItem
          icon={IoDocumentAttachOutline}
          label="Materials"
          iconClass="text-white"
          labelClass="text-[#aaaaaa]"
        />
        {role ==="instructor" && <ControlItem
          icon={MdScreenshotMonitor}
          label="Board"
          iconClass="text-white"
          labelClass="text-[#aaaaaa]"
          onClick={() => setControlVisibility("board", !controls.board)}
        />}
        <ControlItem
          icon={FaHand}
          label="Raise"
          iconClass="text-white"
          labelClass="text-[#aaaaaa]"
        />
        {role ==="instructor" && <ControlItem
          icon={FaWindowClose}
          label="End"
          iconClass="text-red-600"
          labelClass="text-[#aaaaaa]"
        />}
      </ul>
    </div>
  );
}

export default BottomVideoControls;
