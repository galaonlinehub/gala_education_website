"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { FaFolderOpen } from "react-icons/fa";

import {
  TopicCard,
  TopicCardSkeleton,
} from "@/components/student/TopicCardStudent";
import { useEnrolledTopics } from "@/hooks/data/useEnrolledTopics";
import { encrypt } from "@/utils/fns/encryption";

const ClassList = () => {
  const { enrolledTopics, enrolledTopicsLoading, enrolledTopicsError } =
    useEnrolledTopics();

  const stt = useTranslations('student_classes');
  const act = useTranslations('all_classes');

  return (
    <div className="px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="text-xl lg:text-2xl font-black text-[#001840] mb-2">
            {act('my_classes')}
          </span>
          <p className="text-gray-600 text-xs">
            {stt('track_progress_in_classes')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledTopicsError ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-600 text-lg font-medium">
                {stt('something_went_wrong')}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {sst('please_try_again_later')}
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
                {stt('not_enrolled_in_any_classes')}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {stt('use_search_bar_to_find_classes')}
              </p>
            </div>
          ) : (
            enrolledTopics?.map((classItem, index) => (
              <TopicCard
                details={classItem}
                key={index}
                detailsLink={`/student/classes/${classItem.cohort_id
                  }?id=${encrypt(classItem?.instructor_id)}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassList;
