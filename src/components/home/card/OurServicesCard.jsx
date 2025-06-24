"use client"
import React from "react";
import { Carousel } from "antd";
import Card2 from "./Card2";
import { useTranslations } from "@/src/hooks/useTranslations";

const OurServicesCard = () => {
  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "20px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
  };

  const t = useTranslations("home");
  return (
    <Carousel autoplay={true} dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2
                    title={t('ourServices.card1.title')}
                    image={"/service1.jpeg"}
                    desc={
                      t('ourServices.card1.desc')  
                    }
                  />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2
                            title={t('ourServices.card2.title')}
                            image={"/service2.jpeg"}
                            desc={
                              t('ourServices.card2.desc')
                            }
                          />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2
                    title={t('ourServices.card3.title')}
                    image={"/service3.jpeg"}
                    desc={
                      t('ourServices.card3.desc')
                    }
                  />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2
                    title={t('ourServices.card4.title')}
                    image={"/service4.jpeg"}
                    desc={
                      t('ourServices.card4.desc')
                    }
                  />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2
                    title={t('ourServices.card5.title')}
                    image={"/service5.jpeg"}
                    desc={
                      t('ourServices.card5.desc')
                    }
                  />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
         <Card2
                            title={t('ourServices.card6.title')}
                            image={"/service6.jpeg"}
                            desc={
                              t('ourServices.card6.desc')
                            }
                          />
        </div>
      </div>
    </Carousel>
  );
};

export default OurServicesCard;
