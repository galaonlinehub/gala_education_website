import React from "react";
import { Card, Progress, Avatar, Tooltip, Skeleton } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LuChevronRight, LuListChecks, LuUser, LuUsers } from "react-icons/lu";
import { img_base_url } from "@/src/config/settings";

const TopicCard = ({ details }) => {
  return (
    <Card
      key={details.id}
      className="!overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="text-xl font-black text-[#001840] group-hover:text-[#2563eb] transition-colors mb-2">
        {details.cohort_name}
      </div>

      <div className="flex justify-between items-start mb-3">
        <div className="max-w-[70%]">
          <p className="text-gray-600 text-sm mb-1">{details?.subject}</p>
          <p className="text-gray-600 font-bold text-sm line-clamp-1">
            {details?.topic_name}
          </p>
        </div>
        <Tooltip title={`${details?.percent_of_completion}% Completed`}>
          <Progress
            type="circle"
            percent={details?.percent_of_completion}
            strokeWidth={12}
            size={50}
            strokeColor={{
              "0%": "#001840",
              "100%": `${
                details.color === "blue"
                  ? "#1890ff"
                  : details.color === "green"
                  ? "#52c41a"
                  : "#722ed1"
              }`,
            }}
          />
        </Tooltip>
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar
              className="bg-transparent/90"
              src={
                details.instructor_profile_picture
                  ? `${img_base_url}${details.instructor_profile_picture}`
                  : undefined
              }
              icon={
                !details.instructor_profile_picture ? (
                  <LuUser className="w-5 h-5 text-gray-500" />
                ) : undefined
              }
            />

            <span className="text-sm font-medium line-clamp-1 capitalize">
              {details.instructor_name}
            </span>
          </div>
          <Tooltip title="Enrolled Students">
            <div className="flex items-center gap-1 text-gray-600">
              <LuUsers />
              <span className="text-sm">{details?.total_student_enrolled}</span>
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between">
          {details.assignmentsDue > 0 ? (
            <div className="flex items-center text-amber-600">
              <ExclamationCircleOutlined className="mr-1" />
              <span className="text-sm">
                {details.assignmentsDue} assignments due
              </span>
            </div>
          ) : (
            <div className="flex items-center text-green-600">
              <LuListChecks className="mr-1" />
              <span className="text-sm">All caught up!</span>
            </div>
          )}
          <div className="flex items-center text-[#001840] font-medium">
            <span className="text-sm mr-2">Details</span>
            <LuChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const TopicCardSkeleton = () => {
  return (
    <Card className="!overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <div className="w-[95%] flex flex-col">
          <Skeleton.Input active size="medium" className="!w-[95%] mb-[3px]" />
          <Skeleton.Input active size="small" className="!w-[30%] !mb-[2px]" />
          <Skeleton.Input active className="w-full" />
        </div>

        <Skeleton.Avatar active size={64} shape="circle" />
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton.Avatar active size="medium" />
            <Skeleton.Input active size="small" className="w-[80%]" />
          </div>

          <Skeleton.Input active size="small" className="w-[50%]" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton.Input active size="small" className="w-[120px]" />
          <Skeleton.Input active size="small" className="w-[80px]" />
        </div>
      </div>
    </Card>
  );
};

export default TopicCardSkeleton;

export { TopicCard, TopicCardSkeleton };
