import React, { useEffect, useState } from 'react';

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  
  const CIRCLE_RADIUS = 90;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  
  const loadingTips = [
    "Preparing your virtual classroom...",
    "Loading educational resources...",
    "Connecting with teachers...",
    "Setting up your personalized dashboard..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    };
  }, [loadingTips.length]);

  const strokeDashoffset = CIRCLE_CIRCUMFERENCE - (progress / 100) * CIRCLE_CIRCUMFERENCE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="relative flex justify-center">
            {/* Main circular progress */}
            <div className="relative w-64 h-64">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r={CIRCLE_RADIUS}
                  className="stroke-current text-gray-100"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="128"
                  cy="128"
                  r={CIRCLE_RADIUS}
                  className="stroke-current text-blue-500"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset,
                    transition: 'stroke-dashoffset 0.5s ease'
                  }}
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Percentage display */}
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  {Math.round(progress)}%
                </div>
                
                {/* Floating books */}
                <div className="relative w-16 h-16">
                  <div className="book-stack">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="absolute w-8 h-10 bg-white shadow-lg rounded"
                        style={{
                          top: `${index * -4}px`,
                          left: `${index * 2}px`,
                          transform: `rotate(${index * -5}deg)`,
                          animation: `float ${1 + index * 0.2}s ease-in-out infinite alternate`
                        }}
                      >
                        <div className="h-1 w-4 bg-blue-400 rounded-full ml-2 mt-2" />
                        <div className="h-1 w-3 bg-blue-300 rounded-full ml-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full animate-spin-slow opacity-10">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-500 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 30}deg) translateY(-120px)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Loading message */}
          <div className="text-center space-y-4">
            <p className="text-gray-600 font-medium animate-fade">
              {loadingTips[currentTip]}
            </p>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-4px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade {
          animation: fadeInOut 3s infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .book-stack {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;