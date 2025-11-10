import React from 'react';

const TzFlag = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#1EB53A" />
      <mask id="tzFlagMask">
        <circle cx="12" cy="12" r="11" fill="white" />
      </mask>
      <g mask="url(#tzFlagMask)">
        <rect width="24" height="24" fill="#1EB53A" />
        <polygon points="24,0 24,24 0,24" fill="#00A3DD" />
        <rect x="-6" y="8" width="36" height="8" transform="rotate(-45 12 12)" fill="#FCD116" />
        <rect x="-4" y="9.5" width="32" height="5" transform="rotate(-45 12 12)" fill="#000000" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
    </svg>
  );
};

export default TzFlag;
