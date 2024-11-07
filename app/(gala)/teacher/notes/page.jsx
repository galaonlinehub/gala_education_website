"use client";

import { useState } from "react";
import Image from "next/image";
import ReadMoreContainer from "@/components/layout/ui/ReadMore";

const Notes = () => {
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-orange-200 border-2 border-blue-600 rounded-xl p-4 mb-8 relative">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow">
                <h2 className="text-lg font-bold mb-2">Welcome back, Diana Malle!</h2>
                <ReadMoreContainer />
              </div>
              <div className="flex-shrink-0 md:absolute md:-top-16 md:right-4">
                <Image className="h-auto w-auto" src="/sitting_on_books.png" alt="An image of a character sitting on books" width={130} height={130} />
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold mb-4">My Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mySubjects.map((subject, index) => (
              <div key={index} className="bg-[#001840] text-white p-4 cursor-pointer">
                <h4 className="text-sm font-bold mb-2">{subject.name}</h4>
                <p className="text-xs">{subject.class_size}</p>
                <p className="text-xs">{subject.days}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer">
              <button className="w-10 h-10 bg-gray-400 text-white text-2xl rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">+</button>
            </div>
          </div>

          <h3 className="text-sm font-bold mb-4">Homework</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mySubjects.map((subject, index) => (
              <div key={index} className="bg-[#001840] text-white p-4 cursor-pointer">
                <h4 className="text-sm font-bold mb-2">{subject.name}</h4>
                <p className="text-xs">{subject.class_size}</p>
                <p className="text-xs">{subject.days}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer">
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
                <div key={index} className="border border-white rounded-md p-2 text-white">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-lg">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 style={{fontSize:"10px"}} className=" mb-1 line-clamp-2">
                        <b>{topic.title}</b>: {topic.description}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex text-white text-xs flex-col items-center justify-center">
              <button className="p-1 rounded-3xl font-semibold mt-8 mb-10 border border-white w-20">Edit</button>
              <span  style={{fontSize:"10px"}} className="italic"><b>Note:</b> Organizing topics effectively helps ensure clear progression and deeper understanding for students.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
