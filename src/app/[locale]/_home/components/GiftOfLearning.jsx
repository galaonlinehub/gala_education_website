'use client';
import { Button } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";

import SvgFour from "@/components/home/svg/SvgFour";
import SvgOne from "@/components/home/svg/SvgOne";
import SvgThree from "@/components/home/svg/SvgThree";
import SvgTwo from "@/components/home/svg/SvgTwo";
import { useEffect, useState } from "react";
import Donate from "@/components/ui/donation/Donate";
import ProcessingModal from "@/components/ui/donation/ProcessingModal";
import { PaymentSocketProvider } from '@/hooks/misc/paymentSocketContext';


export const GiftOfLearning = () => {

  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const handleDonateVisibility = () => {
    setShowDonatePopup(true);
  };

  useEffect(() => {
    if (showDonatePopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showDonatePopup]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-[900] text-3xl text-center xxs:mt-12 md:mt-0 px-4">
        Give the gift of learning - help us <br /> Educate every child{" "}
      </h2>

      <p className="text-xs md:w-1/2 w-full px-4 text-center py-4">
        Your support provides vital resources and opportunities that help
        children, especially in underserved areas, access quality education.
        Together, we can break barriers to learning and ensure every child has the
        chance to grow, learn, and thrive.{" "}
      </p>

      <div className="py-8">
        <Button
          variant="solid"
          type="primary"
          icon={<FaArrowRightLong />}
          onClick={handleDonateVisibility}
          className="!p-4 !bg-[#030DFE] !font-bold md:text-xs !rounded-md !text-white"
        >
          Donate Now
        </Button>
      </div>

    
    <PaymentSocketProvider>

      {showDonatePopup && (
        <div className="fixed inset-0 bg-black/70 z-[80] flex justify-center items-center">
          <div className="p-1 rounded-lg w-full items-center justify-center flex ">
            <Donate
              setShowDonatePopup={setShowDonatePopup}
              showDonatePopup={showDonatePopup}
              setShowProcessingModal={setShowProcessingModal}
            />
          </div>
        </div>
      )}

      <ProcessingModal
        setShowProcessingModal={setShowProcessingModal}
        showProcessingModal={showProcessingModal}
      />

      </PaymentSocketProvider>


      <section className="relative w-full px-4 overflow-hidde">
        <div
          id="scroll-container"
          className="flex gap-4 items-end justify-start md:justify-center mt-3 h-fit mb-8 py-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          <div className="lg:w-44 w-44 md:w-32 flex-shrink-0 flex flex-col gap-3 snap-start">
            <article className="bg-[url('/donation/village_child.png')] bg-cover bg-center h-[18rem] p-3 rounded-3xl">
              <div className="flex flex-col justify-center h-full text-white">
                <p className="text-2xl font-bold leading-6 px-4">
                  Put a <br /> smile <br /> on a <br /> child&apos;s <br /> face
                </p>
              </div>
            </article>

            <div className="bg-[#06402B] rounded-3xl p-4 h-[10rem] relative text-white overflow-hidden">
              <SvgFour className="absolute inset-0 w-full h-full opacity-70" />
              <div className="relative z-10 flex flex-col justify-center h-full">
                <p className="text-2xl font-bold leading-none">
                  85 <span className="text-lg">%</span>
                </p>
                <p className="text-xs font-medium mt-2">
                  Literacy improvement rate in schools we&apos;ve partnered with.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-44 w-44 md:w-32 bg-[url('/donation/village_theme.png')] bg-cover bg-center h-[20rem] flex-shrink-0 rounded-3xl p-3 snap-start text-white">
            <div className="flex flex-col justify-end h-full">
              <p className="text-4xl font-bold leading-none">800+</p>
              <p className="text-xs font-medium mt-2 mb-4">
                Tanzanian teachers empowered through our daily training programs.{" "}
              </p>
            </div>
          </div>

          <div className="lg:w-44 w-44 md:w-32 h-[13rem] flex-shrink-0 rounded-3xl p-3 relative bg-[#7A87A3] text-white snap-start">
            <div className="flex flex-col justify-between h-full gap-3">
              <div className="font-bold text-base sm:text-lg md:text-sm px-2">
                Join many people building a better tomorrow.
              </div>
              <div className="!p-2 !bg-black !font-bold items-center flex justify-center text-xs md:text-xs !rounded-xl !text-white">
                <span>Join Our Community</span>
              </div>
            </div>
            <SvgThree className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 opacity-70" />
          </div>

          <div className="lg:w-44 w-44 md:w-32 bg-[url('/donation/village_class.png')] bg-cover bg-center h-[20rem] flex-shrink-0 rounded-3xl p-3 snap-start text-white">
            <div className="flex flex-col justify-end h-full">
              <p className="text-xs font-bold">
                Real stories, real impact Witness how your support changes
                lives—from classrooms to communities.
              </p>
              <p className="text-xs font-medium mb-4">
                {/* {t("witness_your_support")} */}
              </p>
            </div>
          </div>

          <div className="lg:w-44 w-44 md:w-32 flex-shrink-0 flex flex-col gap-3 snap-start">
            <div className="relative bg-[#06402B] h-[18rem] w-full p-4 rounded-3xl overflow-hidden text-white">
              <SvgOne className="absolute top-3 right-3 w-1/2 h-auto opacity-70" />
              <SvgTwo className="absolute bottom-3 left-8 md:left-4 lg:left-8 w-3/4 h-auto opacity-70" />
              <div className="relative z-10 flex flex-col justify-center h-full">
                <p className="text-2xl font-bold leading-none px-4 md:px-1 lg:px-4">
                  One Child. One Teacher. One Book.{" "}
                </p>
              </div>
            </div>

            <div className="bg-[url('/donation/students_in_class.png')] bg-cover bg-center h-[10rem] p-3 rounded-3xl text-white">
              <div className="flex flex-col justify-end h-full">
                {/* <p className="text-xs font-medium">{t("give_the_gift")}</p> */}
                <p className="text-xs font-medium mb-4">
                  Give the Gift of Learning Empower a new generation of leaders.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};
