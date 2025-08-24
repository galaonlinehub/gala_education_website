import { useCallback, useRef, useEffect, useState } from "react";

export const useSound = (url) => {
  const audioRef = useRef(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.preload = "auto";

    audioRef.current.onerror = () => {
      console.error(`Failed to load audio from ${url}`);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

  // Unlock audio context on user interaction
  const unlockAudio = useCallback(async () => {
    if (!audioRef.current || isAudioUnlocked) return;

    try {
      // Play a silent sound to unlock the audio context
      await audioRef.current.play();
      setIsAudioUnlocked(true);
      console.log("Audio context unlocked");
    } catch (error) {
      console.warn("Failed to unlock audio context:", error);
    }
  }, [isAudioUnlocked]);

  // Play sound
  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.warn("Audio not initialized");
      return;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      console.log("Audio played successfully");
    } catch (error) {
      console.error("Audio playback failed:", error);
      if (!isAudioUnlocked) {
        console.log("Attempting to unlock audio context...");
        await unlockAudio();
        try {
          await audioRef.current.play();
          console.log("Audio played after unlocking");
        } catch (retryError) {
          console.error("Retry playback failed:", retryError);
        }
      }
    }
  }, [isAudioUnlocked, unlockAudio]);

  return { play };
};