"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Modal, Select, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { FaVideoSlash } from "react-icons/fa6";
import CalendarComponent from "@/components/ui/Calendar";
import clsx from 'clsx';
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
import { useLiveLessons } from "@/hooks/data/useLiveLessons";
import { useSubject } from "@/hooks/data/useSubject";
import { useUser } from "@/hooks/data/useUser";
import { sessionStorageFn } from "@/utils/fns/client";
import { encrypt } from "@/utils/fns/encryption";

const { Panel } = Collapse;

const ClassCard = ({ classData, status }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const { getLessonToken } = useLesson();

  const showConfirmModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleJoin = async () => {
    const lessonToken = await getLessonToken(classData.link);
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

    const encryptedMeetingLink = encrypt(classData.link);

    sessionStorageFn.set("lessonToken", encryptedLesssonToken);
    sessionStorageFn.set("isModerator", encryptedModeratorvalue);
    sessionStorageFn.set("lessonId", encryptedLessonId);
    sessionStorageFn.set("roomName", encryptedRoomName);

    sessionStorageFn.set("meetingLink", encryptedMeetingLink);

    router.push(
      `/gala-meet?room=${encryptedLessonId}&name=${encryptedUserName}&email=${encryptedUserEmail}`
    );

    setIsModalOpen(false);
  };

  const lct = useTranslations('live_class');
  const act = useTranslations('all_classes');
  const cct = useTranslations('class_creation');

  const isDisabled =
    status === "upcoming" ||
    status === "completed" ||
    status === "missed";

  return (
    <>
      <Card
        className={clsx("!flex !flex-col !w-full !rounded-none !mb-4  shadow-md shadow-black/25 hover:shadow-lg transition-shadow duration-300 ease-in-out",
         {
          "!bg-red-50 border-l-4 !border-red-500": status === "missed",
          "!bg-green-50 border-l-4 !border-green-500": status === "completed",
          "!bg-white": status !== "missed" && status !== "completed"
        }
        )}
        styles={{ body: { padding: "8px", width: "100%" } }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tag
          color={status == "pending" ? "#9CA3AF" : "#001840"}
          className="!text-white !font-medium !rounded-none !px-2 !py-0.5 !mb-2 !inline-flex !items-center !gap-1"
        >
          <LuClock className="h-3 w-3 text-yellow-300" />
          {lct(status)}
        </Tag>
        <div className="flex w-full mt-4 flex-col lg:flex-row lg:items-start justify-between gap-4 px-2 md:px-4 py-2">
  {/* Left Section - Class Info */}
  <div className="flex-1 flex flex-col gap-3">
    {/* Class Name and Topic */}
    <div>
      <h3 className="text-base font-semibold leading-tight text-gray-900">{classData.class_name}</h3>
      <p className="text-[#003399] text-sm mt-0.5">{classData.topic}</p>
    </div>

    {/* Metadata Grid - 2 columns on mobile, 3 on tablet+ */}
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
      {/* Date */}
      <div className="flex items-start gap-2">
        <LuCalendar className="h-4 w-4 text-[#001840] flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs text-gray-500 block">{lct('date')}</span>
          <p className="text-xs font-medium text-gray-800">{classData.date}</p>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-start gap-2">
        <LuClock className="h-4 w-4 text-[#001840] flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs text-gray-500 block">{lct('time')}</span>
          <p className="text-xs font-medium text-gray-800">
            {classData.time}
            <span className="text-gray-500 ml-1">({classData.duration})</span>
          </p>
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="flex items-start gap-2">
        <LuUsers className="h-4 w-4 text-[#001840] flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-xs text-gray-500 block">{lct('enrolled')}</span>
          <p className="text-xs font-medium text-gray-800">
            {classData.enrolled} {act('students')}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Section - Join Button */}
  {(status !== "completed" && status !== "missed") && (
    <div className="flex items-start lg:items-center lg:ml-4 mt-2 lg:mt-0">
      <Button
        type="primary"
        disabled={isDisabled}
        onClick={showConfirmModal}
        target="_blank"
        className={clsx(
          "!font-medium !rounded-md !px-5 !py-2 !h-auto !border-none transition-all duration-200 !whitespace-nowrap",
          {
            "!bg-[#d9dadb] !text-gray-600 cursor-not-allowed": isDisabled,
            "!bg-[#001840] !text-white hover:!bg-[#003380]": !isDisabled,
            "!scale-105 !shadow-lg": isHovered && !isDisabled,
          }
        )}
        icon={isDisabled ? <FaVideoSlash /> : <LuVideo />}
      >
        {lct('join')}
      </Button>
    </div>
  )}
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
              <LuCalendar className="shrink-0" />
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
              className="border-gray-300! !text-gray-700 !px-5 !h-10 !rounded-md"
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
  );
};

