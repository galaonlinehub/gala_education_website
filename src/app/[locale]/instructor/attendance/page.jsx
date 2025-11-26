'use client';
import React, { useState } from 'react';
import { Table, Card, Tag, Progress, Statistic, Row, Col, Input, Select, Space } from 'antd';
import { ClockCircleOutlined, BookOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { UseAttendance } from '@/hooks/data/useAttendance';
import { useTranslations } from "next-intl";
import { GiTeacher } from "react-icons/gi";

const { Search } = Input;
const { Option } = Select;

export default function TeacherAttendanceDashboard() {
  const { userAttendance, isLoadingAttendance } = UseAttendance();

    const tatt = useTranslations('teacher_attendance');


  const [searchText, setSearchText] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');

  const getAttendanceColor = (percentage) => {
    const value = parseInt(percentage);
    if (value >= 80) return '#52c41a';
    if (value >= 50) return '#faad14';
    return '#ff4d4f';
  };

  const getAttendanceTag = (percentage) => {
    const value = parseInt(percentage);
    if (value >= 80) return { color: 'success', text: tatt('excellent') };
    if (value >= 50) return { color: 'warning', text: tatt('good') };
    return { color: 'error', text: tatt('needs_improvement') };
  };

  const filteredData = userAttendance?.filter(item => {
    const matchesSearch = item.lesson_name.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.topic.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.subtopic.toLowerCase().includes(searchText.toLowerCase());
    const matchesTopic = filterTopic === 'all' || item.topic === filterTopic;
    return matchesSearch && matchesTopic;
  });

  const uniqueTopics = React.useMemo(() => {
    if (!userAttendance || userAttendance?.length === 0) return [];
    const topics = [...new Set(userAttendance.map(item => item.topic))];
    return topics.filter(Boolean).sort();
  }, [userAttendance]);

  const columns = [
    {
      title: tatt('lesson'),
      dataIndex: 'lesson_name',
      key: 'lesson_name',
      fixed: 'left',
      width: 150,
      render: (text) => <span className="font-semibold text-xs md:text-sm text-blue-600">{text}</span>,
    },
    {
      title: tatt('topic'),
      dataIndex: 'topic',
      key: 'topic',
      width: 150,
      render: (text) => <span className="font-medium text-xs sm:text-sm">{text}</span>,
    },
    {
      title: tatt('subtopic'),
      dataIndex: 'subtopic',
      key: 'subtopic',
      width: 200,
      render: (text) => <span className="text-xs sm:text-sm">{text}</span>,
      ellipsis: true,
    },
    {
      title: tatt('date'),
      dataIndex: 'lesson_date',
      key: 'lesson_date',
      width: 200,
      render: (text) => <span className="text-xs sm:text-sm">{text}</span>,
      ellipsis: true,
    },
    {
      title: tatt('attendance_time'),
      key: 'attendance',
      width: 180,
      render: (_, record) => (
        <div>
          <div className="font-medium text-xs sm:text-sm">{record.attendance_formatted}</div>
          <div className="text-xs text-gray-500">of {record.lesson_duration_formatted}</div>
        </div>
      ),
    },
    {
      title: tatt('completion'),
      key: 'completion',
      width: 200,
      render: (_, record) => {
        const percentage = parseInt(record.attendance_percentage);
        const tag = getAttendanceTag(record.attendance_percentage);
        return (
          <div>
            <Progress 
              percent={percentage} 
              strokeColor={getAttendanceColor(record.attendance_percentage)}
              size="small"
            />
            <Tag color={tag.color} className="mt-1">{tag.text}</Tag>
          </div>
        );
      },
    },
  ];

const avgAttendance = filteredData.length > 0 
  ? (filteredData.reduce((sum, item) => 
      sum + parseInt(item.attendance_percentage), 0) / filteredData.length).toFixed(1)
  : '0.0';

  const totalLessons = filteredData.length;
  const excellentCount = filteredData.filter(item => parseInt(item.attendance_percentage) >= 80).length;

  return (
    <div className="min-h-screen bg-gradient-to-br  p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="text-base sm:text-lg font-bold text-gray-800 mb-2">
            {tatt('teacher_attendance_dashboard')}
          </div>
        </div>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={tatt('lessons_taught')}
                value={totalLessons}
                prefix={<GiTeacher className="text-[#001840]" />}
                valueStyle={{ color: '#001840' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={tatt('avg_attendance')}
                value={avgAttendance}
                suffix="%"
                prefix={<ClockCircleOutlined className="text-green-500" />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={tatt('excellent')}
                value={excellentCount}
                suffix={`/ ${totalLessons}`}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        <Card className="shadow-lg">
          <Space direction="vertical" size="middle" className="w-full mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Search
                  placeholder={tatt('search_lesson_topic_subtopic')}
                  allowClear
                  size="middle"
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full"
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  size="middle"
                  defaultValue="all"
                  className="w-full"
                  onChange={setFilterTopic}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">{tatt('all_topics')}</Option>
                  {uniqueTopics.map(topic => (
                    <Option key={topic} value={topic}>
                      {topic}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Space>

          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="lesson_id"
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              // showTotal: (total) => `${total}`,
              responsive: true,
            }}
            className="attendance-table"
          />
        </Card>
      </div>

      <style jsx>{`
        .attendance-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
        }
        .attendance-table .ant-table-tbody > tr:hover > td {
          background: #f0f5ff;
        }
      `}</style>
    </div>
  );
}