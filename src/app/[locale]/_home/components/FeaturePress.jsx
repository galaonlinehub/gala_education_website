import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaArrowRightLong } from 'react-icons/fa6';
import { featuredPress } from '@/utils/data/featured_press';


export const FeaturePress = () => {
  const homepage = useTranslations('home_page');

  const featuredPress = [
    {
      title: "Tanzania Standard Newspapers",
      image: "/featured-press/tsn.png",
      link: null
    },
    {
      title: "Habari Leo",
      image: "/featured-press/habari-leo.png",
      link: null
    },
    {
      title: "Daily News",
      image: "/featured-press/daily-news.png",
      link: "https://dailynews.co.tz/digital-tools-aid-out-of-classroom-learning-for-rural-students/"
    },
  ];

  const goToLink = (link) => link && window.open(link, '_blank');


  return (
    <section className="pt-6 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-evenly gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
      <section className="flex flex-col gap-2 sm:gap-3 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
          {homepage('featured_press')}
        </h2>
        <Link
          href="/press"
          className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3"
        >
          <span className="font-medium text-sm sm:text-base md:text-lg lg:text-xl underline underline-offset-2">
            {homepage('view_all_press')}
          </span>
          <FaArrowRightLong
            strokeWidth={1}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
          />
        </Link>
      </section>

      {/* Mobile/Tablet Layout - Stacked */}
      <div className="flex gap-3 min-[250px]:gap-6 py-6 sm:hidden justify-center">
        {featuredPress.map((feature, idx) => (
          <div key={idx} onClick={() => feature.link ? goToLink(feature.link) : null} className="flex flex-col items-center gap-2 hover:cursor-pointer">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1000}
              height={1000}
              className="w-24 h-6 object-contain"
            />
          </a>
        ))}
      </div>

      {/* Small Tablet Layout - Horizontal with smaller sizes */}
      <div className="hidden sm:flex lg:hidden justify-center gap-3 md:gap-4 flex-wrap">
        {featuredPress.map((feature, idx) => (
          <div key={idx} onClick={() => feature.link ? goToLink(feature.link) : null} className="flex items-center gap-2 md:gap-3 hover:cursor-pointer">
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
          </a>
        ))}
      </div>

      {/* Desktop Layout - Original horizontal layout */}
      <div className="hidden lg:flex justify-center gap-5">
        {featuredPress.map((feature, idx) => (
          <div key={idx} onClick={() => feature.link ? goToLink(feature.link) : null} className="flex items-center gap-2 hover:cursor-pointer">
            <Image
              src={feature.image}
              alt={feature.title}
              width={1000}
              height={1000}
              className="mx-4 w-36 h-10 object-contain"
            />
            {idx < featuredPress.length - 1 && <div className="h-28 w-[0.16px] bg-black" />}
          </a>
        ))}
      </div>
    </section>
  );
};
