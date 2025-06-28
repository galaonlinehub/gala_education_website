"use client";

import { useState, useRef, useEffect } from "react";

import { Layout, Card, Typography, Space, Modal, Form, Input, Button, Row, Col, Select, Statistic, Avatar, Tag, Table, Upload, message, Skeleton, Flex, Empty, Badge, Divider } from "antd";
import { UserOutlined, CameraOutlined, BookOutlined, ClockCircleOutlined, CalendarOutlined, TeamOutlined, PlusOutlined, LoadingOutlined, RightOutlined, TrophyOutlined, FireOutlined } from "@ant-design/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/src/services/api_service";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";

import { useInstructorSubjects } from "@/src/hooks/useInstructorSubjects";
import { useInstructorCohorts } from "@/src/hooks/useInstructorCohorts";

import { IoCalendarClearSharp } from "react-icons/io5";
import { useCohort } from "@/src/hooks/data/useCohort";
import { encrypt } from "@/src/utils/fns/encryption";
import ClassCreationWizard from "./create-class/CreateClass";
import TableSkeleton from "@/src/components/teacher/TableSkeleton";
import { LuBook, LuUser, LuUsers, LuGraduationCap, LuClock, LuCalendar } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";

const { Title, Text, Paragraph } = Typography;
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
      width: device?.type === "mobile" ? 150 : 250,
      fixed: device?.type === "mobile" ? 'left' : false,
      render: (text) => (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <LuBook className="text-blue-600 text-xs md:text-sm" />
          </div>
          <Text strong className="text-gray-800 text-xs md:text-sm truncate">{text}</Text>
        </div>
      ),
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
      width: device?.type === "mobile" ? 80 : 140,
      render: (date) => (
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 md:w-6 md:h-6 bg-green-100 rounded-full flex items-center justify-center">
            <LuCalendar className="text-green-600 text-xs" />
          </div>
          <Text className="text-xs text-gray-600 text-center leading-tight">{date}</Text>
        </div>
      ),
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
      width: device?.type === "mobile" ? 80 : 140,
      render: (date) => (
        <div className="flex flex-col items-center space-y-1">
          <div className="w-5 h-5 md:w-6 md:h-6 bg-red-100 rounded-full flex items-center justify-center">
            <LuCalendar className="text-red-600 text-xs" />
          </div>
          <Text className="text-xs text-gray-600 text-center leading-tight">{date}</Text>
        </div>
      ),
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      width: device?.type === "mobile" ? 70 : 100,
      render: (count) => (
        <div className="flex flex-col items-center space-y-1">
          <Badge count={count} showZero color="#52c41a" size="small" />
          <LuUsers className="text-gray-500 text-xs" />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: device?.type === "mobile" ? 60 : 120,
      fixed: device?.type === "mobile" ? 'right' : false,
      render: (_, record) => (
        <Button
          type="text"
          size={device?.type === "mobile" ? "small" : "middle"}
          className="text-blue-600 hover:bg-blue-50 font-medium px-1"
          onClick={() => gotoCohortDetails(record.cohortId)}
        >
          {device?.type === "mobile" ? <RightOutlined /> : (
            <>View <RightOutlined className="text-xs ml-1" /></>
          )}
        </Button>
      ),
    }
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

  const getResponsiveColumns = () => {
    return columns;
  };

  const getTableSettings = () => ({
    scroll: {
      x: device?.type === "mobile" ? 440 : false,
      y: device?.type === "mobile" ? 300 : false
    },
    pagination: {
      simple: device?.type === "mobile",
      pageSize: device?.type === "mobile" ? 3 : 8,
      size: device?.type === "mobile" ? "small" : "default",
      showSizeChanger: device?.type !== "mobile",
    },
    size: device?.type === "mobile" ? "small" : "middle",
  });

  const gotoCohortDetails = (cohortId) => {
    const encryptedId = encrypt(cohortId);
    router.push(`/instructor/all-classes/${encryptedId}`);
  };

  return (
    <>
      <Layout className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <Content className="p-4 md:p-8">
          <div className={`max-w-7xl mx-auto space-y-6 ${!isProfileCompleted ? "pointer-events-none opacity-30" : ""}`}>

            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 md:px-8 md:py-12">
                <Row align="middle" gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <div className="text-white">
                      <Title level={device?.type === "mobile" ? 3 : 2} className="!text-white !mb-2">
                        Welcome back, <span className="capitalize">{user?.first_name}! 👋</span>
                      </Title>
                      <Paragraph className="!text-blue-100 text-lg !mb-6">
                        Ready to inspire minds and shape futures? Your digital classroom awaits your expertise.
                      </Paragraph>

                      <Row gutter={[24, 16]} className="mt-6">
                        <Col xs={12} sm={8}>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{user?.active_cohorts || 0}</div>
                            <div className="text-blue-200 text-sm">Active Classes</div>
                          </div>
                        </Col>
                        <Col xs={12} sm={8}>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{user?.student_count || 0}</div>
                            <div className="text-blue-200 text-sm">Total Students</div>
                          </div>
                        </Col>
                        <Col xs={12} sm={8}>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{user?.teaching_hours || 0}</div>
                            <div className="text-blue-200 text-sm">Teaching Hours</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xs={24} lg={8} className="text-center">
                    <div className="relative">
                      <Image
                        src="/sitting_on_books.png"
                        alt="Teacher illustration"
                        width={200}
                        height={200}
                        className="h-auto w-auto mx-auto drop-shadow-lg"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Card
                  className="h-full hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50"
                  styles={{ body: { padding: '20px', height: '100%' } }}
                >
                  <div className="flex flex-col h-full justify-between text-center">
                    <div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <PlusOutlined className="text-green-600 text-lg" />
                      </div>
                      <Title level={5} className="!mb-2">Create Class</Title>
                      <Text type="secondary" className="text-sm">
                        Start new learning sessions by creating a new class
                      </Text>
                    </div>
                    <div className="pt-4">
                      <Button
                        type="default"
                        className="w-full border-green-400 hover:bg-green-700"
                        onClick={handleAddNew}
                      >
                        Add New Class
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={12} lg={12}>
                <Card
                  className="h-full hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-50"
                  styles={{ body: { padding: '20px', height: '100%' } }}
                >
                  <div className="flex flex-col h-full justify-between text-center">
                    <div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MdOutlineRateReview className="text-orange-600 text-lg" />
                      </div>
                      <Title level={5} className="!mb-2">Students&apos; Reviews</Title>
                      <Text type="secondary" className="text-sm">
                        See what Students have to say about you / your class
                      </Text>
                    </div>
                    <div className="pt-4">
                      <Button
                        type="default"
                        className="w-full border-orange-300 text-orange-600 hover:border-orange-400"
                        onClick={() => router.push(`/${user?.role}/reviews`)}
                      >
                        View Reviews
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>



            <Row gutter={[24, 24]}>
              {/* Your Subjects */}
              <Col xs={24} xl={10}>
                <Card
                  title={
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <LuBook className="text-blue-600" />
                      </div>
                      <div className="text-sm md:text-lg !mb-0">Your Subjects</div>
                    </div>
                  }
                  className="h-full shadow-sm border-0"
                  bodyStyle={{ padding: device?.type === "mobile" ? '16px' : '24px' }}
                >
                  {isInstructorSubjectsPending ? (
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((_, index) => (
                        <Skeleton.Button
                          key={index}
                          active
                          size={device?.type === "mobile" ? "default" : "large"}
                          className="!w-full !h-10"
                        />
                      ))}
                    </div>
                  ) : instructorSubjects?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {instructorSubjects?.map((subject, index) => (
                        <div
                          key={subject.id}
                          className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold text-xs md:text-sm">
                                {subject.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-gray-800 font-semibold text-xs md:text-base truncate">
                                {subject.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty
                      description={
                        <div className="text-center py-8">
                          <Text type="secondary">No subjects assigned yet</Text>
                          <br />
                          <Text type="secondary" className="text-sm">Your teaching subjects will appear here</Text>
                        </div>
                      }
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              </Col>

              {/* Your Classes */}
              <Col xs={24} xl={14}>
                <Card
                  title={
                    <div className="flex items-center justify-between w-full flex-wrap gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <LuGraduationCap className="text-green-600" />
                        </div>
                        <div className="text-sm md:text-lg !mb-0">Your Classes</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {InstructorCohorts?.length > 0 && (
                          <Button
                            type="text"
                            size={device?.type === "mobile" ? "small" : "middle"}
                            onClick={() => router.push("/instructor/all-classes")}
                            className="text-blue-600 hover:bg-blue-50 font-medium"
                          >
                            View All <RightOutlined className="text-xs ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                  className="h-full shadow-sm border-0"
                  bodyStyle={{ padding: device?.type === "mobile" ? '16px' : '24px' }}
                >
                  {isInstructorCohortsPending ? (
                    <TableSkeleton />
                  ) : InstructorCohorts?.length > 0 ? (
                    <div className="w-full">
                      <div className="overflow-x-auto">
                        <Table
                          columns={getResponsiveColumns()}
                          dataSource={InstructorCohorts}
                          {...getTableSettings()}
                          className="custom-table"
                          rowClassName="hover:bg-gray-50 transition-colors duration-200"
                        />
                      </div>
                    </div>
                  ) : (
                    <Empty
                      description={
                        <div className="text-center py-12">
                          <LuGraduationCap className="text-4xl text-gray-300 mx-auto mb-4" />
                          <Title level={5} type="secondary">No classes yet</Title>
                          <Text type="secondary">Create your first class to get started</Text>
                          <br />
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddNew}
                            className="mt-4 bg-blue-600 border-blue-600"
                          >
                            Create Your First Class
                          </Button>
                        </div>
                      }
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </Card>
              </Col>
            </Row>
          </div>

          {/* OTP Verification Modal */}
          <Modal
            title={
              <div className="text-center">
                <Title level={4} className="!mb-2">Verify Your Phone</Title>
                <Text type="secondary">Enter the 6-digit code sent to your phone</Text>
              </div>
            }
            open={showOtpModal}
            footer={null}
            closable={false}
            maskClosable={false}
            centered
            width={device?.type === "mobile" ? "95%" : 440}
            className="rounded-2xl"
          >
            <div className="py-6">
              <div className="flex justify-center gap-3 mb-8">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 focus:border-blue-500"
                    maxLength={1}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button type="text" size="large" onClick={handleResendCode} className="text-blue-600">
                  Resend Code
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleVerifyOtp}
                  disabled={otp.some((digit) => !digit)}
                  className="px-8 bg-blue-600 border-blue-600"
                >
                  Verify & Continue
                </Button>
              </div>
            </div>
          </Modal>
        </Content>
      </Layout>

      <ClassCreationWizard openAddNewClass={openAddNewClass} setOpenAddNewClass={setOpenAddNewClass} />

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #475569;
          padding: 8px 12px;
          font-size: 12px;
        }
        
        .custom-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9;
          padding: 12px 8px;
        }
        
        .custom-table .ant-table-tbody > tr:hover > td {
          background: #f8fafc !important;
        }
        
        @media (max-width: 768px) {
          .custom-table .ant-table-thead > tr > th {
            padding: 6px 4px;
            font-size: 11px;
          }
          
          .custom-table .ant-table-tbody > tr > td {
            padding: 8px 4px;
          }
          
          .custom-table .ant-table-container {
            border-radius: 8px;
          }
          
          .custom-table .ant-table-content {
            border-radius: 8px;
          }
        }
        
        .ant-table-wrapper {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .ant-table-container {
          border-radius: 12px;
        }
      `}</style>
    </>
  );
}