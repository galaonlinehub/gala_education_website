import { Carousel } from "antd";
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

  return (
    <Carousel autoplay={true} dots={true} className="w-full px-6">
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img1.jpeg"}
            title={"Comprehensive Support"}
            desc={"Access 24/7 study assistance, academic tools, and a dedicated support team to guide you."}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">Access 24/7 study assistance, academic tools, and a dedicated support team to guide you through every step of your academic journey. Whether you&apos;re struggling with a challenging assignment, preparing for an important exam, or simply need advice on how to improve your study habits, our team is here to help.</p>
                <p className="text-xs leading-normal ">With round-the-clock availability, you can connect with tutors, access a wide range of study materials, and utilize our advanced academic tools whenever you need them. Our support team is committed to ensuring you have all the resources and assistance you need to succeed, no matter the time of day or night. From personalized tutoring sessions to expert advice on course selections, we are dedicated to helping you achieve your academic goals and excel in your studies.</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img2.jpeg"}
            title={"Expert Instructors"}
            desc={"Learn from highly qualified educators with years of experience."}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">Learn from highly qualified educators with years of experience. We meticulously vet each of our instructors to ensure they are the best in the country. Our rigorous selection process includes thorough background checks, professional evaluations, and multiple rounds of interviews to guarantee that only the most knowledgeable and skilled educators join our team. Our instructors are not only experts in their respective fields but also have a proven track record of successful teaching. They bring a wealth of practical experience and academic excellence to the classroom, ensuring that you receive an education that is both comprehensive and relevant.</p>
                <p className="text-xs leading-normal ">We are committed to providing you with top-notch learning experiences, and that starts with having the best instructors. By choosing our program, you can be confident that you are learning from professionals who are dedicated to your success and are passionate about imparting their knowledge. Rest assured, you are in capable and expert hands, receiving education from the very best in the industry.</p>
              </div>
            }
          />
        </div>
      </div>
      <div className="w-full p-3 items-center flex">
        <div style={contentStyle}>
          <Card1
            image={"/card1img3.jpeg"}
            title={"Customized Learning"}
            desc={"Tailored lessons and resources that adapt to your learning style and pace."}
            details={
              <div className="p-6 text-justify">
                <p className="text-xs leading-normal ">At Gala, we offer a groundbreaking approach to education through our customized learning systems. Imagine having lessons and resources specifically designed to match your unique learning style and pace. This isn&apos;t just a dream; it&apos;s the reality we provide to all our students. Our state-of-the-art educational tools are the best in the country, crafted to ensure that you not only understand the material but also enjoy the learning process. We understand that every student is different, and that&apos;s why our program adapts to your individual needs, making learning more effective and enjoyable.</p>
                <p className="text-xs leading-normal">With our Customized Learning program, you&apos;ll experience a personalized educational journey that keeps you engaged and motivated. Our resources are designed by top educators and utilize the latest technology to make sure you have everything you need to succeed. Join us and discover how our tailored lessons can transform your educational experience. With the best tools at your disposal, you&apos;ll be well-equipped to achieve your academic goals and reach your full potential.</p>
              </div>
            }
          />
        </div>
      </div>
    </Carousel>
  );
};

export default Platform;
