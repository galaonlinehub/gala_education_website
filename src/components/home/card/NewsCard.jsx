import Image from "next/image";
import React from "react";

function NewsCard({ img, title, desc }) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-y-2 gap-y-3">
      <div className="flex bg-[#001840] text-white flex-col sm:h-[95px] h-fit basis-1/3 ">
        <Image
          alt="image"
          src={img}
          width={200}
          height={200}
          style={{
            boxShadow: "offset-x offset-y blur-radius spread-radius color",
          }}
          className="w-full h-1/3  object-cover"
        />
        <h1 className="h-2/3 text-xs pl-2 pt-2 font-black">{title}</h1>
      </div>
      <div className="sm:p-2 p-1 basis-2/3 justify-between flex flex-col ">
        <p className="text-xs">{desc}</p>
        <button className="border border-[#030DFE] w-fit rounded p-1 text-xs">Read the Article</button>
      </div>
    </div>
  );
}

export default NewsCard;
