"use client";
import React, { useState } from "react";
import { Card, Progress, Tabs, Timeline, Badge, Tag, Button } from "antd";
import { FaBook, FaCalendarAlt, FaClock, FaDollarSign, FaGraduationCap, FaInfoCircle, FaUsers, FaStar, FaCheckCircle, FaPlayCircle } from "react-icons/fa";

const ClassDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  // Mock data - replace with your actual data
  const classData = {
    className: "Static Electricity",
    startDate: "10.05.2026",
    endDate: "10.06.2026",
    description: "Advanced mathematics course covering algebra, geometry, and calculus fundamentals. Perfect for students looking to build a strong foundation in mathematical concepts.",
    price: "$299",
    subject: "Physics",
    grade_entitled: "Grades 9-12",
    instructor: "Dr. Sarah Johnson",
    studentsEnrolled: 24,
    maxCapacity: 30,
    rating: 4.8,
    totalReviews: 156,
    topics: ["Algebra", "Geometry", "Calculus", "Statistics"],
    prerequisites: ["Basic Math", "Pre-Algebra"],
    skills: ["Problem Solving", "Critical Thinking", "Analytical Skills"],
  };

  const items = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className="space-y-6">
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Students Enrolled</p>
                  <h4 className="text-2xl font-bold text-blue-900">{classData.studentsEnrolled}</h4>
                </div>
                <FaUsers className="text-3xl text-blue-500" />
              </div>
              <Progress percent={(classData.studentsEnrolled / classData.maxCapacity) * 100} showInfo={false} strokeColor="#3B82F6" />
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Lessons per week</p>
                  <h4 className="text-2xl font-bold text-green-900">2</h4>
                </div>
                <FaClock className="text-3xl text-green-500" />
              </div>
              <div className="text-sm text-green-600 mt-2">Tue, Fri</div>
            </div>
          </div>

          {/* Course Description */}
          <Card className="border-none shadow-lg mt-5">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaInfoCircle className="text-2xl text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">About This Topic</h3>
                <p className="text-gray-600 leading-relaxed">{classData.description}</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },

    {
      key: "2",
      label: "Lessons",
      children: (
        <Timeline
          items={[
            {
              dot: <FaPlayCircle className="text-blue-500" />,
              children: (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold">Tuesday : 19:30pm</h3>
                  <Button type="primary" className="mt-2">Update time</Button>
                </div>
              ),
            },
            {
              dot: <FaPlayCircle className="text-blue-500" />,
              children: (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="font-semibold">Friday : 07:30am</h3>
                 <Button type="primary" className="mt-2">Update time</Button>
                </div>
              ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full px-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#253a60] to-[#001840] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{classData.className}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <FaGraduationCap className="mr-2" />
                  <span>{classData.grade_entitled}</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="mr-2" />
                  <span>{classData.subject}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-yellow-300 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(classData.rating) ? "text-yellow-300" : "text-gray-400"} />
                ))}
                <span className="ml-2 text-white">({classData.totalReviews} reviews)</span>
              </div>
              <div className="space-y-4">
                <button className="bg-white text-[#001840] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">Price - {classData.price}</button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <FaCalendarAlt className="mx-auto text-2xl mb-2" />
                    <p className="text-sm">Start Date</p>
                    <p className="font-semibold">{classData.startDate}</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <FaClock className="mx-auto text-2xl mb-2" />
                    <p className="text-sm">End Date</p>
                    <p className="font-semibold">{classData.endDate}</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <FaUsers className="mx-auto text-2xl mb-2" />
                    <p className="text-sm">Class Size</p>
                    <p className="font-semibold">
                      {classData.studentsEnrolled}/{classData.maxCapacity}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <FaGraduationCap className="mx-auto text-2xl mb-2" />
                    <p className="text-sm">Instructor</p>
                    <p className="font-semibold">{classData.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultActiveKey="1" items={items} onChange={setActiveTab} className="bg-white p-6 rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

export default ClassDetailsPage;
