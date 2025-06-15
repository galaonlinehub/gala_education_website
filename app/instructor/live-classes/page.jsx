"use client";

import { Avatar, Button, Card, Collapse, Modal, Segmented, Tag } from "antd";
import React, { useState } from "react";
import { LuCalendar, LuClock, LuUsers, LuVideo, LuInfo, LuX, LuCheckCheck } from "react-icons/lu";
import { useUpcomingLessons } from "@/src/hooks/useUpcomigLessons";
import { LoadingOutlined } from "@ant-design/icons";
import { useLesson } from "@/src/hooks/useLesson";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { encrypt } from "@/src/utils/fns/encryption";

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
    sessionStorageFn.set("roomName", encryptedRoomName);

    
    router.push(`/gala-meet?room=${encryptedLessonId}&name=${encryptedUserName}&email=${encryptedUserEmail}`);

    setIsModalOpen(false);

  };

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
          {classData.status}
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
              // href={classData.link}
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
          className="!mt-4 !bg-transparent"
        >
          <Panel
            header="More Details"
            key="1"
            className="!text-[#001840] !font-medium"
          >
            <div className="text-sm text-gray-700">
              <p>
                <strong>Description:</strong> {classData.description}
              </p>
              <p className="mt-1">
                <strong>Prerequisites:</strong> {classData.prerequisites}
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
      </>
    </>
  );
};

const InstructorLiveLessons = () => {

  const { upcomingLessons, isFetchingUpcomingLessons } = useUpcomingLessons();

  const [alignValue, setAlignValue] = useState('Upcoming');


  return (
    <div className="w-full p-4 mt-layout-margin">
      <div className="flex flex-col justify-center gap-1 mb-4">
        <div className="flex items-center gap-2">
          <LuVideo className="text-2xl md:text-4xl text-[#001840] flex-shrink-0" />
          <span className="font-semibold text-lg md:text-2xl text-[#001840] tracking-tight">
            Live Learning Center
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-4xl px-3">
          Participate in Live, Interactive Classes Delivered in Real Time with
          Dynamic Lessons and Engaging Discussions
        </p>
      </div>

      <Segmented
        block
        value={alignValue}
        style={{ marginBottom: 8 }}
        onChange={setAlignValue}
        options={['Upcoming', 'Completed', 'Canceled']}
      />

      {alignValue == 'Upcoming' && <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
            <LoadingOutlined className="text-3xl text-[#001840]" spin /> <span className="text-xs">Loading lessons...</span>
          </div>
        ) : upcomingLessons?.filter((lesson) => lesson.status === 'Upcoming').length > 0 ? (
          upcomingLessons.filter((lesson) => lesson.status === 'Upcoming').map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full py-32">
            <p className="text-gray-500 text-xs md:text-sm  ">No upcoming classes found.</p>
          </div>
        )}
      </div>}

      {alignValue == 'Completed' && <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
            <LoadingOutlined className="text-3xl text-[#001840]" spin /> <span className="text-xs">Loading lessons...</span>
          </div>
        ) : upcomingLessons?.filter((lesson) => lesson.status === 'Completed').length > 0 ? (
          upcomingLessons.filter((lesson) => lesson.status === 'Completed').map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full py-32">
            <p className="text-gray-500 text-xs md:text-sm">No Completed classes found.</p>
          </div>
        )}
      </div>}

      {alignValue == 'Canceled' && <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
            <LoadingOutlined className="text-3xl text-[#001840]" spin /> <span className="text-xs">Loading lessons...</span>
          </div>
        ) : upcomingLessons?.filter((lesson) => lesson.status === 'Canceled').length > 0 ? (
          upcomingLessons.filter((lesson) => lesson.status === 'Canceled').map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full py-32">
            <p className="text-gray-500 text-xs md:text-sm">No Canceled classes found.</p>
          </div>
        )}
      </div>}

      {/* <div className="space-y-3">
        {isFetchingUpcomingLessons ? (
          <div className="flex justify-center gap-2 items-center w-full py-40 md:py-64">
            <LoadingOutlined className="text-3xl text-[#001840]" spin /> <span className="text-xs">Loading lessons...</span>
          </div>
        ) : upcomingLessons?.length > 0 ? (
          upcomingLessons.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))
        ) : (
          <div className="flex justify-center items-center w-full py-16">
            <p className="text-gray-500">No upcoming classes found.</p>
          </div>
        )}
      </div> */}

      {/* Confirmation modal */}


    </div>
  )
};

export default InstructorLiveLessons;
