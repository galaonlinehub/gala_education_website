"use client";
import {
  theme,
  Card,
  Typography,
  Row,
  Col,
  Table,
  Button,
  Progress,
  Space,
  Statistic,
  Avatar,
  Badge,
  Tag,
  Tooltip,
} from "antd";
import {
  ClockCircleOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useUser } from "@/src/hooks/useUser";
import {
  LuBellRing,
  LuBookOpen,
  LuBookOpenCheck,
  LuUser,
} from "react-icons/lu";
import { img_base_url } from "@/src/config/settings";
import { useEnrolledTopics } from "@/src/hooks/useEnrolledTopics";
import SlickSpinner from "@/src/components/ui/loading/template/SlickSpinner";
import { useRouter } from "next/navigation";
import Updates from "@/src/components/ui/notification/Updates";

const { Title, Text } = Typography;

export default function Component() {
  const { token } = theme.useToken();
  const {
    enrolledSubjects,
    isFetchingEnrolledSubjects,
    isEnrolledSubjectsError,
    enrolledTopics,
    enrolledTopicsLoading,
  } = useEnrolledTopics();

  return (
    <div className="min-h-screen">
      <div className="max-w-[1920px] mx-auto p-2 sm:p-4 lg:p-6">
        <Row
          gutter={[
            { xs: 12, sm: 16, md: 20, lg: 24 },
            { xs: 16, sm: 20, md: 24, lg: 24 },
          ]}
        >
          {/* Left Sidebar */}
          <Col xs={24} sm={24} md={8} lg={6} xl={5}>
            <div className="lg:sticky lg:top-4">
              <Space direction="vertical" className="w-full" size="middle">
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
            <Space direction="vertical" className="w-full" size="middle">
              <DashboardHeader />
              <StatsSection token={token} />
              <Card
                title={
                  <span style={{ color: '#001840', fontWeight: 'bold' }}>
                    Your Classes
                  </span>
                }
                className="w-full shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
                  border: '1px solid rgba(0,24,64,0.1)',
                  borderRadius: '12px'
                }}
                bodyStyle={{ 
                  padding: '0',
                  overflow: 'auto'
                }}
              >
                <div className="overflow-x-auto">
                  <Table
                    columns={[
                      {
                        title: <span style={{ color: '#001840', fontWeight: 'bold' }}>Class</span>,
                        dataIndex: "subtopic_name",
                        key: "subtopic_name",
                        ellipsis: {
                          showTitle: false,
                        },
                        render: (text) => (
                          <Tooltip placement="topLeft" title={text}>
                            <span className="text-xs sm:text-sm truncate block max-w-[120px] sm:max-w-[200px]" style={{ color: '#001840' }}>
                              {text}
                            </span>
                          </Tooltip>
                        ),
                      },
                      {
                        title: <span style={{ color: '#001840', fontWeight: 'bold' }}>Progress</span>,
                        dataIndex: "progress",
                        key: "progress",
                        width: "35%",
                        render: (progress) => (
                          <Progress 
                            percent={progress} 
                            size="small" 
                            className="min-w-[80px]"
                            strokeColor={{
                              '0%': '#001840',
                              '100%': '#3b82f6',
                            }}
                          />
                        ),
                      },
                      {
                        title: <span style={{ color: '#001840', fontWeight: 'bold' }}>Action</span>,
                        key: "action",
                        width: "25%",
                        render: () => (
                          <Button 
                            type="primary" 
                            size="small"
                            className="p-0 text-xs sm:text-sm"
                            style={{
                              background: 'linear-gradient(135deg, #001840 0%, #3b82f6 100%)',
                              border: 'none',
                              borderRadius: '8px'
                            }}
                          >
                            Enter
                          </Button>
                        ),
                      },
                    ]}
                    dataSource={[]}
                    loading={enrolledTopicsLoading}
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
              <Space direction="vertical" className="w-full" size="middle">
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
  return (
    <Card 
      title={
        <span style={{ color: '#001840', fontWeight: 'bold' }}>
          Selected subjects
        </span>
      }
      size="small" 
      className="w-full shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(0,24,64,0.1)',
        borderRadius: '12px'
      }}
      bodyStyle={{ padding: '12px' }}
    >
      <div className="flex items-center justify-center flex-col gap-2 min-h-[100px]">
        {isFetchingEnrolledSubjects ? (
          <SlickSpinner color="#001840" size={12} />
        ) : isEnrolledSubjectsError ? (
          <div className="text-xs text-red-500 text-center">
            Failed to load subjects.
          </div>
        ) : enrolledSubjects.length === 0 ? (
          <div className="text-xs text-center" style={{ color: '#001840', opacity: 0.7 }}>
            You are not enrolled in any subjects.
          </div>
        ) : (
          enrolledSubjects.map((subject) => (
            <div
              key={subject.id}
              className="flex gap-2 items-center justify-start w-full p-2 rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)',
                border: '1px solid rgba(0,24,64,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,24,64,0.1) 0%, rgba(59,130,246,0.1) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)';
              }}
            >
              <LuBookOpen className="flex-shrink-0" style={{ color: '#001840' }} />
              <div className="flex-1 text-xs sm:text-sm truncate min-w-0" style={{ color: '#001840' }}>
                {subject?.name}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const QuickLinks = () => (
  <Card
    title={
      <span style={{ color: '#001840', fontWeight: 'bold' }}>
        Quick Links
      </span>
    }
    size="small"
    className="w-full shadow-lg"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
      border: '1px solid rgba(0,24,64,0.1)',
      borderRadius: '12px'
    }}
    bodyStyle={{ padding: '12px' }}
  >
    <Space
      direction="vertical"
      className="w-full"
      size="small"
    >
      <Button
        type="text"
        icon={<LuUser style={{ color: '#001840' }} />}
        block
        className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)',
          border: '1px solid rgba(0,24,64,0.1)',
          color: '#001840'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,24,64,0.1) 0%, rgba(59,130,246,0.1) 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)';
        }}
      >
        <Link href="/student/profile" className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm" style={{ color: '#001840' }}>
          Profile
        </Link>
      </Button>

      <Button
        type="text"
        disabled
        icon={<ClockCircleOutlined style={{ color: '#001840', opacity: 0.5 }} />}
        block
        className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(0,24,64,0.03) 0%, rgba(59,130,246,0.03) 100%)',
          border: '1px solid rgba(0,24,64,0.05)',
          color: '#001840',
          opacity: 0.5
        }}
      >
        <Link href="/student/reminders" className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm" style={{ color: '#001840' }}>
          <span className="hidden sm:inline">Create Reminders</span>
          <span className="sm:hidden">Reminders</span>
        </Link>
      </Button>

      <Button
        disabled
        type="text"
        icon={<TrophyOutlined style={{ color: '#001840', opacity: 0.5 }} />}
        block
        className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(0,24,64,0.03) 0%, rgba(59,130,246,0.03) 100%)',
          border: '1px solid rgba(0,24,64,0.05)',
          color: '#001840',
          opacity: 0.5
        }}
      >
        <span className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm">
          <span className="hidden sm:inline">Grades & Progress</span>
          <span className="sm:hidden">Grades</span>
        </span>
      </Button>
    </Space>
  </Card>
);

