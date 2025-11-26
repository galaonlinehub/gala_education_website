'use client'
import React from 'react';
import { Card, Progress, Statistic, Row, Col, Typography, Tag, Table, Space } from 'antd';
import { ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { useAttendance } from '@/hooks/data/useAttendance';
import { PiListBulletsFill } from "react-icons/pi";
import { LoadingOutlined } from '@ant-design/icons';
import { useUser } from "@/hooks/data/useUser";
import { useTranslations } from "next-intl";

const { Text } = Typography;

const UserAttendanceDashboard = () => {
  const { user } = useUser();

  const statt = useTranslations('student_attendance');

  const primaryColor = '#001840';
  const { userAttendance, isLoadingAttendance } = useAttendance();

  // Loading spinner
  if (isLoadingAttendance) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <LoadingOutlined size="middle" />
      </div>
    );
  }

  // No data available
  if (!userAttendance || userAttendance?.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <Card>
          <Text>{statt('no_attendance_data')}</Text>
        </Card>
      </div>
    );
  }

  // --- Statistics ---
  const totalLessons = userAttendance?.length;
  const totalSeconds = userAttendance?.reduce((sum, lesson) => sum + parseFloat(lesson.attendance_seconds || 0), 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);
  const averageTimePerLesson = totalLessons > 0 ? (totalSeconds / totalLessons / 60).toFixed(0) : 0;

  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: 60,
      render: (text, record, index) => <div className="font-medium text-xs sm:text-sm" style={{ whiteSpace: 'nowrap' }}>{index + 1}</div>,
    },
    {
      title: statt('lesson'),
      dataIndex: ['cohort_title'],
      key: 'cohort_title',
      ellipsis: true,
      render: (text) => (
        <div className="font-bold text-blue-600 text-xs sm:text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text || 'N/A'}
        </div>
      ),
    },
    {
      title: statt('topic'),
      dataIndex: ['topic'],
      key: 'topic',
      ellipsis: true,
      render: (text) => (
        <div className="font-medium text-xs sm:text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text || 'N/A'}
        </div>
      ),
    },
    {
      title: statt('subtopic'),
      dataIndex: ['subtopic'],
      key: 'subtopic',
      ellipsis: true,
      render: (text) => (
        <div className="font-normal text-xs sm:text-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text || 'N/A'}
        </div>
      ),
    },
    {
      title: statt('date'),
      dataIndex: ['lesson_date'],
      key: 'lesson_date',
      responsive: ['md'],
      render: (date) => (
        <div className="text-xs sm:text-sm" style={{ whiteSpace: 'nowrap' }}>{date}</div>
      )
    },
    {
      title: statt('time_spent'),
      dataIndex: 'formatted_time',
      key: 'formatted_time',
      render: (time, record) => {
        let color = '#52c41a';
        if (record?.attendance_percentage < 50) color = '#f5222d';
        else if (record?.attendance_percentage < 80) color = '#fa8c16';
        return (
          <Space direction="vertical" size={0} style={{ whiteSpace: 'nowrap' }}>
            <Tag color={color} icon={<ClockCircleOutlined />}>
              {record?.attendance_formatted}
            </Tag>
            {record?.attendance_percentage > 0 && (
              <Progress
                percent={record?.attendance_percentage}
                size="small"
                showInfo={false}
                strokeColor={color}
              />
            )}
          </Space>
        );
      }
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fafbfc 0%, #e3e8f0 100%)',
      padding: '24px'
    }}>
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          background: primaryColor,
          border: 'none'
        }}
      >
        <Row align="middle" gutter={16}>
          {/* <Col>
            <Avatar
              size={64}
              icon={<LuUser />}
              style={{ backgroundColor: '#A9A9A9' }}
            />
          </Col> */}
          <Col flex="auto">
            <div className="text-base md:text-lg text-white font-semibold">
              {statt('student_attendance_dashboard')}
            </div>
            <div className="text-xs sm:text-sm font-thin mt-2 text-white">
              {user?.email}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <Statistic
              title={<div className="text-sm font-semibold text-black">{statt('total_lessons')}</div>}
              value={totalLessons}
              prefix={<PiListBulletsFill size={25} style={{ color: primaryColor }} />}
              valueStyle={{ color: primaryColor }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <Statistic
              title={<div className="text-sm font-semibold text-black">{statt('total_hours')}</div>}
              value={totalHours}
              suffix="hrs"
              prefix={<ClockCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <Statistic
              title={<div className="text-sm font-semibold text-black">{statt('avg_time_per_lesson')}</div>}
              value={averageTimePerLesson}
              suffix="min"
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Lessons Table */}
      <Card
        title={<div className="text-sm">{statt('lesson_attendance_details')}</div>}
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <Table
          dataSource={userAttendance}
          columns={columns}
          rowKey="lesson_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default UserAttendanceDashboard;