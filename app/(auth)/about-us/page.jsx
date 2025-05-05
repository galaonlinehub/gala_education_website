"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Divider, Input, Modal, Typography, Tabs } from "antd";
import { Segmented, ConfigProvider } from "antd";
import Image from "next/image";
import { IoMailOutline } from "react-icons/io5";
import Donate from "@/src/components/ui/Donate";
import FaqCard from "@/src/components/home/card/FaqCard";
import { useTeamMembers } from "@/src/hooks/useTeamMembers";
import { img_base_url } from "@/src/config/settings";
import MultipleProfileSkeletons from '@/src/components/home/card/ProfileCardSkeleton';
import Footer from "@/src/components/layout/footer";


const { Text } = Typography;

const AboutUs = () => {
  const aboutUsRef = useRef(null);
  const leadershipRef = useRef(null);
  const expectationsRef = useRef(null);
  const outreachRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = React.useMemo(() => ({
    aboutUs: aboutUsRef,
    leadership: leadershipRef,
    expectations: expectationsRef,
    outreach: outreachRef,
    contact: contactRef,
  }), []);

  const [activeSection, setActiveSection] = useState(null);

  const [selectedLDValue, setSelectedLDValue] = useState("Executive Team");
  const [selectedWEValue, setSelectedWEValue] = useState("System");
  const [selecteContactsValue, setSelectedConatctsValue] = useState("Contact Us");

  const [showDonatePop, setShowDonatePop] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { teamMembers, isMembersPending } = useTeamMembers();

  const [member, setMemberDetails] = useState({});

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
  }, [sectionRefs]);

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


  console.log("Team mebers:. ", teamMembers);


  const showDonatePopupModal = () => {
    setShowDonatePop(true);
  };

  const showModal = (memberData) => {

    setMemberDetails(memberData)

    setIsModalOpen(true);
  };

  console.log("data:", member)


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const BiographyModal = () => {
    return (
      <>
        <Modal
          title={<div className="text-[14px] flex justify-center">Biography</div>}
          open={isModalOpen}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "70%",
            xxl: "50%",
          }}
          height={100}
          onCancel={handleCancel}
          okText={<span className="text-[10px] md:text-xs">Dismiss</span>}
          onOk={handleCancel}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <div className="block md:hidden">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2">
                <div>
                  <Image src="/about-us/team-placeholder.png" width={100} height={60} alt="user_photo" className="w-full max-w-[80px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[180px] object-cover rounded-xl" />
                </div>
                <div className="flex flex-col items-start justify-end ml-2">
                  <Text className="font-bold text-[10px]">{member?.name}</Text>
                  <Text className="text-gray-500 text-[10px]">{member?.teams?.[0]?.position || "No position"}</Text>
                  <Text className="text-[10px] font-semibold">{member?.email}</Text>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <Text className="text-[10px] text-justify leading-loose">
                  {member?.bio}
                </Text>
              </div>
            </div>

          </div>
          <div className="hidden md:block">
            <div className="flex gap-4 w-full p-8">
              <div className="flex gap-2">
                <div className="w-56">
                  <Image src="/about-us/team-placeholder.png" width={120} height={120} alt="user_photo" className="w-full max-w-[80px]  sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] object-cover rounded-xl" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-6 lg:ml-8">
                <div className="flex flex-col items-start justify-end">
                  <Text className="font-bold text-sm">{member?.name}</Text>
                  <Text className="text-gray-500 text-xs">{member?.teams?.[0]?.position || "No position"}</Text>
                </div>
                <Text className="text-xs text-justify lg:leading-loose">
                  {member?.bio}
                </Text>
                <div className="flex flex-col">
                  <Text className="text-xs font-semibold">Email:</Text>
                  <Text className="text-xs ">{member?.email}</Text>
                </div>
              </div>
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {isMembersPending ? <MultipleProfileSkeletons /> :
              teamMembers?.map((member) => (
                <div key={member.id} className="flex flex-col gap-2 items-center w-full">
                  <Image
                    alt=""
                    src="/about-us/team-placeholder.png"
                    className="w-28 h-28 rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                  <div className="text-xs flex flex-col items-center ml-2">
                    <Text className="font-bold">{member.name}</Text>
                    <Text className="font-bold text-gray-500">{member?.teams?.[0]?.position}</Text>
                    <Text onClick={() => showModal(member)} className="text-blue-700 underline cursor-pointer">
                      Full bio
                    </Text>
                  </div>
                </div>
              ))
            }
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
              <Text className="font-bold text-lg">Our System</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">Our advanced platform integrates AI-driven tutoring, machine learning-powered educational services, secure payment gateways with subscription management, digital assignment distribution and resource sharing, as well as real-time messaging and collaboration tools for students, educators, and cohorts, all engineered to adapt to the rapidly evolving EdTech landscape in Tanzania.</Text>
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
              <Text className="font-bold text-lg">Language</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">Our platform currently supports English and Kiswahili, leveraging a scalable multilingual architecture to ensure seamless user experience across diverse linguistic backgrounds. As part of the company&apos;s vision for international expansion, we are actively developing language integration frameworks that will enable the addition of more languages, enhancing accessibility and inclusivity for a global audience.</Text>
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
              <Text className="font-bold text-lg">For teachers</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">Our platform upholds the highest standards of integrity and quality education, enforcing a zero-tolerance policy for any form of misconduct. To ensure compliance, we conduct periodic in-class evaluations where our staff members attend sessions to assess teaching quality, engagement, and adherence to our educational guidelines, fostering a trustworthy and professional learning environment.</Text>
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
              <Text className="font-bold text-lg">For students</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">Our platform is committed to maintaining a high standard of academic integrity and quality education, enforcing a zero-tolerance policy for any form of misconduct. Students are expected to engage respectfully, adhere to ethical learning practices, and uphold honesty in all academic activities. To ensure compliance, we conduct periodic assessments and monitoring, fostering a fair, professional, and inclusive learning environment.</Text>
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

  const renderContactsView = (value) => {
    switch (value) {
      case "Contact Us":
        return (
          <Card className="w-full bg-[#F2EFEF]">
            <div className="flex flex-col space-y-4">
              <Text id="contact" ref={sectionRefs.contact} className="font-black text-lg lg:text-2xl">
                Contact Us
              </Text>
              <Text className="text-xs text-justify leading-loose">For inquiries directed to the Gala Education team, please email info@galahub.org or submit your questions by clicking the button below.</Text>
              <Button type="primary" onClick={() => window.location.href = "mailto:galaonlinehub@gmail.com"}
                className="text-xs bg-black w-full md:w-fit font-bold hover:!bg-gray-500 text-white" icon={<IoMailOutline size={16} />}>
                Mail Us
              </Button>
              <Divider orientation="right" className="!text-xs !text-gray-500" style={{ borderColor: "#dcdcdc" }}>
                Subscription
              </Divider>
              <Text className="font-black text-lg lg:text-2xl">Subscribe to email alerts</Text>
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
              <Text className="font-black text-lg lg:text-2xl">Unsubscribe from email alerts</Text>
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
        );
        break;
      case "FAQs":
        return (
          <div className="relative w-full ">
            <FaqCard
              faqQn={"What is Gala Education?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "Gala Education is an online platform dedicated to providing high-quality tutoring for Primary, Secondary, and High School students across Tanzania. In addition to tutoring, we offer short courses designed to equip Tanzanian youth with self-employable skills. Our platform is powered by AI, which helps deliver personalized learning experiences tailored to each student’s individual needs and progress. We also reinvest profits into philanthropic activities, including building classrooms and libraries for under-served communities"
              }

            />
            <FaqCard
              faqQn={"Is there a money-back guarantee?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "Gala Education does not offer refunds unless there is a verified technical issue that prevents you from accessing our services. If you encounter such a problem, please contact our support team, and we will assist you in resolving the issue or processing a refund if necessary."
              }
            />
            <FaqCard
              faqQn={"Who can use Gala Education?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "Gala Education is designed for students in Primary, Secondary, and High School across Tanzania who are looking for personalized tutoring in various subjects. Our short courses are open to young adults looking to acquire practical, self-employable skills in various fields. Anyone with access to a device and internet connection can benefit from our educational resources."
              }
            />
            <FaqCard
              faqQn={"Do I need a device to access the tutoring sessions?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "Yes, you will need a device, such as a smartphone, tablet, or computer, and a stable internet connection to access our online tutoring sessions. This allows you to participate in lessons, access learning materials, and interact with our qualified tutors from anywhere at your convenience."
              }
            />
            <FaqCard
              faqQn={"Do I need to be a registered user to donate?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "No, donations can be made by anyone, regardless of whether you are a registered user of Gala Education. Our donation system is designed to allow anyone who wants to support our mission to contribute. The funds are directly used to support children’s education, particularly those from low-income backgrounds who lack access to quality resources."
              }
            />
            <FaqCard
              faqQn={"How are the donations used?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "All donations received are reinvested into our philanthropic efforts to improve education in Tanzania. This includes building and equipping classrooms, libraries, and providing educational materials for under-served communities. The donations also help support the development of educational programs that benefit students in need, ensuring that every child has access to quality learning opportunities."
              }
            />
            <FaqCard
              faqQn={
                "What makes Gala Education different from other tutoring platforms?"
              }
              bgColor={"#F2EFEF"}
              faqAns={
                "Gala Education stands out by combining quality online tutoring with a strong commitment to community development. Not only do we provide expert tutors to support student learning, but we also employ teachers across Tanzania to help address the national shortage of qualified educators. Our platform also integrates AI-powered personalized learning to enhance each student’s progress. Moreover, we reinvest profits into community-building projects like classrooms and libraries, making our mission far-reaching and impactful."
              }
            />
            <FaqCard
              faqQn={"How do the short courses work?"}
              faqAns={
                "Our short courses are specifically designed to equip Tanzanian youth with practical, self-employable skills in various industries such as technology, business, and creative fields. These courses are taught by experienced academics, executives, and industry leaders. Students can take the courses online, at their own pace, and gain valuable skills that will help them pursue self-employment or career opportunities. Upon completion, students may also receive certification for the skills they’ve learned."
              }
            />
            <FaqCard
              faqQn={"Is there any age limit for the short courses?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "There is no specific age limit for the short courses. The courses are open to all Tanzanian youth who are eager to learn and acquire skills for self-employment. Whether you’re a recent graduate, a young professional, or someone looking to switch careers, our short courses offer flexible learning opportunities that can be adapted to your personal goals."
              }
            />
            <FaqCard
              faqQn={"How can I become a tutor on Gala Education?"}
              bgColor={"#F2EFEF"}
              faqAns={
                "If you are a qualified educator with a passion for teaching and helping students succeed, you can apply to become a tutor at Gala Education. We are always looking for skilled tutors who can deliver personalized, high-quality lessons across a range of subjects. To apply, visit our website to submit your application, and we will contact you if there is a suitable opportunity to join our team."
              }
            />
            <FaqCard
              faqQn={
                "Can I access Gala Education if I live outside of Tanzania?"
              }
              bgColor={"#F2EFEF"}
              faqAns={
                "While Gala Education is primarily focused on providing services to students within Tanzania, anyone with a stable internet connection can access our short courses. Our online platform allows individuals from anywhere in the world to benefit from our industry-leading courses that equip youth with valuable skills for self-employment. However, tutoring sessions are designed specifically for Tanzanian students, so availability may vary depending on your location."
              }
            />
          </div>
        );
        break;

      default:
        break;
    }
  };

  return (

    <div className="flex justify-between -mt-10 md:-mt-16 p-8 h-auto w-screen ">

      <div className="flex flex-col w-full md:w-3/4">
        <div className="flex flex-col">
          <Text id="aboutUs" ref={sectionRefs.aboutUs} className="font-black text-xl lg:text-2xl">
            About Us
          </Text>
          <div className="flex flex-col">
            <Typography className="text-xs lg:text-sm xxs:leading-loose lg:leading-loose text-justify">
              Gala Education is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students. Our mission is to provide high-quality education while creating employment opportunities for teachers across Tanzania. Recognizing the critical shortage of qualified teachers, we meticulously designed our platform to bridge this gap and ensure that every student receives the education they deserve. At Gala Education, we believe that education is the foundation for a better future. Our platform not only focuses on delivering top-notch tutoring services but also reinvests its profits into various philanthropic activities. These include building classrooms, libraries, and other educational infrastructure across Tanzania, ensuring
              that students from all backgrounds have access to conducive learning environments. In addition to our primary and secondary education services.
            </Typography>
            <Typography className="text-xs xxs:leading-loose lg:text-sm lg:leading-loose text-justify">
              {" "}
              Gala Education offers a range of short courses aimed at equipping Tanzanian youth with practical, self-employable skills. These courses are taught by a diverse team of academics, executives, and industry-leading experts, providing learners with valuable insights and hands-on experience in various fields. Accessing our services is simple. All you need is a device and a stable internet connection to join our online tutoring sessions. Our user-friendly platform makes it easy for students to connect with skilled tutors and access high-quality educational resources from the comfort of their homes. Join us at Gala Education as we strive to make quality education accessible to every child in Tanzania, empowering the next generation with the knowledge and skills they need to succeed.
            </Typography>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <Text id="leadership" ref={sectionRefs.leadership} className="font-black text-lg lg:text-2xl py-2">
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
          <Text id="expectations" ref={sectionRefs.expectations} className="font-black text-lg lg:text-2xl pt-2">
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
          <Text id="outreach" ref={sectionRefs.outreach} className="font-black text-lg lg:text-2xl py-2">
            Outreach efforts
          </Text>
          <Text className="font-black text-sm">You are making a difference</Text>
          <Text className="text-xs lg:text-sm xxs:leading-loose lg:leading-loose text-justify">Gala Education Financial Aid wing is an extension of our platform that collaborates with organizations to enhance learning opportunities and support educational initiatives in local and global communities. We provide assistance in education, emergency response, family empowerment, hunger relief, and more.</Text>
          <div className="w-full relative py-6">
            <Image src="/about-us/outreach.png" width={300} height={300} alt="outreach_image" className="w-full" />
            <Text className="absolute left-6 bottom-10 text-xs md:text-sm font-bold text-white p-3 bg-[#0000004D]/30">Serve your community from wherever you are</Text>
          </div>
          <Text className="text-xs lg:text-sm xxs:leading-loose lg:leading-loose text-justify">Community impact is at the heart of Gala Education. A portion of every contribution is dedicated to outreach, supporting strategic partnerships that address real needs both locally and globally. From empowering schools to providing essential resources for those in need, we are committed to driving meaningful change in education and beyond. We believe in investing generously, serving consistently, and collaborating strategically to create lasting impact. There’s a place for everyone to get involved—join us in shaping a brighter future for learners and communities in need.</Text>
          <div className="w-full justify-center flex py-4 mb-10">
            <Button onClick={showDonatePopupModal} size="middle" className="font-semibold w-64 bg-[#F2EFEF]">
              Donate for the cause
            </Button>
          </div>
        </div>

        <div className="flex flex-col mb-8">
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
              <Segmented className="font-bold" options={["Contact Us", "FAQs"]} size="middle" value={selecteContactsValue} onChange={setSelectedConatctsValue} block />
            </ConfigProvider>
          </div>
          <div className="md:p-3 mt-4">{renderContactsView(selecteContactsValue)}</div>
        </div>
        <Footer />
      </div>
      <div className="hidden md:flex fixed mr-3 right-3 top-0 bottom-0 md:w-48 lg:w-64 items-center justify-center">
        <div className="flex flex-col items-center w-full space-y-4">
          <Text onClick={() => scrollToSection(sectionRefs.aboutUs)} className={`text-right w-full  p-2 cursor-pointer ${activeSection === "aboutUs" ? "text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            About Us
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.leadership)} className={`text-right  w-full  p-2  cursor-pointer ${activeSection === "leadership" ? "text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            Leadership
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.expectations)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "expectations" ? "text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            What to expect
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.outreach)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "outreach" ? "text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
            Outreach efforts
          </Text>
          <Text onClick={() => scrollToSection(sectionRefs.contact)} className={`text-right w-full  p-2  cursor-pointer ${activeSection === "contact" ? "text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2" : "hover:text-blue-700"}`}>
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
