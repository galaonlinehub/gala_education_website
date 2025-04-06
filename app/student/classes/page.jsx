"use client";
import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import {
  TopicCard,
  TopicCardSkeleton,
} from "@/src/components/student/TopicCardStudent";
import Link from "next/link";

const ClassList = () => {
  const [open, setOpen] = React.useState(true);
  const { enrolledTopics, enrolledTopicsLoading, enrolledToipcsError } =
    useEnrolledTopics();

  return (
    <div className="mt-14 px-2 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-[#001840] mb-2">
            My Classes
          </h1>
          <p className="text-gray-600 text-xs">
            Track your progress in different classes
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledToipcsError ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-600 text-lg font-medium">
                Something went wrong.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Please try again later.
              </p>
            </div>
          ) : enrolledTopicsLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <TopicCardSkeleton key={index} />
            ))
          ) : enrolledTopics.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-full py-24">
              <FaFolderOpen className="text-6xl md:text-8xl text-[#001840]" />
              <p className="text-[#001840] text-lg font-medium">
                You haven’t enrolled in any classes yet!
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Use the search bar above to explore and find classes.
              </p>
            </div>
          ) : (
            enrolledTopics?.map((classItem) => (
              <Link href={`/student/classes/${classItem.cohort_id}`} key={classItem.cohort_id}>
              <TopicCard details={classItem} />
            </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassList;
