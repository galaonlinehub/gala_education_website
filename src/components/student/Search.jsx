import React from "react";
import Clock from "../ui/Clock";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Updates from "../ui/notification/Updates";
import { CloseOutlined } from "@ant-design/icons";
import { useUser } from "@/src/hooks/data/useUser";
import { Input, Empty, Tooltip, Avatar } from "antd";
import { img_base_url } from "@/src/config/settings";
import { useSearch } from "@/src/hooks/data/useSearch";
import { AnimatePresence, motion } from "framer-motion";
import SlickSpinner from "../ui/loading/template/SlickSpinner";
import { FaChalkboardTeacher, FaBookReader } from "react-icons/fa";
import { LuBell, LuChevronRight, LuCircleUser, LuUser } from "react-icons/lu";

const SearchResultCard = ({ data, onClick }) => {
  const { topics, teachers } = data;

  const cardVariants = {
    hover: { y: -2, transition: { duration: 0.2, ease: "easeOut" } },
  };

  const itemVariants = {
    hover: {
      scale: 1.01,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto space-y-8 text-black"
    >
      {/* Topics Section */}
      {topics && topics.length > 0 && (
        <motion.section
          variants={cardVariants}
          whileHover="hover"
          className="bg-white overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg">
                <FaBookReader className="text-lg text-black" />
              </div>
              <div>
                <h2 className="text-xl font-medium">Topics</h2>
                <p className="text-xs text-gray-800">
                  {topics.length} topic{topics.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-3">
              {topics.map(({ id, type, subject, title }, index) => (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  className="group relative hover:bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-black hover:shadow-sm transition-all duration-300 cursor-pointer"
                  onClick={() => onClick({ id, type })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pl-3">
                      <span
                        className="font-semibold text-gray-900 group-hover:text-black text-base leading-tight">
                        {title}
                      </span>
                      {subject && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {subject}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <LuChevronRight />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Instructors Section */}
      {teachers && teachers.length > 0 && (
        <motion.section
          variants={cardVariants}
          whileHover="hover"
          className="border-t border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg">
                <FaChalkboardTeacher className="text-lg text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Instructors</h2>
                <p className="text-xs text-gray-800">
                  {teachers.length} instructor{teachers.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-3">
              {teachers.map(
                (
                  { instructor_id: id, name, profile_picture, subjects, type },
                  index
                ) => (
                  <motion.div
                    key={id}
                    variants={itemVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                    className="group w-full hover:bg-gray-100 rounded-lg p-4 
                           border border-gray-200 hover:border-black hover:shadow-sm
                           transition-all duration-300 cursor-pointer"
                    onClick={() => onClick({ id, type })}
                  >
                    <div className="flex items-center gap-4 w-full pl-3">
                      <div className="flex-shrink-0">
                        <Avatar
                          src={
                            profile_picture
                              ? `${img_base_url}${profile_picture}`
                              : undefined
                          }
                          icon={<LuUser color="black" />}
                          className="w-14 h-14 border-[0.8px] hover:border-2 border-gray-300 group-hover:border-black 
                                   transition-colors duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between w-full">
                          <div className="flex-1 min-w-0">
                            {/* Name */}
                            <h3
                              className="font-semibold text-gray-900 group-hover:text-black 
                                       text-lg leading-tight capitalize mb-1"
                            >
                              {name}
                            </h3>

                            {/* Subjects */}
                            <div className="text-sm text-gray-600">
                              {subjects && subjects.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {subjects.slice(0, 4).map((subject, i) => (
                                    <span
                                      key={i}
                                      className="inline-block bg-white border-[0.8px] border-gray-300 group-hover:border-gray-400
                                             px-2 py-1 rounded text-xs capitalize transition-colors duration-300"
                                    >
                                      {subject}
                                    </span>
                                  ))}
                                  {subjects.length > 4 && (
                                    <span className="inline-block bg-black text-white px-2 py-1 rounded text-xs">
                                      +{subjects.length - 4} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 italic text-xs">
                                  No subjects listed
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Indicator */}
                          <div
                            className="flex items-center ml-4 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300 flex-shrink-0"
                          >
                            <div className="text-right">
                              <div className="text-xs text-black font-medium flex items-center gap-1">
                                <span>View Profile</span>
                                <LuChevronRight />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.section>
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
                          <SlickSpinner color="black" size={30} />
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
