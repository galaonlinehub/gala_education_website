import { AffordableAndEmpoweringSvg } from '@/utils/vector-svg/home/AffordableAndEmpoeringSvg';
import { OnlineLibrary } from '@/utils/vector-svg/home/OnlineLibrarySvg';
import { OnlineTeachingSvg } from '@/utils/vector-svg/home/OnlineTeachingSvg';
import { GalaAISvg } from '@/utils/vector-svg/home/GalaAISvg';
import { useTranslations } from 'next-intl';

export const WhyChooseUs = () => {
  const homepage = useTranslations('home_page');

  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 my-12">
      <section className="text-center sm:text-left mb-6 sm:mb-8 md:mb-12 justify-items-center">
        <h2 className="text-[#030DFE] font-[800] text-sm sm:text-base">
          {homepage('best_platform')}
        </h2>
        <p className="font-[900] text-xl sm:text-2xl md:text-3xl">{homepage('why_us')}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-2 sm:p-4 md:p-8 place-content-center justify-items-center max-w-6xl mx-auto">
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          {/* Start of the pseudo code */}

          {/*
           * NOTE: The `-mt-4` class is hardcoded for this specific SVG
           * to counter unwanted top padding inherent to the SVG itself.
           */}

          <OnlineTeachingSvg className="flex-shrink-0 self-center sm:self-start w-1/5 sm:-mt-4" />
          {/* End of pseudo code */}
          
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">
              {homepage('online_teaching_learning')}
            </h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              {homepage('gala_1_to_6')}
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <GalaAISvg className="flex-shrink-0 self-center sm:self-start w-1/5" />
          <section className="flex flex-col gap-2 text-center sm:text-left order-2 sm:order-1 sm:w-3/4">
            <h3 className="font-[800] text-sm sm:text-base">{homepage('gala_assistant')}</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              {homepage('gala_assistant_description')}
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <OnlineLibrary className="flex-shrink-0 self-center sm:self-start w-1/5" />
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">{homepage('gala_online_library')}</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              {homepage('gala_online_library_description')}
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <AffordableAndEmpoweringSvg className="flex-shrink-0 self-center sm:self-start w-1/5" />
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">{homepage('affordable_empowering')}</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              {homepage('affordable_empowering_description')}
            </p>
          </section>
        </article>
      </section>
    </section>
  );
};
