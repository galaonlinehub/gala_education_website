import Image from "next/image";
import React from "react";

import QuoteVector from "@/src/utils/vector-svg/QuoteVector";

const ClientReviews = ({clientName,clientMessage,clientImage}) => {
  return (
    <div className="flex flex-col items-center h-[12rem] md:h-[12rem] w-full md:w-56 lg:w-80  p-5 shadow-lg gap-4 justify-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <div className="relative w-16 h-16 overflow-hidden rounded-full">
            <Image src={clientImage} alt="Profile picture" fill className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold !text-left text-sm text-black">{clientName}</span>
            <span className="text-xs !text-left text-gray-400">One Year User</span>
          </div>
        </div>
        <div>
          <QuoteVector />
        </div>
      </div>
      <div className="text-xs text-black !text-left">{clientMessage}</div>
    </div>
  );
};

export default ClientReviews;
