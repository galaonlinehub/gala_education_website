"use client";

import { useState, useRef, useEffect } from "react";

import {
  Layout,
  Card,
  Typography,
  Space,
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Statistic,
  Avatar,
  Tag,
  Table,
  Upload,
  message,
  Skeleton,
  Flex,
  Empty,
} from "antd";
import {
  UserOutlined,
  CameraOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/src/services/api/api_service";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";

import { useInstructorSubjects } from "@/src/hooks/useInstructorSubjects";
import { useInstructorCohorts } from "@/src/hooks/useInstructorCohorts";

import { IoCalendarClearSharp } from "react-icons/io5";
import { useCohort } from "@/src/hooks/useCohort";
import { encrypt } from "@/src/utils/fns/encryption";
import ClassCreationWizard from "./create-class/CreateClass";
import TableSkeleton from "@/src/components/teacher/TableSkeleton";
import { LuBook, LuUser, LuUsers } from "react-icons/lu";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function TeacherClasses() {
  const [form] = Form.useForm();
  const router = useRouter();
  const device = useDevice();

  const { user } = useUser();
  const { instructorSubjects, isInstructorSubjectsPending } =
    useInstructorSubjects();
  const { InstructorCohorts, isInstructorCohortsPending } =
    useInstructorCohorts(2);

  const [openAddNewClass, setOpenAddNewClass] = useState(false);

  // States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { cohorts } = useCohort();

  const inputRefs = useRef([]);

  const handleAddNew = () => {
    setOpenAddNewClass(true);
  };

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "subject",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => (
        <Space>
          <IoCalendarClearSharp color="green" />

          {date}
        </Space>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (
        <Space>
          <IoCalendarClearSharp color="red" />

          {date}
        </Space>
      ),
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      render: (count) => (
        <Space>
          <LuUsers />
          {count}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Button type="link" onClick={() => gotoCohortDetails(record.cohortId)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    try {
      await apiPost("/verify-otp", { otp: otpValue });
      if (typeof window !== "undefined") {
        localStorage.removeItem("showOtpModal");
        localStorage.removeItem("hasSubmittedForm");
      }
      setShowOtpModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendCode = async () => {
    try {
      await apiPost("/resend-otp");
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      console.error(error);
    }
  };

  // // Responsive column settings
  const getResponsiveColumns = () => {
    if (device?.type === "mobile") {
      return columns.map((col) => ({
        ...col,
        render: (text, record) => {
          if (col.key === "action") {
            return (
              <Button
                type="link"
                onClick={() => gotoCohortDetails(record.cohortId)}
              >
                View Details
              </Button>
            );
          }
          return col.render ? col.render(text, record) : text;
        },
      }));
    }
    return columns;
  };

  // Mobile-friendly table settings
  const getTableSettings = () => ({
    scroll: { x: device?.type === "mobile" },
    pagination: {
      simple: device?.type === "mobile",
      pageSize: device?.type === "mobile" ? 5 : 10,
    },
  });

  const gotoCohortDetails = (cohortId) => {
    const encryptedId = encrypt(cohortId);
    router.push(`/instructor/all-classes/${encryptedId}`);
  };

  return (
    <>
      <Layout className=" bg-white">
        <Content className="p-3 md:p-6">
          <div
            className={`space-y-4 md:space-y-6 ${
              !isProfileCompleted ? "pointer-events-none opacity-30" : ""
            }`}
          >
            <Card>
              <Row align="middle" justify="space-between" gutter={[16, 16]}>
                <Col xs={24} md={18}>
                  <Space direction="vertical" size="small" className="w-full">
                    <Title level={device?.type === "mobile" ? 5 : 4}>
                      Welcome back,{" "}
                      <span className="capitalize">
                        {user?.first_name} {user?.last_name}
                      </span>
                    </Title>
                    <Text type="secondary" className="text-sm md:text-base">
                      Ready to inspire and educate? Your virtual classroom
                      awaits!
                    </Text>

                    <Space
                      size={device?.type === "mobile" ? "small" : "large"}
                      className="mt-4 w-full flex flex-wrap"
                    >
                      <Statistic
                        title="Active Classes"
                        value={user?.active_cohorts}
                        prefix={<BookOutlined />}
                        className="min-w-[120px]"
                      />
                      <Statistic
                        title="Total Students"
                        value={user?.student_count}
                        prefix={<TeamOutlined />}
                        className="min-w-[120px]"
                      />
                      <Statistic
                        title="Teaching Hours"
                        value={user?.teaching_hours}
                        prefix={<ClockCircleOutlined />}
                        className="min-w-[120px]"
                      />
                    </Space>
                  </Space>
                </Col>
                <Col xs={24} md={6} className="text-center md:text-right">
                  <Image
                    src="/sitting_on_books.png"
                    alt="Teacher illustration"
                    width={120}
                    height={120}
                    className="h-auto w-auto mx-auto md:ml-auto"
                  />
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              {/* Subjects Card */}
              <Col xs={24} md={8}>
                <Card
                  title={
                    <Space>
                      <LuBook />
                      <Text strong>Your Subjects</Text>
                    </Space>
                  }
                  className="h-full shadow-sm"
                >
                  {isInstructorSubjectsPending ? (
                    <div className="w-full">
                      <Flex wrap="wrap" gap="small">
                        {[
                          { width: 100, height: 40 },
                          { width: 120, height: 40 },
                          { width: 150, height: 40 },
                          { width: 150, height: 40 },
                        ].map((dimensions, index) => (
                          <Skeleton.Node
                            key={index}
                            active
                            style={{
                              width: dimensions.width,
                              height: dimensions.height,
                            }}
                          />
                        ))}
                      </Flex>
                    </div>
                  ) : instructorSubjects?.length > 0 ? (
                    <Space size={[8, 16]} wrap className="w-full">
                      {instructorSubjects?.map((subject) => (
                        <Tag
                          key={subject.id}
                          color="blue"
                          className="px-3 py-2 text-sm mb-2"
                        >
                          {subject.name}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Empty
                      description="Your chosen subjects will appear here"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      className="py-4"
                    />
                  )}
                </Card>
              </Col>

              {/* Classes Card */}
              <Col xs={24} md={16}>
                <Card
                  title={
                    <Space>
                      <LuUsers />
                      <Text strong>Your Classes</Text>
                    </Space>
                  }
                  extra={
                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        variant="filled"
                        onClick={handleAddNew}
                        className="whitespace-nowrap text-xs glow-button bg-[#457ee2]"
                      >
                        Add Class
                      </Button>
                      {InstructorCohorts?.length > 0 && (
                        <Button
                          type="primary"
                          onClick={() => router.push("/instructor/all-classes")}
                          className="whitespace-nowrap bg-[#001840] text-xs"
                        >
                          See All
                        </Button>
                      )}
                    </div>
                  }
                  className="shadow-sm"
                >
                  {isInstructorCohortsPending ? (
                    <TableSkeleton />
                  ) : (
                    <div className="overflow-x-auto">
                      <Table
                        columns={getResponsiveColumns()}
                        dataSource={InstructorCohorts}
                        {...getTableSettings()}
                      />
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </div>

          {/* Profile Completion Modal */}

          {/* OTP Verification Modal */}
          <Modal
            title="Verify OTP"
            open={showOtpModal}
            footer={null}
            closable={false}
            maskClosable={false}
            centered
            width={device?.type === "mobile" ? "95%" : 400}
          >
            <div className="text-center mb-4">
              Please enter the verification code sent to your phone number
            </div>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 md:w-12 h-10 md:h-12 text-center text-lg"
                  maxLength={1}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Button type="link" size="small" onClick={handleResendCode}>
                Resend Code
              </Button>
              <Button
                type="primary"
                onClick={handleVerifyOtp}
                disabled={otp.some((digit) => !digit)}
              >
                Verify
              </Button>
            </div>
          </Modal>
        </Content>
      </Layout>
      <ClassCreationWizard
        openAddNewClass={openAddNewClass}
        setOpenAddNewClass={setOpenAddNewClass}
      />
    </>
  );
}
