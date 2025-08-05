import Image from "next/image";
import React from "react";

import Animator from "../animations/Animator";

function Card2({ image, title, desc }) {
  return (
    <div className="flex-col flex md:w-[200px] lg:w-[300px] w-full shrink-0 shadow-md shadow-black">
      <div className="">
        <Image alt="image Data" src={image} className="md:w-[300px] w-full md:h-[119px] h-[150px] object-cover border-white border-[1px] " width={1920} height={1080} />
      </div>

      <div className="md:h-[450px] lg:h-[270px] bg-[#001840]  flex flex-col px-8 py-10">
        <Animator delay={0.4} direction="down">
          <span className="text-white font-black ">{title}</span>
        </Animator>

        <Animator delay={0.6} direction="down">
          <span className="text-white text-[12px]">{desc}</span>
        </Animator>
      </div>
    </div>
  );
}

export default Card2;
