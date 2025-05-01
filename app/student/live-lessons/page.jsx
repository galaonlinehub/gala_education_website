"use client";

import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { img_base_url } from "@/src/config/settings";
import { useUpcomingLessons } from "@/src/hooks/useUpcomigLessons";
import { Avatar, Button, Card, Collapse, Tag } from "antd";
import React, { useState } from "react";
import {
  LuCalendar,
  LuClock,
  LuUsers,
  LuVideo,
  LuInfo,
  LuFolderOpen,
  LuUser,
} from "react-icons/lu";

const { Panel } = Collapse;

const ClassCard = ({ classData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="!flex !flex-col !w-full !shadow-sm hover:!shadow-md !rounded-xl !bg-white [&_.ant-card-body]:!p-2 md:[&_.ant-card-body]:!p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tag
        color="#001840"
        className="!text-white !font-medium !rounded-full !px-2 !py-0.5 !mb-2 !inline-flex !items-center !gap-1"
      >
        <LuClock className="h-3 w-3 text-yellow-300" />
        {classData.status}
      </Tag>
      <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-8 py-1">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-12">
          <div className="min-w-[140px]">
            <span className="text-base font-semibold leading-tight">
              {classData.class_name}: {classData.topic}
            </span>
            <div className="text-[10px] text-gray-600 flex items-center gap-1">
              <span>by</span>
              <Avatar
                size={24}
                src={
                  classData.instructor_image
                    ? `${img_base_url}${classData.instructor_image}`
                    : undefined
                }
                icon={!classData.instructor_image && <LuUser color="black" />}
              />
              <span className="italic">{classData.instructor}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LuCalendar className="h-5 w-5 text-[#001840] flex-shrink-0" />
            <div>
              <span className="text-xs text-gray-500">Date & Time</span>
              <p className="text-xs font-medium text-gray-800">
                {classData.date}, {classData.time} ({classData.duration})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LuUsers className="h-5 w-5 text-[#001840] flex-shrink-0" />
            <div>
              <span className="text-xs text-gray-500">Enrolled</span>
              <p className="text-xs font-medium text-gray-800">
                {classData.enrolled} students
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            type="primary"
            href={classData.link}
            target="_blank"
            className={`!bg-[#001840] !text-white !font-medium !rounded-md !px-4 !py-1 !h-auto !border-none transition-transform duration-200 ${
              isHovered ? "!scale-105 !bg-[#003380]" : ""
            }`}
            icon={<LuVideo />}
          >
            Join
          </Button>
        </div>
      </div>

      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <LuInfo
            className={`h-5 w-5 text-[#001840] transition-transform ${
              isActive ? "rotate-180" : ""
            }`}
          />
        )}
        className="!bg-transparent"
        items={[
          {
            key: "1",
            label: "More Details",
            children: (
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Description:</strong> {classData?.description}
                </p>
                <p className="mt-1">
                  <strong>Prerequisites:</strong> {classData?.prerequisites}
                </p>
              </div>
            ),
            className: "!text-[#001840] !font-medium",
          },
        ]}
      />
    </Card>
  );
};

const LiveLessons = () => {
  const { upcomingLessons, isFetchingUpcomingLessons } = useUpcomingLessons();

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-center gap-1 mb-4">
        <div className="flex items-center gap-2">
          {/* <LuVideo className="text-2xl md:text-4xl text-[#001840] flex-shrink-0" /> */}
          <span className="font-semibold text-lg md:text-2xl text-[#001840] tracking-tight">
            Live Learning Center
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-4xl px-2">
          Participate in Live, Interactive Classes Delivered in Real Time with
          Dynamic Lessons and Engaging Discussions
        </p>
      </div>
      <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex justify-center items-center py-24 lg:py-32">
            <SlickSpinner color="#001840" size={60} />
          </div>
        ) : upcomingLessons.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-24">
            <LuFolderOpen color="#001840" size={48} />
            <span className="text-gray-500 text-center text-sm md:text-base">
              You currently have no upcoming lessons scheduled
            </span>
          </div>
        ) : (
          upcomingLessons.map((classData) => (
            <ClassCard key={classData.key} classData={classData} />
          ))
        )}
      </div>
    </div>
  );
};

export default LiveLessons;
