'use client';
import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Upload,
  Button,
  Card,
  Typography,
  Alert,
  Space,
  Row,
  Col
} from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AssignmentUpload = () => {
  const [form] = Form.useForm();

  const lessons = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Computer Science",
    "Physics"
  ];

  const uploadProps = {
    name: 'file',
    action: 'https://your-upload-endpoint.com/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[16, 16]}>
          {/* Main form column - full width on mobile, 2/3 on larger screens */}
          <Col xs={24} lg={16}>
            <Card 
              title={
                <Space>
                  <BookOutlined />
                  <span className="text-lg">Assignment Details</span>
                </Space>
              }
              className="mb-4 md:mb-0"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  label="Assignment Title"
                  name="title"
                  rules={[{ required: true, message: 'Please input the title!' }]}
                >
                  <Input placeholder="Enter assignment title" className="w-full" />
                </Form.Item>

                <Form.Item
                  label="Lesson"
                  name="lesson"
                  rules={[{ required: true, message: 'Please select a lesson!' }]}
                >
                  <Select placeholder="Select lesson" className="w-full">
                    {lessons.map(lesson => (
                      <Option key={lesson} value={lesson.toLowerCase()}>
                        {lesson}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input the description!' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Enter assignment description and instructions"
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Assignment Materials"
                  name="materials"
                >
                  <Upload {...uploadProps} className="w-full">
                    <Button icon={<UploadOutlined />} className="w-full md:w-auto">
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Settings column - full width on mobile, 1/3 on larger screens */}
          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <ClockCircleOutlined />
                  <span className="text-lg">Settings</span>
                </Space>
              }
              className="h-full"
            >
              <Form layout="vertical" className="space-y-4">
                <Form.Item
                  label="Due Date"
                  name="dueDate"
                  rules={[{ required: true, message: 'Please select the due date!' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>

               

                <Alert
                  message="Note"
                  description="Students will be notified once the assignment is published."
                  type="info"
                  showIcon
                  icon={<InfoCircleOutlined />}
                  className="mb-4"
                />

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
               
                  <Button type="primary" block className="flex-1">
                    Publish
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AssignmentUpload;