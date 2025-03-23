"use client";

import { useRouter } from "next/navigation";
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
import { useEnrolledTopics } from "@/src/store/student/class";
import { useUserTopics } from "@/src/store/user_topics";
import Link from "next/link";
import { useUser } from "@/src/hooks/useUser";
import { GiBookCover } from "react-icons/gi";
import { LuBookOpenCheck, LuUser } from "react-icons/lu";
import { img_base_url } from "@/src/config/settings";

const { Title, Text } = Typography;

export default function Component() {
  const router = useRouter();
  const { user } = useUser();
  const { enrolledTopics, loading } = useEnrolledTopics();
  const { userTopics, topicsLoading } = useUserTopics();
  const { token } = theme.useToken();
  console.log(user);

  // Simulated data for new components
  const upcomingDeadlines = [
    {
      title: "Mathematics Assignment Assignment Physics ",
      due: "2024-02-15",
      status: "pending",
    },
    { title: "Physics Lab Report", due: "2024-02-18", status: "completed" },
  ];

  const recentActivities = [
    { title: "Completed Biology Quiz", time: "2 hours ago", type: "quiz" },
    {
      title: "Submitted Math Assignment",
      time: "1 day ago",
      type: "assignment",
    },
  ];

  // Stats Data
  const stats = {
    attendanceRate: 95,
    completedAssignments: 0,
  };

  // Quick Links Component
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

  const SelectedSubjects = () => (
    <Card title="Selected subjects" size="small" className="overflow-hidden">
      <Space direction="vertical" className=" w-44 items-start">
        <div className="flex gap-2  items-center justify-center">
          <GiBookCover />
          <div className="w-32 line-clamp-1"> Mathematics </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <GiBookCover />
          <div className="w-32 line-clamp-1"> English </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <GiBookCover />
          <div className="w-32 line-clamp-1"> Physics </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <GiBookCover />
          <div className="w-32 line-clamp-1"> Biology </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <GiBookCover />
          <div className="w-32 line-clamp-1"> Art </div>
        </div>
      </Space>
    </Card>
  );

  // Dashboard Header
  const DashboardHeader = () => (
    <Card className="border-blue-600">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={16}>
          <Space direction="vertical">
            <Title level={4} style={{ margin: 0 }}>
              Welcome back,{" "}
              <span className="font-black">
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
            <Badge count={3}>
              <Button icon={<BellOutlined />} shape="circle" />
            </Badge>
            <Avatar
              src={
                `${img_base_url}${user?.profile_picture}` ||
                "/default-avatar.png"
              }
              size="large"
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );

  // Statistics Cards
  const StatsSection = () => (
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

  // Upcoming Reminders Component
  const DeadlinesCard = () => (
    <Card
      title="Upcoming Reminders"
      extra={<Button type="link">View All</Button>}
    >
      {upcomingDeadlines &&
        upcomingDeadlines.map((item, index) => {
          return (
            <div key={index} className="flex flex-col border-b p-2">
              <span className=" line-clamp-1 w-full text-xs">{item.title}</span>
              <span className="text-xs mb-1 mt-1">{item.due}</span>

              <Tag color={item.status === "completed" ? "success" : "warning"}>
                {item.status === "completed" ? "Completed" : "Pending"}
              </Tag>
            </div>
          );
        })}
    </Card>
  );

  // Recent Activity Component
  const ActivityCard = () => (
    <Card title="Recent Activity">
      {recentActivities &&
        recentActivities.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 border-b p-2">
              <CheckCircleOutlined style={{ color: "#90EE90" }} />
              <div className="flex flex-col">
                <span className=" line-clamp-1 w-full text-xs">
                  {item.title}
                </span>
                <span className="text-xs mb-1 mt-1 italic">{item.time}</span>
              </div>
            </div>
          );
        })}
    </Card>
  );

  return (
    <div className="h-fit overflow-hidden">
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
              <SelectedSubjects />
            </Space>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={24} md={16} lg={12} xl={14} className="h-full mt-1">
          <Space direction="vertical" className="w-full h-full" size="middle">
            <DashboardHeader />
            <StatsSection />
            <Card title="Your Classes" className="w-full">
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
                dataSource={userTopics}
                // loading={topicsLoading}
                pagination={false}
                size="small"
                scroll={{ x: 500 }}
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
