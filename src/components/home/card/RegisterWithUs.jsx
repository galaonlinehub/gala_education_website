import React from "react";
import { Carousel } from "antd";
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

  return (
    <div>
      <h3 className="text-center text-sm md:w-2/3 w-full mb-4 sm:text-sm leading-relaxed sm:px-4 ">Join Gala Education today - register as a teacher or student and unlock endless learning opportunities!</h3>
      <Carousel autoplay={true} dots={true} className="w-full">
      
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <RegisterCard title={"Register as teacher"} image={"/donate_and_funds.jpeg"} desc={"Become part of our team of educators and help deliver exceptional learning experiences."} type={"instructor"} />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
        <RegisterCard title={"Register as student"} image={"/register_student.jpeg"} desc={"Join our community of learners and be part of the journey to excellence in education!"} type={"student"} />
        </div>
      </div>
      
    </Carousel>
    </div>
  );
};

export default RegisterWithUs;
