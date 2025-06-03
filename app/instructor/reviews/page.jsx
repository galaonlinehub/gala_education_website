'use client';
import React, { useState } from 'react';
import { 
  Layout, 
  Card, 
  Table, 
  Tag, 
  Typography, 
  Rate, 
  Statistic, 
  Row, 
  Col, 
  Divider, 
  Badge,
  Avatar,
  Tooltip,
  Progress,
  Space
} from 'antd';
import { 
  StarOutlined, 
  MessageOutlined, 
  CalendarOutlined, 
  UserOutlined,
  RiseOutlined,
  BookOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const InstructorReviewsDashboard = () => {
  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      course: 'Introduction to React',
      rating: 5,
      date: '2025-04-15',
      comment: 'Excellent course! The instructor explained complex concepts in a very accessible way.',
      helpful: 12,
      profileColor: '#1890ff',
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      course: 'Advanced JavaScript',
      rating: 4,
      date: '2025-04-10',
      comment: 'Very informative sessions. Would appreciate more practical examples.',
      helpful: 8,
      profileColor: '#52c41a',
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      course: 'Introduction to React',
      rating: 5,
      date: '2025-04-08',
      comment: 'The instructor was patient and thorough. This course exceeded my expectations!',
      helpful: 15,
      profileColor: '#722ed1',
    },
    {
      id: 4,
      studentName: 'David Kim',
      course: 'UI/UX Design Principles',
      rating: 3,
      date: '2025-03-30',
      comment: 'Good content but the pace was a bit too fast for beginners.',
      helpful: 4,
      profileColor: '#fa8c16',
    },
    {
      id: 5,
      studentName: 'Lisa Wang',
      course: 'Web Development Bootcamp',
      rating: 4,
      date: '2025-03-25',
      comment: 'Great course structure. The feedback on assignments was very constructive.',
      helpful: 9,
      profileColor: '#eb2f96',
    },
  ];

  const allReviews = mockReviews;

  // Calculate statistics
  const averageRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1)
    : 0;
  
  const ratingCounts = [0, 0, 0, 0, 0]; // For 1 to 5 stars
  allReviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });

  const columns = [
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'student',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: record.profileColor }}>
            {text.charAt(0)}
          </Avatar>
          {text}
        </Space>
      ),
      responsive: ['md']
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: rating => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: date => (
        <Space>
          <CalendarOutlined /> {date}
        </Space>
      ),
      responsive: ['lg']
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: {
        showTitle: false,
      },
      render: comment => (
        <Tooltip placement="topLeft" title={comment}>
          <Paragraph ellipsis={{ rows: 2 }}>{comment}</Paragraph>
        </Tooltip>
      ),
    },
    {
      title: 'Helpful',
      dataIndex: 'helpful',
      key: 'helpful',
      sorter: (a, b) => a.helpful - b.helpful,
      render: helpful => (
        <Badge count={helpful} showZero color="blue">
          <MessageOutlined style={{ fontSize: '16px' }} />
        </Badge>
      ),
      responsive: ['sm']
    },
  ];

  // Rating distribution component
  const RatingDistribution = () => (
    <div>
      {[5, 4, 3, 2, 1].map(star => (
        <Row key={star} align="middle" style={{ marginBottom: 8 }}>
          <Col span={4}>
            <Text>{star} star</Text>
          </Col>
          <Col span={16}>
            <Progress 
              percent={allReviews.length > 0 ? (ratingCounts[star - 1] / allReviews.length) * 100 : 0} 
              showInfo={false} 
              strokeColor={star > 3 ? "#52c41a" : star > 1 ? "#faad14" : "#f5222d"}
            />
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Text>{ratingCounts[star - 1]} reviews</Text>
          </Col>
        </Row>
      ))}
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 16px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Row align="middle" style={{ height: '100%' }} gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Title level={3} style={{ margin: '16px 0', fontSize: 'calc(18px + 0.5vw)' }}>Instructor Feedback Dashboard</Title>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
            <Space size="middle">
              <Avatar size="large" icon={<UserOutlined />} />
              <Text strong style={{ fontSize: 'calc(14px + 0.2vw)' }}>Prof. Jennifer Smith</Text>
            </Space>
          </Col>
        </Row>
      </Header>
      
      <Content style={{ padding: '16px', background: '#f0f2f5' }}>
        <Row gutter={[16, 16]}>
          {/* Statistics Cards */}
          <Col xs={12} sm={12} md={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title="Average Rating" 
                value={averageRating} 
                precision={1}
                valueStyle={{ color: '#1890ff' }}
                prefix={<StarOutlined />}
                suffix="/ 5"
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title="Total Reviews" 
                value={allReviews.length} 
                valueStyle={{ color: '#52c41a' }}
                prefix={<MessageOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title="5-Star Reviews" 
                value={ratingCounts[4]} 
                valueStyle={{ color: '#722ed1' }}
                prefix={<StarOutlined />}
                suffix={`(${allReviews.length > 0 ? Math.round((ratingCounts[4] / allReviews.length) * 100) : 0}%)`}
              />
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Card bodyStyle={{ padding: '12px' }}>
              <Statistic 
                title="Trend" 
                value="Improving" 
                valueStyle={{ color: '#52c41a' }}
                prefix={<RiseOutlined />}
              />
            </Card>
          </Col>
          
          {/* Rating Distribution */}
          <Col xs={24} lg={8}>
            <Card title="Rating Distribution" style={{ height: '100%' }}>
              <RatingDistribution />
              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic 
                    title="Positive" 
                    value={`${allReviews.length > 0 ? Math.round(((ratingCounts[4] + ratingCounts[3]) / allReviews.length) * 100) : 0}%`} 
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="Negative" 
                    value={`${allReviews.length > 0 ? Math.round(((ratingCounts[0] + ratingCounts[1]) / allReviews.length) * 100) : 0}%`} 
                    valueStyle={{ color: '#f5222d' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          
          {/* Reviews Table */}
          <Col xs={24} lg={16}>
            <Card 
              title="Student Reviews" 
              extra={<Text>{allReviews.length} reviews</Text>}
              bodyStyle={{ padding: '12px', overflow: 'auto' }}
            >
              <Table 
                dataSource={allReviews} 
                columns={columns} 
                rowKey="id"
                pagination={{ 
                  pageSize: 5,
                  responsive: true,
                  showSizeChanger: true,
                  pageSizeOptions: ['5', '10', '20']
                }}
                scroll={{ x: 'max-content' }}
                size="middle"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default InstructorReviewsDashboard;