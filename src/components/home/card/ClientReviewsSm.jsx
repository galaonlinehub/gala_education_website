import React from "react";
import { Carousel } from "antd";
import ClientReviews from "./ClientReviews";

const ClientReviewsSm = () => {
  const contentStyle = {
    height: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    width: "100%",
  };

  return (
    <Carousel autoplay={true} dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client.jpg"} clientName={"Amani Juma"} clientMessage={"Gala Education has transformed my child's learning experience with personalized tutoring that truly meets their needs."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client2.jpg"} clientName={"Zahra Mchome"} clientMessage={"Thanks to Gala Education, my children now have access to top-notch teachers and resources, right from home."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client3.jpg"} clientName={"Salim Komba"} clientMessage={"The short courses offered by Gala Education have equipped my son with valuable skills he can use to find work."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client4.jpg"} clientName={"Neema Mwinyi"} clientMessage={"The AI-powered tutoring has made learning fun and effective for my daughter. She’s more engaged and excited about her studies."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client5.jpg"} clientName={"Baraka Kisima"} clientMessage={"The flexibility of learning online with Gala Education has made it possible for my children to balance school and extracurricular activities."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <ClientReviews clientImage={"/client_images/client6.jpg"} clientName={"Laila Msechu"} clientMessage={"Gala Education's mission to improve education in Tanzania is truly inspiring, and we’re proud to be a part of it."} />{" "}
        </div>
      </div>
    </Carousel>
  );
};

export default ClientReviewsSm;
