import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Empty,
  Card,
  Typography,
  Tag,
  Skeleton,
  Result,
  Tooltip,
} from "antd";
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

import {
 
  FaUserCircle,
  FaBell,
  FaChalkboardTeacher,
  FaBookReader,

} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useNewClass } from "@/src/store/student/class";
import { useRouter } from "next/navigation";
import { apiGet } from "@/src/services/api_service";
import { getInstructorDetails } from "@/src/utils/fns/global";
import { useSearch } from "@/src/hooks/useSearch";


const SearchResultCard = ({ data, onClick }) => {
  const { subjects, topics, teachers } = data;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("sw-TZ", {
      style: "currency",
      currency: "TZS",
      maximumFractionDigits: 0,
    }).format(price);
  };

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
      // whileHover="hover"
      variants={cardVariants}
      // className="rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Subjects Section */}
      {/* {subjects && subjects.length > 0 && (
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <h3 className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Subjects
              </h3>
            </div>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="rounded-xl p-4 bg-gradient-to-r from-purple-50 to-blue-50
                  border border-transparent hover:border-blue-200 cursor-pointer
                  transform transition-all duration-300"
                  onClick={() => onClick(subject)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {subject.name}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {subject.description}
                      </p>
                    </div>
                    <FaArrowRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )} */}

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
                      <div className="flex items-center mt-2 space-x-2">
                  
                      </div>
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
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-violet-500 flex items-center justify-center">
                        <FaUserCircle className="text-3xl text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {teacher.user.first_name} {teacher.user.last_name}
                      </h4>
                      {/* <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                          NIDA: {teacher.nida}
                        </span>
                      </div> */}
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
    searchResults,
    isSearching,
    searchContainerRef,
    clearSearch,
    handleResultClick
  } = useSearch();
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isSearching, setIsSearching] = useState({
  //   loading: false,
  //   resultsVisible: false,
  // });
  // const { openNewClass, setOpenNewClass } = useNewClass();
  const router = useRouter();
  // const searchContainerRef = useRef(null);
  // const searchInputRef = useRef(null);

  // const clearSearch = () => {
  //   setSearchTerm("");
  //   setSearchResults([]);
  //   setIsSearching((prev) => ({
  //     ...prev,
  //     loading: false,
  //     resultsVisible: false,
  //   }));
  // };

  // const performSearch = React.useCallback(async () => {
  //   setIsSearching((prev) => ({
  //     ...prev,
  //     loading: true,
  //     resultsVisible: true,
  //   }));
  //   try {
  //     const response = await apiGet(`search?q=${searchTerm}`);
  //     if (response.status === 200) {
  //       setSearchResults(response.data);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setIsSearching((prev) => ({
  //       ...prev,
  //       loading: false,
  //       resultsVisible: searchTerm.trim().length > 0,
  //     }));
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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       searchContainerRef.current &&
  //       !searchContainerRef.current.contains(event.target)
  //     ) {
  //       clearSearch();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isSearching.resultsVisible) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //     document.body.style.filter = "none";
  //   };
  // }, [isSearching.resultsVisible]);

  // const handleResultClick = (item) => {
  //   getInstructorDetails(item.id);
  //   setOpenNewClass(true);
  //   setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
  // };

  return (

    // <div
    //   ref={searchContainerRef}
    //   className="fixed top-14 left-0 w-full z-10 bg-white shadow-sm lg:px-32"
    // >
    //   <div className="max-w-7xl mx-auto px-4 py-4">
    //     <div className="relative flex justify-between w-full items-center space-x-4">
    //       <div className="w-full md:w-[653px] relative">
    //         <Input.Search
    //           placeholder="Search subjects, teachers or topics..."
    //           prefix={<IoMenu className="text-gray-400 mr-2" />}
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           loading={isSearching.loading}
    //           allowClear={{
    //             clearIcon: (
    //               <CloseOutlined
    //                 className="text-gray-500 hover:text-red-500 transition-colors"
    //                 onClick={clearSearch}
    //               />
    //             ),
    //           }}
    //         />

    //         <AnimatePresence>
    //           {isSearching.resultsVisible && (
    //             <motion.div
    //               initial={{ opacity: 0, y: -10 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               exit={{ opacity: 0, y: -10 }}
    //               className="absolute top-full w-full mt-2 z-50"
    //             >
    //               <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[70vh] overflow-y-auto">
    //                 {isSearching.loading ? (
    //                   <div className="p-6 text-center">
    //                     <Skeleton active />
    //                   </div>
    //                 ) : searchResults.length === 0 ? (
    //                   <div className="p-4 text-center">
    //                     <Empty
    //                       image={Empty.PRESENTED_IMAGE_SIMPLE}
    //                       description={
    //                         <span className="text-gray-500">
    //                           No results found
    //                         </span>
    //                       }
    //                     />
    //                   </div>
    //                 ) : (
    //                   searchResults.map((result, index) => (
    //                     <SearchResultCard key={index} data={result} />
    //                   ))
    //                 )}
    //               </div>
    //             </motion.div>
    //           )}
    //         </AnimatePresence>
    //       </div>
    //     </div>
    //   </div>
    // </div>


    <div
      ref={searchContainerRef}
      className="fixed top-11 left-0 w-full z-10 shadow-sm"
    >
      <div className=" mx-auto lg:px-20 px-4 py-4 bg-white ">
        <div className="relative flex justify-between w-full items-center space-x-4">
          <div className="w-full md:w-[653px] relative">
            <Input.Search
              // ref={searchContainerRef}
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

            <Tooltip placement="top" title="My Profile">
              <FaUserCircle
                className="text-xl text-black hover:text-blue-700 cursor-pointer transition-colors"
                onClick={() => router.push("/student/profile")}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
