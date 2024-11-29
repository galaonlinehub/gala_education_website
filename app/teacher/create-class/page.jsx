"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { MdCheckCircle } from "react-icons/md";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const queryClient = new QueryClient();

const LoadingSpinner = () => <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white" />;

const Notification = ({ message }) => (
  <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center space-x-2">
    <MdCheckCircle className="h-5 w-5" />
    <span>{message}</span>
  </div>
);

const RedirectingOverlay = () => (
  <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-4 animate-fade-in border-2 border-blue-700">
      <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-blue-700 border-b-transparent" />
      <p className="text-base text-blue-700 font-semibold whitespace-nowrap">Redirecting to sub-topic creation...</p>
    </div>
  </div>
);

export default function CreateClass() {
  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      description: "This is the content of the notification.",
      icon: <SmileOutlined style={{ color: "#90EE90" }} />, // Correct icon usage
    });
  };

  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("showSuccess state changed:", showSuccess);
    if (showSuccess) {
      openNotification();
    }
  }, [showSuccess]);

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    price: "",
    availableTo: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const {
    data: gradeData,
    isLoading: isGradesLoading,
    error: gradesError,
  } = useQuery({
    queryKey: ["grades"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/grade_level");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const {
    data: subjectData,
    isLoading: isSubjectLoading,
    error: subjectError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await fetch("https://galaweb.galahub.org/api/subjects");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newClass) => {
      const response = await fetch("https://galaweb.galahub.org/api/cohorts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });

      if (!response.ok) {
        throw new Error("Failed to add class");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {

      setFormData({
        className: "",
        subject: "",
        price: "",
        availableTo: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      // Handle successful mutation
      queryClient.invalidateQueries(["grades"]); // Refresh relevant queries
      setShowSuccess(true); // Trigger notification after success

      // Start redirecting sequence
      setTimeout(() => {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push(`/teacher/manage-class/${data.id}`);
        }, 2000); // Give time to show the redirecting message
      }, 2000); // Show success message for 1 second before showing redirecting
    
    
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { className, price, subject, startDate, endDate, description, availableTo } = formData;
    const formattedData = {
      instructor_id: 1,
      subject_id: subject,
      grade_level_id: availableTo,
      cohort_name: className,
      price: Number(price),
      start_date: startDate,
      end_date: endDate,
      description: description,
    };

    mutation.mutate(formattedData);
  };

  const isLoading = mutation.isPending || isGradesLoading || isSubjectLoading;

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      {isRedirecting && <RedirectingOverlay />}

      <div className="max-w-2xl mx-auto p-6 border-2 border-blue-700 shadow-md relative">

        <h3 className="text-center mb-4 font-bold">Create a Class</h3>
        <p className="text-center text-xs mb-6">Welcome! Create a new class by entering a topic or subject name. This makes it easier for students to find and connect with you when they are searching for specific subjects or topics.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="mb-4">
            <label className="block mb-2 font-bold">Class Name</label>
            <input type="text" name="className" value={formData.className} onChange={handleChange} placeholder="Enter a class name" className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting} />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Subject</label>
            <select name="subject" value={formData.subject} onChange={handleChange} className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting}>
              <option value="">Select a Subject</option>
              {subjectData?.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
              {isSubjectLoading && <option>Loading subjects...</option>}
              {subjectError && <option>Error fetching subjects</option>}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Enter Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting} />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Available to</label>
            <select name="availableTo" value={formData.availableTo} onChange={handleChange} className="w-full border-2 border-blue-700 p-2" disabled={isLoading || isRedirecting}>
              <option value="">Select a Class</option>
              {gradeData?.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
              {isGradesLoading && <option>Loading grades...</option>}
              {gradesError && <option>Error fetching grades</option>}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={(e) => handleDateChange(e, "startDate")} className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting} />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={(e) => handleDateChange(e, "endDate")} className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting} />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter class description" className="w-full border-2 border-blue-700 p-2" required disabled={isLoading || isRedirecting} />
          </div>

          <div className="mb-4">
            <button type="submit" className="w-fit bg-blue-700 font-bold text-white p-2 flex items-center gap-2 disabled:opacity-50" disabled={isLoading || isRedirecting}>
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>

        {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
      </div>
    </div>
  );
}
