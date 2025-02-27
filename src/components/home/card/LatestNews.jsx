import React from "react";
import { Carousel } from "antd";
import Events from "./Events";

const LatestNews = () => {
  const contentStyle = {
    height: "260px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
  };

  return (
    <Carousel autoplay={true} dotPosition="bottom" dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Events img={"/learning_summit.jpeg"} title={"Future of Learning Summit"} desc={"A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Events img={"/hackathon.jpeg"} title={"Student Innovation Hackathon"} desc={"A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Events img={"/career_guidance.jpeg"} title={"Interactive Career Guidance Fair"} desc={"A workshop-focused event connecting students with industry professionals, offering career advice, mentorship, and guidance on education pathways for future success."} />
        </div>
      </div>
    </Carousel>
  );
};

export default LatestNews;
