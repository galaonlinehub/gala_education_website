"use client";
import React, { useState } from "react";
import { GoVerified, GoBook } from "react-icons/go";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { Avatar, Badge, Card, Button, Skeleton, Tooltip, Modal, Rate, Col, Row, Typography, Divider, List, Space, Tag, Timeline } from "antd";
import { FaRegStar } from "react-icons/fa";
import { FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { LuEye, LuMessageSquare, LuUsers } from "react-icons/lu";
import { useEnrollMe } from "@/src/store/student/useEnrollMe";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/data/useUser";
import { useNewClass } from "@/src/store/student/class";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { encrypt } from "@/src/utils/fns/encryption";
import { PREVIEW_CHAT_KEY } from "@/src/config/settings";
import useChatStore from "@/src/store/chat/chat";
import { useChat } from "@/src/hooks/chat/useChat";
import { TbMessage } from "react-icons/tb";
import { useCallback } from "react";
import { useReviews } from "@/src/hooks/data/useReviews";
import {
  StarFilled, UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { img_base_url } from '@/src/config/settings';
import { apiGet } from "@/src/services/api/api_service";



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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoadingCohortId, setIsLoadingCohortId] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [cohortName, setCohortName] = useState('');

  const handleEnroll = (idx) => {
    setEnrollMe(true);
    setEnrollCohort(idx);
  };

  console.log("DETAILS:..", details)

  const hasFreeTrial = user?.has_free_trial;

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

  const handleViewReviews = () => {
    setOpenReviewsModal(true);
  }

  const showLessonPlan = async (cohortId) => {
    setIsLoadingCohortId(cohortId);

    const response = await apiGet(`cohort/${cohortId}/lesson-plan`);

    setScheduleData(response.data)

    setIsLoadingCohortId(null)

    setIsModalVisible(true);
  }

  const handleLessonPlanCancel = () => {
    setIsModalVisible(false);
  };

  const handleLessonPlanOk = () => {
    setIsModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'missed':
        return '#ff4d4f';
      case 'completed':
        return '#52c41a';
      case 'upcoming':
        return '#1890ff';
      default:
        return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'missed':
        return 'Missed';
      case 'completed':
        return 'Completed';
      case 'upcoming':
        return 'Upcoming';
      default:
        return status;
    }
  };

  const handleSeeLessonPlan = (cohortId, cohortName) => {
    showLessonPlan(cohortId);
    setCohortName(cohortName)
  }



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
            {Number(instructorSummary?.average_rating || 0).toFixed(1)}
            <span className="hidden md:inline"> ({instructorReviews?.length})</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
          <FaClock size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs whitespace-nowrap truncate">
            {details?.teaching_hours}
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
              src={details.profile_picture && `${img_base_url + details.profile_picture}`}
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

          {/* Subjects and Chat - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {details?.subjects?.slice(0, 6).map((sub, index) => (
                  <Badge
                    key={index}
                    count={
                      <div className="bg-black text-white text-[8px] sm:text-[10px] px-1 sm:px-2 py-1 rounded-sm truncate max-w-[120px] transition-all duration-200 hover:scale-105">
                        {sub}
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



      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ margin: 0, color: '#001840' }}>
              📚 {cohortName}
            </Title>
            <Text type="secondary">Weekly Session Overview</Text>
          </div>
        }
        open={isModalVisible}
        onOk={handleLessonPlanOk}
        onCancel={handleLessonPlanCancel}
        width={800}
        footer={[
          <Button key="close" className="!bg-[#001840]" type="primary" onClick={handleLessonPlanOk}>
            Close
          </Button>,
        ]}
        styles={{ body: { padding: '12px' } }}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {scheduleData.map((item, index) => (
            <Card
              key={index}
              size="small"
              className={`schedule-card ${item.current ? 'current-week' : ''}`}
              style={{
                marginBottom: 16,
                border: item.current ? '2px solid #001840' : '1px solid #d9d9d9',
                boxShadow: item.current
                  ? '0 4px 12px rgba(24, 144, 255, 0.15)'
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <Row justify="space-between" align="top">
                <Col span={18}>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text strong style={{ fontSize: '16px' }}>
                        Week {item.week}
                      </Text>
                      {item.current && <Badge status="processing" text="Current" />}
                    </div>

                    <Space size="middle" wrap>
                      <Space size="small">
                        <CalendarOutlined style={{ color: '#1890ff' }} />
                        <Text>{item.date}</Text>
                      </Space>
                      <Space size="small">
                        <ClockCircleOutlined style={{ color: '#52c41a' }} />
                        <Text>{item.time}</Text>
                      </Space>
                    </Space>

                    <Space size="small">
                      <BookOutlined style={{ color: '#722ed1' }} />
                      <Text style={{ fontWeight: 500 }}>{item.subtopic}</Text>
                    </Space>

                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Duration: {item.duration}
                    </Text>
                  </Space>
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  <Tag
                    color={getStatusColor(item.status)}
                    icon={item.status === 'missed' ? <ExclamationCircleOutlined /> : null}
                    style={{ marginTop: 4 }}
                  >
                    {getStatusText(item.status)}
                  </Tag>
                </Col>
              </Row>
            </Card>
          ))}

          <Divider />

          <Row gutter={[16, 16]} style={{ textAlign: 'center' }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card size="small" style={{ backgroundColor: '#e7feff' }}>
                <Text strong>Total Sessions</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  {scheduleData.length}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card size="small" style={{ backgroundColor: '#fff1f0' }}>
                <Text strong>Missed</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#cc0000' }}>
                  {scheduleData.filter(item => item.status === 'missed').length}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
                <Text strong>Duration Each</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  {scheduleData[0]?.duration || 'N/A'}
                </div>
              </Card>
            </Col>
          </Row>
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
                      <span className="truncate">Duration: {cohort?.total_weeks}w</span>
                    </div>
                    <div className="flex border border-black/10 bg-white px-2 py-1 items-center justify-center text-[8px] sm:text-[10px] rounded-sm gap-1 font-bold transition-all duration-200 hover:bg-gray-50">
                      <LuUsers size={8} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">Enrolled: {cohort?.total_enrolled_students}</span>
                    </div>
                    <div className="flex border border-black/10 bg-white px-2 py-1 items-center justify-center text-[8px] sm:text-[10px] rounded-sm gap-1 font-bold transition-all duration-200 hover:bg-gray-50 xs:col-span-2 sm:col-span-1">
                      <GoBook size={8} className="sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate">Start date: {cohort?.start_date}</span>
                    </div>
                  </div>
                  <Button loading={isLoadingCohortId == cohort?.cohort_id} onClick={() => handleSeeLessonPlan(cohort?.cohort_id, topic?.topic?.title)} type="primary" variant="soild" className="!text-xs !bg-white !text-black !border-black !border-[0.5px] hover:!border-transparent font-semibold hover:!bg-gray-600 hover:!text-white hover:!scale-[1.02]" block>See lesson Plan</Button>

                  <Tooltip
                    title={hasFreeTrial ? "This is only available in Premium" : ""}
                  >

                    <Button
                      disabled={hasFreeTrial}
                      onClick={hasFreeTrial ? (e) => e.preventDefault() : () => handleEnroll(cohort?.cohort_id)}
                      className={`${hasFreeTrial ? '!bg-gray-300 hover:!bg-gray-400 !text-gray-500' : '!text-white'} !w-full !bg-black  !border-transparent hover:!border-transparent !text-[10px] sm:!text-xs !py-1 sm:!py-2 !transition-all !duration-200 hover:!bg-gray-800 hover:!scale-[1.02] hover:!shadow-md`}
                    >
                      Enroll Now
                    </Button>
                  </Tooltip>
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
