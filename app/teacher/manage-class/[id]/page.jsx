"use client";

import React from "react";
import { Form, Input, DatePicker, Button } from "antd";


const Page = ({ params: { id } }) => {


  const onFinish = (values) => {
    console.log("Form Values:", values, id);
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="flex items-center justify-center">
        <span>Sub-Topic Details</span>
      </div>
      <Form
        name="topicForm"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          subTopic: "",
          description: "",
        }}
      >
        {/* Sub Topic Input */}
        <Form.Item label="Sub Topic" name="subTopic" rules={[{ required: true, message: "Please enter a sub topic!" }]}>
          <Input placeholder="Enter Sub Topic" />
        </Form.Item>

        {/* Start Date Input */}
        <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Please select a start date!" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* End Date Input */}
        <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Please select an end date!" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Description Input */}
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description!" }]}>
          <Input.TextArea placeholder="Enter Description" rows={4} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
