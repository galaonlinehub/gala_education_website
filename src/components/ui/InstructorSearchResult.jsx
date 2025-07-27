// "use client";
// import React from "react";
// import { GoVerified, GoBook } from "react-icons/go";
// import { FaUsers, FaStar, FaClock } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";
// import { Avatar, Badge, Card, Button, Skeleton, Tooltip } from "antd";
// import { FaRegStar } from "react-icons/fa";
// import { FaRegMessage, FaRegClock } from "react-icons/fa6";
// import { GoShieldCheck } from "react-icons/go";
// import { BsGlobe } from "react-icons/bs";
// import { LuMessageSquare, LuUsers } from "react-icons/lu";
// import { useEnrollMe } from "@/src/store/student/useEnrollMe";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/src/hooks/data/useUser";
// import { useNewClass } from "@/src/store/student/class";
// import { sessionStorageFn } from "@/src/utils/fns/client";
// import { encrypt } from "@/src/utils/fns/encryption";
// import { PREVIEW_CHAT_KEY } from "@/src/config/settings";
// import useChatStore from "@/src/store/chat/chat";
// import { useChat } from "@/src/hooks/chat/useChat";
// import { TbMessage } from "react-icons/tb";
// import { useCallback } from "react";

// const InstructorSearchResult = ({ details }) => {
//   const { setEnrollMe, setEnrollCohort } = useEnrollMe();
//   const { setOpenNewClass } = useNewClass();
//   const { setCurrentChatId, setPreviewChat } = useChatStore();
//   const { chats } = useChat();
//   const { user } = useUser();
//   const router = useRouter();

//   const handleEnroll = (idx) => {
//     setEnrollMe(true);
//     setEnrollCohort(idx);
//   };

//   const navigateToChat = (chatId) => {
//     setCurrentChatId(chatId);
//     router.push(`/${user?.role}/social`);
//     setOpenNewClass(false);
//   };

//   const setExistingChat = () => {
//     const existingChat = chats.find(
//       (chat) =>
//         chat.created_by === user?.id &&
//         chat.participants.some((p) => p.user.id === details?.id)
//     );

//     if (existingChat) {
//       navigateToChat(existingChat.id);
//       return true;
//     }
//     return false;
//   };

//   const createPreviewChat = () => {
//     const names = details?.name.split(" ");
//     const preview_chat = {
//       first_name: names[0],
//       last_name: names[1],
//       recepient_id: details?.id,
//     };

//     setPreviewChat(preview_chat);
//     navigateToChat("preview");
//   };

//   let makeChat = () => {
//     if (setExistingChat()) {
//       return;
//     }
//     createPreviewChat();
//   };

//   useCallback(() => {
//     console.log(details);
//   }, [details]);

//   return (
//     <div className="mx-auto space-y-8 text-xs overflow-clip">
//       <div className="bg-black backdrop-blur-md rounded-full py-3 px-6 flex items-center justify-center gap-6 text-white">
//         <div className="flex items-center gap-2">
//           <FaUsers size={16} />
//           <span className="whitespace-nowrap">
//             {details.student_count} Students
//           </span>
//         </div>
//         <div className="lg:flex items-center gap-2 hidden">
//           <FaStar size={16} className="text-yellow-400" />
//           <span>
//             {4.5} ({60} reviews)
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <FaClock size={16} />
//           <span className="white">2 hours avg. response</span>
//         </div>
//       </div>

