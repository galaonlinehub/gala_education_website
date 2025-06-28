"use client";
import React, { useState } from "react";
import {
  Card,
  Rate,
  Button,
  Typography,
  Space,
  Tag,
  Avatar,
  Divider,
  Modal,
  Input,
  message,
  Row,
  Col,
  Empty,
  Badge,
} from "antd";
import {
  EditOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LuMessageSquare, LuBook } from "react-icons/lu";

import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import { useStudentReviews } from "@/src/hooks/useStudentReviews";
import { img_base_url } from "@/src/config/settings";
import { apiPut } from "@/src/services/api_service";
import { IoChevronForwardCircle } from "react-icons/io5";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const UserReviewsInterface = () => {
  const [cohort_id, setCohortId] = useState();
  const [instructor_id, setInstructorId] = useState();

  const { enrolledTopics, enrolledTopicsLoading, enrolledTopicsError } =
    useEnrolledTopics();

  const { studentInstructorReviews, studentCohortReviews, refetchInstructorReviews, refetchCohortReviews } = useStudentReviews(cohort_id, instructor_id);

  console.log("studentInstructorReviews:..", studentInstructorReviews);
  console.log("studentCohortReviews:..", studentCohortReviews);
  console.log("enrolledTopics:..", enrolledTopics);


  const [activeTab, setActiveTab] = useState("instructor_reviews");
  const [selectedReview, setSelectedReview] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });

  const viewInstructorReviews = () => {
    setActiveTab("instructor_reviews");
    setSelectedReview(null);
  };
  const viewClassReviews = () => {
    setActiveTab("class_reviews");
    setSelectedReview(null);
  };

  const fetchCohortReviews = (cohortId) => {

    setSelectedReview(cohortId);
    setCohortId(cohortId);

  }

  const fetchInstructorReviews = (instructorId) => {

    setSelectedReview(instructorId);
    setInstructorId(instructorId);

  }

  const handleEditReview = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, comment: review.comment });
    setEditModalVisible(true);
  };

  const handleUpdateReview = async (values, id, type) => {
    const response = await apiPut(`/reviews/${type}/${id}`, values);
    if (type == 'instructor') {
      await refetchInstructorReviews();
    } else if (type == 'cohort') {
      await refetchCohortReviews();
    }

    setEditModalVisible(false);
    setEditingReview(null);
    setFormData({ rating: 0, comment: "" });
    message.success(response.data.message);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "green";
      case "Under Review":
        return "orange";
      case "Rejected":
        return "red";
      default:
        return "default";
    }
  };

  const renderInstructorReviewList = (enrolledTopics) => (
    <Row gutter={[24, 24]}>
      {enrolledTopics?.length > 0 ? (
        enrolledTopics?.map((item) => (
          <Col xs={24} lg={12} key={item.id}>
            <Card
              className="rounded-xl shadow-sm border-l-4 border-l-[#001840] !cursor-pointer"
            >
              <div className="flex gap-2 items-center mb-2">
                <Avatar
                  src={
                    item.instructor_profile_picture &&
                    `${img_base_url + item.instructor_profile_picture}`
                  }
                  size={window.innerWidth < 640 ? 36 : 48}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-r flex-shrink-0"
                />
                <div className="font-semibold text-base">
                  {item.instructor_name}
                </div>
              </div>
              <Divider />
              <div className="flex gap-1 items-center w-full justify-between">
                <div className="flex gap-2 items-center">
                  {/* <Tag color="#001840">{item.subject}</Tag> */}
                  <div className="text-blue-900 text-xs sm:text-sm font-semibold">
                    {item.topic_name}
                  </div>
                </div>
                <Button type="link" onClick={() => fetchInstructorReviews(item.instructor_id)} className="p-0 h-auto !text-[#001840] hover:text-blue-800 text-xs sm:text-sm font-semibold">
                  View Reviews <IoChevronForwardCircle size={20} className='animate-bounce-horizontal' color='#001840' />
                </Button>
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}></Col>
      )}
    </Row>
  );

  const renderCohortReviewList = (enrolledTopics) => (
    <Row gutter={[24, 24]}>
      {enrolledTopics?.length > 0 ? (
        enrolledTopics?.map((item) => (
          <Col xs={24} lg={12} key={item.id}>
            <Card
              className="rounded-xl shadow-sm border-l-4 border-l-[#001840] !cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#001840] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs md:text-sm">
                    {item.topic_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="font-semibold text-base">{item.topic_name}</div>
              </div>
              <Divider />
              <div className="flex gap-1 items-center w-full justify-between">
                <div className="flex gap-2 items-center">
                  {/* <Tag color="#001840">{item.subject}</Tag> */}
                  <div className="text-blue-900 text-xs sm:text-sm font-semibold">
                    {item.topic_name}
                  </div>
                </div>
                <Button type="link" onClick={() => fetchCohortReviews(item.cohort_id)} className="p-0 h-auto !text-[#001840] hover:text-blue-800 text-xs sm:text-sm font-semibold">
                  View Reviews <IoChevronForwardCircle size={20} className='animate-bounce-horizontal' color='#001840' />
                </Button>
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <Col span={24}></Col>
      )}
    </Row>
  );


  const renderInstructorReviewDetails = (review) => (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card hoverable className="rounded-xl shadow-lg">
          <div className="mb-4">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="!text-sm sm:!text-lg font-semibold">{review.student_name}</div>
                </div>
              </div>
              <div className="flex items-center  gap-3">
                <Rate disabled className="!text-sm sm:!text-lg" value={review.rating} />
                <div className="!text-sm sm:!text-lg">({review.rating})</div>
              </div>
            </Space>
          </div>
          <Paragraph className="!text-xs sm:!text-sm">{review.comment}</Paragraph>
          <Text className="!text-xs sm:!text-sm" type="secondary">
            <CalendarOutlined /> {review.created_at}
          </Text>
          <Divider />
          <div className="text-right">
            <Button
              type="primary"
               className="!bg-[#001840] !text-xs sm:!text-sm"
              icon={<EditOutlined />}
              onClick={() => handleEditReview(review)}
            >
              Update Evaluation
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );

  const renderCohortReviewDetails = (review) => (
   <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card hoverable className="rounded-xl shadow-lg">
          <div className="mb-4">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="!text-sm sm:!text-lg font-semibold">{review.student_name}</div>
                </div>
              </div>
              <div className="flex items-center  gap-3">
                <Rate disabled className="!text-sm sm:!text-lg" value={review.rating} />
                <div className="!text-sm sm:!text-lg">({review.rating})</div>
              </div>
            </Space>
          </div>
          <Paragraph className="!text-xs sm:!text-sm">{review.comment}</Paragraph>
          <Text className="!text-xs sm:!text-sm" type="secondary">
            <CalendarOutlined /> {review.created_at}
          </Text>
          <Divider />
          <div className="text-right">
            <Button
              type="primary"
               className="!bg-[#001840] !text-xs sm:!text-sm"
              icon={<EditOutlined />}
              onClick={() => handleEditReview(review)}
            >
              Update Evaluation
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="text-center mb-6">
            <Avatar
              size={80}
              icon={<UserOutlined />}
              className="mb-4 bg-[#001840]"
            />
            <div className="font-semibold">My Reviews</div>
            <Text className="!text-xs sm:!text-sm" type="secondary">View and update your evaluations</Text>
          </div>

          <div className="bg-white">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex w-full">
                <button
                  onClick={viewInstructorReviews}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-200 ${activeTab === "instructor_reviews"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <LuMessageSquare />
                  <span className="hidden sm:inline ">Instructor Reviews</span>
                  <span className="sm:hidden !text-xs sm:!text-sm">Instructor</span>
                  <Badge
                    className="ml-1 sm:ml-2"
                    style={{
                      backgroundColor:
                        activeTab === "instructor_reviews"
                          ? "#1890ff"
                          : "#d9d9d9",
                      color:
                        activeTab === "instructor_reviews" ? "white" : "#666",
                    }}
                  />
                </button>
                <button
                  onClick={viewClassReviews}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-200 ${activeTab === "class_reviews"
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <LuBook />
                  <span className="hidden sm:inline">Class Reviews</span>
                  <span className="sm:hidden !text-xs sm:!text-sm">Classes</span>
                  <Badge
                    className="ml-1 sm:ml-2"
                    style={{
                      backgroundColor:
                        activeTab === "class_reviews" ? "#1890ff" : "#d9d9d9",
                      color: activeTab === "class_reviews" ? "white" : "#666",
                    }}
                  />
                </button>
              </nav>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {activeTab === "instructor_reviews" &&
                (selectedReview && studentInstructorReviews
                  ? renderInstructorReviewDetails(studentInstructorReviews)
                  : renderInstructorReviewList(enrolledTopics))}
              {activeTab === "class_reviews" &&
                (selectedReview && studentCohortReviews
                  ? renderCohortReviewDetails(studentCohortReviews)
                  : renderCohortReviewList(enrolledTopics))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <>
            <EditOutlined /> Update Evaluation
          </>
        }
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingReview(null);
          setFormData({ rating: 0, comment: "" });
        }}
        footer={null}
        centered
      >
        {editingReview && (
          <div className="mt-4">
            <Text className="!text-xs sm:!text-sm" strong>Teacher: <span className="text-blue-600">{editingReview.reviewable_name}</span></Text>
            <div className="my-2 flex items-center gap-2">
              <Text className="!text-xs sm:!text-sm" strong>Teaching Rating:</Text>
              <Rate
                value={formData.rating}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, rating: value }))
                }
              />
            </div>
            <div className="my-2">
              <TextArea
                className="!text-xs sm:!text-sm"
                rows={4}
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
            </div>
            <div className="text-right">
              <Space>
                <Button
                 className="!text-xs sm:!text-sm"
                  onClick={() => {
                    setEditModalVisible(false);
                    setEditingReview(null);
                    setFormData({ rating: 0, comment: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="!bg-[#001840] !text-xs sm:!text-sm"
                  onClick={() => {
                    handleUpdateReview(formData, editingReview.reviewable_id, editingReview.type);
                  }}
                >
                  Update
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserReviewsInterface;
