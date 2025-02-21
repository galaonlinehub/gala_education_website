"use client";
import React, { useState } from "react";
import { Table, Card, Tag, Button, Statistic, Row, Col, Calendar, Badge, Space, Modal, Progress, Typography, Grid } from "antd";
import { VideoCameraOutlined, UserOutlined, ClockCircleOutlined, BellOutlined, BookOutlined, TeamOutlined, LineChartOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LiveLesson = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const screens = useBreakpoint();

  const liveClasses = [
    {
      key: "1",
      class_name: "Advanced Mathematics",
      instructor: "Dr. Sarah Smith",
      topic: "Complex Numbers & Applications",
      date: "Feb 20, 2025",
      time: "09:00 AM",
      duration: "1.5 hours",
      enrolled: 28,

      status: "Upcoming",
      link: "https://zoom.us/j/1234567890",
      description: "Dive deep into complex numbers and their real-world applications in electrical engineering and quantum mechanics. This session will cover fundamental theorems and practical problem-solving techniques.",
      prerequisites: "Basic calculus knowledge required",
    },
    {
      key: "2",
      class_name: "World Literature",
      instructor: "Prof. Michael Johnson",
      topic: "Shakespeare's Tragedies",
      date: "Feb 21, 2025",
      time: "02:00 PM",
      duration: "2 hours",
      enrolled: 15,

      status: "Closed",
      link: "https://zoom.us/j/1234567891",
      description: "Explore the themes of fate, ambition, and moral corruption in Shakespeare's major tragedies. We'll focus on Macbeth, King Lear, and Hamlet.",
      prerequisites: "None",
    },
    {
      key: "3",
      class_name: "Quantum Physics",
      instructor: "Dr. Emily Brown",
      topic: "Quantum Entanglement",
      date: "Feb 22, 2025",
      time: "10:30 AM",
      duration: "1.5 hours",
      enrolled: 25,

      status: "Closed",
      link: "https://zoom.us/j/1234567892",
      description: "Understanding quantum entanglement and its implications for quantum computing and cryptography. Includes live demonstrations using quantum simulation software.",
      prerequisites: "Basic quantum mechanics knowledge",
    },
    {
      key: "4",
      class_name: "Computer Science",
      instructor: "Prof. Alan Chen",
      topic: "Machine Learning Basics",
      date: "Feb 23, 2025",
      time: "11:00 AM",
      duration: "2 hours",
      enrolled: 18,

      status: "Upcoming",
      link: "https://zoom.us/j/1234567893",
      description: "Introduction to machine learning concepts including supervised learning, classification, and regression. Hands-on practice with Python and scikit-learn.",
      prerequisites: "Python programming basics",
    },
    {
      key: "5",
      class_name: "Business Studies",
      instructor: "Dr. Rachel Martinez",
      topic: "Strategic Management",
      date: "Feb 24, 2025",
      time: "03:00 PM",
      duration: "1.5 hours",
      enrolled: 32,

      status: "Upcoming",
      link: "https://zoom.us/j/1234567894",
      description: "Learn about strategic planning, competitive analysis, and business model innovation. Includes case studies of successful global companies.",
      prerequisites: "Basic business knowledge",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
     
      case "Upcoming":
        return "orange";
      case "Closed":
        return "red";
      default:
        return "blue";
    }
  };

  const getColumns = () => {
    const baseColumns = [
      {
        title: "Class Details",
        dataIndex: "class_name",
        key: "class_name",
        render: (text, record) => (
          <Space direction="vertical" size={0}>
            <div style={{ fontWeight: "bold" }}>
              <BookOutlined style={{ marginRight: 8 }} />
              {text}
            </div>
            <div style={{ fontSize: "0.9em", color: "#666" }}>{record.topic}</div>
            <div style={{ fontSize: "0.9em", color: "#666" }}>
              <UserOutlined style={{ marginRight: 8 }} />
              {record.instructor}
            </div>
          </Space>
        ),
      },
      {
        title: "Schedule",
        dataIndex: "date",
        key: "date",
        render: (text, record) => (
          <Space direction="vertical" size={0}>
            <div>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {text}
            </div>
            <div style={{ fontSize: "0.9em", color: "#666" }}>
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              {record.time}
            </div>
            <div style={{ fontSize: "0.9em", color: "#666" }}>
              <LineChartOutlined style={{ marginRight: 8 }} />
              {record.duration}
            </div>
          </Space>
        ),
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space direction={screens.xs ? "vertical" : "horizontal"} style={{ width: "100%" }}>
            <Button
              type="primary"
              icon={<VideoCameraOutlined />}
              onClick={() => {
                setSelectedClass(record);
                setIsModalVisible(true);
              }}
              disabled={record.status === "Closed"}
              size={screens.xs ? "middle" : "default"}
            >
              Join
            </Button>
            <Button icon={<BellOutlined />} onClick={() => alert(`Reminder set for ${record.class_name}`)} size={screens.xs ? "middle" : "default"}>
              Remind
            </Button>
          </Space>
        ),
      },
    ];

    if (!screens.xs) {
      baseColumns.splice(2, 0, {
        title: "Enrolled",
        key: "capacity",
        render: (_, record) => (
          <Space direction="vertical" size={0}>
            <div>
              <TeamOutlined style={{ marginRight: 8 }} />
              {`${record.enrolled}`}
            </div>
          </Space>
        ),
      });
    }

    return baseColumns;
  };

  const getListData = (value) => {
    const listData = [];
    liveClasses.forEach((classItem) => {
      const classDate = new Date(classItem.date);
      if (value.date() === classDate.getDate() && value.month() === classDate.getMonth()) {
        listData.push({
          type: "success",
          content: classItem.class_name,
        });
      }
    });
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index} style={{ marginBottom: 3 }}>
            <Badge status={item.type} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: screens.xs ? 8 : 24 }}>
      <Row align="middle" justify="space-between" style={{ marginBottom: 24 }}>
        <Title level={screens.xs ? 3 : 2} style={{ margin: 0 }}>
          <VideoCameraOutlined style={{ marginRight: 8 }} />
          Live Learning Center
        </Title>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          {
            title: "Total Classes",
            value: liveClasses.length,
            icon: <CalendarOutlined />,
          },
          {
            title: "Total Students",
            value: liveClasses.reduce((acc, curr) => acc + curr.enrolled, 0),
            icon: <TeamOutlined />,
          },
         
          {
            title: "Total Hours",
            value: liveClasses.reduce((acc, curr) => acc + parseFloat(curr.duration), 0),
            suffix: "hrs",
            icon: <ClockCircleOutlined />,
          },
        ].map((stat, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card>
              <Statistic title={stat.title} value={stat.value} suffix={stat.suffix} prefix={stat.icon} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                Upcoming Live Classes
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            <Table
              columns={getColumns()}
              dataSource={liveClasses}
              pagination={{
                pageSize: 2, // Show 2 items per page
                total: liveClasses.length,
                hideOnSinglePage: true, // Hide pagination if there's only one page
                showSizeChanger: false, // Optional: disable the page size selector
              }}
              scroll={{ x: true }}
              size={screens.xs ? "small" : "default"}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                Class Calendar
              </Space>
            }
          >
            <Calendar fullscreen={false} cellRender={dateCellRender} style={{ maxWidth: "100%" }} />
          </Card>
        </Col>
      </Row>

      <Modal
        title={selectedClass ? `Join ${selectedClass.class_name} Class` : "Join Class"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="join"
            type="primary"
            icon={<VideoCameraOutlined />}
            onClick={() => {
              window.open(selectedClass?.link, "_blank");
              setIsModalVisible(false);
            }}
          >
            Join Now
          </Button>,
        ]}
        width={screens.xs ? "95%" : 520}
      >
        {selectedClass && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Paragraph>
              <strong>Topic:</strong> {selectedClass.topic}
            </Paragraph>
            <Paragraph>
              <strong>Instructor:</strong> {selectedClass.instructor}
            </Paragraph>
            <Paragraph>
              <strong>Description:</strong> {selectedClass.description}
            </Paragraph>
            <Paragraph>
              <strong>Prerequisites:</strong> {selectedClass.prerequisites}
            </Paragraph>
            <Paragraph>
              <strong>Date & Time:</strong> {selectedClass.date} at {selectedClass.time}
            </Paragraph>
            <Paragraph>
              <strong>Duration:</strong> {selectedClass.duration}
            </Paragraph>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default LiveLesson;
