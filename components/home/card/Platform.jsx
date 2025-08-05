import { Carousel } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import Card1 from "./Card1";
import ClientReviews from "./ClientReviews";

const Platform = () => {
  const contentStyle = {
    height: "250px",
    color: "#fff",
    lineHeight: "25px",
    textAlign: "center",
    width: "100%",
  };

  const t = useTranslations('home_page')

  return (
    <Carousel autoplay={true} dots={true} className="w-full px-6">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img1.jpeg"}
            title={t('comprehensive_support')}
            desc={t('comprehensive_support_description')}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">{t('comprehensive_support_modal_text')}</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img2.jpeg"}
            title={t('expert_instructors')}
            desc={t('expert_instructors_description')}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">{t('expert_instructors_modal_text')}</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img3.jpeg"}
            title={t('customized_learning')}
            desc={t('customized_learning_description')}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">{t('customized_learning_modal_text')}</p>
              </div>
            }
          />
        </div>
      </div>
    </Carousel>
  );
};

export default Platform;
