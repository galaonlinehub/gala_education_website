"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useNewClass } from "@/src/store/student/class";
import StudentSearch from "./Search";

const { Option } = Select;
const { Search } = Input;

const NewClass = () => {
  const queryClient = useQueryClient();
  const { openNewClass, setOpenNewClass } = useNewClass();
  const [selectedClasses, setSelectedClasses] = useState([]);

  const onClose = () => {
    setOpenNewClass(false);
  };

  const {
    data: classesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/topics");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const handleChange = (value, options) => {
    // Convert single option to array if necessary
    const optionsArray = Array.isArray(options) ? options : [options];
    
    // Find the full class details for selected options
    const selectedDetails = optionsArray.map(option => {
      const classItem = classesData.find(item => item.id === option.value);
      return classItem;
    }).filter(Boolean); // Remove any undefined values
    
    setSelectedClasses(selectedDetails);
  };

  return (
    <>
      <Drawer
        title="Enroll in a new class"
        width={720}
        onClose={onClose}
        open={openNewClass}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <div className="flex flex-col gap-4">
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="Search for classes"
            loading={isLoading}
            onChange={handleChange}
            optionFilterProp="children"
            showSearch
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            optionLabelProp="label"
          >
            {classesData?.map((classItem) => (
              <Option
                key={classItem.id}
                value={classItem.id}
                label={`${classItem.title} - ${classItem.subject.name}`}
              >
                {classItem.title} - {classItem.subject.name}
              </Option>
            ))}
          </Select>

          {/* Selected Classes Details */}
          {selectedClasses.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-xs">Selected Classes Details:</h3>
              {selectedClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="p-4 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: "#f5faff",
                    border: "1px solid #cce7ff",
                  }}
                >
                  <div className="text-xs font-semibold mb-2">
                    {classItem.title} - {classItem.subject.name}
                  </div>
                  <div className="grid text-xs grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-orange-400 ">Price:</span>
                      <div>{parseFloat(classItem.price).toLocaleString()} TZS</div>
                    </div>
                    <div>
                      <span className="text-green-400 ">Start Date:</span>
                      <div>{new Date(classItem.start_date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-red-400 ">End Date:</span>
                      <div>{new Date(classItem.end_date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default NewClass;