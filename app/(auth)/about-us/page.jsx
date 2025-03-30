"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Divider, Input, Modal, Typography, Tabs } from "antd";
import { Segmented, ConfigProvider } from "antd";
import Image from "next/image";
import { IoMailOutline } from "react-icons/io5";
import Donate from "@/src/components/ui/Donate";

const { Text } = Typography;

const AboutUs = () => {
  const sectionRefs = {
    aboutUs: useRef(null),
    leadership: useRef(null),
    expectations: useRef(null),
    outreach: useRef(null),
    contact: useRef(null),
  };

  const [activeSection, setActiveSection] = useState(null);

  const [selectedLDValue, setSelectedLDValue] = useState("Executive Team");
  const [selectedWEValue, setSelectedWEValue] = useState("System");

  const [showDonatePop, setShowDonatePop] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50% 0px",
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    if (showDonatePop) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showDonatePop]);

  const showDonatePopupModal = () => {
    setShowDonatePop(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const BiographyModal = () => {
    return (
      <>
        <Modal
          title={<div className="text-sm flex justify-center">Biography</div>}
          open={isModalOpen}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
          onCancel={handleCancel}
          okText="Dismiss"
          onOk={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2">
              <div>
                <Image src="/teacherOne.jpeg" width={80} height={80} alt="user_photo" className="w-full max-w-[80px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[180px] object-cover rounded-xl" />
              </div>
              <div className="flex flex-col items-start justify-end ml-2">
                <Text className="font-bold text-sm">Dr. Hellen Dereck</Text>
                <Text className="text-gray-500 text-xs">Founder - Interim CEO</Text>
                <Text className="text-xs font-semibold">hellenderick@gmail.com</Text>
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <Text className="text-xs text-justify">
                Dr. Erick Mgema is a distinguished academic and seasoned professional in the fields of education, research, and design. He holds a Ph.D., an MA in Fine Arts, and a BA in Art and Design, demonstrating a deep commitment to both artistic excellence and scholarly inquiry. With extensive expertise in curriculum development, creative innovation, and technological integration, Dr. Mgema plays a pivotal role in shaping the educational landscape. As the Senior Designer of the system, he spearheads its development, ensuring a seamless and user-centric experience. In addition to his academic contributions as a Lecturer, he serves as the Interim CEO of Galahub, the parent company of Gala Education, where he drives strategic growth and innovation. His leadership and vision continue to
                bridge the gap between education and technology, fostering transformative learning experiences.
              </Text>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  const renderLDView = (value) => {
    switch (value) {
      case "Executive Team":
        return (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2  w-full">
              <Image src="/teacherOne.jpeg" className="w-full rounded-lg" width={100} height={100} />
              <div className="text-xs flex w-full flex-col ml-2">
                <Text className="font-bold">Dr. Hellen Dereck</Text>
                <Text className="font-bold text-gray-500">Founder - Interim CEO</Text>
                <Text onClick={showModal} className="text-blue-700 underline cursor-pointer">
                  Full bio
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Image src="/teacherOne.jpeg" className="w-full rounded-lg" width={100} height={100} />
              <div className="text-xs flex w-full flex-col ml-2">
                <Text className="font-bold">Dr. Hellen Dereck</Text>
                <Text className="font-bold text-gray-500">Founder - Interim CEO</Text>
                <Text className="text-blue-700 underline cursor-pointer">Full bio</Text>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Image src="/teacherOne.jpeg" className="w-full rounded-lg" width={100} height={100} />
              <div className="text-xs flex w-full flex-col ml-2">
                <Text className="font-bold">Dr. Hellen Dereck</Text>
                <Text className="font-bold text-gray-500">Founder - Interim CEO</Text>
                <Text className="text-blue-700 underline cursor-pointer">Full bio</Text>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Image src="/teacherOne.jpeg" className="w-full rounded-lg" width={100} height={100} />
              <div className="text-xs flex w-full flex-col  ml-2">
                <Text className="font-bold">Dr. Hellen Dereck</Text>
                <Text className="font-bold text-gray-500">Founder - Interim CEO</Text>
                <Text className="text-blue-700 underline cursor-pointer">Full bio</Text>
              </div>
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  const renderWEView = (value) => {
    switch (value) {
      case "System":
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold">Our System</Text>
              <Text className="text-xs leading-6 lg:leading-8">Our advanced platform integrates AI-driven tutoring, machine learning-powered educational services, secure payment gateways with subscription management, digital assignment distribution and resource sharing, as well as real-time messaging and collaboration tools for students, educators, and cohorts, all engineered to adapt to the rapidly evolving EdTech landscape in Tanzania.</Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image src="/about-us/laptop.png" width={300} height={300} alt="laptop picture" className="w-full sm:w-3/4 rounded-lg" />
            </div>
          </div>
        );
        break;
      case "Language":
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold">Language</Text>
              <Text className="text-xs leading-6 lg:leading-8">Our platform currently supports English and Kiswahili, leveraging a scalable multilingual architecture to ensure seamless user experience across diverse linguistic backgrounds. As part of the company's vision for international expansion, we are actively developing language integration frameworks that will enable the addition of more languages, enhancing accessibility and inclusivity for a global audience.</Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image src="/about-us/language.png" width={300} height={300} alt="language picture" className="w-full sm:w-3/4 rounded-lg" />
            </div>
          </div>
        );
        break;
      case "For teachers":
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold">For teachers</Text>
              <Text className="text-xs leading-6 lg:leading-8">Our platform upholds the highest standards of integrity and quality education, enforcing a zero-tolerance policy for any form of misconduct. To ensure compliance, we conduct periodic in-class evaluations where our staff members attend sessions to assess teaching quality, engagement, and adherence to our educational guidelines, fostering a trustworthy and professional learning environment.</Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image src="/about-us/for_teachers.png" width={300} height={300} alt="teachers picture" className="w-full sm:w-3/4 rounded-lg" />
            </div>
          </div>
        );
        break;

      case "For students":
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold">For students</Text>
              <Text className="text-xs leading-6 lg:leading-8">Our platform is committed to maintaining a high standard of academic integrity and quality education, enforcing a zero-tolerance policy for any form of misconduct. Students are expected to engage respectfully, adhere to ethical learning practices, and uphold honesty in all academic activities. To ensure compliance, we conduct periodic assessments and monitoring, fostering a fair, professional, and inclusive learning environment.</Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image src="/about-us/for_students.png" width={300} height={300} alt="students picture" className="w-full sm:w-3/4 rounded-lg" />
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex justify-between p-8 h-auto w-full">
      <div className="flex flex-col w-full md:w-3/4">
        <div className="flex flex-col">
          <Text id="aboutUs" ref={sectionRefs.aboutUs} className="font-black text-2xl">
            About Us
          </Text>
          <div className="flex flex-col">
            <Typography className="text-xs leading-loose text-justify">
              Gala Education is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students. Our mission is to provide high-quality education while creating employment opportunities for teachers across Tanzania. Recognizing the critical shortage of qualified teachers, we meticulously designed our platform to bridge this gap and ensure that every student receives the education they deserve. At Gala Education, we believe that education is the foundation for a better future. Our platform not only focuses on delivering top-notch tutoring services but also reinvests its profits into various philanthropic activities. These include building classrooms, libraries, and other educational infrastructure across Tanzania, ensuring
              that students from all backgrounds have access to conducive learning environments. In addition to our primary and secondary education services.
            </Typography>
            <Typography className="text-xs leading-loose text-justify">
              {" "}
              Gala Education offers a range of short courses aimed at equipping Tanzanian youth with practical, self-employable skills. These courses are taught by a diverse team of academics, executives, and industry-leading experts, providing learners with valuable insights and hands-on experience in various fields. Accessing our services is simple. All you need is a device and a stable internet connection to join our online tutoring sessions. Our user-friendly platform makes it easy for students to connect with skilled tutors and access high-quality educational resources from the comfort of their homes. Join us at Gala Education as we strive to make quality education accessible to every child in Tanzania, empowering the next generation with the knowledge and skills they need to succeed.
            </Typography>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <Text id="leadership" ref={sectionRefs.leadership} className="font-black text-2xl py-2">
            Leadership/Governance
          </Text>
          <div className="flex flex-col w-full py-3">
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#030DFE",
                    itemSelectedColor: "#ffffff",
                  },
                },
              }}
            >
              <Segmented className="font-bold" options={["Executive Team", "Advisory Board", "Board of Directors", "Governance Docs"]} size="middle" value={selectedLDValue} onChange={setSelectedLDValue} block />
            </ConfigProvider>
          </div>
          <div className="md:p-3">{renderLDView(selectedLDValue)}</div>
        </div>

        <div className="flex flex-col mt-6">
          <Text id="expectations" ref={sectionRefs.expectations} className="font-black text-2xl pt-2">
            What to expect
          </Text>
          <div className="flex flex-col w-full py-3">
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#030DFE",
                    itemSelectedColor: "#ffffff",
                  },
                },
              }}
            >
              <Segmented className="font-bold" options={["System", "Language", "For teachers", "For students"]} size="middle" value={selectedWEValue} onChange={setSelectedWEValue} block />
            </ConfigProvider>
          </div>
          <div className="md:p-6">{renderWEView(selectedWEValue)}</div>
        </div>

        <div className="flex flex-col mt-8">
          <Text id="outreach" ref={sectionRefs.outreach} className="font-black text-2xl py-2">
            Outreach efforts
          </Text>
          <Text className="font-black text-xs">You are making a difference</Text>
          <Text className="text-xs leading-loose text-justify">Gala Education Financial Aid wing is an extension of our platform that collaborates with organizations to enhance learning opportunities and support educational initiatives in local and global communities. We provide assistance in education, emergency response, family empowerment, hunger relief, and more.</Text>
          <div className="w-full relative py-6">
            <Image src="/about-us/outreach.png" width={300} height={300} alt="outreach_image" className="w-full" />
            <Text className="absolute left-6 bottom-10 text-xs md:text-sm font-bold text-white p-3 bg-[#0000004D]/30">Serve your community from wherever you are</Text>
          </div>
          <Text className="text-xs leading-loose text-justify">Community impact is at the heart of Gala Education. A portion of every contribution is dedicated to outreach, supporting strategic partnerships that address real needs both locally and globally. From empowering schools to providing essential resources for those in need, we are committed to driving meaningful change in education and beyond. We believe in investing generously, serving consistently, and collaborating strategically to create lasting impact. There’s a place for everyone to get involved—join us in shaping a brighter future for learners and communities in need.</Text>
          <div className="w-full justify-center flex py-4 mb-10">
            <Button onClick={showDonatePopupModal} size="middle" className="font-semibold w-64 bg-[#F2EFEF]">
              Donate for the cause
            </Button>
          </div>
        </div>

        <div className="flex flex-col mb-8">
          <Card className="w-full bg-[#F2EFEF]">
            <div className="flex flex-col space-y-4">
              <Text id="contact" ref={sectionRefs.contact} className="font-black text-2xl">
                Contact Us
              </Text>
              <Text className="text-xs text-justify leading-loose">For inquiries directed to the Gala Education team, please email info@galahub.org or submit your questions by clicking the button below.</Text>
              <Button type="primary" className="text-xs bg-black w-full md:w-fit font-bold hover:!bg-gray-500 text-white" icon={<IoMailOutline size={16} />}>
                Mail Us
              </Button>
              <Divider orientation="right" className="!text-xs !text-gray-500" style={{ borderColor: "#dcdcdc" }}>
                Subscription
              </Divider>
              <Text className="font-black text-2xl">Subscribe to email alerts</Text>
              <Text className="text-xs leading-loose text-justify">To subscribe to email alerts, please enter your email address in the field below and select at least one alert option. Once your request is submitted, you will receive a confirmation email with an activation link, which must be clicked to complete your subscription. Additional alert options can be selected at any time.</Text>
              <Text className="text-xs leading-loose text-justify">At Gala Education, we are committed to safeguarding your privacy and will never share your information with third parties. You may unsubscribe from any alerts by visiting the ‘unsubscribe’ section below. If you encounter any issues during this process, please contact us for assistance.</Text>
              <Text className="text-xs leading-loose text-justify">By providing your email address below, you consent to receive email updates from Gala Education.</Text>
              <Text className="text-xs font-bold mt-3">Sign up for email alerts</Text>
              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <Input type="email" size="middle" className="w-full md:w-1/4" placeholder="Email address" />
                <Button type="primary" className="bg-black text-xs text-white hover:!bg-gray-500">
                  Subscribe
                </Button>
              </div>
              <Divider orientation="right" style={{ borderColor: "#dcdcdc" }} className="!text-xs !text-gray-500">
                Unsubscribe
              </Divider>
              <Text className="font-black text-2xl">Unsubscribe from email alerts</Text>
              <Text className="text-xs leading-loose text-justify">To opt-out of email alerts, please enter your email address in the field below and you will be removed from all email alerts to which you are subscribed. After submitting your email, you will receive a confirmation email to the requested email address. You must click the confirmation link in order to complete your request to unsubscribe. You can elect to receive alerts at any time you would like.</Text>
              <Text className="text-xs font-bold mt-3">Unsubscribe from email alerts</Text>
              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <Input type="email" size="middle" className="w-full md:w-1/4" placeholder="Email address" />
                <Button type="primary" className="bg-black text-xs text-white hover:!bg-gray-500">
                  Unsubscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="hidden md:flex  fixed mr-3 right-3 top-0 bottom-0 md:w-48 lg:w-64 items-center justify-center">
        <div className="flex flex-col items-center w-full space-y-4">
          <Text onClick={() => scrollToSection(sectionRefs.aboutUs)} className={`text-right w-full  p-2 cursor-pointer ${activeSection === "aboutUs" ? "text-blue-700 font-bold border-r-4 rounded-r-md border-blue-600 bg-gradient-to-l from-gray-400 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            About Us
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.leadership)} className={`text-right  w-full  p-2  cursor-pointer ${activeSection === "leadership" ? "text-blue-700 font-bold border-r-4 rounded-r-md border-blue-600 bg-gradient-to-l from-gray-400 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            Leadership
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.expectations)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "expectations" ? "text-blue-700 font-bold border-r-4 rounded-r-md border-blue-600 bg-gradient-to-l from-gray-400 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            What to expect
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.outreach)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "outreach" ? "text-blue-700 font-bold border-r-4 rounded-r-md border-blue-600 bg-gradient-to-l from-gray-400 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            Outreach efforts
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.contact)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "contact" ? "text-blue-700 font-bold border-r-4 rounded-r-md border-blue-600 bg-gradient-to-l from-gray-400 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            Contact Us
          </Text>
        </div>
      </div>
      {BiographyModal()}
      {showDonatePop && (
        <div className="fixed inset-0 bg-black bg-opacity-70 !z-[80] flex justify-center items-center">
          <div className="p-1 rounded-lg w-full items-center justify-center flex ">
            <Donate setShowDonatePopup={setShowDonatePop} showDonatePopup={showDonatePop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
