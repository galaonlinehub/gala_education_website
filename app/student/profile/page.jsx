'use client';
import React from 'react';
import {
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Switch,
  Typography,
  Row,
  Col,
  Divider,
  Space
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const StudentProfile = () => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
  };

  const handleSwitchChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Row justify="center">
        <Col xs={24} md={20} lg={16} xl={14}>
          <div className="text-center mb-8">
            <Avatar
              size={80}
              src="/avatar.png"
              icon={<UserOutlined />}
              className="mb-4"
            />
            <Title level={2}>Profile Settings</Title>
          </div>

          <Row gutter={[16, 16]}>
            {/* Personal Information Card */}
            <Col xs={24} md={12}>
              <Card>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFormSubmit}
                  initialValues={{
                    username: '',
                    fullName: '',
                    email: '',
                    password: ''
                  }}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="Enter your username" />
                  </Form.Item>

                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                    <Input placeholder="Enter your full name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Save Changes
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Notifications Card */}
            <Col xs={24} md={12}>
              <Card className="bg-blue-900">
                <div className="text-white">
                  <Title level={4} className="text-white mb-4">
                    Account Notifications
                  </Title>
                  <Space direction="vertical" className="w-full">
                    {[
                      'New Courses',
                      'New Instructors',
                      'Course Updates',
                    
                    ].map((item) => (
                      <div key={item} className="flex justify-between items-center">
                        <Text className="text-white">{item}</Text>
                        <Switch defaultChecked onChange={handleSwitchChange} />
                      </div>
                    ))}
                  </Space>

                  <Divider className="bg-gray-600" />

                  <Title level={4} className="text-white mb-4">
                    Course Notifications
                  </Title>
                  <Space direction="vertical" className="w-full">
                    {[
                    
                      'Homework/Assignment Reminders'
                    ].map((item) => (
                      <div key={item} className="flex justify-between items-center">
                        <Text className="text-white">{item}</Text>
                        <Switch defaultChecked onChange={handleSwitchChange} />
                      </div>
                    ))}
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StudentProfile;