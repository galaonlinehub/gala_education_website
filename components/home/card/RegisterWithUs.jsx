import { Carousel } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import RegisterCard from "./RegisterCard";

const RegisterWithUs = () => {
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
    <div>
      <h3 className="text-center text-xs md:w-2/3 w-full mb-4 leading-relaxed sm:px-4 ">{t('register_with_us_subtitle')}</h3>
      <Carousel autoplay={true} dots={true} className="w-full">
      
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <RegisterCard title={t('register_as_teacher')} image={"/donate_and_funds.jpeg"} desc={t('register_as_teacher_description')} type={"instructor"} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <RegisterCard title={t('register_as_student')} image={"/register_student.jpeg"} desc={t('register_as_student_description')} type={"student"} />
        </div>
      </div>
      
    </Carousel>
    </div>
  );
};

export default RegisterWithUs;
