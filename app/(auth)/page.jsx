import React from "react";
import Image from "next/image";
import { Button, Checkbox, Input, Select } from "antd";
import Card1 from "@/src/components/home/card/Card1";
import RegisterCard from "@/src/components/home/card/RegisterCard";
import PioneerCard from "@/src/components/home/card/PioneerCard";
import NewsCard from "@/src/components/home/card/NewsCard";
import Events from "@/src/components/home/card/Events";
import Card2 from "@/src/components/home/card/Card2";
// const {TextArea} = Input;
function Home() {
    return (
        <div>
            <div className="relative w-[100vw] homepage-image h-[100vh] overflow-y-auto">
                <Image 
                    src="/gala_home1.jpeg"
                    layout="fill"
                    objectFit="cover"
                    alt="Gala Home"
                />
                <div className="absolute inset-0 bg-black opacity-70" />

                <div className="absolute inset-0 lg:px-[15vw] px-[5vw] lg:pt-[10vh] pt-[4vh] gap-y-12 lg:gap-y-0 flex lg:flex-row flex-col lg:justify-between">
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
                            &ldquo;Empowering minds,shaping <br /> futures - Gala
                            Education, your
                            <br /> pathway to success.&ldquo;
                        </h2>
                        <h2 className="text-white font-bold leading-[30px] sm:text-[20px] text-[10px] sm:pt-[4vh] pt-[2vh]">
                            Join Now to get 50% off
                        </h2>
                    </div>
                    <div className="bg-white px-5 py-3 w-[90vw] lg:w-[30vw] 2xl:w-[15vw] h-fit rounded-[15px]">
                        <h1 className="font-black sm:text-xs text-[10px]">
                            Are you interested in a session and want to know
                            more?
                        </h1>
                        <h2 className="font-normal sm:text-xs text-[8px]">
                            Fill out the form and you will be contacted as soon
                            as <br /> possible by our office
                        </h2>
                        <div className="grid grid-cols-2 homepage-info-form gap-2 mt-3">
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

                    <div className="absolute top-0 left-0  sm:h-[70vh] bg-black/10 h-40vh   flex flex-col items-center  py-8  w-screen">
                        <h1 className="font-black text-[20px] sm:text-[40px]">
                            Why choose our platform?
                        </h1>
                        <h2 className="text-[10px] sm:text-[15px] text-center py-6">
                        &ldquo;Choose Gala Education for personalized learning,
                            innovative teaching methods, and a commitment to
                            <br/>unlocking every student&apos;s full potential.&ldquo;
                        </h2>
                        
                        <div className="flex  gap-3 2xl:gap-24 h-[30vh] sm:h-[27vh] sm:justify-center  w-[98%] px-4 overflow-auto sm:w-full">
                            <Card1
                                image={"/card1img1.jpeg"}
                                title={"Comprehensive Support"}
                                desc={
                                    "Access 24/7 study assistance, academic tools, and a dedicated support team to guide you."
                                }
                            />
                            <Card1
                                image={"/card1img2.jpeg"}
                                title={"Expert Instructors"}
                                desc={
                                    "Learn from highly qualified educators with years of experience."
                                }
                            />
                            <Card1
                                image={"/card1img3.jpeg"}
                                title={"Customized Learning"}
                                desc={
                                    "Tailored lessons and resources that adapt to your learning style and pace."
                                }
                            />
                            
                        </div>
                        <div>
                            <div className="bg-[#b3b3b3]/40 flex justify-between items-center rounded-[15px] w-[40px] h-4 my-8 px-2">
                                <div className="h-2 w-2 bg-gray-600 rounded-full" />
                                <div className="h-2 w-2 bg-gray-400 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex   mt-[0vh]  py-6 sm:py-10 flex-col md:flex-row w-full">
                    <div className="sm:basis-1/2 w-full   sm:h-[50vh] h-[90vh]  gap-7 p-4 flex items-center flex-col">
                        <h1 className="text-black w-full font-black text-center sm:text-[40px] text-xl">
                            Register with us!
                        </h1>
                        <h3 className="leading-[20px] text-[14px] text-center ">
                        &ldquo;Join Gala Education today - register as a teacher
                            or student and <br/> unlock endless learning
                            opportunities!&ldquo;
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <RegisterCard
                                title={"Register as teacher"}
                                image={"/register_teacher.jpeg"}
                                link={'/teacher'}
                                desc={
                                    "Become part of our team of educators and help deliver exceptional learning experiences."
                                }
                            />
                            <RegisterCard
                                title={"Register as student"}
                                image={"/register_student.jpeg"}
                                link={'/student'}
                                desc={
                                    "Join our community of learners and be part of the journey to excellence in education!"
                                }
                            />
                        </div>
                    </div>
                    <div
                        className={
                            "sm:basis-1/2 basis-1  h-full flex w-full sm:justify-center sm:items-center"
                        }
                    >
                        <div className="relative w-full h-[50vh] ">
                            <Image alt="image"
                                src={"/donate1.jpeg"}
                                width={100}
                                height={100}
                                quality={75}
                                className="sm:w-[20vw] bg-blue-400 w-[100vw] absolute sm:top-0 top-20 h-[40vh] 2xl:h-[27vh] sm:left-1/2 object-cover rounded-br-[100px]"
                            />
                            <div className="sm:w-[20vw] w-[95vw] h-fit border-[0.6px] py-3 px-2 top-[15vh] space-y-4 sm:left-1/4 -left-1/3 sm:top-16  bg-white absolute ">
                                <h1 className="text-lg font-black leading-[30px] text-[20px]">
                                    Donate today to support underfunded schools
                                </h1>
                                <h3 className="text-[12px] leading-[25px] font-light">
                                    Join our community and make a difference!
                                    Your donation supports quality education and
                                    empowers lives. Together, we can create a
                                    brighter future. Every contribution counts -
                                    be part of something impactful today!
                                </h3>
                                <button className="border-[1px] font-bold border-[#030dfe] w-[137px] self-center rounded-[5px] p-2 text-xs">
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-screen min-h-[100vh] ">
                        <svg
                            className="w-[250px] md:w-[300px] h-[250px] md:h-[300px] my-[90px] mx-[20px] absolute -top-[26px] -left-[18px]"
                            viewBox="0 0 500 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_101_202)">
                                <path
                                    d="M410.597 350.806L425.056 336.347L413.653 324.944L399.194 339.403L383.976 324.185C396.202 302.177 403.226 276.903 403.226 250C403.226 247.702 402.984 245.468 402.879 243.194C440.774 234.282 467.742 200.734 467.742 161.29H451.613C451.613 192.435 430.823 219.073 401.306 227.008C390.153 153.411 326.653 96.7742 250 96.7742C247.702 96.7742 245.468 97.0161 243.194 97.121C234.282 59.2258 200.734 32.2581 161.29 32.2581V48.3871C192.435 48.3871 219.073 69.1774 227.008 98.6935C153.411 109.847 96.7742 173.347 96.7742 250C96.7742 252.298 97.0161 254.532 97.121 256.806C59.2258 265.718 32.2581 299.266 32.2581 338.71H48.3871C48.3871 307.565 69.1774 280.927 98.6935 272.992C109.847 346.589 173.347 403.226 250 403.226C276.903 403.226 302.177 396.202 324.177 383.976L339.395 399.194L324.935 413.653L336.339 425.056L350.798 410.597L427.823 487.621C435.806 495.605 446.427 500 457.718 500C481.032 500 500 481.032 500 457.726C500 446.435 495.605 435.814 487.621 427.831L410.597 350.806ZM250 112.903C318.79 112.903 375.734 163.871 385.468 230L369.573 232.645C361.121 174.153 310.798 129.032 250 129.032C249.589 129.032 249.185 129.089 248.774 129.097L246.113 113.105C247.419 113.065 248.685 112.903 250 112.903ZM250 145.161C307.806 145.161 354.839 192.194 354.839 250C354.839 307.806 307.806 354.839 250 354.839C192.194 354.839 145.161 307.806 145.161 250C145.161 192.194 192.194 145.161 250 145.161ZM112.903 250C112.903 181.21 163.871 124.266 230 114.532L232.645 130.427C174.153 138.879 129.032 189.202 129.032 250C129.032 250.411 129.089 250.815 129.097 251.226L113.105 253.887C113.065 252.581 112.903 251.315 112.903 250ZM250 387.097C181.21 387.097 124.266 336.129 114.532 270L130.427 267.355C138.879 325.847 189.202 370.968 250 370.968C316.702 370.968 370.968 316.702 370.968 250C370.968 249.589 370.911 249.185 370.903 248.774L386.895 246.113C386.935 247.419 387.097 248.685 387.097 250C387.097 325.597 325.597 387.097 250 387.097ZM338.145 375.129C352.484 365 365 352.484 375.129 338.145L387.79 350.806L350.806 387.79L338.145 375.129ZM457.726 483.871C450.742 483.871 444.169 481.153 439.234 476.218L362.21 399.194L399.194 362.21L476.218 439.234C481.153 444.169 483.871 450.742 483.871 457.726C483.871 472.145 472.145 483.871 457.726 483.871Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                                <path
                                    d="M427.419 145.161C467.444 145.161 500 112.605 500 72.5807C500 32.5565 467.444 0 427.419 0C387.395 0 354.839 32.5565 354.839 72.5807C354.839 112.605 387.395 145.161 427.419 145.161ZM451.613 123.508C444.266 127.008 436.081 129.032 427.419 129.032C418.758 129.032 410.573 127.008 403.226 123.508V112.903C403.226 99.5645 414.081 88.7097 427.419 88.7097C440.758 88.7097 451.613 99.5645 451.613 112.903V123.508ZM411.29 56.4516C411.29 47.5565 418.524 40.3226 427.419 40.3226C436.315 40.3226 443.548 47.5565 443.548 56.4516C443.548 65.3468 436.315 72.5807 427.419 72.5807C418.524 72.5807 411.29 65.3468 411.29 56.4516ZM427.419 16.129C458.54 16.129 483.871 41.4597 483.871 72.5807C483.871 87.9597 477.669 101.903 467.661 112.097C467.387 98.5403 460.46 86.5807 449.952 79.4758C455.935 73.621 459.677 65.4758 459.677 56.4516C459.677 38.6613 445.21 24.1936 427.419 24.1936C409.629 24.1936 395.161 38.6613 395.161 56.4516C395.161 65.4758 398.903 73.621 404.887 79.4758C394.371 86.5887 387.444 98.5403 387.177 112.097C377.169 101.903 370.968 87.9597 370.968 72.5807C370.968 41.4597 396.298 16.129 427.419 16.129Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                                <path
                                    d="M72.5807 145.161C112.605 145.161 145.161 112.605 145.161 72.5807C145.161 32.5565 112.605 0 72.5807 0C32.5565 0 0 32.5565 0 72.5807C0 112.605 32.5565 145.161 72.5807 145.161ZM96.7742 123.508C89.4274 127.008 81.2419 129.032 72.5807 129.032C63.9194 129.032 55.7339 127.008 48.3871 123.508V112.903C48.3871 99.5645 59.2419 88.7097 72.5807 88.7097C85.9194 88.7097 96.7742 99.5645 96.7742 112.903V123.508ZM56.4516 56.4516C56.4516 47.5565 63.6855 40.3226 72.5807 40.3226C81.4758 40.3226 88.7097 47.5565 88.7097 56.4516C88.7097 65.3468 81.4758 72.5807 72.5807 72.5807C63.6855 72.5807 56.4516 65.3468 56.4516 56.4516ZM72.5807 16.129C103.702 16.129 129.032 41.4597 129.032 72.5807C129.032 87.9597 122.831 101.903 112.823 112.097C112.548 98.5403 105.621 86.5807 95.1129 79.4758C101.097 73.621 104.839 65.4758 104.839 56.4516C104.839 38.6613 90.371 24.1936 72.5807 24.1936C54.7903 24.1936 40.3226 38.6613 40.3226 56.4516C40.3226 65.4758 44.0645 73.621 50.0484 79.4758C39.5403 86.5887 32.6129 98.5403 32.3387 112.097C22.3306 101.903 16.129 87.9597 16.129 72.5807C16.129 41.4597 41.4597 16.129 72.5807 16.129Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                                <path
                                    d="M72.5807 354.839C32.5565 354.839 0 387.395 0 427.419C0 467.444 32.5565 500 72.5807 500C112.605 500 145.161 467.444 145.161 427.419C145.161 387.395 112.605 354.839 72.5807 354.839ZM96.7742 478.347C89.4274 481.847 81.2419 483.871 72.5807 483.871C63.9194 483.871 55.7339 481.847 48.3871 478.347V467.742C48.3871 454.403 59.2419 443.548 72.5807 443.548C85.9194 443.548 96.7742 454.403 96.7742 467.742V478.347ZM56.4516 411.29C56.4516 402.395 63.6855 395.161 72.5807 395.161C81.4758 395.161 88.7097 402.395 88.7097 411.29C88.7097 420.186 81.4758 427.419 72.5807 427.419C63.6855 427.419 56.4516 420.186 56.4516 411.29ZM112.823 466.936C112.548 453.379 105.621 441.419 95.1129 434.315C101.097 428.46 104.839 420.315 104.839 411.29C104.839 393.5 90.371 379.032 72.5807 379.032C54.7903 379.032 40.3226 393.5 40.3226 411.29C40.3226 420.315 44.0645 428.46 50.0484 434.315C39.5403 441.427 32.6129 453.379 32.3387 466.936C22.3306 456.742 16.129 442.798 16.129 427.419C16.129 396.298 41.4597 370.968 72.5807 370.968C103.702 370.968 129.032 396.298 129.032 427.419C129.032 442.798 122.831 456.742 112.823 466.936Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                                <path
                                    d="M161.29 233.871V274.194V282.258V290.323H338.71V282.258V274.194V201.613H290.323V274.194H274.194V169.355H225.806V274.194H209.677V233.871H161.29ZM306.452 217.742H322.581V274.194H306.452V217.742ZM241.935 185.484H258.065V274.194H241.935V185.484ZM193.548 274.194H177.419V250H193.548V274.194Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_101_202">
                                    <rect
                                        width="500"
                                        height="500"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <svg
                            className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] my-[90px] mx-[20px] absolute top-0 right-0"
                            viewBox="0 0 800 800"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_101_234)">
                                <path
                                    d="M464.516 464.516C531.303 464.516 586.4 413.497 592.89 348.387H646.323C652.49 384.942 684.284 412.903 722.581 412.903C765.277 412.903 800 378.181 800 335.484C800 293.187 765.91 258.774 723.768 258.129C718.465 240.297 711.342 223.123 702.503 206.813C731.806 176.555 731.626 128.168 701.729 98.271C671.819 68.3871 623.432 68.2065 593.187 97.4968C576.877 88.6581 559.703 81.5484 541.871 76.2323C541.226 34.0903 506.813 0 464.516 0C422.219 0 387.806 34.0903 387.161 76.2323C369.329 81.5355 352.155 88.6581 335.845 97.4968C305.574 68.1936 257.187 68.3871 227.303 98.271C197.419 128.168 197.226 176.555 226.529 206.813C219.045 220.619 212.645 234.994 207.677 249.91C205.123 252.568 202.787 255.484 200.413 258.374C160.542 261.471 129.032 294.826 129.032 335.484C129.032 364.065 144.645 389.019 167.742 402.426V632.258C167.742 639.381 161.961 645.161 154.839 645.161H103.226V670.968H77.4194V645.161H0V800H77.4194V774.194H103.226V800H245.161C294.955 800 335.484 759.471 335.484 709.677V573.768C335.6 573.664 335.729 573.587 335.845 573.471C352.155 582.31 369.329 589.419 387.161 594.735C387.806 636.877 422.219 670.968 464.516 670.968C506.813 670.968 541.226 636.877 541.871 594.735C559.703 589.432 576.877 582.31 593.187 573.471C608.168 587.974 627.548 595.329 646.981 595.329C666.813 595.329 686.632 587.781 701.729 572.697C731.91 542.503 731.91 493.394 701.729 463.213C671.523 433.032 622.426 433.058 592.245 463.213C568.142 487.329 563.626 523.394 578.039 552.361C565.187 559.097 551.768 564.671 537.897 569.019C527.613 538.335 498.632 516.129 464.516 516.129C430.4 516.129 401.419 538.335 391.135 569.032C377.265 564.684 363.845 559.11 350.994 552.374C364.594 525.019 361.045 491.548 340.323 467.561C342.568 465.69 345.342 464.516 348.387 464.516H464.516ZM51.6129 774.194H25.8065V670.968H51.6129V774.194ZM103.226 748.387H77.4194V696.774H103.226V748.387ZM610.49 481.458C620.555 471.406 633.781 466.374 646.994 466.374C660.194 466.374 673.419 471.406 683.484 481.458C703.6 501.587 703.6 534.336 683.484 554.452C663.342 574.555 630.619 574.581 610.49 554.452C590.387 534.336 590.387 501.587 610.49 481.458ZM464.516 541.935C492.981 541.935 516.129 565.084 516.129 593.548C516.129 622.013 492.981 645.161 464.516 645.161C436.052 645.161 412.903 622.013 412.903 593.548C412.903 565.084 436.052 541.935 464.516 541.935ZM464.516 438.71C407.6 438.71 361.29 392.4 361.29 335.484C361.29 278.568 407.6 232.258 464.516 232.258C521.432 232.258 567.742 278.568 567.742 335.484C567.742 392.4 521.432 438.71 464.516 438.71ZM722.581 283.871C751.045 283.871 774.194 307.019 774.194 335.484C774.194 363.948 751.045 387.097 722.581 387.097C694.116 387.097 670.968 363.948 670.968 335.484C670.968 307.019 694.116 283.871 722.581 283.871ZM610.503 116.503C620.555 106.452 633.768 101.419 647.006 101.419C660.206 101.419 673.432 106.452 683.497 116.503C703.613 136.632 703.613 169.381 683.497 189.497C663.355 209.6 630.632 209.626 610.503 189.497C590.387 169.368 590.387 136.619 610.503 116.503ZM464.516 25.8065C492.981 25.8065 516.129 48.9548 516.129 77.4194C516.129 105.884 492.981 129.032 464.516 129.032C436.052 129.032 412.903 105.884 412.903 77.4194C412.903 48.9548 436.052 25.8065 464.516 25.8065ZM350.981 118.594C363.832 111.858 377.252 106.284 391.123 101.935C401.419 132.632 430.4 154.839 464.516 154.839C498.632 154.839 527.613 132.632 537.897 101.935C551.768 106.284 565.187 111.858 578.039 118.594C563.626 147.574 568.142 183.626 592.245 207.742C607.342 222.826 627.161 230.374 646.981 230.374C658.839 230.374 670.555 227.342 681.394 221.948C688.129 234.8 693.703 248.219 698.052 262.103C671.316 271.058 651.097 294.206 646.31 322.581H592.877C586.374 257.471 531.29 206.452 464.503 206.452H337.832C360.903 182.348 365.148 147.084 350.981 118.594ZM245.535 116.503C265.665 96.3871 298.387 96.3871 318.529 116.503C338.645 136.632 338.645 169.381 318.529 189.497C298.4 209.6 265.677 209.626 245.535 189.497C225.432 169.381 225.432 136.632 245.535 116.503ZM154.839 335.484C154.839 307.019 177.987 283.871 206.452 283.871C234.916 283.871 258.065 307.019 258.065 335.484C258.065 363.948 234.916 387.097 206.452 387.097C177.987 387.097 154.839 363.948 154.839 335.484ZM309.69 709.677H309.677C309.677 745.252 280.735 774.194 245.161 774.194H129.032V670.968H154.839C176.181 670.968 193.548 653.6 193.548 632.258V411.742C197.368 412.387 201.277 412.787 205.265 412.852C210.568 430.684 217.69 447.858 226.529 464.168C197.226 494.426 197.406 542.813 227.303 572.71C242.4 587.794 262.219 595.342 282.039 595.342C291.432 595.342 300.8 593.51 309.69 590.129V709.677ZM318.542 554.465C298.439 574.568 265.69 574.594 245.548 554.465C225.432 534.336 225.432 501.587 245.548 481.471C265.677 461.368 298.4 461.342 318.542 481.471C338.645 501.587 338.645 534.336 318.542 554.465ZM320.284 451.032C297.845 438.245 270.594 437.6 247.639 449.019C240.903 436.168 235.329 422.748 230.981 408.865C261.665 398.581 283.871 369.6 283.871 335.484C283.871 301.742 262.129 273.045 231.948 262.465C253.123 243.161 280.426 232.258 309.677 232.258H387.432C355.974 255.806 335.484 293.252 335.484 335.484C335.484 377.716 355.974 415.161 387.432 438.71H348.387C337.458 438.71 327.419 443.368 320.284 451.032Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                                <path
                                    d="M451.613 296.774H477.419C484.542 296.774 490.323 302.555 490.323 309.677H516.129C516.129 288.335 498.761 270.968 477.419 270.968V245.161H451.613V270.968C430.271 270.968 412.903 288.335 412.903 309.677C412.903 331.019 430.271 348.387 451.613 348.387H477.419C484.542 348.387 490.323 354.168 490.323 361.29C490.323 368.413 484.542 374.194 477.419 374.194H451.613C444.49 374.194 438.71 368.413 438.71 361.29H412.903C412.903 382.632 430.271 400 451.613 400V425.806H477.419V400C498.761 400 516.129 382.632 516.129 361.29C516.129 339.948 498.761 322.581 477.419 322.581H451.613C444.49 322.581 438.71 316.8 438.71 309.677C438.71 302.555 444.49 296.774 451.613 296.774Z"
                                    fill="black"
                                    fill-opacity="0.06"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_101_234">
                                    <rect
                                        width="800"
                                        height="800"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className=" w-screen mt-12 py-12 flex gap-5 items-center flex-col h-fit sm:h-[120vh] 2xl:h-[80vh]   bg-black/10">
                            <h1 className="font-black text-3xl">
                                Our services
                            </h1>
                            <h2 className="text-center text-[14px]">
                                We aim to integrate AI to provide personalized,
                                AI-powered tutoring and learning experiences
                           <br/>
                                tailored to each student&apos;s unique needs and
                                progress.
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
                                <Card2
                                    title={"Personalized Subject Tutoring"}
                                    image={"/service1.jpeg"}
                                    desc={
                                        "Tailored one-on-one sessions in core subjects such as math, science, English, and social studies, focusing on the student's specific needs and learning pace."
                                    }
                                />
                                <Card2
                                    title={"STEM Enrichment Programs"}
                                    image={"/service2.jpeg"}
                                    desc={
                                        "Specialized tutoring in science, technology, engineering, and math for students interested in deepening their knowledge or exploring STEM fields."
                                    }
                                />
                                <Card2
                                    title={"Special Education Support"}
                                    image={"/service3.jpeg"}
                                    desc={
                                        "Customized sessions for students with learning disabilities or special needs, providing them with the tools and support to thrive academically."
                                    }
                                />
                                <Card2
                                    title={"Test and Exam Preparation"}
                                    image={"/service4.jpeg"}
                                    desc={
                                        "Focused tutoring to prepare students for standardized tests, school exams, and quizzes, including practice tests and study strategies."
                                    }
                                />
                                <Card2
                                    title={"Reading and Literacy Support"}
                                    image={"/service5.jpeg"}
                                    desc={
                                        "Personalized reading programs to improve comprehension, vocabulary, and fluency, particularly for early learners or those struggling with literacy."
                                    }
                                />
                                <Card2
                                    title={"Study Skills Coaching"}
                                    image={"/service6.jpeg"}
                                    desc={
                                        "CSessions aimed at improving time management, organization, and study techniques to enhance overall academic performance."
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col sm:flex-row  mt-4 h-[100vh] w-screen">
                    <div className="absolute left-0 top-0 w-full">
                        <svg
                            className="sm:w-[250px] sm:h-[250px] w-[248px] h-[248px] absolute -top-[50vh]"
                            viewBox="0 0 496 496"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_101_211)">
                                <path
                                    d="M482.344 264.968C491.024 256.288 496 244.272 496 232C496 219.728 491.024 207.712 482.344 199.032L416 132.688L340.688 208L372.688 240L240 372.688L208 340.688L132.688 416L199.032 482.344C207.712 491.024 219.728 496 232 496C244.272 496 256.288 491.024 264.968 482.344L283.424 463.888C306.824 484.576 336.504 496 368 496C438.576 496 496 438.576 496 368C496 336.496 484.576 306.808 463.888 283.424L482.344 264.968ZM363.312 208L416 155.312L428.688 168L376 220.688L363.312 208ZM155.312 416L208 363.312L220.688 376L168 428.688L155.312 416ZM271.832 452.848L253.656 471.032C247.952 476.736 240.064 480 232 480C223.936 480 216.048 476.736 210.344 471.032L179.312 440L232 387.312L240 395.312L395.312 240L387.312 232L440 179.312L471.032 210.344C476.736 216.048 480 223.936 480 232C480 240.064 476.736 247.952 471.032 253.656L452.856 271.832L271.832 452.848ZM480 368C480 429.76 429.76 480 368 480C340.768 480 315.016 470.344 294.656 452.656L452.656 294.656C470.344 315.008 480 340.76 480 368Z"
                                    fill="black"
                                    fill-opacity="0.1"
                                />
                                <path
                                    d="M208 336V306.208C218.232 303.248 228.096 299.16 237.44 294L258.512 315.08L315.08 258.512L294 237.44C299.168 228.096 303.248 218.24 306.208 208H336V128H306.208C303.248 117.768 299.16 107.904 294 98.56L315.08 77.488L258.512 20.92L237.44 42C228.096 36.832 218.24 32.752 208 29.792V0H128V29.792C117.768 32.752 107.904 36.84 98.56 42L77.488 20.92L20.92 77.488L42 98.56C36.832 107.904 32.752 117.76 29.792 128H0V208H29.792C32.752 218.232 36.84 228.096 42 237.44L20.92 258.512L77.488 315.08L98.56 294C107.904 299.168 117.76 303.248 128 306.208V336H208ZM101.432 277.168L96.056 273.888L77.496 292.456L43.552 258.512L62.12 239.952L58.84 234.576C51.92 223.248 46.832 210.984 43.72 198.128L42.24 192H16V144H42.24L43.72 137.872C46.832 125.024 51.912 112.752 58.84 101.424L62.12 96.048L43.552 77.488L77.496 43.544L96.056 62.112L101.432 58.832C112.76 51.912 125.024 46.824 137.88 43.712L144 42.24V16H192V42.24L198.128 43.72C210.976 46.832 223.248 51.912 234.576 58.84L239.952 62.12L258.512 43.552L292.456 77.496L273.888 96.056L277.168 101.432C284.088 112.76 289.176 125.024 292.288 137.88L293.76 144H320V192H293.76L292.28 198.128C289.168 210.976 284.088 223.248 277.16 234.576L273.88 239.952L292.448 258.512L258.504 292.456L239.944 273.888L234.568 277.168C223.24 284.088 210.976 289.176 198.12 292.288L192 293.76V320H144V293.76L137.872 292.28C125.024 289.168 112.76 284.088 101.432 277.168Z"
                                    fill="black"
                                    fill-opacity="0.1"
                                />
                                <path
                                    d="M256 168C256 119.48 216.52 80 168 80C119.48 80 80 119.48 80 168C80 216.52 119.48 256 168 256C216.52 256 256 216.52 256 168ZM96 168C96 128.296 128.296 96 168 96C207.704 96 240 128.296 240 168C240 207.704 207.704 240 168 240C128.296 240 96 207.704 96 168Z"
                                    fill="black"
                                    fill-opacity="0.1"
                                />
                                <path
                                    d="M242.341 349.657L253.654 338.344L237.657 322.346L226.343 333.66L242.341 349.657Z"
                                    fill="black"
                                    fill-opacity="0.1"
                                />
                                <path
                                    d="M322.34 237.661L338.338 253.658L349.651 242.345L333.654 226.347L322.34 237.661Z"
                                    fill="black"
                                    fill-opacity="0.1"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_101_211">
                                    <rect
                                        width="496"
                                        height="496"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <svg
                            className="md:w-[512px] w-[256px] h-[256px] sm:h-[512px] absolute right-10 sm:top-[0] top-[50vh]"
                            viewBox="0 0 512 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M256 398.8C244.2 403.9 232.6 408.5 221.1 412.3C237.8 446.1 252.1 448 256 448C259.9 448 274.1 446.1 290.9 412.3C279.5 408.4 267.8 403.9 256 398.8ZM446 256C479 301.2 490.3 346.9 469.6 384C449.4 420.3 407.1 433.3 354.4 427.2C332.4 479.3 298.8 512 256 512C213.2 512 179.6 479.3 157.6 427.2C104.9 433.3 62.6 420.4 42.4 384C21.7 346.9 33 301.2 66 256C33 210.8 21.7 165.1 42.4 128C62.6 91.7 104.9 78.7 157.6 84.8C179.6 32.7 213.2 0 256 0C298.8 0 332.4 32.7 354.4 84.8C407.1 78.7 449.4 91.6 469.6 128C490.3 165.1 479 210.8 446 256ZM380.2 323.4C378.5 337.6 376.3 351.4 373.5 364.6C405.3 366 412.1 355.9 413.7 352.9C416 348.7 420.7 335 401.8 304.8C395 311.1 387.8 317.3 380.2 323.4ZM373.5 147.5C376.3 160.6 378.5 174.4 380.2 188.7C387.8 194.8 395 201 401.8 207.3C420.7 177.1 416 163.3 413.7 159.2C412.1 156.3 405.3 146.2 373.5 147.5ZM290.9 99.7C274.1 65.9 259.9 64 256 64C252.1 64 237.9 65.9 221.1 99.7C232.5 103.6 244.2 108.1 256 113.2C267.8 108.1 279.4 103.5 290.9 99.7ZM131.9 188.6C133.6 174.3 135.8 160.6 138.6 147.4C106.8 146 100 156.1 98.4 159.1C96.1 163.3 91.4 177 110.3 207.2C117.1 200.9 124.3 194.7 131.9 188.6ZM110.2 304.8C91.4 335 96 348.7 98.3 352.9C99.9 355.8 106.7 365.9 138.5 364.6C135.7 351.5 133.5 337.7 131.8 323.4C124.2 317.3 117 311.1 110.2 304.8ZM336 256C336 234.783 327.571 214.434 312.569 199.431C297.566 184.429 277.217 176 256 176C234.783 176 214.434 184.429 199.431 199.431C184.429 214.434 176 234.783 176 256C176 277.217 184.429 297.566 199.431 312.569C214.434 327.571 234.783 336 256 336C277.217 336 297.566 327.571 312.569 312.569C327.571 297.566 336 277.217 336 256ZM256 224C264.487 224 272.626 227.371 278.627 233.373C284.629 239.374 288 247.513 288 256C288 264.487 284.629 272.626 278.627 278.627C272.626 284.629 264.487 288 256 288C247.513 288 239.374 284.629 233.373 278.627C227.371 272.626 224 264.487 224 256C224 247.513 227.371 239.374 233.373 233.373C239.374 227.371 247.513 224 256 224Z"
                                fill="black"
                                fill-opacity="0.08"
                            />
                        </svg>
                    </div>

                    <div className="relative w-full h-full ">
                        <div className="sm:w-2/3 w-full h-3/4 absolute left-0 bg-black/10" />
                        <Image alt="image"
                            src="/register_teacher.jpeg"
                            width={200}
                            height={200}
                            quality={75}
                            className="border-[14px] top-[20vh] sm:top-[15vh] w-2/3 h-1/2 object-cover left-[15vw] sm:left-[35vh] absolute  border-white"
                        />
                    </div>
                    <div className=" sm:px-20 px-2 sm:w-3/4  w-full space-y-6 sm:py-[15vh]">
                        <h1 className="text-3xl font-black ">
                            Here&apos;s more on what you need to know about Us!
                        </h1>
                        <h2 className="text-[12px]">
                            At Gala Education, we offer personalized one-on-one
                            tutoring in subjects like math, science, English,
                            social studies, foreign languages, and more, with
                            flexible scheduling tailored to your child&apos;s
                            learning needs. Our experienced and qualified tutors
                            provide targeted help with homework, test
                            preparation, and standardized exams, as well as
                            support for students with special needs. We ensure
                            each student receives focused attention to build
                            academic confidence and succeed in their studies.
                            All you need is a device and a stable internet
                            connection to access our tutoring sessions online
                        </h2>
                        <button className="px-2 py-1 border-[1px] rounded font-bold border-[#030DFE]">
                            Request information
                        </button>
                    </div>
                </div>
                <div className="relative flex flex-col sm:flex-row  mt-4 sm:h-[80vh] h-fit w-screen ">
                    <div className="absolute left-0 -top-[200px] w-full">
                        <svg
                            className="sm:w-[250px] sm:h-[250px] w-[150px] h-[150px]  !-z-10"
                            viewBox="0 0 300 300"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M234 72H170.7C169.5 63.6 163.5 57 155.4 54.6C160.5 48.6 168.3 45 176.4 45H226.5C235.5 45 243 37.5 243 28.5C243 19.5 235.5 12 226.5 12H150H73.5C64.5 12 57 19.5 57 28.5C57 37.5 64.5 45 73.5 45H123.6C131.7 45 139.5 48.6 144.6 54.6C136.5 56.7 130.5 63.6 129.3 72H66C60.9 72 57 75.9 57 81V279C57 284.1 60.9 288 66 288H234C239.1 288 243 284.1 243 279V81C243 75.9 239.1 72 234 72ZM164.7 72H158.4C157.5 69.6 155.4 67.5 153 66.6V60.3C159 61.5 163.5 66 164.7 72ZM123.6 39H73.5C67.8 39 63 34.2 63 28.5C63 22.8 67.8 18 73.5 18H150H226.5C232.2 18 237 22.8 237 28.5C237 34.2 232.2 39 226.5 39H176.4C166.2 39 156.3 43.8 150 51.9C143.7 43.8 133.8 39 123.6 39ZM147 60.3V66.6C144.6 67.5 142.5 69.6 141.6 72H135.3C136.5 66 141 61.5 147 60.3ZM237 279C237 280.8 235.8 282 234 282H66C64.2 282 63 280.8 63 279V81C63 79.2 64.2 78 66 78H234C235.8 78 237 79.2 237 81V279Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M228 84H72C70.2 84 69 85.2 69 87V273C69 274.8 70.2 276 72 276H228C229.8 276 231 274.8 231 273V87C231 85.2 229.8 84 228 84ZM225 270H75V90H225V270Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M111 195H189C194.1 195 198 191.1 198 186V108C198 102.9 194.1 99 189 99H111C105.9 99 102 102.9 102 108V186C102 191.1 105.9 195 111 195ZM150 153C140.1 153 132 144.9 132 135C132 125.1 140.1 117 150 117C159.9 117 168 125.1 168 135C168 144.9 159.9 153 150 153ZM150 159C153.3 159 156.3 158.4 159 157.2C174 161.1 184.5 173.7 185.7 189H114C115.2 173.7 126 161.1 140.7 157.2C143.7 158.4 146.7 159 150 159ZM108 108C108 106.2 109.2 105 111 105H189C190.8 105 192 106.2 192 108V186C192 186.6 192 186.9 191.7 187.2C189.9 171.9 180 158.7 165.6 153C170.7 148.5 174 142.2 174 135C174 121.8 163.2 111 150 111C136.8 111 126 121.8 126 135C126 142.2 129.3 148.8 134.4 153C120 158.7 110.1 171.9 108.3 187.2C108 186.9 108 186.6 108 186V108Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M90 216H210C211.8 216 213 214.8 213 213C213 211.2 211.8 210 210 210H90C88.2 210 87 211.2 87 213C87 214.8 88.2 216 90 216Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M90 231H210C211.8 231 213 229.8 213 228C213 226.2 211.8 225 210 225H90C88.2 225 87 226.2 87 228C87 229.8 88.2 231 90 231Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M90 246H210C211.8 246 213 244.8 213 243C213 241.2 211.8 240 210 240H90C88.2 240 87 241.2 87 243C87 244.8 88.2 246 90 246Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M90 261H210C211.8 261 213 259.8 213 258C213 256.2 211.8 255 210 255H90C88.2 255 87 256.2 87 258C87 259.8 88.2 261 90 261Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>
                    </div>

                    <div className="w-full flex py-8 bg-black/10 space-y-8  sm:h-[70vh] 2xl:h-[50vh] h-fit flex-col items-center">
                        <h1 className="text-3xl text-center font-black ">
                            Pioneers in Digital Teaching
                        </h1>
                        <h1 className="text-center text-[14px]">
                        &ldquo;Our platform offers personalized, AI-driven
                            learning while teaching students healthy <br />{" "}
                            digital habits for balanced, responsible technology
                            use.&ldquo;
                        </h1>
                        <div className="flex items-center justify-around flex-col gap-y-10 sm:gap-x-4  sm:flex-row ">
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
                                        <g clip-path="url(#clip0_74_221)">
                                            <path
                                                d="M37.1365 16.3685C37.5837 15.0216 37.7384 13.5948 37.5902 12.1834C37.442 10.7719 36.9943 9.40837 36.277 8.18379C35.2136 6.33283 33.5899 4.86738 31.64 3.99872C29.69 3.13006 27.5146 2.90306 25.4273 3.35046C24.2415 2.0314 22.7295 1.04758 21.0431 0.497812C19.3567 -0.0519528 17.5554 -0.148308 15.82 0.218423C14.0846 0.585155 12.4762 1.40206 11.1564 2.5871C9.83666 3.77213 8.85193 5.28358 8.30116 6.96963C6.9106 7.25477 5.59692 7.83344 4.44792 8.66695C3.29891 9.50046 2.34104 10.5696 1.63832 11.803C0.563382 13.6508 0.103959 15.7927 0.326476 17.9189C0.548992 20.045 1.44192 22.0454 2.87616 23.6306C2.42727 24.9768 2.27103 26.4034 2.41791 27.8149C2.56478 29.2263 3.01138 30.5902 3.72782 31.8151C4.79256 33.6668 6.41769 35.1325 8.36901 36.0012C10.3203 36.8699 12.4971 37.0966 14.5855 36.6486C15.5276 37.7095 16.6852 38.5573 17.981 39.1352C19.2768 39.7131 20.681 40.0079 22.0998 40C24.2392 40.0019 26.3239 39.324 28.0529 38.0641C29.782 36.8042 31.0659 35.0274 31.7195 32.9903C33.1099 32.7046 34.4234 32.1258 35.5723 31.2923C36.7213 30.4588 37.6792 29.3898 38.3823 28.1568C39.4446 26.3116 39.8961 24.1778 39.6723 22.0605C39.4486 19.9433 38.561 17.9508 37.1365 16.3685ZM22.0998 37.382C20.3477 37.3847 18.6505 36.7706 17.3058 35.6473L17.5423 35.5133L25.5062 30.9163C25.7044 30.8 25.8689 30.6342 25.9837 30.4352C26.0984 30.2361 26.1594 30.0106 26.1607 29.7808V18.5526L29.5273 20.5003C29.544 20.5087 29.5584 20.521 29.5694 20.536C29.5804 20.5511 29.5877 20.5685 29.5907 20.587V29.8913C29.5864 31.8767 28.7959 33.7795 27.392 35.1834C25.9881 36.5872 24.0852 37.3778 22.0998 37.382ZM5.99866 30.5063C5.11995 28.989 4.80444 27.2104 5.10766 25.4835L5.34432 25.6255L13.316 30.2225C13.5132 30.3382 13.7378 30.3992 13.9665 30.3992C14.1952 30.3992 14.4197 30.3382 14.617 30.2225L24.355 24.6083V28.4956C24.3541 28.5158 24.3486 28.5355 24.339 28.5532C24.3295 28.5709 24.316 28.5863 24.2997 28.5981L16.2333 33.2503C14.5119 34.242 12.4672 34.51 10.5483 33.9955C8.62944 33.4811 6.99313 32.2261 5.99866 30.5063ZM3.90132 13.1593C4.78613 11.6322 6.18271 10.4675 7.84382 9.87129V19.3333C7.84083 19.5619 7.89923 19.7871 8.01295 19.9854C8.12667 20.1837 8.29153 20.3479 8.49032 20.4608L18.181 26.0513L14.8142 27.9988C14.7959 28.0085 14.7756 28.0135 14.755 28.0135C14.7344 28.0135 14.714 28.0085 14.6958 27.9988L6.64532 23.3546C4.92709 22.3586 3.67357 20.7224 3.15927 18.8041C2.64496 16.8858 2.91179 14.8419 3.90132 13.12V13.1593ZM31.5618 19.5856L21.8397 13.94L25.1987 12C25.2169 11.9903 25.2372 11.9852 25.2578 11.9852C25.2785 11.9852 25.2988 11.9903 25.317 12L33.3675 16.6521C34.5984 17.3624 35.6019 18.4081 36.2608 19.6673C36.9196 20.9265 37.2067 22.3471 37.0885 23.7633C36.9703 25.1795 36.4516 26.5329 35.5931 27.6654C34.7346 28.7979 33.5716 29.6628 32.24 30.1591V20.6971C32.233 20.4689 32.1668 20.2464 32.0479 20.0516C31.929 19.8567 31.7616 19.6962 31.5618 19.5856ZM34.913 14.5471L34.6763 14.4051L26.7205 9.76879C26.522 9.65233 26.2961 9.59093 26.066 9.59093C25.8359 9.59093 25.6099 9.65233 25.4115 9.76879L15.6817 15.3828V11.4956C15.6796 11.4759 15.6829 11.4559 15.6912 11.4379C15.6996 11.4198 15.7126 11.4044 15.729 11.3931L23.7795 6.74879C25.0133 6.03799 26.4241 5.69319 27.8467 5.75472C29.2693 5.81625 30.645 6.28158 31.8129 7.09626C32.9808 7.91095 33.8925 9.04132 34.4415 10.3552C34.9906 11.669 35.1541 13.112 34.9132 14.5155L34.913 14.5471ZM13.8442 21.4383L10.4775 19.4986C10.4606 19.4885 10.4462 19.4748 10.4353 19.4584C10.4244 19.4421 10.4171 19.4236 10.4142 19.4041V10.1236C10.416 8.69991 10.8231 7.30615 11.5879 6.10529C12.3527 4.90443 13.4435 3.9461 14.7329 3.34236C16.0223 2.73861 17.4568 2.51439 18.8689 2.69592C20.281 2.87745 21.6123 3.45723 22.707 4.36746L22.4703 4.50163L14.5067 9.09829C14.3084 9.21454 14.1439 9.38035 14.0291 9.57943C13.9144 9.77851 13.8534 10.004 13.8522 10.2338L13.8442 21.4383ZM15.6735 17.496L20.0102 14.9963L24.355 17.496V22.495L20.026 24.9945L15.6815 22.495L15.6735 17.496Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_74_221">
                                                <rect
                                                    width="40"
                                                    height="40"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                                title={"AI Support"}
                                desc={
                                    "We aim to integrate OpenAI to provide personalized, AI-powered tutoring and learning experiences tailored to each student's unique needs and progress."
                                }
                            />
                            <PioneerCard
                                icon={
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_79_246)">
                                            <path
                                                d="M19.9999 40C18.2737 40 16.8694 38.5956 16.8694 36.8693C16.8694 35.1429 18.2737 33.7385 19.9999 33.7385C21.7262 33.7385 23.1307 35.1429 23.1307 36.8693C23.1307 38.5956 21.7262 40 19.9999 40ZM19.9999 35.4416C19.2128 35.4416 18.5725 36.0821 18.5725 36.8693C18.5725 37.6565 19.2128 38.2968 19.9999 38.2968C20.787 38.2968 21.4275 37.6564 21.4275 36.8693C21.4275 36.0821 20.787 35.4416 19.9999 35.4416ZM26.0636 36.4755C25.7222 36.4755 25.4001 36.2689 25.2694 35.9316C25.0994 35.493 25.3172 34.9998 25.7556 34.8298C30.027 33.1741 33.3911 29.7616 34.9852 25.467C35.1488 25.0261 35.639 24.8014 36.0799 24.965C36.5208 25.1287 36.7455 25.6188 36.5819 26.0597C34.8183 30.8108 31.0966 34.5862 26.3711 36.4177C26.27 36.4569 26.1659 36.4755 26.0636 36.4755ZM13.9095 36.4755C13.8072 36.4755 13.7031 36.457 13.602 36.4177C8.87651 34.5862 5.15481 30.8108 3.3911 26.0597C3.22738 25.6187 3.4522 25.1288 3.8931 24.965C4.33422 24.8013 4.82408 25.026 4.9878 25.467C6.58205 29.7616 9.94608 33.1741 14.2175 34.8298C14.656 34.9998 14.8737 35.4929 14.7037 35.9316C14.573 36.2689 14.2508 36.4755 13.9095 36.4755ZM20.9263 32.5388H19.0738C16.3998 32.5388 15.2217 30.398 14.5679 28.7875L14.3255 28.1902C14.1487 27.7543 14.3587 27.2577 14.7945 27.0809C15.2304 26.904 15.7269 27.1141 15.9037 27.5498L16.146 28.1472C16.5121 29.0493 16.8947 29.699 17.3339 30.1336L19.312 27.4228C19.4723 27.2032 19.7279 27.0732 19.9999 27.0732C20.2718 27.0732 20.5274 27.2031 20.6877 27.4228L22.666 30.1335C23.1052 29.6989 23.4877 29.0491 23.8539 28.1469L24.0963 27.5497C24.2731 27.1138 24.7697 26.9042 25.2055 27.0809C25.6413 27.2578 25.8512 27.7544 25.6743 28.1903L25.4319 28.7875C24.7785 30.3978 23.6003 32.5388 20.9263 32.5388ZM18.9323 30.8325C18.9789 30.8346 19.026 30.8356 19.0738 30.8356H20.9262C20.9741 30.8356 21.0211 30.8345 21.0678 30.8325L20.0001 29.3694L18.9323 30.8325ZM12.1297 25.7372C12.0231 25.7372 11.9147 25.7171 11.8099 25.6745L11.2126 25.4321C9.60216 24.7783 7.46119 23.6002 7.46119 20.9262V19.074C7.46119 16.4 9.60216 15.2218 11.2125 14.5681L11.8099 14.3256C12.2454 14.1488 12.7422 14.3587 12.9191 14.7944C13.0961 15.2303 12.8861 15.7269 12.4503 15.9038L11.8531 16.1462C10.9509 16.5122 10.3012 16.8947 9.86657 17.3339L12.5774 19.3122C12.7972 19.4725 12.927 19.7281 12.927 20.0001C12.927 20.272 12.7972 20.5276 12.5774 20.6879L9.86657 22.6661C10.3011 23.1053 10.9509 23.4879 11.8531 23.854L12.4503 24.0963C12.8861 24.2732 13.0961 24.7698 12.9191 25.2057C12.7848 25.5366 12.4661 25.7372 12.1297 25.7372ZM9.16753 18.9321C9.1654 18.9787 9.16434 19.0259 9.16434 19.0736V20.9261C9.16434 20.9739 9.1654 21.0212 9.16753 21.0677L10.6309 19.9999L9.16753 18.9321ZM27.8702 25.7372C27.5337 25.7372 27.2151 25.5366 27.0808 25.2056C26.904 24.7698 27.1139 24.2731 27.5497 24.0963L28.1471 23.854C29.0492 23.4878 29.699 23.1053 30.1335 22.6661L27.4226 20.6879C27.2029 20.5276 27.073 20.272 27.073 20.0001C27.073 19.7281 27.2029 19.4725 27.4226 19.3122L30.1334 17.3339C29.6989 16.8948 29.049 16.5122 28.147 16.1462L27.5497 15.9038C27.1139 15.727 26.904 15.2303 27.0808 14.7945C27.2576 14.3587 27.7544 14.149 28.1901 14.3256L28.7875 14.568C30.3979 15.2218 32.5389 16.3999 32.5389 19.0738V20.9262C32.5389 23.6002 30.398 24.7783 28.7876 25.432L28.1901 25.6745C28.0852 25.7171 27.9769 25.7372 27.8702 25.7372ZM29.3693 20.0001L30.8325 21.0678C30.8346 21.0212 30.8357 20.974 30.8357 20.9262V19.074C30.8357 19.0262 30.8346 18.9788 30.8325 18.9322L29.3693 20.0001ZM36.8692 23.1308C35.143 23.1308 33.7385 21.7264 33.7385 20.0002C33.7385 18.2738 35.143 16.8693 36.8692 16.8693C38.5956 16.8693 40 18.2738 40 20.0002C40 21.7263 38.5956 23.1308 36.8692 23.1308ZM36.8692 18.5725C36.082 18.5725 35.4417 19.213 35.4417 20.0002C35.4417 20.7873 36.082 21.4276 36.8692 21.4276C37.6564 21.4276 38.2969 20.7872 38.2969 20.0002C38.2969 19.2129 37.6564 18.5725 36.8692 18.5725ZM3.13073 23.1308C1.40448 23.1308 0.000133514 21.7264 0.000133514 20.0002C0.000133514 18.2738 1.40448 16.8693 3.13073 16.8693C4.85698 16.8693 6.26143 18.2738 6.26143 20.0002C6.26143 21.7263 4.85698 23.1308 3.13073 23.1308ZM3.13073 18.5725C2.34356 18.5725 1.70328 19.213 1.70328 20.0002C1.70328 20.7873 2.34366 21.4276 3.13073 21.4276C3.9179 21.4276 4.55829 20.7872 4.55829 20.0002C4.55829 19.2129 3.9179 18.5725 3.13073 18.5725ZM35.7837 14.9843C35.4378 14.9843 35.1126 14.7721 34.9852 14.4288C33.3911 10.1343 30.027 6.72179 25.7556 5.06612C25.3171 4.89612 25.0994 4.40295 25.2694 3.96429C25.4393 3.52583 25.9327 3.30772 26.3712 3.47814C31.0967 5.30967 34.8183 9.08501 36.582 13.8362C36.7457 14.2772 36.5209 14.7672 36.08 14.9308C35.9822 14.967 35.882 14.9843 35.7837 14.9843ZM4.18934 14.9843C4.09088 14.9843 3.99082 14.9671 3.8931 14.9308C3.4522 14.7671 3.22749 14.2769 3.3911 13.8362C5.15481 9.08501 8.87651 5.30967 13.602 3.47814C14.0404 3.30826 14.5337 3.52583 14.7038 3.96429C14.8738 4.40285 14.656 4.89612 14.2176 5.06612C9.9463 6.72179 6.58216 10.1343 4.98791 14.4288C4.86038 14.7719 4.53508 14.9843 4.18934 14.9843ZM15.1144 12.9819C15.0078 12.9819 14.8994 12.9618 14.7946 12.9192C14.3588 12.7424 14.1488 12.2458 14.3256 11.8099L14.5679 11.2127C15.2217 9.60213 16.3999 7.46117 19.0738 7.46117H20.9262C23.6002 7.46117 24.7784 9.60213 25.4321 11.2126L25.6744 11.8098C25.8513 12.2457 25.6414 12.7423 25.2056 12.9192C24.7696 13.0958 24.2732 12.886 24.0964 12.4504L23.854 11.8532C23.4878 10.9509 23.1053 10.3012 22.6661 9.86654L20.6878 12.5773C20.5275 12.7969 20.2719 12.9269 20 12.9269C19.728 12.9269 19.4723 12.7969 19.3121 12.5773L17.334 9.86654C16.8948 10.3011 16.5122 10.951 16.1461 11.8532L15.9038 12.4503C15.7696 12.7812 15.4508 12.9819 15.1144 12.9819ZM18.9323 9.1674L20.0001 10.6306L21.0678 9.1674C21.0212 9.16527 20.9741 9.16431 20.9263 9.16431H19.0738C19.026 9.16431 18.9788 9.16538 18.9323 9.1674ZM19.9999 6.26141C18.2737 6.26141 16.8694 4.85706 16.8694 3.1307C16.8694 1.40435 18.2737 0 19.9999 0C21.7262 0 23.1307 1.40435 23.1307 3.1307C23.1307 4.85706 21.7262 6.26141 19.9999 6.26141ZM19.9999 1.70315C19.2128 1.70315 18.5725 2.34364 18.5725 3.1307C18.5725 3.91777 19.2128 4.55826 19.9999 4.55826C20.787 4.55826 21.4275 3.91777 21.4275 3.1307C21.4275 2.34364 20.787 1.70315 19.9999 1.70315Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_79_246">
                                                <rect
                                                    width="40"
                                                    height="40"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                                title={"Student Platform"}
                                desc={
                                    "We integrate student platforms that track progress in real-time, allowing us to personalize learning experiences based on individual student needs and performance."
                                }
                            />
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
                        </div>
                    </div>
                    </div>
                </div>
                <div className="relative">
                    

                    <div className="relative flex justify-center ">
                        <svg
                            className="sm:w-[350px] w-[150px]   sm:h-[350px] h-[150px] absolute -top-64 -z-[100] sm:-left-[5rem] left-0"
                            viewBox="0 0 500 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M80 45C77 45 75 47 75 50V85C75 88 77 90 80 90C83 90 85 88 85 85V50C85 47 83 45 80 45Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M80 100C77 100 75 102 75 105V110C75 113 77 115 80 115C83 115 85 113 85 110V105C85 102 83 100 80 100Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M420 90C423 90 425 88 425 85V50C425 47 423 45 420 45C417 45 415 47 415 50V85C415 88 417 90 420 90Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M420 115C423 115 425 113 425 110V105C425 102 423 100 420 100C417 100 415 102 415 105V110C415 113 417 115 420 115Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M420 360C406.5 360 394 364.5 384 372C384 372 384 371.5 383.5 371.5L365.5 353.5C390 326 405 289.5 405 250C405 248.5 405 247 405 245.5V245C405 244.5 405 244.5 405 244.5C403.5 207 389 173 365.5 147L383.5 129L384 128.5C394 136 406.5 140.5 420 140.5C453 140.5 480 113.5 480 80.5C480 47.5 453 20 420 20C387 20 360 47 360 80C360 96 366.5 110.5 376.5 121.5L358.5 139.5C330.5 112 292 95 250 95C222 95 196 102.5 173.5 115.5C173 115.5 172 116 171.5 116.5C160.5 123 150.5 130.5 141.5 139.5L123.5 121.5C134 110.5 140 96 140 80C140 47 113 20 80 20C47 20 20 47 20 80C20 113 47 140 80 140C93.5 140 106 135.5 116 128C116 128 116 128.5 116.5 128.5L134.5 146.5C111 172.5 96.5 206.5 95 244V244.5V245C95 246.5 95 248 95 249.5C95 289 110 325.5 134.5 353L116.5 371L116 371.5C106 364 93.5 359.5 80 359.5C47 360 20 387 20 420C20 453 47 480 80 480C113 480 140 453 140 420C140 404 133.5 389.5 123.5 378.5L141.5 360.5C169.5 388 208 405 250 405C292 405 330.5 388 358.5 360.5L376.5 378.5C366.5 389.5 360 404 360 420C360 453 387 480 420 480C453 480 480 453 480 420C480 387 453 360 420 360ZM420 30C447.5 30 470 52.5 470 80C470 107.5 447.5 130 420 130C392.5 130 370 107.5 370 80C370 52.5 392.5 30 420 30ZM30 80C30 52.5 52.5 30 80 30C107.5 30 130 52.5 130 80C130 107.5 107.5 130 80 130C52.5 130 30 107.5 30 80ZM80 470C52.5 470 30 447.5 30 420C30 392.5 52.5 370 80 370C107.5 370 130 392.5 130 420C130 447.5 107.5 470 80 470ZM327.5 170C323.5 170 320 166.5 320 162.5V152.5C320 148.5 323.5 145 327.5 145H350C369.5 163.5 384 188 391 215H353C349 215 345.5 211.5 345.5 207.5V187.5C345 178 337 170 327.5 170ZM176.5 125H217.5C221.5 125 225 128.5 225 132.5C225 142 233 150 242.5 150H267.5C271.5 150 275 153.5 275 157.5V167.5C275 171.5 271.5 175 267.5 175H207.5C198 175 190 183 190 192.5V202.5C190 206.5 186.5 210 182.5 210H110.5C121 174 145 143.5 176.5 125ZM105 250H210C221 250 230 241 230 230V225C230 219.5 234.5 215 240 215H265C270.5 215 275 219.5 275 225V265C275 270.5 270.5 275 265 275C254 275 245 284 245 295V305C245 310.5 240.5 315 235 315H215C204 315 195 324 195 335V350C195 355.5 190.5 360 185 360H155.5C124.5 333.5 105 294 105 250ZM168.5 370H185C196 370 205 361 205 350V335C205 329.5 209.5 325 215 325H235C246 325 255 316 255 305V295C255 289.5 259.5 285 265 285C276 285 285 276 285 265V225C285 214 276 205 265 205H240C229 205 220 214 220 225V230C220 235.5 215.5 240 210 240H105.5C106 233 107 226.5 108.5 220H183C192.5 220 200.5 212 200.5 202.5V192.5C200.5 188.5 204 185 208 185H268C277.5 185 285.5 177 285.5 167.5V157.5C285.5 148 277.5 140 268 140H243C239 140 235.5 136.5 235.5 132.5C235.5 123 227.5 115 218 115H197.5C214 108.5 231.5 105 250.5 105C283.5 105 314 116 338.5 135H328C318.5 135 310.5 143 310.5 152.5V162.5C310.5 172 318.5 180 328 180C332 180 335.5 183.5 335.5 187.5V207.5C335.5 217 343.5 225 353 225H393.5C394.5 230 395 235 395.5 240H335C324 240 315 249 315 260V265C315 276 324 285 335 285C340.5 285 345 289.5 345 295V300C345 305.5 340.5 310 335 310H295C284 310 275 319 275 330V345C275 356 284 365 295 365H305C310.5 365 315 369.5 315 375V379.5C295.5 389.5 273.5 395 250 395C220 395 192 386 168.5 370ZM325 374C324.5 363.5 316 355 305 355H295C289.5 355 285 350.5 285 345V330C285 324.5 289.5 320 295 320H335C346 320 355 311 355 300V295C355 284 346 275 335 275C329.5 275 325 270.5 325 265V260C325 254.5 329.5 250 335 250H395C395 302.5 367 348.5 325 374ZM420 470C392.5 470 370 447.5 370 420C370 392.5 392.5 370 420 370C447.5 370 470 392.5 470 420C470 447.5 447.5 470 420 470Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M420 385C417 385 415 387 415 390V425C415 428 417 430 420 430C423 430 425 428 425 425V390C425 387 423 385 420 385Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M420 440C417 440 415 442 415 445V450C415 453 417 455 420 455C423 455 425 453 425 450V445C425 442 423 440 420 440Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M80 385C77 385 75 387 75 390V425C75 428 77 430 80 430C83 430 85 428 85 425V390C85 387 83 385 80 385Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                            <path
                                d="M80 440C77 440 75 442 75 445V450C75 453 77 455 80 455C83 455 85 453 85 450V445C85 442 83 440 80 440Z"
                                fill="black"
                                fill-opacity="0.1"
                            />
                        </svg>

                        <div className="self-center flex flex-col sm:flex-row px-6 rounded-md shadow-md shadow-black w-[70vw] 2xl:w-[50vw] bg-[#F3F2F2] my-10">
                            <div className="basis-2/3  py-2 flex flex-col gap-y-4">
                                <h1 className="font-bold ">Financial Aid</h1>
                                <p className="text-xs">
                                    At Gala Education, we understand that
                                    financial barriers can hinder access to
                                    quality education. To support students
                                    facing financial struggles, we offer a range
                                    of financial assistance options, including
                                    scholarships, flexible payment plans, and
                                    need-based grants. Our scholarship program
                                    is designed to recognize and support
                                    talented students who may not have the means
                                    to afford our courses. Additionally, we
                                    provide flexible payment plans that allow
                                    students to spread their tuition payments
                                    over time, making it easier to manage their
                                    finances. We are committed to ensuring that
                                    every student has the opportunity to pursue
                                    their educational goals, regardless of their
                                    financial situation.
                                </p>
                                <div className="border-[1px] sm:w-2/5 w-fit text-xs text-center font-bold p-1  border-[#030DFE] rounded">
                                    Apply for financial aid
                                </div>
                            </div>
                            <div className="basis-1/3 flex sm:gap-x-5  gap-x-3 justify-between sm:justify-normal py-4 items-center">
                                <svg
                                    className="w-[50px] sm:w-[70px] h-[50px] sm:h-[50px]"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_85_267)">
                                        <path
                                            d="M54.4581 70H44.6917C43.8072 70 43.09 69.2829 43.09 68.3983C43.09 67.5137 43.8072 66.7966 44.6917 66.7966H47.9733V63.7799H33.0739C32.1894 63.7799 31.4722 63.0627 31.4722 62.1782V41.4857C31.4722 40.6011 32.1894 39.884 33.0739 39.884H66.0757C66.9603 39.884 67.6775 40.6011 67.6775 41.4857V62.1782C67.6775 63.0627 66.9603 63.7799 66.0757 63.7799H51.1764V66.7966H54.4579C55.3425 66.7966 56.0597 67.5137 56.0597 68.3983C56.0597 69.2829 55.3427 70 54.4581 70ZM49.6003 60.5762H64.474V43.0872H34.6755V60.5762H49.5492C49.5662 60.5758 49.5834 60.5758 49.6003 60.5762ZM49.5746 58.3546C48.6901 58.3546 47.9729 57.6374 47.9729 56.7529V56.182C47.9729 55.2975 48.6901 54.5803 49.5746 54.5803C50.4592 54.5803 51.1764 55.2975 51.1764 56.182V56.7529C51.1764 57.6374 50.4592 58.3546 49.5746 58.3546ZM26.4077 57.4504H3.92407C3.03951 57.4504 2.32233 56.7332 2.32233 55.8487C2.32233 54.9641 3.03951 54.2469 3.92407 54.2469H26.4077C27.2922 54.2469 28.0094 54.9641 28.0094 55.8487C28.0094 56.7332 27.2924 57.4504 26.4077 57.4504ZM53.8353 55.8943C53.5634 55.8943 53.2879 55.8251 53.0354 55.6793L52.5411 55.3936C51.775 54.9511 51.5129 53.9712 51.9556 53.2054C52.3981 52.4394 53.3778 52.1771 54.1438 52.6198L54.6381 52.9055C55.4042 53.348 55.6662 54.3278 55.2236 55.0937C54.9268 55.6074 54.3885 55.8943 53.8353 55.8943ZM45.3144 55.8941C44.7608 55.8941 44.2222 55.6068 43.9257 55.0929C43.4836 54.3268 43.7461 53.3472 44.5123 52.9049L45.0069 52.6194C45.7725 52.1771 46.7526 52.4398 47.1948 53.206C47.6369 53.972 47.3744 54.9517 46.6082 55.394L46.1137 55.6795C45.8614 55.8251 45.5861 55.8941 45.3144 55.8941ZM45.8059 51.2583C45.5344 51.2583 45.2593 51.1892 45.0071 51.0439L44.5125 50.7586C43.7463 50.3167 43.4834 49.337 43.9253 48.5708C44.3674 47.8044 45.3468 47.5415 46.1131 47.9835L46.6076 48.2689C47.3738 48.7107 47.6367 49.6904 47.1948 50.4566C46.8983 50.971 46.3597 51.2583 45.8059 51.2583ZM53.3437 51.2583C52.7901 51.2583 52.2517 50.971 51.955 50.4572C51.5127 49.6912 51.7752 48.7115 52.5412 48.2693L53.0356 47.9837C53.802 47.5415 54.7813 47.804 55.2238 48.57C55.666 49.336 55.4036 50.3157 54.6375 50.758L54.1432 51.0435C53.8909 51.189 53.6156 51.2583 53.3437 51.2583ZM6.82542 51.1149C6.625 51.1149 6.42098 51.0771 6.22376 50.997C5.40407 50.6645 5.00924 49.7302 5.3418 48.9106L10.4259 36.3801C12.003 32.4941 13.6698 29.7405 15.6712 27.7145C18.3303 25.0228 21.6177 23.6577 25.4416 23.6577H32.1854C38.2583 23.6577 42.8217 27.0264 46.1365 33.9563C46.5183 34.7544 46.1807 35.7108 45.3827 36.0924C44.5848 36.4745 43.6282 36.1369 43.2466 35.3386C41.2156 31.0928 38.8664 28.5506 35.8848 27.4713L30.1073 35.3883C29.8058 35.8013 29.3248 36.0458 28.8135 36.0458C28.3021 36.0458 27.8212 35.8013 27.5197 35.3883L21.741 27.4695C18.2949 28.7164 15.6886 31.9317 13.3943 37.5847L8.31043 50.1149C8.05775 50.7375 7.4581 51.1149 6.82542 51.1149ZM25.2636 26.8624L28.8135 31.7269L32.3633 26.8624C32.3043 26.8616 32.245 26.8612 32.1856 26.8612H25.4416C25.3822 26.8614 25.3227 26.8618 25.2636 26.8624ZM49.5746 49.0831C48.6901 49.0831 47.9729 48.366 47.9729 47.4814V46.9104C47.9729 46.0258 48.6901 45.3086 49.5746 45.3086C50.4592 45.3086 51.1764 46.0258 51.1764 46.9104V47.4814C51.1764 48.366 50.4592 49.0831 49.5746 49.0831ZM28.8133 19.7989C23.355 19.7989 18.9141 15.3579 18.9141 9.89959C18.9141 5.40191 21.9296 1.59498 26.0445 0.394073C26.0627 0.388267 26.0813 0.38246 26.0999 0.377255C26.6403 0.223287 27.1935 0.116171 27.7531 0.0563061C27.7559 0.0561059 27.7583 0.0559057 27.7611 0.0555053C28.0437 0.0256729 28.3296 0.00745311 28.6185 0.00184702C28.6219 0.00204724 28.6319 0.00144658 28.6393 0.00144658C28.6421 0.00124637 28.6457 0.00124637 28.6489 0.00124637C28.6527 0.00124637 28.6559 0.00104615 28.6593 0.00104615C28.6631 0.00104615 28.6667 0.000845932 28.6705 0.000845932C28.6737 0.00104615 28.6767 0.00104615 28.6795 0.000845932C28.6821 0.000645715 28.6846 0.000845932 28.687 0.000645714C28.6918 0.000645714 28.695 -0.000355373 28.7018 0.000445497C28.7046 0.000445497 28.7072 0.000645715 28.7102 0.000445497C28.7178 0.00024528 28.7254 0.00024528 28.7332 0.00024528H28.7336C28.7364 0.00024528 28.7392 0.000445497 28.742 4.50623e-05C28.7502 4.50623e-05 28.759 -0.000155155 28.7664 4.50623e-05C28.7696 4.50623e-05 28.7726 -0.000155155 28.7756 -0.000155155C28.7801 -0.000155155 28.7849 -0.000355373 28.7899 -0.000155155C28.7933 -0.000155155 28.7965 -0.000155155 28.7999 -0.000155155C28.8049 4.50623e-05 28.8081 4.50623e-05 28.8123 -0.000155155C28.8129 -0.000155155 28.8133 -0.000155155 28.8133 -0.000155155C28.8159 -0.000155155 28.8179 -0.000155155 28.8207 -0.000155155C28.8235 -0.000155155 28.8257 -0.000355373 28.8285 -0.000155155C28.8313 -0.000155155 28.8333 4.50623e-05 28.8363 -0.000155155C28.8387 -0.000155155 28.8415 -0.000155155 28.8441 -0.000155155C28.8465 -0.000355373 28.8495 -0.000155155 28.8523 -0.000155155C28.8549 -0.000355373 28.8583 4.50623e-05 28.8609 4.50623e-05H28.8617C33.9533 0.0242714 38.163 3.84882 38.6642 8.91533C38.6648 8.92013 38.6652 8.92534 38.6656 8.93034C38.6966 9.24909 38.7126 9.57224 38.7126 9.89919C38.7126 15.3579 34.2718 19.7989 28.8133 19.7989ZM25.3756 4.15536C23.4254 5.32703 22.1178 7.46335 22.1178 9.89939C22.1178 13.5914 25.1215 16.5953 28.8135 16.5953C32.1409 16.5953 34.9093 14.1556 35.4237 10.971C35.2146 10.984 35.005 10.9908 34.7948 10.9908C30.407 10.991 26.6662 8.16811 25.3756 4.15536ZM28.4393 3.21393C29.3262 5.90165 31.8442 7.7875 34.7946 7.7875C34.9181 7.7875 35.0415 7.7841 35.1644 7.77749C34.2804 5.13863 31.7947 3.22735 28.8678 3.20372C28.8645 3.20372 28.8613 3.20372 28.8583 3.20372C28.8551 3.20372 28.8517 3.20372 28.8487 3.20372C28.8455 3.20352 28.8423 3.20372 28.8391 3.20352C28.8359 3.20352 28.8319 3.20352 28.8291 3.20352C28.8247 3.20372 28.8209 3.20372 28.8165 3.20352C28.8119 3.20352 28.8077 3.20352 28.8029 3.20352C28.8025 3.20352 28.8021 3.20352 28.8017 3.20352C28.6803 3.20372 28.5594 3.20733 28.4393 3.21393Z"
                                            fill="black"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_85_267">
                                            <rect
                                                width="70"
                                                height="70"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg
                                    className="w-[50px] sm:w-[70px] h-[50px] sm:h-[50px]"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M63.5679 46.4166L63.6589 44.4148L65.5414 43.1006L65.2714 40.8586L62.5237 40.6498L60.3712 38.196L58.8482 37.7813L57.8637 37.5993L57.983 36.7013L56.7241 36.5238V37.031L53.5856 36.2538L52.3206 34.3236L52.8382 33.3868L50.8498 30.487L50.5082 28.3658H49.7027L49.9742 30.4273L51.3451 32.5485L51.1944 33.3868L50.0324 33.2078L48.5989 30.7614V27.9183L47.1042 27.2008V24.034L49.8802 20.6568L49.7027 18.6386L50.4799 18.0867L49.5536 17.22L49.6117 15.6955L48.5094 14.711H45.4321L44.9234 15.2495L41.2464 15.2197L39.9009 14.0815L40.9481 13.3357H43.6361V12.8345L42.3816 12.648L43.1901 12.0215L44.9532 11.75L47.5831 9.95701H52.1252L54.6074 10.7043L55.4442 11.1817L56.1915 11.2413L57.2984 10.1658L59.2912 10.1494C52.9964 3.95748 44.364 0.132812 34.8382 0.132812C25.7837 0.132812 17.5362 3.58605 11.3382 9.24548L12.2333 9.90927L12.8269 9.95552L14.2306 8.53395L15.782 8.58765L17.8479 8.89493L19.1457 9.55127L33.0392 10.2688L36.8504 11.8813L36.3149 12.3377L33.4882 11.8813L33.4449 12.4272L34.4757 13.1373L33.1302 13.4058V14.2143L30.3542 14.3948L32.4589 16.3668L32.8184 17.9807L31.8757 18.473L28.9162 16.055V14.9347L29.6337 13.813L29.0982 13.1417L25.8687 15.2927L23.3134 15.0675L22.4632 14.441L21.3877 15.9655L21.8799 16.95L25.5987 17.399L27.0934 19.1025L26.7204 19.5962L25.5554 18.4297L25.0199 19.0115L25.9284 20.2123L25.7344 22.4692L23.3433 22.4677L23.2239 24.2891L25.2422 25.5137L25.9433 26.4386L24.8827 26.7235L21.1192 23.8535H19.9079L19.9542 26.185L22.6869 29.052L22.8958 31.1299L21.5204 32.2785L18.3849 33.4002L18.6967 34.5652L18.1269 34.968L17.4869 33.9835L17.5779 33.2212L16.4562 32.8632L15.8267 33.7135L15.9177 35.3275L18.1269 37.1056L18.3491 38.4481L17.0096 39.3401L15.9938 39.2342L14.168 37.1652L13.81 38.6002L17.2617 43.5317L17.0365 44.2462L12.7792 40.1695V36.045L9.55271 33.178L6.98106 32.9318L5.52219 33.4763L4.62122 35.4185L4.13941 39.0253L3.26678 40.2903L2.39265 40.0859L0 36.1524C0.610097 54.8744 15.9684 69.8673 34.8367 69.8673C48.3736 69.8673 60.1012 62.1464 65.8785 50.8752L63.2994 47.6443L63.5679 46.4166ZM5.26413 40.9601L3.90521 41.4657L3.52931 40.4514L4.31692 39.3386L5.41181 39.5549L5.26413 40.9601ZM30.3378 43.8271L31.2924 44.3939L31.2178 45.4351L32.2203 45.4097L33.2972 44.8414L37.1517 46.5896L37.3024 48.6676H38.1094V49.3552H36.4924V47.6502L35.5676 47.7427L34.6994 48.669L32.3068 48.8197L32.2769 47.7129H32.9959L32.9646 47.1759L31.8578 46.5941L29.8873 46.3107L28.9759 45.1905L30.3378 43.8271ZM26.088 48.6392L26.1596 48.226L26.9785 48.1052L27.0456 48.7407L26.5429 48.6855V49.0539H25.8254V49.3686H25.1288V48.7407H25.1751L26.088 48.6392ZM25.5331 48.3394L25.0632 48.1932V47.8695H25.6673L25.5331 48.3394ZM25.275 44.1463L25.2974 47.058L24.641 47.1177V46.1302L24.0145 45.9065L24.1324 47.2982H23.3269V45.1159H23.7162L23.6968 44.7609L25.275 44.1463ZM24.7604 47.9993V48.3394L24.4352 48.3916V48.7392H23.9877V49.0181L23.3269 49.0882V48.7407L23.7505 48.3394L24.0429 47.9993H24.7604ZM18.3506 43.1185L21.4772 41.4225L21.8904 41.0525L22.2365 40.1202H22.7764L22.9554 41.0406L23.3254 41.1957V44.1478L22.9554 44.3909V44.7832L22.3603 45.3217L22.0246 46.1735H19.3918L18.3491 44.7937L18.3506 43.1185ZM22.9569 48.3394V48.7407H22.2379V48.3394H22.9569ZM15.6656 47.4429H16.5009V47.1446L15.873 46.9342L11.4829 41.5567L12.2318 40.9601L15.3121 43.7346L15.2778 44.1866L15.9326 45.0532L18.3253 45.0219L18.4148 46.1272L17.5481 46.2167L17.1901 46.0661L17.2796 47.2624L19.4918 47.2042L21.2818 48.3409L15.873 48.1052L15.6656 47.4429ZM32.2844 65.5146L31.0269 66.2067L29.4711 66.0382L30.9359 64.4182L32.3068 64.5688L32.2844 65.5146ZM33.2958 63.7619L28.8923 63.6067L27.4588 60.4503L23.5819 60.6055L18.7996 62.2508V61.3826L19.7871 60.425L19.9065 55.5248L21.5488 54.3911L23.0241 54.3717L25.8016 51.2049L27.5558 51.0707V51.727H28.1539L29.6188 49.6476H31.6579L33.3927 50.6903L32.5768 51.4853L31.6117 51.2884L31.6758 52.5966L32.1859 52.9039L34.0118 53.0412L34.4011 49.7401L35.3573 49.7848L36.4193 51.6047L36.5416 54.236L38.1512 55.6158L38.5823 57.3819L37.5381 59.7671L33.2958 63.7619ZM43.6808 63.198L42.489 63.7261L41.3732 64.4585L37.4262 66.8765L35.8048 67.1256V66.3857L36.3328 65.9516L39.4415 63.741L41.3851 63.471L42.4308 62.7565L42.5815 60.4682L43.7718 60.3966L43.7927 61.86L44.4416 61.7317L44.8831 62.5178L43.6808 63.198Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M66.4364 21.5698H65.249L64.4226 22.4663L64.2854 23.3628L64.9149 23.6984L66.4364 21.5698Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M67.758 21.2773L68.4994 21.0998L67.758 20.4241V21.2773Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M66.8943 21.2773H67.3776V20.5389H67.0659V20.1123H66.3678H65.6532L64.6195 20.5389L64.4226 21.0536L65.2296 21.2773H66.8943Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M63.8826 18.7444L64.1735 17.6003L63.3202 17.4004L62.379 17.8464L62.9622 19.0353L63.8826 18.7444Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M69.5286 22.1336C69.4496 21.9382 69.3735 21.7428 69.2959 21.5474L69.0602 21.798L69.4943 22.1604L69.5286 22.1336Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M69.727 22.6422L68.747 22.3528H68.6575V23.0017L68.9692 23.4536H69.9985C69.9075 23.1836 69.8269 22.9092 69.727 22.6422Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M59.063 11.9752V12.6927H60.8351L61.1991 12.2005V12.1975V11.6411H60.7188H59.9177L59.8491 11.9096H59.063V11.9752Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M67.1554 21.9159C67.1554 22.2694 67.1554 22.7572 67.1554 22.7572L67.4641 22.7005L67.8266 22.6349L68.3666 22.2873V21.5713H67.1554C67.1554 21.6056 67.1554 21.7473 67.1554 21.9159Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M67.2672 23.1166L67.1554 23.3836L66.6154 23.4313L66.4364 24.2144H67.582L67.8893 23.9057L68.0951 23.6983V23.0017L67.6058 23.0688L67.2672 23.1166Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M59.063 14.0816L59.4031 14.4859L61.1737 14.3725C61.1737 14.3725 61.2409 13.5894 61.1737 13.5894C61.1066 13.5894 60.322 13.7236 60.322 13.7236L59.063 14.0816Z"
                                        fill="black"
                                    />
                                </svg>
                                <svg
                                    className="w-[50px] sm:w-[70px] h-[50px] sm:h-[50px]"
                                    viewBox="0 0 68 70"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 8.75C0 3.92383 3.92383 0 8.75 0H30.625V17.5C30.625 19.9199 32.5801 21.875 35 21.875H52.5V41.5625H24.0625C19.2363 41.5625 15.3125 45.4863 15.3125 50.3125V70H8.75C3.92383 70 0 66.0762 0 61.25V8.75ZM52.5 17.5H35V0L52.5 17.5ZM24.0625 48.125H28.4375C32.6621 48.125 36.0938 51.5566 36.0938 55.7812C36.0938 60.0059 32.6621 63.4375 28.4375 63.4375H26.25V67.8125C26.25 69.0156 25.2656 70 24.0625 70C22.8594 70 21.875 69.0156 21.875 67.8125V61.25V50.3125C21.875 49.1094 22.8594 48.125 24.0625 48.125ZM28.4375 59.0625C30.2559 59.0625 31.7188 57.5996 31.7188 55.7812C31.7188 53.9629 30.2559 52.5 28.4375 52.5H26.25V59.0625H28.4375ZM41.5625 48.125H45.9375C49.5605 48.125 52.5 51.0645 52.5 54.6875V63.4375C52.5 67.0605 49.5605 70 45.9375 70H41.5625C40.3594 70 39.375 69.0156 39.375 67.8125V50.3125C39.375 49.1094 40.3594 48.125 41.5625 48.125ZM45.9375 65.625C47.1406 65.625 48.125 64.6406 48.125 63.4375V54.6875C48.125 53.4844 47.1406 52.5 45.9375 52.5H43.75V65.625H45.9375ZM56.875 50.3125C56.875 49.1094 57.8594 48.125 59.0625 48.125H65.625C66.8281 48.125 67.8125 49.1094 67.8125 50.3125C67.8125 51.5156 66.8281 52.5 65.625 52.5H61.25V56.875H65.625C66.8281 56.875 67.8125 57.8594 67.8125 59.0625C67.8125 60.2656 66.8281 61.25 65.625 61.25H61.25V67.8125C61.25 69.0156 60.2656 70 59.0625 70C57.8594 70 56.875 69.0156 56.875 67.8125V59.0625V50.3125Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                        
                    </div>
                </div>
                <div className="relative py-4">
                    <svg
                        className="w-[450px] h-[450px] absolute -top-[70px] right-[20vw]"
                        viewBox="0 0 737 560"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M736.167 472V24C736.167 10.4 725.767 0 712.167 0H24.1666C10.5666 0 0.166626 10.4 0.166626 24V472C0.166626 485.6 10.5666 496 24.1666 496H33.7666L1.76662 548C0.166624 550.4 0.166624 553.6 1.76662 556C3.36662 558.4 4.96663 560 8.16663 560H56.1666C58.5666 560 61.7666 558.4 62.5666 556L100.167 496H635.367L672.967 556C674.567 558.4 676.967 560 679.367 560H727.367C730.567 560 732.967 558.4 734.567 556C736.167 553.6 736.167 550.4 734.567 548L702.567 496H712.167C725.767 496 736.167 485.6 736.167 472ZM16.1666 472V24C16.1666 19.2 19.3666 16 24.1666 16H712.167C716.967 16 720.167 19.2 720.167 24V472C720.167 476.8 716.967 480 712.167 480H688.167H640.167H96.1666H48.1666H24.1666C19.3666 480 16.1666 476.8 16.1666 472ZM51.3666 544H22.5666L52.9666 496H81.7666L51.3666 544ZM713.767 544H684.967L654.567 496H683.367L713.767 544Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                        <path
                            d="M352.167 464H696.167C700.967 464 704.167 460.8 704.167 456V40C704.167 35.2 700.967 32 696.167 32H40.1666C35.3666 32 32.1666 35.2 32.1666 40V456C32.1666 460.8 35.3666 464 40.1666 464H96.1666H352.167ZM104.167 448V352H344.167V448H104.167ZM224.167 200C197.767 200 176.167 178.4 176.167 152C176.167 125.6 197.767 104 224.167 104C250.567 104 272.167 125.6 272.167 152C272.167 178.4 250.567 200 224.167 200ZM224.167 216C232.967 216 240.967 214.4 248.967 211.2C292.167 221.6 324.167 260 328.167 304H120.167C123.367 260 155.367 221.6 199.367 211.2C207.367 214.4 215.367 216 224.167 216ZM360.167 320V336H352.167H96.1666H88.1666V320H360.167ZM48.1666 48H688.167V448H360.167V352H368.167C372.967 352 376.167 348.8 376.167 344V312C376.167 307.2 372.967 304 368.167 304H344.167C340.967 257.6 310.567 216 266.567 200C280.167 188 288.167 171.2 288.167 152C288.167 116.8 259.367 88 224.167 88C188.967 88 160.167 116.8 160.167 152C160.167 171.2 168.167 188 181.767 200C138.567 216.8 107.367 257.6 104.167 304H80.1666C75.3666 304 72.1666 307.2 72.1666 312V344C72.1666 348.8 75.3666 352 80.1666 352H88.1666V448H48.1666V48Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                        <path
                            d="M384.167 280H656.167C660.967 280 664.167 276.8 664.167 272V80C664.167 75.2 660.967 72 656.167 72H384.167C379.367 72 376.167 75.2 376.167 80V272C376.167 276.8 379.367 280 384.167 280ZM392.167 88H648.167V264H392.167V88Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                        <path
                            d="M520.167 104C480.167 104 448.167 136 448.167 176C448.167 216 480.167 248 520.167 248C560.167 248 592.167 216 592.167 176C592.167 136 560.167 104 520.167 104ZM520.167 232C488.967 232 464.167 207.2 464.167 176C464.167 144.8 488.967 120 520.167 120C551.367 120 576.167 144.8 576.167 176C576.167 207.2 551.367 232 520.167 232Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                        <path
                            d="M520.167 136C515.367 136 512.167 139.2 512.167 144V176C512.167 180.8 515.367 184 520.167 184C524.967 184 528.167 180.8 528.167 176V144C528.167 139.2 524.967 136 520.167 136Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                        <path
                            d="M520.167 192C515.367 192 512.167 195.2 512.167 200V208C512.167 212.8 515.367 216 520.167 216C524.967 216 528.167 212.8 528.167 208V200C528.167 195.2 524.967 192 520.167 192Z"
                            fill="black"
                            fill-opacity="0.08"
                        />
                    </svg>
                    <div className="w-screen bg-black/10 sm:px-[60px] px-[30px] py-3">
                        <div className="basis-1/2 space-y-2">
                        <h1 className="font-bold text-lg">Latest news</h1>
                          <div className="flex gap-2 flex-col sm:flex-row 2xl:flex-col">
                            <div className="basis-1/2 flex flex-col  h-[316px]">
                                <Image alt="image" src="/ai.jpeg" quality={75} width={200} height={200} className="w-full h-1/3 2xl:h-[25vh] object-cover" />
                                
                                <div className="flex sm:flex-row flex-col bg-[#001840] ">
                                
                                    <div className="basis-1/2 text-white sm:text-2xl text-lg p-4 font-black">
                                    Gala Education Launches AI-Powered Learning Platform
                                    </div>
                                    <div className="basis-1/2 text-[10px] px-2 py-3 flex items-center justify-center text-white">
                                    Gala Education is excited to announce the launch of our AI-powered learning platform, offering personalized tutoring and adaptive learning experiences for K12 students. 
                                    </div>
                                </div>
                                    <button className='border border-[#030DFE] mt-4  sm:w-1/4 w-fit rounded p-1 text-xs'>Read the Article</button>
                            </div>    
                            <div className="basis-1/2 flex flex-col gap-1">
                                <NewsCard img={'/news1.jpeg'} title={'New Scholarships for Students Facing Financial Hardship.'} desc={"In our commitment to making education accessible, Gala Education has introduced new scholarship opportunities for students struggling to afford our courses."} />
                                <NewsCard img={'/news1.jpeg'} title={'New Scholarships for Students Facing Financial Hardship.'} desc={"In our commitment to making education accessible, Gala Education has introduced new scholarship opportunities for students struggling to afford our courses."} />
                                <NewsCard img={'/news1.jpeg'} title={'New Scholarships for Students Facing Financial Hardship.'} desc={"In our commitment to making education accessible, Gala Education has introduced new scholarship opportunities for students struggling to afford our courses."} />
                            </div>
                            </div>      
                        </div>
                    </div>
                </div>
                <div className={'py-4'}>

                    <div className="font-black text-lg text-center">Latest Events</div>

                <div className="relative py-16">
                    <svg className={"sm:w-[300px] w-[250px] sm:h-[300px] h-[250px] -z-[90] absolute top-0 -left-28"} viewBox="0 0 460 418" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M334.167 167.333C334.167 201.916 323.633 234.041 305.6 260.671C320.804 270.519 331.458 286.794 333.719 305.648C368.598 292.516 382.223 277.283 388.985 260.002C393.59 248.235 395.74 233.702 396.521 214.502C397.156 198.862 396.865 181.831 396.725 161.793C384.24 154.597 375.833 141.113 375.833 125.666C375.833 102.655 394.488 83.9998 417.5 83.9998C440.513 83.9998 459.167 102.655 459.167 125.666C459.167 141.063 450.817 154.509 438.398 161.722C438.542 179.875 438.892 198.05 438.154 216.194C437.306 237.031 434.9 257.004 427.785 275.185C413.927 310.604 384.717 333.402 334.167 349.566V354.833C334.167 389.352 306.185 417.333 271.667 417.333H63.3334C28.8157 417.333 0.833374 389.352 0.833374 354.833V313.166C0.833374 291.158 12.2088 271.806 29.4009 260.671C11.3669 234.041 0.833374 201.916 0.833374 167.333C0.833374 75.2857 75.4525 0.666504 167.5 0.666504C259.548 0.666504 334.167 75.2857 334.167 167.333ZM167.5 292.333C236.535 292.333 292.5 236.369 292.5 167.333C292.5 98.2975 236.535 42.3332 167.5 42.3332C98.4644 42.3332 42.5 98.2975 42.5 167.333C42.5 236.369 98.4644 292.333 167.5 292.333ZM167.5 334C209.398 334 247.685 318.539 276.967 293.014C285.906 295.358 292.5 303.491 292.5 313.166V354.833C292.5 366.339 283.173 375.666 271.667 375.666H63.3334C51.8275 375.666 42.5 366.339 42.5 354.833V313.166C42.5 303.491 49.0942 295.358 58.033 293.014C87.3155 318.539 125.602 334 167.5 334Z" fill="#0F0F0F" fill-opacity="0.1"/>
                    </svg>
                    <svg className="sm:w-[300px] w-[250px] sm:h-[300px] h-[250px] -z-[90] absolute sm:top-0 bottom-0 sm:right-10 right-14" viewBox="0 0 460 418" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M334.167 167.333C334.167 201.916 323.633 234.041 305.6 260.671C320.804 270.519 331.458 286.794 333.719 305.648C368.598 292.516 382.223 277.283 388.985 260.002C393.59 248.235 395.74 233.702 396.521 214.502C397.156 198.862 396.865 181.831 396.725 161.793C384.24 154.597 375.833 141.113 375.833 125.666C375.833 102.655 394.488 83.9998 417.5 83.9998C440.513 83.9998 459.167 102.655 459.167 125.666C459.167 141.063 450.817 154.509 438.398 161.722C438.542 179.875 438.892 198.05 438.154 216.194C437.306 237.031 434.9 257.004 427.785 275.185C413.927 310.604 384.717 333.402 334.167 349.566V354.833C334.167 389.352 306.185 417.333 271.667 417.333H63.3334C28.8157 417.333 0.833374 389.352 0.833374 354.833V313.166C0.833374 291.158 12.2088 271.806 29.4009 260.671C11.3669 234.041 0.833374 201.916 0.833374 167.333C0.833374 75.2857 75.4525 0.666504 167.5 0.666504C259.548 0.666504 334.167 75.2857 334.167 167.333ZM167.5 292.333C236.535 292.333 292.5 236.369 292.5 167.333C292.5 98.2975 236.535 42.3332 167.5 42.3332C98.4644 42.3332 42.5 98.2975 42.5 167.333C42.5 236.369 98.4644 292.333 167.5 292.333ZM167.5 334C209.398 334 247.685 318.539 276.967 293.014C285.906 295.358 292.5 303.491 292.5 313.166V354.833C292.5 366.339 283.173 375.666 271.667 375.666H63.3334C51.8275 375.666 42.5 366.339 42.5 354.833V313.166C42.5 303.491 49.0942 295.358 58.033 293.014C87.3155 318.539 125.602 334 167.5 334Z" fill="#0F0F0F" fill-opacity="0.1"/>
                    </svg>

                    <div className={'flex flex-col sm:flex-row justify-around items-center gap-y-2 gap-x-4'}>
                        <Events img={"/events1.jpeg"} title={'"Future of Learning" Summit'} desc={"A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."} />
                        <Events img={"/events2.jpeg"} title={'Student Innovation Hackathon'} desc={"A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."} />
                        <Events img={"/events3.jpeg"} title={'"Future of Learning" Summit'} desc={"A conference exploring cutting-edge technologies in education, featuring expert speakers on AI, personalized learning, and digital transformation in classrooms."} />
                    </div>

                </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
