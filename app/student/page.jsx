"use client";

import { useState, useRef } from "react";
import ReadMoreContainer from "@/src/components/ui/ReadMore";
import Image from "next/image";
import { theme, Skeleton, Card, Empty, Tooltip } from "antd";
import CalendarComponent from "@/src/components/student/CalendarComponent";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import { useUserTopics } from "@/src/store/user_topics";
import { TopicSkeleton } from "@/src/components/ui/loading/skeletons/ClassCard";
import { FaPlus } from "react-icons/fa6";

export default function Component() {
  const router = useRouter();
  const { user } = useUser();
  const { enrolledTopics, enrolledTopicsLoading, enrolledToicsError } =
    useEnrolledTopics();

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const scrollRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex lg:gap-x-5 justify-center items-start flex-col lg:flex-row px-2 my-24">
      <div className="flex-col w-full lg:w-2/3 flex">
        <div className="p-4 h-fit w-full border-blue-600 border rounded-xl flex flex-col relative">
          <div>
            <div className="flex flex-col">
              <div className="font-bold text-sm">
                {user ? (
                  <>
                    Welcome back,{" "}
                    <span className="text-blue-700 capitalize">
                      {user.first_name} {user.last_name}
                    </span>{" "}
                    !
                  </>
                ) : (
                  <>
                    Welcome back,
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: 60,
                        minWidth: 60,
                        height: 16,
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginTop: "-4px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: 80,
                        minWidth: 80,
                        height: 16,
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginTop: "-4px",
                        marginRight: "10px",
                      }}
                    />
                    !
                  </>
                )}
              </div>
              <div>
                <ReadMoreContainer />
              </div>
            </div>
            <div className="absolute sm:-top-16 -top-8 sm:right-4 right-2">
              <Image
                className="h-[8rem] w-[8rem] sm:w-[12rem] sm:h-[12rem] "
                src="/sitting_on_books.png"
                alt="An image of a character sitting on books"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-between items-center w-full">
            <span className="text-[16px] font-black">Upcoming Lessons</span>
            <div className="flex items-center justify-center gap-5">
              <Tooltip
                title="Add a new subject"
                // overlayInnerStyle={{
                //   backgroundColor: "#001840",
                //   color: "#fff",
                //   borderRadius: "0.375rem",
                //   padding: "0.5rem",
                // }}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-center p-1 rounded-md bg-[#001840] text-white">
                  <FaPlus size={10} />
                </div>
              </Tooltip>
              {enrolledTopics && enrolledTopics.length > 0 && (
                <span
                  className="text-[12px] font-black text-[#030DFE] cursor-pointer"
                  onClick={() => router.push("/student/library")}
                >
                  See All
                </span>
              )}
            </div>
          </div>

          <div className="">
            <div className="flex items-center mt-2 w-full">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 pb-4 w-full"
              >
                {enrolledTopicsLoading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => <TopicSkeleton key={index} />)
                ) : enrolledTopics && enrolledTopics.length > 0 ? (
                  <>
                    {enrolledTopics.map((subject, index) => (
                      <div
                        key={index}
                        className="flex-none flex-col text-xs font-bold rounded-md w-60 h-28 p-5 bg-[#001840] text-white"
                      >
                        <div className="mb-3">{subject.name}</div>
                        <div>Class size: {subject.classSize}</div>
                        <div>Days: {subject.days}</div>
                      </div>
                    ))}
                    <button
                      onClick={scrollRight}
                      className="ml-2 p-2 rounded-full transition flex items-center justify-center"
                    >
                      <svg
                        width="15"
                        height="24"
                        viewBox="0 0 15 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0595 10.9406C13.6454 11.5265 13.6454 12.4781 13.0595 13.064L5.55947 20.564C4.97353 21.15 4.02197 21.15 3.43604 20.564C2.8501 19.9781 2.8501 19.0265 3.43604 18.4406L9.87666 12L3.44072 5.55935C2.85479 4.97341 2.85479 4.02185 3.44072 3.43591C4.02666 2.84998 4.97822 2.84998 5.56416 3.43591L13.0642 10.9359L13.0595 10.9406Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center">
                    <Empty
                      description={
                        <span className="!text-gray-500 !text-xs !italic ">
                          You are not enrolled in any topics at the moment.!
                        </span>
                      }
                      className="text-center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 mb-10 lg:mb-0 w-full">
          <span className="text-[16px] font-black mb-2">Your Classes</span>
          <div className="overflow-x-auto">
            <div className="min-w-[600px] flex flex-col gap-3">
              <div className="bg-blue-950 w-full flex justify-between items-center font-bold text-xs text-white rounded-md p-2">
                {[
                  "Class",
                  "Members",
                  "Starting",
                  "End",
                  "Material",
                  "Percentage",
                ].map((header, index) => (
                  <span key={index} className="text-center py-2 flex-1">
                    {header}
                  </span>
                ))}
              </div>
              {enrolledTopicsLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between font-bold text-xs w-full gap-2"
                    >
                      {Array(6)
                        .fill(0)
                        .map((_, idx) => (
                          <Skeleton
                            key={idx}
                            paragraph={{ rows: 1, width: "100%" }}
                            title={false}
                            active
                          />
                        ))}
                    </div>
                  ))
              ) : enrolledTopics && enrolledTopics.length > 0 ? (
                enrolledTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="border border-blue-600 flex items-center justify-between text-xs rounded-md w-full p-2"
                  >
                    <span className="py-1 w-1/6 text-left truncate capitalize">
                      {topic.subtopic_name}
                    </span>
                    <span className="py-1 w-1/6 text-center truncate capitalize">
                      {topic.class_size}
                    </span>
                    <span className="py-1 w-1/6 text-center truncate capitalize">
                      {topic.start_date}
                    </span>
                    <span className="py-1 w-1/6 text-center truncate capitalize">
                      {topic.end_date}
                    </span>
                    <span className="py-1 w-1/6 text-center truncate capitalize">
                      <span
                        className="hover:cursor-pointer hover:font-black hover:animate-ping hover:text-blue-600"
                        onClick={() => alert("View docs")}
                      >
                        View
                      </span>
                    </span>
                    <span className="py-1 w-1/6 text-center truncate capitalize">
                      {topic.progress}
                    </span>
                  </div>
                ))
              ) : (
                <Empty
                  description={
                    <span className="!text-gray-500 !text-xs !italic ">
                      No classes available at the moment.
                    </span>
                  }
                  className="text-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <CalendarComponent />

      {/* {user && <Notification showNotification={true} />} */}
    </div>
  );
}
