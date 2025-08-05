import { Carousel } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import Events from "./Events";

const LatestNews = () => {
  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
  };

  const t = useTranslations('home_page');

  return (
    <Carousel autoplay={true} dotPosition="bottom" dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Events img={"/learning_summit.jpeg"} title={t('future_learning_summit')} desc={t('future_learning_summit_description')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Events img={"/hackathon.jpeg"} title={t('student_innovation')} desc={t('student_innovation_description')} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Events img={"/career_guidance.jpeg"} title={t('interactive_career')} desc={t('interactive_career_description')} />
        </div>
      </div>
    </Carousel>
  );
};

export default LatestNews;
