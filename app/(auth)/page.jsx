"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card1 from "@/src/components/home/card/Card1";
import RegisterCard from "@/src/components/home/card/RegisterCard";
import PioneerCard from "@/src/components/home/card/PioneerCard";
import NewsCard from "@/src/components/home/card/NewsCard";
import Events from "@/src/components/home/card/Events";
import Card2 from "@/src/components/home/card/Card2";
import MailingList from "@/src/components/ui/auth/signup/MailingList";
import AcceptCookies from "@/src/components/layout/Cookies";
import ClientReviews from "@/src/components/home/card/ClientReviews";
import FaqCard from "@/src/components/home/card/FaqCard";
import OurServicesCard from "@/src/components/home/card/OurServicesCard";
import RegisterWithUs from "@/src/components/home/card/RegisterWithUs";
import ClientReviewsSm from "@/src/components/home/card/ClientReviewsSm";
import Platform from "@/src/components/home/card/Platform";
import Pioneers from "@/src/components/home/card/Pioneers";
import LatestNews from "@/src/components/home/card/LatestNews";
import Donate from "@/src/components/ui/Donate";
import VideoPlayer from "@/src/components/ui/VideoPlayer";
import ScrollableContent from "@/src/components/ui/TeachersCard";
import { useUser } from "@/src/hooks/useUser";
import Footer from "@/src/components/layout/footer";
import { useCookies } from "@/src/store/auth/signup";
import { Button } from "antd";
import { pdfjs } from "react-pdf";
import PdfViewer from "@/src/components/home/modals/PdfViewer";
import { Authorities } from "@/src/components/layout/Authorities";
import VideoBackground from "@/src/components/ui/VideoBackground";
import Animator from "@/src/components/home/animations/Animator";
import { API_BASE_URL } from "@/src/config/settings";
import { NextSeo } from "next-seo";

