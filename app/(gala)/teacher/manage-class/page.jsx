'use client'

import React, { useState } from 'react'
import { Progress, Card, Typography, Button, Row, Col, Statistic, Tag, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function ManageClass() {
  const [showSidebar, setShowSidebar] = useState(false)

  const managedClasses = [
    {
      category: 'Math',
      name: 'Mathematics: Form Three',
      topic: 'Quadratic Equations',
      progress: 99,
      active_st: '09',
      absent_st: '01',
      pending_st: '30',
      time: '08:00 AM',
    },
    {
      category: 'Physics',
      name: 'Physics: Form Six',
      topic: 'Thermal Expansion',
      progress: 28,
      active_st: '09',
      absent_st: '01',
      pending_st: '30',
      time: '08:00 AM',
    },
    {
      category: 'Biology',
      name: 'Biology: Form Four',
      topic: 'Genetics and Inheritance',
      progress: 56,
      active_st: '09',
      absent_st: '01',
      pending_st: '30',
      time: '08:00 AM',
    },
  ]

  const getProgressColor = (progress) => {
    if (progress > 80) return '#4caf50'
    if (progress > 50) return '#ffa500'
    return '#f44336'
  }

  const SidebarContent = () => (
    <div className="flex flex-col gap-8 items-center">
      <Button type="primary" className="w-40">
        Accept Applications
      </Button>
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <Text type="primary" strong>
            Message (12)
          </Text>
          <Button type="primary" className="w-40">
            Edit
          </Button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="p-4 lg:p-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <Card className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Total Number of Students" value={10} valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={8}>
                <Statistic title="Recent Applications" value={10} valueStyle={{ color: '#1890ff' }} />
              </Col>
              <Col span={8}>
                <Statistic title="Pending Applications" value={10} valueStyle={{ color: '#1890ff' }} />
              </Col>
            </Row>
          </Card>

          {managedClasses.map((item) => (
            <Card key={item.name} className="mb-4">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={6}>
                  <Tag color="blue" className="mb-2">
                    {item.category}
                  </Tag>
                  <Text type="success">{item.time}</Text>
                </Col>
                <Col xs={24} sm={9}>
                  <Title level={5}>{item.name}</Title>
                  <Text>{item.topic}</Text>
                  <Progress
                    percent={item.progress}
                    strokeColor={getProgressColor(item.progress)}
                    size="small"
                  />
                </Col>
                <Col xs={24} sm={9}>
                  <Title level={5}>Record of Students</Title>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic title="Active" value={item.active_st} valueStyle={{ color: '#52c41a' }} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="Absent" value={item.absent_st} valueStyle={{ color: '#1890ff' }} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="Pending" value={item.pending_st} valueStyle={{ color: '#f5222d' }} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
        <Col xs={24} lg={6}>
          <Card className="sticky top-4">
            <SidebarContent />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setShowSidebar(true)}
        className="fixed bottom-4 right-4 lg:hidden"
      >
        Show Sidebar
      </Button>

      <Drawer
        title="Sidebar"
        placement="right"
        onClose={() => setShowSidebar(false)}
        visible={showSidebar}
        width={300}
      >
        <SidebarContent />
      </Drawer>
    </div>
  )
}