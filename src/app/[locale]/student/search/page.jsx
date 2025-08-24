
import React from "react";

const LoaderCircle = ({
  size = 16,
  color = "currentColor",
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animate-[spin_0.6s_linear_infinite] origin-center mt-24 ${className}`}
    {...props}
  >
    <path
      d="M21 12a9 9 0 1 1-6.219-8.56"
      strokeDasharray="30 40"
      strokeDashoffset="0"
    >
      <animate
        attributeName="strokeDashoffset"
        values="0;-70"
        dur="0.6s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default LoaderCircle;
