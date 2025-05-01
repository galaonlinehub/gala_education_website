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
} from "antd";
import {
  ClockCircleOutlined,
  TrophyOutlined,
  BellOutlined,
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
    <div className="overflow-hidden">
      <Row
        className="max-w-[1920px] mx-auto p-1 md:p-6 h-full"
        gutter={[
          { xs: 8, sm: 16, md: 24 },
          { xs: 8, sm: 16, md: 24 },
        ]}
      >
        {/* Left Sidebar */}
        <Col xs={24} md={8} lg={6} xl={5} className="h-full">
          <div className="sticky top-4 h-full">
            <Space direction="vertical" className="w-full h-full" size="middle">
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
        <Col xs={24} md={16} lg={12} xl={14} className="h-full mt-1">
          <Space direction="vertical" className="w-full h-full" size="middle">
            <DashboardHeader />
            <StatsSection token={token} />
            <Card
              title="Your Classes"
              className="w-full  sm:[&_.ant-card-body]:!p-0"
            >
              <Table
                columns={[
                  {
                    title: "Class",
                    dataIndex: "subtopic_name",
                    key: "subtopic_name",
                    ellipsis: true,
                  },
                  {
                    title: "Progress",
                    dataIndex: "progress",
                    key: "progress",
                    width: "40%",
                    render: (progress) => (
                      <Progress percent={progress} size="small" />
                    ),
                  },
                  {
                    title: "Action",
                    key: "action",
                    width: 100,
                    render: () => <Button type="link">Enter Class</Button>,
                  },
                ]}
                dataSource={[]}
                loading={enrolledTopicsLoading}
                pagination={false}
                size="small"
                // scroll={{ x: 500 }}
              />
            </Card>
          </Space>
        </Col>

        {/* Right Sidebar */}
        <Col xs={24} md={8} lg={6} xl={5} className="h-full">
          <div className="sticky top-4 h-full">
            <Space direction="vertical" className="w-full h-full" size="middle">
              <DeadlinesCard />
              <ActivityCard />
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const SelectedSubjects = ({
  enrolledSubjects,
  isFetchingEnrolledSubjects,
  isEnrolledSubjectsError,
}) => {
  return (
    <Card title="Selected subjects" size="small" className="overflow-hidden">
      <div className="flex items-center justify-center flex-col gap-2">
        {isFetchingEnrolledSubjects ? (
          <SlickSpinner color="black" size={12} />
        ) : isEnrolledSubjectsError ? (
          <div className="text-xs text-red-500 text-center">
            Failed to load subjects.
          </div>
        ) : enrolledSubjects.length === 0 ? (
          <div className="text-xs text-gray-500 w-full text-center">
            You are not enrolled in any subjects.
          </div>
        ) : (
          enrolledSubjects.map((subject) => (
            <div
              key={subject.id}
              className="flex gap-2 items-center justify-start w-full"
            >
              <LuBookOpen />
              <div className="w-32 line-clamp-1">{subject?.name}</div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const QuickLinks = () => (
  <Card title="Quick Links" size="small" className="overflow-hidden">
    <Space direction="vertical" className="w-full items-start">
      <Button type="link" icon={<LuUser />} block className="text-left">
        <Link href="/student/profile">Profile</Link>
      </Button>
      <Button
        type="link"
        icon={<ClockCircleOutlined />}
        block
        className="text-left"
      >
        <Link href="/student/reminders">Create Reminders</Link>
      </Button>
      <Button
        disabled
        type="link"
        icon={<TrophyOutlined />}
        block
        className="text-left"
      >
        Grades & Progress
      </Button>
    </Space>
  </Card>
);

const DeadlinesCard = () => {
  const isLoading = false;
  const isError = false;
  const upcomingDeadlines = [
    {
      title: "Mathematics Assignment Assignment Physics",
      due: "2024-02-15",
      status: "pending",
    },
    {
      title: "Physics Lab Report",
      due: "2024-02-18",
      status: "completed",
    },
  ];

  return (
    <Card
      title="Upcoming Reminders"
      // extra={<Button type="link">View All</Button>}
      className="min-h-[150px]"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        {isLoading ? (
          <SlickSpinner color="black" size={12} />
        ) : isError ? (
          <div className="text-xs text-red-500 text-center">
            Failed to load reminders.
          </div>
        ) : upcomingDeadlines.length !== 0 ? (
          <div className="text-xs text-center text-gray-500">
            You have no upcoming reminders.
          </div>
        ) : (
          upcomingDeadlines.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-b p-2 w-full h-full"
            >
              <span className="line-clamp-1 w-full text-xs">{item.title}</span>
              <span className="text-xs mb-1 mt-1">{item.due}</span>
              <Tag color={item.status === "completed" ? "success" : "warning"}>
                {item.status === "completed" ? "Completed" : "Pending"}
              </Tag>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

const DashboardHeader = () => {
  const { user } = useUser();

  return (
    <Card className="border-blue-600">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={16}>
          <Space direction="vertical">
            <Title
              level={4}
              style={{ margin: 0, fontFamily: '"Quicksand", sans-serif' }}
            >
              Welcome back,{" "}
              <span className="font-black capitalize">
                {user?.first_name} {user?.last_name}
              </span>
              !
            </Title>
            <Text type="secondary">
              Your learning dashboard - Track your progress and stay organized
            </Text>
          </Space>
        </Col>
        <Col xs={24} md={8} className="text-right">
          <Space>
            <Badge color="#001840" count={0}>
              <Button icon={<LuBellRing />} shape="circle" />
            </Badge>
            <Avatar
              src={`${img_base_url}${user?.profile_picture}`}
              icon={<LuUser color="black" />}
              size="large"
            />
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
    <Row gutter={[8, 8]}>
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
          <Card className="h-28">
            <Statistic
              title={stat.title}
              value={stat.value}
              valueStyle={{ color: token.colorPrimary }}
              formatter={(value) => (
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <span>
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
  const isLoading = false;
  const isError = false;
  const recentActivities = [
    { title: "Completed Biology Quiz", time: "2 hours ago", type: "quiz" },
    {
      title: "Submitted Math Assignment",
      time: "1 day ago",
      type: "assignment",
    },
  ];

  return (
    <Card title="Recent Activity">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {isLoading ? (
          <SlickSpinner color="black" size={12} />
        ) : isError ? (
          <div className="text-xs text-red-500 text-center">
            Failed to load recent activities.
          </div>
        ) : recentActivities.length !== 0 ? (
          <div className="text-center text-xs text-gray-500">
            No recent activities available.
          </div>
        ) : (
          recentActivities.map((item, index) => (
            <div key={index} className="flex gap-2 border-b p-2">
              <CheckCircleOutlined style={{ color: "#90EE90" }} />
              <div className="flex flex-col">
                <span className="line-clamp-1 w-full text-xs">
                  {item.title}
                </span>
                <span className="text-xs mb-1 mt-1 italic">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
