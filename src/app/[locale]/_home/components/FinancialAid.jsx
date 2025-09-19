import { Button } from "antd";
import Image from "next/image";

export const FinancialAid = () => {
  return (
    <div className="mx-3 md:mx-8 lg:mx-12 xl:mx-auto w-fit xl:w-[64rem] rounded-[15px] gap-y-3 py-6 flex flex-col px-6 shadow-[0px_4px_4px_rgba(0,0,0,0.6)] mt-28 md:mt-10 mb-20">
      <h1 className="font-bold">Finacial Aid</h1>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center md:gap-4 mb-4 w-full">
        <p className="text-[12px] leading-[15px] basis-2/3">
          At Gala Education, we recognize that financial barriers can limit
          access to quality education. To support students facing financial
          struggles, we offer scholarships, flexible payment plans, and
          need-based grants. Our scholarship program supports talented students,
          while flexible payment plans make tuition more manageable. We are
          committed to ensuring every student can pursue their educational
          goals, regardless of their financial situation.{" "}
        </p>
        <div className="flex gap-6 mr-6">
          <Image
            src="/person_computer.png"
            width={50}
            height={50}
            alt="person image"
          />
          <Image src="/world.png" width={50} height={50} alt="world image" />
          <Image src="/pdf_image.png" width={50} height={50} alt="pdf image" />
        </div>
      </div>
      <Button
        //   onClick={() => setShowPdf(true)}
        className="border-[1px] md:w-2/5 w-full text-xs text-center font-black p-2 border-[#030DFE] rounded-[10px]"
      >
        Apply for financial aid
      </Button>
    </div>
  );
};
