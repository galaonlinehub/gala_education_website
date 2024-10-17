import React from "react";
import Image from "next/image";
import { Button, Checkbox, Input, Select } from "antd";
import Card1 from "@/components/home/card/Card1";
import RegisterCard from "@/components/home/card/RegisterCard";
// const {TextArea} = Input;
function Home() {
    return (
        <div>
            <div className="relative w-[100vw]  h-[100vh] overflow-y-auto">
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

                <div className="flex flex-col md:flex-row w-screen">
                    <div className="sm:basis-1/2 w-full   sm:h-[50vh] h-[90vh]  gap-3 p-4 flex items-center flex-col">
                        <h1 className="text-black w-full font-black text-center sm:text-3xl text-xl">
                            Register with us!
                        </h1>
                        <h3 className="sm:leading-[4px] leading-[12px] text-xs text-center ">
                            "Join Gala Education today - register as a teacher
                            or student and unlock endless learning
                            opportunities!”
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <RegisterCard
                                title={"Register as teacher"}
                                image={"/register_teacher.jpeg"}
                                desc={
                                    "Become part of our team of educators and help deliver exceptional learning experiences."
                                }
                            />
                            <RegisterCard
                                title={"Register as student"}
                                image={"/register_student.jpeg"}
                                desc={
                                    "Join our community of learners and be part of the journey to excellence in education!"
                                }
                            />
                        </div>
                    </div>
                    <div
                        className={
                            "sm:basis-1/2   h-full flex w-full items-center"
                        }
                    >
                        <div className="relative w-full h-[50vh] ">
                            <Image
                                src={"/donate1.jpeg"}
                                width={100}
                                height={100}
                                className="w-[266px] absolute top-0 sm:right-12 left-[12vw] h-[259px] object-cover rounded-br-[100px]"
                            />
                            <div className="sm:w-2/5 w-4/5 border-[0.6px] py-3 px-2 top-[15vh] left-[5vw] sm:top-20 sm:left-[90px] bg-white absolute ">
                                <h1 className="text-lg font-black leading-none">
                                    Donate today to support underfunded schools
                                </h1>
                                <h3 className="text-sm">
                                    Join our community and make a difference!
                                    Your donation supports quality education and
                                    empowers lives. Together, we can create a
                                    brighter future. Every contribution counts -
                                    be part of something impactful today!
                                </h3>
                                <button className="border-[1px] border-[#030dfe] self-center rounded-[5px] p-2 text-xs">
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-screen min-h-[100vh] ">
                        <svg
                            className="w-[250px] md:w-[500px] h-[250px] md:h-[500px] my-[90px] mx-[20px] absolute top-0 left-0"
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
                            className="w-[250px] md:w-[500px] h-[250px] md:h-[500px] my-[90px] mx-[20px] absolute top-0 right-0"
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
                        <div className=" w-screen mt-12  flex gap-5 items-center flex-col h-fit sm:h-[110vh]   bg-black/10">
                            <h1 className="font-black text-3xl">
                                Our services
                            </h1>
                            <h2 className="text-center leading-none">
                                We aim to integrate AI to provide personalized,
                                AI-powered tutoring and learning experiences
                            </h2>
                            <h2 className="text-center leading-none">
                                tailored to each student's unique needs and
                                progress.
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 ">
                                <Card1
                                    title={"Personalized Subject Tutoring"}
                                    image={"/service1.jpeg"}
                                    desc={
                                        "Tailored one-on-one sessions in core subjects such as math, science, English, and social studies, focusing on the student's specific needs and learning pace."
                                    }
                                />
                                <Card1
                                    title={"STEM Enrichment Programs"}
                                    image={"/service2.jpeg"}
                                    desc={
                                        "Specialized tutoring in science, technology, engineering, and math for students interested in deepening their knowledge or exploring STEM fields."
                                    }
                                />
                                <Card1
                                    title={"Special Education Support"}
                                    image={"/service3.jpeg"}
                                    desc={
                                        "Customized sessions for students with learning disabilities or special needs, providing them with the tools and support to thrive academically."
                                    }
                                />
                                <Card1
                                    title={"Test and Exam Preparation"}
                                    image={"/service4.jpeg"}
                                    desc={
                                        "Focused tutoring to prepare students for standardized tests, school exams, and quizzes, including practice tests and study strategies."
                                    }
                                />
                                <Card1
                                    title={"Reading and Literacy Support"}
                                    image={"/service5.jpeg"}
                                    desc={
                                        "Personalized reading programs to improve comprehension, vocabulary, and fluency, particularly for early learners or those struggling with literacy."
                                    }
                                />
                                <Card1
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
                            className="sm:w-[496px] sm:h-[496px] w-[248px] h-[248px]"
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
                            className="md:w-[512px] w-[256px] h-[256px] sm:h-[512px] absolute right-10 sm:top-0 top-[50vh]"
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
                        <Image
                            src="/register_teacher.jpeg"
                            width={200}
                            height={200}
                            className="border-[8px] top-[20vh] sm:top-[15vh] w-2/3 h-1/2 object-cover left-[15vw] sm:left-[35vh] absolute  border-white"
                        />
                    </div>
                    <div className=" sm:px-20 px-2 sm:w-3/4 w-full space-y-3 sm:py-[15vh]">
                        <h1 className="text-3xl font-black ">
                            Here's more on what you need to know about Us!
                        </h1>
                        <h2 className="text-sm">
                            At Gala Education, we offer personalized one-on-one
                            tutoring in subjects like math, science, English,
                            social studies, foreign languages, and more, with
                            flexible scheduling tailored to your child's
                            learning needs. Our experienced and qualified tutors
                            provide targeted help with homework, test
                            preparation, and standardized exams, as well as
                            support for students with special needs. We ensure
                            each student receives focused attention to build
                            academic confidence and succeed in their studies.
                            All you need is a device and a stable internet
                            connection to access our tutoring sessions online
                        </h2>
                        <button className="px-2 py-1 border-[1px] border-[#030DFE]">Request information</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
