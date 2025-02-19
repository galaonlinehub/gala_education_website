import Image from "next/image";
import React from "react";

function NewsCard({ img, title, desc }) {
  return (
    <div className="flex md:flex-row flex-col sm:gap-y-2 gap-y-3">
      <div className="flex  bg-[#001840] text-white flex-col md:h-[130px] lg:h-[85px] h-[85px] w-full basis-1/3 ">
        <div className="h-44 md:h-10 w-full flex">
          <Image
            alt="image"
            src={img}
            width={200}
            height={200}
            style={{
              boxShadow: "offset-x offset-y blur-radius spread-radius color",
            }}
            className="w-full object-cover"
          />
        </div>
        <h1 className="md:h-2/3 text-xs md:pl-2 md:pt-2 p-6 md:p-0 font-black">{title}</h1>
      </div>
      <div className="sm:p-2 gap-2 md:gap-0 p-1 basis-2/3 justify-between flex flex-col ">
        <p className="text-xs">{desc}</p>
        <button className="border border-[#030DFE] w-fit rounded p-1 text-xs">Read the Article</button>
      </div>
    </div>
  );
}

export default NewsCard;
