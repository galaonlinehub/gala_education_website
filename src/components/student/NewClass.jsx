import {
  Drawer,
  Spin,
  Input,
  Empty,
  Avatar,
  Badge,
  Card,
  Button,
  Skeleton,
} from "antd";
import { useNewClass } from "@/src/store/student/class";
import { SearchResultCard } from "./Search";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { apiGet } from "@/src/services/api_service";
import { useSearchParams } from "next/navigation";
import { FaUsers, FaStar, FaClock } from "react-icons/fa";
import { GoVerified, GoBook } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaRegMessage, FaRegClock } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { useUserTopcs } from "@/src/store/user_topics";

import { createStyles, useTheme } from "antd-style";
import { getInstructorDetails } from "@/src/utils/fns/global";
import { useSearchResult } from "@/src/store/search_result";
import RootLoading from "@/app/loading";
import Pay from "../Pay/Pay";
import { TopicCard } from "@/src/components/ui/TopicCard";

const useStyle = createStyles(({ token }) => ({
  "my-drawer-body": {
    background: token.blue1,
  },
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-drawer-header": {
    background: token.green1,
  },
  "my-drawer-footer": {
    color: token.colorPrimary,
  },
  "my-drawer-content": {
    borderLeft: "2px dotted #333",
  },
}));

