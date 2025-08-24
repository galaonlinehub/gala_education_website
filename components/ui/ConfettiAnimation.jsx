'use client';

import confetti from 'canvas-confetti';
import { useRef, useEffect } from 'react';

export default function ConfettiButton() {
  const canvasRef = useRef(null); // ✅ Initialize with null, not 0

  useEffect(() => {
    // Create canvas only once when component mounts
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // Create confetti instance once
    const myConfetti = confetti.create(canvas, {
      resize: false, // ✅ Let us handle resizing manually
      useWorker: false,
    });

    // Store confetti instance for use in handleClick
    canvasRef.current.confettiInstance = myConfetti;

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (!canvasRef.current || !canvasRef.current.confettiInstance) return;

    // Use the pre-created confetti instance
    const myConfetti = canvasRef.current.confettiInstance;

    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      // Multiple bursts from different x positions
      myConfetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.1, 0.3), y: 0 },
      });

      myConfetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: randomInRange(0.7, 0.9), y: 0 },
      });

      // Center burst
      myConfetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: 0.5, y: 0 },
      });

      // Wide spread from top
      myConfetti({
        particleCount: 75,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 0 },
      });

      myConfetti({
        particleCount: 75,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0 },
      });
    }, 250);
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      🎉 Confetti! 🎉
    </button>
  );
}