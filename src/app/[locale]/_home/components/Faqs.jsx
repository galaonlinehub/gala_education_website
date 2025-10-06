import { FaqCard } from "@/components/home/card/FaqCard";
import { useTranslations } from "next-intl";

export const Faqs = () => {

  const homepage = useTranslations('home_page');

  const faqs = [
    {
      question: homepage('what_is_gala_education'),
      answer: homepage('what_is_gala_education_description')
    },
    {
      question: homepage('is_there_money_back_guarantee'),
      answer: homepage('money_back_guarantee_description')
    },
    {
      question: homepage('who_can_use_gala_education'),
      answer: homepage('who_can_use_gala_education_description')
    },

    {
      question: homepage('do_i_need_device_for_tutoring'),
      answer: homepage('do_i_need_device_for_tutoring_description')
    },
    {
      question: homepage('do_i_need_to_be_registered_to_donate'),
      answer: homepage('do_i_need_to_be_registered_to_donate_description')
    },
    {
      question: homepage('how_are_donations_used'),
      answer: homepage('how_are_donations_used_description')
    },
    {
      question:
        homepage('what_makes_gala_education_different'),
      answer: homepage('what_makes_gala_education_different_description')
    },

    {
      question: homepage('how_do_short_courses_work'),
      answer: homepage('how_do_short_courses_work_description')
    },

    {
      question: homepage('is_there_age_limit_for_short_courses'),
      answer: homepage('age_limit_for_short_courses_description')
    },

    {
      question: homepage('how_to_become_tutor'),
      answer: homepage('how_to_become_tutor_description')
    },

    {
      question: homepage('can_i_access_gala_outside_tanzania'),
      answer: homepage('can_i_access_gala_outside_tanzania_description')
    },
  ];
  return (
    <section className="w-full md:w-2/3 mb-20 mx-auto px-3 space-y-4">
      <div className="w-full justify-items-center">
        <h2 className="text-xl font-black">{homepage('faqs')}</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {faqs.map(({ question, answer }, idx) => (
          <FaqCard key={idx} faqQn={question} faqAns={answer} />
        ))}
      </div>
    </section>
  );
};