const NewClass = () => {
  const queryClient = useQueryClient();
  const { openNewClass, setOpenNewClass } = useNewClass();
  const [selectedClasses, setSelectedClasses] = useState([]);

  const onClose = () => {
    setOpenNewClass(false);
  };

  // const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState({
    loading: false,
    resultsVisible: false,
  });
  // const router = useRouter();
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const { searchLoading, searchResults, setSearchResults, setSearchLoading } =
    useSearchResult();

  const clearSearch = () => {
    setSearchTerm("");
    // setSearchResults([]);
    // setIsSearching((prev) => ({
    //   ...prev,
    //   loading: false,
    //   resultsVisible: false,
    // }));
  };

  // const performSearch = React.useCallback(async () => {
  //   // setIsSearching((prev) => ({
  //   //   ...prev,
  //   //   loading: true,
  //   //   resultsVisible: true,
  //   // }));
  //   try {
  //     setSearchLoading(true);
  //     const response = await apiGet(`search?q=${searchTerm}`);
  //     if (response.status === 200) {
  //       setSearchResults(response.data);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setSearchLoading(false);
  //     // setIsSearching((prev) => ({
  //     //   ...prev,
  //     //   loading: false,
  //     //   resultsVisible: searchTerm.trim().length > 0,
  //     // }));
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (searchTerm.trim()) {
  //       performSearch();
  //     } else {
  //       setSearchResults([]);
  //       setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
  //     }
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [performSearch, searchTerm]);

  useEffect(() => {
    if (openNewClass) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.filter = "none";
    };
  }, [openNewClass]);

  const searchParams = useSearchParams();
  const idx = searchParams.get("user");

  const { styles } = useStyle();
  const token = useTheme();

  const classNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
  };

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
    header: {
      borderBottom: `1px solid ${token.colorPrimary}`,
    },
    body: {
      fontSize: token.fontSizeLG,
    },
    footer: {
      borderTop: `1px solid ${token.colorBorder}`,
    },
  };

  const certifications = [
    "AWS Solutions Architect",
    "Google Cloud Professional",
    "Microsoft Azure Expert",
    "Science",
    "Mathematics",
    "Bios",
    "Computer",
    "Logos",
  ];

  const [enroll, setEnroll] = useState(false);

  const enrollNow = () => {
    setEnroll(true);

  };

  return (
    <>
      <Drawer
        title="Explore Classes, Topics, Subtopics and Instructors..."
        width={2024}
        onClose={onClose}
        open={openNewClass}
        styles={drawerStyles}
      >
        <TopicCard />
        {false && <Pay />}
        {false && (
          <div>
            <div ref={searchContainerRef}>
              <div className="mx-auto px-4 py-4">
                <div className="relative flex justify-between w-full items-center space-x-4">
                  <div className="w-full relative">
                    <Input.Search
                      ref={searchInputRef}
                      placeholder="Search subjects, teachers or topics..."
                      prefix={<IoMenu className="text-gray-400 mr-2" />}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      loading={searchLoading}
                      allowClear={{
                        clearIcon: (
                          <CloseOutlined
                            className="text-gray-500 hover:text-red-500 transition-colors"
                            onClick={clearSearch}
                          />
                        ),
                      }}
                    />

                    {/* <AnimatePresence>
                  {isSearching.resultsVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className=" top-full w-full mt-2"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[70vh] overflow-y-auto">
                        {isSearching.loading ? (
                          <div className="p-6 text-center flex items-center justify-center">
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{ fontSize: 28 }}
                                  spin
                                />
                              }
                            />
                          </div>
                        ) : (
                          <>
                            {searchResults.length === 0 ||
                            searchResults.every(
                              (result) =>
                                (!result.subjects ||
                                  result.subjects.length === 0) &&
                                (!result.topics ||
                                  result.topics.length === 0) &&
                                (!result.teachers ||
                                  result.teachers.length === 0)
                            ) ? (
                              <div className="p-4 text-center">
                                <Empty
                                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                                  description={
                                    <span className="text-gray-500">
                                      No results found
                                    </span>
                                  }
                                />
                              </div>
                            ) : (
                              searchResults.map((result, index) => (
                                <SearchResultCard
                                  key={index}
                                  data={result}
                                  onClick={() => {}}
                                />
                              ))
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence> */}
                  </div>
                </div>
              </div>
            </div>

            {searchLoading ? (
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
            ) : (
              <div className="mx-auto space-y-8 text-xs">
                <div className="bg-black backdrop-blur-md rounded-full py-3 px-6 flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <FaUsers size={16} />
                    <span>{200} Students</span>
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

                <Card
                  loading={searchLoading}
                  className="!text-[10px] !flex !space-y-6"
                >
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
                          <span className="font-extrabold">
                            {searchResults?.user?.first_name}{" "}
                            {searchResults?.user?.last_name}
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore, beatae enim! Voluptates similique, nam repellat
                        nostrum rem temporibus dolores animi sed iusto
                        voluptatem? Magnam dicta vero debitis exercitationem
                        sunt repellendus omnis id, veniam esse vel molestiae
                        amet, voluptatibus porro, saepe placeat laboriosam
                        doloribus sint minima repellat dolore nostrum deserunt.
                        Veniam consequatur sequi voluptates a adipisci laborum
                        cum impedit nam architecto iusto! Facilis quasi dolore
                        debitis! Impedit a sit et reprehenderit corrupti fuga
                        officiis iure, nesciunt iusto architecto maiores
                        eligendi dolorum. Eveniet repudiandae assumenda et nihil
                        ipsam quod esse temporibus similique. Nemo beatae ad
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
                      {certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          count={
                            <div className="bg-black text-white text-[8px] p-1 rounded-sm">
                              {cert}
                            </div>
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Card>

                <Card
                  loading={searchLoading}
                  className="!text-black !text-[12px]"
                >
                  <Card.Meta
                    title={
                      <>
                        <div className="flex gap-2 items-center">
                          <div className="bg-transparent/90 !text-white p-2 rounded-lg">
                            <BsGlobe size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold">
                              Cloud Architecture
                            </span>
                            <span className="text-[10px]">
                              Master cloud computing from basics to advanced
                              concepts
                            </span>
                          </div>
                        </div>
                      </>
                    }
                    description={
                      <div className="flex flex-col gap-3 text-[10px]">
                        <div className="bg-[#f9fafb] !rounded-md !w-full !text-black !p-2 !text-[12px] space-y-1">
                          <div className="w-full flex justify-between">
                            <span className="text-[12px] font-bold">
                              AWS Solutions Architecture
                            </span>
                            <Badge
                              count={
                                <span className="flex items-center justify-center text-white !text-[8px] bg-black p-1 rounded-sm">
                                  15,000 Tsh
                                </span>
                              }
                            />
                          </div>
                          <div className="text-[10px] text-opacity-10">
                            Complete guide to building scalable systems on AWS
                          </div>
                          <div className="flex gap-2">
                            <div className="flex border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <FaRegClock size={10} />
                              <span>12 Weeks</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <LuUsers size={10} />
                              <span>19 Enrolled</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <GoBook size={10} />
                              <span>Starts Feb 15</span>
                            </div>
                          </div>
                          <Button
                            onClick={enrollNow}
                            className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs"
                          >
                            Enroll Now
                          </Button>
                        </div>

                        <div className="bg-[#f9fafb] !rounded-md !w-full !text-black !p-2 !text-[12px] space-y-1">
                          <div className="w-full flex justify-between">
                            <span className="text-[12px] font-bold">
                              AWS Solutions Architecture
                            </span>
                            <Badge
                              count={
                                <span className="flex items-center justify-center text-white !text-[8px] bg-black p-1 rounded-sm">
                                  15,000 Tsh
                                </span>
                              }
                            />
                          </div>
                          <div className="text-[10px] text-opacity-10">
                            Complete guide to building scalable systems on AWS
                          </div>
                          <div className="flex gap-2">
                            <div className="flex border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <FaRegClock size={10} />
                              <span>12 Weeks</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <LuUsers size={10} />
                              <span>19 Enrolled</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <GoBook size={10} />
                              <span>Starts Feb 15</span>
                            </div>
                          </div>
                          <Button className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs">
                            Enroll Now
                          </Button>
                        </div>

                        <div className="bg-[#f9fafb] !rounded-md !w-full !text-black !p-2 !text-[12px] space-y-1">
                          <div className="w-full flex justify-between">
                            <span className="text-[12px] font-bold">
                              AWS Solutions Architecture
                            </span>
                            <Badge
                              count={
                                <span className="flex items-center justify-center text-white !text-[8px] bg-black p-1 rounded-sm">
                                  15,000 Tsh
                                </span>
                              }
                            />
                          </div>
                          <div className="text-[10px] text-opacity-10">
                            Complete guide to building scalable systems on AWS
                          </div>
                          <div className="flex gap-2">
                            <div className="flex border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <FaRegClock size={10} />
                              <span>12 Weeks</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <LuUsers size={10} />
                              <span>19 Enrolled</span>
                            </div>
                            <div className="flex  border-[0.009rem] border-black bg-white px-2 items-center justify-center text-[8px] rounded-sm gap-1 font-bold">
                              <GoBook size={10} />
                              <span>Starts Feb 15</span>
                            </div>
                          </div>
                          <Button className="!w-full !bg-black !mt-2 !text-white !border-transparent hover:!border-transparent !text-xs">
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    }
                  />

                  <div></div>
                </Card>
              </div>
            )}
          </div>
        )}

      </Drawer>
    </>
  );
};

export default NewClass;