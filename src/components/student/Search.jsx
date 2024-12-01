import React, { useState } from "react";
import { Input, Empty } from "antd";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoMenu, IoSearch } from "react-icons/io5";
import { useNewClass } from "@/src/store/student/class";
import { useRouter } from "next/navigation";

const StudentSearch = () => {
  const [searchResults, setSearchResults] = useState(["3", 7, 9, 9]);
  const [isSearching, setIsSearching] = useState(false);
  const { openNewClass, setOpenNewClass } = useNewClass();
  const router = useRouter();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSearch = (value) => {
    // Implement your search logic here
    setIsSearching(value.trim() !== "");
    // Example: setSearchResults(...)
  };

  const clickSearchResult = (index) => {
    router.push("/student/library");
    setOpenNewClass(true);
    setIsSearching("");
  };

  return (
    <div className="fixed top-16 left-0 w-full z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row items-center justify-between py-3 gap-4">
          <div className="w-full md:w-[653px] relative">
            <Input
              className="!h-8 !px-4 !w-full !rounded-lg !border-2 !border-blue-600 focus:!border-blue-900 !transition-all !outline-none"
              placeholder="Search subjects, teachers or topics..."
              prefix={<IoMenu className="text-gray-400 mr-2" />}
              suffix={<IoSearch className="text-gray-400" />}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Search Results Dropdown */}
            {isSearching && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg border border-gray-200 max-h-[35rem] overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => clickSearchResult(index)}
                      >
                        <p>{result}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <span className="text-gray-500">No results found</span>
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full md:w-auto items-center justify-end gap-x-6 lg:gap-x-12">
            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
              {formattedDate}
            </span>
            <div className="flex items-center gap-4">
              <FaBell className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <FaUserCircle className="text-xl text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSearch;
