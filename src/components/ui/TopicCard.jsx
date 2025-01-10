import React from "react";
import { Card, Avatar, Badge, Button, Skeleton } from "antd";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { GoVerified, GoBook } from "react-icons/go";
import { FaRegStar, FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";

const TopicCard = ({ loading = !true }) => {
  return (
    <Card
      loading={loading}
      className="!text-black !text-[12px] hover:shadow-lg transition-all !w-1/2 !self-center"
    >
      <Card.Meta
        title={
          <div className="flex gap-2 items-center">
            <div className="bg-blue-500/90 !text-white p-2 rounded-lg">
              <BsGlobe size={20} />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-base">
                  Cloud Computing Mastery
                </span>
                <span className="text-[10px] text-gray-600">
                  Master cloud computing from basics to advanced concepts
                </span>
              </div>
              <Badge
                count={
                  <span className="flex items-center justify-center text-white !text-[8px] bg-black p-1 rounded-sm">
                    15,000 Tsh
                  </span>
                }
              />
            </div>
          </div>
        }
        description={
          <div className="flex flex-col gap-3 mt-3">
            {/* Course Content Section */}
            <div className="!rounded-md !w-full !text-black !p-2 space-y-2">
              <div className="w-full flex justify-between items-center">
                <span className="text-[13px] font-bold">
                  AWS Solutions Architecture
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar size={12} />
                  <span className="text-[10px]">4.9</span>
                </div>
              </div>

              <div className="text-[10px] text-gray-600">
                Complete guide to building scalable systems on AWS
              </div>

              {/* Course Stats */}
              <div className="flex gap-2">
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <FaRegClock size={10} />
                  <span>12 Weeks</span>
                </div>
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <LuUsers size={10} />
                  <span>19 Enrolled</span>
                </div>
                <div className="flex border-[0.009rem] border-black/20 bg-gray-50 px-2 py-1 items-center justify-center text-[8px] rounded-sm gap-1 font-medium">
                  <GoBook size={10} />
                  <span>Starts Feb 15</span>
                </div>
              </div>

              {/* Instructor Section */}
              <div className="flex items-center justify-between mt-3 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Avatar size={32} src="/api/placeholder/32/32" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold">
                        Dr. Sarah Mitchell
                      </span>
                      <GoVerified className="text-blue-500" size={12} />
                    </div>
                    <span className="text-[9px] text-gray-600">
                      Cloud Computing Specialist
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <GoShieldCheck size={12} className="text-green-500" />
                    <span className="text-[9px] font-medium">
                      Verified Expert
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers size={10} className="text-gray-500" />
                    <span className="text-[9px] text-gray-600">
                      2.5k Students
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs hover:!opacity-90">
                Enroll Now
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export { TopicCard };
