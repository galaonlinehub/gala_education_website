"use client";
import React from "react";
import { Card, Button, Drawer, Progress, Avatar, Tooltip } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  RightOutlined,
  BookFilled,
  ExclamationCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { FaAtom, FaDna, FaFlask, FaFolderOpen } from "react-icons/fa";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import {
  TopicCard,
  TopicCardSkeleton,
} from "@/src/components/student/TopicCardStudent";

const ClassList = () => {
  const [open, setOpen] = React.useState(true);
  const { enrolledTopics, enrolledTopicsLoading, enrolledToipcsError } =
    useEnrolledTopics();

  const classes = [
    {
      id: 1,
      courseCode: "PHY-545-9",
      className: "Quantum Mechanics",
      subject: "Physics",
      topic: "Advanced Wave Functions & Schrödinger Equations",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      schedule: "Mon, Wed, Fri",
      time: "10:00 AM - 11:30 AM",
      description:
        "Advanced study of quantum mechanical principles, wave-particle duality, and modern applications in quantum computing.",
      nextClass: "Quantum Entanglement & Superposition",
      nextClassDate: "Tomorrow, 10:00 AM",
      assignmentsDue: 2,
      materials: [
        "Lecture Notes on Wave Functions",
        "Quantum Computing Lab Guide",
        "Problem Set 7",
      ],
      status: "In Progress",
      remainingTime: "45 minutes until next class",
      enrolledStudents: 24,
      difficulty: "Advanced",
      icon: <FaAtom className="text-2xl text-blue-600" />,
      color: "blue",
    },
    {
      id: 2,
      courseCode: "BIO-765-8",
      className: "Molecular Genetics",
      subject: "Biology",
      topic: "Gene Expression & CRISPR Technology",
      instructor: "Prof. Michael Chen",
      progress: 45,
      schedule: "Tue, Thu",
      time: "2:00 PM - 3:30 PM",
      description:
        "Comprehensive analysis of genetic mechanisms, DNA replication, and modern gene editing techniques.",
      nextClass: "Epigenetic Modifications",
      nextClassDate: "Thursday, 2:00 PM",
      assignmentsDue: 1,
      materials: [
        "Gene Editing Protocols",
        "Lab Safety Guidelines",
        "Research Paper Draft",
      ],
      status: "Upcoming",
      remainingTime: "2 days until next class",
      enrolledStudents: 18,
      difficulty: "Intermediate",
      icon: <FaDna className="text-2xl text-green-600" />,
      color: "green",
    },
    {
      id: 3,
      courseCode: "CHE-433-8",
      className: "Advanced Organic Chemistry",
      subject: "Chemistry",
      topic: "Reaction Mechanisms & Synthesis",
      instructor: "Dr. Jessica Williams",
      progress: 90,
      schedule: "Wed, Fri",
      time: "1:00 PM - 2:30 PM",
      description:
        "Advanced organic synthesis methods, reaction mechanisms, and pharmaceutical applications.",
      nextClass: "Stereochemistry Analysis",
      nextClassDate: "Friday, 1:00 PM",
      assignmentsDue: 0,
      materials: [
        "Reaction Mechanisms Guide",
        "Lab Procedures",
        "Synthesis Project",
      ],
      status: "Completed",
      remainingTime: "3 days until next class",
      enrolledStudents: 21,
      difficulty: "Expert",
      icon: <FaFlask className="text-2xl text-purple-600" />,
      color: "purple",
    },
  ];

  const [selectedClass, setSelectedClass] = React.useState(classes[1]);


  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "advanced":
        return "orange";
      case "intermediate":
        return "blue";
      case "expert":
        return "red";
      default:
        return "green";
    }
  };

  const showDrawer = (classItem) => {
    setSelectedClass(1);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mt-14 px-2 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-[#001840] mb-2">
            My Classes
          </h1>
          <p className="text-gray-600 text-xs">
            Track your progress in different classes
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledToipcsError ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-600 text-lg font-medium">
                Something went wrong.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Please try again later.
              </p>
            </div>
          ) : enrolledTopicsLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TopicCardSkeleton key={index} />
            ))
          ) : enrolledTopics.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-full py-24">
              <FaFolderOpen className="text-6xl md:text-8xl text-[#001840]" />
              <p className="text-[#001840] text-lg font-medium">
                You haven’t enrolled in any classes yet!
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Use the search bar above to explore and find classes.
              </p>
            </div>
          ) : (
            enrolledTopics?.map((classItem) => (
              <TopicCard key={classItem.id} details={classItem} />
            ))
          )}
        </div>
      </div>

      <Drawer
        title={selectedClass?.className}
        placement="right"
        width={580}
        onClose={onClose}
        open={open}
        className="!overflow-y-auto"
      >
        {selectedClass && (
          <div className="space-y-6">
            <div className="bg-[#001840]/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#001840] mb-3">
                Course Overview
              </h3>
              <p className="text-gray-600 mb-4">{selectedClass.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <UserOutlined className="text-[#001840] mr-2" />
                  <span>{selectedClass.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarOutlined className="text-[#001840] mr-2" />
                  <span>{selectedClass.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockCircleOutlined className="text-[#001840] mr-2" />
                  <span>{selectedClass.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOutlined className="text-[#001840] mr-2" />
                  <span>{selectedClass.topic}</span>
                </div>
              </div>
            </div>

            {/* Next Class */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                Next Class
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedClass.nextClass}</span>
                  <span className="text-gray-600">
                    {selectedClass.nextClassDate}
                  </span>
                </div>
                <Button
                  type="primary"
                  className="w-full !bg-[#001840] hover:!bg-[#001840]/90"
                >
                  Join Class
                </Button>
              </div>
            </div>

            {/* Course Materials */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-[#001840] mb-4">
                Course Materials
              </h3>
              <div className="space-y-3">
                {selectedClass.materials.map((material, index) => (
                  <Button
                    key={index}
                    className="w-full justify-start text-left flex items-center"
                  >
                    <BookFilled className="mr-2" />
                    {material}
                  </Button>
                ))}
              </div>
            </div>

            {selectedClass.assignmentsDue > 0 && (
              <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Pending Assignments
                </h3>
                <p className="text-amber-700">
                  You have {selectedClass.assignmentsDue} assignment
                  {selectedClass.assignmentsDue > 1 ? "s" : ""} due soon
                </p>
                <Button className="mt-4 !border-amber-200 !text-amber-800 hover:!bg-amber-100">
                  View Assignments
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ClassList;
