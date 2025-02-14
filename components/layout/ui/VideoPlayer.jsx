import React, { useState, useRef, useEffect } from 'react';
import { BsFillPlayFill, BsPauseFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';

const VideoPlayer = ({videoSrc}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Setup Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Handle autoplay when video enters/leaves viewport
  useEffect(() => {
    if (videoRef.current && !hasInteracted && isInViewport && !autoplayAttempted) {
      setAutoplayAttempted(true);
      
      // Try to play unmuted first
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          videoRef.current.volume = volume;
          setIsMuted(false);
        })
        .catch(() => {
          // If unmuted autoplay fails, try muted autoplay as fallback
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // If both attempts fail, reset to initial state
              setIsPlaying(false);
              videoRef.current.muted = false;
              setIsMuted(false);
            });
        });
    } else if (!isInViewport && videoRef.current && !hasInteracted) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInViewport, hasInteracted, volume, autoplayAttempted]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // When user manually plays, ensure volume is restored
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.volume = volume;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setHasInteracted(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasInteracted(false);
    setAutoplayAttempted(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const showPlayButton = !hasInteracted || !isPlaying || (isPlaying && isHovering);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-contain"
          src={videoSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Centered play/pause button */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     transition-opacity duration-300 z-10 
                     ${showPlayButton ? 'opacity-100' : 'opacity-0'}`}
        >
          <button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full
                     transition-colors duration-200 flex items-center justify-center"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <BsPauseFill className="w-8 h-8" />
            ) : (
              <BsFillPlayFill className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Bottom controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                     px-4 py-2 transition-opacity duration-300
                     ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Progress bar */}
          <div className="w-full mb-2">
            <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <BsPauseFill size={20} /> : <BsFillPlayFill size={20} />}
              </button>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <BsFillVolumeMuteFill size={20} />
                  ) : (
                    <BsFillVolumeUpFill size={20} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Time display */}
            <div className="text-sm">
              {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;