//       <Card className="!text-[10px] !flex !space-y-6">
//         <Card.Meta
//           avatar={
//             <Avatar
//               className="!bg-transparent/90"
//               src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
//             />
//           }
//           title={
//             <div className="flex gap-3 items-center">
//               <div className="flex items-center gap-1">
//                 <span className="font-extrabold capitalize">
//                   {details?.name}{" "}
//                 </span>
//                 <Badge
//                   count={
//                     <span className="flex items-center text-white bg-blue-500  rounded-full">
//                       <GoVerified size={15} />
//                     </span>
//                   }
//                 />
//               </div>
//               <Badge
//                 count={
//                   <div className="!text-[8px] !flex !justify-center !items-center !gap-1 rounded-full bg-yellow-500 !px-2 !py-1 !text-white !font-extralight">
//                     <FaRegStar />
//                     <span>Top Rated</span>
//                   </div>
//                 }
//               />
//             </div>
//           }
//         />
//         <div className="flex flex-col gap-4 mt-4">
//           <div className="flex flex-col flex-wrap gap-2">
//             <span className="line-clamp-3">{details?.bio} </span>
//           </div>
//           <div className="flex text-xs gap-2">
//             <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-2 px-4 gap-2">
//               <FaRegStar size={24} />
//               Top Rated Plus
//             </div>
//             <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-2 px-4 gap-2">
//               <FaRegMessage size={24} />
//               Quick Responder
//             </div>
//             <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-2 px-4 gap-2">
//               <GoShieldCheck size={24} />
//               Expert Status
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row">
//             <div className="flex flex-wrap gap-2 w-3/4">
//               {details?.subjects?.map((sub, index) => (
//                 <Badge
//                   key={index}
//                   count={
//                     <div className="bg-black text-white text-[8px] p-1 rounded-sm">
//                       {sub?.name}
//                     </div>
//                   }
//                 />
//               ))}
//             </div>
//             <div className="w-1/4 self-end flex justify-end">
//               <Tooltip title="Chat with instructor">
//                 <TbMessage
//                   className="text-xl cursor-pointer"
//                   onClick={makeChat}
//                 />
//               </Tooltip>
//             </div>
//           </div>
//         </div>
//       </Card>

//       {details?.topics?.map((i, index) => (
//         <Card key={index} className="!text-black !text-[12px]">
//           <Card.Meta
//             title={
//               <>
//                 <div className="flex gap-2 items-center">
//                   <div className="bg-transparent/90 !text-white p-2 rounded-lg">
//                     <BsGlobe size={20} />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="font-bold capitalize">
//                       {i?.topic?.title}
//                     </span>
//                     <span className="text-[10px]">{i?.topic?.description}</span>
//                   </div>
//                 </div>
//               </>
//             }
//             description={i?.cohorts?.map((c, _) => (
//               <div
//                 key={c?.cohort_id}
//                 className="flex flex-col mb-3 text-[10px]"
//               >
//                 <div className="bg-[#001840]/5 !rounded-md !w-full !text-black !p-2 !text-[12px] space-y-1">
//                   <div className="w-full flex justify-between">
//                     <span className="text-[14px] font-black">
//                       {c?.cohort_name}
//                     </span>
//                     <Badge
//                       count={
//                         <span className="flex items-center justify-center text-white !text-[10px] bg-black font-extrabold p-1 rounded-sm">
//                           {c?.price?.toLocaleString()} Tsh
//                         </span>
//                       }
//                     />
//                   </div>
//                   <div className="text-[10px] text-opacity-10">
//                     {c?.description}
//                   </div>
//                   <div className="flex gap-2">
//                     <div className="flex border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
//                       <FaRegClock size={10} />
//                       <span>{c?.total_weeks} Weeks</span>
//                     </div>
//                     <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
//                       <LuUsers size={10} />
//                       <span>{c?.total_enrolled_students} Enrolled</span>
//                     </div>
//                     <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
//                       <GoBook size={10} />
//                       <span>Starts {c?.start_date}</span>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => handleEnroll(c?.cohort_id)}
//                     className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs"
//                   >
//                     Enroll Now
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           />
//         </Card>
//       ))}
//     </div>
//   );
// };


"use client";
import {
  StarFilled, UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card, Button, Skeleton, Tooltip, Modal, Rate, Col, Row, Typography, Divider, List, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCallback } from "react";
import { BsGlobe } from "react-icons/bs";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoVerified, GoBook } from "react-icons/go";
import { GoShieldCheck } from "react-icons/go";
import { LuEye, LuMessageSquare, LuUsers } from "react-icons/lu";
import { TbMessage } from "react-icons/tb";

