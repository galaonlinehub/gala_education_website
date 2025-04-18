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
  Statistic,
  Tag,
  Table,
} from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/src/services/api_service";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";
import {
  LuBook,
  LuBookOpenText,
  LuCalendar,
  LuClock3,
  LuUsers,
} from "react-icons/lu";

const { Title, Text } = Typography;
const { Content } = Layout;

export default function TeacherClasses() {
  const [form] = Form.useForm();
  const router = useRouter();
  const device = useDevice();

  const { user } = useUser();

  // States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  // Sample class data
  const classData = [
    {
      key: "1",
      subject: "Mathematics",
      startDate: "10.05.2026",
      endDate: "10.06.2026",
      students: 25,
      progress: 60,
    },
    {
      key: "2",
      subject: "English",
      startDate: "10.05.2026",
      endDate: "10.06.2026",
      students: 30,
      progress: 45,
    },
  ];

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => (
        <Space>
          <LuCalendar />
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
          <LuCalendar />
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
      render: () => (
        <Button
          type="link"
          onClick={() => router.push("/instructor/class-details")}
        >
          View Details
        </Button>
      ),
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       console.log("User Data",user);

  //       if (!user["completed_profile"]) {
  //         setIsModalVisible(true);
  //         setIsProfileCompleted(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //     }
  //   };

  //   fetchData();
  // }, []);

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

  // Responsive column settings
  const getResponsiveColumns = () => {
    if (device?.type === "mobile") {
      return columns.map((col) => ({
        ...col,
        render: (text, record) => {
          if (col.key === "action") {
            return (
              <Button
                type="link"
                block
                onClick={() => router.push("/instructor/class-details")}
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

  return (
    <>
      <Layout className=" bg-white">
        <Content className="p-3 md:p-6">
          <div
            className={`space-y-4 md:space-y-6 ${
              !isProfileCompleted ? "pointer-events-none opacity-30" : ""
            }`}
          >
            {/* Welcome Card */}
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
                        value={5}
                        prefix={<LuBookOpenText />}
                        className="min-w-[120px]"
                      />
                      <Statistic
                        title="Total Students"
                        value={126}
                        prefix={<LuUsers />}
                        className="min-w-[120px]"
                      />
                      <Statistic
                        title="Teaching Hours"
                        value={48}
                        prefix={<LuClock3 />}
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
                  <Space size={[8, 16]} wrap className="w-full">
                    {[
                      "Mathematics",
                      "English",
                      "Chemistry",
                      "Physics",
                      "Biology",
                    ].map((subject, index) => (
                      <Tag
                        key={index}
                        color="blue"
                        className="px-3 py-2 text-sm mb-2"
                      >
                        {subject}
                      </Tag>
                    ))}
                  </Space>
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
                    <Button
                      type="primary"
                      onClick={() => router.push("/instructor/all-classes")}
                      className="whitespace-nowrap"
                    >
                      See All Classes
                    </Button>
                  }
                  className="shadow-sm"
                >
                  <div className="overflow-x-auto">
                    <Table
                      columns={getResponsiveColumns()}
                      dataSource={classData}
                      {...getTableSettings()}
                    />
                  </div>
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
    </>
  );
}
