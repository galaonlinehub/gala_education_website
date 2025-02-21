"use client";
import React from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Statistic,
  Tag,
  Timeline,
  Divider,
} from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";

const { Title, Text } = Typography;

const StudentProfile = () => {
  const { user } = useUser();
  const { width, height } = useDevice();
  const student = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    classesBought: 12,
    joinedDate: "January 2024",
    location: "New York, USA",
    achievements: 5,
    completedClasses: 8,
    inProgressClasses: 4,
    skills: ["JavaScript", "React", "Python", "Data Science"],
    recentActivity: [
      { date: "2024-01-15", action: "Completed Advanced React Course" },
      { date: "2024-01-10", action: "Earned 'Top Performer' Badge" },
      { date: "2024-01-05", action: "Started Machine Learning Basics" },
      { date: "2024-01-01", action: "Joined Platform" },
    ],
  };

  return (
    <div className="mt-20">
      <Row gutter={[24, 24]} justify="center">
        <div className="w-full px-4 lg:px-12">
          <Card className="profile-header mb-[24px]">
            <Row align="middle" justify="space-between">
              <Col xs={24} md={12}>
                <div className="flex items-center gap-[10px]">
                  <Avatar
                    size={width > 768 ? 96 : 52}
                    src={`${user?.first_name.at(0)}`}
                    className="border-4 border-[#1890ff]"
                  />
                  <div>
                    <Title level={width > 768 ? 2 : 4} className="capitalize">
                      {user?.first_name} {user?.last_name}
                    </Title>
                    <Tag
                      className="capitalize"
                      color="blue"
                      icon={<StarOutlined />}
                    >
                      {user?.role}
                    </Tag>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[16, 16]} justify="end">
                  <Col>
                    <Statistic
                      title="Classes Bought"
                      value={student.classesBought}
                      prefix={<BookOutlined />}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title="Achievements"
                      value={student.achievements}
                      prefix={<TrophyOutlined />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Left Column */}
            <Col xs={24} md={16}>
              {/* Progress Card */}
              <Card
                title={<Title level={4}>Learning Progress</Title>}
                bordered={true}
                style={{ marginBottom: "24px" }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic
                      title="Completed"
                      value={student.completedClasses}
                      prefix={
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="In Progress"
                      value={student.inProgressClasses}
                      prefix={
                        <ClockCircleOutlined style={{ color: "#1890ff" }} />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Completion Rate"
                      value={Math.round(
                        (student.completedClasses / student.classesBought) * 100
                      )}
                      suffix="%"
                    />
                  </Col>
                </Row>
              </Card>

              {/* Recent Activity */}
              <Card
                title={<Title level={4}>Recent Activity</Title>}
                bordered={true}
              >
                <Timeline>
                  {student.recentActivity.map((activity, index) => (
                    <Timeline.Item key={index} color="blue">
                      <Text strong>{activity.action}</Text>
                      <br />
                      <Text type="secondary">{activity.date}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={8}>
              {/* Contact Information */}
              <Card
                title={<Title level={4}>Contact Information</Title>}
                bordered={true}
                style={{ marginBottom: "24px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div>
                    <Text type="secondary">
                      <MailOutlined /> Email
                    </Text>
                    <div>
                      <Text strong>{user?.email}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <PhoneOutlined /> Phone
                    </Text>
                    <div>
                      <Text strong>{student.phone}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <EnvironmentOutlined /> Location
                    </Text>
                    <div>
                      <Text strong>{student.location}</Text>
                    </div>
                  </div>
                  <div>
                    <Text type="secondary">
                      <CalendarOutlined /> Joined
                    </Text>
                    <div>
                      <Text strong>{student.joinedDate}</Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Skills */}
              <Card title={<Title level={4}>Skills</Title>} bordered={true}>
                {student.skills.map((skill, index) => (
                  <Tag key={index} color="blue" style={{ margin: "4px" }}>
                    {skill}
                  </Tag>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default StudentProfile;
