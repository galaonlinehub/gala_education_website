import React from "react";
import { Carousel } from "antd";
import Card2 from "./Card2";

const OurServicesCard = () => {
  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "20px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
  };

  return (
    <Carousel autoplay={true} dots={true} className="w-full">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card2 title={"Personalized Subject Tutoring"} image={"/service1.jpeg"} desc={"Tailored one-on-one sessions in core subjects such as math, science, English, and social studies, focusing on the student's specific needs and learning pace."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={"STEM Enrichment Programs"} image={"/service2.jpeg"} desc={"Specialized tutoring in science, technology, engineering, and math for students interested in deepening their knowledge or exploring STEM fields."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={"Special Education Support"} image={"/service3.jpeg"} desc={"Customized sessions for students with learning disabilities or special needs, providing them with the tools and support to thrive academically."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card2 title={"Test and Exam Preparation"} image={"/service4.jpeg"} desc={"Focused tutoring to prepare students for standardized tests, school exams, and quizzes, including practice tests and study strategies."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={"Reading and Literacy Support"} image={"/service5.jpeg"} desc={"Personalized reading programs to improve comprehension, vocabulary, and fluency, particularly for early learners or those struggling with literacy."} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <Card2 title={"Study Skills Coaching"} image={"/service6.jpeg"} desc={"CSessions aimed at improving time management, organization, and study techniques to enhance overall academic performance."} />
        </div>
      </div>
    </Carousel>
  );
};

export default OurServicesCard;
