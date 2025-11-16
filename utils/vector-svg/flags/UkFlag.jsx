import React from 'react';

const UkFlag = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#012169" />
      <mask id="circleMaskUK">
        <circle cx="12" cy="12" r="11" fill="white" />
      </mask>
      <g mask="url(#circleMaskUK)">
        {/* Blue background */}
        <rect width="24" height="24" fill="#012169" />
        
        {/* White diagonal cross (St Patrick's and St Andrew's) */}
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="white" strokeWidth="4" />
        
        {/* Red diagonal cross (St Patrick's) */}
        <path d="M0 0 L24 24" stroke="#C8102E" strokeWidth="2.5" />
        <path d="M24 0 L0 24" stroke="#C8102E" strokeWidth="2.5" />
        
        {/* White cross (St George's) */}
        <path d="M12 0 L12 24 M0 12 L24 12" stroke="white" strokeWidth="4" />
        
        {/* Red cross (St George's) */}
        <path d="M12 0 L12 24 M0 12 L24 12" stroke="#C8102E" strokeWidth="2.4" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
    </svg>
  );
};

export default UkFlag;

