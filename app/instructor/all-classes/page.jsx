// "use client";
// import React, { useState } from "react";
// import { Card, Row, Col, Button, Avatar, Space, Tag, Tooltip, Typography, Input } from "antd";
// import { PlusOutlined, BookOutlined, LoadingOutlined, SearchOutlined, EyeOutlined, CalendarOutlined, UserOutlined, TeamOutlined, DollarOutlined, FieldTimeOutlined } from "@ant-design/icons";
// import ClassCreationWizard from "../create-class/CreateClass";
// import { useCohort } from "@/src/hooks/useCohort";
// import { useUser } from "@/src/hooks/useUser";

// // Import your local image assets for each subject
// import englishImage from "@/public/subjects/english_sub.jpg";
// import mathImage from "@/public/subjects/maths_sub.jpg";
// import biologyImage from "@/public/subjects/biology_sub.jpg";
// import chemistryImage from "@/public/subjects/chemistry_sub.jpg";
// import physicsImage from "@/public/subjects/physics_sub.jpg";

// // Import more subject images as needed


// // Default image for fallback
// import defaultImage from "@/public/subjects/default.jpg";

// const { Title, Text, Paragraph } = Typography;
// const { Meta } = Card;

// // Subject image mapping - direct mapping from subject to image
// const subjectImages = {
//   english: englishImage,
//   math: mathImage,
//   biology: biologyImage,
//   chemistry: chemistryImage,
//   physics: physicsImage,
// };

// /**
//  * Gets the image for a specific subject
//  * @param {string} subject - The class subject
//  * @returns {StaticImageData} - The subject image
//  */
// const getSubjectImage = (subject) => {
//   const subjectLower = subject?.toLowerCase();
//   return subjectImages[subjectLower] || defaultImage;
// };

// const InstructorClasses = () => {
//   const { cohorts } = useCohort();
//   const { user } = useUser();

//   console.log("User data here:", user);

//   const [openAddNewClass, setOpenAddNewClass] = useState(false);

//   const [open, setOpen] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [searchText, setSearchText] = useState("");

//   const showDrawer = (classData) => {
//     setSelectedClass(classData);
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//     setSelectedClass(null);
//   };

//   const handleAddNew = () => {
//     setOpenAddNewClass(true);
//   };

//   const filteredClasses = cohorts?.filter((classItem) => classItem.topic_title.toLowerCase().includes(searchText.toLowerCase()) || classItem.cohort_name.toLowerCase().includes(searchText.toLowerCase()));

//   return (
//     <div style={{ padding: "24px" }}>
//       <div style={{ marginBottom: "24px" }}>
//         <Title level={2}>
//           <BookOutlined style={{ marginRight: "8px" }} />
//           My Classes
//         </Title>

//         {/* Search Input */}
//         <div style={{ marginTop: "16px", marginBottom: "24px" }}>
//           <Input placeholder="Search classes..." prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} style={{ maxWidth: "400px" }} allowClear />
//         </div>
//       </div>

//       {cohorts != null ? (
//         <Row gutter={[24, 24]}>
//           {filteredClasses &&
//             filteredClasses.map((classItem) => {
//               // Calculate enrollment percentage
//               const enrollmentPercentage = Math.round((classItem.total_enrolled_students / classItem.instructor_total_students) * 100);

//               // Get subject image
//               const subjectImage = getSubjectImage(classItem.subject);

//               return (
//                 <Col xs={24} sm={12} md={8} key={classItem.cohort_id}>
//                   <Card
//                     hoverable
//                     className="h-full"
//                     cover={
//                       <div
//                         className="h-36 bg-cover bg-center relative p-4"
//                         style={{
//                           backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${classItem.image_url || subjectImage.src})`,
//                         }}
//                       >
//                         <Tag color="blue" className="absolute top-4 right-4">
//                           {classItem.subject}
//                         </Tag>
//                         <div className="absolute bottom-4 left-4">
//                           <Title level={4} className="!text-white font-bold relative z-10">
//                             <span className="inline-block">{classItem.cohort_name}</span>
//                             <span className="absolute inset-0 -z-10 blur-sm text-white opacity-70">{classItem.cohort_name}</span>
//                           </Title>
//                         </div>
//                       </div>
//                     }
//                     body={{ padding: "16px" }}
//                     actions={[
//                       <Tooltip title="View class details">
//                         <Button type="text" icon={<EyeOutlined />}>
//                           Details
//                         </Button>
//                       </Tooltip>,
//                     ]}
//                   >
//                     <div className="grid grid-cols-1 gap-4">
//                       <Space direction="vertical" size="small" className="w-full">
//                         <div className="flex items-center">
//                           <BookOutlined className="text-blue-500 mr-2" />
//                           <Text ellipsis className="text-gray-700 font-bold">
//                             {classItem.topic_title}
//                           </Text>
//                         </div>
//                       </Space>
//                     </div>
//                     <div className="grid grid-cols-1 gap-4 mb-2">
//                       <Space direction="horizontal" size="small" className="w-full">
//                         <div className="flex items-center">
//                           <CalendarOutlined className="text-blue-500 mr-2" />
//                           <Text className="text-gray-700 text-xs">{classItem.start_date}</Text>
//                         </div>
//                         <div className="flex items-center">
//                           <FieldTimeOutlined className="text-blue-500 mr-2" />
//                           <Text className="text-gray-700 text-xs">{classItem.total_weeks} weeks</Text>
//                         </div>
//                       </Space>
//                     </div>
//                     <span className="text-xs font-bold">Topic description</span>
//                     <Paragraph ellipsis={{ rows: 1 }} className="text-gray-400 text-xs italic mb-4">
//                       {classItem.description}
//                     </Paragraph>
//                   </Card>
//                 </Col>
//               );
//             })}

//           {/* Add New Class Card */}
//           <Col xs={24} sm={12} md={8}>
//             <Card
//               hoverable
//               className="h-full flex items-center justify-center border border-dashed border-gray-300 bg-gray-50"
//               bodyStyle={{
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               onClick={handleAddNew}
//             >
//               <div className="text-center flex flex-col items-center">
//                 <Avatar icon={<PlusOutlined />} className="bg-blue-500 w-16 h-16 flex items-center justify-center text-3xl mb-4" />
//                 <Title level={4} className="m-0">
//                   Add New Class
//                 </Title>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       ) : (
//         <div className="flex items-center justify-center gap-3 w-full h-64">
//           <LoadingOutlined style={{ fontSize: "40px" }} />
//           <span className="text-xs">Loading Classes</span>
//         </div>
//       )}

//       <ClassCreationWizard openAddNewClass={openAddNewClass} setOpenAddNewClass={setOpenAddNewClass} />
//     </div>
//   );
// };

// export default InstructorClasses;
import React from 'react'

function AllClasses() {
  return (
    <div>AllClasses commented</div>
  )
}

export default AllClasses