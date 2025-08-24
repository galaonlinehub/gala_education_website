import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ScrollableContent = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const t = useTranslations('home_page');

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if we can scroll left
      setShowLeftArrow(container.scrollLeft > 0);

      // Check if we can scroll right
      const canScrollRight = container.scrollWidth > container.clientWidth && container.scrollLeft < container.scrollWidth - container.clientWidth - 10;
      setShowRightArrow(canScrollRight);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();

      // Check on window resize
      window.addEventListener("resize", checkScroll);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-5/6 h-[47rem] sm:h-[30rem] md:h-[35rem]">
      {showLeftArrow && (
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>
      )}

      {showRightArrow && (
        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 z-10 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      )}

      <div ref={scrollContainerRef} className="flex w-full h-full overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-12 sm:flex-row items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center rounded-full  mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacherOne.jpeg" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-2 w-full h-3/4">
              <span className="mt-14 text-center font-bold text-xl">{t('our_teachers')}</span>
              <div className="text-xs leading-loose text-justify md:text-left ">{t('teacher_1_info')}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-6 md:gap-12 sm:flex-row  items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center  rounded-full mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacherTwo.jpeg" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-2 w-full h-3/4">
              <span className="mt-14 text-center font-bold text-xl">{t('our_teachers')}</span>
              <div className="text-xs leading-loose text-justify md:text-left ">{t('teacher_2_info')}.</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-6 md:gap-12 sm:flex-row items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center  rounded-full mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacherThree.jpeg" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-2 w-full h-3/4">
              <span className="mt-14 text-center font-bold text-xl">{t('our_teachers')}</span>
              <div className="text-xs leading-loose text-justify md:text-left ">{t('teacher_3_info')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableContent;
