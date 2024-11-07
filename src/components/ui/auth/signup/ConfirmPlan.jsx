
import React from 'react';
import { Button } from 'antd';
import { useTabNavigator } from "@/src/store/auth/signup";


const ConfirmPlan = () => {
  const setActiveTab = useTabNavigator((state) => state.setActiveTab);
  const handleConfirmPayClick = () =>setActiveTab(2);

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center w-full gap-24 my-24 lg:my-28">
      <div className="border-[3px] border-[#030DFE] rounded-xl w-[280px] md:w-full max-w-[312px] h-auto flex flex-col items-center p-6 gap-8 sm:p-8 sm:gap-12">
        <div className="flex flex-col items-center">
          <span className="text-black text-[16px] font-extrabold">Monthly Bill</span>
          <span className="text-[10px] text-[#8C8B8D]">7-day-money-back-guarantee</span>
        </div>

        <span className="text-center text-[12px] text-black font-medium">
          This fee grants you full access to Gala Education&#39;s teaching platform, allowing you to connect with students,
          manage lessons, and utilize our advanced tools and resources to deliver high-quality education.
        </span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-black text-[12px] font-medium">3,000 TSH</span>
          <span className="text-black text-[12px] font-medium">(Billed Monthly)</span>
        </div>
        <Button onClick={()=>handleConfirmPayClick()} className="!rounded-sm !bg-[#010798] !w-[146px] !h-[46.28px]" type="primary">
          CONTINUE
        </Button>
      </div>
      <div className="border-[3px] border-[#030DFE] w-[280px] md:w-full max-w-[312px] h-auto rounded-xl flex flex-col items-center p-6 gap-8 sm:p-8 sm:gap-12">
        <div className="flex flex-col items-center">
          <span className="text-black text-[16px] font-extrabold">Monthly Bill</span>
          <span className="text-[10px] text-[#8C8B8D]">7-day-money-back-guarantee</span>
        </div>

        <span className="text-center text-[12px] text-black font-medium">
          This fee grants you full access to Gala Education's teaching platform, allowing you to connect with students,
          manage lessons, and utilize our advanced tools and resources to deliver high-quality education.
        </span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-black text-[12px] font-medium">3,000 TSH</span>
          <span className="text-black text-[12px] font-medium">(Billed Monthly)</span>
        </div>
        <Button onClick={()=>handleConfirmPayClick()}  className="!rounded-sm !bg-[#010798] !w-[146px] !h-[46.28px]" type="primary">
          CONTINUE
        </Button>
      </div>

      {/* <svg
        className="absolute sm:w-[200px] sm:h-[200px] lg:w-[500px] lg:h-[500px]"
        viewBox="0 0 496 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M376 184H456C469.232 184 480 173.232 480 160V126.528C489.288 123.216 496 114.416 496 104C496 90.768 485.232 80 472 80C458.768 80 448 90.768 448 104C448 114.416 454.712 123.216 464 126.528V160C464 164.416 460.416 168 456 168H376C362.768 168 352 178.768 352 192V344H336V152C336 147.584 339.584 144 344 144H400C413.232 144 424 133.232 424 120V94.528C433.288 91.216 440 82.416 440 72C440 58.768 429.232 48 416 48C402.768 48 392 58.768 392 72C392 82.416 398.712 91.216 408 94.528V120C408 124.416 404.416 128 400 128H344C330.768 128 320 138.768 320 152V344H304V280H288V344H272V312H256V344H240V312H224V344H208V280H192V344H176V136C176 122.768 165.232 112 152 112H88C83.584 112 80 108.416 80 104V46.528C89.288 43.216 96 34.416 96 24C96 10.768 85.232 0 72 0C58.768 0 48 10.768 48 24C48 34.416 54.712 43.216 64 46.528V104C64 117.232 74.768 128 88 128H152C156.416 128 160 131.584 160 136V344H144V176C144 162.768 133.232 152 120 152H40C35.584 152 32 148.416 32 144V86.528C41.288 83.216 48 74.416 48 64C48 50.768 37.232 40 24 40C10.768 40 0 50.768 0 64C0 74.416 6.712 83.216 16 86.528V144C16 157.232 26.768 168 40 168H120C124.416 168 128 171.584 128 176V344H32V360H464V344H368V192C368 187.584 371.584 184 376 184ZM472 96C476.416 96 480 99.584 480 104C480 108.416 476.416 112 472 112C467.584 112 464 108.416 464 104C464 99.584 467.584 96 472 96ZM416 64C420.416 64 424 67.584 424 72C424 76.416 420.416 80 416 80C411.584 80 408 76.416 408 72C408 67.584 411.584 64 416 64ZM72 32C67.584 32 64 28.416 64 24C64 19.584 67.584 16 72 16C76.416 16 80 19.584 80 24C80 28.416 76.416 32 72 32ZM24 72C19.584 72 16 68.416 16 64C16 59.584 19.584 56 24 56C28.416 56 32 59.584 32 64C32 68.416 28.416 72 24 72Z"
          fill="black"
          fillOpacity="0.07"
        />
      </svg> */}
    </section>
  );
};

export default ConfirmPlan;

