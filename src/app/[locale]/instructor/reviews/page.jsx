"use client";
import {
  UserOutlined,
  BookOutlined,
  StarOutlined,
  MessageOutlined,
  CalendarOutlined,
  TeamOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Rate,
  Avatar,
  Badge,
  Tag,
  Divider,
  Empty,
  Button,
  Skeleton,
} from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import {
  LuArrowLeft,
  LuBook,
  LuBookA,
  LuBookImage,
  LuCalendar,
  LuLibrary,
  LuMessageSquare,
} from "react-icons/lu";

import { img_base_url } from "@/config/settings";
import { useInstructorCohorts } from "@/hooks/data/useInstructorCohorts";
import { useInstructorProfile } from "@/hooks/data/useInstructorProfile";
import { useReviews } from "@/hooks/data/useReviews";

const ReviewsAndRatings = () => {
  const [selectedClass, setSelectedClass] = useState(false);
  const [activeTab, setActiveTab] = useState("instructor_reviews");
  const [className, setClassName] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);
  const [avgRating, setAverageRating] = useState(0);

  const [cohortId, setCohortId] = useState(6);

  function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleString();
  }

  const { instructorProfile } = useInstructorProfile();

  const {
    instructorReviews,
    cohortReviews,
    isInstructorReviewsPending,
    isCohortReviewsPending,
    isInstructorReviewsError,
    isCohortReviewsError,
    instructorReviewsError,
    cohortReviewsError,
    instructorSummary,
    cohortSummary,
    isInstructorSummaryPending,
    isCohortSummaryPending,
    refetchCohortSummary,
  } = useReviews(cohortId, null);

  function countReview(InstructorCohorts) {
    let total = 0;

    InstructorCohorts.forEach((cohort) => {
      total += cohort.data.review_summary?.total_reviews || 0;
    });

    setReviewCount(total);
  }

  const { InstructorCohorts, isInstructorCohortsPending } =
    useInstructorCohorts();

  useEffect(() => {
    if (InstructorCohorts && InstructorCohorts.length > 0) {
      countReview(InstructorCohorts);
    }
  }, [InstructorCohorts]);

  const isLoading = !instructorReviews; // or use a separate loading flag if available
  const skeletonItems = Array.from({ length: 4 });

  console.log("Instructor Reviews:", instructorReviews);
  console.log("cohortReviews:", cohortReviews);
  console.log("Instructor cohorts:", InstructorCohorts);
  console.log("Instructor SUMMARY:", instructorSummary);
  console.log("Instructor Profile:", instructorProfile);

  const handleViewReviews = (
    cohort_id,
    class_name,
    topic,
    student_count,
    average_rating
  ) => {
    setSelectedClass(true);
    setCohortId(cohort_id);
    setClassName(class_name);
    setTopicTitle(topic);
    setStudentsEnrolled(student_count);
    setAverageRating(average_rating);
  };

  const viewInstructorReviews = () => {
    setActiveTab("instructor_reviews");
  };

  const viewClassReviews = () => {
    setSelectedClass(false);
    setActiveTab("class_reviews");
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const review = useTranslations('reviews')
  const stprof = useTranslations('student_profile')
  const tdash = useTranslations('teacher_dashboard')

  const renderStudentReviews = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-lg text-center w-full sm:text-xl font-semibold text-gray-800">
          {review('individual_student_feedback')}
        </h2>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {isLoading ? (
          skeletonItems.map((_, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Skeleton.Avatar active size={48} shape="circle" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton.Input active size="small" style={{ width: "60%" }} />
                  <div className="flex items-center justify-between">
                    <Skeleton.Input active size="small" style={{ width: "40%" }} />
                    <Skeleton.Input active size="small" style={{ width: 40 }} />
                  </div>
                  <Skeleton paragraph={{ rows: 2 }} active />
                  <Skeleton.Input active size="small" style={{ width: "50%" }} />
                </div>
              </div>
            </Card>
          ))
        ) : instructorReviews?.length > 0 ? (
          instructorReviews.map((review) => (
            <Card
              key={review.id}
              className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
              styles={{ body: { padding: "16px sm:24px" } }}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Avatar
                  src={
                    review.student_profile_picture &&
                    `${img_base_url + review.student_profile_picture}`
                  }
                  size={window.innerWidth < 640 ? 36 : 48}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-r flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2 sm:gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {review.student_name}
                      </h3>
                    </div>
                    <div className="text-right flex items-center gap-2 flex-shrink-0">
                      <Rate
                        disabled
                        defaultValue={review.rating}
                        className="text-[10px] sm:text-sm"
                      />
                      <div
                        className={`font-bold text-[12px] sm:text-lg ${getRatingColor(
                          review.rating
                        )}`}
                      >
                        {review.rating}.0
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                    &quot;{review.comment}&quot;
                  </p>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 pt-3 border-t gap-2">
                    <span className="text-xs flex items-center text-gray-400">
                      <LuCalendar className="mr-1" />
                      <span>{formatDateTime(review.created_at)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            <Empty description={review('no_reviews_yet')} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            {review('review_dashboard')}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
            {review('monitor_performance_feedback')}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6">
            <div className="text-center bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {instructorSummary?.average_rating == null ? (
                  0
                ) : (
                  Number(instructorSummary.average_rating).toFixed(2)
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {review('avg_instructor_rating')}
              </div>
            </div>


            <div className="text-center bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                {isInstructorCohortsPending ? (
                  <Skeleton.Input active size="small" style={{ width: 80 }} />
                ) : (
                  Number(InstructorCohorts?.length ?? 0)
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {tdash('active_classes')}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="bg-white p-3 sm:p-4 lg:p-6">
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
                <span className="hidden sm:inline">{review('instructor_reviews')}</span>
                <span className="sm:hidden">{stprof('instructor')}</span>
                <Badge
                  count={instructorReviews?.length}
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
            </nav>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {activeTab === "instructor_reviews" && renderStudentReviews()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
