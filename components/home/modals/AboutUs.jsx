import { Button, Modal } from "antd";
import React, { useState } from "react";
const AboutUs = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="hover:cursor-pointer" onClick={showModal}>
        About Us
      </button>
      <Modal open={open} title={<div className="text-center font-black">About Us</div>} centered={true} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className="p-6 text-justify">
          <p className="text-xs leading-loose"><b>Gala Education</b> is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students. Our mission is to provide high-quality education while creating employment opportunities for teachers across Tanzania. Recognizing the critical shortage of qualified teachers, we meticulously designed our platform to bridge this gap and ensure that every student receives the education they deserve.</p>
          <p className="text-xs leading-loose">At Gala Education, we believe that education is the foundation for a better future. Our platform not only focuses on delivering top-notch tutoring services but also reinvests its profits into various philanthropic activities. These include building classrooms, libraries, and other educational infrastructure across Tanzania, ensuring that students from all backgrounds have access to conducive learning environments.</p>

          <p className="text-xs leading-loose">In addition to our primary and secondary education services, Gala Education offers a range of short courses aimed at equipping Tanzanian youth with practical, self-employable skills. These courses are taught by a diverse team of academics, executives, and industry-leading experts, providing learners with valuable insights and hands-on experience in various fields.</p>

          <p className="text-xs leading-loose">Accessing our services is simple. All you need is a device and a stable internet connection to join our online tutoring sessions. Our user-friendly platform makes it easy for students to connect with skilled tutors and access high-quality educational resources from the comfort of their homes. Join us at Gala Education as we strive to make quality education accessible to every child in Tanzania, empowering the next generation with the knowledge and skills they need to succeed.</p>
        </div>
      </Modal>
    </>
  );
};
export default AboutUs;
