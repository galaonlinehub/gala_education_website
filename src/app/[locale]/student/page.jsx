"use client";
import {
  ClockCircleOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  theme,
  Card,
  Typography,
  Row,
  Col,
  Table,
  Button,
  Space,
  Statistic,
  Avatar,
  Badge,
  Tooltip,
  Progress,
} from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuBellRing, LuBookOpenCheck, LuUser } from "react-icons/lu";

import SlickSpinner from "@/components/ui/loading/template/SlickSpinner";
import Updates from "@/components/ui/notification/Updates";
import { img_base_url } from "@/config/settings";
import { useEnrolledTopics } from "@/hooks/data/useEnrolledTopics";
import { useUser } from "@/hooks/data/useUser";

const { Title, Text } = Typography;

export default function Component() {
  const { token } = theme.useToken();
  const {
    enrolledSubjects,
    isFetchingEnrolledSubjects,
    isEnrolledSubjectsError,
  } = useEnrolledTopics();

  const queryClient = useQueryClient();
  const enrolledTopics = queryClient.getQueryData(["enrolledTopics"]);

  const stdash = useTranslations("student_dashboard");
  const tdash = useTranslations("teacher_dashboard");

  const {user} = useUser();

  console.log("user_data", user)

  return (
    <div className="h-full">
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
                  <span className="text-[#001840] font-bold">
                    {stdash("your_classes")}
                  </span>
                }
                className="w-full shadow-sm shadow-black/25 border-0"
              >
                <div className="overflow-x-auto">
                  <Table
                    columns={[
                      {
                        title: (
                          <span className="text-[#001840] font-bold">
                            {stdash("class")}
                          </span>
                        ),
                        dataIndex: "cohort_name",
                        key: "cohort_name",
                        width: "60%",
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
                            <span className="text-xs sm:text-sm truncate block font-medium capitalize">
                              {record?.topic_name}
                            </span>
                          </Tooltip>
                        ),
                      },
                      {
                        title: (
                          <span className="text-[#001840] font-bold">
                            {stdash("progress")}
                          </span>
                        ),
                        dataIndex: "progress",
                        key: "progress",
                        width: "20%",
                        render: (_, record) => {
                          const percent = record?.percent_of_completion ?? 0;
                          return (
                            <Progress
                              type="circle"
                              percent={percent}
                              size={35}
                            />
                          );
                        },
                      },
                      {
                        title: (
                          <span className="text-[#001840] font-bold">
                            {tdash("action")}
                          </span>
                        ),
                        key: "action",
                        width: "20%",
                        render: () => (
                          <button
                            disabled={true}
                            className="py-1 px-3 text-[10px] text-white rounded-md bg-[#001840] disabled:bg-[#001840]/40 disabled:pointer-events-none disabled:cursor-not-allowed hover:bg-[#001840]/80 transition-colors duration-200"
                          >
                            {stdash("enter")}
                          </button>
                        ),
                      },
                    ]}
                    dataSource={enrolledTopics}
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
  const stdash = useTranslations("student_dashboard");

  return (
    <Card
      title={<span className="font-bold">{stdash("selected_subjects")}</span>}
      size="small"
      className="w-full shadow-sm shadow-black/25 border-0"
    >
      <div className="min-h-[100px]">
        {isFetchingEnrolledSubjects ? (
          <div className="flex items-center justify-center h-full w-full">
            <SlickSpinner color="#001840" size={20} />
          </div>
        ) : isEnrolledSubjectsError ? (
          <div className="flex items-center justify-center w-full h-full text-xs text-red-500 text-center">
            {stdash("failed_to_load_subjects")}
          </div>
        ) : enrolledSubjects.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-xs text-center opacity-70 text-[#001840]">
            {stdash("not_enrolled_in_subjects")}
          </div>
        ) : (
          enrolledSubjects.map((subject, index) => (
            <div
              key={index}
              className={clsx(
                "flex flex-col justify-start w-full",
                index === 0 ? "-mt-3" : "mt-2"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 bg-[#001840] rounded-full" />
                <div className="flex-1 text-xs line-cramp-2 min-w-0 text-[#001840]">
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
  const stdash = useTranslations("student_dashboard");

  return (
    <Card
      title={
        <span className="text-[#001840] font-bold">
          {stdash("quick_links")}
        </span>
      }
      size="small"
      className="w-full shadow-sm shadow-black/25 border-0"
    >
      <Space direction="vertical" className="w-full" size="small">
        <Link href="/student/profile" className="w-fit">
          <button
            type="button"
            className="w-full border-[1px] border-[#001840] text-left h-auto py-1.5 px-2 flex gap-2 items-center rounded-lg truncate text-xs sm:text-sm text-[#001840] hover:text-[#001840]/80 transition-colors duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(0,24,64,0.1) 0%, rgba(59,130,246,0.1) 100%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(0,24,64,0.05) 0%, rgba(59,130,246,0.05) 100%)";
            }}
          >
            <LuUser color="#001840" />
            <>{stdash("profile")}</>
          </button>
        </Link>

        <Button
          type="text"
          disabled
          icon={
            <ClockCircleOutlined style={{ color: "#001840", opacity: 0.5 }} />
          }
          block
          className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,24,64,0.03) 0%, rgba(59,130,246,0.03) 100%)",
            border: "1px solid rgba(0,24,64,0.05)",
            color: "#001840",
            opacity: 0.5,
          }}
        >
          <Link
            href="/student/reminders"
            className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm"
            style={{ color: "#001840" }}
          >
            <span className="hidden sm:inline">
              {stdash("create_reminders")}
            </span>
            <span className="sm:hidden">{stdash("reminders")}</span>
          </Link>
        </Button>

        <Button
          disabled
          type="text"
          icon={<TrophyOutlined style={{ color: "#001840", opacity: 0.5 }} />}
          block
          className="text-left h-auto py-2 px-2 flex items-center justify-start min-w-0 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,24,64,0.03) 0%, rgba(59,130,246,0.03) 100%)",
            border: "1px solid rgba(0,24,64,0.05)",
            color: "#001840",
            opacity: 0.5,
          }}
        >
          <span className="flex-1 text-left truncate min-w-0 text-xs sm:text-sm">
            <span className="hidden sm:inline">
              {stdash("grades_and_progress")}
            </span>
            <span className="sm:hidden">{stdash("grades")}</span>
          </span>
        </Button>
      </Space>
    </Card>
  );
};

