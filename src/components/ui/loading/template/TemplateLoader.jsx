// "use client";
// import useUser from "@/src/store/auth/user";
// import { cookieFn } from "@/src/utils/fns/client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const TemplateLoader = () => {
//   const [show, setShow] = useState(true);
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       setShow(false);
//       return;
//     }

//     const handleBeforeUnload = () => {
//       cookieFn.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d") && setShow(true);
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [user]);

//   if (user || !show) return null;

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
//     <div className="fixed inset-0 w-screen h-screen bg-white z-[9999]">
//       <div className="relative w-full h-full flex flex-col">
//         <div className="flex-1 flex justify-center items-center">
//           {/* <style>{styles}</style>
//           <div className="loader"></div> */}
//           <Image src={"/gala-logo.png"} width={80} height={80} />
//         </div>
//         <div className="w-full pb-8 flex justify-center">
//           <div className="font-black text-[14px]">Gala</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateLoader;



"use client";
import useUser from "@/src/store/auth/user";
import { cookieFn } from "@/src/utils/fns/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const TemplateLoader = () => {
  const { user, loading } = useUser();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (!loading && user) {
  //     setShow(false);
  //   }

  //   const handleBeforeUnload = () => {
  //     if (cookieFn.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d")) {
  //       setShow(true);
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [user, loading]);

  if (!loading && !user) return null;
  if (!show) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white z-[9999]">
      <div className="relative w-full h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <Image src={"/gala-logo.png"} width={80} height={80} alt="Gala Logo" />
        </div>
        <div className="w-full pb-8 flex justify-center">
          <div className="font-black text-[14px]">Gala</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLoader;