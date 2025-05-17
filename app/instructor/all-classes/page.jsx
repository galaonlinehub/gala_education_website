"use client";
import React, { useState } from "react";
import { Card, Row, Col, Button, Avatar, Space, Tag, Tooltip, Typography, Input, Spin } from "antd";
import { PlusOutlined, BookOutlined, LoadingOutlined, SearchOutlined, EyeOutlined, CalendarOutlined, UserOutlined, TeamOutlined, DollarOutlined, FieldTimeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import ClassCreationWizard from "../create-class/CreateClass";
import { useUser } from "@/src/hooks/useUser";
import { useInstructorCohorts } from "@/src/hooks/useInstructorCohorts";
import { useCohort } from "@/src/hooks/useCohort";
import { BiSolidDetail } from "react-icons/bi";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { GiBookCover } from "react-icons/gi";
import { MdTopic } from "react-icons/md";
import { useRouter } from "next/navigation";
// Import your local image assets for each subject
import englishImage from "@/public/subjects/english.jpeg";
import mathImage from "@/public/subjects/mathematics.jpeg";
import biologyImage from "@/public/subjects/biology.jpeg";
import chemistryImage from "@/public/subjects/chemistry.jpeg";
import physicsImage from "@/public/subjects/physics.jpeg";
import geographyImage from "@/public/subjects/geography.jpeg";
import civicsImage from "@/public/subjects/civics.jpeg";
import historyImage from "@/public/subjects/history.jpeg";

// Import more subject images as needed


// Default image for fallback
import defaultImage from "@/public/subjects/default.jpeg";
import CohortCardSkeleton from "@/src/components/teacher/CohortCardSkeleton";
import { encrypt } from "@/src/utils/fns/encryption";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;


// Subject image mapping - direct mapping from subject to image
const subjectImages = {
  english: englishImage,
  math: mathImage,
  biology: biologyImage,
  chemistry: chemistryImage,
  physics: physicsImage,
};

/**
 * Gets the image for a specific subject
 * @param {string} subject - The class subject
 * @returns {StaticImageData} - The subject image
 */
const getSubjectImage = (subject) => {
  const subjectLower = subject?.toLowerCase();
  return subjectImages[subjectLower] || defaultImage;
};

const InstructorClasses = () => {
  const { InstructorCohorts, isInstructorCohortsPending } = useInstructorCohorts();
  const { cohorts } = useCohort();
  const router = useRouter();

  const [openAddNewClass, setOpenAddNewClass] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchText, setSearchText] = useState("");


  const showDrawer = (classData) => {
    setSelectedClass(classData);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedClass(null);
  };

  const handleAddNew = () => {
    setOpenAddNewClass(true);
  };

  // Helper function to calculate duration between dates
  const calculateDuration = (timetable) => {
    if (!timetable || !timetable.start_date || !timetable.end_date) return 'N/A';

    const start = new Date(timetable.start_date);
    const end = new Date(timetable.end_date);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const gotoCohortDetails = (cohortId) => {
    const encryptedId = encrypt(cohortId);
    router.push(`all-classes/${encryptedId}`);
  }


  console.log("Instructor cohorts in page", InstructorCohorts);
  console.log("The cohorts paginated", cohorts);

  const filteredClasses = InstructorCohorts?.filter((classItem) => classItem.data.topic.description.toLowerCase().includes(searchText.toLowerCase()) || classItem.data.cohort_name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div className="flex gap-1 items-center text-lg font-semibold lg:text-xl">
          <GiBookCover style={{ marginRight: "8px" }} />
          My Classes
        </div>

        {/* Search Input */}
        <div style={{ marginTop: "16px", marginBottom: "24px" }}>
          <Input placeholder="Search classes..." prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} style={{ maxWidth: "400px" }} allowClear />
        </div>
      </div>

      {isInstructorCohortsPending ? (
        <CohortCardSkeleton />
      ) : InstructorCohorts != null ? (
        <Row gutter={[24, 24]}>
          {filteredClasses &&
            filteredClasses.map((classItem) => {
              // Calculate enrollment percentage
              const enrollmentPercentage = Math.round((classItem.data.total_enrolled_students / classItem.data.instructor_total_students) * 100);

              // Get subject image
              const subjectImage = getSubjectImage(classItem.data.topic.subject.name);

              return (
                <Col xs={24} sm={12} md={12} lg={8} key={classItem.data.cohort_id}>
                  <Card
                    hoverable
                    className="h-full flex flex-col shadow-md overflow-hidden"
                    bodyStyle={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}
                    cover={
                      <div
                        className="h-32 bg-cover bg-center relative"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${classItem.data.image_url || subjectImage.src})`,
                        }}
                      >
                        <Tag color="blue" className="absolute top-4 right-4 font-medium px-3 py-1">
                          {classItem.data.topic.subject.name}
                        </Tag>
                        <div className="absolute bottom-4 left-4">
                          <Title level={4} className="!text-white font-bold relative z-10">
                            <span className="inline-block">{classItem.data.cohort_name}</span>
                            <span className="absolute inset-0 -z-10 blur-sm text-white opacity-70">{classItem.data.cohort_name}</span>
                          </Title>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col h-full">
                      {/* Topic description */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <MdTopic size={18} className="text-blue-800 mr-2 flex-shrink-0" />
                          <Text strong ellipsis className="text-gray-800">
                            {classItem.data.topic.title || classItem.data.topic.description}
                          </Text>
                        </div>
                        <Paragraph ellipsis={{ rows: 2 }} className="text-gray-500 text-xs first-letter:capitalize ml-6">
                          {classItem.data.description}
                        </Paragraph>
                      </div>

                      {/* Dates */}
                      <div className="flex justify-between mb-4 bg-gray-100 p-3 rounded-md">
                        <div className="flex flex-col items-start">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <BsFillCalendar2EventFill size={12} className="text-blue-800 mr-1" />
                            <span>Start date</span>
                          </div>
                          <Text  className="text-green-600 text-sm">
                            {classItem.data.timetable?.start_date}
                          </Text>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <BsFillCalendar2EventFill size={12} className="text-blue-800 mr-1" />
                            <span>End date</span>
                          </div>
                          <Text  className="text-red-600 text-sm">
                            {classItem.data.timetable?.end_date}
                          </Text>
                        </div>
                      </div>

                      {/* Stats/Info */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center">
                          <TeamOutlined className="text-blue-800 mr-1" />
                          <span>{classItem.data.enrollments?.length} / {classItem.data.cohort_size} students</span>
                        </div>
                        <div className="flex items-center">
                          <ClockCircleOutlined className="text-blue-800 mr-1" />
                          <span>{calculateDuration(classItem.data.timetable)} days</span>
                        </div>
                      </div>

                      {/* Button - push to bottom with mt-auto */}
                      <div className="mt-auto pt-2">
                        <Button
                          block
                          type="primary"
                          icon={<BiSolidDetail />}
                          style={{  borderColor: '#c0c0c0' }}
                          className="flex items-center justify-center bg-[#001840] hover:!bg-blue-900"
                          onClick={()=> gotoCohortDetails(classItem.data.id)}
                        >
                        View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}

          {/* Add New Class Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="h-full flex items-center justify-center border border-dashed border-gray-300 bg-gray-50"
              bodyStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleAddNew}
            >
              <div className="text-center flex flex-col items-center">
                <Avatar icon={<PlusOutlined />} className="bg-blue-500 w-16 h-16 flex items-center justify-center text-3xl mb-4" />
                <Title level={4} className="m-0">
                  Add New Class
                </Title>
              </div>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <BookOutlined style={{ fontSize: "40px", color: "#d9d9d9", marginBottom: "16px" }} />
          <Text className="text-gray-500">No classes found. Add a new class to get started.</Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            style={{ marginTop: "16px" }}
          >
            Add New Class
          </Button>
        </div>
      )}

      <ClassCreationWizard openAddNewClass={openAddNewClass} setOpenAddNewClass={setOpenAddNewClass} />
    </div>
  );
};

export default InstructorClasses;
