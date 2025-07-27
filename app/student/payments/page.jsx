"use client";
import { Card, Button, Avatar, Tooltip, Modal } from "antd";
import React, { useState } from "react";
import { LuCircleX, LuFolder, LuUsers, LuUser } from "react-icons/lu";

import TopicCardSkeleton from "@/src/components/student/TopicCardStudent";
import {
  RenderReferenceState,
  RenderSuccessState,
  RenderLoadingState,
} from "@/src/components/ui/auth/signup/PaymentStatus";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { img_base_url, PaymentStatus } from "@/src/config/settings";
import { usePendingCohorts } from "@/src/hooks/data/usePendingCohorts";
import { useDevice } from "@/src/hooks/misc/useDevice";

function PendingPayment() {
  const {
    pendingCohorts,
    isFetchingPendingCohorts,
    errorFetchinPendingCohorts,
  } = usePendingCohorts();

  const { width } = useDevice();
  const isMobile = width < 768;

  return (
    <div className="mt-layout-margin px-1 sm:px-2 lg:px-4">
      <div className="mb-8">
        <h1 className="font-black text-[#001840] mb-1 text-lg md:text-2xl">
          Pending Payments
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Topics that are waiting for payment confirmation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {errorFetchinPendingCohorts ? (
          <div className="col-span-full text-center py-20 flex flex-col items-center justify-center">
            <LuCircleX className="text-red-600 text-2xl md:text-4xl mb-2 md:mb-4" />
            <p className="text-red-600 text-base md:text-xl font-medium mb-1 md:mb-3">
              Something went wrong
            </p>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
              Please try again later
            </p>
          </div>
        ) : isFetchingPendingCohorts ? (
          <>
            {isMobile ? (
              <div className="flex w-full justify-center py-2">
                <div className="flex justify-center items-center bg-white rounded-full shadow-md w-fit p-1 shadow-gray-400">
                  <SlickSpinner color="black" size={18} />
                </div>
              </div>
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <TopicCardSkeleton key={index} />
              ))
            )}
          </>
        ) : pendingCohorts.length === 0 ? (
          <div className="flex flex-col items-center justify-center col-span-full py-24">
            <LuFolder className="text-6xl md:text-8xl text-[#001840]" />
            <p className="text-base sm:text-xl font-medium text-center">
              You don&apos;t have any pending payments!
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center">
              Use the search bar above to explore and find classes.
            </p>
          </div>
        ) : (
          pendingCohorts?.map((classItem) => (
            <PendingTopicCard key={classItem.cohort_id} {...classItem} />
          ))
        )}
      </div>
    </div>
  );
}

const PendingTopicCard = ({
  topic,
  cohort_name,
  subject,
  total_student_enrolled,
  instructor_name,
  payment_reference,
  amount,
  instructor_profile_picture,cohort_start_date
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("initial");

  const showModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setPaymentStep("initial");
  };

  const handleComplete = () => {
    setPaymentStep(PaymentStatus.LOADING);
    setTimeout(() => {
      setPaymentStep(PaymentStatus.SUCCESS);
    }, 2000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setPaymentStep(PaymentStatus.INITIAL);
  };

  const renderModalContent = () => {
    switch (paymentStep) {
      case PaymentStatus.LOADING:
        return <RenderLoadingState />;
      case PaymentStatus.SUCCESS:
        return <RenderSuccessState onClose={handleComplete} />;

      default:
        return (
          <RenderReferenceState
            reference={payment_reference}
            amount={amount}
            onClose={handleComplete}
          />
        );
    }
  };

  return (
    <>
      <Card className="!overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="w-2/3">
            <div className="text-xl font-black text-[#001840] group-hover:text-[#2563eb] transition-colors capitalize mb-2">
              {cohort_name}
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-[10px]">{subject?.name}</p>
              <p className="text-gray-600 font-bold text-sm line-clamp-1">
                {topic}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-1/3">
            <div className="flex flex-col items-start gap-1">
              <Avatar
                className="!bg-transparent/90"
                src={`${img_base_url}${instructor_profile_picture}`}
                icon={<LuUser />}
              />
              <span className="text-xs font-medium line-clamp-1 capitalize">
                {instructor_name}
              </span>
            </div>
            <Tooltip title="Enrolled Students">
              <div className="flex items-center gap-1 text-gray-600">
                <LuUsers />
                <span className="text-[10px]">{total_student_enrolled}/10</span>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="mb-3 text-xs flex justify-between items-center">
          <div className="w-2/3 flex items-center gap-2">
            <span>Starts on</span>
            <span className="text-gray-500 text-xs font-semibold">
              {cohort_start_date}
            </span>
          </div>

          <div className="text-[#001840] font-black text-sm w-1/3">
            {amount?.toLocaleString()} TZS
          </div>
        </div>
        <Button
          className="hover:!border-[#2563eb] hover:!text-[#2563eb] !text-xs !border-[0.1px] text-gray-500 transition-colors duration-200 w-full"
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
