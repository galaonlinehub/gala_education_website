import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";

export default function VideoBackground() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden">    
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/gala_home_background_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>


            <Button
                onClick={toggleMute}
                className="absolute top-16 left-2 md:left-10 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    <BiVolumeMute />
                ) : (
                    <GoUnmute />
                )}
            </Button>
        </div>
    );
}