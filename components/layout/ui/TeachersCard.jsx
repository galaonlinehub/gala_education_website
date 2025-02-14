import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const ScrollableContent = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

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
    <div className="relative w-5/6 h-[47rem] md:h-[30rem]">
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
        <div className="flex flex-col gap-3 md:gap-12 sm:flex-row items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center rounded-full  mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacher.png" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-4 w-full h-3/4">
              <span className="mt-16 text-center font-bold text-xl">Our Teachers</span>
              <div className="text-xs leading-loose text-justify md:text-left ">Meet Ms. Zahra Mchome, a passionate Chemistry teacher with a commitment to making complex concepts easy and engaging for students. Her expertise and dedication inspire learners to excel, while creating an interactive and supportive environment. Joining Gala Education not only connects teachers like Ms. Mchome with eager students but also offers professional growth, flexible teaching opportunities, and the chance to make a real impact in education across Tanzania.</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-12 sm:flex-row  items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center  rounded-full mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacher3.jpeg" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-4 w-full h-3/4">
              <span className="mt-16 text-center font-bold text-xl">Our Teachers</span>
              <div className="text-xs leading-loose text-justify md:text-left ">Meet Mr. John Smith, a dedicated Mathematics teacher who brings numbers to life through innovative teaching methods and a deep passion for education. His approach simplifies complex equations, empowering students to achieve academic success and develop a lifelong love for math. By partnering with Gala Education, Mr. Smith has access to a dynamic platform that connects him with motivated learners, provides opportunities for professional development, and supports his mission to transform education across Tanzania.</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-12 sm:flex-row items-center px-6 md:px-20 h-fit sm:h-[30rem] w-full flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
          <div className="relative w-full sm:w-1/2 items-center  rounded-full mt-14 h-64 md:h-4/5 max-sm:p-2">
            <Image src="/teacher2.jpeg" alt="Profile picture" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 w-full mt-1">
            <div className="flex flex-col gap-4 w-full h-3/4">
              <span className="mt-16 text-center font-bold text-xl">Our Teachers</span>
              <div className="text-xs leading-loose text-justify md:text-left ">Meet Ms. Salome Juma, an enthusiastic English teacher who inspires students to master language skills through creative and engaging lessons. Her dedication to fostering effective communication and critical thinking equips learners with the tools they need for academic and personal success. By joining Gala Education, Ms. Juma not only reaches a wider audience of eager learners but also benefits from professional growth, flexible teaching opportunities, and the chance to make a meaningful impact on education in Tanzania.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableContent;
