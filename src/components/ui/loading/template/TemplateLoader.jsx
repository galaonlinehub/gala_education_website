"use client";
import Image from "next/image";

const TemplateLoader = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white z-[9999]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/gala-logo.png"
          width={140}
          height={140}
          alt="Gala Logo"
          priority
        />
      </div>
      
      <div className="fixed bottom-8 left-0 w-full text-center -mt-72">
        <span className="font-black text-sm md:text-[20px] inline-block">
          Gala Education
        </span>
      </div>
    </div>
  );
};

export default TemplateLoader;