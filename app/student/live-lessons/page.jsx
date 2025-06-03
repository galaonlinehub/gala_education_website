"use client";

import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { img_base_url } from "@/src/config/settings";
import { useUpcomingLessons } from "@/src/hooks/useUpcomigLessons";
import { Avatar, Button, Card, Collapse, Modal, Tag } from "antd";
import React, { useState } from "react";
import {
  LuCalendar,
  LuClock,
  LuUsers,
  LuVideo,
  LuInfo,
  LuFolderOpen,
  LuUser,
  LuCheckCheck,
  LuX,
} from "react-icons/lu";
import { useLesson } from "@/src/hooks/useLesson";
import { encrypt } from "@/src/utils/fns/encryption";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import { sessionStorageFn } from "@/src/utils/fns/client";

const { Panel } = Collapse;

const ClassCard = ({ classData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const { lessonToken, lessonTokenPending, getLessonToken } = useLesson();

  const showConfirmModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("console:.", classData);

  const handleJoin = async () => {

    const lessonToken = await getLessonToken(classData.link);
    const lessonId = `${classData.lesson_id}`;
    const roomName = `${classData.class_name}`;
    const userName = `${user?.first_name} ${user?.last_name}`;
    const userEmail = `${user?.email}`;
    const isModerator = user?.role == 'instructor' ? 'true' : 'false';

    const encryptedLesssonToken = encrypt(lessonToken);
    const encryptedModeratorvalue = encrypt(isModerator);
    const encryptedLessonId = encrypt(lessonId);

    const encryptedRoomName = encrypt(roomName);
    const encryptedUserName = encrypt(userName);
    const encryptedUserEmail = encrypt(userEmail);

    sessionStorageFn.set("lessonToken", encryptedLesssonToken);
    sessionStorageFn.set("isModerator", encryptedModeratorvalue);
    sessionStorageFn.set("lessonId", encryptedLessonId);

    router.push(`/gala-meet?room=${encryptedRoomName}&name=${encryptedUserName}&email=${encryptedUserEmail}`);

    setIsModalOpen(false);

  };


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
            onClick={showConfirmModal}
            target="_blank"
            className={`!bg-[#001840] !text-white !font-medium !rounded-md !px-4 !py-1 !h-auto !border-none transition-transform duration-200 ${isHovered ? "!scale-105 !bg-[#003380]" : ""
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
            className={`h-5 w-5 text-[#001840] transition-transform ${isActive ? "rotate-180" : ""
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
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
        closeIcon={<LuX className="text-gray-500 hover:text-gray-700" />}
        className="confirm-join-modal"
      >
        <div className="py-4">

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <LuVideo className="text-4xl text-[#001840]" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-center mb-2">
            Join Live Class
          </h3>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="font-medium text-gray-800 mb-2">
              {classData.class_name}: {classData.topic}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <LuCalendar className="flex-shrink-0" />
              <span>{classData.date}, {classData.time}</span>
            </div>
          </div>

          <p className="text-gray-600 text-xs lg:text-sm text-center mb-6">
            You&apos;re about to join a live interactive session. Make sure your camera and microphone are working properly.
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleCancel}
              className="!border-gray-300 !text-gray-700 !px-5 !h-10 !rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleJoin}
              className="!bg-[#001840] !border-none !text-white !px-5 !h-10 !rounded-md !flex !items-center !gap-1"
              icon={<LuCheckCheck />}
            >
              Confirm & Join
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

const LiveLessons = () => {
  const {
    upcomingLessons,
    isFetchingUpcomingLessons,
    isLoadingUpcomingLessons,
  } = useUpcomingLessons();

  return (
    <div className="w-full py-4">
      <div className="flex flex-col justify-center gap-1 mb-4 w-full">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg md:text-2xl text-[#001840] tracking-tight">
            Live Learning Center
          </span>
        </div>
        <div className="text-xs md:text-sm text-gray-600 leading-relaxed w-full md:max-w-4xl">
          Participate in Live, Interactive Classes Delivered in Real Time with
          Dynamic Lessons and Engaging Discussions
        </div>
      </div>
      <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex w-full justify-center py-3 md:py-12">
            <div className="flex justify-center items-center bg-white rounded-full shadow-md w-fit p-1 shadow-gray-400">
              <SlickSpinner color="#001840" size={26} />
            </div>
          </div>
        ) : isLoadingUpcomingLessons ? (
          <div className="flex w-full justify-center py-3 md:py-24">
            <svg
              class="size-14 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                opacity="0.25"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                stroke-width="4"
              />
            </svg>
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
