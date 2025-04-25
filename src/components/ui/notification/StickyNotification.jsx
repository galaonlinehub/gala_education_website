import { useDevice } from "@/src/hooks/useDevice";
import { LuX } from "react-icons/lu";

const StickyNotification = () => {
  const { width } = useDevice();
  const btnWidth = width < 300 ? 14 : width < 500 ? 18 : width < 800 ? 24 : 26;
  return (
    <div className="bg-[#001840] w-[99%] sm:w-[95%] md:w-[85%] lg:w-[75%] max-w-5xl h-16 sm:h-14 px-4 fixed top-4 z-[999] left-1/2 -translate-x-1/2 text-white text-xs rounded-md shadow flex items-center justify-between">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="hidden sm:block font-semibold text-sm whitespace-nowrap">
          Lesson Alert:
        </div>

        <div className="flex items-center gap-1 text-xs sm:text-sm text-white">
          <span className="font-medium line-clamp-1">Algebra</span>
          <span className="text-blue-300">→</span>
          <span className="font-medium line-clamp-1">Complex numbers</span>
        </div>

        <div className="text-[8px] md:text-[10px] text-blue-300 bg-blue-800/50 px-2 py-0.5 rounded-full">
          In 15min
        </div>

        <div className="hidden md:block text-[10px] text-blue-300 bg-blue-800/50 px-2 py-0.5 rounded-full">
          Starts at 13:00
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ backgroundColor: "#1a3a7d" }}
          >
            DM
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-medium">Denis Mgaya</span>
            <span className="text-[10px] text-blue-300">13:00</span>
          </div>
        </div>

        <button className="text-white px-3 py-1 rounded-md text-[11px] font-medium transition-colors flex gap-1 bg-[#3b82f6] hover:bg-[#2563eb]">
          <span>Join</span> <span className="hidden md:block">Now</span>
        </button>

        <button className="text-white hover:text-blue-300">
          <LuX size={btnWidth} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default StickyNotification;
