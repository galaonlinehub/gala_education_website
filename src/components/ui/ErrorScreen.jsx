
import { LuRotateCcw, LuTriangleAlert } from "react-icons/lu";
import { useState } from "react";
import { Contact } from "../layout/Contact";
import StuckSpinner from "./loading/template/StuckSpinner";

const ErrorScreen = ({
  message = "Unable to connect to the server. Please check your internet connection and try again.",
  isRetrying = false,
  onRetry,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
          <LuTriangleAlert className="w-8 h-8 text-red-500" />
        </div>

        <span className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
          Oops! Something went wrong
        </span>

        <p className="text-gray-600 leading-relaxed mb-6 text-sm">{message}</p>

        {isRetrying ? (
          <div className="flex items-center gap-3 px-6">
            <StuckSpinner color="#6b7280" size={18} strokeWidth={3} />
            <span className="text-gray-700 font-medium">Reconnecting...</span>
          </div>
        ) : (
          <button
            onClick={onRetry}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-3 bg-black text-white rounded-full font-medium transition-all duration-300 hover:from-gray-700 hover:bg-opacity-70 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            <div className="flex items-center gap-2">
              <LuRotateCcw
                className={`transition-transform duration-300 ${
                  isHovered ? "rotate-180" : ""
                }`}
              />
              <span>Try Again</span>
            </div>
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <p className="text-xs text-gray-500 text-center">
          If the problem persists, please contact support
        </p>
        <Contact />
      </div>
    </div>
  );
};

export default ErrorScreen;
