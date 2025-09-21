import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export const FeaturePress = () => {
  const featuredPress = [
    {
      title: "Tanzania Standard Newspapers",
      image: "/featured-press/tsn.png",
    },
    {
      title: "Habari Leo",
      image: "/featured-press/habari-leo.png",
    },
    {
      title: "Daily News",
      image: "/featured-press/daily-news.png",
    },
  ];

  return (
    <section className="pt-3 sm:pt-4 pb-3 sm:pb-4 flex flex-col lg:flex-row lg:items-center lg:justify-evenly gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
      <section className="flex flex-col gap-2 sm:gap-3 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">Featured Press</h2>
        <Link href="/press" className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
          <span className="font-medium text-sm sm:text-base md:text-lg lg:text-xl underline underline-offset-2">
            View All Press
          </span>
          <FaArrowRightLong strokeWidth={1} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </Link>
      </section>

      {/* Mobile/Tablet Layout - Stacked */}
      <div className="flex flex-col sm:hidden gap-4 items-center">
        {featuredPress.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1000}
              height={1000}
              className="w-24 h-6 object-contain"
            />
            {idx < featuredPress.length - 1 && (
              <div className="w-16 h-[0.16px] bg-black" />
            )}
          </div>
        ))}
      </div>

      {/* Small Tablet Layout - Horizontal with smaller sizes */}
      <div className="hidden sm:flex lg:hidden justify-center gap-3 md:gap-4 flex-wrap">
        {featuredPress.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 md:gap-3">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1000}
              height={1000}
              className="w-20 sm:w-24 md:w-28 h-6 sm:h-7 md:h-8 object-contain"
            />
            {idx < featuredPress.length - 1 && (
              <div className="h-16 sm:h-20 md:h-24 w-[0.16px] bg-black" />
            )}
          </div>
        ))}
      </div>

      {/* Desktop Layout - Original horizontal layout */}
      <div className="hidden lg:flex justify-center gap-5">
        {featuredPress.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1000}
              height={1000}
              className="mx-4 w-36 h-10 object-contain"
            />
            {idx < featuredPress.length - 1 && (
              <div className="h-28 w-[0.16px] bg-black" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};