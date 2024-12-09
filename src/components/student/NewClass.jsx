import { Drawer, Spin, Input, Empty } from "antd";
import { useNewClass } from "@/src/store/student/class";
import { SearchResultCard } from "./Search";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { apiGet } from "@/src/services/api_service";

const NewClass = () => {
  const { openNewClass, setOpenNewClass } = useNewClass();
  const onClose = () => {
    setOpenNewClass(false);
  };

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState({
    loading: false,
    resultsVisible: false,
  });
  // const router = useRouter();
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

  return (
    <>
      <Drawer
        title="Explore Classes, Topics, Subtopics and Instructors..."
        width={720}
        onClose={onClose}
        open={openNewClass}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button onClick={onClose} type="primary">
        //       Submit
        //     </Button>
        //   </Space>
        // }
      >
        <div
          ref={searchContainerRef}
          // className="fixed top-16 left-0 w-full z-40 bg-white shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative flex justify-between w-full items-center space-x-4">
              <div className="w-full md:w-[653px] relative">
                <Input.Search
                  ref={searchInputRef}
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
                          <div className="p-6 text-center flex items-center justify-center">
                            {/* <div className="grid gap-2">
                              {[...Array(3)].map((_, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-50 rounded-lg p-3 
                                          flex justify-between items-center"
                                >
                                  <div className="flex-grow pr-4">
                                    <Skeleton
                                      active
                                      title={{
                                        width: "75%",
                                      }}
                                      paragraph={{
                                        rows: 1,
                                        width: "100%",
                                      }}
                                    />
                                  </div>
                                  <Skeleton.Avatar
                                    active
                                    size="small"
                                    shape="circle"
                                  />
                                </div>
                              ))}
                            </div> */}
                            {/* <FaSpinner/> */}
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
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default NewClass;
