import { AffordableAndEmpoweringSvg } from '@/utils/vector-svg/home/AffordableAndEmpoeringSvg';
import { GalaAISvg } from '@/utils/vector-svg/home/GalaAISvg';
import { OnlineLibrary } from '@/utils/vector-svg/home/OnlineLibrarySvg';
import { OnlineTeachingSvg } from '@/utils/vector-svg/home/OnlineTeachingSvg';

export const WhyChooseUs = () => {
  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 my-12">
      <section className="text-center sm:text-left mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-[#030DFE] font-[800] text-sm sm:text-base">Best Platform</h2>
        <p className="font-[900] text-xl sm:text-2xl md:text-3xl">Why Choose Us</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-2 sm:p-4 md:p-8 place-content-center justify-items-start items-start max-w-6xl mx-auto">
        <article className="flex flex-col sm:flex-row items-center gap-4 w-full ">
          <OnlineTeachingSvg className={'flex-shrink-0 sm:w-1/4'} />
          <section className="flex flex-col gap-2 text-center sm:text-left sm:w-3/4">
            <h3 className="font-[800] text-sm sm:text-base">Online Teaching and Learning</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Gala Education connects teachers and students in live virtual classrooms, delivering
              expert tuition aligned with Tanzania&apos;s national curriculum from Standard 1 to
              Form 6.
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <GalaAISvg className={'flex-shrink-0 sm:w-1/4'} />
          <section className="flex flex-col gap-2 text-center sm:text-left order-2 sm:order-1 sm:w-3/4">
            <h3 className="font-[800] text-sm sm:text-base">GalaAI - Your Academic Assistant</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              GalaAI, our academic assistant, provides personalized tutoring within the system and
              is also accessible offline via SMS, ensuring support even in remote areas without
              internet.
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <OnlineLibrary className={'flex-shrink-0 sm:w-1/4'} />

          <section className="flex flex-col gap-2 text-center sm:text-left sm:w-3/4">
            <h3 className="font-[800] text-sm sm:text-base">Gala Online Library</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Teachers get access to ready teaching resources, while students benefit from
              textbooks, storybooks, and study materials for self-paced learning and revision.
            </p>
          </section>
        </article>

        <article className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <AffordableAndEmpoweringSvg className={'flex-shrink-0 sm:w-1/4'} />
          <section className="flex flex-col gap-2 text-center sm:text-left sm:w-3/4">
            <h3 className="font-[800] text-sm sm:text-base">Affordable and Empowering</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Gala Education makes quality tuition affordable for students, while giving teachers
              the chance to earn income through flexible online self-employment.
            </p>
          </section>
        </article>
      </section>
    </section>
  );
};
