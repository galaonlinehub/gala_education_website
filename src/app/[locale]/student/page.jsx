'use client';
import { CheckCircleOutlined, ClockCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuBellRing, LuBookOpenCheck, LuUser } from 'react-icons/lu';

import SlickSpinner from '@/components/ui/loading/template/SlickSpinner';
import Updates from '@/components/ui/notification/Updates';
import { img_base_url } from '@/config/settings';
import { useEnrolledTopics } from '@/hooks/data/useEnrolledTopics';
import { useAttendancePercentage } from '@/hooks/data/usePercentage';
import { useUser } from '@/hooks/data/useUser';

const { Title, Text } = Typography;

export default function Component() {
  const { token } = theme.useToken();
  const { enrolledSubjects, isFetchingEnrolledSubjects, isEnrolledSubjectsError } =
    useEnrolledTopics();

  const queryClient = useQueryClient();
  const enrolledTopics = queryClient.getQueryData(['enrolledTopics']);

  const stdash = useTranslations('student_dashboard');

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-[1920px] mx-auto p-2 px-5 sm:p-4 lg:p-6">
        <Row
          gutter={[
            { xs: 12, sm: 16, md: 20, lg: 24 },
            { xs: 16, sm: 20, md: 24, lg: 24 },
          ]}
        >
          {/* Left Sidebar */}
          <Col xs={24} sm={24} md={8} lg={6} xl={5}>
            <div className="lg:sticky lg:top-4">
              <Space orientation="vertical" className="w-full" size="middle">
                <QuickLinks />
                <SelectedSubjects
                  enrolledSubjects={enrolledSubjects}
                  isFetchingEnrolledSubjects={isFetchingEnrolledSubjects}
                  isEnrolledSubjectsError={isEnrolledSubjectsError}
                />
              </Space>
            </div>
          </Col>

          {/* Main Content */}
          <Col xs={24} sm={24} md={16} lg={12} xl={14}>
            <Space orientation="vertical" className="w-full" size="middle">
              <DashboardHeader />
              <StatsSection token={token} />
              <Card
                title={
                  <span className="text-[#001840] font-bold text-base">
                    {stdash('your_classes')}
                  </span>
                }
                className="w-full shadow-lg border-0 bg-white"
                style={{
                  borderTop: '2px solid #001840',
                }}
              >
                <div className="overflow-x-auto">
                  <Table
                    columns={[
                      {
                        title: <span className="text-[#001840] font-bold">{stdash('class')}</span>,
                        dataIndex: 'cohort_name',
                        key: 'cohort_name',
                        width: '60%',
                        ellipsis: {
                          showTitle: false,
                        },
                        render: (_, record) => (
                          <Tooltip
                            color="#001840"
                            placement="top"
                            title={
                              <div className="text-center text-xs">{`${record?.topic_name} (${record?.cohort_name})`}</div>
                            }
                          >
                            <span className="text-xs sm:text-sm truncate block font-medium capitalize text-[#001840]">
                              {record?.topic_name}
                            </span>
                          </Tooltip>
                        ),
                      },
                      {
                        title: (
                          <span className="text-[#001840] font-bold">{stdash('progress')}</span>
                        ),
                        dataIndex: 'progress',
                        key: 'progress',
                        width: '20%',
                        render: (_, record) => {
                          const percent = record?.percent_of_completion ?? 0;
                          return (
                            <Progress
                              type="circle"
                              percent={percent}
                              size={43}
                              strokeColor={
                                percent >= 75
                                  ? '#22c55e'
                                  : percent >= 50
                                    ? '#3b82f6'
                                    : percent >= 25
                                      ? '#eab308'
                                      : '#ef4444'
                              }
                            />
                          );
                        },
                      },
                      {
                        title: <span className="text-[#001840] font-bold">{stdash('status')}</span>,
                        key: 'action',
                        width: '20%',
                        render: (_, record) => (
                          <button
                            disabled={true}
                            className={clsx(
                              'py-1.5 px-4 text-xs font-semibold text-white rounded-full disabled:pointer-events-none disabled:cursor-not-allowed transition-all duration-200 shadow-sm',
                              {
                                'bg-gradient-to-r from-green-500 to-green-600': record?.is_active,
                                'bg-gradient-to-r from-gray-400 to-gray-500': !record?.is_active,
                              }
                            )}
                          >
                            {stdash(record?.is_active ? 'active' : 'inactive')}
                          </button>
                        ),
                      },
                    ]}
                    dataSource={enrolledTopics}
                    rowKey={(record) =>
                      record?.id ||
                      record?.cohort_id ||
                      record?.topic_id ||
                      `row-${record?.cohort_id}-${record?.topic_id}`
                    }
                    loading={false}
                    pagination={false}
                    size="small"
                    scroll={{ x: 400 }}
                  />
                </div>
              </Card>
            </Space>
          </Col>

          {/* Right Sidebar */}
          <Col xs={24} sm={24} md={24} lg={6} xl={5}>
            <div className="lg:sticky lg:top-4">
              <Space orientation="vertical" className="w-full" size="middle">
                <DeadlinesCard />
                <ActivityCard />
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const SelectedSubjects = ({
  enrolledSubjects,
  isFetchingEnrolledSubjects,
  isEnrolledSubjectsError,
}) => {
  const stdash = useTranslations('student_dashboard');

  return (
    <Card
      title={<span className="font-bold text-[#001840]">{stdash('selected_subjects')}</span>}
      size="small"
      className="w-full shadow-lg border-0 bg-white"
      style={{
        borderTop: '2px solid #3b82f6',
      }}
    >
      <div className="min-h-[100px]">
        {isFetchingEnrolledSubjects ? (
          <div className="flex items-center justify-center h-full w-full">
            <SlickSpinner color="#001840" size={20} />
          </div>
        ) : isEnrolledSubjectsError ? (
          <div className="flex items-center justify-center w-full h-full text-xs font-medium text-red-600 text-center bg-red-50 rounded-lg p-3">
            {stdash('failed_to_load_subjects')}
          </div>
        ) : enrolledSubjects.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-xs text-center text-[#001840] opacity-60 bg-blue-50 rounded-lg p-3">
            {stdash('not_enrolled_in_subjects')}
          </div>
        ) : (
          enrolledSubjects.map((subject, index) => (
            <div
              key={index}
              className={clsx('flex flex-col justify-start w-full', index === 0 ? '-mt-3' : 'mt-2')}
            >
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="h-2 w-2 bg-gradient-to-br from-[#001840] to-blue-600 rounded-full" />
                <div className="flex-1 text-xs line-cramp-2 min-w-0 text-[#001840] font-medium">
                  {subject}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const QuickLinks = () => {
  const stdash = useTranslations('student_dashboard');

  return (
    <Card
      title={<span className="text-[#001840] font-bold">{stdash('quick_links')}</span>}
      size="small"
      className="w-full shadow-lg border-0 bg-white"
      style={{
        borderTop: '2px solid #22c55e',
      }}
    >
      <Space orientation="vertical" className="w-full" size="small">
        <Link href="/student/profile" className="w-fit block w-full">
          <button
            type="button"
            className="w-full border-2 border-[#001840] text-left h-auto py-2 px-3 flex gap-2 items-center rounded-lg truncate text-xs sm:text-sm text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #001840 0%, #1e40af 100%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LuUser size={16} />
            <>{stdash('profile')}</>
          </button>
        </Link>

        <Button
          type="text"
          disabled
          icon={<ClockCircleOutlined style={{ color: '#001840', opacity: 0.5 }} />}
          block
          className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            border: '1px solid rgba(0,24,64,0.1)',
            color: '#001840',
            opacity: 0.5,
          }}
        >
          <Link
            href="/student/reminders"
            className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm"
            style={{ color: '#001840' }}
          >
            <span className="hidden sm:inline">{stdash('create_reminders')}</span>
            <span className="sm:hidden">{stdash('reminders')}</span>
          </Link>
        </Button>

        <Button
          disabled
          type="text"
          icon={<TrophyOutlined style={{ color: '#001840', opacity: 0.5 }} />}
          block
          className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            border: '1px solid rgba(0,24,64,0.1)',
            color: '#001840',
            opacity: 0.5,
          }}
        >
          <span className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm">
            <span className="hidden sm:inline">{stdash('grades_and_progress')}</span>
            <span className="sm:hidden">{stdash('grades')}</span>
          </span>
        </Button>
      </Space>
    </Card>
  );
};

const DeadlinesCard = () => {
  const stdash = useTranslations('student_dashboard');

  return (
    <Card
      title={
        <div className="w-full">
          <span className="text-[#001840] font-bold block">{stdash('upcoming_reminders')}</span>
        </div>
      }
      className="w-full shadow-lg border-0 bg-white"
      style={{
        borderTop: '2px solid #eab308',
      }}
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-white">
          <ClockCircleOutlined
            style={{
              fontSize: '32px',
              color: '#3b82f6',
              marginBottom: '8px',
            }}
          />
          <div className="text-sm text-center text-[#001840] opacity-70 font-medium">
            {stdash('no_reminders_set')}
          </div>
        </div>
      </div>
    </Card>
  );
};

const DashboardHeader = () => {
  const { user } = useUser();
  const router = useRouter();

  const stdash = useTranslations('student_dashboard');
  const notift = useTranslations('notifications');
  const navt = useTranslations('navbar');

  return (
    <Card
      className="w-full shadow-xl border-0 rounded-xl overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white"
      style={{
        borderLeft: '3px solid #001840',
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={16} lg={16}>
          <Space orientation="vertical" size="small">
            <Title
              level={4}
              style={{
                margin: 0,
                fontFamily: '"Quicksand", sans-serif',
                background: 'linear-gradient(135deg, #001840 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="text-sm sm:text-base md:text-lg"
            >
              {stdash('welcome_back')},{' '}
              <span className="font-black capitalize">
                {user?.first_name} {user?.last_name}
              </span>
              !
            </Title>
            <Text type="secondary" className="text-xs sm:text-sm text-[#001840] opacity-70">
              {stdash('learning_dashboard_description')}
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className="text-left md:text-right">
          <Space size="middle">
            <Badge
              count={0}
              style={{
                backgroundColor: '#ef4444',
                boxShadow: '0 0 0 1px #fff',
              }}
            >
              <Updates>
                <Tooltip color="#001840" placement="top" title={notift('notifications')}>
                  <Button
                    className="cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => {}}
                    icon={<LuBellRing style={{ color: '#001840' }} size={18} />}
                    shape="circle"
                    size="large"
                    style={{
                      background: 'white',
                      border: '2px solid #001840',
                    }}
                  />
                </Tooltip>
              </Updates>
            </Badge>
            <Tooltip color="#001840" title={navt('view_profile')}>
              <Avatar
                onClick={() => router.push('/student/profile')}
                className="cursor-pointer shadow-md hover:shadow-xl transition-all duration-200"
                src={user?.profile_picture ? `${img_base_url}${user?.profile_picture}` : undefined}
                icon={<LuUser style={{ color: 'white' }} size={20} />}
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #001840 0%, #1e40af 100%)',
                  border: '3px solid white',
                  boxShadow: '0 0 0 2px #001840',
                }}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const StatsSection = () => {
  const { percentageAttendance } = useAttendancePercentage();

  const stats = {
    completedAssignments: 0,
  };

  const stdash = useTranslations('student_dashboard');

  return (
    <Row gutter={[12, 12]}>
      {[
        {
          title: stdash('attendance_rate'),
          value: percentageAttendance ?? 0,
          suffix: '%',
          icon: <CheckCircleOutlined />,
          gradient: 'from-green-500 to-green-600',
          borderColor: '#22c55e',
        },
        {
          title: stdash('completed_assignments'),
          value: stats.completedAssignments,
          icon: <LuBookOpenCheck />,
          gradient: 'from-blue-500 to-blue-600',
          borderColor: '#3b82f6',
        },
      ].map((stat, index) => (
        <Col xs={24} sm={12} key={index}>
          <Card
            className="h-20 sm:h-24 md:h-28 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-200"
            style={{
              borderTop: `2px solid ${stat.borderColor}`,
            }}
          >
            <Statistic
              title={
                <span
                  className="text-xs sm:text-sm truncate block"
                  style={{ color: '#001840', fontWeight: 'bold' }}
                >
                  {stat.title}
                </span>
              }
              value={stat.value}
              styles={{
                content: {
                  fontSize: '24px',
                  lineHeight: '1.2',
                  fontWeight: 'bold',
                  color: stat.borderColor,
                },
              }}
              formatter={(value) => (
                <div className="flex items-center space-x-2">
                  <span className="text-xl" style={{ color: stat.borderColor }}>
                    {stat.icon}
                  </span>
                  <span className="text-xl sm:text-2xl">
                    {value}
                    {stat.suffix}
                  </span>
                </div>
              )}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const ActivityCard = () => {
  const stdash = useTranslations('student_dashboard');

  return (
    <Card
      title={<span className="text-[#001840] font-bold">{stdash('recent_activities')}</span>}
      className="w-full shadow-lg border-0 bg-white"
      style={{
        borderTop: '2px solid #ef4444',
      }}
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-white">
          <CheckCircleOutlined
            style={{
              fontSize: '32px',
              color: '#ef4444',
              marginBottom: '8px',
            }}
          />
          <div className="text-sm text-center text-[#001840] opacity-70 font-medium">
            {stdash('no_recent_activity')}
          </div>
        </div>
      </div>
    </Card>
  );
};