import { PREVIEW_CHAT_KEY } from "@/src/config/settings";
import { img_base_url } from '@/src/config/settings';
import { useChat } from "@/src/hooks/chat/useChat";
import { useReviews } from "@/src/hooks/data/useReviews";
import { useUser } from "@/src/hooks/data/useUser";
import { useNewClass } from "@/src/store/student/class";
import { useEnrollMe } from "@/src/store/student/useEnrollMe";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { encrypt } from "@/src/utils/fns/encryption";
import useChatStore from "@/src/store/chat/chat";





const { Title, Text, Paragraph } = Typography;

const InstructorSearchResult = ({ details }) => {
  const { setEnrollMe, setEnrollCohort } = useEnrollMe();
  const { setOpenNewClass } = useNewClass();
  const { setCurrentChatId, setPreviewChat } = useChatStore();
  const { chats } = useChat();
  const { user } = useUser();
  const router = useRouter();
  const [openReviewsModal, setOpenReviewsModal] = useState(false);
  const [instructorId, setInstructorId] = useState();

  const { instructorReviews, instructorSummary, isInstructorSummaryPending, isInstructorReviewsPending } = useReviews(null, details.instructor_id);

  const handleEnroll = (idx) => {
    setEnrollMe(true);
    setEnrollCohort(idx);
  };

  const navigateToChat = (chatId) => {
    setCurrentChatId(chatId);
    router.push(`/${user?.role}/social`);
    setOpenNewClass(false);
  };

  const setExistingChat = () => {
    const existingChat = chats.find(
      (chat) =>
        chat.created_by === user?.id &&
        chat.participants.some((p) => p.user.id === details?.id)
    );

    if (existingChat) {
      navigateToChat(existingChat.id);
      return true;
    }
    return false;
  };

  const createPreviewChat = () => {
    const names = details?.name.split(" ");
    const preview_chat = {
      first_name: names[0],
      last_name: names[1],
      recepient_id: details?.id,
    };

    setPreviewChat(preview_chat);
    navigateToChat("preview");
  };

  let makeChat = () => {
    if (setExistingChat()) {
      return;
    }
    createPreviewChat();
  };

  const closeModal = () => {
    setOpenReviewsModal(false);
  }

  useCallback(() => {
    console.log(details);
  }, [details]);


  console.log("Reviews:", instructorReviews)
  console.log("Summary of it:", instructorSummary)
  console.log("Deatils", details)


  const dummyReviews = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentAvatar: null,
      rating: 5,
      subject: "Mathematics",
      reviewText: "Excellent teacher! Makes complex concepts easy to understand. Very patient and always willing to help during office hours.",
      date: "2024-06-15",


    },
    {
      id: 2,
      studentName: "Michael Chen",
      studentAvatar: null,
      rating: 4,
      subject: "Mathematics",
      reviewText: "Good teaching style and clear explanations. Assignments are fair and tests are reasonable. Would recommend to other students.",
      date: "2024-06-10",


    },
    {
      id: 3,
      studentName: "Emma Rodriguez",
      studentAvatar: null,
      rating: 5,
      subject: "Advanced Calculus",
      reviewText: "One of the best professors I've had! Very knowledgeable and passionate about the subject. Creates a supportive learning environment.",
      date: "2024-05-28",


    },
    {
      id: 4,
      studentName: "David Kim",
      studentAvatar: null,
      rating: 3,
      subject: "Statistics",
      reviewText: "Decent teacher but sometimes goes too fast through material. Office hours are helpful though.",
      date: "2024-05-20",


    },
    {
      id: 5,
      studentName: "Jessica Martinez",
      studentAvatar: null,
      rating: 5,
      subject: "Linear Algebra",
      reviewText: "Amazing professor! Very organized, clear lectures, and fair grading. Really cares about student success.",
      date: "2024-05-15",


    }
  ];

  const handleViewReviews = () => {
    setOpenReviewsModal(true);
  }

  const averageRating = dummyReviews.reduce((sum, review) => sum + review.rating, 0) / dummyReviews.length;

  // Count ratings by star
  const ratingCounts = dummyReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});


  return (
    <div className="w-full max-w-full mx-auto space-y-4 sm:space-y-6 lg:space-y-8 text-xs overflow-hidden p-3 md:p-12">
      {/* Stats Header - Fully Responsive */}
      <div className="bg-black backdrop-blur-md rounded-full py-2 sm:py-3 px-2 sm:px-4 lg:px-6 flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
          <FaUsers size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="whitespace-nowrap text-[10px] sm:text-xs truncate">
            {details.student_count}
            <span className="hidden xs:inline"> Students</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
          <FaStar size={12} className="sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs whitespace-nowrap">
            {4.5}
            <span className="hidden md:inline"> ({60})</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
          <FaClock size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs whitespace-nowrap truncate">
            2h
            <span className="hidden sm:inline"> avg</span>
          </span>
        </div>
      </div>

      {/* Main Profile Card */}
      <Card className="!text-[10px] sm:!text-xs !transition-all !duration-300 hover:!shadow-lg hover:!scale-[1.01] !overflow-hidden">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Header with Avatar and Name */}
          <div className="flex items-start gap-2 sm:gap-3">
            <Avatar
              className="!bg-transparent/90 flex-shrink-0 !w-8 !h-8 sm:!w-10 sm:!h-10 lg:!w-12 lg:!h-12 transition-transform duration-300 hover:scale-110"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
            />

            <div className="min-w-0 flex-1 space-y-1 sm:space-y-2">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-extrabold capitalize text-xs sm:text-sm lg:text-base truncate">
                    {details?.name}
                  </span>
                  <Badge
                    count={
                      <span className="flex items-center text-white bg-blue-500 rounded-full">
                        <GoVerified size={12} className="sm:w-4 sm:h-4" />
                      </span>
                    }
                  />
                </div>

                <Badge
                  count={
                    <div className="!text-[8px] sm:!text-[10px] !flex !justify-center !items-center !gap-1 rounded-full bg-yellow-500 !px-1 sm:!px-2 !py-1 !text-white !font-extralight whitespace-nowrap">
                      <FaRegStar size={8} className="sm:w-3 sm:h-3" />
                      <span className="hidden xs:inline">Top Rated</span>
                      <span className="xs:hidden">Top Rated</span>
                    </div>
                  }
                />
                <Badge
                  onClick={handleViewReviews}
                  className="!cursor-pointer"
                  count={
                    <div className="!text-[8px] sm:!text-[10px] !flex !justify-center !items-center !gap-1 rounded-full bg-black !px-1 sm:!px-2 !py-1 !text-white !font-extralight whitespace-nowrap">
                      <LuEye size={8} className="sm:w-3 sm:h-3" />
                      <span className="xs:inline">View reviews</span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-2 sm:space-y-3">
            <p className="line-clamp-2 sm:line-clamp-3 text-[10px] sm:text-xs leading-relaxed">
              {details?.bio}
            </p>
          </div>

          {/* Achievement Badges - Fully Responsive */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 text-[12px] sm:text-[14px]">
            <div className="rounded-lg bg-gray-50 flex items-center justify-center py-1 sm:py-2 px-2 sm:px-3 gap-1 sm:gap-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105">
              <FaRegStar size={14} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <span className="truncate">Top Rated</span>
            </div>
            <div className="rounded-lg bg-gray-50 flex items-center justify-center py-1 sm:py-2 px-2 sm:px-3 gap-1 sm:gap-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105">
              <FaRegMessage size={14} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <span className="truncate">Quick</span>
            </div>
            <div className="rounded-lg bg-gray-50 flex items-center justify-center py-1 sm:py-2 px-2 sm:px-3 gap-1 sm:gap-2 transition-all duration-200 hover:bg-gray-100 hover:scale-105 xs:col-span-2 lg:col-span-1">
              <GoShieldCheck size={14} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <span className="truncate">Expert</span>
            </div>
          </div>

          {/* Subjects and Chat - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {details?.subjects?.slice(0, 6).map((sub, index) => (
                  <Badge
                    key={index}
                    count={
                      <div className="bg-black text-white text-[8px] sm:text-[10px] px-1 sm:px-2 py-1 rounded-sm truncate max-w-[120px] transition-all duration-200 hover:scale-105">
                        {sub?.name}
                      </div>
                    }
                  />
                ))}
                {details?.subjects?.length > 6 && (
                  <Badge
                    count={
                      <div className="bg-gray-600 text-white text-[8px] sm:text-[10px] px-1 sm:px-2 py-1 rounded-sm">
                        +{details.subjects.length - 6}
                      </div>
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex-shrink-0 flex justify-center sm:justify-end">
              <Tooltip title={`Chat with ${details?.name}`}>
                <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-110 cursor-pointer">
                  <TbMessage
                    className="text-lg sm:text-xl"
                    onClick={makeChat}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>


      {/* Review Modal */}
      <Modal
        open={openReviewsModal}
        onCancel={closeModal}
        onOk={closeModal}
        width={800}

        title={
          <div className="w-full flex justify-center">
            <Title level={4} style={{ margin: 0 }}>
              Reviews for {details?.name}
            </Title>
          </div>
        }
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >

        <div className="w-full flex justify-center">
          <Row justify="center" align="middle">
            <Col span={24}>
              <div style={{ textAlign: 'center' }}>
                <Title level={2} style={{ margin: 0, color: '#faad14' }}>
                  {Number(instructorSummary?.average_rating || 0).toFixed(1)}
                </Title>

                <Rate disabled defaultValue={instructorSummary?.average_rating} />
                <div>
                  <Text type="secondary">Based on {instructorReviews?.length} reviews</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Reviews List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <List
            itemLayout="vertical"
            dataSource={instructorReviews}
            renderItem={(review) => (
              <List.Item
                key={review.id}
                style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px'
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar
                    src={review.student_profile_picture && `${img_base_url + review.student_profile_picture}`}
                    size={window.innerWidth < 640 ? 36 : 48}
                    icon={<UserOutlined />}
                    className="bg-gradient-to-r flex-shrink-0"
                  />}
                  title={
                    <Space>
                      <Text strong>{review.student_name}</Text>
                    </Space>
                  }
                  description={
                    <Space>
                      <Rate disabled defaultValue={review.rating} size="small" />
                      <Text type="secondary">
                        <CalendarOutlined /> {review.created_at}
                      </Text>
                    </Space>
                  }
                />
                <Paragraph style={{ marginTop: 8 }}>
                  {review.comment}
                </Paragraph>

              </List.Item>
            )}
          />
        </div>
      </Modal>


      {/* Topics and Cohorts */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {details?.topics?.map((topic, index) => (
          <Card
            key={index}
            className="[&_.ant-card-body]:!p-2 md:[&_.ant-card-body]:!p-4 !text-black !text-[10px] sm:!text-xs !transition-all !duration-300 hover:!shadow-lg hover:!scale-[1.01] !overflow-hidden"
          >
            {/* Topic Header */}
            <div className="flex gap-2 sm:gap-3 items-start mb-3 sm:mb-4">
              <div className="bg-gray-100 !text-black p-2 sm:p-2 rounded-lg flex-shrink-0 transition-colors duration-200 hover:bg-gray-200">
                <BsGlobe size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="font-bold capitalize text-xs sm:text-sm lg:text-base truncate">
                  {topic?.topic?.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">
                  {topic?.topic?.description}
                </p>
              </div>
            </div>

            {/* Cohorts */}
            <div className="space-y-2 sm:space-y-3">
              {topic?.cohorts?.map((cohort, cohortIndex) => (
                <div
                  key={cohort?.cohort_id}
                  className="bg-[#001840]/5 rounded-md p-4 sm:p-6 space-y-2 sm:space-y-3 transition-all duration-200 hover:bg-[#001840]/10"
                >
                  {/* Cohort Header */}
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-2">
                    <h4 className="text-xs sm:text-sm font-black flex-1 min-w-0">
                      {cohort?.cohort_name}
                    </h4>
                    <Badge
                      count={
                        <span className="flex items-center justify-center text-white !text-[10px] sm:!text-xs bg-black font-extrabold px-1 sm:px-2 py-1 rounded-sm whitespace-nowrap">
                          {cohort?.price?.toLocaleString()} Tsh
                        </span>
                      }
                    />
                  </div>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-gray-700 line-clamp-4">
                    {cohort?.description}
                  </p>

                  {/* Cohort Stats */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                    <div className="flex border border-black/10 bg-white px-2 py-1 items-center justify-center text-[8px] sm:text-[10px] rounded-sm gap-1 font-bold transition-all duration-200 hover:bg-gray-50">
                      <FaRegClock size={8} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">{cohort?.total_weeks}w</span>
                    </div>
                    <div className="flex border border-black/10 bg-white px-2 py-1 items-center justify-center text-[8px] sm:text-[10px] rounded-sm gap-1 font-bold transition-all duration-200 hover:bg-gray-50">
                      <LuUsers size={8} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">{cohort?.total_enrolled_students}</span>
                    </div>
                    <div className="flex border border-black/10 bg-white px-2 py-1 items-center justify-center text-[8px] sm:text-[10px] rounded-sm gap-1 font-bold transition-all duration-200 hover:bg-gray-50 xs:col-span-2 sm:col-span-1">
                      <GoBook size={8} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">{cohort?.start_date}</span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <Button
                    onClick={() => handleEnroll(cohort?.cohort_id)}
                    className="!w-full !bg-black !text-white !border-transparent hover:!border-transparent !text-[10px] sm:!text-xs !py-1 sm:!py-2 !transition-all !duration-200 hover:!bg-gray-800 hover:!scale-[1.02] hover:!shadow-md"
                  >
                    Enroll Now
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const InstructorSearchResultSkeleton = () => {
  return (
    <div className="flex flex-col gap-6  py-6">
      <Skeleton.Node
        active={true}
        className="!w-full !rounded-full !h-[3rem]"
      />
      <Card>
        <Card.Meta
          title={
            <div className="flex gap-3 items-center">
              <Skeleton.Avatar size={50} active={true} />
              <div className="flex gap-2 items-center justify-center">
                <Skeleton.Node active={true} className="!h-6 !w-36" />
                <Skeleton.Avatar active={true} size={20} />
                <Skeleton.Node active={true} className="!h-4 !w-20" />
              </div>
            </div>
          }
        />

        <div className="!mt-4">
          <Skeleton
            title={false}
            paragraph={{
              rows: 3,
              width: ["80%", "100%", "100%"],
            }}
            active={true}
          />
        </div>

        <div className="!flex !mt-4 !gap-2 !flex-wrap">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Node
                key={index}
                className="!h-[1.5rem] !w-[8rem]"
                active={true}
              />
            ))}
        </div>
        <div className="!flex !mt-4 !gap-2 !flex-wrap">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Node
                key={index}
                className="!h-[1rem] !w-[5rem]"
                active={true}
              />
            ))}
        </div>
      </Card>
      <Card className="flex flex-col gap-5">
        <div className="m-2 flex gap-3">
          <Skeleton.Avatar shape="circular" active={true} size={60} />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton
              active={true}
              paragraph={{
                rows: 2,
                width: ["80%", "60%"],
              }}
              title={false}
            />
          </div>
        </div>

        <div className="space-y-8 mt-6">
          {Array(2)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: ["50%", "80%"],
                  }}
                  title={false}
                />

                <div className="!flex !gap-2 !flex-wrap">
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton.Node
                        key={index}
                        className="!h-[1rem] !w-[4rem]"
                        active={true}
                      />
                    ))}
                </div>
                <Skeleton.Button active={true} className="!w-full" />
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export { InstructorSearchResult, InstructorSearchResultSkeleton };