const DeadlinesCard = () => {
  return (
    <Card
      title={
        <span style={{ color: '#001840', fontWeight: 'bold' }}>
          Upcoming Reminders
        </span>
      }
      className="w-full shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(0,24,64,0.1)',
        borderRadius: '12px'
      }}
      bodyStyle={{ padding: '12px' }}
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg" style={{
          background: 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)',
          border: '1px solid rgba(0,24,64,0.1)'
        }}>
          <ClockCircleOutlined 
            style={{ 
              fontSize: '24px', 
              color: '#001840',
              opacity: 0.6,
              marginBottom: '8px'
            }} 
          />
          <div className="text-sm text-center" style={{ color: '#001840', opacity: 0.7 }}>
            No reminders set
          </div>
        </div>
      </div>
    </Card>
  );
};

const DashboardHeader = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Card 
      className="w-full shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
        border: '2px solid #001840',
        borderRadius: '12px'
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={16} lg={16}>
          <Space direction="vertical" size="small">
            <Title
              level={4}
              style={{ 
                margin: 0, 
                fontFamily: '"Quicksand", sans-serif',
                background: 'linear-gradient(135deg, #001840 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              className="text-sm sm:text-base md:text-lg"
            >
              Welcome back,{" "}
              <span className="font-black capitalize">
                {user?.first_name} {user?.last_name}
              </span>
              !
            </Title>
            <Text type="secondary" className="text-xs sm:text-sm" style={{ color: '#001840', opacity: 0.7 }}>
              Your learning dashboard - Track your progress and stay organized
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className="text-left md:text-right">
          <Space size="middle">
            <Badge color="#001840" count={0}>
              <Updates>
                <Tooltip placement="top" title="Notifications">
                  <Button
                    className="cursor-pointer shadow-md"
                    onClick={() => { }}
                    icon={<LuBellRing style={{ color: '#001840' }} />}
                    shape="circle"
                    size="small"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.1) 100%)',
                      border: '1px solid rgba(0,24,64,0.2)'
                    }}
                  />
                </Tooltip>
              </Updates>
            </Badge>
            <Tooltip title="View Profile">
              <Avatar
                onClick={() => router.push("/student/profile")}
                className="cursor-pointer shadow-md"
                src={user?.profile_picture ? `${img_base_url}${user?.profile_picture}` : undefined}
                icon={<LuUser style={{ color: '#001840' }} />}
                size="default"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.1) 100%)',
                  border: '2px solid #001840'
                }}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const StatsSection = ({ token }) => {
  const stats = {
    attendanceRate: 0,
    completedAssignments: 0,
  };

  return (
    <Row gutter={[12, 12]}>
      {[
        {
          title: "Attendance Rate",
          value: stats.attendanceRate,
          suffix: "%",
          icon: <CheckCircleOutlined />,
        },
        {
          title: "Completed Assignments",
          value: stats.completedAssignments,
          icon: <LuBookOpenCheck />,
        },
      ].map((stat, index) => (
        <Col xs={24} sm={12} key={index}>
          <Card 
            className="h-20 sm:h-24 md:h-28 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
              border: '1px solid rgba(0,24,64,0.1)',
              borderRadius: '12px'
            }}
          >
            <Statistic
              title={
                <span className="text-xs sm:text-sm truncate block" style={{ color: '#001840', fontWeight: 'bold' }}>
                  {stat.title}
                </span>
              }
              value={stat.value}
              valueStyle={{ 
                background: 'linear-gradient(135deg, #001840 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '16px',
                lineHeight: '1.2',
                fontWeight: 'bold'
              }}
              formatter={(value) => (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-sm sm:text-base" style={{ color: '#001840' }}>{stat.icon}</span>
                  <span className="text-sm sm:text-base">
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
  return (
    <Card 
      title={
        <span style={{ color: '#001840', fontWeight: 'bold' }}>
          Recent Activities
        </span>
      }
      className="w-full shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(59,130,246,0.05) 100%)',
        border: '1px solid rgba(0,24,64,0.1)',
        borderRadius: '12px'
      }}
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg" style={{
          background: 'linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)',
          border: '1px solid rgba(0,24,64,0.1)'
        }}>
          <CheckCircleOutlined 
            style={{ 
              fontSize: '24px', 
              color: '#001840',
              opacity: 0.6,
              marginBottom: '8px'
            }} 
          />
          <div className="text-sm text-center" style={{ color: '#001840', opacity: 0.7 }}>
            No recent activity
          </div>
        </div>
      </div>
    </Card>
  );
};