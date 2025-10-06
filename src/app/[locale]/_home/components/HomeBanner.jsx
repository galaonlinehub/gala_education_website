import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const HomeBanner = () => {
  const homepage = useTranslations('home_page');
  return (
    <section className="relative w-full flex flex-col pt-[3rem]">
      <div className="w-full">
        <figure role="group" aria-labelledby="hero-caption" className="h-full">
          <Image
            src="/home-banner.webp"
            alt="Parents supporting their child in online learning on an African education platform"
            height={800}
            width={1600}
            priority
            loading="eager"
            decoding="async"
            sizes="100vw"
            className="object-cover h-[25rem] sm:h-[30rem] md:h-[35rem] lg:h-[40rem] w-full"
          />
          <figcaption id="hero-caption" className="sr-only">
            Parents supporting their child in online learning on an African education platform.
          </figcaption>
        </figure>
      </div>

      <div className="absolute inset-0 bg-white/80" />
      <section className="absolute mt-4 md:mt-0 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[60%]">
        <section className="hidden w-fit mx-auto border px-2 border-black rounded-full py-1.5 sm:py-2 min-[280px]:flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
          <p className="bg-black rounded-full text-white px-2  py-1 sm:py-1.5 whitespace-nowrap text-xs sm:text-sm md:text-base">
            {homepage('new')} 🎉
          </p>
          <h1 className="font-medium flex items-center gap-1 sm:gap-2 text-center leading-tight whitespace-nowrap overflow-hidden">
            <span className="hidden xs:inline">{homepage('experience_the_future_of_learning')}</span>
            <span className="xs:hidden">{homepage('future_of_learning')}</span>{' '}
            <span className="font-bold text-[#030DFE] underline whitespace-nowrap">{homepage('free_trial')}</span>{' '}
            <span className="hidden sm:inline">{homepage('now_live')}</span>
            <span className="sm:hidden">{homepage('now_live')}</span>
          </h1>
        </section>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-[900] text-center mt-2 sm:mt-3 md:mt-4 lg:mt-5 max-w-7xl mx-auto leading-tight px-1">
          <span className="block sm:inline">{homepage('the_no_1_student_platform')}</span>{' '}
          <span className="block sm:inline">{homepage('connecting_teacher_students')}</span>{' '}
          <span
            className="text-[#030DFE] rounded-full py-0.5 px-2 sm:px-3 md:px-4 bg-[#B6B9FF4D] whitespace-nowrap inline-block mt-1 sm:mt-0"
            style={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)' }}
          >
            {homepage('digitally')}
          </span>
        </h2>
        <p className="text-center text-xs sm:text-sm md:text-base font-medium leading-tight sm:leading-normal px-2 sm:px-4 md:px-0">
          {homepage('gala_education_goal')}
        </p>
        <section className="flex flex-col sm:flex-row justify-center text-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4 px-2 sm:px-0">
          <Link href="/signup/student" className="w-full sm:w-fit">
            <button className="border hover:scale-105 transition-transform ease-in-out duration-200  border-black bg-black text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm w-full sm:w-fit whitespace-nowrap">
              {homepage('become_student')}
            </button>
          </Link>
          <Link href={'/signup/instructor'} className="w-full sm:w-fit">
            <button className="border hover:scale-105 transition-transform ease-in-out duration-200  border-black bg-transparent text-black px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-full font-extrabold text-xs sm:text-sm w-full sm:w-fit whitespace-nowrap">
             {homepage('become_teacher')}
            </button>
          </Link>
        </section>
      </section>
    </section>
  );
};
