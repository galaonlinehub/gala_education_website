"use client";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  UserOutlined,
  ScheduleOutlined,
  SaveOutlined,
  EditOutlined,
  SearchOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoneyCollectOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Progress,
  Badge,
  Tag,
  Button,
  Typography,
  Row,
  Col,
  Statistic,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Select,
  DatePicker,
  Divider,
  Table,
  Tooltip,
  Badge as AntBadge,
  Spin,
  Empty,
} from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineFileUpload } from "react-icons/md";

import CohortDetailsSkeleton from "@/components/teacher/CohortDetailsSkeleton";
import { img_base_url } from "@/config/settings";
import { getSpecificCohortFn } from "@/hooks/data/useCohort";
import { useCohortEnrolledStudents } from "@/hooks/data/useCohortEnrolledStudents";
import { useUser } from "@/hooks/data/useUser";
import { decrypt } from "@/utils/fns/encryption";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ClassDetailsPage = () => {
  const { user } = useUser();

  const params = useParams();
  const [cohortId, setCohortId] = useState(null);
  // States for modals
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [studentsModalVisible, setStudentsModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [timeForm] = Form.useForm();
  const [priceForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cohortDetails, setCohortDetails] = useState();

  useEffect(() => {
    if (params.id) {
      console.log("the raw id:..", params.id);
      try {
        const decryptedId = decrypt(params.id);
        const cohortIdInt = parseInt(decryptedId, 10);

        if (isNaN(cohortIdInt)) {
          throw new Error("Invalid cohort ID format");
        }

        setCohortId(cohortIdInt);
        console.log("decrypted id:..", cohortIdInt);

        const fetchCohortData = async () => {
          try {
            const cohortData = await getSpecificCohortFn(cohortIdInt);
            setCohortDetails(cohortData);
          } catch (error) {
            console.error("Error fetching cohort data:", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchCohortData();
      } catch (error) {
        console.error("Error processing cohort ID:", error);
        setIsLoading(false);
      }
    }
  }, [params.id]);

  const { enrolledStudents } = useCohortEnrolledStudents(cohortId);

  const dat = useTranslations('day_abbrev');

  const getChosenDays = (timeslots) => {
    if (!timeslots) return [];

    const dayMap = {
      Monday: dat('mon'),
      Tuesday: dat('tue'),
      Wednesday: dat('wed'),
      Thursday: dat('thu'),
      Friday: dat('fri'),
      Saturday: dat('sat'),
      Sunday: dat('sun'),
    };

    return timeslots.map((slot) => dayMap[slot.day] || slot.day);
  };


  const handleUpdateTime = (lesson) => {
    setSelectedLesson(lesson);
    timeForm.setFieldsValue({
      day: lesson.day,
      time: dayjs(lesson.start_time, "HH:mm"),
    });
    setTimeModalVisible(true);
  };


  const handleViewStudents = () => {
    setStudentsModalVisible(true);
  };

  const handleTimeSubmit = (values) => {
    console.log("Updated time:", values);
    // Here you would typically update your data source
    setTimeModalVisible(false);
    timeForm.resetFields();
  };

  const handlePriceSubmit = (values) => {
    console.log("Updated price:", values);
    // Here you would typically update your data source
    setPriceModalVisible(false);
    priceForm.resetFields();
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const act = useTranslations('all_classes');
  const cct = useTranslations('class_creation');
  const dayt = useTranslations('day');

  // Students table columns
  const studentsColumns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: stringToColor(text) }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {record.email}
              </Text>
            </div>
          </div>
        </Space>
      ),
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => {
        return (
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.email.toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Attendance",
      dataIndex: "attended_lessons",
      key: "attended_lessons",
      width: "10%",
      render: (text) => <Tag>{text}</Tag>,
    },
  ];

  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#1677ff",
      "#52c41a",
      "#faad14",
      "#eb2f96",
      "#722ed1",
      "#fa541c",
      "#13c2c2",
    ];
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <div>
      {isLoading ? (
        <CohortDetailsSkeleton />
      ) : (
        <div
          className="class-details-page"
          style={{ background: "#f5f7fa", minHeight: "100vh" }}
        >
          {/* Hero Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #003399 0%, #001840 100%)",
              padding: "40px 0",
              color: "#fff",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 24px",
              }}
            >
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} lg={14}>
                  <Badge.Ribbon text={cohortDetails?.subject} color="blue">
                    <Card
                      bordered={false}
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(0px)",
                      }}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl text-white mb-6 font-bold">
                        {cohortDetails?.topic_title}{" "}
                      </span>

                      <Space
                        direction="vertical"
                        size="large"
                        style={{ width: "100%", marginTop: "16px" }}
                      >
                        <Space wrap>
                          <Tag icon={<TrophyOutlined />} color="blue">
                            {cohortDetails?.grade_level}
                          </Tag>
                          <Tag icon={<TeamOutlined />} color="cyan">
                            {cohortDetails?.total_enrolled_students} {act('students')}
                          </Tag>
                        </Space>

                        <Space align="center">
                          <Avatar
                            size={48}
                            src={
                              user?.profile_picture &&
                              `${img_base_url + user?.profile_picture}`
                            }
                            icon={<UserOutlined />}
                          />
                          <div className="flex flex-col text-white">
                            <span className="text-xs sm:text-sm lg:text-base font-bold">
                              {cohortDetails?.instructor_name}
                            </span>
                            <span className="text-xs sm:text-sm font-light">
                              {user?.email}
                            </span>
                          </div>
                        </Space>
                      </Space>
                    </Card>
                  </Badge.Ribbon>
                </Col>

                <Col xs={24} lg={10}>
                  <Card bordered={false}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Statistic
                          title={
                            <span className="text-xs sm:text-sm">
                              {cct('start_date')}
                            </span>
                          }
                          value={cohortDetails?.start_date}
                          prefix={<FcCalendar />}
                          valueStyle={{ fontSize: "inherit" }}
                          className="text-xs sm:text-sm lg:text-lg"
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title={
                            <span className="text-xs sm:text-sm">{cct('end_date')}</span>
                          }
                          value={cohortDetails?.end_date}
                          prefix={<FcCalendar />}
                          valueStyle={{ fontSize: "inherit" }}
                          className="text-xs sm:text-sm lg:text-lg"
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title={
                            <span className="text-xs sm:text-sm">
                              {act('class_size')}
                            </span>
                          }
                          value={`${cohortDetails?.instructor_total_students}`}
                          prefix={<TeamOutlined />}
                          valueStyle={{ fontSize: "inherit" }}
                          className="text-xs sm:text-sm lg:text-lg"
                        />
                        <Progress
                          percent={
                            (cohortDetails?.instructor_total_students / 10) *
                            100
                          }
                          status="active"
                          showInfo={false}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title={
                            <span className="text-xs sm:text-sm">
                              {act('lessons_per_week')}
                            </span>
                          }
                          value={cohortDetails?.time_slots.length}
                          prefix={<ScheduleOutlined />}
                          valueStyle={{ fontSize: "inherit" }}
                          className="text-xs sm:text-sm lg:text-lg"
                        />
                        <Text type="secondary">
                          {getChosenDays(cohortDetails?.time_slots).join(", ")}
                        </Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}
          >
            <Row gutter={[24, 24]}>
              {/* About Section */}
              <Col xs={24} lg={16}>
                <Card
                  title={
                    <span className="text-xs sm:text-sm lg:text-base">
                      <InfoCircleOutlined /> {cct('description')}
                    </span>
                  }
                  bordered={false}
                  className="card-shadow"
                >
                  <Paragraph className=" first-letter:capitalize text-xs sm:text-sm">
                    {cohortDetails?.description}
                  </Paragraph>
                </Card>

                {/* Schedule Section */}
                <Card
                  title={
                    <span className="text-xs sm:text-sm lg:text-base">
                      <ScheduleOutlined /> {cct('schedule')}
                    </span>
                  }
                  bordered={false}
                  className="card-shadow"
                  style={{ marginTop: "24px" }}
                >
                  <div className="flex gap-3">
                    {cohortDetails?.time_slots.map((lesson, index) => (
                      <Tag
                        key={index}
                        color="blue"
                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                        style={{
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                       {dayt(lesson.day.toLowerCase())} : {lesson.start_time}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>

              {/* Sidebar */}
              <Col xs={24} lg={8}>
                <Card
                  title={
                    <span className="text-xs sm:text-sm lg:text-base">
                      <InfoCircleOutlined /> {act('class_management')}
                    </span>
                  }
                  bordered={false}
                  className="card-shadow"
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size="large"
                  >
                    <Button
                      block
                      type="primary"
                      icon={<TeamOutlined />}
                      onClick={handleViewStudents}
                      className="text-xs sm:text-sm bg-[#001840] hover:!bg-blue-900"
                    >
                      {act('view_students')}
                    </Button>

                    <Button
                      block
                      icon={<MdOutlineFileUpload />}
                      className="text-xs sm:text-sm"
                    >
                      {act('upload_assignment')}
                    </Button>
                  </Space>
                </Card>

                {/* Quick Stats Card */}
                <Card
                  title={
                    <span className="text-xs sm:text-sm lg:text-base">
                      <InfoCircleOutlined /> {act('quick_stats')}
                    </span>
                  }
                  bordered={false}
                  className="card-shadow"
                  style={{ marginTop: "24px" }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Card
                        size="small"
                        bordered={false}
                        style={{ background: "#fff7e6", textAlign: "center" }}
                      >
                        <Statistic
                          title={act('completion')}
                          value="0%"
                          valueStyle={{ color: "#fa8c16", fontSize: "18px" }}
                          suffix={act('completed')}
                          className="text-xs sm:text-sm"
                        />
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>

          <Modal
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <ClockCircleOutlined style={{ color: "#1677ff" }} />
                <span>Update Class Time</span>
              </div>
            }
            open={timeModalVisible}
            onCancel={() => setTimeModalVisible(false)}
            footer={null}
            destroyOnClose
            width={500}
          >
            <div style={{ padding: "20px 0" }}>
              <Form
                form={timeForm}
                layout="vertical"
                onFinish={handleTimeSubmit}
              >
                <Form.Item
                  name="day"
                  label="Class Day"
                  rules={[
                    { required: true, message: "Please select class day!" },
                  ]}
                >
                  <Select>
                    {daysOfWeek.map((day) => (
                      <Option key={day} value={day}>
                        {day}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="time"
                  label="Class Time"
                  rules={[
                    { required: true, message: "Please select class time!" },
                  ]}
                >
                  <TimePicker
                    format="HH:mm"
                    minuteStep={5}
                    showNow={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Divider />

                <Form.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <Button onClick={() => setTimeModalVisible(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                    >
                      Save Changes
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Modal>

          <Modal
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <TeamOutlined style={{ color: "#1677ff" }} />
                <span>{act('enrolled_students')}</span>
              </div>
            }
            open={studentsModalVisible}
            onCancel={() => setStudentsModalVisible(false)}
            footer={null}
            width={500}
          >
            <div>
              {cohortDetails?.total_enrolled_students > 0 ? (
                <div className="mb-16 flex flex-col gap-4 items-center w-full ">
                  <Input
                    placeholder="Search by name or email"
                    prefix={<SearchOutlined />}
                    style={{ width: "100%" }}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />

                  <Card style={{ width: "100%" }}>
                    <Table
                      style={{ width: "100%" }}
                      dataSource={enrolledStudents}
                      columns={studentsColumns}
                      rowKey="id"
                      pagination={{ pageSize: 5 }}
                      size="middle"
                    />
                  </Card>
                </div>
              ) : (
                <Empty
                  description={act('enrolled_empty')}
                  image={Empty.PRESENTED_IMAGE_DEFAULT}
                  className="py-4 text-xs italic"
                />
              )}

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="text-xs text-gray-400">
                  {act('enrolled_footer')} {cohortDetails?.topic_title}
                </span>
                <Button
                  className="text-xs sm:text-sm"
                  onClick={() => setStudentsModalVisible(false)}
                >
                  {act('close')}
                </Button>
              </div>
            </div>
          </Modal>

          {/* <style jsx global>{`
        
      `}</style> */}
        </div>
      )}
    </div>
  );
};

export default ClassDetailsPage;
