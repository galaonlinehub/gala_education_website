import { Carousel } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import Card2 from "./Card2";

const OurServicesCard = () => {
  const contentStyle = {
    height: "360px",
    color: "#fff",
    lineHeight: "20px",
    textAlign: "center",
    // background: "#364d79",
    width: "100%",
  };

  const t = useTranslations('home_page')

  return (
    <Carousel autoplay={true} dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card2 title={t('personalized_tutoring')} image={"/service1.jpeg"} desc={t('personalized_tutoring_text')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={t('stem_programs')} image={"/service2.jpeg"} desc={t('stem_programs_text')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={t('special_education')} image={"/service3.jpeg"} desc={t('special_education_text')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card2 title={t('test_and_preparation')} image={"/service4.jpeg"} desc={t('test_and_preparation_text')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={t('reading_and_literacy')} image={"/service5.jpeg"} desc={t('reading_and_literacy_text')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={t('study_skills_coaching')} image={"/service6.jpeg"} desc={t('study_skills_coaching_text')} />
        </div>
      </div>
    </Carousel>
  );
};

export default OurServicesCard;
