"use client";
import { VerifiedOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, Divider, message, Tag } from "antd";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { apiPost } from "@/services/api/api_service";

function UserCard({
  user: {
    instructor_id,
    name,
    role,
    status,
    is_verified,
    total_cohorts,
    total_students,
    has_active_subscription,
    subscription_type,
  },
}) {
  const queryClient = useQueryClient();

  const handleVerify = async (status) => {
    const instructorData = {
      instructor_id,
      status,
    };

    await apiPost("approve-instructor", instructorData);
    queryClient.invalidateQueries(["user"]);
    message.success("User verified successfully");
  };

  return (
    <div className=" grid grid-cols-2  p-5 w-full shadow rounded">
      <div className="flex justify-between">
        <div className="flex gap-x-4 items-center">
          <Avatar
            alt="image"
            src={"/man.jpg"}
            size={80}
            className="object-cover"
          />
          <div>
            <div className="flex items-start flex-col gap-y-1">
              <h1 className="text-ink-heading font-black text-xl">{name}</h1>
              <h2 className="text-semibold text-xs text-ink-body text-center ">
                {role}
              </h2>
              <h2 className="text-indigo-500 text-xs">
                edu.galahub.tz({is_verified})
              </h2>
              <div className="flex gap-x-2">
                {is_verified !== "verified" ? (
                  <>
                    <button
                      onClick={() => handleVerify("reject")}
                      className=" text-center  p-2 bg-red-600 text-white font-semibold rounded text-xs w-[6rem]"
                    >
                      reject
                    </button>
                    <button
                      onClick={() => handleVerify("verify")}
                      className=" text-center p-2 border-indigo-800 border-2 text-indigo-800 font-semibold rounded text-xs w-[6rem]"
                    >
                      verify
                    </button>
                  </>
                ) : (
                  <div className="border-green-800 border-2 items-center gap-x-1 text-green-800 rounded-md p-1 flex">
                    verified <RiVerifiedBadgeFill className="text-blue-700" />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Divider type="vertical" className="h-full" />
      </div>
      <div className="">
        <div className="grid grid-cols-2">
          <span className="text-xs font-black text-ink-heading">Status</span>
          <div>
            <Tag color={status ? "green" : "red"}>
              {status ? "active" : "inactive"}
            </Tag>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-xs font-black text-ink-heading">
            Total cohorts
          </span>
          <span>{total_cohorts}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-xs font-black text-ink-heading">
            Total students
          </span>
          <span>{total_students}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-xs font-black text-ink-heading">
            Subscription status
          </span>
          <span>
            {has_active_subscription ? "subscribed" : "not subscribed"}
          </span>
        </div>
        <div className="grid grid-cols-2">
          <span className="text-xs font-black text-ink-heading">
            Subscription type
          </span>
          <span>{subscription_type}</span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
