"use client";

import { useState } from "react";
import Image from "next/image";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";

const Library = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const mySubjects = [
    { name: "Mathematics Grade 7", class_size: "Class size: 10", days: "Days: 30" },
    { name: "Science Grade 6", class_size: "Class size: 10", days: "Days: 30" },
    { name: "Physics Form 1", class_size: "Class size: 10", days: "Days: 30" },
    { name: "Chemistry Form III", class_size: "Class size: 10", days: "Days: 30" },
    { name: "Biology Form IV", class_size: "Class size: 10", days: "Days: 30" },
  ];

  const topics = [
    { title: "Addition and Subtraction", description: "Basic operations combining or removing quantities." },
    { title: "Multiplication and Division", description: "Techniques for repeated addition and equal group sharing." },
    { title: "Fractions", description: "Understanding parts of a whole and how to add, subtract, multiply, and divide them." },
    { title: "Decimals", description: "Numbers with a fractional part, using base 10; involves operations like addition." },
    { title: "Geometry", description: "Study of shapes, sizes, and properties of space, including angles, lines, and figures." },
    { title: "Algebra", description: "Using symbols (like x and y) to represent numbers in equations and solve for unknowns." },
    { title: "Measurement", description: "Understanding and calculating length, volume, weight, and time." },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-2/3">
        <div className="p-4 z-10 h-fit mb-10 w-full border-blue-600 border-2 rounded-xl flex flex-col relative">
          <div>
            <div className="flex flex-col">
              <div className="font-bold text-sm">Welcome back, Diana Malle!</div>
              <div>
                <ReadMoreContainer />
              </div>
            </div>
            <div className="absolute sm:-top-16 -top-8 sm:right-4 right-2">
              <Image className="h-[8rem] w-[8rem] sm:w-[12rem] sm:h-[12rem] " src="/sitting_on_books.png" alt="An image of a character sitting on books" width={150} height={150} />
            </div>
          </div>
        </div>
          <h3 className="text-sm font-bold mb-4">My Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mySubjects.map((subject, index) => (
              <div key={index} className="bg-[#001840] text-white p-4 rounded-lg cursor-pointer">
                <h4 className="text-sm font-bold mb-2">{subject.name}</h4>
                <p className="text-xs">{subject.class_size}</p>
                <p className="text-xs">{subject.days}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-gray-200 py-4 rounded-lg cursor-pointer">
              <button className="w-10 h-10 bg-gray-400 text-white text-2xl rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">+</button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden w-full bg-[#001840] text-white p-2 rounded-lg mb-4">
            {showSidebar ? "Hide Topics" : "Show Topics"}
          </button>

          <div className={`bg-[#001840] rounded-xl p-6 ${showSidebar ? "block" : "hidden lg:block"}`}>
            <h3 className="text-white text-sm font-bold mb-4">Topics</h3>
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div key={index} className="border border-white h-16 rounded-md p-2 text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg ">{String(index + 1).padStart(2, "0")}</span>
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
