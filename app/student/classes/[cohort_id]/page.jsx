"use client";
import React, { useState, use } from "react";
import { Card, Avatar } from "antd";
import {
  LuArrowLeft,
  LuBell,
  LuBookText,
  LuCalendar,
  LuCheck,
  LuClock4,
  LuDownload,
  LuFileMinus,
  LuFileText,
  LuMessageSquare,
  LuPlay,
  LuUsers,
  LuVideo,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import { useSearchParams } from "next/navigation";
import { decrypt } from "@/src/utils/fns/encryption";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { img_base_url } from "@/src/config/settings";

const ClassDetailsPage = ({ params }) => {
  const { cohort_id } = use(params);

  const searchParams = useSearchParams();
  const instructor_id = decrypt(searchParams.get("id"));

  const classData = {
    id: "BIO-454-44",
    name: "Advanced Reproduction Biology",
    subject: "Biology",
    shortDescription:
      "Comprehensive exploration of reproductive systems across species",
    description:
      "This course explores the biological mechanisms of reproduction across species. Students will gain in-depth knowledge of cellular and systemic reproduction processes, hormonal regulation, and comparative reproductive strategies.",
    level: "Advanced",
    grade: "12th Grade",
    instructor: {
      name: "Dr. Sarah Johnson",
      image: "/api/placeholder/200/200",
      bio: "Ph.D. in Reproductive Biology",
      phone: "+1 (555) 123-4567",
      email: "sjohnson@example.edu",
    },
    schedule: {
      startDate: "Jan 15",
      endDate: "May 30",
      sessions: [
        { day: "Monday", time: "10:00 AM - 11:30 AM" },
        { day: "Wednesday", time: "10:00 AM - 11:30 AM" },
      ],
      nextClass: {
        topic: "Hormonal Regulation in Mammals",
        date: "Feb 27",
        time: "10:00 AM",
        countdown: "Tomorrow",
      },
    },
    progress: 42,
    materials: [
      {
        name: "Reproduction Systems Textbook",
        type: "pdf",
        icon: <LuFileText />,
      },
      {
        name: "Lecture Slides - Week 1-5",
        type: "slides",
        icon: <LuFileText />,
      },
      { name: "Laboratory Manual", type: "pdf", icon: <LuFileMinus /> },
      {
        name: "Research Paper - Comparative Reproduction",
        type: "pdf",
        icon: <LuFileText />,
      },
      {
        name: "Video Tutorial - Cell Division",
        type: "video",
        icon: <LuVideo />,
      },
    ],
    assignments: [
      {
        name: "Cellular Division Analysis",
        dueDate: "Mar 5",
        status: "pending",
      },
      {
        name: "Comparative Reproduction Essay",
        dueDate: "Mar 15",
        status: "pending",
      },
      {
        name: "Hormonal Cycle Diagram",
        dueDate: "Feb 10",
        status: "completed",
      },
      {
        name: "Lab Report - Microscope Observations",
        dueDate: "Mar 20",
        status: "pending",
      },
    ],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Reproductive Biology",
        completed: true,
      },
      {
        week: 2,
        topic: "Cellular Reproduction - Mitosis and Meiosis",
        completed: true,
      },
      { week: 3, topic: "Gametogenesis Across Species", completed: true },
      { week: 4, topic: "Reproductive Organs and Systems", completed: true },
      {
        week: 5,
        topic: "Hormonal Regulation in Mammals",
        completed: false,
        current: true,
      },
      { week: 6, topic: "Fertilization Mechanisms", completed: false },
      { week: 7, topic: "Embryonic Development", completed: false },
      { week: 8, topic: "Reproductive Strategies in Plants", completed: false },
      {
        week: 9,
        topic: "Evolutionary Aspects of Reproduction",
        completed: false,
      },
      {
        week: 10,
        topic: "Reproductive Technologies and Ethics",
        completed: false,
      },
    ],
    announcements: [
      {
        title: "Extra office hours available next week",
        content: "Sign up on the portal.",
        date: "Feb 20, 2025",
        type: "info",
      },
      {
        title: "Mid-term exam preparation",
        content:
          "Mid-term exam will cover weeks 1-5. Study guide has been posted in materials.",
        date: "Feb 18, 2025",
        type: "success",
      },
      {
        title: "Lab equipment reminder",
        content:
          "Remember to bring your lab notebooks for next week's session.",
        date: "Feb 15, 2025",
        type: "default",
      },
    ],
  };

  const router = useRouter();
  const {
    cohortDetails,
    cohortDetailsLoading,
    instructorDetails,
    instructorDetailsLoading,
    instructorDetailsError,
  } = useEnrolledTopics(cohort_id, instructor_id);

  const instructor = instructorDetails?.instructor?.user;

  return (
    <div className="min-h-screen w-full">
      <div className="sticky  top-1 inset-x-0 z-50 bg-white w-full border-b">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.back()}
              className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <LuArrowLeft
                strokeWidth={3}
                size={24}
                className="text-[#001840]"
              />
            </button>
            <div className="text-lg font-semibold text-gray-800">
              My Classes
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-red-600 hover:bg-red-100 transition-colors font-bold border-[0.5px] border-red-500 rounded px-4 py-1 text-xs">
              Un-Enroll
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Card className="mb-6">
          {cohortDetailsLoading ? (
            <div className="flex items-center justify-center w-full h-56">
              <SlickSpinner color="blue" size={28} />
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="text-[#001840] font-black text-xl mb-3">
                    {cohortDetails?.cohort_name}
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                      {cohortDetails?.subject}
                    </span>
                    <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-md">
                      {cohortDetails?.grade_level}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {cohortDetails?.topic_title}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {cohortDetails?.topic_description}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    disabled={true}
                    className="bg-[#001840] hover:bg-[#001840]/90 text-white px-6 py-2 rounded-md flex items-center"
                  >
                    <LuVideo className="mr-2 text-xl" />
                    <span className="text-sm">Join Next Class</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-800">
                    Your Progress:{" "}
                    <span className="text-[#001840] font-semibold">
                      {cohortDetails?.percentage_completion}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Next class:{" "}
                    <span className="font-medium text-[#001840]">
                      {classData.schedule.nextClass.countdown}
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#001840] rounded-full"
                    style={{ width: `${classData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="md:col-span-2 space-y-6">
            {/* Next Class Card */}
            <Card className="">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#001840]">
                  Next Class
                </h3>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">
                  {classData.schedule.nextClass.countdown}
                </span>
              </div>
              <h4 className="text-xl font-medium text-gray-800 mb-2">
                {classData.schedule.nextClass.topic}
              </h4>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <LuCalendar className="mr-2 text-[#001840]" />
                  <span>{classData.schedule.nextClass.date}</span>
                </div>
                <div className="flex items-center">
                  <LuClock4 className="mr-2 text-[#001840]" />
                  <span>{classData.schedule.nextClass.time}</span>
                </div>
              </div>
            </Card>

            {/* About This Class */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                About This Class
              </h3>
              <p className="text-gray-600">{classData.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="text-sm font-medium text-[#001840] mb-2">
                    Schedule
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <LuCalendar className="text-[#001840] mr-2" />
                      <span>
                        {classData.schedule.startDate} -{" "}
                        {classData.schedule.endDate}
                      </span>
                    </div>
                    {classData.schedule.sessions.map((session, index) => (
                      <div key={index} className="flex items-center">
                        <LuClock4 className="text-[#001840] mr-2" />
                        <span>
                          {session.day}: {session.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Course Syllabus Section */}
            <Card className="">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#001840]">
                  Course Syllabus
                </h3>
                <div className="flex items-center text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                  <span>
                    Week {classData.syllabus.find((w) => w.current)?.week} of{" "}
                    {classData.syllabus.length}
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6 pl-8">
                  {classData.syllabus.map((week, index) => (
                    <div
                      key={index}
                      className={`relative ${week.current ? "mb-8" : ""}`}
                    >
                      <div
                        className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center ${
                          week.completed
                            ? "bg-green-100 text-green-600"
                            : week.current
                            ? "bg-blue-100 text-blue-600 ring-4 ring-blue-50"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {week.completed ? (
                          <LuCheck />
                        ) : week.current ? (
                          <LuPlay />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div
                        className={`${
                          week.current
                            ? "bg-blue-50 rounded-lg p-4 border border-blue-100"
                            : ""
                        }`}
                      >
                        <h4 className="text-sm font-semibold text-gray-800">
                          Week {week.week}
                        </h4>
                        <p
                          className={`${
                            week.current
                              ? "text-blue-700 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {week.topic}
                        </p>

                        {week.current && (
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              Current
                            </span>
                            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Course Materials Section */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-6">
                Class Materials
              </h3>
              <div className="grid gap-4">
                {classData.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#001840] text-white rounded-lg mr-4 group-hover:scale-105 transition-transform">
                        {material.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {material.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {material.type.toUpperCase()} • Added Feb 15, 2025
                        </div>
                      </div>
                    </div>
                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-[#001840] hover:bg-[#001840] hover:text-white transition-colors">
                      <LuDownload />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Assignments Section */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-6">
                Assignments
              </h3>

              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                  Upcoming Assignments
                </h4>
                <div className="grid gap-3">
                  {classData.assignments
                    .filter((a) => a.status === "pending")
                    .map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-orange-400"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg mr-3">
                            <LuFileText />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {assignment.name}
                            </div>
                            <div className="text-xs text-orange-600">
                              Due {assignment.dueDate}
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 text-sm bg-[#001840] text-white rounded-md hover:bg-[#001840]/90 transition-colors">
                          Start
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Completed Assignments
                </h4>
                <div className="grid gap-3">
                  {classData.assignments
                    .filter((a) => a.status === "completed")
                    .map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-green-400"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg mr-3">
                            <LuCheck />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {assignment.name}
                            </div>
                            <div className="text-xs text-green-600">
                              Completed • Feb 10, 2025
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 text-sm bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors">
                          View
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Announcements Section */}
            <Card className="">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#001840]">
                  Announcements
                </h3>
                <div className="flex items-center space-x-2">
                  <LuBell className="text-[#001840]" />
                  <span className="text-sm text-gray-500">3 new</span>
                </div>
              </div>

              <div className="space-y-4">
                {classData.announcements.map((announcement, index) => {
                  const bgColor =
                    announcement.type === "info"
                      ? "bg-blue-50 border-blue-500"
                      : announcement.type === "success"
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-300";

                  const iconColor =
                    announcement.type === "info"
                      ? "text-blue-500"
                      : announcement.type === "success"
                      ? "text-green-500"
                      : "text-gray-500";

                  return (
                    <div
                      key={index}
                      className={`rounded-lg p-4 border-l-4 ${bgColor}`}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-1">
                          <LuBell className={iconColor} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {announcement.title}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            {announcement.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {announcement.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card className="overflow-hidden !space-y-3">
              {instructorDetailsLoading ? (
                <div className="h-28 flex justify-center items-center">
                  <SlickSpinner color="blue" size={15} />
                </div>
              ) : (
                <div className="w-full flex flex-col">
                  <Avatar
                    size={72}
                    className="!bg-transparent/90 mb-4"
                    src={`${img_base_url}${instructor?.profile_picture}`}
                  />

                  <div className="flex flex-col">
                    <h4 className="font-semibold text-xl text-gray-800">
                      {instructor?.first_name} {instructor?.last_name}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 mb-4 line-clamp-6">
                      {instructor?.bio}{" "}
                    </p>

                    <div className="space-y-3">
                      <button
                        className={`w-full px-4 py-2.5 rounded-md flex items-center justify-center font-medium text-sm bg-[#001840] text-white`}
                      >
                        <LuMessageSquare className="mr-2" />
                        <span>Message Instructor</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Course Stats Card */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                Course Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center group hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="text-blue-600 font-bold text-2xl group-hover:scale-110 transition-transform">
                    {classData.progress}%
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Course Progress
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center group hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="text-green-600 font-bold text-2xl group-hover:scale-110 transition-transform">
                    {
                      classData.assignments.filter(
                        (a) => a.status === "completed"
                      ).length
                    }
                    /{classData.assignments.length}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Assignments Done
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center group hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="text-purple-600 font-bold text-2xl group-hover:scale-110 transition-transform">
                    5
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Weeks Remaining
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center group hover:bg-orange-100 transition-colors cursor-pointer">
                  <div className="text-orange-600 font-bold text-2xl group-hover:scale-110 transition-transform">
                    3
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Days to Next Exam
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity Card */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 shrink-0">
                    <LuCheck />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      Completed assignment
                    </p>
                    <p className="text-sm text-gray-600">
                      Hormonal Cycle Diagram
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Feb 10, 2025</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 shrink-0">
                    <LuPlay />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Attended class</p>
                    <p className="text-sm text-gray-600">
                      Reproductive Organs and Systems
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Feb 19, 2025</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 shrink-0">
                    <LuBookText />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      Downloaded material
                    </p>
                    <p className="text-sm text-gray-600">
                      Lecture Slides - Week 1-5
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Feb 18, 2025</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full text-center text-sm text-[#001840] font-medium hover:underline">
                  View All Activity
                </button>
              </div>
            </Card>

            {/* Class Resources Quick Links */}
            <Card className="">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center text-[#001840] mb-2">
                    <LuBookText className="text-2xl" />
                  </div>
                  <span className="text-sm text-gray-800">Class Notes</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center text-[#001840] mb-2">
                    <LuVideo className="text-2xl" />
                  </div>
                  <span className="text-sm text-gray-800">Recordings</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center text-[#001840] mb-2">
                    <LuUsers className="text-2xl" />
                  </div>
                  <span className="text-sm text-gray-800">Discussion</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center text-[#001840] mb-2">
                    <LuFileText className="text-2xl" />
                  </div>
                  <span className="text-sm text-gray-800">Syllabus</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
