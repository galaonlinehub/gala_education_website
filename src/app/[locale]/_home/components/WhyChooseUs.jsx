// import { OnlineLibrary } from "@/utils/vector-svg/home/OnlineLibrarySvg";
// import { OnlineTeachingSvg } from "@/utils/vector-svg/home/OnlineTeachingSvg";
// import { AffordableAndEmpoweringSvg } from "@/utils/vector-svg/home/AffordableAndEmpoeringSvg";

// export const WhyChooseUs = () => {
//   return (
//     <section className="p-24">
//       <section>
//         <h2 className="text-[#030DFE] font-[800]">Best Platform</h2>
//         <p className="font-[900] text-3xl">Why Choose Us</p>
//       </section>
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 place-content-center justify-items-center">
//         <article className="flex gap-6">
//           <OnlineTeachingSvg />
//           <section className="flex flex-col gap-2">
//             <h3 className="font-[800] text-sm">Online Teaching and Learning</h3>
//             <p className="text-xs font-light w-2/3 leading-5">
//               Gala Education connects teachers and students in live virtual
//               classrooms, delivering expert tuition aligned with Tanzania&apos;s
//               national curriculum from Standard 1 to Form 6.
//             </p>
//           </section>
//         </article>
//         <article className="flex gap-6">
//           <section className="flex flex-col gap-2">
//             <h3 className="font-[800] text-sm">
//               GalaAI - Your Academic Assistant
//             </h3>
//             <p className="text-xs font-light w-2/3 leading-5">
//               GalaAI, our academic assistant, provides personalized tutoring
//               within the system and is also accessible offline via SMS, ensuring
//               support even in remote areas without internet.
//             </p>
//           </section>
//         </article>
//         <article className="flex gap-6">
//           <OnlineLibrary />
//           <section className="flex flex-col gap-2">
//             <h3 className="font-[800] text-sm">Gala Online Library</h3>
//             <p className="text-xs font-light w-2/3 leading-5">
//               Teachers get access to ready teaching resources, while students
//               benefit from textbooks, storybooks, and study materials for
//               self-paced learning and revision.
//             </p>
//           </section>
//         </article>
//         <article className="flex gap-6">
//           <AffordableAndEmpoweringSvg />
//           <section className="flex flex-col gap-2">
//             <h3 className="font-[800] text-sm">Affordable and Empowering</h3>
//             <p className="text-xs font-light w-2/3 leading-5">
//               Gala Education makes quality tuition affordable for students,
//               while giving teachers the chance to earn income through flexible
//               online self-employment.
//             </p>
//           </section>
//         </article>
//       </section>
//     </section>
//   );
// };


import { AffordableAndEmpoweringSvg } from "@/utils/vector-svg/home/AffordableAndEmpoeringSvg";
import { OnlineLibrary } from "@/utils/vector-svg/home/OnlineLibrarySvg";
import { OnlineTeachingSvg } from "@/utils/vector-svg/home/OnlineTeachingSvg";

export const WhyChooseUs = () => {
  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 mt-12">
      <section className="text-center sm:text-left mb-6 sm:mb-8 md:mb-12 justify-items-center">
        <h2 className="text-[#030DFE] font-[800] text-sm sm:text-base">Best Platform</h2>
        <p className="font-[900] text-xl sm:text-2xl md:text-3xl">Why Choose Us</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-2 sm:p-4 md:p-8 place-content-center justify-items-center max-w-6xl mx-auto">
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <div className="flex-shrink-0 self-center sm:self-start">
            <OnlineTeachingSvg />
          </div>
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">Online Teaching and Learning</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Gala Education connects teachers and students in live virtual
              classrooms, delivering expert tuition aligned with Tanzania&apos;s
              national curriculum from Standard 1 to Form 6.
            </p>
          </section>
        </article>
        
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <section className="flex flex-col gap-2 text-center sm:text-left order-2 sm:order-1">
            <h3 className="font-[800] text-sm sm:text-base">
              GalaAI - Your Academic Assistant
            </h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              GalaAI, our academic assistant, provides personalized tutoring
              within the system and is also accessible offline via SMS, ensuring
              support even in remote areas without internet.
            </p>
          </section>
          {/* <div className="flex-shrink-0 self-center sm:self-start order-1 sm:order-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-gray-500">AI</span>
            </div>
          </div> */}
        </article>
        
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <div className="flex-shrink-0 self-center sm:self-start">
            <OnlineLibrary />
          </div>
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">Gala Online Library</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Teachers get access to ready teaching resources, while students
              benefit from textbooks, storybooks, and study materials for
              self-paced learning and revision.
            </p>
          </section>
        </article>
        
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <div className="flex-shrink-0 self-center sm:self-start">
            <AffordableAndEmpoweringSvg />
          </div>
          <section className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-[800] text-sm sm:text-base">Affordable and Empowering</h3>
            <p className="text-xs sm:text-sm font-light leading-5 sm:leading-6">
              Gala Education makes quality tuition affordable for students,
              while giving teachers the chance to earn income through flexible
              online self-employment.
            </p>
          </section>
        </article>
      </section>
    </section>
  );
};