function Home() {
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const { user } = useUser();
  const { cookieIsAccepted } = useCookies();

  const [showPdf, setShowPdf] = useState(false);

  const financialFormPdfUrl = `${API_BASE_URL}/documents/uploads/documents/financial_form.pdf`;

  const handleDonateVisibility = () => {
    setShowDonatePopup(true);
  };
  useEffect(() => {
    if (showDonatePopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showDonatePopup]);

  return (
    <>
      <NextSeo
        title="Online Tutoring for Tanzanian Students | Gala Education"
        description="Empowering minds, shaping the future. Gala Education offers AI-powered learning and online courses for students of all levels."
        additionalMetaTags={[
          {
            name: "keywords",
            content: "online tutoring, Tanzanian students, AI-powered learning",
          },
        ]}
        openGraph={{
          title: "Online Tutoring for Tanzanian Students | Gala Education",
          description:
            "Empowering minds, shaping the future. Gala Education offers AI-powered learning and online courses for students of all levels.",
          url: "https://edu.galahub.org/",
          type: "website",
          images: [
            {
              url: "https://edu.galahub.org/gala-logo.jpg",
              width: 1200,
              height: 630,
              alt: "Gala Education",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@galahub_tz",
          handle: "@galahub_tz",
        }}
      />

      <div className="overflow-x-hidden relative w-full mx-auto h-full">

        {showDonatePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 !z-[80] flex justify-center items-center">
            <div className="p-1 rounded-lg w-full items-center justify-center flex ">
              <Donate
                setShowDonatePopup={setShowDonatePopup}
                showDonatePopup={showDonatePopup}
              />
            </div>
          </div>
        )}

        <PdfViewer
          pdfUrl={financialFormPdfUrl}
          isOpen={showPdf}
          onClose={() => setShowPdf(false)}
        />

        <div className="relative mx-auto h-[60rem] sm:h-[60rem] sm:items-center md:h-[50rem] lg:h-[44rem] overflow-hidden -mt-12">
          <VideoBackground />
          <div className="absolute inset-0 bg-black opacity-85 w-full" />
          <div className="absolute inset-0 sm:py-12 py-12 w-full sm:px-24 md:px-10 px-2 flex md:flex-row flex-col lg:justify-between md:gap-10 max-sm:gap-5">
            <div className={"mt-14"}>
              <div className="xxs:gap-8 mb-6 sm:gap-0 sm:mb-0 flex flex-col">
                <Animator delay={0.2}>
                  <h1 className="text-white xxs:text-[64px] mt-10 text-[35px]  sm:leading-[70px] leading-[30px] font-black">
                    Gala
                  </h1>
                </Animator>

                <Animator delay={0.2}>
                  <h1 className="text-white xxs:text-[64px] text-[35px] sm:leading-[70px] leading-[30px] font-black">
                    Education
                  </h1>
                </Animator>
              </div>
              <Animator delay={0.2}>
                <h2 className="text-white font-bold sm:leading-[30px] leading-[15px] sm:text-[20px] text-[12px]">
                  Empowering minds, shaping futures - Gala Education, your
                  <br /> pathway to success.
                </h2>
              </Animator>
            </div>

            <MailingList />
          </div>
        </div>

        <div className="relative flex items-center flex-col gap-2 md:gap-12 md:flex-row px-6 h-[45rem] sm:px-12 xs:h-[45rem] sm:h-[30rem] w-full">
          <div className="relative w-full md:w-1/2 mt-14 h-fit max-sm:p-2">
            <VideoPlayer videoSrc="/videos/gala_intro.mp4" />
          </div>
          <div className="md:w-1/2 w-full mb-20">
            <div className="flex flex-col gap-4 w-full h-3/4">
              <Animator delay={0.2} className="w-full flex justify-center">
                <span className="mt-16 text-center text-4xl font-black md:font-bold md:text-xl">
                  Our Story
                </span>
              </Animator>
              <Animator direction="left" delay={0.2}>
                <div className="text-xs leading-loose text-justify md:text-left ">
                  In Tanzania, many families face the heart-wrenching struggle
                  of providing quality education for their children due to a
                  severe lack of qualified teachers and resources. Gala
                  Education was born from a deep desire to change this reality,
                  offering hope through high-quality online tutoring for
                  Primary, Secondary, and High School students. We not only
                  provide jobs for teachers but also reinvest our profits into
                  building classrooms, libraries, hiring part-time instructors
                  and more, bringing dreams within reach for countless children
                  across Tanzania. Additionally, our platform offers a variety
                  of short courses designed to equip young Tanzanians with
                  practical, self-employable skills taught by experts in various
                  fields. Join us in making a profound difference, one student
                  at a time.
                </div>
              </Animator>
            </div>
          </div>
        </div>

        <div className="relative flex items-center w-full mt-0 md:h-[60rem] lg:h-[50rem] ">
          <div className=" w-full mt-2 py-4 px-6 flex gap-5 items-center flex-col h-fit">
            <Animator delay={0.2}>
              <h1 className="font-black text-4xl">Our services</h1>
            </Animator>
            <Animator delay={0.2}>
              <h2 className="text-center text-xs">
                We aim to integrate AI to provide personalized, AI-powered
                tutoring and learning experiences
                <br />
                tailored to each student&apos;s unique needs and progress.
              </h2>
            </Animator>
            <div className="hidden md:block">
              <div className="sm:grid flex mt-4  max-sm:w-[98%] overflow-x-auto sm:grid-cols-3 md:gap-10 gap-20 ">
                <Animator direction="top" delay={0.2}>
                  <Card2
                    title={"Personalized Subject Tutoring"}
                    image={"/service1.jpeg"}
                    desc={
                      "Tailored one-on-one sessions in core subjects such as math, science, English, and social studies, focusing on the student's specific needs and learning pace."
                    }
                  />
                </Animator>
                <Animator direction="top" delay={0.4}>
                  <Card2
                    title={"STEM Enrichment Programs"}
                    image={"/service2.jpeg"}
                    desc={
                      "Specialized tutoring in science, technology, engineering, and math for students interested in deepening their knowledge or exploring STEM fields."
                    }
                  />
                </Animator>
                <Animator direction="top" delay={0.6}>
                  <Card2
                    title={"Special Education Support"}
                    image={"/service3.jpeg"}
                    desc={
                      "Customized sessions for students with learning disabilities or special needs, providing them with the tools and support to thrive academically."
                    }
                  />
                </Animator>
                <Animator direction="top" delay={0.8}>
                  <Card2
                    title={"Test and Exam Preparation"}
                    image={"/service4.jpeg"}
                    desc={
                      "Focused tutoring to prepare students for standardized tests, school exams, and quizzes, including practice tests and study strategies."
                    }
                  />
                </Animator>
                <Animator direction="top" delay={1}>
                  <Card2
                    title={"Reading and Literacy Support"}
                    image={"/service5.jpeg"}
                    desc={
                      "Personalized reading programs to improve comprehension, vocabulary, and fluency, particularly for early learners or those struggling with literacy."
                    }
                  />
                </Animator>
                <Animator direction="top" delay={1.2}>
                  <Card2
                    title={"Study Skills Coaching"}
                    image={"/service6.jpeg"}
                    desc={
                      "CSessions aimed at improving time management, organization, and study techniques to enhance overall academic performance."
                    }
                  />
                </Animator>
              </div>
            </div>
            <div className="w-full block md:hidden">
              <OurServicesCard />
            </div>
          </div>
        </div>

        {!user && (
          <div className="relative max-sm:w-screen h-[32rem] w-full  mx-auto mt-4 md:mt-8 lg:mt-4 px-6 sm:px-4 py-6 sm:py-10 flex flex-col md:flex-row">
            <div className="hidden md:block w-full">
              <div className=" w-full flex flex-col items-center gap-3 p-4">
                <Animator delay={0.2}>
                  <h1 className="font-black w-full text-center px-3 !text-3xl">
                    Register with us!
                  </h1>
                </Animator>

                <Animator className="w-full flex justify-center" delay={0.2}>
                  <h3 className="text-center text-xs md:w-2/3 w-full mb-4 leading-relaxed sm:px-6 ">
                    Join Gala Education today - register as a teacher or student
                    and unlock endless learning opportunities!
                  </h3>
                </Animator>
                <div className="flex sm:gap-5 gap-2 overflow-x-auto px-2 max-sm:w-[98%] ">
                  <Animator delay={0.2}>
                    <RegisterCard
                      title={"Register as teacher"}
                      image={"/donate_and_funds.jpeg"}
                      desc={
                        "Become part of our team of educators and help deliver exceptional learning experiences."
                      }
                      type={"instructor"}
                    />
                  </Animator>
                  <Animator delay={0.4}>
                    <RegisterCard
                      title={"Register as student"}
                      image={"/register_student.jpeg"}
                      desc={
                        "Join our community of learners and be part of the journey to excellence in education!"
                      }
                      type={"student"}
                    />
                  </Animator>
                </div>
              </div>
            </div>
            <div className="w-full block md:hidden gap-2 ">
              <h1 className="font-black w-full text-center lg:text-4xl text-3xl mb-3">
                Register with us!
              </h1>
              <RegisterWithUs />
            </div>
          </div>
        )}

        <div className="relative flex items-center w-full px-6 ">
          <div className=" w-full mt-1 py-4 flex gap-5 items-center justify-center flex-col h-fit">
            <Animator delay={0.2}>
              <h1 className="font-black text-center px-3 text-3xl">
                What Our Clients Are Saying
              </h1>
            </Animator>
            <Animator delay={0.4} className="w-full flex justify-center">
              <h2 className="text-center w-full px-3 md:w-2/3 text-xs">
                Our clients&apos; feedback is at the heart of what we do. We’re
                proud to share their experiences and the positive impact our
                platform has had on their learning journey. Here’s what they
                have to say about Gala Education.
              </h2>
            </Animator>
            <div className="hidden md:block">
              <div className="sm:grid flex max-sm:w-[80%] h-[30rem] overflow-x-auto sm:grid-cols-3 gap-10 px-7">
                <Animator direction="left" delay={0.2}>
                  <ClientReviews
                    clientImage={"/client_images/client.jpg"}
                    clientName={"Amani Juma"}
                    clientMessage={
                      "Gala Education has transformed my child's learning experience with personalized tutoring that truly meets their needs."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={0.4}>
                  <ClientReviews
                    clientImage={"/client_images/client2.jpg"}
                    clientName={"Zahra Mchome"}
                    clientMessage={
                      "Thanks to Gala Education, my children now have access to top-notch teachers and resources, right from home."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={0.6}>
                  <ClientReviews
                    clientImage={"/client_images/client3.jpg"}
                    clientName={"Salim Komba"}
                    clientMessage={
                      "The short courses offered by Gala Education have equipped my son with valuable skills he can use to find work."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={0.8}>
                  <ClientReviews
                    clientImage={"/client_images/client4.jpg"}
                    clientName={"Neema Mwinyi"}
                    clientMessage={
                      "The AI-powered tutoring has made learning fun and effective for my daughter. She’s more engaged and excited about her studies."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={1}>
                  <ClientReviews
                    clientImage={"/client_images/client5.jpg"}
                    clientName={"Baraka Kisima"}
                    clientMessage={
                      "The flexibility of learning online with Gala Education has made it possible for my children to balance school and extracurricular activities."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={1.2}>
                  <ClientReviews
                    clientImage={"/client_images/client6.jpg"}
                    clientName={"Laila Msechu"}
                    clientMessage={
                      "Gala Education's mission to improve education in Tanzania is truly inspiring, and we’re proud to be a part of it."
                    }
                  />
                </Animator>
              </div>
            </div>
            <div className="block md:hidden w-full">
              <ClientReviewsSm />
            </div>
          </div>
        </div>

        <div className="w-full items-center justify-center flex">
          <Animator delay={0.6} className="w-full flex justify-center">
            <ScrollableContent />
          </Animator>
        </div>

        <div className="relative w-full h-[30rem] md:h-[25rem] overflow-hidden">
          <div className="relative h-[30rem] flex flex-col items-center w-full">
            <Animator direction="bottom" delay={0.2}>
              <h1 className="font-black px-3 text-center text-3xl leading-tight">
                Why choose our platform?
              </h1>
            </Animator>
            <Animator
              direction="top"
              className="w-full flex justify-center"
              delay={0.4}
            >
              <h2 className="text-center w-3/4 text-xs mt-3 mb-4">
                Choose Gala Education for personalized learning, innovative
                teaching methods, and a commitment to
                <br />
                unlocking every student&apos;s full potential.
              </h2>
            </Animator>

            <div className="hidden md:block">
              <div className="flex  shrink-0 overflow-x-auto gap-x-6 2xl:gap-24    sm:justify-center   w-[98%] px-4  sm:w-full">
                <Animator direction="right" delay={0.6}>
                  <Card1
                    image={"/card1img1.jpeg"}
                    title={"Comprehensive Support"}
                    desc={
                      "Access 24/7 study assistance, academic tools, and a dedicated support team to guide you."
                    }
                    details={
                      <div className="p-6 text-justify">
                        <p className="text-xs leading-loose ">
                          Access 24/7 study assistance, academic tools, and a
                          dedicated support team to guide you through every step
                          of your academic journey. Whether you&apos;re
                          struggling with a challenging assignment, preparing
                          for an important exam, or simply need advice on how to
                          improve your study habits, our team is here to help.
                        </p>
                        <p className="text-xs leading-loose ">
                          With round-the-clock availability, you can connect
                          with tutors, access a wide range of study materials,
                          and utilize our advanced academic tools whenever you
                          need them. Our support team is committed to ensuring
                          you have all the resources and assistance you need to
                          succeed, no matter the time of day or night. From
                          personalized tutoring sessions to expert advice on
                          course selections, we are dedicated to helping you
                          achieve your academic goals and excel in your studies.
                        </p>
                      </div>
                    }
                  />
                </Animator>
                <Animator delay={0.4}>
                  <Card1
                    image={"/card1img2.jpeg"}
                    title={"Expert Instructors"}
                    desc={
                      "Learn from highly qualified educators with years of experience."
                    }
                    details={
                      <div className="p-6 text-justify">
                        <p className="text-xs leading-loose ">
                          Learn from highly qualified educators with years of
                          experience. We meticulously vet each of our
                          instructors to ensure they are the best in the
                          country. Our rigorous selection process includes
                          thorough background checks, professional evaluations,
                          and multiple rounds of interviews to guarantee that
                          only the most knowledgeable and skilled educators join
                          our team. Our instructors are not only experts in
                          their respective fields but also have a proven track
                          record of successful teaching. They bring a wealth of
                          practical experience and academic excellence to the
                          classroom, ensuring that you receive an education that
                          is both comprehensive and relevant.
                        </p>
                        <p className="text-xs leading-loose ">
                          We are committed to providing you with top-notch
                          learning experiences, and that starts with having the
                          best instructors. By choosing our program, you can be
                          confident that you are learning from professionals who
                          are dedicated to your success and are passionate about
                          imparting their knowledge. Rest assured, you are in
                          capable and expert hands, receiving education from the
                          very best in the industry.
                        </p>
                      </div>
                    }
                  />
                </Animator>
                <Animator direction="left" delay={0.6}>
                  <Card1
                    image={"/card1img3.jpeg"}
                    title={"Customized Learning"}
                    desc={
                      "Tailored lessons and resources that adapt to your learning style and pace."
                    }
                    details={
                      <div className="p-6 text-justify">
                        <p className="text-xs leading-loose ">
                          At Gala, we offer a groundbreaking approach to
                          education through our customized learning systems.
                          Imagine having lessons and resources specifically
                          designed to match your unique learning style and pace.
                          This is&apos;t just a dream; it&apos;s the reality we
                          provide to all our students. Our state-of-the-art
                          educational tools are the best in the country, crafted
                          to ensure that you not only understand the material
                          but also enjoy the learning process. We understand
                          that every student is different, and that&apos;s why
                          our program adapts to your individual needs, making
                          learning more effective and enjoyable.
                        </p>
                        <p className="text-xs leading-loose ">
                          With our Customized Learning program, you&apos;ll
                          experience a personalized educational journey that
                          keeps you engaged and motivated. Our resources are
                          designed by top educators and utilize the latest
                          technology to make sure you have everything you need
                          to succeed. Join us and discover how our tailored
                          lessons can transform your educational experience.
                          With the best tools at your disposal, you&apos;ll be
                          well-equipped to achieve your academic goals and reach
                          your full potential.
                        </p>
                      </div>
                    }
                  />
                </Animator>
              </div>
            </div>
            <div className="block md:hidden w-full">
              <Platform />
            </div>
          </div>
        </div>

        <Authorities />

        {/* //relative w-screen  mx-auto h-[100vh] overflow-hidden */}

        <div className="flex flex-col items-center ">
          <Animator delay={0.2}>
            <h1 className="font-black text-3xl text-center xxs:mt-12 md:mt-0">
              Donations & Funding
            </h1>
          </Animator>
          <Animator delay={0.4} className="w-full flex justify-center">
            <h2 className="text-xs md:w-2/3 w-full px-3 flex text-center py-4">
              Your donations directly support our mission in philanthropic
              activities, helping to meet children&apos;s educational needs,
              especially those from poor backgrounds. You don&apos;t have to be
              a user to contribute—every donation makes a difference in
              providing quality education for all.
            </h2>
          </Animator>
          <div className="relative flex flex-col gap-4 sm:flex-row mt-3 h-fit sm:h-[37rem] w-full ">
            <Animator
              delay={0.6}
              direction="right"
              className="w-full flex justify-center"
            >
              <div className="relative  w-full sm:w-2/3 h-full max-sm:p-2">
                <div className=" md:w-[300px] lg:w-[521px] h-[549px] hidden sm:block left-0 bg-[#001840]" />
                <Image
                  alt="image"
                  src="/donate_and_funds.jpeg"
                  width={1920}
                  height={1080}
                  quality={75}
                  className="border-[14px] top-[5rem]  left-[6rem] md:w-[300px] lg:w-[542px] h-[378px] object-cover  sm:absolute  border-white"
                />
              </div>
            </Animator>
            <div className="md:w-1/2 w-full ">
              <Animator
                delay={0.6}
                direction="left"
                className="w-full flex justify-center"
              >
                <div className="relative w-full h-3/4  place-items-center">
                  <Image
                    alt="Donation image"
                    src={"/poor_school.jpeg"}
                    width={100}
                    height={100}
                    className=" rounded-br-[100px] h-[259px] w-[266px] object-cover  sm:ml-24"
                  />
                  {/*<div className="absolute  bottom-24 left-[4rem] w-[20rem] !z-10 bg-white p-6  mx-4 border rounded-lg shadow-lg">*/}
                  <div className="absolute  sm:bott:om-24 sm:left-[2rem] -bottom-[5rem] left-3 w-[15rem] sm:w-[20rem] !z-10 bg-white p-6  mxp-4 border rounded-lg shadow-lg">
                    <h1 className="sm:text-xl text-base font-bold mb-4">
                      Donate today to support underfunded schools
                    </h1>
                    <p className=" text-xs text-gray-600 mb-4 ">
                      Join our community and make a difference! Your donation
                      supports quality education and empowers lives. Together,
                      we can create a brighter future. Every contribution counts
                      - be part of something impactful today!
                    </p>
                    <button
                      onClick={handleDonateVisibility}
                      className="w-full md:w-auto border border-blue-600 text-blue-600 font-bold py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </Animator>
            </div>
          </div>
        </div>

        <div className=" flex justify-center px-6">
          <Animator
            delay={0.2}
            direction="top"
            className="w-full flex justify-center"
          >
            <div className="self-center rounded-[15px] flex flex-col sm:flex-row px-6  shadow-[0px_4px_4px_rgba(0,0,0,0.6)] w-[64rem] mt-28 mb-12 md:mb-14 md:mt-10">
              <div className="  py-6 flex flex-col gap-y-3">
                <h1 className="font-bold ">Financial Aid</h1>

                <div className="flex flex-col md:flex-row gap-6 justify-between items-center md:gap-4 mb-4 w-full">
                  <p className="text-[12px] leading-[15px] basis-2/3">
                    At Gala Education, we recognize that financial barriers can
                    limit access to quality education. To support students
                    facing financial struggles, we offer scholarships, flexible
                    payment plans, and need-based grants. Our scholarship
                    program supports talented students, while flexible payment
                    plans make tuition more manageable. We are committed to
                    ensuring every student can pursue their educational goals,
                    regardless of their financial situation.
                  </p>
                  <div className="flex gap-6 mr-6">
                    <Image
                      src="/person_computer.png"
                      width={50}
                      height={50}
                      alt="person image"
                    />
                    <Image
                      src="/world.png"
                      width={50}
                      height={50}
                      alt="world image"
                    />
                    <Image
                      src="/pdf_image.png"
                      width={50}
                      height={50}
                      alt="pdf image"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setShowPdf(true)}
                  className="border-[1px] md:w-2/5 w-full text-xs text-center font-bold p-2  border-[#030DFE] rounded"
                >
                  Apply for financial aid
                </Button>
              </div>
            </div>
          </Animator>
        </div>

        <div className="relative flex flex-col sm:flex-row  mt-4  h-fit w-full ">
          <div className="w-full flex  space-y-8   h-fit flex-col items-center">
            <Animator delay={0.2}>
              <h1 className="text-3xl px-3   text-center font-black leading-tight ">
                Pioneers in Digital Teaching
              </h1>
            </Animator>
            <Animator delay={0.4} className="w-full flex justify-center">
              <h1 className="text-center text-xs px-4">
                &ldquo;Our platform offers personalized, AI-driven learning
                while teaching students healthy <br /> digital habits for
                balanced, responsible technology use.&ldquo;
              </h1>
            </Animator>
            <div className="hidden md:block">
              <div className="flex items-center sm:justify-around max-sm:w-[98%]  gap-y-10 gap-x-4  overflow-x-auto ">
                <Animator direction="left" delay={0.4}>
                  <PioneerCard
                    icon={
                      <svg
                        width="40"
                        height="40"
                        className=""
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_74_221)">
                          <path
                            d="M37.1365 16.3685C37.5837 15.0216 37.7384 13.5948 37.5902 12.1834C37.442 10.7719 36.9943 9.40837 36.277 8.18379C35.2136 6.33283 33.5899 4.86738 31.64 3.99872C29.69 3.13006 27.5146 2.90306 25.4273 3.35046C24.2415 2.0314 22.7295 1.04758 21.0431 0.497812C19.3567 -0.0519528 17.5554 -0.148308 15.82 0.218423C14.0846 0.585155 12.4762 1.40206 11.1564 2.5871C9.83666 3.77213 8.85193 5.28358 8.30116 6.96963C6.9106 7.25477 5.59692 7.83344 4.44792 8.66695C3.29891 9.50046 2.34104 10.5696 1.63832 11.803C0.563382 13.6508 0.103959 15.7927 0.326476 17.9189C0.548992 20.045 1.44192 22.0454 2.87616 23.6306C2.42727 24.9768 2.27103 26.4034 2.41791 27.8149C2.56478 29.2263 3.01138 30.5902 3.72782 31.8151C4.79256 33.6668 6.41769 35.1325 8.36901 36.0012C10.3203 36.8699 12.4971 37.0966 14.5855 36.6486C15.5276 37.7095 16.6852 38.5573 17.981 39.1352C19.2768 39.7131 20.681 40.0079 22.0998 40C24.2392 40.0019 26.3239 39.324 28.0529 38.0641C29.782 36.8042 31.0659 35.0274 31.7195 32.9903C33.1099 32.7046 34.4234 32.1258 35.5723 31.2923C36.7213 30.4588 37.6792 29.3898 38.3823 28.1568C39.4446 26.3116 39.8961 24.1778 39.6723 22.0605C39.4486 19.9433 38.561 17.9508 37.1365 16.3685ZM22.0998 37.382C20.3477 37.3847 18.6505 36.7706 17.3058 35.6473L17.5423 35.5133L25.5062 30.9163C25.7044 30.8 25.8689 30.6342 25.9837 30.4352C26.0984 30.2361 26.1594 30.0106 26.1607 29.7808V18.5526L29.5273 20.5003C29.544 20.5087 29.5584 20.521 29.5694 20.536C29.5804 20.5511 29.5877 20.5685 29.5907 20.587V29.8913C29.5864 31.8767 28.7959 33.7795 27.392 35.1834C25.9881 36.5872 24.0852 37.3778 22.0998 37.382ZM5.99866 30.5063C5.11995 28.989 4.80444 27.2104 5.10766 25.4835L5.34432 25.6255L13.316 30.2225C13.5132 30.3382 13.7378 30.3992 13.9665 30.3992C14.1952 30.3992 14.4197 30.3382 14.617 30.2225L24.355 24.6083V28.4956C24.3541 28.5158 24.3486 28.5355 24.339 28.5532C24.3295 28.5709 24.316 28.5863 24.2997 28.5981L16.2333 33.2503C14.5119 34.242 12.4672 34.51 10.5483 33.9955C8.62944 33.4811 6.99313 32.2261 5.99866 30.5063ZM3.90132 13.1593C4.78613 11.6322 6.18271 10.4675 7.84382 9.87129V19.3333C7.84083 19.5619 7.89923 19.7871 8.01295 19.9854C8.12667 20.1837 8.29153 20.3479 8.49032 20.4608L18.181 26.0513L14.8142 27.9988C14.7959 28.0085 14.7756 28.0135 14.755 28.0135C14.7344 28.0135 14.714 28.0085 14.6958 27.9988L6.64532 23.3546C4.92709 22.3586 3.67357 20.7224 3.15927 18.8041C2.64496 16.8858 2.91179 14.8419 3.90132 13.12V13.1593ZM31.5618 19.5856L21.8397 13.94L25.1987 12C25.2169 11.9903 25.2372 11.9852 25.2578 11.9852C25.2785 11.9852 25.2988 11.9903 25.317 12L33.3675 16.6521C34.5984 17.3624 35.6019 18.4081 36.2608 19.6673C36.9196 20.9265 37.2067 22.3471 37.0885 23.7633C36.9703 25.1795 36.4516 26.5329 35.5931 27.6654C34.7346 28.7979 33.5716 29.6628 32.24 30.1591V20.6971C32.233 20.4689 32.1668 20.2464 32.0479 20.0516C31.929 19.8567 31.7616 19.6962 31.5618 19.5856ZM34.913 14.5471L34.6763 14.4051L26.7205 9.76879C26.522 9.65233 26.2961 9.59093 26.066 9.59093C25.8359 9.59093 25.6099 9.65233 25.4115 9.76879L15.6817 15.3828V11.4956C15.6796 11.4759 15.6829 11.4559 15.6912 11.4379C15.6996 11.4198 15.7126 11.4044 15.729 11.3931L23.7795 6.74879C25.0133 6.03799 26.4241 5.69319 27.8467 5.75472C29.2693 5.81625 30.645 6.28158 31.8129 7.09626C32.9808 7.91095 33.8925 9.04132 34.4415 10.3552C34.9906 11.669 35.1541 13.112 34.9132 14.5155L34.913 14.5471ZM13.8442 21.4383L10.4775 19.4986C10.4606 19.4885 10.4462 19.4748 10.4353 19.4584C10.4244 19.4421 10.4171 19.4236 10.4142 19.4041V10.1236C10.416 8.69991 10.8231 7.30615 11.5879 6.10529C12.3527 4.90443 13.4435 3.9461 14.7329 3.34236C16.0223 2.73861 17.4568 2.51439 18.8689 2.69592C20.281 2.87745 21.6123 3.45723 22.707 4.36746L22.4703 4.50163L14.5067 9.09829C14.3084 9.21454 14.1439 9.38035 14.0291 9.57943C13.9144 9.77851 13.8534 10.004 13.8522 10.2338L13.8442 21.4383ZM15.6735 17.496L20.0102 14.9963L24.355 17.496V22.495L20.026 24.9945L15.6815 22.495L15.6735 17.496Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_74_221">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    }
                    title={"AI Support"}
                    desc={
                      "We aim to integrate OpenAI to provide personalized, AI-powered tutoring and learning experiences tailored to each student's unique needs and progress."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={0.8}>
                  <PioneerCard
                    icon={
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_79_246)">
                          <path
                            d="M19.9999 40C18.2737 40 16.8694 38.5956 16.8694 36.8693C16.8694 35.1429 18.2737 33.7385 19.9999 33.7385C21.7262 33.7385 23.1307 35.1429 23.1307 36.8693C23.1307 38.5956 21.7262 40 19.9999 40ZM19.9999 35.4416C19.2128 35.4416 18.5725 36.0821 18.5725 36.8693C18.5725 37.6565 19.2128 38.2968 19.9999 38.2968C20.787 38.2968 21.4275 37.6564 21.4275 36.8693C21.4275 36.0821 20.787 35.4416 19.9999 35.4416ZM26.0636 36.4755C25.7222 36.4755 25.4001 36.2689 25.2694 35.9316C25.0994 35.493 25.3172 34.9998 25.7556 34.8298C30.027 33.1741 33.3911 29.7616 34.9852 25.467C35.1488 25.0261 35.639 24.8014 36.0799 24.965C36.5208 25.1287 36.7455 25.6188 36.5819 26.0597C34.8183 30.8108 31.0966 34.5862 26.3711 36.4177C26.27 36.4569 26.1659 36.4755 26.0636 36.4755ZM13.9095 36.4755C13.8072 36.4755 13.7031 36.457 13.602 36.4177C8.87651 34.5862 5.15481 30.8108 3.3911 26.0597C3.22738 25.6187 3.4522 25.1288 3.8931 24.965C4.33422 24.8013 4.82408 25.026 4.9878 25.467C6.58205 29.7616 9.94608 33.1741 14.2175 34.8298C14.656 34.9998 14.8737 35.4929 14.7037 35.9316C14.573 36.2689 14.2508 36.4755 13.9095 36.4755ZM20.9263 32.5388H19.0738C16.3998 32.5388 15.2217 30.398 14.5679 28.7875L14.3255 28.1902C14.1487 27.7543 14.3587 27.2577 14.7945 27.0809C15.2304 26.904 15.7269 27.1141 15.9037 27.5498L16.146 28.1472C16.5121 29.0493 16.8947 29.699 17.3339 30.1336L19.312 27.4228C19.4723 27.2032 19.7279 27.0732 19.9999 27.0732C20.2718 27.0732 20.5274 27.2031 20.6877 27.4228L22.666 30.1335C23.1052 29.6989 23.4877 29.0491 23.8539 28.1469L24.0963 27.5497C24.2731 27.1138 24.7697 26.9042 25.2055 27.0809C25.6413 27.2578 25.8512 27.7544 25.6743 28.1903L25.4319 28.7875C24.7785 30.3978 23.6003 32.5388 20.9263 32.5388ZM18.9323 30.8325C18.9789 30.8346 19.026 30.8356 19.0738 30.8356H20.9262C20.9741 30.8356 21.0211 30.8345 21.0678 30.8325L20.0001 29.3694L18.9323 30.8325ZM12.1297 25.7372C12.0231 25.7372 11.9147 25.7171 11.8099 25.6745L11.2126 25.4321C9.60216 24.7783 7.46119 23.6002 7.46119 20.9262V19.074C7.46119 16.4 9.60216 15.2218 11.2125 14.5681L11.8099 14.3256C12.2454 14.1488 12.7422 14.3587 12.9191 14.7944C13.0961 15.2303 12.8861 15.7269 12.4503 15.9038L11.8531 16.1462C10.9509 16.5122 10.3012 16.8947 9.86657 17.3339L12.5774 19.3122C12.7972 19.4725 12.927 19.7281 12.927 20.0001C12.927 20.272 12.7972 20.5276 12.5774 20.6879L9.86657 22.6661C10.3011 23.1053 10.9509 23.4879 11.8531 23.854L12.4503 24.0963C12.8861 24.2732 13.0961 24.7698 12.9191 25.2057C12.7848 25.5366 12.4661 25.7372 12.1297 25.7372ZM9.16753 18.9321C9.1654 18.9787 9.16434 19.0259 9.16434 19.0736V20.9261C9.16434 20.9739 9.1654 21.0212 9.16753 21.0677L10.6309 19.9999L9.16753 18.9321ZM27.8702 25.7372C27.5337 25.7372 27.2151 25.5366 27.0808 25.2056C26.904 24.7698 27.1139 24.2731 27.5497 24.0963L28.1471 23.854C29.0492 23.4878 29.699 23.1053 30.1335 22.6661L27.4226 20.6879C27.2029 20.5276 27.073 20.272 27.073 20.0001C27.073 19.7281 27.2029 19.4725 27.4226 19.3122L30.1334 17.3339C29.6989 16.8948 29.049 16.5122 28.147 16.1462L27.5497 15.9038C27.1139 15.727 26.904 15.2303 27.0808 14.7945C27.2576 14.3587 27.7544 14.149 28.1901 14.3256L28.7875 14.568C30.3979 15.2218 32.5389 16.3999 32.5389 19.0738V20.9262C32.5389 23.6002 30.398 24.7783 28.7876 25.432L28.1901 25.6745C28.0852 25.7171 27.9769 25.7372 27.8702 25.7372ZM29.3693 20.0001L30.8325 21.0678C30.8346 21.0212 30.8357 20.974 30.8357 20.9262V19.074C30.8357 19.0262 30.8346 18.9788 30.8325 18.9322L29.3693 20.0001ZM36.8692 23.1308C35.143 23.1308 33.7385 21.7264 33.7385 20.0002C33.7385 18.2738 35.143 16.8693 36.8692 16.8693C38.5956 16.8693 40 18.2738 40 20.0002C40 21.7263 38.5956 23.1308 36.8692 23.1308ZM36.8692 18.5725C36.082 18.5725 35.4417 19.213 35.4417 20.0002C35.4417 20.7873 36.082 21.4276 36.8692 21.4276C37.6564 21.4276 38.2969 20.7872 38.2969 20.0002C38.2969 19.2129 37.6564 18.5725 36.8692 18.5725ZM3.13073 23.1308C1.40448 23.1308 0.000133514 21.7264 0.000133514 20.0002C0.000133514 18.2738 1.40448 16.8693 3.13073 16.8693C4.85698 16.8693 6.26143 18.2738 6.26143 20.0002C6.26143 21.7263 4.85698 23.1308 3.13073 23.1308ZM3.13073 18.5725C2.34356 18.5725 1.70328 19.213 1.70328 20.0002C1.70328 20.7873 2.34366 21.4276 3.13073 21.4276C3.9179 21.4276 4.55829 20.7872 4.55829 20.0002C4.55829 19.2129 3.9179 18.5725 3.13073 18.5725ZM35.7837 14.9843C35.4378 14.9843 35.1126 14.7721 34.9852 14.4288C33.3911 10.1343 30.027 6.72179 25.7556 5.06612C25.3171 4.89612 25.0994 4.40295 25.2694 3.96429C25.4393 3.52583 25.9327 3.30772 26.3712 3.47814C31.0967 5.30967 34.8183 9.08501 36.582 13.8362C36.7457 14.2772 36.5209 14.7672 36.08 14.9308C35.9822 14.967 35.882 14.9843 35.7837 14.9843ZM4.18934 14.9843C4.09088 14.9843 3.99082 14.9671 3.8931 14.9308C3.4522 14.7671 3.22749 14.2769 3.3911 13.8362C5.15481 9.08501 8.87651 5.30967 13.602 3.47814C14.0404 3.30826 14.5337 3.52583 14.7038 3.96429C14.8738 4.40285 14.656 4.89612 14.2176 5.06612C9.9463 6.72179 6.58216 10.1343 4.98791 14.4288C4.86038 14.7719 4.53508 14.9843 4.18934 14.9843ZM15.1144 12.9819C15.0078 12.9819 14.8994 12.9618 14.7946 12.9192C14.3588 12.7424 14.1488 12.2458 14.3256 11.8099L14.5679 11.2127C15.2217 9.60213 16.3999 7.46117 19.0738 7.46117H20.9262C23.6002 7.46117 24.7784 9.60213 25.4321 11.2126L25.6744 11.8098C25.8513 12.2457 25.6414 12.7423 25.2056 12.9192C24.7696 13.0958 24.2732 12.886 24.0964 12.4504L23.854 11.8532C23.4878 10.9509 23.1053 10.3012 22.6661 9.86654L20.6878 12.5773C20.5275 12.7969 20.2719 12.9269 20 12.9269C19.728 12.9269 19.4723 12.7969 19.3121 12.5773L17.334 9.86654C16.8948 10.3011 16.5122 10.951 16.1461 11.8532L15.9038 12.4503C15.7696 12.7812 15.4508 12.9819 15.1144 12.9819ZM18.9323 9.1674L20.0001 10.6306L21.0678 9.1674C21.0212 9.16527 20.9741 9.16431 20.9263 9.16431H19.0738C19.026 9.16431 18.9788 9.16538 18.9323 9.1674ZM19.9999 6.26141C18.2737 6.26141 16.8694 4.85706 16.8694 3.1307C16.8694 1.40435 18.2737 0 19.9999 0C21.7262 0 23.1307 1.40435 23.1307 3.1307C23.1307 4.85706 21.7262 6.26141 19.9999 6.26141ZM19.9999 1.70315C19.2128 1.70315 18.5725 2.34364 18.5725 3.1307C18.5725 3.91777 19.2128 4.55826 19.9999 4.55826C20.787 4.55826 21.4275 3.91777 21.4275 3.1307C21.4275 2.34364 20.787 1.70315 19.9999 1.70315Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_79_246">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    }
                    title={"Student Platform"}
                    desc={
                      "We integrate student platforms that track progress in real-time, allowing us to personalize learning experiences based on individual student needs and performance."
                    }
                  />
                </Animator>
                <Animator direction="left" delay={1.2}>
                  <PioneerCard
                    icon={
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.9047 30.9009C42.6647 30.6866 46.546 30.2253 47.237 31.1153C47.9277 31.9889 46.464 35.6649 45.806 37.2966C45.6087 37.7913 46.0363 37.9889 46.4803 37.6099C49.375 35.1703 50.1317 30.0766 49.5397 29.3349C48.9473 28.6099 43.8653 27.9833 40.773 30.1593C40.296 30.5053 40.3783 30.9669 40.9047 30.9009Z"
                          fill="#FF9900"
                        />
                        <path
                          d="M24.9507 39.8186C31.7107 39.8186 39.5723 37.6919 44.9837 33.6866C45.8717 33.0272 45.0987 32.0219 44.194 32.4339C38.125 35.0052 31.5297 36.2582 25.5263 36.2582C16.6283 36.2582 8.02633 33.8022 1.053 29.7472C0.443998 29.3846 -0.016335 30.0109 0.493332 30.4726C6.941 36.3076 15.477 39.8186 24.9507 39.8186Z"
                          fill="#FF9900"
                        />

                        <path
                          d="M14.2107 20.9451C14.2107 21.5551 14.2763 22.0494 14.3913 22.4121C14.5375 22.82 14.7136 23.2166 14.918 23.5987C15 23.7307 15.033 23.8627 15.033 23.9781C15.033 24.1431 14.9343 24.3081 14.7203 24.4727L13.6843 25.1651C13.5363 25.2637 13.388 25.3134 13.2567 25.3134C13.092 25.3134 12.9277 25.2307 12.7633 25.0824C12.5416 24.8437 12.3432 24.5843 12.171 24.3077C11.9871 23.991 11.817 23.6665 11.661 23.3351C10.3783 24.8517 8.76633 25.6101 6.82567 25.6101C5.444 25.6101 4.34233 25.2144 3.53633 24.4234C2.73033 23.6321 2.319 22.5767 2.319 21.2584C2.319 19.8571 2.81233 18.7197 3.81567 17.8627C4.819 17.0054 6.15133 16.5771 7.84567 16.5771C8.40467 16.5771 8.98033 16.6264 9.589 16.7087C10.1973 16.7914 10.8223 16.9231 11.4803 17.0714V15.8681C11.4803 14.6154 11.217 13.7417 10.707 13.2307C10.181 12.7197 9.29267 12.4727 8.02633 12.4727C7.45067 12.4727 6.85867 12.5384 6.25 12.6867C5.64532 12.8312 5.0517 13.0185 4.47367 13.2474C4.28664 13.3313 4.09435 13.4029 3.898 13.4617C3.783 13.4944 3.70067 13.5111 3.63467 13.5111C3.40467 13.5111 3.28933 13.3464 3.28933 13.0001V12.1924C3.28933 11.9287 3.32267 11.7307 3.40467 11.6157C3.48667 11.5001 3.63467 11.3847 3.865 11.2691C4.44067 10.9724 5.13167 10.7254 5.93733 10.5274C6.74333 10.3134 7.599 10.2141 8.50333 10.2141C10.4607 10.2141 11.8913 10.6594 12.8123 11.5494C13.717 12.4394 14.1777 13.7914 14.1777 15.6044V20.9451H14.2107ZM7.533 23.4507C8.07567 23.4507 8.635 23.3517 9.227 23.1541C9.819 22.9561 10.3453 22.5934 10.7893 22.0991C11.0527 21.7857 11.25 21.4397 11.3487 21.0441C11.4473 20.6484 11.513 20.1704 11.513 19.6101V18.9177C11.0143 18.7962 10.5092 18.7027 10 18.6377C9.48725 18.5723 8.9709 18.5392 8.454 18.5384C7.352 18.5384 6.546 18.7527 6.00333 19.1977C5.46067 19.6431 5.19733 20.2694 5.19733 21.0934C5.19733 21.8681 5.39467 22.4451 5.806 22.8407C6.20067 23.2527 6.77633 23.4507 7.53267 23.4507H7.533ZM20.74 25.2307C20.444 25.2307 20.2467 25.1814 20.115 25.0661C19.9837 24.9671 19.8683 24.7361 19.7697 24.4231L15.9047 11.6814C15.806 11.3514 15.7567 11.1374 15.7567 11.0221C15.7567 10.7584 15.888 10.6101 16.1513 10.6101H17.763C18.0757 10.6101 18.2897 10.6594 18.4047 10.7747C18.5363 10.8737 18.6347 11.1047 18.7337 11.4177L21.497 22.3297L24.0627 11.4177C24.1447 11.0877 24.2433 10.8737 24.375 10.7747C24.5067 10.6757 24.7367 10.6101 25.033 10.6101H26.3487C26.6613 10.6101 26.875 10.6594 27.0067 10.7747C27.1383 10.8737 27.2533 11.1047 27.319 11.4177L29.9177 22.4617L32.7633 11.4177C32.8617 11.0877 32.9767 10.8737 33.092 10.7747C33.2237 10.6757 33.4373 10.6101 33.7337 10.6101H35.263C35.5263 10.6101 35.6743 10.7417 35.6743 11.0221C35.6743 11.1044 35.658 11.1867 35.6413 11.2857C35.6156 11.4263 35.5771 11.5642 35.5263 11.6977L31.5627 24.4401C31.4637 24.7697 31.3487 24.9837 31.217 25.0827C31.0857 25.1817 30.8717 25.2477 30.592 25.2477H29.1777C28.865 25.2477 28.651 25.1981 28.5197 25.0827C28.3883 24.9674 28.273 24.7531 28.2073 24.4234L25.658 13.7917L23.125 24.4071C23.0427 24.7367 22.944 24.9511 22.8123 25.0664C22.681 25.1817 22.4507 25.2311 22.1547 25.2311L20.74 25.2307ZM41.875 25.6761C41.0197 25.6761 40.1643 25.5771 39.342 25.3794C38.5197 25.1814 37.8783 24.9671 37.4507 24.7197C37.1873 24.5714 37.0067 24.4064 36.9407 24.2584C36.8767 24.1128 36.8431 23.9557 36.842 23.7967V22.9561C36.842 22.6101 36.9737 22.4451 37.2203 22.4451C37.319 22.4451 37.4177 22.4617 37.5163 22.4944C37.615 22.5277 37.763 22.5934 37.9277 22.6594C38.5086 22.9154 39.1151 23.1087 39.737 23.2361C40.3947 23.3681 41.0363 23.4341 41.694 23.4341C42.7303 23.4341 43.5363 23.2527 44.0953 22.8901C44.6547 22.5274 44.9507 22.0001 44.9507 21.3241C44.9507 20.8627 44.8027 20.4837 44.5067 20.1704C44.2107 19.8571 43.6513 19.5771 42.8453 19.3134L40.4607 18.5714C39.26 18.1924 38.3717 17.6321 37.829 16.8901C37.2863 16.1647 37.0067 15.3571 37.0067 14.5001C37.0067 13.8077 37.1547 13.1977 37.4507 12.6704C37.7467 12.1431 38.1413 11.6814 38.635 11.3187C39.1283 10.9397 39.6873 10.6594 40.3453 10.4617C41.0033 10.2637 41.694 10.1814 42.4177 10.1814C42.7797 10.1814 43.158 10.1981 43.5197 10.2474C43.898 10.2967 44.2433 10.3627 44.5887 10.4287C44.9177 10.5111 45.2303 10.5934 45.5263 10.6921C45.8223 10.7914 46.0527 10.8901 46.217 10.9891C46.4473 11.1211 46.612 11.2527 46.7107 11.4011C46.8093 11.5331 46.8587 11.7144 46.8587 11.9451V12.7201C46.8587 13.0664 46.727 13.2477 46.4803 13.2477C46.3487 13.2477 46.135 13.1817 45.8553 13.0497C44.9177 12.6214 43.865 12.4071 42.6973 12.4071C41.76 12.4071 41.0197 12.5554 40.51 12.8684C40 13.1817 39.737 13.6597 39.737 14.3357C39.737 14.7971 39.9013 15.1924 40.2303 15.5057C40.5593 15.8191 41.1677 16.1324 42.0393 16.4124L44.375 17.1544C45.5593 17.5334 46.4143 18.0611 46.9243 18.7367C47.4343 19.4124 47.681 20.1871 47.681 21.0444C47.681 21.7531 47.533 22.3961 47.2533 22.9564C46.9573 23.5167 46.5627 24.0114 46.0527 24.4071C45.5427 24.8191 44.9343 25.1157 44.227 25.3301C43.487 25.5607 42.7137 25.6761 41.875 25.6761Z"
                          fill="#252F3E"
                        />
                      </svg>
                    }
                    title={"Safety"}
                    desc={
                      "We integrate AWS to provide scalable, secure, and cloud-based infrastructure that enhances the performance and accessibility of our learning platform."
                    }
                  />
                </Animator>
              </div>
            </div>
            <div className="block md:hidden w-full h-full">
              <Pioneers />
            </div>
          </div>
        </div>
        {/*</div>*/}
        <div className="relative px-1">
          <div className="relative py-4">
            <div className="w-full py-3">
              <div className="basis-1/2 space-y-2 items-center gap-4 flex flex-col">
                <Animator direction="up" delay={0.5}>
                  <h1 className="text-3xl text-center font-black ">
                    Latest News
                  </h1>
                </Animator>
                <Animator
                  direction="up"
                  delay={0.8}
                  className="w-full flex justify-center"
                >
                  <h1 className="text-center text-xs w-full px-3 md:w-2/3">
                    Stay updated with the latest developments at Gala Education.
                    Here, we share exciting announcements, new initiatives, and
                    progress on our mission to make quality education accessible
                    to all. Follow our journey as we continue to make a
                    difference in Tanzania&apos;s educational landscape.
                  </h1>
                </Animator>
                <div className="flex flex-col p-6 ">
                  <div className="flex gap-2 flex-col md:flex-row ">
                    <Animator direction="up" delay={1.2} className="basis-1/2">
                      <div className="basis-1/2 flex flex-col h-80">
                        <Image
                          alt="image"
                          src="/ai.jpeg"
                          quality={75}
                          width={200}
                          height={200}
                          className=" h-[127px] w-full object-cover"
                        />

                        <div className="flex sm:flex-row h-full items-center flex-col bg-[#001840] ">
                          <div className="basis-1/2 text-white sm:text-lg md:text-2xl text-lg p-4 font-black">
                            Gala Education Launches AI-Powered Learning Platform
                          </div>
                          <div className="basis-1/2 text-[10px] px-2 py-3 flex items-center justify-center text-white">
                            Gala Education is excited to announce the launch of
                            our AI-powered learning platform, offering
                            personalized tutoring and adaptive learning
                            experiences for K12 students.
                          </div>
                        </div>
                        <div className="md:hidden block mb-3 mt-3">
                          <button className="border border-[#030DFE] w-fit rounded p-1 text-xs">
                            Read the Article
                          </button>
                        </div>

                        <hr className="block md:hidden mb-1" />
                      </div>
                    </Animator>

                    <div className="basis-1/2 md:h-80 justify-between flex flex-col gap-3 md:gap-1">
                      <Animator direction="left" delay={0.4}>
                        <NewsCard
                          img={"/news1.jpeg"}
                          title={
                            "New Scholarships for Students Facing Financial Hardship."
                          }
                          desc={
                            "In our commitment to making education accessible, Gala Education has introduced new scholarship opportunities for students struggling to afford our courses."
                          }
                        />
                      </Animator>
                      <hr />
                      <Animator direction="left" delay={0.8}>
                        <NewsCard
                          img={"/news2.jpeg"}
                          title={"Interactive STEM Workshops Coming Soon."}
                          desc={
                            "Gala Education is launching a series of interactive STEM workshops aimed at fostering innovation and critical thinking among young learners."
                          }
                        />
                      </Animator>
                      <hr />
                      <Animator direction="left" delay={1.2}>
                        <NewsCard
                          img={"/news3.jpeg"}
                          title={
                            "Introducing Gala Learning Labs for Personalized Tutoring."
                          }
                          desc={
                            "Our new Gala Learning Labs provide one-on-one tutoring sessions focused on student-specific needs, helping learners excel in subjects."
                          }
                        />
                      </Animator>

                      <hr />
                    </div>
                  </div>
                  <div className="md:block hidden">
                    <div className="flex !items-start w-full md:mt-5 lg:mt-0">
                      <button className="border border-[#030DFE] mt-4 w-fit px-4 rounded p-1 text-xs">
                        Read the Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-12 items-center gap-4 px-3 flex flex-col">
            <Animator direction="up" delay={0.5}>
              <h1 className="text-3xl text-center font-black ">
                Latest Events
              </h1>
            </Animator>
            <Animator
              direction="up"
              delay={0.8}
              className="w-full flex justify-center"
            >
              <h1 className="text-center text-xs w-full px-3 md:w-2/3">
                Stay up-to-date with our latest initiatives and activities! From
                community outreach programs to educational workshops and events,
                Gala Education is committed to making a positive impact. Join us
                in supporting our mission to transform education across
                Tanzania.
              </h1>
            </Animator>
            <div className="hidden md:block">
              <div className="relative py-8">
                <div
                  className={
                    "flex flex-row max-sm:w-[98%] sm:justify-around items-center gap-y-2 gap-x-4 px-2 overflow-x-auto"
                  }
                >
                  <Animator direction="right" delay={0.5}>
                    <Events
                      img={"/hackathon.jpeg"}
                      title={"Future of Learning Summit"}
                      desc={
                        "A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."
                      }
                    />
                  </Animator>
                  <Animator direction="right" delay={0.8}>
                    <Events
                      img={"/career_guidance.jpeg"}
                      title={"Student Innovation Hackathon"}
                      desc={
                        "A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."
                      }
                    />
                  </Animator>
                  <Animator direction="right" delay={1.2}>
                    <Events
                      img={"/learning_summit.jpeg"}
                      title={"Interactive Career Guidance Fair"}
                      desc={
                        "A workshop-focused event connecting students with industry professionals, offering career advice, mentorship, and guidance on education pathways for future success."
                      }
                    />
                  </Animator>
                </div>
              </div>
            </div>
            <div className="block md:hidden w-full">
              <LatestNews />
            </div>
          </div>

          <div className="py-12 items-center gap-4 flex flex-col">
            <Animator direction="up" delay={0.5}>
              <h1 className="text-3xl text-center font-black px-2">
                Frequently Asked Questions (FAQs)
              </h1>
            </Animator>
            <Animator
              direction="up"
              delay={0.8}
              className="w-full flex justify-center"
            >
              <h1 className="text-center text-xs w-full px-6 md:w-2/3">
                Here you’ll find answers to common questions about Gala
                Education’s services, donations, and how our platform works.
                Whether you&apos;re a student, parent, or supporter, we&apos;ve
                provided helpful information to guide you. If you don&apos;t
                find what you&apos;re looking for, feel free to reach out to us!
              </h1>
            </Animator>

            <div className="relative md:w-2/3 px-4 w-full md:py-8">
              <FaqCard
                faqQn={"What is Gala Education?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "Gala Education is an online platform dedicated to providing high-quality tutoring for Primary, Secondary, and High School students across Tanzania. In addition to tutoring, we offer short courses designed to equip Tanzanian youth with self-employable skills. Our platform is powered by AI, which helps deliver personalized learning experiences tailored to each student’s individual needs and progress. We also reinvest profits into philanthropic activities, including building classrooms and libraries for under-served communities"
                }
              />
              <FaqCard
                faqQn={"Is there a money-back guarantee?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "Gala Education does not offer refunds unless there is a verified technical issue that prevents you from accessing our services. If you encounter such a problem, please contact our support team, and we will assist you in resolving the issue or processing a refund if necessary."
                }
              />
              <FaqCard
                faqQn={"Who can use Gala Education?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "Gala Education is designed for students in Primary, Secondary, and High School across Tanzania who are looking for personalized tutoring in various subjects. Our short courses are open to young adults looking to acquire practical, self-employable skills in various fields. Anyone with access to a device and internet connection can benefit from our educational resources."
                }
              />
              <FaqCard
                faqQn={"Do I need a device to access the tutoring sessions?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "Yes, you will need a device, such as a smartphone, tablet, or computer, and a stable internet connection to access our online tutoring sessions. This allows you to participate in lessons, access learning materials, and interact with our qualified tutors from anywhere at your convenience."
                }
              />
              <FaqCard
                faqQn={"Do I need to be a registered user to donate?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "No, donations can be made by anyone, regardless of whether you are a registered user of Gala Education. Our donation system is designed to allow anyone who wants to support our mission to contribute. The funds are directly used to support children’s education, particularly those from low-income backgrounds who lack access to quality resources."
                }
              />
              <FaqCard
                faqQn={"How are the donations used?"}
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "All donations received are reinvested into our philanthropic efforts to improve education in Tanzania. This includes building and equipping classrooms, libraries, and providing educational materials for under-served communities. The donations also help support the development of educational programs that benefit students in need, ensuring that every child has access to quality learning opportunities."
                }
              />
              <FaqCard
                faqQn={
                  "What makes Gala Education different from other tutoring platforms?"
                }
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
                faqAns={
                  "Gala Education stands out by combining quality online tutoring with a strong commitment to community development. Not only do we provide expert tutors to support student learning, but we also employ teachers across Tanzania to help address the national shortage of qualified educators. Our platform also integrates AI-powered personalized learning to enhance each student’s progress. Moreover, we reinvest profits into community-building projects like classrooms and libraries, making our mission far-reaching and impactful."
                }
              />
              <FaqCard
                faqQn={"How do the short courses work?"}
                faqAns={
                  "Our short courses are specifically designed to equip Tanzanian youth with practical, self-employable skills in various industries such as technology, business, and creative fields. These courses are taught by experienced academics, executives, and industry leaders. Students can take the courses online, at their own pace, and gain valuable skills that will help them pursue self-employment or career opportunities. Upon completion, students may also receive certification for the skills they’ve learned."
                }
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
              />
              <FaqCard
                faqQn={"Is there any age limit for the short courses?"}
                faqAns={
                  "There is no specific age limit for the short courses. The courses are open to all Tanzanian youth who are eager to learn and acquire skills for self-employment. Whether you’re a recent graduate, a young professional, or someone looking to switch careers, our short courses offer flexible learning opportunities that can be adapted to your personal goals."
                }
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
              />
              <FaqCard
                faqQn={"How can I become a tutor on Gala Education?"}
                faqAns={
                  "If you are a qualified educator with a passion for teaching and helping students succeed, you can apply to become a tutor at Gala Education. We are always looking for skilled tutors who can deliver personalized, high-quality lessons across a range of subjects. To apply, visit our website to submit your application, and we will contact you if there is a suitable opportunity to join our team."
                }
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
              />
              <FaqCard
                faqQn={
                  "Can I access Gala Education if I live outside of Tanzania?"
                }
                faqAns={
                  "While Gala Education is primarily focused on providing services to students within Tanzania, anyone with a stable internet connection can access our short courses. Our online platform allows individuals from anywhere in the world to benefit from our industry-leading courses that equip youth with valuable skills for self-employment. However, tutoring sessions are designed specifically for Tanzanian students, so availability may vary depending on your location."
                }
                bgColor={"#001840"}
                iconColor={"white"}
                headerColor={"white"}
              />
            </div>
          </div>
        </div>
        {!cookieIsAccepted && <AcceptCookies />}
        <Animator delay={0.2} direction="up">
          <Footer />
        </Animator>
      </div>
    </>
  );
}

export default Home;
