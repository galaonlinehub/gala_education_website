"use client";

import { Avatar, Button, Card, Collapse, Tag } from "antd";
import React, { useState } from "react";
import { LuCalendar, LuClock, LuUsers, LuVideo, LuInfo } from "react-icons/lu";

const { Panel } = Collapse;

const LiveLessons = () => {
  const classes = [
    {
      key: "5",
      class_name: "Business Studies",
      instructor: "Dr. Rachel Martinez",
      topic: "Strategic Management",
      date: "Feb 24, 2025",
      time: "03:00 PM",
      duration: "1.5 hours",
      enrolled: 32,
      status: "Upcoming",
      link: "https://zoom.us/j/1234567894",
      description:
        "Learn about strategic planning, competitive analysis, and business model innovation. Includes case studies of successful global companies.",
      prerequisites: "Basic business knowledge",
    },
    {
      key: "6",
      class_name: "Data Science",
      instructor: "Prof. John Lee",
      topic: "Machine Learning Basics",
      date: "Feb 25, 2025",
      time: "10:00 AM",
      duration: "2 hours",
      enrolled: 45,
      status: "Upcoming",
      link: "https://zoom.us/j/9876543210",
      description:
        "Introduction to machine learning concepts and algorithms with hands-on examples.",
      prerequisites: "Basic programming knowledge",
    },
    {
      key: "7",
      class_name: "Marketing",
      instructor: "Sarah Thompson",
      topic: "Digital Marketing Strategies",
      date: "Feb 26, 2025",
      time: "01:00 PM",
      duration: "1 hour",
      enrolled: 28,
      status: "Upcoming",
      link: "https://zoom.us/j/4567891234",
      description:
        "Explore SEO, social media, and content marketing techniques for modern businesses.",
      prerequisites: "None",
    },
  ];

  return (
    <div className="w-full p-4 mt-layout-margin">
      <div className="flex flex-col justify-center gap-1 mb-4">
        <div className="flex items-center gap-2">
          <LuVideo className="text-2xl md:text-4xl text-[#001840] flex-shrink-0" />
          <span className="font-semibold text-lg md:text-2xl text-[#001840] tracking-tight">
            Live Learning Center
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-4xl px-3">
          Participate in Live, Interactive Classes Delivered in Real Time with
          Dynamic Lessons and Engaging Discussions
        </p>
      </div>
      <div className="space-y-3">
        {classes.map((classData) => {
          const [isHovered, setIsHovered] = useState(false);
          return (
            <Card
              key={classData.key}
              className="!flex !flex-col !w-full !rounded-xl !bg-white"
              styles={{ body: { padding: "8px", width: "100%" } }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="min-w-[140px]">
                    <Tag
                      color="#001840"
                      className="!text-white !font-medium !rounded-full !px-2 !py-0.5 !mb-2 !inline-flex !items-center !gap-1"
                    >
                      <LuClock className="h-3 w-3 text-yellow-300" />
                      {classData.status}
                    </Tag>
                    <span className="text-base font-semibold leading-tight">
                      {classData.class_name}: {classData.topic}
                    </span>
                    <div className="text-[10px] text-gray-600 italic flex items-center gap-1">
                      <span> by</span>
                      <Avatar
                        size={24}
                        className="!bg-transparent/90"
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed`}
                      />
                      {classData.instructor}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <LuCalendar className="h-5 w-5 text-[#001840] flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500">Date & Time</span>
                      <p className="text-xs font-medium text-gray-800">
                        {classData.date}, {classData.time} ({classData.duration}
                        )
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <LuUsers className="h-5 w-5 text-[#001840] flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500">Enrolled</span>
                      <p className="text-xs font-medium text-gray-800">
                        {classData.enrolled} students
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Button
                    type="primary"
                    href={classData.link}
                    target="_blank"
                    className={`!bg-[#001840] !text-white !font-medium !rounded-md !px-4 !py-1 !h-auto !border-none transition-transform duration-200 ${
                      isHovered ? "!scale-105 !bg-[#003380]" : ""
                    }`}
                    icon={<LuVideo />}
                  >
                    Join
                  </Button>
                </div>
              </div>

              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <LuInfo
                    className={`h-5 w-5 text-[#001840] transition-transform ${
                      isActive ? "rotate-180" : ""
                    }`}
                  />
                )}
                className="!mt-4 !bg-transparent"
              >
                <Panel
                  header="More Details"
                  key="1"
                  className="!text-[#001840] !font-medium"
                >
                  <div className="text-sm text-gray-700">
                    <p>
                      <strong>Description:</strong> {classData.description}
                    </p>
                    <p className="mt-1">
                      <strong>Prerequisites:</strong> {classData.prerequisites}
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LiveLessons;
