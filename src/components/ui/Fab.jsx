import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdInstallDesktop, MdInstallMobile } from "react-icons/md";
import { useDevice } from "@/src/hooks/useDevice";

export const FloatingActionButton = ({
  icon = <IoAddOutline />,
  position = "bottom-center",
  onClick,
  children,
  className = "",
}) => {
  const { type, width, height } = useDevice();

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };
  const positionClasses2 = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };
  return (
    <button
      onClick={onClick}
      className={`
        animate-bounce
        z-50
        fixed ${positionClasses2[position]}
            py-2 px-6 rounded-full
            bg-blue-600 text-white
            shadow-lg 
            hover:bg-blue-700
            active:transform active:scale-95
            transition-all duration-200 ease-in-out
            flex items-center justify-center gap-2
            group
            hover:shadow-blue-400/50 hover:shadow-xl
        ${className}
      `}
    >
      <div className="text-sm flex items-center justify-center gap-2">
        Install App{" "}
        {type === "desktop" ? <MdInstallDesktop /> : <MdInstallMobile />}
      </div>
      {children && (
        <span
          className="
          max-w-0 overflow-hidden whitespace-nowrap
          group-hover:max-w-[200px]
          transition-all duration-300 ease-in-out
          opacity-0 group-hover:opacity-100
          text-sm font-medium
        "
        >
          {children && (
            <span
              className="
          max-w-0 overflow-hidden whitespace-nowrap
          group-hover:max-w-[300px]
          transition-all duration-300 ease-in-out
          opacity-0 group-hover:opacity-100
          text-sm font-medium
        "
            >
              {children}
            </span>
          )}
        </span>
      )}
    </button>
  );
};
