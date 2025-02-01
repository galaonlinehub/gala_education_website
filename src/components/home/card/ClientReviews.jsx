import QuoteVector from "@/src/utils/vector-svg/QuoteVector";
import Image from "next/image";
import React from "react";

const ClientReviews = ({clientName,clientMessage,clientImage}) => {
  return (
    <div className="flex flex-col items-center w-80 p-5 shadow-lg gap-4 justify-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <div className="relative w-16 h-16 overflow-hidden rounded-full">
            <Image src={clientImage} alt="Profile picture" fill className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">{clientName}</span>
            <span className="text-xs text-gray-400">One Year User</span>
          </div>
        </div>
        <div>
          <QuoteVector />
        </div>
      </div>
      <div className="text-xs">{clientMessage}</div>
    </div>
  );
};

export default ClientReviews;
