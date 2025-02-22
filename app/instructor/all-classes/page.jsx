"use client";
import React, { useState } from "react";
import { Card, Row, Col, Button, Drawer, Space, Typography, Divider, Input } from "antd";
import { PlusOutlined, CalendarOutlined, EyeOutlined, BookOutlined, SearchOutlined } from "@ant-design/icons";
import ClassCreationWizard from "../create-class/CreateClass";

const { Title, Text } = Typography;

const InstructorClasses = () => {
  const [openAddNewClass, setOpenAddNewClass] = useState(false);

  const [classes] = useState([
    {
      id: 1,
      name: "Introduction to Computer Science",
      startDate: "2024-01-15",
      endDate: "2024-05-20",
    },
    {
      id: 2,
      name: "Advanced React Programming",
      startDate: "2024-02-01",
      endDate: "2024-06-10",
    },
    {
      id: 3,
      name: "Data Structures and Algorithms",
      startDate: "2024-01-20",
      endDate: "2024-05-25",
    },
    {
      id: 4,
      name: "Machine Learning Fundamentals",
      startDate: "2024-02-10",
      endDate: "2024-06-15",
    },
    {
      id: 5,
      name: "Cloud Computing Essentials",
      startDate: "2024-01-25",
      endDate: "2024-05-30",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchText, setSearchText] = useState("");

  const showDrawer = (classData) => {
    setSelectedClass(classData);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedClass(null);
  };

  const handleAddNew = () => {
   setOpenAddNewClass(true);
  };

  // Filter classes based on search text
  const filteredClasses = classes.filter((classItem) => classItem.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>
          <BookOutlined style={{ marginRight: "8px" }} />
          My Classes
        </Title>

        {/* Search Input */}
        <div style={{ marginTop: "16px", marginBottom: "24px" }}>
          <Input placeholder="Search classes..." prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} style={{ maxWidth: "400px" }} allowClear />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {filteredClasses.map((classItem) => (
          <Col xs={24} sm={24} md={8} key={classItem.id}>
            <Card
              hoverable
              style={{ height: "100%" }}
              actions={[
                <Button key="view" type="link" icon={<EyeOutlined />}>
                  View Details
                </Button>,
              ]}
            >
              <Title level={4}>
                <span className="text-sm">{classItem.name}</span>
              </Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>
                  <CalendarOutlined style={{ marginRight: "8px" }} />
                  Start: {classItem.startDate}
                </Text>
                <Text>
                  <CalendarOutlined style={{ marginRight: "8px" }} />
                  End: {classItem.endDate}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}

        {/* Add New Class Card */}
        <Col xs={24} sm={24} md={8}>
          <Card
            hoverable
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleAddNew}
          >
            <div style={{ textAlign: "center" }}>
              <PlusOutlined style={{ fontSize: "24px", marginBottom: "8px" }} />
              <Title level={4}>
                <span className="text-sm">Add New Class</span>
              </Title>
            </div>
          </Card>
        </Col>
      </Row>

      <ClassCreationWizard openAddNewClass={openAddNewClass} setOpenAddNewClass={setOpenAddNewClass} />

    </div>
  );
};

export default InstructorClasses;