const DeadlinesCard = () => {
  const stdash = useTranslations("student_dashboard");

  return (
    <Card
      title={
        <div className="w-full">
          <span className="text-[#001840] font-bold block">
            {stdash("upcoming_reminders")}
          </span>
        </div>
      }
      className="w-full shadow-sm shadow-black/25 border-0"
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg">
          <ClockCircleOutlined
            style={{
              fontSize: "24px",
              color: "#001840",
              opacity: 0.6,
              marginBottom: "8px",
            }}
          />
          <div className="text-sm text-center opacity-70 text-[001840]">
            {stdash("no_reminders_set")}
          </div>
        </div>
      </div>
    </Card>
  );
};

const DashboardHeader = () => {
  const { user } = useUser();
  const router = useRouter();

  const stdash = useTranslations("student_dashboard");
  const notift = useTranslations("notifications");
  const navt = useTranslations("navbar");

  return (
    <Card className="w-full shadow-sm shadow-black/25 border-[2px] border-[#001840] rounded-lg bg-gradient-to-br from-[rgba(255,255,255,0.95)] to-[rgba(59,130,246,0.05)]">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={16} lg={16}>
          <Space direction="vertical" size="small">
            <Title
              level={4}
              style={{
                margin: 0,
                fontFamily: '"Quicksand", sans-serif',
                background: "linear-gradient(135deg, #001840 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="text-sm sm:text-base md:text-lg"
            >
              {stdash("welcome_back")},{" "}
              <span className="font-black capitalize">
                {user?.first_name} {user?.last_name}
              </span>
              !
            </Title>
            <Text
              type="secondary"
              className="text-xs sm:text-sm text-[#001840] opacity-70"
            >
              {stdash("learning_dashboard_description")}
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className="text-left md:text-right">
          <Space size="middle">
            <Badge color="#001840" count={0}>
              <Updates>
                <Tooltip
                  color="#001840"
                  placement="top"
                  title={notift("notifications")}
                >
                  <Button
                    className="cursor-pointer shadow-md"
                    onClick={() => { }}
                    icon={<LuBellRing style={{ color: "#001840" }} />}
                    shape="circle"
                    size="small"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.1) 100%)",
                      border: "1px solid rgba(0,24,64,0.2)",
                    }}
                  />
                </Tooltip>
              </Updates>
            </Badge>
            <Tooltip color="#001840" title={navt("view_profile")}>
              <Avatar
                onClick={() => router.push("/student/profile")}
                className="cursor-pointer shadow-md"
                src={
                  user?.profile_picture
                    ? `${img_base_url}${user?.profile_picture}`
                    : undefined
                }
                icon={<LuUser style={{ color: "#001840" }} />}
                size="default"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.1) 100%)",
                  border: "2px solid #001840",
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
  const stats = {
    attendanceRate: 0,
    completedAssignments: 0,
  };

  const stdash = useTranslations("student_dashboard");

  return (
    <Row gutter={[12, 12]}>
      {[
        {
          title: stdash("attendance_rate"),
          value: stats.attendanceRate,
          suffix: "%",
          icon: <CheckCircleOutlined />,
        },
        {
          title: stdash("completed_assignments"),
          value: stats.completedAssignments,
          icon: <LuBookOpenCheck />,
        },
      ].map((stat, index) => (
        <Col xs={24} sm={12} key={index}>
          <Card className="h-20 sm:h-24 md:h-28 shadow-sm shadow-black/25 border-0">
            <Statistic
              title={
                <span
                  className="text-xs sm:text-sm truncate block"
                  style={{ color: "#001840", fontWeight: "bold" }}
                >
                  {stat.title}
                </span>
              }
              value={stat.value}
              valueStyle={{
                background: "linear-gradient(135deg, #001840 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "16px",
                lineHeight: "1.2",
                fontWeight: "bold",
              }}
              formatter={(value) => (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span
                    className="text-sm sm:text-base"
                    style={{ color: "#001840" }}
                  >
                    {stat.icon}
                  </span>
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
  const stdash = useTranslations("student_dashboard");

  return (
    <Card
      title={
        <span className="text-[#001840] font-bold">
          {stdash("recent_activities")}
        </span>
      }
      className="w-full shadow-sm shadow-black/25 border-0"
    >
      <div className="min-h-[120px] flex flex-col items-center justify-center">
        <div className="text-center p-4 rounded-lg">
          <CheckCircleOutlined
            style={{
              fontSize: "24px",
              color: "#001840",
              opacity: 0.6,
              marginBottom: "8px",
            }}
          />
          <div className="text-sm text-center text-[#001840] opacity-70">
            {stdash("no_recent_activity")}
          </div>
        </div>
      </div>
    </Card>
  );
};
