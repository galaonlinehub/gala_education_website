// export const Trustees = () => {
//   const trustees = [
//     {
//       name: "Paediatric Association of Tanzania(PAT)",
//     },
//     {
//       name: "Phils Care Foundation",
//     },
//     {
//       name: "Student Connect",
//     },
//     {
//       name: "Msimbazi Secondary School",
//     },
//   ];
//   return (
//     <section className="bg-[#001840] text-white flex items-center gap-3 h-[80px] justify-center">
//       <h2 className="text-lg font-extrabold">Trusted by:</h2>
//       <div className="flex items-center justify-evenly gap-8">
//         {trustees.map((trustee, idx) => (
//           <p className="text-base" key={idx}>
//             {trustee.name}
//           </p>
//         ))}
//       </div>
//     </section>
//   );
// };

"use client"
export const Trustees = () => {
  const trustees = [
    {
      name: "Paediatric Association of Tanzania(PAT)",
    },
    {
      name: "Phils Care Foundation",
    },
    {
      name: "Student Connect",
    },
    {
      name: "Msimbazi Secondary School",
    },
  ];

  // Duplicate trustees for seamless loop
  const duplicatedTrustees = [...trustees, ...trustees, ...trustees];

  return (
    <section className="bg-[#001840] text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-3 h-auto sm:h-[80px] py-3 sm:py-0 px-2 sm:px-4 justify-center overflow-hidden">
      <h2 className="text-sm sm:text-base md:text-lg font-extrabold whitespace-nowrap flex-shrink-0">
        Trusted by:
      </h2>
      
      {/* All screens: Animated marquee */}
      <div className="flex flex-1 overflow-hidden relative">
        <div 
          className="flex items-center gap-6 md:gap-8 lg:gap-12 animate-marquee"
          style={{
            animation: 'marquee 25s linear infinite',
          }}
        >
          {duplicatedTrustees.map((trustee, idx) => (
            <p className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap flex-shrink-0" key={idx}>
              {trustee.name}
            </p>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};