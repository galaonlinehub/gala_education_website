import React from "react";
import { Input, Empty, Skeleton, Tooltip, Avatar } from "antd";
import { IoMenu } from "react-icons/io5";
import { CloseOutlined } from "@ant-design/icons";
import { FaChalkboardTeacher, FaBookReader } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearch } from "@/src/hooks/data/useSearch";
import { notificationService } from "@/src/components/ui/notification/Notification";
import { useUser } from "@/src/hooks/data/useUser";
import { LuBell, LuCircleUser, LuUser } from "react-icons/lu";
import Updates from "../ui/notification/Updates";
import Clock from "../ui/Clock";
import LoaderCircle from "@/app/student/search/page";
import StuckSpinner from "../ui/loading/template/StuckSpinner";
import SlickSpinner from "../ui/loading/template/SlickSpinner";
import { img_base_url } from "@/src/config/settings";

const SearchResultCard = ({ data, onClick }) => {
  const { topics, teachers } = data;

  const cardVariants = {
    hover: { y: -8, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hover: { x: 8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      variants={cardVariants}
    >
      {/* Topics Section */}
      {topics && topics.length > 0 && (
        <div className="relative bg-gray-50">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <FaBookReader className="text-xl text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Topics
              </h3>
            </div>
            <div className="grid gap-3">
              {topics.map((topic) => (
                <motion.div
                  key={topic.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="rounded-xl p-4 shadow-sm hover:shadow-md  
                  border-l-4 border-transparent hover:border-l-cyan-500
                  transform transition-all duration-300 cursor-pointer"
                  onClick={() => onClick(topic)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {topic.title}
                      </h4>
                      <div className="flex items-center mt-2 space-x-2"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructors Section */}
      {teachers && teachers.length > 0 && (
        <div className="relative bg-gray-50">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-teal-500" />
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-violet-500 to-violet-500 p-2 rounded-lg">
                <FaChalkboardTeacher className="text-xl text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold bg-gradient-to-r from-violet-500 to-violet-500 bg-clip-text text-transparent">
                Instructors
              </h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {teachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="rounded-xl p-4 bg-gradient-to-r from-violet-50 to-violet-50
                  hover:shadow-md cursor-pointer transform transition-all duration-300"
                  onClick={() => onClick(teacher)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="">
                      <Avatar
                        src={`${img_base_url}${teacher.user?.profile_picture}`}
                        icon={<LuUser />}
                        className="w-12 h-12 border border-violet-900"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {teacher.user.first_name} {teacher.user.last_name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const StudentSearch = () => {
  const {
    searchTerm,
    setSearchTerm,
    isResultsEmpty,
    searchResults,
    isSearching,
    searchContainerRef,
    clearSearch,
    handleResultClick,
  } = useSearch();

  const router = useRouter();
  const { user } = useUser();

  return (
    <div
      ref={searchContainerRef}
      className="fixed top-12 left-0 right-0 w-full z-10 bg-white shadow-sm lg:px-8"
    >
      <div className="mx-auto lg:px-20 px-4 pt-1 pb-2  bg-white">
        <div className="relative flex justify-between w-full items-center space-x-4">
          {user?.role === "student" ? (
            <div className="w-full md:w-[653px] relative">
              <Input.Search
                placeholder="Search subjects, teachers or topics..."
                prefix={<IoMenu className="text-gray-400 mr-2" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                loading={isSearching.loading}
                allowClear={{
                  clearIcon: (
                    <CloseOutlined
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      onClick={clearSearch}
                    />
                  ),
                }}
              />

              <AnimatePresence>
                {isSearching.resultsVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full w-full mt-2 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[70vh] overflow-y-auto">
                      {isSearching.loading ? (
                        <div className="h-[16rem] flex items-center justify-center">
                          <SlickSpinner size={30} />
                        </div>
                      ) : (
                        <>
                          {isResultsEmpty ? (
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
                                onClick={handleResultClick}
                              />
                            ))
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Clock />
          )}
          <div className="md:flex items-center justify-center gap-8 hidden">
            {user?.role === "student" && <Clock />}
            <div className="flex items-center gap-3">
              <Updates>
                <Tooltip placement="top" title="Notifications">
                  <LuBell className="text-xl text-black hover:text-blue-600 cursor-pointer transition-colors" />
                </Tooltip>
              </Updates>

              <Tooltip placement="top" title="My Profile">
                <LuCircleUser
                  className="text-xl text-black hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={() => router.push(`/${user.role}/profile`)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
