// const RootLoading = () => {
//   const styles = `
//     .loader {
//       color: #000;
//       width: 4px;
//       aspect-ratio: 1;
//       border-radius: 50%;
//       box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
//       transform: translateX(-38px);
//       animation: l21 0.5s infinite alternate linear;
//     }

//     @keyframes l21 {
//       50%  {box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;}
//       100% {box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;}
//     }
//   `;

//   return (
//     <div className="max-w-screen max-h-screen mt-[18rem] ml-[28rem]">
//       <style>{styles}</style>
//       <div className="loader"></div>
//     </div>
//   );
// };

// export default RootLoading;

const RootLoading = () => {
  const styles = `
    .loader {
      width: 50px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 8px solid #001840;
      animation:
        l20-1 0.8s infinite linear alternate,
        l20-2 1.6s infinite linear;
    }
    @keyframes l20-1 {
      0%    { clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%); }
      12.5% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%); }
      25%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%); }
      50%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
      62.5% { clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
      75%   { clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%); }
      100%  { clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%); }
    }
    @keyframes l20-2 {
      0%    { transform: scaleY(1) rotate(0deg); }
      49.99%{ transform: scaleY(1) rotate(135deg); }
      50%   { transform: scaleY(-1) rotate(0deg); }
      100%  { transform: scaleY(-1) rotate(-135deg); }
    }
  `;

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-90px)]">
      <style>{styles}</style>
      <div className="loader" />
    </div>
  );
};

export default RootLoading;
