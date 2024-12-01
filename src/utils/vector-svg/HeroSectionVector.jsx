import Card1 from "@/src/components/home/card/Card1";
import React from "react";

const HeroSectionVector = ()=>{
    return (
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

            <div
                className="absolute top-0 left-0  sm:h-[35rem] bg-black/10 h-40vh   flex flex-col items-center  py-8  w-screen">
                <h1 className="font-black text-[20px] sm:text-[40px]">
                    Why choose our platform?
                </h1>
                <h2 className="text-[10px] sm:text-[15px] text-center py-6">
                    &ldquo;Choose Gala Education for personalized learning, innovative
                    teaching methods, and a commitment to
                    <br/>
                    unlocking every student&apos;s full potential.&ldquo;
                </h2>

                <div
                    className="flex  gap-3 2xl:gap-24  h-[48rem] sm:h-[50rem] sm:justify-center  w-[98%] px-4  sm:w-full">
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
                    <div
                        className="bg-[#b3b3b3]/40 flex justify-between items-center rounded-[15px] w-[40px] h-4 my-8 px-2">
                        <div className="h-2 w-2 bg-gray-600 rounded-full"/>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HeroSectionVector