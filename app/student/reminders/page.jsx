'use client';
import React from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  List,
  Space,
  Row,
  Col,
  Divider
} from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const StudentReminders = () => {
  const [form] = Form.useForm();

  const reminders = [
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday"
    },
    {
      name: "Eng - Vocabulary Test",
      time: "10.06.2026",
      day: "Friday"
    },
    {
      name: "Eng Test",
      time: "10.06.2026",
      day: "Friday"
    },
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday"
    },
    {
      name: "Eng - Speaking Test",
      time: "10.06.2026",
      day: "Friday"
    },

  ];

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
  };

  const reminderTimes = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'
  ];

  return (
    <div className="p-6">
      <Row justify="center" className="mb-6 text-center">
        <Col span={24}>
          <Title level={3}>Reminders</Title>
          <Text type="secondary">
            Reminders help students stay organized, ensuring they don&apos;t miss important sessions, deadlines, or updates.
          </Text>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Create Reminder Form */}
        <Col xs={24} md={12}>
          <Card title="Create a new reminder" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
            >
              <Form.Item
                label="Reminder Title"
                name="title"
                rules={[{ required: true, message: 'Please enter reminder title' }]}
              >
                <Input placeholder="Enter reminder title" />
              </Form.Item>

             
              <Form.Item
                label="Reminder Date"
                name="reminderDate"
                rules={[{ required: true, message: 'Please select reminder date' }]}
              >
                <DatePicker className="w-full" format="MM/DD/YYYY" />
              </Form.Item>

              <Form.Item
                label="Reminder Time"
                name="time"
                rules={[{ required: true, message: 'Please select time' }]}
              >
                <Select placeholder="Select time">
                  {reminderTimes.map(time => (
                    <Option key={time} value={time}>{time}</Option>
                  ))}
                </Select>
              </Form.Item>


              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button onClick={() => form.resetFields()}>
                    Clear Form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Reminders List */}
        <Col xs={24} md={12}>
          <Card
            title="All Reminders"
            bordered={false}
            className="bg-[#001840] text-white"
            headStyle={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            bodyStyle={{ maxHeight: '500px', overflowY: 'auto' }}
          >
            <List
              dataSource={reminders}
              renderItem={(item) => (
                <List.Item className="border border-white/20 rounded-lg mb-3 p-3">
                  <List.Item.Meta
                    avatar={<CalendarOutlined className="text-white text-xl" />}
                    title={<Text className="text-white font-medium">{item.name}</Text>}
                    description={
                      <Space>
                        <ClockCircleOutlined className="text-gray-400" />
                        <Text className="text-gray-400">
                          {item.time} • {item.day}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentReminders;