"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReadMoreContainer from "@/src/components/ui/TeacherReadMore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin, notification, Empty } from "antd";
import { SmileOutlined, LoadingOutlined } from "@ant-design/icons";

const Live = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    subtopic_id: "",
    date: "",
    time: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: subTopicData,
    isLoading: isSubtopicLoading,
    error: subtopicError,
  } = useQuery({
    queryKey: ["live-subtopics"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/subtopics");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const {
    data: lessonData,
    isLoading: isLessonLoading,
    error: lessonError,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/lessons");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    refetchOnWindowFocus: true,
  });

  const createSubtopicMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("https://galaweb.galahub.org/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to generate meeting Link!");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });

      setIsLoading(false);
      // Reset form data
      setFormData({
        subtopic_id: "",
        date: "",
        time: "",
        duration: "",
      });

      // Show notification
      notification.open({
        message: "Success",
        description: "Lesson created successfully!",
        icon: <SmileOutlined style={{ color: "#90EE90" }} />,
      });

      // Optional: Invalidate and refetch queries if you want to update the list
      queryClient.invalidateQueries({ queryKey: ["lessons"], exact: true });
    },
    onError: (error) => {
      setIsLoading(false);

      notification.open({
        message: "Error",
        description: error.message,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    },
  });

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.subtopic_id)
      newErrors.subtopic_id = "Class name is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date))
      newErrors.date = "Invalid date format (YYYY-MM-DD).";
    if (!formData.time) newErrors.time = "Time is required.";
    else if (!/^\d{2}:\d{2}$/.test(formData.time))
      newErrors.time = "Invalid time format (HH:MM).";
    if (!formData.duration) newErrors.duration = "Duration is required.";
    else if (isNaN(Number(formData.duration)))
      newErrors.duration = "Duration must be a number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    console.log(formData);

    setIsLoading(true);

    createSubtopicMutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-2/3">
          <div className="p-4 z-10 mb-8 h-fit mt-20 w-full border-blue-600 border-2 rounded-xl flex flex-col relative">
            <div>
              <div className="flex flex-col">
                <div className="font-bold text-sm">
                  Welcome back, Diana Malle!
                </div>
                <div>
                  <ReadMoreContainer />
                </div>
              </div>
              <div className="absolute -top-16 right-4">
                <Image
                  className="h-auto w-auto"
                  src="/sitting_on_books.png"
                  alt="An image of a character sitting on books"
                  width={130}
                  height={130}
                />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Upcoming Live Classes</h3>

          {isLessonLoading ? (
            <div className="w-full flex justify-center items-center">
              <Spin />
            </div>
          ) : lessonData?.length > 0 ? (
            <div className="overflow-x-auto text-xs h-64 overflow-y-auto scrollbar-hide ">
              <table className="w-full border-separate border-spacing-y-2">
                <thead className="sticky top-0 z-10 bg-[#001840]">
                  <tr className="bg-[#001840] text-white">
                    <th className="p-2 text-left">Class Name</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-left">Duration</th>
                    <th className="p-2 text-left">Enrolled</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lessonData.map((item, index) => (
                    <tr key={index} className="bg-[#001840] p-2 text-white m-3">
                      <td className="p-2">{item.subtopic.title}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.time}</td>
                      <td className="p-2">{item.duration} mins</td>
                      <td className="p-2">{item.enrolled}</td>
                      <td className="p-2">
                        <a
                          href={item.zoom_meeting_id}
                          className="text-blue-600 underline block mb-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.zoom_meeting_id}
                        </a>
                        <div className="flex gap-3">
                          <button className="bg-[#001840] border border-white text-white px-1 w-20 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                            Share
                          </button>
                          <button className="bg-[#001840] border border-white text-white px-1 w-20 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <Empty
                description={
                  <span className="!text-gray-500 !text-xs !italic ">
                    There are no live classes at the moment!
                  </span>
                }
                className="text-center"
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-[#001840] text-white rounded-lg shadow-md">
            <div className="p-6">
              <h3 className="text-sm font-bold mb-4">Schedule a class</h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white"
                  >
                    Class Name*
                  </label>
                  <select
                    id="subject_id"
                    name="subtopic_id"
                    value={formData.subtopic_id}
                    onChange={handleInputChange}
                    className="mt-1 bg-[#001840] rounded block w-full p-2 border-white border shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Enter subtopic name</option>
                    {subTopicData?.map((subtopic) => (
                      <option
                        key={subtopic.subtopic_id}
                        value={subtopic.subtopic_id}
                      >
                        {subtopic.subtopic_name}
                      </option>
                    ))}
                  </select>
                  {errors.subtopic_id && (
                    <p className="text-red-500 italic mt-1">
                      {errors.subtopic_id}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm  font-medium text-white"
                  >
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 bg-[#001840] rounded block w-full p-2 border-white border shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:filter"
                  />
                  {errors.date && (
                    <p className="text-red-500 italic mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-white"
                  >
                    Time*
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 bg-[#001840] rounded block w-full p-2 border-white border shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50  [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:filter"
                  />
                  {errors.time && (
                    <p className="text-red-500 italic mt-1">{errors.time}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-white"
                  >
                    Duration*
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="mt-1 bg-[#001840] rounded block w-full p-2 border-white border shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Select duration</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                  {errors.duration && (
                    <p className="text-red-500 italic mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
                <div className="flex items-center italic gap-2">
                  <span>
                    &quot;Enter the class details, choose the date and time,
                    then click to generate the link.&quot;
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-40 items-center bg-[#2c2d2e] text-white px-4 py-2 rounded-2xl border border-r-white flex justify-center hover:bg-gray-500 transition-colors"
                  >
                    {isLoading ? (
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 16,
                              color: "white",
                            }}
                            spin
                          />
                        }
                      />
                    ) : (
                      "Generate Link"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="mt-4 text-xs text-black italic">
            These details make it easier to find and join a class. They help
            quickly identify the student and bring up the right class
            information when searched.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Live;
