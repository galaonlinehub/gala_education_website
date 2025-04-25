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
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";
import { img_base_url } from "@/src/config/settings";
import {
  LuBookOpenText,
  LuCalendar,
  LuCircleCheckBig,
  LuClock4,
  LuMail,
  LuMapPin,
  LuPencil,
  LuPhone,
  LuSave,
  LuTrophy,
  LuX,
} from "react-icons/lu";

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
                <LuPencil
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
              suffix={<LuSave className="text-green-500 cursor-pointer" />}
            />
          </Form.Item>
        )}
      </div>
    );
  };

  return (
    <div className="mt-layout-margin">
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
                    src={`${img_base_url}${user?.profile_picture}` || undefined}
                    className="border-2 border-[#001840]"
                  >
                    <span className="text-xl md:text-3xl lg:text-5xl font-black text-[#001840]">
                      {!user?.profile_picture &&
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
                          {user?.role}
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
                                <LuSave
                                  className="text-green-500 cursor-pointer"
                                  onClick={() => form.submit()}
                                />
                                <LuX
                                  strokeWidth={3}
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
                        prefix={<LuBookOpenText />}
                      />
                    </Col>
                    <Col>
                      <Statistic
                        title="Achievements"
                        value={student.achievements}
                        prefix={<LuTrophy />}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-md shadow p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1">
                        Completed
                      </div>
                      <div className="text-lg font-semibold">
                        {student.completedClasses}
                      </div>
                    </div>
                    <LuCircleCheckBig className="text-[#52c41a] text-xl" />
                  </div>

                  {/* In Progress */}
                  <div className="bg-white rounded-md shadow p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1 line-clamp-1">
                        In Progress
                      </div>
                      <div className="text-lg font-semibold">
                        {student.inProgressClasses}
                      </div>
                    </div>
                    <LuClock4 className="text-[#1890ff] text-xl" />
                  </div>

                  {/* Completion Rate */}
                  <div className="bg-white rounded-md shadow p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 font-medium mb-1 line-clamp-1">
                        Completion Rate
                      </div>
                      <div className="text-lg font-semibold">
                        {Math.round(
                          (student.completedClasses / student.classesBought) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
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
                        <LuPencil
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setEditContact(true)}
                        />
                      </Tooltip>
                    ) : (
                      <div className="flex gap-2">
                        <Tooltip title="Save">
                          <LuSave
                            className="text-green-500 cursor-pointer"
                            onClick={() => form.submit()}
                          />
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <LuX
                            strokeWidth={3}
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
                        <div className="flex gap-1 items-center text-gray-400">
                          <LuMail /> Email
                        </div>
                        <LuPencil
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div className="px-3">
                        <Text strong>{user?.email}</Text>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center text-gray-400">
                          <LuPhone /> Phone
                        </div>
                        <LuPencil
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div className="px-3">
                        <Text strong>{user?.phone_number}</Text>
                      </div>
                    </div>

                    <div className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center text-gray-400">
                          <LuMapPin /> Location
                        </div>
                        <LuPencil
                          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                          onClick={() => setEditContact(true)}
                        />
                      </div>
                      <div className="px-3">
                        <Text strong>{user?.location || "--"}</Text>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-1 items-center text-gray-400">
                        <LuCalendar /> Joined
                      </div>
                      <div className="px-3">
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
                          <LuMail /> Email
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label={
                        <span>
                          <LuPhone /> Phone
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="location"
                      label={
                        <span>
                          <LuMapPin /> Location
                        </span>
                      }
                    >
                      <Input />
                    </Form.Item>

                    <div>
                      <Text type="secondary">
                        <LuCalendar /> Joined
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
                        <LuPencil
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setEditSkills(true)}
                        />
                      </Tooltip>
                    ) : (
                      <div className="flex gap-2">
                        <Tooltip title="Save">
                          <LuSave
                            className="text-green-500 cursor-pointer"
                            onClick={() => form.submit()}
                          />
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <LuX
                            strokeWidth={3}
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
                        icon={<LuPencil />}
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
