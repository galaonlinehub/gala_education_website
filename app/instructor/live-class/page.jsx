"use client";
import React from "react";
import { Layout, Card, Button, List, Tag, Space, Typography, Row, Col, Avatar } from "antd";
import { VideoCameraOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined, PlayCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const InstructorVideoDashboard = () => {
  const videoLinks = [
    {
      id: 1,
      title: "Introduction to React",
      date: "2025-02-20",
      time: "10:00 AM",
      duration: "1h 30m",
      status: "Upcoming",
      participants: 25,
      link: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      date: "2025-02-21",
      time: "2:00 PM",
      duration: "2h",
      status: "Upcoming",
      participants: 30,
      link: "https://zoom.us/j/987654321",
    },
    {
      id: 3,
      title: "CSS Fundamentals Workshop",
      date: "2025-02-19",
      time: "11:00 AM",
      duration: "1h",
      status: "Upcoming",
      participants: 20,
      link: "https://zoom.us/j/456789123",
    },
    
  ];

  const handleJoinMeeting = (link) => {
    window.open(link, "_blank");
  };

  return (
    <Layout className=" bg-white">
      <Content className="p-2">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="">
              <Title level={4} className="mb-3">
                My Class Sessions
              </Title>

              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                dataSource={videoLinks}
                renderItem={(item) => (
                  <List.Item>
                    <Card className="hover:shadow-md transition-shadow duration-300" bodyStyle={{ padding: 0 }}>
                      <div className="p-2">
                        <Row gutter={[16, 16]} align="middle">
                          {/* Session Avatar */}
                          <Col xs={24} sm={4} md={3} lg={2}>
                            <Avatar size={{ xs: 60, sm: 70, md: 40 }} icon={<VideoCameraOutlined />} style={{ backgroundColor: "#1e90ff" }} />
                          </Col>

                          {/* Session Info */}
                          <Col xs={24} sm={12} md={14} lg={16}>
                            <div>
                              <Title level={5} className="!mb-2">
                                {item.title}
                              </Title>
                              <Space direction="vertical" size={4}>
                                <Space size={16} wrap>
                                  <Space>
                                    <CalendarOutlined className="text-gray-500" />
                                    <Text type="secondary">{item.date}</Text>
                                  </Space>
                                  <Space>
                                    <ClockCircleOutlined className="text-gray-500" />
                                    <Text type="secondary">{item.time}</Text>
                                  </Space>
                                </Space>
                                <Space>
                                  <TeamOutlined className="text-gray-500" />
                                  <Text type="secondary">{item.participants} participants enrolled</Text>
                                </Space>
                              </Space>
                            </div>
                          </Col>

                          {/* Status and Action */}
                          <Col xs={24} sm={8} md={7} lg={6}>
                            <div className="flex flex-col sm:items-end gap-3">
                              <Tag bordered className="py-1 bg-white text-orange-400 to-orange-200 shadow-md">
                                {item.status}
                              </Tag>

                              <Text type="secondary">Duration: {item.duration}</Text>
                              <Button type="primary" icon={<VideoCameraOutlined />} onClick={() => handleJoinMeeting(item.link)} className="w-full sm:w-auto">
                                Join Session
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default InstructorVideoDashboard;
