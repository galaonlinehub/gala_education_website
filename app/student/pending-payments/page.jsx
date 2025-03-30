"use client";
import TopicCardSkeleton, {
  TopicCard,
} from "@/src/components/student/TopicCardStudent";
import React, { useState } from "react";
import { LuCircleX, LuFolder, LuUsers } from "react-icons/lu";
import Link from "next/link";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import { Card, Button, Avatar, Tooltip, Modal, Result, Spin } from "antd";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import {
  NumberOutlined,
  WalletOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  RenderReferenceState,
  RenderSuccessState,
} from "@/src/components/ui/auth/signup/PaymentStatus";

function PendingPayment() {
  const { enrolledTopics, enrolledTopicsLoading, enrolledTopicsError } =
    useEnrolledTopics();

  const pendingClasses = [
    {
      topic: "Introduction to Algebra",
      cohort_id: "cohort-101",
      subject: "Mathematics",
      cohort_name: "Math Beginners Batch",
      instructor_name: "John Doe",
      total_student_enrolled: 25,
      amount: 25000,
    },
    {
      topic: "World War II Overview",
      cohort_id: "cohort-102",
      subject: "History",
      cohort_name: "History Enthusiasts",
      instructor_name: "Jane Smith",
      total_student_enrolled: 30,
      amount: 30000,
    },
    {
      topic: "Basics of Programming",
      cohort_id: "cohort-103",
      subject: "Computer Science",
      cohort_name: "Intro to CS",
      instructor_name: "Alice Johnson",
      total_student_enrolled: 15,
      amount: 20000,
    },
    {
      topic: "Shakespearean Literature",
      cohort_id: "cohort-104",
      subject: "English Literature",
      cohort_name: "English Majors",
      instructor_name: "Robert Brown",
      total_student_enrolled: 20,
      amount: 22000,
    },
    {
      topic: "Photosynthesis Process",
      cohort_id: "cohort-105",
      subject: "Biology",
      cohort_name: "Biology Starters",
      instructor_name: "Emily Davis",
      total_student_enrolled: 18,
      amount: 18000,
    },
  ];

  return (
    <div className="mt-layout-margin px-2 lg:px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-[#001840] mb-2">
          Pending Payments
        </h1>
        <p className="text-gray-600 text-xs">
          Topics that are waiting for payment confirmation
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledTopicsError ? (
          <div className="col-span-full text-center py-20 flex flex-col items-center justify-center">
            <LuCircleX className="text-red-600 text-3xl md:text-6xl mb-4" />
            <p className="text-red-600 text-xl font-medium">
              Something went wrong
            </p>
            <p className="text-gray-500 text-xs">Please try again later</p>
          </div>
        ) : enrolledTopicsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TopicCardSkeleton key={index} />
          ))
        ) : pendingClasses.length === 0 ? (
          <div className="flex flex-col items-center justify-center col-span-full py-24">
            <LuFolder className="text-6xl md:text-8xl text-[#001840]" />
            <p className="text-[#001840] text-lg font-medium">
              You don&apos;t have any pending payments!
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Use the search bar above to explore and find classes.
            </p>
          </div>
        ) : (
          pendingClasses?.map((classItem) => (
            <div key={classItem.cohort_id}>
              <PendingTopicCard details={classItem} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const generateRandomReference = () => {
  return `REF${Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0")}TZ`;
};

const PendingTopicCard = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("initial");
  const [reference] = useState(generateRandomReference());

  const {
    topic,
    cohort_id,
    cohort_name,
    subject,
    total_student_enrolled,
    instructor_name,
    amount,
  } = details;

  const showModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setPaymentStep("initial");
  };

  const handleComplete = () => {
    setPaymentStep("loading");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setPaymentStep("initial");
  };

  const renderModalContent = () => {
    switch (paymentStep) {
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center py-10">
            <Spin size="large" />
            <p className="mt-6 text-lg font-medium text-[#001840]">
              Processing Payment
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please wait while we process your payment...
            </p>
          </div>
        );
      case "success":
        return <RenderSuccessState onClose={handleComplete} />;

      default:
        return (
          <RenderReferenceState
            reference={reference}
            amount={amount}
            onClose={handleComplete}
          />
        );
    }
  };

  return (
    <>
      <Card
        key={details?.id}
        className="!overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="w-2/3">
            <div className="text-xl font-black text-[#001840] group-hover:text-[#2563eb] transition-colors capitalize mb-2">
              {cohort_id}
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-[10px]">{subject}</p>
              <p className="text-gray-600 font-bold text-sm line-clamp-1">
                {topic}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-1/3">
            <div className="flex flex-col items-start gap-1">
              <Avatar
                className="!bg-transparent/90"
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${instructor_name}`}
              />
              <span className="text-xs font-medium line-clamp-1 capitalize">
                {instructor_name}
              </span>
            </div>
            <Tooltip title="Enrolled Students">
              <div className="flex items-center gap-1 text-gray-600">
                <LuUsers />
                <span className="text-[10px]">
                  {total_student_enrolled}/100
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="mb-3 text-xs flex justify-between items-center">
          <div className="w-2/3 flex items-center gap-2">
            <span>Starts on</span>
            <span className="text-gray-500 text-xs font-semibold ml-3">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="text-[#001840] font-black text-sm w-1/3">
            {amount?.toLocaleString()} TZS
          </div>
        </div>
        <Button
          className="hover:!border-[#2563eb] hover:!text-[#2563eb] text-gray-500 transition-colors duration-200 w-full"
          onClick={showModal}
        >
          Complete Payment
        </Button>
      </Card>

      <Modal
        title={
          <div className="text-lg font-bold text-[#001840]">
            {paymentStep === "success"
              ? "Payment Status"
              : "Complete Your Payment"}
          </div>
        }
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={500}
        className="payment-modal"
        centered
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};



export default PendingPayment;
