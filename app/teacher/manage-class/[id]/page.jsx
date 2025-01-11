"use client";

import React, { useCallback, useEffect, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";

const queryClient = new QueryClient();

const Page = ({ params: { id } }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [subtopicId, setSubtopicId] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const [editFormData, setEditFormData] = useState({});

  const [formData, setFormData] = useState({
    subTopic: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    subTopic: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [touched, setTouched] = useState({
    subTopic: false,
    startDate: false,
    endDate: false,
    description: false,
  });

  const openNotification = useCallback(() => {
    notification.open({
      message: "Success",
      description: isEditMode
        ? "Sub-topic updated successfully!"
        : "Sub-topic created successfully!",
      icon: <SmileOutlined style={{ color: "#90EE90" }} />,
    });
  }, [isEditMode]);

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-4 animate-fade-in border-2 border-blue-700">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-blue-700 border-b-transparent" />
        {isEditMode ? (
          <p className="text-base text-blue-700 font-semibold whitespace-nowrap">
            Updating Sub-topic....
          </p>
        ) : (
          <p className="text-base text-blue-700 font-semibold whitespace-nowrap">
            Creating Sub-topic....
          </p>
        )}
      </div>
    </div>
  );

  const validateField = (name, value) => {
    switch (name) {
      case "subTopic":
        return value.trim() === "" ? "Sub Topic is required" : "";
      case "startDate":
        return value === "" ? "Start Date is required" : "";
      case "endDate":
        if (value === "") return "End Date is required";
        if (
          formData.startDate &&
          new Date(value) < new Date(formData.startDate)
        ) {
          return "End Date cannot be before Start Date";
        }
        return "";
      case "description":
        if (value.trim() === "") return "Description is required";
        if (value.trim().length < 10)
          return "Description must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name, formData[name]),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }

    // Special case for start date to revalidate end date
    if (name === "startDate" && formData.endDate) {
      setErrors((prev) => ({
        ...prev,
        endDate: validateField("endDate", formData.endDate),
      }));
    }
  };

  useEffect(() => {
    const savedClassData = localStorage.getItem("classData");
    if (savedClassData) {
      const parsedData = JSON.parse(savedClassData);
      setEditFormData(parsedData);
      setIsEditMode(true);
      setSubtopicId(parsedData.subtopic_id);

      setFormData({
        subTopic: parsedData.subtopic_name || "",
        startDate: parsedData.start_date || "",
        endDate: parsedData.end_date || "",
        description: parsedData.subtopic_description || "",
      });

      localStorage.removeItem("classData");
    }

    if (showSuccess) {
      openNotification();
    }
  }, [showSuccess, openNotification]);

  const handleMutationSuccess = async () => {
    setFormData({
      subTopic: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    // Invalidate and refetch immediately
    await queryClient.invalidateQueries({
      queryKey: ["sub-topics"],
      exact: true,
      refetchType: "active",
    });
    // await queryClient.refetchQueries(["sub-topics"]);

    setShowSuccess(true);

    const path = isEditMode ? "/teacher/manage-class" : "/teacher/create-class";
    router.replace(path);
  };

  const createMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(
        "https://galaweb.galahub.org/api/subtopics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    },
    onSuccess() {
      setFormData({
        subTopic: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      queryClient.invalidateQueries(["sub-topics"]);
      setShowSuccess(true);
      router.replace(`/teacher/create-class`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(
        `https://galaweb.galahub.org/api/subtopics/${subtopicId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update subtopic");
      }
      return response.json();
    },
    onSuccess() {
      handleMutationSuccess();
    },
  });

  const onFormSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const newTouched = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {}
    );
    setTouched(newTouched);

    // Validate all fields
    const newErrors = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(key, formData[key]),
      }),
      {}
    );
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const formattedData = {
      topic_id: id,
      title: formData.subTopic,
      description: formData.description,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    if (isEditMode) {
      updateMutation.mutate(formattedData);
    } else {
      createMutation.mutate(formattedData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="md:px-32">
      <div className="flex items-center justify-center mb-4">
        <span className="text-lg font-semibold">Fill Sub-Topic Details</span>
      </div>
      {isLoading && <LoadingOverlay />}
      <form onSubmit={onFormSubmit} className="space-y-4">
        {/* Sub Topic Input */}
        <div>
          <label
            htmlFor="subTopic"
            className="block text-xs font-medium text-gray-700"
          >
            Sub Topic
          </label>
          <input
            type="text"
            id="subTopic"
            name="subTopic"
            value={formData.subTopic}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 p-2 w-full border-2 ${
              touched.subTopic && errors.subTopic
                ? "border-red-500"
                : "border-blue-700"
            } shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs`}
          />
          {touched.subTopic && errors.subTopic && (
            <p className="mt-1 text-xs text-red-500">{errors.subTopic}</p>
          )}
        </div>

        {/* Start Date Input */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-xs font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 p-2 w-full border-2 ${
              touched.startDate && errors.startDate
                ? "border-red-500"
                : "border-blue-700"
            } shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs`}
          />
          {touched.startDate && errors.startDate && (
            <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
          )}
        </div>

        {/* End Date Input */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-xs font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 p-2 w-full border-2 ${
              touched.endDate && errors.endDate
                ? "border-red-500"
                : "border-blue-700"
            } shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs`}
          />
          {touched.endDate && errors.endDate && (
            <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            className={`mt-1 p-2 w-full border-2 ${
              touched.description && errors.description
                ? "border-red-500"
                : "border-blue-700"
            } shadow-sm focus:outline-none focus:ring-2 focus:border-black text-xs`}
          />
          {touched.description && errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#001840] text-white font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
