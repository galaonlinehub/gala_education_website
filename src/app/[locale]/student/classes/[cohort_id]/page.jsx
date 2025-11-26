"use client";
import { StarOutlined } from "@ant-design/icons";
import { Card, Avatar, message, Modal, Button, Divider, Input } from "antd";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import {
  LuArrowLeft,
  LuBell,
  LuBookText,
  LuCalendar,
  LuCheck,
  LuClock4,
  LuDownload,
  LuFileText,
  LuPlay,
  LuUsers,
  LuVideo,
} from "react-icons/lu";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { TbMessage2 } from "react-icons/tb";

import SlickSpinner from "@/components/ui/loading/template/SlickSpinner";
import { img_base_url } from "@/config/settings";
import { useEnrolledTopics } from "@/hooks/data/useEnrolledTopics";
import { apiPost } from "@/services/api/api_service";
import { decrypt } from "@/utils/fns/encryption";

const { TextArea } = Input;

const ClassDetailsPage = ({ params }) => {
  const { cohort_id } = params;

  const searchParams = useSearchParams();
  const instructor_id = decrypt(searchParams.get("id"));

  const [_passedValue, setPassedValue] = useState("");
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [rateValue, setRateValue] = useState(null);
  const [comment, setComment] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const openRatingmodal = (value) => {
    setPassedValue(value);
    setOpenRatingModal(true);
  };

  const closeModal = () => {
    setOpenRatingModal(false);
    setRateValue(null);
    setComment("");
  };

  const handleRating = (value) => {
    setRateValue(value);
  };

  const handleSubmitRating = async () => {
    if (rateValue == null && comment == "") {
      messageApi.info(sct('please_provide_rating_or_comment'));
      return;
    }

    const response = await apiPost("/reviews", {
      type: "instructor",
      id: instructor_id,
      rating: rateValue ?? "",
      comment: comment ?? "",
    });

    setOpenRatingModal(false);
    setRateValue(null);
    setComment("");

    messageApi.success(response.data);
  };



  const router = useRouter();
  const {
    cohortDetails,
    cohortDetailsLoading,
    instructorDetails,
    instructorDetailsLoading,
    classSyllabus,
    classSyllabusFetching,
    classSchedule,

    classMaterials,

    classAssigments,

  } = useEnrolledTopics(cohort_id, instructor_id);

  const act = useTranslations('all_classes');
  const cct = useTranslations('class_creation');
  const sct = useTranslations('student_classes');
  const subt = useTranslations('subscription');
  const tdash = useTranslations('teacher_dashboard');
  const stdash = useTranslations('student_dashboard');

  return (
    <div className="min-h-screen w-full">
      {contextHolder}
      <div className="sticky bg-[#001840] top-0 inset-x-0 z-50 w-full border-b border-b-[0.8px]">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.back()}
              className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <LuArrowLeft
                strokeWidth={3}
                size={20}
                className="text-[#ffffff] hover:text-[#000000]"
              />
            </button>
            <div className="text-sm sm:text-base font-semibold text-white">
              {act('my_classes')}
            </div>
          </div>
          {/* <div className="flex items-center space-x-2">
            <button
              disabled={true}
              className="disabled:opacity-50 disabled:cursor-not-allowed text-red-600 hover:bg-red-100 disabled:hover:bg-transparent transition-colors font-bold border-[0.5px] border-red-500 rounded px-4 py-1 text-xs"
            >
              {sct('unenroll')}
            </button>
          </div> */}
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
                  <h1 className="text-lg font-bold text-gray-800">
                    {cohortDetails?.topic_title}
                  </h1>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">
                    {cohortDetails?.topic_description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs md:text-sm font-medium text-gray-800">
                    {sct('your_progress')}:{" "}
                    <span className="text-[#001840] font-semibold">
                      {cohortDetails?.percentage_completion}%
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {sct('next_class')}:{" "}
                    <span className="font-medium text-[#001840]">
                      {classSchedule?.nextClass?.countdown}
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#001840] rounded-full"
                    style={{ width: `${cohortDetails.percentage_completion}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4 space-y-6">
            <Card className="">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-[#001840]">
                  {sct('next_class')}
                </h3>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">
                  {classSchedule?.nextClass?.countdown}
                </span>
              </div>
              <h4 className="text-sm md:text-base font-bold text-blue-900 mb-2">
                {classSchedule?.nextClass?.topic}
              </h4>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  <LuCalendar className="mr-2 text-blue-900" />
                  <span className="text-blue-900 font-light">{classSchedule?.nextClass?.date}</span>
                </div>
                <div className="flex items-center">
                  <LuClock4 className="mr-2 text-blue-900" />
                  <span className="text-blue-900 font-light">{classSchedule?.nextClass?.time}</span>
                </div>
              </div>
            </Card>

            <Card className="">
              <h3 className="text-sm font-semibold text-[#001840] mb-4">
                {sct('about_this_class')}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {cohortDetails?.topic_description}
              </p>

              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="text-xs md:text-sm font-medium text-[#001840] mb-2">
                    {cct('schedule')}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <LuCalendar className="text-[#001840] mr-2" />
                      <span className="text-xs md:text-sm">
                        {classSchedule?.startDate} - {classSchedule?.endDate}
                      </span>
                    </div>
                    {classSchedule?.sessions.map((session, index) => (
                      <div key={index} className="flex items-center">
                        <LuClock4 className="text-[#001840] mr-2" />
                        <span className="text-xs md:text-sm">
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
                <h3 className="text-sm font-semibold text-[#001840]">
                  {sct('course_syllabus')}
                </h3>

                <div className="flex items-center text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md">
                  <span className="text-xs md:text-sm">
                    {sct('week')} {classSyllabus?.find((w) => w.current)?.week} {sct('of')}{" "}
                    {classSyllabus?.length}
                  </span>
                </div>
              </div>

              {classSyllabusFetching ? (
                <div className="flex items-center justify-center w-full h-56">
                  <SlickSpinner color="blue" size={28} />
                </div>
              ) : (
                <div className="relative">

                  {/* Vertical timeline line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-6 pl-8">
                    {classSyllabus?.map((week, index) => (
                      <div
                        key={index}
                        className={`relative ${week.current ? "mb-8" : ""}`}
                      >
                        {/* Week Circle Indicator */}
                        <div
                          className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center
                ${week.completed
                              ? "bg-green-100 text-green-600"
                              : week.current
                                ? "bg-blue-100 text-blue-600 ring-4 ring-blue-50"
                                : week.past
                                  ? "bg-gray-300 text-gray-700" // PAST
                                  : "bg-gray-100 text-gray-400" // FUTURE
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

                        {/* Week Content */}
                        <div
                          className={`${week.current
                              ? "bg-blue-50 rounded-lg p-4 border border-blue-100"
                              : ""
                            }`}
                        >
                          <h4 className="text-xs md:text-sm font-semibold text-gray-800">
                            {sct('week')} {week.week}
                          </h4>

                          <p
                            className={`${week.current
                                ? "text-blue-700 font-medium text-xs md:text-sm"
                                : week.past
                                  ? "text-gray-500 line-through text-xs md:text-sm" // PAST TEXT STYLE
                                  : "text-gray-600 text-xs md:text-sm"
                              }`}
                          >
                            {week.topic}
                          </p>

                          {/* Current Week Actions */}
                          {week.current && (
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {subt('current')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>


            {/* Course Materials Section */}
            <Card className="">
              <h3 className="text-sm font-semibold text-[#001840] mb-6">
                {sct('class_materials')}
              </h3>
              <div className="grid gap-4">
                {classMaterials?.length === 0 ? (
                  <div className="text-gray-400 text-xs">
                    {sct('no_materials_provided')}
                  </div>
                ) : (
                  classMaterials?.map((material, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#001840] text-white rounded-lg mr-4 group-hover:scale-105 transition-transform">
                          {material?.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {material?.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {material?.type.toUpperCase()} • Added Feb 15, 2025
                          </div>
                        </div>
                      </div>
                      <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-[#001840] hover:bg-[#001840] hover:text-white transition-colors">
                        <LuDownload />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Assignments Section */}
            <Card className="">
              <h3 className="text-sm font-semibold text-[#001840] mb-6">
                {sct('assignments')}
              </h3>

              <div className="mb-6">
                <h4 className="font-normal text-sm text-gray-800 mb-4 flex items-center">
                  {/* <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div> */}
                  {sct('upcoming_assignments')}
                </h4>
                <div className="grid gap-3">
                  {classAssigments?.length === 0 ? (
                    <div className="text-gray-400 text-xs">
                      {sct('no_assignments')}
                    </div>
                  ) : (
                    classAssigments?.assignments
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
                                {sct('due')} {assignment.dueDate}
                              </div>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 text-sm bg-[#001840] text-white rounded-md hover:bg-[#001840]/90 transition-colors">
                            {tdash('start')}
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>

              <Modal
                open={openRatingModal}
                onCancel={closeModal}
                onOk={closeModal}
                footer={[
                  <Button key="cancel" onClick={closeModal}>
                    {act('close')}
                  </Button>,
                  <Button
                    className="!bg-[#001840] !text-white"
                    key="sbmit"
                    onClick={() => handleSubmitRating()}
                  >
                    {sct('submit')}
                  </Button>,
                ]}
              >
                <Divider>
                  <div className="flex justify-center gap-2">
                    <span className="font-light">{sct('rate')}</span>
                    <span className="font-bold">{instructorDetails?.name}</span>
                  </div>
                </Divider>

                <div className="flex flex-col justify-center text-center items-center">
                  <p className="text-sm">
                    {sct('rate_teacher_instruction')}
                  </p>
                  <div className="w-full mt-3 flex gap-2 items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star, index) => {
                      const isActive = star <= rateValue;
                      const StarIcon = isActive ? PiStarFill : PiStarLight;
                      return (
                        <StarIcon
                          key={index}
                          size={40}
                          color={isActive ? "#ffdf00" : "gray"}
                          onClick={() => handleRating(star)}
                          style={{ cursor: "pointer" }}
                        />
                      );
                    })}
                  </div>
                  <div className="w-full mt-5 flex">
                    <TextArea
                      rows={4}
                      name="student_comment"
                      placeholder={sct('write_your_comment_here')}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </Modal>

            </Card>

            {/* Announcements Section */}
            <Card className="">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-[#001840]">
                  {sct('announcements')}
                </h3>
              </div>

              <div className="space-y-4">
                {classMaterials?.length === 0 ? (
                  <div className="text-gray-400 text-xs">
                    {sct('no_announcements')}
                  </div>
                ) : (
                  classMaterials?.map((announcement, index) => {
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
                  })
                )}
              </div>
            </Card>
          </div>

          <div className="md:col-span-1 flex flex-col gap-4 space-y-6">
            <Card className="overflow-hidden !space-y-3">
              {instructorDetailsLoading ? (
                <div className="h-28 flex justify-center items-center">
                  <SlickSpinner color="blue" size={15} />
                </div>
              ) : (
                <div className="w-full flex items-center flex-col">
                  <Avatar
                    size={72}
                    className="!bg-transparent/90 mb-4"
                    src={`${img_base_url}${instructorDetails?.image}`}
                  />

                  <div className="flex items-center flex-col">
                    <h4 className="font-semibold text-sm text-gray-800">
                      {instructorDetails?.name}{" "}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 mb-4 line-clamp-6">
                      {instructorDetails?.bio}{" "}
                    </p>

                    <div className="space-y-3">
                      <button
                        className={`w-full px-4 py-2.5 rounded-md flex items-center cursor-pointer justify-center font-medium text-sm bg-[#001840] text-white`}
                      >
                        <TbMessage2 className="mr-2 flex-shrink-0" />
                        <div className="text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                          {sct('message_instructor')}
                        </div>
                      </button>
                      <button
                        onClick={() => openRatingmodal("Teacher")}
                        className={`w-full px-4 py-2.5 rounded-md flex items-center cursor-pointer justify-center font-medium text-sm bg-[#001840] text-white`}
                      >
                        <StarOutlined className="mr-2 flex-shrink-0" />
                        <div className="text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                          {sct('rate_instructor')}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Course Stats Card */}
            {/* <Card className="">
              <p className="text-lg font-semibold text-[#001840] mb-4">
                {sct('course_stats')}
              </p>

              <div className="my-3 text-gray-400">
                {sct('cohort_statistics_info')}
              </div>
              
            </Card> */}

            {/* Recent Activity Card */}
            <Card className="">
              <p className="text-sm font-semibold text-[#001840] mb-4">
                {stdash('recent_activities')}
              </p>

              <p className="text-gray-400 text-xs">
                {stdash('no_recent_activity')}
              </p>
              
            </Card>

            {/* Class Resources Quick Links */}
            <Card className="">
              <h3 className="text-sm font-semibold text-[#001840] mb-4">
                {stdash('quick_links')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
               <button
                disabled
                className="
                  flex flex-col items-center justify-center
                  p-4 rounded-lg
                  bg-gray-100
                  cursor-not-allowed
                  opacity-50
                  transition
                "
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-400 mb-2">
                  <LuBookText className="text-2xl" />
                </div>
                <span className="text-xs text-gray-500 hidden sm:block text-center">
                  {sct('class_notes')}
                </span>
              </button>

              <button
                disabled
                className="
                  flex flex-col items-center justify-center
                  p-4 rounded-lg
                  bg-gray-100
                  cursor-not-allowed
                  opacity-50
                  transition
                "
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-400 mb-2">
                  <LuVideo className="text-2xl" />
                </div>
                <span className="text-xs text-gray-500 hidden sm:block text-center">
                  {sct('recordings')}
                </span>
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
