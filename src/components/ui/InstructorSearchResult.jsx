"use client";
import React from "react";
import { GoVerified, GoBook } from "react-icons/go";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { Avatar, Badge, Card, Button, Skeleton } from "antd";
import { FaRegStar } from "react-icons/fa";
import { FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { useEnrollMe } from "@/src/store/student/useEnrollMe";

const InstructorSearchResult = ({ details }) => {
  const { setEnrollMe, setEnrollCohort } = useEnrollMe();

  const handleEnroll = (idx) => {
    setEnrollMe(true);
    setEnrollCohort(idx);
  };

  return (
    <div className="mx-auto space-y-8 text-xs">
      <div className="bg-black backdrop-blur-md rounded-full py-3 px-6 flex items-center justify-center gap-6 text-white">
        <div className="flex items-center gap-2">
          <FaUsers size={16} />
          <span>{details.student_count} Students</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar size={16} className="text-yellow-400" />
          <span>
            {4.5} ({60} reviews)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock size={16} />
          <span>2 hours avg. response</span>
        </div>
      </div>

      <Card className="!text-[10px] !flex !space-y-6">
        <Card.Meta
          avatar={
            <Avatar
              className="!bg-transparent/90"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
            />
          }
          title={
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-1">
                <span className="font-extrabold capitalize">
                  {details?.name}{" "}
                </span>
                <Badge
                  count={
                    <span className="flex items-center text-white bg-blue-500  rounded-full">
                      <GoVerified size={15} />
                    </span>
                  }
                />
              </div>
              <Badge
                count={
                  <div className="!text-[8px] !flex !justify-center !items-center !gap-1 rounded-full bg-yellow-500 !px-2 !py-1 !text-white !font-extralight">
                    <FaRegStar />
                    <span>Top Rated</span>
                  </div>
                }
              />
            </div>
          }
        />
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <span className="line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              beatae enim! Voluptates similique, nam repellat nostrum rem
              temporibus dolores animi sed iusto voluptatem? Magnam dicta vero
              debitis exercitationem sunt repellendus omnis id, veniam esse vel
              molestiae amet, voluptatibus porro, saepe placeat laboriosam
              doloribus sint minima repellat dolore nostrum deserunt. Veniam
              consequatur sequi voluptates a adipisci laborum cum impedit nam
              architecto iusto! Facilis quasi dolore debitis! Impedit a sit et
              reprehenderit corrupti fuga officiis iure, nesciunt iusto
              architecto maiores eligendi dolorum. Eveniet repudiandae assumenda
              et nihil ipsam quod esse temporibus similique. Nemo beatae ad
              dolore consequatur praesentium provident dolorem nostrum
              inventore!
            </span>
          </div>
          <div className="flex text-[10px] gap-2">
            <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-1 px-2 gap-1">
              <FaRegStar />
              Top Rated Plus
            </div>
            <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-1 px-2 gap-1">
              <FaRegMessage />
              Quick Responder
            </div>
            <div className="rounded-lg bg-transparent/10 flex items-center justify-center py-1 px-2 gap-1">
              <GoShieldCheck />
              Expert Status
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {details?.subjects?.map((sub, index) => (
              <Badge
                key={index}
                count={
                  <div className="bg-black text-white text-[8px] p-1 rounded-sm">
                    {sub?.name}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </Card>

      {details?.topics?.map((i, index) => (
        <Card key={index} className="!text-black !text-[12px]">
          <Card.Meta
            title={
              <>
                <div className="flex gap-2 items-center">
                  <div className="bg-transparent/90 !text-white p-2 rounded-lg">
                    <BsGlobe size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold capitalize">
                      {i?.topic?.title}
                    </span>
                    <span className="text-[10px]">{i?.topic?.description}</span>
                  </div>
                </div>
              </>
            }
            description={i?.cohorts?.map((c, _) => (
              <div
                key={c?.cohort_id}
                className="flex flex-col mb-3 text-[10px]"
              >
                <div className="bg-[#001840]/5 !rounded-md !w-full !text-black !p-2 !text-[12px] space-y-1">
                  <div className="w-full flex justify-between">
                    <span className="text-[14px] font-black">
                      {c?.cohort_name}
                    </span>
                    <Badge
                      count={
                        <span className="flex items-center justify-center text-white !text-[10px] bg-black font-extrabold p-1 rounded-sm">
                          {c?.price?.toLocaleString()} Tsh
                        </span>
                      }
                    />
                  </div>
                  <div className="text-[10px] text-opacity-10">
                    {c?.description}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                      <FaRegClock size={10} />
                      <span>{c?.total_weeks} Weeks</span>
                    </div>
                    <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                      <LuUsers size={10} />
                      <span>{c?.total_enrolled_students} Enrolled</span>
                    </div>
                    <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                      <GoBook size={10} />
                      <span>Starts {c?.start_date}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEnroll(c?.cohort_id)}
                    className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          />
        </Card>
      ))}
    </div>
  );
};

const InstructorSearchResultSkeleton = () => {
  return (
    <div className="flex flex-col gap-6  py-6">
      <Skeleton.Node
        active={true}
        className="!w-full !rounded-full !h-[3rem]"
      />
      <Card>
        <Card.Meta
          title={
            <div className="flex gap-3 items-center">
              <Skeleton.Avatar size={50} active={true} />
              <div className="flex gap-2 items-center justify-center">
                <Skeleton.Node active={true} className="!h-6 !w-36" />
                <Skeleton.Avatar active={true} size={20} />
                <Skeleton.Node active={true} className="!h-4 !w-20" />
              </div>
            </div>
          }
        />

        <div className="!mt-4">
          <Skeleton
            title={false}
            paragraph={{
              rows: 3,
              width: ["80%", "100%", "100%"],
            }}
            active={true}
          />
        </div>

        <div className="!flex !mt-4 !gap-2 !flex-wrap">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Node
                key={index}
                className="!h-[1.5rem] !w-[8rem]"
                active={true}
              />
            ))}
        </div>
        <div className="!flex !mt-4 !gap-2 !flex-wrap">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Node
                key={index}
                className="!h-[1rem] !w-[5rem]"
                active={true}
              />
            ))}
        </div>
      </Card>
      <Card className="flex flex-col gap-5">
        <div className="m-2 flex gap-3">
          <Skeleton.Avatar shape="circular" active={true} size={60} />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton
              active={true}
              paragraph={{
                rows: 2,
                width: ["80%", "60%"],
              }}
              title={false}
            />
          </div>
        </div>

        <div className="space-y-8 mt-6">
          {Array(2)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 2,
                    width: ["50%", "80%"],
                  }}
                  title={false}
                />

                <div className="!flex !gap-2 !flex-wrap">
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton.Node
                        key={index}
                        className="!h-[1rem] !w-[4rem]"
                        active={true}
                      />
                    ))}
                </div>
                <Skeleton.Button active={true} className="!w-full" />
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export { InstructorSearchResult, InstructorSearchResultSkeleton };
