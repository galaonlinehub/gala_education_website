"use client"
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#001840] opacity-20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-[#001840] opacity-15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-[#001840] opacity-25 rotate-12 animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-[#001840] opacity-10 rotate-45 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full opacity-5 bg-[#001840] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="mb-10">
          <div className="text-6xl lg:text-[7rem] font-black text-[#001840] leading-none animate-pulse">
            404
          </div>
        </div>

        {/* Simple message */}
        <div className="mb-12 ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#001840] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="px-6 py-2.5 bg-[#001840] text-white font-semibold rounded-xl hover:bg-[#003875] transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-w-[160px] inline-block"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-transparent text-[#001840] font-semibold border-2 border-[#001840] rounded-xl hover:bg-[#001840] hover:text-white transition-all duration-300 transform hover:scale-105 min-w-[160px]"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}