import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import StuckSpinner from "@/src/components/ui/loading/template/StuckSpinner";

const RootLoading = () => (
  <div className="flex items-center justify-center w-screen h-screen">
    <SlickSpinner strokeWidth={6} color="#001840" size={50} />
  </div>
);

export default RootLoading;

// const RootLoading = () => {
//   const styles = `
//     .loader {
//       width: 50px;
//       aspect-ratio: 1;
//       border-radius: 50%;
//       border: 8px solid #001840;
//       animation:
//         l20-1 0.8s infinite linear alternate,
//         l20-2 1.6s infinite linear;
//     }
//     @keyframes l20-1 {
//       0%    { clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%); }
//       12.5% { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%); }
//       25%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%); }
//       50%   { clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
//       62.5% { clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%); }
//       75%   { clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%); }
//       100%  { clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%); }
//     }
//     @keyframes l20-2 {
//       0%    { transform: scaleY(1) rotate(0deg); }
//       49.99%{ transform: scaleY(1) rotate(135deg); }
//       50%   { transform: scaleY(-1) rotate(0deg); }
//       100%  { transform: scaleY(-1) rotate(-135deg); }
//     }
//   `;

//   return (
//     <div className="!flex !flex-col !items-center !justify-center !lg:w-1/2 !border-none w-screen h-screen">
//       <style>{styles}</style>
//       <div className="loader" />
//     </div>
//   );
// };

// export default RootLoading;
