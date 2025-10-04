"use client";
import { Card, Avatar, Badge, Button, Skeleton } from "antd";
import React from "react";
import { BsGlobe } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { GoVerified, GoBook } from "react-icons/go";
import { GoShieldCheck } from "react-icons/go";
import { LuUsers } from "react-icons/lu";

import { img_base_url } from "@/config/settings";
import { useEnrollMe } from "@/store/student/useEnrollMe";
import { useEnrolledTopics } from "@/hooks/data/useEnrolledTopics"

const TopicCard = ({ classInfo }) => {
  const { setEnrollMe, setEnrollCohort } = useEnrollMe();
  const { enrolledTopics } = useEnrolledTopics();

  const handleEnroll = () => {
    setEnrollMe(true);
    setEnrollCohort(classInfo?.cohort_id);
  };

  console.log("enrolledTopicsNow", enrolledTopics);

  const isEnrolled = (cohortId) =>
    enrolledTopics?.some((topic) => topic.cohort_id === cohortId);

  return (
    <Card
      loading={false}
      className="!text-black !text-[12px] hover:shadow-lg transition-all !self-center !mb-3"
    >
      <Card.Meta
        title={
          <div className="flex gap-2 items-center">
            <div className="bg-[#001840] !text-white p-2 rounded-lg">
              <BsGlobe size={20} />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-base">
                  {classInfo?.cohort_name}
                </span>
                <span className="text-[10px] text-gray-600">
                  {classInfo?.description}
                </span>
              </div>
              <Badge>
                <span className="flex items-center justify-center text-white bg-[#001840] p-1 rounded-sm gap-1">
                  <span className="font-extrabold">Tshs</span>
                  <span className="font-black text-sm">
                    {classInfo?.price.toLocaleString()}/=
                  </span>
                </span>
              </Badge>
            </div>
          </div>
        }
        description={
          <div className="flex flex-col gap-3 mt-3">
            {/* Course Content Section */}
            <div className="!rounded-md !w-full !text-black !p-2 space-y-2">
              <div className="w-full flex justify-between items-center">
                <span className="text-[13px] font-bold capitalize">
                  {classInfo?.topic_title}
                </span>
                {/* <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar size={12} />
                  <span className="text-[10px]">4.9</span>
                </div> */}
              </div>

              <div className="text-[10px] text-gray-600">
                {classInfo?.topic_description}
              </div>

              {/* Course Stats */}
              <div className="flex gap-2">
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <FaRegClock size={10} />
                  <span>{classInfo?.total_weeks} Weeks</span>
                </div>
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <LuUsers size={10} />
                  <span>{classInfo?.total_enrolled_students} Enrolled</span>
                </div>
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <GoBook size={10} />
                  <span>Starts {classInfo?.start_date}</span>
                </div>
              </div>

              {/* Instructor Section */}
              <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Avatar
                    size={32}
                    src={
                      `${img_base_url}${classInfo?.instructor_profile_picture}` ||
                      undefined
                    }
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold capitalize">
                        {classInfo?.instructor_name}
                      </span>
                      <GoVerified className="text-blue-500" size={12} />
                    </div>
                    <span className="text-[9px] text-gray-600">
                      Cloud Computing Specialist
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <GoShieldCheck size={12} className="text-green-500" />
                    <span className="text-[9px] font-medium">
                      Verified Expert
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers size={10} className="text-gray-500" />
                    <span className="text-[9px] text-gray-600">
                      {classInfo?.instructor_total_students} Students
                    </span>
                  </div>
                </div>
              </div>


              <Button
                className={`!w-full !mt-2 !text-xs !font-bold !border-transparent hover:!border-transparent ${isEnrolled(classInfo?.cohort_id)
                    ? '!bg-gray-400 !text-gray-600 !cursor-not-allowed'
                    : '!bg-[#001840] !text-white hover:!opacity-90'
                  }`}
                onClick={handleEnroll}
                disabled={isEnrolled(classInfo?.cohort_id)}
              >
                {isEnrolled(classInfo?.cohort_id) ? 'Enrolled' : 'Enroll Now'}
              </Button>
              
            </div>
          </div>
        }
      />
    </Card>
  );
};

const TopicCardSkeleton = () => (
  <Card className="!text-black !text-[12px] !self-center !mb-3">
    <Card.Meta
      title={
        <div className="flex gap-2 items-center">
          <Skeleton.Avatar
            active
            size={24}
            shape="square"
            className="!rounded-lg"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1 w-full">
              <Skeleton.Input
                active
                size="small"
                className="!w-[200px] !h-[20px]"
              />
              <Skeleton.Input
                active
                size="small"
                className="!w-[150px] !h-[12px]"
              />
            </div>
            <Skeleton.Avatar active size={64} />
          </div>
        </div>
      }
      description={
        <div className="flex flex-col gap-3 mt-3">
          <div className="!rounded-md !w-full !text-black !p-2 space-y-2">
            <div className="w-full flex justify-between">
              <Skeleton.Input
                active
                size="small"
                className="!w-[180px] !h-[16px]"
              />
            </div>

            <Skeleton.Input active size="small" className="!w-full !h-[12px]" />

            <div className="flex gap-2">
              {[1, 2, 3].map((_, i) => (
                <Skeleton.Button
                  key={i}
                  active
                  size="small"
                  className="!w-[80px] !h-[20px]"
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Skeleton.Avatar active size={32} />
                <div className="flex flex-col gap-1">
                  <Skeleton.Input
                    active
                    size="small"
                    className="!w-[100px] !h-[12px]"
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    className="!w-[80px] !h-[10px]"
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton.Input
                  active
                  size="small"
                  className="!w-[90px] !h-[12px]"
                />
                <Skeleton.Input
                  active
                  size="small"
                  className="!w-[70px] !h-[10px]"
                />
              </div>
            </div>

            <Skeleton.Button active block className="!h-[32px] !mt-2" />
          </div>
        </div>
      }
    />
  </Card>
);

export { TopicCard, TopicCardSkeleton };
