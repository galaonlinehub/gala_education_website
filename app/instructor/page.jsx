"use client";

import { useState, useRef, useEffect } from "react";
import { Layout, Card, Typography, Space, Modal, Form, Input, Button, Row, Col, Select, Statistic, Spin, Tag, Table, Divider } from "antd";
import { UserOutlined, BookOutlined, ClockCircleOutlined, CalendarOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/src/services/api_service";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";


const { Title, Text } = Typography;
const { Content } = Layout;

export default function TeacherClasses() {
  const [form] = Form.useForm();
  const router = useRouter();
  const device = useDevice();

  const {user} = useUser();

  // States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [specials, setSpecials] = useState([]);
  const [gradeLevels, setLevels] = useState([]);
  const [subjectsData, setSubjects] = useState([]);

  const inputRefs = useRef([]);

  const languages = [
    { language: "English", id: 1, tag: "english" },
    { language: "Swahili", id: 2, tag: "swahili" },
  ];

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
          <CalendarOutlined />
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
          <CalendarOutlined />
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
          <TeamOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="link" onClick={() => router.push("/instructor/class-details")}>
          View Details
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userRes, levelsRes, subjectsRes, specialsRes] = await Promise.all([apiGet("/user"), apiGet("/grade_levels"), apiGet("/subjects"), apiGet("/special_needs")]);

        setLevels(levelsRes.data);
        setSubjects(subjectsRes.data);
        setSpecials(specialsRes.data);

        if (!userRes.data["completed_profile"]) {
          setIsModalVisible(true);
          setIsProfileCompleted(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      await apiPost("/complete-instructor-profile", values);
      setIsModalVisible(false);
      setShowOtpModal(true);
    } catch (error) {
      console.error(error);
    }
  };

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
    if (device === "mobile") {
      return columns.map((col) => ({
        ...col,
        render: (text, record) => {
          if (col.key === "action") {
            return (
              <Button type="link" block onClick={() => router.push("/instructor/class-details")}>
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
    scroll: { x: device === "mobile" },
    pagination: {
      simple: device === "mobile",
      pageSize: device === "mobile" ? 5 : 10,
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <Image alt="Gala logo" width={device === "mobile" ? 200 : 400} height={device === "mobile" ? 200 : 400} src="/gala-logo.png" className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-full" />
            <div className="absolute inset-0 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      ) : (
        <Layout className=" bg-white">
          <Content className="p-3 md:p-6">
            <div className={`space-y-4 md:space-y-6 ${!isProfileCompleted ? "pointer-events-none opacity-30" : ""}`}>
              {/* Welcome Card */}
              <Card className=" border-2">
                <Row align="middle" justify="space-between" gutter={[16, 16]}>
                  <Col xs={24} md={18}>
                    <Space direction="vertical" size="small" className="w-full">
                      <Title level={device === "mobile" ? 5 : 4}>Welcome back, <span className="capitalize">{user?.first_name} {" "} {user?.last_name}</span></Title>
                      <Text type="secondary" className="text-sm md:text-base">
                        Ready to inspire and educate? Your virtual classroom awaits!
                      </Text>
                      <Space size={device === "mobile" ? "small" : "large"} className="mt-4 w-full flex flex-wrap">
                        <Statistic title="Active Classes" value={5} prefix={<BookOutlined />} className="min-w-[120px]" />
                        <Statistic title="Total Students" value={126} prefix={<TeamOutlined />} className="min-w-[120px]" />
                        <Statistic title="Teaching Hours" value={48} prefix={<ClockCircleOutlined />} className="min-w-[120px]" />
                      </Space>
                    </Space>
                  </Col>
                  <Col xs={24} md={6} className="text-center md:text-right">
                    <Image src="/sitting_on_books.png" alt="Teacher illustration" width={120} height={120} className="h-auto w-auto mx-auto md:ml-auto" />
                  </Col>
                </Row>
              </Card>

              <Row gutter={[16, 16]}>
                {/* Subjects Card */}
                <Col xs={24} md={8}>
                  <Card
                    title={
                      <Space>
                        <BookOutlined />
                        <Text strong>Your Subjects</Text>
                      </Space>
                    }
                    className="h-full shadow-sm"
                  >
                    <Space size={[8, 16]} wrap className="w-full">
                      {["Mathematics", "English", "Chemistry", "Physics", "Biology"].map((subject, index) => (
                        <Tag key={index} color="blue" className="px-3 py-2 text-sm mb-2">
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
                        <TeamOutlined />
                        <Text strong>Your Classes</Text>
                      </Space>
                    }
                    extra={
                      <Button type="primary" onClick={() => router.push("/instructor/all-classes")} className="whitespace-nowrap">
                        See All Classes
                      </Button>
                    }
                    className="shadow-sm"
                  >
                    <div className="overflow-x-auto">
                      <Table columns={getResponsiveColumns()} dataSource={classData} {...getTableSettings()} />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Profile Completion Modal */}
            <Modal title={<div className="text-center text-sm">Just a few more questions before you start your journey</div>} open={isModalVisible} closable={false} maskClosable={false} width={device === "mobile" ? "95%" : 1000} footer={null} keyboard={false} className="persistent-modal">
              <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                <span className="block mb-4 text-xs text-justify">This process ensures that only qualified and experienced teachers gain access to our online community.</span>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: <span className="text-xs italic">Please enter your phone number</span>,
                        },
                        {
                          validator: async (_, value) => {
                            const phoneRegex = /^255[67]\d{8}$/;  // Removed the backslash before 255
                            if (!value) return Promise.resolve();
                            if (!phoneRegex.test(value)) {
                              return Promise.reject(
                                <span className="text-xs italic">
                                  Phone number must start with 255 and be followed by 9 digits starting with 6 or 7
                                </span>
                              );
                            }
                            return Promise.resolve();
                          },
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="language" label="Language(s)" rules={[{ required: true, message: <span className="text-xs italic">Language is required</span> }]}>
                      <Select mode="multiple" placeholder="Select languages you can teach">
                        {languages.map((language) => (
                          <Select.Option key={language.id} value={language.tag}>
                            {language.language}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item name="subjects" label="Subject(s)" rules={[{ required: true, message: <span className="text-xs italic">Subject(s) is required</span> }]}>
                      <Select mode="multiple" placeholder="Select subjects you can teach">
                        {subjectsData.map((subject) => (
                          <Select.Option key={subject.id} value={subject.id}>
                            {subject.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="grade_levels" label="Level(s)" rules={[{ required: true, message: <span className="text-xs italic">Grade level(s) is required</span> }]}>
                      <Select mode="multiple" placeholder="Select levels you can teach">
                        {gradeLevels.map((level) => (
                          <Select.Option key={level.id} value={level.id}>
                            {level.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item name="special_needs" label="Special" rules={[{ required: true, message: <span className="text-xs italic">Special group(s) is required</span> }]}>
                      <Select mode="multiple" placeholder="Select special groups you can teach">
                        {specials.map((special) => (
                          <Select.Option key={special.id} value={special.id}>
                            {special.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            {/* OTP Verification Modal */}
            <Modal title="Verify OTP" open={showOtpModal} footer={null} closable={false} maskClosable={false} centered width={device === "mobile" ? "95%" : 400}>
              <div className="text-center mb-4">Please enter the verification code sent to your phone number</div>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <Input key={index} ref={(el) => (inputRefs.current[index] = el)} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-10 md:w-12 h-10 md:h-12 text-center text-lg" maxLength={1} />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Button type="link" size="small" onClick={handleResendCode}>
                  Resend Code
                </Button>
                <Button type="primary" onClick={handleVerifyOtp} disabled={otp.some((digit) => !digit)}>
                  Verify
                </Button>
              </div>
            </Modal>
          </Content>
        </Layout>
      )}
    </>
  );
}
