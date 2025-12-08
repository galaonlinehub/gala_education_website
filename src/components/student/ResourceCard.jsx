import React from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

export const ResourceCard = ({
  title,
  description,
  subject,
  grade,
  date,
  pages_duration,
  link,
  download_link,
}) => {
  const router = useRouter();

  const handleView = () => {
    const targetUrl = `/student/learning-resources/view?url=${encodeURIComponent(link)}&name=${encodeURIComponent(title)}`;
    router.push(targetUrl);
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      {/* Top Row: Subject and Page Count */}
      <div className="flex justify-between items-start mb-3">
        <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
          {subject}
        </span>
        <span className="text-xs text-blue-400 font-medium">
          {pages_duration}
        </span>
      </div>

      {/* Main Content */}
      <div className="mb-4 flex-grow">
        <h3 className="text-base font-bold text-[#001840] mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {description}
        </p>
      </div>

      {/* Meta Info: Grade and Date */}
      <div className="flex justify-between items-center mb-4 text-xs font-semibold text-gray-500">
        <span className="bg-gray-50 border border-gray-100 px-2 py-1 rounded">
          {grade}
        </span>
        <span>{date}</span>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        <button
          onClick={handleView}
          className="w-full flex items-center justify-center gap-2 bg-[#001840] text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-950 transition-colors"
        >
          <FaEye /> View
        </button>
      </div>
    </div>
  );
};
