"use client";
import Image from "next/image";

const TemplateLoader = () => {
  return (
    <div className="fixed inset-0 w-screen h-full bg-white z-[9999]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/gala-logo.png"
          width={100}
          height={100}
          alt="Gala Logo"
          priority
        />
      </div>

      <div className="fixed bottom-8 left-0 w-full text-center -mt-72">
        <span className="font-black text-base md:text-xl inline-block">
          Gala Education
        </span>
      </div>
    </div>
  );
};

export default TemplateLoader;
