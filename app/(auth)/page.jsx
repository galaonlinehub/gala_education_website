import React from "react";
import Image from "next/image";
import { Button, Checkbox, Input, Select } from "antd";
import Card1 from "@/components/home/card/Card1";
// const {TextArea} = Input;
function Home() {
    return (
        <div>
            <div className="relative w-[100vw]  h-[100vh]">
                <Image
                    src="/gala_home1.jpeg"
                    layout="fill"
                    objectFit="cover"
                    alt="Gala Home"
                />
                <div className="absolute inset-0 bg-black opacity-70" />

                <div className="absolute inset-0 sm:px-[15vw] px-[5vw] sm:pt-[10vh] pt-[4vh] flex sm:flex-row flex-col sm:justify-between">
                    <div>
                        <div className="">
                            <h1 className="text-white sm:text-[64px] text-[40px]  sm:leading-[70px] leading-[35px] font-black">
                                Gala
                            </h1>
                            <h1 className="text-white sm:text-[64px] text-[40px]  sm:leading-[70px] leading-[35px] font-black">
                                Education
                            </h1>
                        </div>
                        <h2 className="text-white font-bold sm:leading-[30px] leading-[15px] sm:text-[20px] text-[10px] pt-[4vh]">
                            "Empowering minds,shaping <br /> futures - Gala
                            Education, your
                            <br /> pathway to success."
                        </h2>
                        <h2 className="text-white font-bold leading-[30px] sm:text-[20px] text-[10px] sm:pt-[4vh] pt-[2vh]">
                            Join Now to get 50% off
                        </h2>
                    </div>
                    <div className="bg-white px-5 py-3 w-[90vw] sm:w-[30vw] h-fit rounded-[15px]">
                        <h1 className="font-black sm:text-xs text-[10px]">
                            Are you interested in a session and want to know
                            more?
                        </h1>
                        <h2 className="font-normal sm:text-xs text-[8px]">
                            Fill out the form and you will be contacted as soon
                            as <br /> possible by our office
                        </h2>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <input
                                placeholder="Name*"
                                className="bg-[#001840] placeholder:text-[#475873] py-1 px-2 rounded-[5px]"
                            />
                            <input
                                placeholder="Email*"
                                className="bg-[#001840] placeholder:text-[#475873] py-1 px-2 rounded-[5px]"
                            />
                            <input
                                placeholder="Name*"
                                className="bg-[#001840] placeholder:text-[#475873] py-1 px-2 rounded-[5px]"
                            />
                            <input
                                placeholder="Email*"
                                className="bg-[#001840] placeholder:text-[#475873] py-1 px-2 rounded-[5px]"
                            />

                            <Select
                                // defaultValue="lucy"
                                placeholder="Level"
                                className="custom-select placeholder:text-[#475873]  py-1 px-2 rounded-[5px]"
                                options={[
                                    { value: "jack", label: "Jack" },
                                    { value: "lucy", label: "Lucy" },
                                    { value: "Yiminghe", label: "yiminghe" },
                                    { value: "disabled", label: "Disabled" },
                                ]}
                            />
                        </div>
                        <div>
                            <div className="space-x-1">
                                <Checkbox />
                                <span className="text-[8px] sm:leading-[5px] leading-[2px]">
                                    I authorize the processing of personal data
                                    for purposes related to the performance of
                                    institutional activities * ( Information)
                                </span>
                            </div>
                            <div className="space-x-1">
                                <Checkbox />
                                <span className="text-[8px] leading-[5px]">
                                    I authorize the processing of data for
                                    sending informative material (Information)
                                </span>
                            </div>
                        </div>
                        <div className="py-4">
                            <Button className="!bg-[#800000] !text-white sm:!px-5 !px-3 sm:!py-6 !py-2">
                                Send your request
                            </Button>
                        </div>
                        <textarea
                            rows={2}
                            className="!bg-[#001840] text-white p-2 w-full rounded-[5px]"
                        />
                    </div>
                </div>
            </div>
            <div className="px-20  flex flex-col items-center">
                <div className="relative w-screen h-[45rem] overflow-hidden">
                    <svg
                        viewBox="0 0 408 394"
                        className="absolute sm:top-[18rem] top-[6rem] sm:left-[9rem] left-[6rem] w-[150px] h-[192px] sm:w-[300px] sm:h-[288px] md:w-[408px] md:h-[394px]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M71.158 0.328125L111.576 40.7188L83.0182 69.3125C49.6225 102.75 49.6225 157.125 83.0182 190.563L204.117 311.734C237.512 345.172 291.819 345.172 325.215 311.734C358.611 278.297 358.611 223.922 325.215 190.484L279.647 144.859L319.909 104.469L365.477 150.094C421.111 205.797 421.111 296.422 365.477 352.125C337.699 379.938 301.105 393.922 264.588 393.922C228.071 393.922 191.476 380.016 163.698 352.125L42.6 230.875C-13.0335 175.172 -13.0335 84.5469 42.6 28.8438L71.158 0.328125Z"
                            fill="#0F1F3C"
                            fillOpacity="0.1"
                        />
                    </svg>
                    <svg
                        viewBox="0 0 407 394"
                        className="absolute top-5 sm:left-0 left-[2rem] w-[150px] h-[192px] sm:w-[300px] sm:h-[288px] md:w-[407px] md:h-[394px]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M41.757 41.7969C97.3904 -13.9063 187.902 -13.9063 243.536 41.7969L364.556 162.969C420.19 218.672 420.19 309.297 364.556 365L335.998 393.594L295.658 353.203L324.216 324.609C357.612 291.172 357.612 236.797 324.216 203.359L203.117 82.1094C169.722 48.6719 115.415 48.6719 82.019 82.1094C48.6234 115.547 48.6234 169.922 82.019 203.359L137.653 259.062L97.3124 299.453L41.6789 243.75C-13.8766 188.125 -13.8766 97.5 41.757 41.7969Z"
                            fill="#0F1F3C"
                            fillOpacity="0.1"
                        />
                    </svg>
                    <svg
                        viewBox="0 0 407 394"
                        className="absolute sm:top-[18rem] top-[22rem] sm:right-[4rem] right-[3.5rem] w-[150px] h-[192px] sm:w-[300px] sm:h-[288px] md:w-[407px] md:h-[394px]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M41.757 352.203C97.3904 407.906 187.902 407.906 243.536 352.203L364.556 231.031C420.19 175.328 420.19 84.7031 364.556 29L335.998 0.40625L295.658 40.7969L324.216 69.3906C357.612 102.828 357.612 157.203 324.216 190.641L203.117 311.891C169.722 345.328 115.415 345.328 82.019 311.891C48.6234 278.453 48.6234 224.078 82.019 190.641L137.653 134.938L97.3124 94.5469L41.6789 150.25C-13.8766 205.875 -13.8766 296.5 41.757 352.203Z"
                            fill="#0F1F3C"
                            fillOpacity="0.1"
                        />
                    </svg>
                    <svg
                        viewBox="0 0 408 394"
                        className="absolute sm:top-5 top-[16rem] right-0 w-[150px] h-[192px] sm:w-[300px] sm:h-[288px] md:w-[408px] md:h-[394px]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M71.158 393.672L111.576 353.281L83.0182 324.687C49.6225 291.25 49.6225 236.875 83.0182 203.437L204.117 82.2656C237.512 48.8281 291.819 48.8281 325.215 82.2656C358.611 115.703 358.611 170.078 325.215 203.516L279.647 249.141L319.909 289.531L365.477 243.906C421.111 188.203 421.111 97.5781 365.477 41.875C337.699 14.0625 301.105 0.078125 264.588 0.078125C228.071 0.078125 191.476 13.9844 163.698 41.875L42.6 163.125C-13.0335 218.828 -13.0335 309.453 42.6 365.156L71.158 393.672Z"
                            fill="#0F1F3C"
                            fillOpacity="0.1"
                        />
                    </svg>

                    <div className="absolute top-0 left-0 sm:h-[70vh] bg-black/10 h-fit   flex flex-col items-center   w-screen">
                        <h1 className="font-black text-[20px] sm:text-[40px] ">
                            Why choose our platform?
                        </h1>
                        <h2 className="text-xs sm:text-lg  text-center">
                            "Choose Gala Education for personalized learning,
                            innovative teaching methods, and a commitment to
                        </h2>
                        <h2 className="text-xs sm:text-lg text-center">
                            unlocking every student's full potential."
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Card1
                                image={"/card1img1.jpeg"}
                                title={"Personalized Personal Teaching"}
                                desc={
                                    "Tailored one-on-one sessions in core subjects such as math, science, English, and social studies, focusing on the student's specific needs and learning pace."
                                }
                            />
                            <Card1
                                image={"/card1img2.jpeg"}
                                title={"STEM Enrichment Programs"}
                                desc={
                                    "Specialized tutoring in science, technology, engineering, and math for students interested in deepening their knowledge or exploring STEM fields."
                                }
                            />
                            <Card1
                                image={"/card1img3.jpeg"}
                                title={"Special Education Support"}
                                desc={
                                    "Customized sessions for students with learning disabilities or special needs, providing them with the tools and support to thrive academically."
                                }
                            />
                        </div>
                        <div>
                            <div className="bg-gray-100 flex justify-between items-center rounded-[15px] w-[50px] h-8 my-8 px-2">
                                <div className="h-3 w-3 bg-gray-600 rounded-full" />
                                <div className="h-3 w-3 bg-gray-400 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full">
                    <div className="basis-1/2  gap-3 p-4 flex items-center flex-col">
                        <h1 className="text-black font-black text-3xl">Register with us!</h1>
                        <h3 className="leading-[4px]">"Join Gala Education today - register as a teacher or student and </h3>
                        <h3 className="leading-[4px]">unlock endless learning opportunities!”</h3>
                        <div className="flex gap-5">
                            <Card1 title={"Register as teacher"} image={"/register_teacher.jpeg"} desc={"Become part of our team of educators and help deliver exceptional learning experiences."} />
                            <Card1 title={"Register as student"} image={"/register_student.jpeg"} desc={"Join our community of learners and be part of the journey to excellence in education!"} />
                        </div>
                    </div>
                    <div className="basis-1/2  p-5 relative">
                        <Image src={'/donate1.jpeg'} width={100} height={100} className="w-[266px] absolute top-0 right-0 h-[259px] object-cover rounded-br-[100px]" />
                        <div className="w-2/5 border-[0.6px] px-2 bg-white absolute left-36 bottom-20">
                            <h1 className="text-lg font-black">Donate today to support underfunded schools</h1>
                            <h3 className="text-sm">
                            Join our community and make a difference! Your donation supports quality education and empowers lives. Together, we can create a brighter future. Every contribution counts - be part of something impactful today!
                                </h3> 
                              <button className='border-[1px] border-[#030dfe] self-center rounded-[5px] p-2 text-xs'>Donate</button>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
