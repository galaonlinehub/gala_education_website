"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Collapse, Modal, Segmented, Tag } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaVideoSlash } from "react-icons/fa6";
import {
  LuCalendar,
  LuClock,
  LuUsers,
  LuVideo,
  LuInfo,
  LuX,
  LuCheckCheck,
} from "react-icons/lu";

import { useLesson } from "@/hooks/data/useLesson";
import { useUpcomingLessons } from "@/hooks/data/useUpcomigLessons";
import { useUser } from "@/hooks/data/useUser";
import { useRouter } from "@/src/i18n/navigation";
import { sessionStorageFn } from "@/utils/fns/client";
import { encrypt } from "@/utils/fns/encryption";


const { Panel } = Collapse;

const ClassCard = ({ classData, status }) => {
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

  const handleJoin = async () => {
    const lessonToken = await getLessonToken(classData.link);
    console.log("TOKEN", lessonToken)

    const lessonId = `${classData.lesson_id}`;
    const roomName = `${classData.class_name}`;
    const userName = `${user?.first_name} ${user?.last_name}`;
    const userEmail = `${user?.email}`;
    const isModerator = user?.role == "instructor" ? "true" : "false";

    const encryptedLesssonToken = encrypt(lessonToken);
    const encryptedModeratorvalue = encrypt(isModerator);
    const encryptedLessonId = encrypt(lessonId);

    const encryptedRoomName = encrypt(roomName);
    const encryptedUserName = encrypt(userName);
    const encryptedUserEmail = encrypt(userEmail);

    sessionStorageFn.set("lessonToken", encryptedLesssonToken);
    sessionStorageFn.set("isModerator", encryptedModeratorvalue);
    sessionStorageFn.set("lessonId", encryptedLessonId);
    sessionStorageFn.set("roomName", encryptedRoomName);

    router.push(
      `/gala-meet?room=${encryptedLessonId}&name=${encryptedUserName}&email=${encryptedUserEmail}`
    );

    setIsModalOpen(false);
  };

  const lct = useTranslations('live_class');
  const act = useTranslations('all_classes');
  const cct = useTranslations('class_creation');

  const isDisabled = status === "Pending" ||
     status === "Completed" || status === "Canceled";


  return (
    <>
      <Card
        className="!flex !flex-col !w-full !rounded-xl !bg-white"
        styles={{ body: { padding: "8px", width: "100%" } }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tag
          color="#001840"
          className="!text-white !font-medium !rounded-full !px-2 !py-0.5 !mb-2 !inline-flex !items-center !gap-1"
        >
          <LuClock className="h-3 w-3 text-yellow-300" />
          {status}
        </Tag>
        <div className="flex w-full mt-4 flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 md:px-4 py-2">
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="min-w-[140px]">
              <span className="text-base font-semibold leading-tight">
                {classData.class_name}: {classData.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <LuCalendar className="h-5 w-5 text-[#001840] flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500">{lct('date_and_time')}</span>
                <p className="text-xs font-medium text-gray-800">
                  {classData.date}, {classData.time} ({classData.duration})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LuUsers className="h-5 w-5 text-[#001840] flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500">{lct('enrolled')}</span>
                <p className="text-xs font-medium text-gray-800">
                  {classData.enrolled} {act('students')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={showConfirmModal}
              target="_blank"
              className={
                `${isDisabled
                ? "!bg-[#d9dadb] !text-black" :
                "!bg-[#001840] !text-white"
                }   !font-medium !rounded-md !px-4 !py-1 !h-auto !border-none transition-transform duration-200 ${isHovered ? "!scale-105 !bg-[#003380]" : ""
                }`}
              icon={isDisabled ? <FaVideoSlash /> : <LuVideo />}
            >
              {lct('join')}
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
          className="!mt-4 !bg-transparent"
        >
          <Panel
            header={lct('more_details')}
            key="1"
            className="!text-[#001840] !font-medium"
          >
            <div className="text-sm text-gray-700">
              <p>
                <strong>{cct('description')}:</strong> {classData.description}
              </p>
              <p className="mt-1">
                <strong>{lct('prerequisites')}:</strong> {classData.prerequisites}
              </p>
            </div>
          </Panel>
        </Collapse>
      </Card>
      {/* Confrimation Modal */}

      <>
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
              {lct('join_live_class')}
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="font-medium text-gray-800 mb-2">
                {classData.class_name}: {classData.topic}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <LuCalendar className="flex-shrink-0" />
                <span>
                  {classData.date}, {classData.time}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-xs lg:text-sm text-center mb-6">
              {lct('join_live_class_desc')}
            </p>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleCancel}
                className="!border-gray-300 !text-gray-700 !px-5 !h-10 !rounded-md"
              >
                {act('close')}
              </Button>
              <Button
                type="primary"
                onClick={handleJoin}
                className="!bg-[#001840] !border-none !text-white !px-5 !h-10 !rounded-md !flex !items-center !gap-1"
                icon={<LuCheckCheck />}
              >
                {lct('confirm_and_join')}
              </Button>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

const InstructorLiveLessons = () => {
  const { upcomingLessons, isFetchingUpcomingLessons } = useUpcomingLessons();

  const lct = useTranslations('live_class')

  const [alignValue, setAlignValue] = useState(lct('upcoming'));

  const isPastLesson = (lesson) => {
    const lessonDateTime = new Date(`${lesson.date} ${lesson.time}`);
    const now = new Date();
    return now > lessonDateTime;
  };

  const isFutureLesson = (lesson) => {
    const lessonDateTime = new Date(`${lesson.date} ${lesson.time}`);
    const now = new Date();
    return lessonDateTime > now;
  };


  return (
    <div className="w-full p-4 mt-layout-margin">
      <div className="flex flex-col justify-center gap-1 mb-4">
        <div className="flex items-center gap-2">
          <LuVideo className="text-2xl md:text-4xl text-[#001840] flex-shrink-0" />
          <span className="font-semibold text-lg md:text-2xl text-[#001840] tracking-tight">
            {lct('live_learning_center')}
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-4xl px-3">
          {lct('live_learning_description')}
        </p>
      </div>

      <Segmented
        block
        value={alignValue}
        style={{ marginBottom: 8 }}
        onChange={setAlignValue}
        options={[lct('upcoming'), lct('pending'), lct('completed'), lct('canceled')]}
        className="custom-segmented"
      />

      {alignValue === lct('upcoming') && (
        <div className="space-y-3">
          {isFetchingUpcomingLessons ? (
            <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
              <LoadingOutlined className="text-3xl text-[#001840]" spin />
              <span className="text-xs">{lct('loading_lessons')}</span>
            </div>
          ) : (
            (() => {
              const upcoming =
                upcomingLessons?.filter(
                  (lesson) =>
                    lesson.status === 'Upcoming' && isFutureLesson(lesson)
                ) || [];

              return upcoming.length > 0 ? (
                upcoming.map((classData) => (
                  <ClassCard
                    key={classData.id}
                    classData={classData}
                    status={'Upcoming'}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center w-full py-32">
                  <p className="text-gray-500 text-xs md:text-sm">
                    {lct('no_upcoming_classes')}
                  </p>
                </div>
              );
            })()
          )}
        </div>
      )}

      {alignValue === lct('pending') && (
        <div className="space-y-3">
          {isFetchingUpcomingLessons ? (
            <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
              <LoadingOutlined className="text-3xl text-[#001840]" spin />
              <span className="text-xs">{lct('loading_lessons')}</span>
            </div>
          ) : upcomingLessons?.filter((lesson) => lesson.status === 'Upcoming')
            .length > 0 ? (
            upcomingLessons
              .filter(
                (lesson) => lesson.status === 'Upcoming' && isPastLesson(lesson)
              )
              .map((classData) => (
                <ClassCard
                  key={classData.id}
                  classData={classData}
                  status={'Pending'}
                />
              ))
          ) : (
            <div className="flex justify-center items-center w-full py-32">
              <p className="text-gray-500 text-xs md:text-sm">
                {lct('no_pending_classes')}
              </p>
            </div>
          )}
        </div>
      )}

      {alignValue === lct('completed') && (
        <div className="space-y-3">
          {isFetchingUpcomingLessons ? (
            <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
              <LoadingOutlined className="text-3xl text-[#001840]" spin />{" "}
              <span className="text-xs">{lct('loading_lessons')}</span>
            </div>
          ) : upcomingLessons?.filter((lesson) => lesson.status === 'Completed')
            .length > 0 ? (
            upcomingLessons
              .filter((lesson) => lesson.status === 'Completed')
              .map((classData) => (
                <ClassCard
                  key={classData.id}
                  classData={classData}
                  status={'Completed'}
                />
              ))
          ) : (
            <div className="flex justify-center items-center w-full py-32">
              <p className="text-gray-500 text-xs md:text-sm">
                {lct('no_completed_classes')}
              </p>
            </div>
          )}
        </div>
      )}

      {alignValue === lct('canceled') && (
        <div className="space-y-3">
          {isFetchingUpcomingLessons ? (
            <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
              <LoadingOutlined className="text-3xl text-[#001840]" spin />{" "}
              <span className="text-xs">{lct('loading_lessons')}</span>
            </div>
          ) : upcomingLessons?.filter((lesson) => lesson.status === 'Canceled')
            .length > 0 ? (
            upcomingLessons
              .filter((lesson) => lesson.status === 'Canceled')
              .map((classData) => (
                <ClassCard
                  key={classData.id}
                  classData={classData}
                  status={'Canceled'}
                />
              ))
          ) : (
            <div className="flex justify-center items-center w-full py-32">
              <p className="text-gray-500 text-xs md:text-sm">
                {lct('no_canceled_classes')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorLiveLessons;
