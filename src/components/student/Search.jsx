import React, { useState } from "react";
import { Input, Empty, Card, Typography, Tag, Divider } from "antd";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoMenu, IoSearch } from "react-icons/io5";
import { useNewClass } from "@/src/store/student/class";
import { useRouter } from "next/navigation";
import { apiGet } from "@/src/services/api_service";
import {
  BookOutlined,
  TagOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const StudentSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { openNewClass, setOpenNewClass } = useNewClass();
  const router = useRouter();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSearch = async (value) => {
    if (value.trim() !== "") {
      try {
        setIsSearching(true);
        const r = await apiGet(`search?q=${value}`);
        console.log(r.data);
        setSearchResults(r.data);
      } catch (e) {}
    }

    // Example: setSearchResults(...)
  };

  const clickSearchResult = (index) => {
    router.push("/student/library");
    setOpenNewClass(true);
    setIsSearching("");
  };

  console.log(searchResults);
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

            {true && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-b-lg border border-gray-200 max-h-[35rem] overflow-y-auto z-50">
                {searchResults.length > 0 ? searchResults.map(({ subjects, topics, users }, index) => 
                  <Card
                    key={index}
                    hoverable
                    onClick={() => clickSearchResult(index)}
                    className="transition-all duration-300 hover:shadow-md"
                  >
                    {/* Subjects Section */}
                    {subjects && subjects.length > 0 && (
                      <>
                        <div className="flex items-center mb-2">
                          <BookOutlined className="mr-2 text-blue-500" />
                          <Title level={5} className="mb-0">
                            Subjects
                          </Title>
                        </div>
                        {subjects.map((subject) => (
                          <Paragraph key={subject.id} className="mb-1">
                            <Text strong>{subject.name}</Text>:
                            <Text type="secondary" className="ml-2">
                              {subject.description}
                            </Text>
                          </Paragraph>
                        ))}
                        <Divider className="my-3" />
                      </>
                    )}

                    {/* Topics Section */}
                    {topics && topics.length > 0 && (
                      <>
                        <div className="flex items-center mb-2">
                          <TagOutlined className="mr-2 text-green-500" />
                          <Title level={5} className="mb-0">
                            Topics
                          </Title>
                        </div>
                        {topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="flex justify-between items-center mb-1"
                          >
                            <Text>{topic.title}</Text>
                            <Tag icon={<DollarOutlined />} color="volcano">
                              ${topic.price}
                            </Tag>
                          </div>
                        ))}
                        <Divider className="my-3" />
                      </>
                    )}

                    {/* Users Section */}
                    {users && users.length > 0 && (
                      <>
                        <div className="flex items-center mb-2">
                          <UserOutlined className="mr-2 text-purple-500" />
                          <Title level={5} className="mb-0">
                            Users
                          </Title>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {users.map((user, idx) => (
                            <Tag key={idx} color="blue">
                              {user.name}
                            </Tag>
                          ))}
                        </div>
                      </>
                    )}
                  </Card>
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
