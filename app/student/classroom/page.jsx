"use client";
import React, { useState } from "react";
import { Layout, Menu, Card, List, Button, Tag, Upload, Progress, Space, Typography, Tabs, Badge, Drawer, Input, Empty, message } from "antd";
import { ClockCircleOutlined, FileTextOutlined, CheckCircleOutlined, UploadOutlined, CalendarOutlined, BookOutlined, FilterOutlined, FileOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const StudentAssignmentInterface = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Mathematics: Calculus Integration",
      subject: "Mathematics",
      dueDate: "2025-01-25",
      status: "pending",
      points: 100,
      description: "Complete the following integration problems. Show all your work and explain your steps.",
      attachments: ["Calculus_Assignment.pdf"],
    },
    {
      id: 2,
      title: "English Literature Essay",
      subject: "English",
      dueDate: "2025-01-22",
      status: "completed",
      points: 50,
      description: "Write a 1000-word essay analyzing the themes in Shakespeare's Macbeth.",
      attachments: ["Essay_Guidelines.pdf"],
    },
    {
      id: 3,
      title: "Physics Lab Report Physics Lab Report Physics Lab Report Physics Lab Report",
      subject: "Physics",
      dueDate: "2025-01-20",
      status: "overdue",
      points: 75,
      description: "Write a detailed lab report on the pendulum experiment conducted in class.",
      attachments: ["Lab_Template.docx"],
    },
    {
      id: 4,
      title: "Physics Lab Report Physics Lab Report Physics Lab Report Physics Lab Report",
      subject: "Physics",
      dueDate: "2025-01-20",
      status: "overdue",
      points: 75,
      description: "Write a detailed lab report on the pendulum experiment conducted in class.",
      attachments: ["Lab_Template.docx"],
    },
    {
      id: 5,
      title: "Physics Lab Report Physics Lab Report Physics Lab Report Physics Lab Report",
      subject: "Physics",
      dueDate: "2025-01-20",
      status: "overdue",
      points: 75,
      description: "Write a detailed lab report on the pendulum experiment conducted in class.",
      attachments: ["Lab_Template.docx"],
    },
  ];

  const getStatusTag = (status) => {
    const statusColors = {
      pending: "blue",
      completed: "green",
      overdue: "red",
    };
    return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>;
  };

  const uploadProps = {
    name: "file",
    action: "https://your-upload-endpoint.com/upload",
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const getGridConfig = () => ({
    gutter: [16, 16],
    xs: 1, // <576px - 1 column
    sm: 1, // ≥576px - 1 column
    md: 2, // ≥768px - 2 columns
    lg: 2, // ≥992px - 2 columns
    xl: 3, // ≥1200px - 3 columns
    xxl: 4, // ≥1600px - 4 columns
  });

  return (
    <Layout>
      <div className="bg-white border-b mt-8">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]} className="max-w-7xl mx-auto px-6">
          <Menu.Item key="1" icon={<FileTextOutlined />}>
            All Assignments
          </Menu.Item>
          <Menu.Item key="2" icon={<CheckCircleOutlined />}>
            Completed
          </Menu.Item>
          <Menu.Item key="3" icon={<ClockCircleOutlined />}>
            Pending
          </Menu.Item>
        </Menu>
      </div>

      <Content className="p-6">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <span>
                <CalendarOutlined />
                Current Assignments
              </span>
            }
            key="1"
          >
            <List
              grid={getGridConfig()}
              dataSource={assignments}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => {
                      setSelectedAssignment(item);
                      setDrawerVisible(true);
                    }}
                  >
                    <div className="flex flex-col h-40">
                      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                        <div className="flex-1 min-w-[200px]">
                          <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: "8px" }}>
                            {item.title}
                          </Title>
                          <Text type="secondary" style={{ display: "block" }}>
                            {item.subject}
                          </Text>
                        </div>
                        <div className="flex-shrink-0">{getStatusTag(item.status)}</div>
                      </div>

                      <div className="mt-auto">
                        <Space direction="vertical" className="w-full">
                          <div className="flex flex-wrap gap-2 justify-between">
                            <Text>
                              <ClockCircleOutlined /> Due: {item.dueDate}
                            </Text>
                            <Text>Points: {item.points}</Text>
                          </div>
                      
                        </Space>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        </Tabs>

        <Drawer title={selectedAssignment?.title} placement="right" width={600} onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
          {selectedAssignment && (
            <Space direction="vertical" className="w-full">
              <Card title="Assignment Details">
                <Space direction="vertical" className="w-full">
                  <div>
                    <Text type="secondary">Subject:</Text>
                    <Text strong> {selectedAssignment.subject}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Due Date:</Text>
                    <Text strong> {selectedAssignment.dueDate}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Points:</Text>
                    <Text strong> {selectedAssignment.points}</Text>
                  </div>
                </Space>
              </Card>

              <Card title="Description">
                <Text>{selectedAssignment.description}</Text>
              </Card>

              <Card title="Assignment Materials">
                <List
                  dataSource={selectedAssignment.attachments}
                  renderItem={(file) => (
                    <List.Item>
                      <Space>
                        <FileOutlined />
                        <Text>{file}</Text>
                        <Button size="small" type="link">
                          Download
                        </Button>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>

              <Card title="Your Submission">
                {selectedAssignment.status === "completed" ? (
                  <Space direction="vertical" className="w-full">
                    <Text type="success">
                      <CheckCircleOutlined /> Submitted successfully
                    </Text>
                    <List
                      dataSource={["Your_Submission.pdf"]}
                      renderItem={(file) => (
                        <List.Item>
                          <Space>
                            <FileOutlined />
                            <Text>{file}</Text>
                            <Button size="small" type="link">
                              View
                            </Button>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Space>
                ) : (
                  <Space direction="vertical" className="w-full">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Submission</Button>
                    </Upload>
                    <Button type="primary" block>
                      Submit Assignment
                    </Button>
                  </Space>
                )}
              </Card>
            </Space>
          )}
        </Drawer>
      </Content>
    </Layout>
  );
};

export default StudentAssignmentInterface;
