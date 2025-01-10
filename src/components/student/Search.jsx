import React, { useState, useEffect, useRef } from "react";
import { Input, Empty, Card, Typography, Tag, Skeleton, Result } from "antd";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { IoMenu, IoSearch } from "react-icons/io5";

import {
  BookOutlined,
  TagOutlined,
  UserOutlined,
  DollarOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useNewClass } from "@/src/store/student/class";
import { useRouter } from "next/navigation";
import { apiGet } from "@/src/services/api_service";
import { FaBook } from "react-icons/fa";
import { MdTopic } from "react-icons/md";
import { getInstructorDetails } from "@/src/utils/fns/global";

const { Title, Text } = Typography;

export const SearchResultCard = ({ data, onClick }) => {
  const { subjects, topics, teachers } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Subjects Section */}
      {subjects && subjects.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center mb-3">
            <FaBook className="mr-3 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Subjects</h3>
          </div>
          <div className="grid gap-2">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-lg p-3 
                hover:bg-blue-100 transition-colors 
                flex justify-between items-center group cursor-pointer"
                onClick={() => onClick(subject)}
              >
                <div>
                  <div
                    className="font-medium 
                    group-hover:text-blue-900 transition-colors"
                  >
                    {subject.name}
                  </div>
                  <div
                    className="text-sm text-gray-600 
                    line-clamp-2 mt-1"
                  >
                    {subject.description}
                  </div>
                </div>
                <InfoCircleOutlined
                  className="hover:text-blue-600 
                  transition-colors opacity-0 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Topics Section */}
      {topics && topics.length > 0 && (
        <div className="p-4 border-b">
          <div className="flex items-center mb-3">
            <MdTopic className="mr-3 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Topics</h3>
          </div>
          <div className="grid gap-2">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-lg p-3 
                flex justify-between items-center 
               transition-colors group cursor-pointer"
                onClick={() => onClick(topic)}
              >
                <span
                  className="font-medium 
                   transition-colors"
                >
                  {topic.title}
                </span>
                <Tag
                  icon={<DollarOutlined />}
                  color="green"
                  className="font-semibold"
                >
                  ${topic.price}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructors Section */}
      {teachers && teachers.length > 0 && (
        <div className="p-4">
          <div className="flex items-center mb-3">
            <UserOutlined className="mr-3  text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Instructors</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="rounded-lg p-3 
                flex items-center space-x-3 
                transition-colors group cursor-pointer"
                onClick={() => onClick(teacher)}
              >
                <div
                  className="w-12 h-12  
                  rounded-full flex items-center justify-center"
                >
                  <UserOutlined className="" />
                </div>
                <div>
                  <div
                    className="font-medium  
                     transition-colors"
                  >
                    {teacher.user.first_name} {teacher.user.last_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    NIDA: {teacher.nida}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const StudentSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState({
    loading: false,
    resultsVisible: false,
  });
  const { openNewClass, setOpenNewClass } = useNewClass();
  const router = useRouter();
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching((prev) => ({
      ...prev,
      loading: false,
      resultsVisible: false,
    }));
  };

  const performSearch = React.useCallback(async () => {
    setIsSearching((prev) => ({
      ...prev,
      loading: true,
      resultsVisible: true,
    }));
    try {
      const response = await apiGet(`search?q=${searchTerm}`);
      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
    } finally {
      setIsSearching((prev) => ({
        ...prev,
        loading: false,
        resultsVisible: searchTerm.trim().length > 0,
      }));
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
        setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [performSearch, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        clearSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearching.resultsVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.filter = "none";
    };
  }, [isSearching.resultsVisible]);

  const handleResultClick = (item) => {
    // router.push(`/student/library`);
    getInstructorDetails(item.id);
    setOpenNewClass(true);
    setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
  };

  return (
    <div
      ref={searchContainerRef}
      className="fixed top-14 left-0 w-full z-50 bg-white shadow-sm lg:px-32"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative flex justify-between w-full items-center space-x-4">
          <div className="w-full md:w-[653px] relative">
            <Input.Search
              ref={searchInputRef}
              // className="!h-12 !rounded-full !border-2 !border-gray-300 focus:!border-blue-500 !transition-all !duration-300 !outline-none"
              placeholder="Search subjects, teachers or topics..."
              prefix={<IoMenu className="text-gray-400 mr-2" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              loading={isSearching.loading}
              // onBlur={() => {
              //   setIsSearching((prevState) => ({
              //     ...prevState,
              //     loading: false,
              //   }));
              // }}
              // onSearch={() => performSearch()}
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
                      <div className="p-6 text-center">
                        <div className="grid gap-2">
                          {[...Array(3)].map((_, index) => (
                            <div
                              key={index}
                              className="rounded-lg p-3 
                                          flex justify-between items-center"
                            >
                              <div className="flex-grow pr-4">
                                <Skeleton
                                  active
                                  title={false}
                                  paragraph={{
                                    rows: 2,
                                    width: ["80%", "100%", "100%"],
                                  }}
                                />
                              </div>
                              <Skeleton.Avatar
                                active
                                size="large"
                                shape="circle"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {searchResults.length === 0 ||
                        searchResults.every(
                          (result) =>
                            (!result.subjects ||
                              result.subjects.length === 0) &&
                            (!result.topics || result.topics.length === 0) &&
                            (!result.teachers || result.teachers.length === 0)
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

          <div className="lg:flex items-center space-x-4 hidden">
            <div className="relative inline-flex items-center">
              <FaBell className="text-xl text-black hover:text-blue-700 cursor-pointer transition-colors" />
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            </div>

            <FaUserCircle className="text-xl text-black hover:text-blue-700 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
