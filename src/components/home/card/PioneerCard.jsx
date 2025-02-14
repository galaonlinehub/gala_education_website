import React from "react";

function PioneerCard({ icon, title, desc }) {
  return (
    <div className="lg:w-[259px] md:w-[230px] relative w-full shrink-0 px-2 border-gray-300 h-32 md:h-[200px] gap-y-2  flex items-center flex-col justify-center bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.2)]  border-[1px]">
      <span className="flex mt-4">{icon}</span>

      <h1 className="font-extrabold absolute md:relative top-4 md:top-0 text-[16px] px-6 leading-[20px] text-black">{title}</h1>
      <p className="text-[10px] absolute md:relative top-40 md:top-0 leading-[15px] px-6 text-center text-black">{desc}</p>
    </div>
  );
}

export default PioneerCard;
