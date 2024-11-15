import { useState, useEffect } from 'react';

const LoadingState = () => {
  const loaderStyles = {
    width: '16px',
    aspectRatio: '1',
    display: 'grid',
    borderRadius: '50%',
    background: `
      linear-gradient(0deg, rgba(156, 163, 175, 0.5) 30%, transparent 0 70%, rgba(156, 163, 175, 1) 0) 50%/8% 100%,
      linear-gradient(90deg, rgba(156, 163, 175, 0.25) 30%, transparent 0 70%, rgba(156, 163, 175, 0.75) 0) 50%/100% 8%
    `,
    backgroundRepeat: 'no-repeat',
    animation: 'rotate 1s infinite steps(12)',
    position: 'relative',
  };

  return (
    <>
      <style>
        {`
          @keyframes rotate {
            100% { transform: rotate(360deg); }
          }
          
          .loader::before,
          .loader::after {
            content: "";
            grid-area: 1/1;
            border-radius: 50%;
            background: inherit;
          }
          
          .loader::before {
            opacity: 0.915;
            transform: rotate(30deg);
          }
          
          .loader::after {
            opacity: 0.83;
            transform: rotate(60deg);
          }
        `}
      </style>
      
      <div className="loader" style={loaderStyles} />
    </>
  );
};

export default LoadingState;