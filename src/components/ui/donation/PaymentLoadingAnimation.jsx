import { useState, useEffect } from 'react';

export default function PaymentLoadingAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#001840] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl max-w-md w-full text-center relative">
        
        {/* Smartphone Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="w-full h-full bg-[#001840] rounded-2xl animate-pulse shadow-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" />
              </svg>
            </div>

            {/* Spinning Circle */}
            <div className="absolute -top-2 -right-2 w-8 h-8 border-[3px] border-[#001840] border-t-transparent rounded-full animate-spin"></div>

            {/* Checkmark Animation */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#001840] rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-[#001840] mb-2">
          Processing Payment
        </h2>
        
        <p className="text-[#334155] mb-8">
          Please wait while we securely process your transaction
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#cbd5e1] rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#003366] to-[#001840] rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Decorative Pings */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-[#001840]/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#001840]/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
