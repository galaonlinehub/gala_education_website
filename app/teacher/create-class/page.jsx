"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, Typography, Spin } from "antd";
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const queryClient = new QueryClient();

export default function CreateClass() {
  const router = useRouter();
  const [form] = Form.useForm();

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
      console.log("Response Data:", data);
  
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["grades"]);
      form.resetFields();
      router.push(`/teacher/manage-class/${data.id}`);  // Using data from response
    },
  });
  

  const onFinish = (values) => {
    const { className, price, subject, startDate, endDate, description, availableTo } = values;
    const formattedData = {
      instructor_id: 1,
      subject_id: subject,
      grade_level_id: availableTo,
      cohort_name: className,
      price: Number(price),
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
      description: description,
    };

    mutation.mutate(formattedData);
  };



  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto p-6 rounded-md shadow-md">
        <Title level={3} className="text-center mb-4">
          Create a Class
        </Title>
        <Paragraph className="text-center mb-6">
          Welcome! Create a new class by entering a topic or subject name. This makes it easier for students to find and connect with you when they are searching for specific subjects or topics.
        </Paragraph>

        <Form form={form} layout="vertical" className="space-y-4" onFinish={onFinish}>
          <Form.Item name="className" label="Class Name" rules={[{ required: true, message: "Please enter a class name" }]}>
            <Input placeholder="Enter a class name" />
          </Form.Item>

          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Please enter a subject" }]}>
            <Select placeholder="Select a Subject">
              {subjectData?.map((subject) => (
                <Select.Option key={subject.id} value={subject.id}>
                  {subject.name}
                </Select.Option>
              ))}
              {isSubjectLoading && <div>Fetching subjects...</div>}
              {subjectError && <div>Error fetching subjects</div>}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Enter Price" rules={[{ required: true, message: "Please enter a price" }]}>
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item name="availableTo" label="Available to">
            <Select placeholder="Select a Class">
              {gradeData?.map((grade) => (
                <Select.Option key={grade.id} value={grade.id}>
                  {grade.name}
                </Select.Option>
              ))}
              {isGradesLoading && <div>Fetching grades...</div>}
              {gradesError && <div>Error fetching grades</div>}
            </Select>
          </Form.Item>

          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: "Please select a start date" }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: "Please select an end date" }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter a class description" }]}>
            <TextArea rows={4} placeholder="Enter class description" />
          </Form.Item>

          <Form.Item>
            {mutation.isLoading ? (
              <Button type="primary" htmlType="submit" className="w-full md:w-auto float-right" disabled>
                <Spin size="large" />
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" className="w-full md:w-auto float-right">
                Create
              </Button>
            )}
          </Form.Item>
        </Form>

        {mutation.isError && <p>Error: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>Class created successfully!</p>}
      </div>
    </div>
  );
}
