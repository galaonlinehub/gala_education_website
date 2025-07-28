'use client';
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Card, Tabs, Badge, Drawer, Tag, Typography, Space } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const StudentAssignmentInterface = () => {

  const assignments = [
    {
      id: 1,
      title: "Mathematics Integration",
      subject: "Mathematics",
      dueDate: "2025-02-20",
      status: "pending",
      description: "Complete exercises on indefinite integrals from Chapter 7",
      instructions: "Show all working steps clearly. Submit both handwritten work and final answers.",
      totalPoints: 100
    },
    {
      id: 2,
      title: "Literature Essay ",
      subject: "English",
      dueDate: "2025-02-18",
      status: "completed",
      description: "Analysis of Shakespeare's Macbeth",
      instructions: "Write a 1000-word essay analyzing the theme of ambition in Macbeth.",
      totalPoints: 150
    },
    {
      id: 3,
      title: "Chemical Reactions Lab",
      subject: "Chemistry",
      dueDate: "2025-02-25",
      status: "pending",
      description: "Lab report on acid-base reactions",
      instructions: "Document your observations, write balanced equations, and include error analysis.",
      totalPoints: 120
    }
  ];

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Filter assignments based on status
  const getFilteredAssignments = (status) => {
    if (status === 'all') return assignments;
    return assignments.filter(assignment => assignment.status === status);
  };

  const handleCardClick = (assignment) => {
    setSelectedAssignment(assignment);
    setDrawerVisible(true);
  };

  const AssignmentCard = ({ assignment }) => (
    <Card
      hoverable
      style={{ marginBottom: 16 }}
      onClick={() => handleCardClick(assignment)}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <Title level={4} style={{ marginTop: 0 }}>{assignment.title}</Title>
            <Text type="secondary">{assignment.subject}</Text>
          </div>
          <Badge 
            status={assignment.status === 'completed' ? 'success' : 'processing'} 
            text={assignment.status}
          />
        </div>
        <Space>
          <CalendarOutlined style={{ color: '#1890ff' }} />
          <Text type="secondary">Due: {assignment.dueDate}</Text>
        </Space>
      </Space>
    </Card>
  );

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2}>My Assignments</Title>
      
      <Tabs 
        defaultActiveKey="all"
        type="card"
        style={{
          '.ant-tabs-nav::before': {
            border: 'none',
          }
        }}
      >
        <TabPane tab="All Assignments" key="all">
          {getFilteredAssignments('all').map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabPane>
        <TabPane tab="Completed" key="completed">
          {getFilteredAssignments('completed').map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabPane>
        <TabPane tab="Pending" key="pending">
          {getFilteredAssignments('pending').map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabPane>
      </Tabs>

      <Drawer
        title={selectedAssignment?.title}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={480}
      >
        {selectedAssignment && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge 
                status={selectedAssignment.status === 'completed' ? 'success' : 'processing'} 
                text={selectedAssignment.status}
              />
              <Space>
                <ClockCircleOutlined />
                <Text type="secondary">Due: {selectedAssignment.dueDate}</Text>
              </Space>
            </div>

            <div>
              <Title level={5}>Subject</Title>
              <Text>{selectedAssignment.subject}</Text>
            </div>

            <div>
              <Title level={5}>Description</Title>
              <Text>{selectedAssignment.description}</Text>
            </div>

            <div>
              <Title level={5}>Instructions</Title>
              <Text>{selectedAssignment.instructions}</Text>
            </div>

            <div>
              <Title level={5}>Total Points</Title>
              <Text>{selectedAssignment.totalPoints} points</Text>
            </div>

            {selectedAssignment.status === 'completed' && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Completed
              </Tag>
            )}
          </Space>
        )}
      </Drawer>
    </div>
  );
};

export default StudentAssignmentInterface;