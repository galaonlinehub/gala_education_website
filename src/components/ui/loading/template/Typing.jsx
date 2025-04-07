// import React from 'react';

// const TypingIndicator = () => {
//   return (
//     <div className="typing-indicator">
//       <span></span>
//       <span></span>
//       <span></span>
//       <style jsx>{`
//         .typing-indicator {
//           display: flex;
//           gap: 4px;
//           padding: 8px;
//         }
//         .typing-indicator span {
//           width: 8px;
//           height: 8px;
//           background-color: #999;
//           border-radius: 50%;
//           animation: typing 1s infinite;
//         }
//         .typing-indicator span:nth-child(2) {
//           animation-delay: 0.2s;
//         }
//         .typing-indicator span:nth-child(3) {
//           animation-delay: 0.4s;
//         }
//         @keyframes typing {
//           0%,
//           100% {
//             opacity: 0.2;
//           }
//           50% {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TypingIndicator;



const TypingIndicator = () => {
    return (
      <>
        <style>
          {`
            .loader {
              width: 30px;
              aspect-ratio: 2;
              --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
              background: 
                var(--_g) 0%   50%,
                var(--_g) 50%  50%,
                var(--_g) 100% 50%;
              background-size: calc(100% / 3) 50%;
              animation: l3 1s infinite linear;
            }
  
            @keyframes l3 {
              20% { background-position: 0% 0%, 50% 50%, 100% 50% }
              40% { background-position: 0% 100%, 50% 0%, 100% 50% }
              60% { background-position: 0% 50%, 50% 100%, 100% 0% }
              80% { background-position: 0% 50%, 50% 50%, 100% 100% }
            }
          `}
        </style>
        <div className="loader"></div>
      </>
    );
  };
  
  export default TypingIndicator;
  