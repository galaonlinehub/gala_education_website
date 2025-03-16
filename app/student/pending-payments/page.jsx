"use client";
import TopicCardSkeleton from "@/src/components/student/TopicCardStudent";
import React from "react";
import { LuCircleX, LuFolder } from "react-icons/lu";
import Link from "next/link";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";

function PendingPayment() {
  const { enrolledTopics, enrolledTopicsLoading, enrolledTopicsError } =
    useEnrolledTopics();
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
        ) : enrolledTopics.length === 0 ? (
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
          ""
          // enrolledTopics?.map((classItem) => (
          //   <Link href={`/student/classes/${classItem.cohort_id}`} key={classItem.cohort_id}>
          //   <TopicCard details={classItem} />
          // </Link>
          // ))
        )}
      </div>
    </div>
  );
}

export default PendingPayment;