const LiveLessons = () => {
  const { subjects, isLoading } = useSubject();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ongoing');
  const { user } = useUser();

  const { liveLessons, isFetchingLiveLessons } = useLiveLessons(selectedCategory);

  const lct = useTranslations('live_class');

  // Filter lessons by subject
  const filterLessonsBySubject = (lessons) => {
    if (!selectedSubject || !lessons) return lessons;
    return lessons.filter(lesson => lesson.subject_id === selectedSubject);
  };

  // Get filtered lessons
  const filteredLessons = filterLessonsBySubject(liveLessons);

  // Subject options for Select
  const subjectOptions = subjects?.map(subject => ({
    value: subject.id,
    label: `${subject.name}`,
  })) || [];

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };

  const handleClearFilter = () => {
    setSelectedSubject(null);
  };

  // Get no lessons message based on category
  const getNoLessonsMessage = () => {
    const messages = {
      ongoing: lct('no_ongoing_classes'),
      upcoming: lct('no_upcoming_classes'),
      completed: lct('no_completed_classes'),
      missed: lct('no_missed_classes'),
      pending: lct('no_pending_classes'),
      canceled: lct('no_canceled_classes'),
    };
    
    return selectedSubject 
      ? `${messages[selectedCategory]} ${lct('for_selected_subject')}`
      : messages[selectedCategory];
  };

  return (
    <div className="w-full h-screen flex flex-col">

      <div className="">
        <div className="p-4">

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

          <div className={clsx("w-full grid  mb-4 items-center gap-2 md:gap-4",
            {
              " grid-cols-2 sm:grid-cols-4": user?.role === "student",
              "grid-cols-3": user?.role === "instructor"
            }
          )}>
            <Button 
              onClick={() => setSelectedCategory('ongoing')} 
              type={selectedCategory === 'ongoing' ? 'primary' : 'default'}
              block 
              className={`!text-xs sm:!text-sm ${
                selectedCategory === 'ongoing' 
                  ? '!bg-[#001840] !text-white !border-[#001840]'
                  : ''
              }`}
            >
              {lct('ongoing')}
            </Button>
            <Button 
              onClick={() => setSelectedCategory('upcoming')} 
              type={selectedCategory === 'upcoming' ? 'primary' : 'default'}
              block 
              className={`!text-xs sm:!text-sm ${
                selectedCategory === 'upcoming' 
                  ? '!bg-[#001840] !text-white !border-[#001840]' 
                  : ''
              }`}
            >
              {lct('upcoming')}
            </Button>
            <Button 
              onClick={() => setSelectedCategory('completed')} 
              type={selectedCategory === 'completed' ? 'primary' : 'default'}
              block 
              className={`!text-xs sm:!text-sm ${
                selectedCategory === 'completed' 
                  ? '!bg-[#001840] !text-white !border-[#001840]' 
                  : ''
              }`}
            >
              {lct('completed')}
            </Button>
            {user?.role == 'student' &&
            <Button 
              onClick={() => setSelectedCategory('missed')} 
              type={selectedCategory === 'missed' ? 'primary' : 'default'}
              block 
              className={`!text-xs sm:!text-sm ${
                selectedCategory === 'missed' 
                  ? '!bg-[#001840] !text-white !border-[#001840]' 
                  : ''
              }`}
            >
              {lct('missed')}
            </Button>
}
          </div>

          {/* Subject Filter */}
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <Select
              placeholder="Filter by subject"
              className="w-full text-xs sm:text-sm sm:w-[280px]"
              onChange={handleSubjectChange}
              loading={isLoading}
              options={subjectOptions}
              value={selectedSubject}
              allowClear
              onClear={handleClearFilter}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col-reverse lg:flex-row gap-6 justify-center lg:justify-between items-start">
          {/* Lessons List */}
          <div className="flex-1 w-full space-y-3 min-w-0">
            {isFetchingLiveLessons ? (
              <div className="flex flex-col items-center justify-center w-full py-20 md:py-32">
                <LoadingOutlined className="text-3xl text-[#001840] mb-2" spin />
                <span className="text-sm text-gray-600">{lct('loading_lessons')}</span>
              </div>
            ) : filteredLessons && filteredLessons.length === 0 ? (
              <div className="flex justify-center items-center w-full py-20 md:py-32">
                <p className="text-gray-500 text-sm">{getNoLessonsMessage()}</p>
              </div>
            ) : (
              filteredLessons?.map((classData, idx) => (
                <ClassCard
                  key={idx}
                  classData={classData}
                  status={selectedCategory}
                />
              ))
            )}
          </div>

          {/* Calendar - Sticky on larger screens */}
          {filteredLessons && filteredLessons.length > 0 && (
            <div className="w-full lg:w-auto lg:min-w-[320px] lg:max-w-[380px] lg:sticky lg:top-4">
              <CalendarComponent lessons={filteredLessons} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveLessons;