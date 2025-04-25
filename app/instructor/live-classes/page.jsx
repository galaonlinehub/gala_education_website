"use client";

import React, { useState } from "react";
import { 
  Layout, Card, Button, List, Tag, Space, Typography, Row, Col, Avatar, Input, 
  Steps, Dropdown, Badge, Statistic, Empty, Select, DatePicker, 
  Tooltip, Divider
} from "antd";
import { 
  VideoCameraOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined, 
  SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, BellOutlined, 
  BarChartOutlined, UserOutlined, CheckCircleOutlined, PlayCircleOutlined,
  MoreOutlined, InfoCircleOutlined
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const InstructorVideoDashboard = () => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample data with more detailed information and past sessions
  const allSessions = [
    {
      id: 1,
      title: "Introduction to React",
      date: "2025-04-20",
      time: "10:00 AM",
      duration: "1h 30m",
      status: "upcoming",
      participants: 25,
      link: "https://zoom.us/j/123456789",
      description: "Learn the fundamentals of React, including components, props, and state management.",
      materials: ["Slides", "Code Examples", "Exercise Files"],
      recording: null,

    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",

      date: "2025-04-21",
      time: "2:00 PM",
      duration: "2h",
      status: "upcoming",
      participants: 30,
      link: "https://zoom.us/j/987654321",
      description: "Deep dive into closures, promises, async/await, and prototypal inheritance.",
      materials: ["Handbook", "Practice Problems"],
      recording: null,

    },
    {
      id: 3,
      title: "CSS Fundamentals Workshop",

      date: "2025-04-19",
      time: "11:00 AM",
      duration: "1h",
      status: "upcoming",
      participants: 20,
      link: "https://zoom.us/j/456789123",
      description: "Hands-on workshop covering CSS layout techniques including Flexbox and Grid.",
      materials: ["Style Guide", "Starter Templates"],
      recording: null,
    },
    {
      id: 4,
      title: "Web Accessibility Best Practices",
      date: "2025-04-02",
      time: "1:00 PM",
      duration: "1h 15m",
      status: "completed",
      participants: 18,
      link: null,
      description: "Learn how to make your websites accessible to all users.",
      materials: ["Checklist", "Resources"],
      recording: "https://recordings.education.com/a11y-workshop",
      attendance: 16,
    },
    {
      id: 5,
      title: "Intro to TypeScript",
      date: "2025-03-28",
      time: "3:00 PM",
      duration: "1h 45m",
      status: "completed",
      participants: 22,
      link: null,
      description: "Introduction to TypeScript for JavaScript developers.",
      materials: ["Type Cheat Sheet", "Migration Guide"],
      recording: "https://recordings.education.com/typescript-intro",
      attendance: 20,
    },
    {
      id: 6,
      title: "Git Workflow for Teams",
      date: "2025-03-15",
      time: "10:30 AM",
      duration: "1h",
      status: "completed",
      participants: 15,
      link: null,
      description: "Best practices for using Git in team environments.",
      materials: ["Command Reference", "Workflow Diagrams"],
      recording: "https://recordings.education.com/git-teams",
      attendance: 12,
    },
  ];

  // Step configuration
  const steps = [
    {
      title: 'Upcoming Sessions',
      description: 'Sessions yet to be conducted',
      status: 'upcoming'
    },
    {
      title: 'Completed Sessions',
      description: 'Past sessions with recordings',
      status: 'completed'
    },
    {
      title: 'All Sessions',
      description: 'View all your sessions',
      status: 'all'
    }
  ];

  // Filter sessions based on step and search
  const filteredSessions = allSessions.filter(session => {
    const currentStepStatus = steps[currentStep].status;
    
    const matchesStep = 
      (currentStepStatus === "upcoming" && session.status === "upcoming") ||
      (currentStepStatus === "completed" && session.status === "completed") ||
      (currentStepStatus === "all");
    
    const matchesSearch = 
      session.title.toLowerCase().includes(searchText.toLowerCase()) ||
      session.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter =
      filterStatus === "all" || session.status === filterStatus;
    
    return matchesStep && matchesSearch && matchesFilter;
  });

  // Dashboard stats
  const stats = {
    totalSessions: allSessions.length,
    upcomingSessions: allSessions.filter(s => s.status === "upcoming").length,
    completedSessions: allSessions.filter(s => s.status === "completed").length,
    totalParticipants: allSessions.reduce((sum, session) => sum + session.participants, 0),
    averageAttendance: Math.round(
      allSessions
        .filter(s => s.status === "completed")
        .reduce((sum, session) => sum + (session.attendance || 0), 0) / 
      (allSessions.filter(s => s.status === "completed").length || 1) * 100
    ) / 100,
  };


  const handleJoinMeeting = (link) => {
    window.open(link, "_blank");
  };


  const handleViewRecording = (link) => {
    window.open(link, "_blank");
  };

  // Action menu for each session
  const getSessionActions = (session) => {
    const items = [];
    
    if (session.status === "upcoming") {
      items.push({
        key: 'edit',
        label: 'Edit Session',
        icon: <EditOutlined />,
      });
      items.push({
        key: 'cancel',
        label: 'Cancel Session',
        icon: <DeleteOutlined />,
        danger: true,
      });
    } else {
      items.push({
        key: 'viewDetails',
        label: 'View Details',
        icon: <EyeOutlined />,
      });
      if (session.recording) {
        items.push({
          key: 'viewRecording',
          label: 'View Recording',
          icon: <PlayCircleOutlined />,
        });
      }
    }
    
    return {
      items,
      onClick: ({ key }) => {
        if (key === 'viewRecording' && session.recording) {
          handleViewRecording(session.recording);
        }
        // Other actions would be implemented similarly
      }
    };
  };

  // Status tag styling
  const getStatusTag = (status) => {
    if (status === "upcoming") {
      return <Tag color="blue" className="py-1 px-2">Upcoming</Tag>;
    } else if (status === "completed") {
      return <Tag color="green" className="py-1 px-2">Completed</Tag>;
    } else if (status === "cancelled") {
      return <Tag color="red" className="py-1 px-2">Cancelled</Tag>;
    }
    return null;
  };

  return (
    <Layout className="bg-gray-50 min-h-screen">
      <Content className="p-4 md:p-6">
        {/* Header with stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <Title level={3} className="mb-0">
              Class Sessions Dashboard
            </Title>
          </div>
          
          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={12} sm={12} md={6} lg={4}>
              <Card bordered={false} className="text-center h-full">
                <Statistic
                  title="Upcoming"
                  value={stats.upcomingSessions}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <Card bordered={false} className="text-center h-full">
                <Statistic
                  title="Completed"
                  value={stats.completedSessions}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Steps navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <Steps
            current={currentStep}
            onChange={setCurrentStep}
            responsive
            className="session-steps"
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                icon={
                  step.status === "upcoming" ? <CalendarOutlined /> : 
                  step.status === "completed" ? <CheckCircleOutlined /> : 
                  <EyeOutlined />
                }
              />
            ))}
          </Steps>
        </div>

        {/* Filters and search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8} lg={6}>
              <Input
                placeholder="Search sessions..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
          </Row>
        </div>

        {/* Sessions list */}
        <Card className="shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <Title level={4} className="mb-0">
              {steps[currentStep].title}
            </Title>
            <Text type="secondary">
              {steps[currentStep].description}
            </Text>
          </div>

          {filteredSessions.length > 0 ? (
            <List
              dataSource={filteredSessions}
              pagination={{
                pageSize: 5,
                size: 'small',
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20'],
              }}
              renderItem={(session) => (
                <List.Item>
                  <Card 
                    className="w-full hover:shadow-md transition-shadow duration-300" 
                    bodyStyle={{ padding: 0 }}
                  >
                    <div className="p-4">
                      <Row gutter={[16, 16]} align="middle">
                        {/* Session Avatar */}
                        <Col xs={24} sm={4} md={3} lg={2}>
                          <div className="flex justify-center sm:justify-start">
                            <Badge 
                              dot={session.status === "upcoming"} 
                              color="blue"
                            >
                              <Avatar 
                                size={{ xs: 60, sm: 60, md: 64 }} 
                                icon={<VideoCameraOutlined />} 
                                style={{ 
                                  backgroundColor: session.status === "upcoming" ? '#1890ff' : '#8c8c8c',
                                  fontSize: 28,
                                }} 
                              />
                            </Badge>
                          </div>
                        </Col>

                        {/* Session Info */}
                        <Col xs={24} sm={12} md={14} lg={16}>
                          <div>
                            <div className="flex items-center flex-wrap gap-2 mb-2">
                              <Title level={5} className="!mb-0 mr-2">
                                {session.title}
                              </Title>
                              {getStatusTag(session.status)}
                            </div>
                            <Paragraph className="text-gray-500 mb-2" ellipsis={{ rows: 2 }}>
                              {session.description}
                            </Paragraph>
                            <Space direction="vertical" size={4}>
                              <Space size={16} wrap>
                                <Space>
                                  <CalendarOutlined className="text-gray-500" />
                                  <Text type="secondary">{session.date}</Text>
                                </Space>
                                <Space>
                                  <ClockCircleOutlined className="text-gray-500" />
                                  <Text type="secondary">{session.time} ({session.duration})</Text>
                                </Space>
                              </Space>
                              <Space>
                                <TeamOutlined className="text-gray-500" />
                                <Text type="secondary">
                                  {session.status === "upcoming" 
                                    ? `${session.participants} participants enrolled` 
                                    : `${session.attendance || 0}/${session.participants} attended`}
                                </Text>
                              </Space>
                              {session.materials && session.materials.length > 0 && (
                                <div className="mt-2">
                                  {session.materials.map((material, idx) => (
                                    <Tag key={idx} className="mr-1 mb-1">{material}</Tag>
                                  ))}
                                </div>
                              )}
                            </Space>
                          </div>
                        </Col>

                        {/* Status and Action */}
                        <Col xs={24} sm={8} md={7} lg={6}>
                          <div className="flex flex-col sm:items-end gap-3">
                            {session.status === "upcoming" ? (
                              <>
                                <Button 
                                  type="primary" 
                                  icon={<VideoCameraOutlined />} 
                                  onClick={() => handleJoinMeeting(session.link)}
                                  block
                                  className="sm:w-auto"
                                >
                                  Join Session
                                </Button>
                                <Button
                                  icon={<BellOutlined />}
                                  className="sm:w-auto"
                                >
                                  Notify Students
                                </Button>
                              </>
                            ) : (
                              <>
                                {session.recording && (
                                  <Button 
                                    icon={<PlayCircleOutlined />} 
                                    onClick={() => handleViewRecording(session.recording)}
                                    className="sm:w-auto"
                                  >
                                    View Recording
                                  </Button>
                                )}
                                <Button
                                  icon={<BarChartOutlined />}
                                  className="sm:w-auto"
                                >
                                  View Analytics
                                </Button>
                              </>
                            )}
                            
                            <Dropdown menu={getSessionActions(session)}>
                              <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Empty 
              description={
                <span>
                  No sessions found. Try adjusting your filters.
                </span>
              }
            />
          )}
        </Card>

      </Content>
    </Layout>
  );
};


export default InstructorVideoDashboard;

