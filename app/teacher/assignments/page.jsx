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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Row gutter={24}>
          <Col span={16}>
            <Card 
              title={
                <Space>
                  <BookOutlined />
                  Assignment Details
                </Space>
              }
              className="mb-6"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Assignment Title"
                  name="title"
                  rules={[{ required: true, message: 'Please input the title!' }]}
                >
                  <Input placeholder="Enter assignment title" />
                </Form.Item>

                <Form.Item
                  label="Lesson"
                  name="lesson"
                  rules={[{ required: true, message: 'Please select a lesson!' }]}
                >
                  <Select placeholder="Select lesson">
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
                  />
                </Form.Item>

                <Form.Item
                  label="Assignment Materials"
                  name="materials"
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col span={8}>
            <Card
              title={
                <Space>
                  <ClockCircleOutlined />
                  Settings
                </Space>
              }
            >
              <Form layout="vertical">
                <Form.Item
                  label="Due Date"
                  name="dueDate"
                  rules={[{ required: true, message: 'Please select the due date!' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item
                  label="Points"
                  name="points"
                  rules={[{ required: true, message: 'Please input the points!' }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Enter maximum points"
                    className="w-full"
                  />
                </Form.Item>

                <Alert
                  message="Note"
                  description="Students will be notified once the assignment is published."
                  type="info"
                  showIcon
                  icon={<InfoCircleOutlined />}
                  className="mb-4"
                />

                <Space className="w-full mt-4">
                  <Button type="default" block>
                    Save Draft
                  </Button>
                  <Button type="primary" block>
                    Publish
                  </Button>
                </Space>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AssignmentUpload;