"use client";

import { useState, useEffect } from "react";
import ReadMoreContainer from "@/src/components/ui/ReadMore";
import { useEnrolledTopics, useNewClass } from "@/src/store/student/class";
import { useUser } from "@/src/hooks/useUser";

import { IoIosAdd } from "react-icons/io";


const Library = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { setOpenNewClass } = useNewClass();
  const { user } = useUser();
  const { enrolledTopincs } = useEnrolledTopics();

 

  const mySubjects = [
    {
      name: "Mathematics Grade 7",
      class_size: "Class size: 10",
      days: "Days: 30",
    },
    { name: "Science Grade 6", class_size: "Class size: 10", days: "Days: 30" },
    { name: "Physics Form 1", class_size: "Class size: 10", days: "Days: 30" },
    {
      name: "Chemistry Form III",
      class_size: "Class size: 10",
      days: "Days: 30",
    },
    { name: "Biology Form IV", class_size: "Class size: 10", days: "Days: 30" },
  ];

  const topics = [
    {
      title: "Addition and Subtraction",
      description: "Basic operations combining or removing quantities.",
    },
    {
      title: "Multiplication and Division",
      description: "Techniques for repeated addition and equal group sharing.",
    },
    {
      title: "Fractions",
      description:
        "Understanding parts of a whole and how to add, subtract, multiply, and divide them.",
    },
    {
      title: "Decimals",
      description:
        "Numbers with a fractional part, using base 10; involves operations like addition.",
    },
    {
      title: "Geometry",
      description:
        "Study of shapes, sizes, and properties of space, including angles, lines, and figures.",
    },
    {
      title: "Algebra",
      description:
        "Using symbols (like x and y) to represent numbers in equations and solve for unknowns.",
    },
    {
      title: "Measurement",
      description:
        "Understanding and calculating length, volume, weight, and time.",
    },
  ];

  return (
    <div className="px-2 py-8 mt-12">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-black mb-4">My Classes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mySubjects.map((subject, index) => (
              <div
                key={index}
                className="bg-[#001840] text-white p-4 rounded-lg cursor-pointer"
              >
                <h4 className="text-sm font-bold mb-2">{subject.name}</h4>
                <p className="text-xs">{subject.class_size}</p>
                <p className="text-xs">{subject.days}</p>
              </div>
            ))}
            <div
              className="flex items-center justify-center bg-gray-200 py-4 rounded-lg cursor-pointer"
              onClick={() => {
                setOpenNewClass(true);
              }}
            >
              <button className="w-10 h-10 bg-gray-400 text-white text-2xl rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                <IoIosAdd size={30} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden w-full bg-[#001840] text-white p-2 rounded-lg mb-4"
          >
            {showSidebar ? "Hide Topics" : "Show Topics"}
          </button>

          <div
            className={`bg-[#001840] rounded-xl p-6 ${
              showSidebar ? "block" : "hidden lg:block"
            }`}
          >
            <h3 className="text-white text-sm font-bold mb-4">Topics</h3>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="border border-white h-16 rounded-md p-2 text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg ">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className=" text-xs mb-1">
                        <b>{topic.title}</b>: {topic.description}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
