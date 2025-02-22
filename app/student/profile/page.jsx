
"use client";
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Statistic,
  Tag,
  Timeline,
  Divider,
  Input,
  Form,
  Button,
  message,
  Tooltip,
} from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";

const { Title, Text } = Typography;
const { TextArea } = Input;

const StudentProfile = () => {
  const { user } = useUser();
  const { width, height } = useDevice();
  const [form] = Form.useForm();

  const [editName, setEditName] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editSkills, setEditSkills] = useState(false);

  const [student, setStudent] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    classesBought: 12,
    joinedDate: "January 2024",
    location: "New York, USA",
    achievements: 5,
    completedClasses: 8,
    inProgressClasses: 4,
    skills: ["JavaScript", "React", "Python", "Data Science"],
    recentActivity: [
      { date: "2024-01-15", action: "Completed Advanced React Course" },
      { date: "2024-01-10", action: "Earned 'Top Performer' Badge" },
      { date: "2024-01-05", action: "Started Machine Learning Basics" },
      { date: "2024-01-01", action: "Joined Platform" },
    ],
  });

  const handleNameSave = (values) => {
    setStudent({
      ...student,
      name: values.name,
    });
    setEditName(false);
    message.success("Name updated successfully");
  };

  const handleContactSave = (values) => {
    setStudent({
      ...student,
      email: values.email,
      phone: values.phone,
      location: values.location,
    });
    setEditContact(false);
    message.success("Contact information updated successfully");
  };

  const handleSkillsSave = (values) => {
    const skillsArray = values.skills.split(",").map((skill) => skill.trim());
    setStudent({
      ...student,
      skills: skillsArray,
    });
    setEditSkills(false);
    message.success("Skills updated successfully");
  };

  const EditableField = ({
    label,
    value,
    icon,
    fieldName,
    editing,
    toggleEdit,
  }) => {
    return (
      <div className="relative group">
        {!editing ? (
          <div className="group">
            <div className="flex items-center justify-between">
              <Text type="secondary">
                {icon} {label}
              </Text>
              <Tooltip title="Edit">
                <EditOutlined
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                  onClick={toggleEdit}
                />
              </Tooltip>
            </div>
            <div>
              <Text strong>{value}</Text>
            </div>
          </div>
        ) : (
          <Form.Item name={fieldName} initialValue={value} className="mb-2">
            <Input
              suffix={
                <SaveOutlined className="text-green-500 cursor-pointer" />
              }
            />
          </Form.Item>
        )}
      </div>
    );
  };

  return (
    <div className="mt-16">
      <Row gutter={[24, 24]} justify="center">
        <div className="w-full px-4 lg:px-12">
          <Card className="profile-header mb-[24px]">
            <Row
              align="top"
              justify="space-between"
              className="flex flex-col xs:flex-row"
            >
              <Col xs={24} sm={12} className="flex items-start">
                <div className="flex items-center gap-[10px]">
                  <Avatar
                    size={width > 768 ? 96 : 64}
                    src={user?.profilePicture || undefined}
                    className="border-2 border-[#001840]"
                  >
                    <span className="text-xl md:text-3xl lg:text-5xl font-black text-[#001840]">
                      {!user?.profilePicture &&
                        user?.first_name?.charAt(0)?.toUpperCase()}
                    </span>
                  </Avatar>

                  <div className="group relative">
                    {!editName ? (
                      <div
                        className="cursor-pointer"
                        onDoubleClick={() => setEditName(true)}
                      >
                        <Title
                          level={width > 768 ? 2 : 4}
                          className="capitalize m-0 !font-black !text-[#001840] group-hover:after:content-['_✎'] group-hover:after:text-blue-500 group-hover:after:opacity-70 group-hover:after:text-sm"
                        >
                          {user?.first_name || student.name.split(" ")[0]}{" "}
                          {user?.last_name || student.name.split(" ")[1]}
                        </Title>
                        <Tag
                          className="capitalize text-[10px] font-bold !m-0"
                          color="#001840"
                        >
                          {user?.role || "Student"}
                        </Tag>
                      </div>
                    ) : (
                      <Form
                        onFinish={handleNameSave}
                        initialValues={{
                          name: `${
                            user?.first_name || student.name.split(" ")[0]
                          } ${user?.last_name || student.name.split(" ")[1]}`,
                        }}
                      >
                        <Form.Item name="name" className="mb-1">
                          <Input
                            className="font-bold text-xl"
                            suffix={
                              <div className="flex gap-2">
                                <SaveOutlined
                                  className="text-green-500 cursor-pointer"
                                  onClick={() => form.submit()}
                                />
                                <CloseOutlined
                                  className="text-red-500 cursor-pointer"
                                  onClick={() => setEditName(false)}
                                />
                              </div>
                            }
                          />
                        </Form.Item>
                      </Form>
                    )}
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={12} className="mt-4 sm:mt-0">
                <div className="flex flex-row items-start">
                  <Row gutter={[24, 16]} className="w-full">
                    <Col>
                      <Statistic
                        title="Classes Bought"
                        value={student.classesBought}
                        prefix={<ReadOutlined />}
                      />
                    </Col>
                    <Col>
                      <Statistic
                        title="Achievements"
                        value={student.achievements}
                        prefix={<TrophyOutlined />}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <Card
                title={<Title level={4}>Learning Progress</Title>}
                className="mb-[24px]"
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic
                      title="Completed"
                      value={student.completedClasses}
                      prefix={
                        <CheckCircleOutlined className="text-[#52c41a]" />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title={<span className="line-clamp-1">In Progress</span>}
                      value={student.inProgressClasses}
                      prefix={
                        <ClockCircleOutlined className="text-[#1890ff]" />
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title={
                        <span className="line-clamp-1">Completion Rate</span>
                      }
                      value={Math.round(
                        (student.completedClasses / student.classesBought) * 100
                      )}
                      suffix="%"
                    />
                  </Col>
                </Row>
              </Card>

              <Card title={<Title level={4}>Recent Activity</Title>}>
                <Timeline>
                  {student.recentActivity.map((activity, index) => (
                    <Timeline.Item key={index} color="blue">
                      <Text strong>{activity.action}</Text>
                      <br />
                      <Text type="secondary">{activity.date}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Title level={4}>Contact Information</Title>
                    {!editContact ? (
                      <Tooltip title="Edit Contact Information">
                        <EditOutlined
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setEditContact(true)}
                        />
                      </Tooltip>
                    ) : (
                      <div className="flex gap-2">
                        <Tooltip title="Save">
                          <SaveOutlined
                            className="text-green-500 cursor-pointer"
                            onClick={() => form.submit()}
                          />
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <CloseOutlined
                            className="text-red-500 cursor-pointer"
                            onClick={() => setEditContact(false)}
                          />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                }
                className="mb-12"
              >
                {!editContact ? (
                  <div className="flex flex-col gap-[16px]">
                    <div className="group">
                      <div className="flex items-center justify-between">
                        <Text type="secondary">
                          <MailOutlined /> Email
                        </Text>
                        <EditOutlined
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div>
                        <Text strong>{user?.email || student.email}</Text>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-center justify-between">
                        <Text type="secondary">
                          <PhoneOutlined /> Phone
                        </Text>
                        <EditOutlined
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div>
                        <Text strong>{student.phone}</Text>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-center justify-between">
                        <Text type="secondary">
                          <EnvironmentOutlined /> Location
                        </Text>
                        <EditOutlined
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div>
                        <Text strong>{student.location}</Text>
                      </div>
                    </div>

                    <div>
                      <Text type="secondary">
                        <CalendarOutlined /> Joined
                      </Text>
                      <div>
                        <Text strong>{student.joinedDate}</Text>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleContactSave}
                    initialValues={{
                      email: user?.email,
                      phone: student.phone,
                      location: student.location,
                    }}
                  >
                    <Form.Item
                      name="email"
                      label={
                        <span>
                          <MailOutlined /> Email
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label={
                        <span>
                          <PhoneOutlined /> Phone
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="location"
                      label={
                        <span>
                          <EnvironmentOutlined /> Location
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <div>
                      <Text type="secondary">
                        <CalendarOutlined /> Joined
                      </Text>
                      <div>
                        <Text strong>{student.joinedDate}</Text>
                        <Text type="secondary" className="ml-2">
                          (Not editable)
                        </Text>
                      </div>
                    </div>

                    <Form.Item className="mt-4">
                      <Button
                        className="bg-[#001840] hover:!bg-[#001840]/80 cursor-pointer"
                        type="primary"
                        htmlType="submit"
                      >
                        Save Changes
                      </Button>
                      <Button
                        className="ml-2 hover:!text-red-500 hover:!border-red-500"
                        onClick={() => setEditContact(false)}
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Card>

              <Card
                title={
                  <div className="flex justify-between items-center">
                    <Title level={4}>Skills</Title>
                    {!editSkills ? (
                      <Tooltip title="Edit Skills">
                        <EditOutlined
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setEditSkills(true)}
                        />
                      </Tooltip>
                    ) : (
                      <div className="flex gap-2">
                        <Tooltip title="Save">
                          <SaveOutlined
                            className="text-green-500 cursor-pointer"
                            onClick={() => form.submit()}
                          />
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <CloseOutlined
                            className="text-red-500 cursor-pointer"
                            onClick={() => setEditSkills(false)}
                          />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                }
                bordered={true}
              >
                {!editSkills ? (
                  <div className="group">
                    {student.skills.map((skill, index) => (
                      <Tag key={index} color="blue" style={{ margin: "4px" }}>
                        {skill}
                      </Tag>
                    ))}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        type="dashed"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => setEditSkills(true)}
                      >
                        Edit Skills
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form
                    form={form}
                    onFinish={handleSkillsSave}
                    initialValues={{
                      skills: student.skills.join(", "),
                    }}
                  >
                    <Form.Item
                      name="skills"
                      help="Enter skills separated by commas"
                    >
                      <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Save Skills
                      </Button>
                      <Button
                        className="ml-2"
                        onClick={() => setEditSkills(false)}
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default StudentProfile;
