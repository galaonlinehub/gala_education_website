"use client";
import React, { useState } from "react";
import {
  Layout,
  Typography,
  Avatar,
  Card,
  Button,
  List,
  Tag,
  Divider,
  Form,
  Input,
  Select,
  Modal,
  Upload,
  Statistic,
  Space,
  message,
  Tooltip,
  Progress,
  Badge,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EditOutlined,
  ScheduleOutlined,
  BookOutlined,
  TeamOutlined,
  TrophyOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SaveOutlined,
  ClockCircleOutlined,
  StarOutlined,
  MessageOutlined,
  PlusOutlined,
  AccountBookFilled,
  CameraOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { BsPerson, BsPersonBadge } from "react-icons/bs";
import { MdSubject, MdClass } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { TbDisabled } from "react-icons/tb";
import { LuUser } from 'react-icons/lu';
import { useUser } from '@/src/hooks/data/useUser';
import { useInstructorCohorts } from '@/src/hooks/data/useInstructorCohorts';
import { useInstructorSubjects } from '@/src/hooks/data/useInstructorSubjects';
import { useInstructorProfile } from '@/src/hooks/data/useInstructorProfile';
import { useSubject } from '@/src/hooks/data/useSubject';
import { useGrade } from '@/src/hooks/data/useGrade';
import { useSpecialNeeds } from '@/src/hooks/data/useSpecialNeeds';
import { img_base_url } from '@/src/config/settings';

const { Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const TeacherProfile = () => {
  // Keep all original props and hooks
  const { user, updateProfile } = useUser();
  const { InstructorCohorts } = useInstructorCohorts();
  const { instructorSubjects } = useInstructorSubjects();
  const { instructorProfile } = useInstructorProfile();
  const { subjects } = useSubject();
  const { grades } = useGrade();
  const { special_needs } = useSpecialNeeds();

  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Track window width for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if display is mobile
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 992;

  // Handler for editing profile
  const handleEdit = () => {
    editForm.setFieldsValue({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_number: user?.phone_number,
    });
    setIsEditing(true);
  };

  const handleUpload = (info) => {
    message.destroy();
    const file = info.file.originFileObj;

    switch (info.file.status) {
      case "uploading":
        message.loading({ content: "Uploading image...", key: "upload" });
        break;
      case "done":
        setImageFile(file);
        message.success({
          content: "Image uploaded successfully!",
          key: "upload",

        });
        break;
      case "error":
        message.error({
          content: "Upload failed. Please try again.",
          key: "upload",
        });
        break;
      case "removed":
        setImageFile(null);
        message.info({ content: "Image removed", key: "upload" });
        break;
      default:
        message.info({ content: "Image selected", key: "upload" });
    }
  };



  const handleSave = async () => {
    try {
      const values = await editForm.validateFields();

      const formData = new FormData();

      if (imageFile) {
        formData.append('profile_picture', imageFile);
      } else {
        formData.append('profile_picture', '');
      }

      Object.keys(values).forEach(key => {
        if (key !== 'profile_picture') {
          if (Array.isArray(values[key])) {
            values[key].forEach(value => {
              formData.append(`${key}[]`, value);
            });
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      updateProfile(formData);
      setIsEditing(false);
      message.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error('Failed to update profile: ' +
        (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };



  // Handler for showing modal based on type
  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  // Handler for closing modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const selectedSubjectIds = subjects
    ?.filter((subject) =>
      instructorSubjects?.some((sub) => sub.name === subject.name)
    )
    .map((subject) => subject.id);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className={`${isMobile ? 'p-4' : 'p-8'} max-w-7xl mx-auto`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
            <EyeOutlined className="text-blue-600" />
            <Text className="text-sm font-medium text-gray-700">
              Your profile is visible to students
            </Text>
          </div>
        </div>


        <Card className="mb-8 overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-800 to-[#001840]">
          <div className="relative">
            <div className="absolute inset-0  backdrop-blur-sm"></div>

            <div className={`relative ${isMobile ? 'text-center' : 'flex items-center justify-between'} text-white`}>
              <div className={`flex ${isMobile ? 'flex-col items-center' : 'items-center gap-4'}`}>
                <div className="relative">
                  <Avatar
                    src={user?.profile_picture && `${img_base_url + user?.profile_picture}`}
                    size={isMobile ? 100 : 120}
                    className="border-4 border-white/30 shadow-2xl"
                    icon={<LuUser className="text-white" />}
                  />

                </div>

                <div className={`${isMobile ? 'mt-4' : ''}`}>
                  <Title level={2} className="!text-white !mb-1">
                    {user?.first_name} {user?.last_name}
                  </Title>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Badge status="processing" />
                    <Text className="text-white/90 text-lg capitalize">
                      {user?.role}
                    </Text>
                  </div>
                </div>
              </div>

              {!isEditing ? (
                <Button
                  type="primary"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  className={`${isMobile ? 'w-full mt-6' : ''} bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm`}
                >
                  Edit Profile
                </Button>
              ) : (
                <Space className={isMobile ? 'w-full flex justify-center mt-6' : ''}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    className="bg-green-500 border-green-500 hover:bg-green-600"
                  >
                    Save Changes
                  </Button>
                  <Button
                    size="large"
                    onClick={handleCancel}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    Cancel
                  </Button>
                </Space>
              )}
            </div>
          </div>
        </Card>

        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r border border-blue-400 text-white">
              <Statistic
                title={<span className="text-black">Students</span>}
                value={user?.student_count}
                prefix={<TeamOutlined className="text-blue-500" />}
                valueStyle={{ color: 'black', fontSize: isMobile ? '24px' : '32px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border border-green-400 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r text-white">
              <Statistic
                title={<span className="text-black">Active Classes</span>}
                value={user?.active_cohorts}

                prefix={<MdClass className="text-green-500" />}
                valueStyle={{ color: 'black', fontSize: isMobile ? '24px' : '32px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border border-yellow-400 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r text-white">
              <Statistic
                title={<span className="text-black">Rating</span>}
                value={user?.rating || 0}
                precision={1}
                prefix={<StarOutlined className="text-yellow-500" />}
                suffix="/5"
                valueStyle={{ color: 'black', fontSize: isMobile ? '24px' : '32px' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border border-purple-400 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r text-white">
              <Statistic
                title={<span className="text-black">Reviews</span>}
                value={user?.reviews || 0}
                prefix={<MessageOutlined className="text-purple-500" />}
                valueStyle={{ color: 'black', fontSize: isMobile ? '24px' : '32px' }}
              />
            </Card>
          </Col>
        </Row>

        {!isEditing ? (
          <div>
            <Card className="mb-6 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserOutlined className="text-blue-600 text-lg" />
                </div>
                <Title level={4} className="!mb-0 text-gray-800">
                  Personal Information
                </Title>
              </div>

              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <BsPerson className="text-gray-600" />
                    <div>
                      <Text className="text-xs text-gray-500 block">First Name</Text>
                      <Text className="font-medium">{user?.first_name}</Text>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <BsPerson className="text-gray-600" />
                    <div>
                      <Text className="text-xs text-gray-500 block">Last Name</Text>
                      <Text className="font-medium">{user?.last_name}</Text>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MailOutlined className="text-gray-600" />
                    <div>
                      <Text className="text-xs text-gray-500 block">Email</Text>
                      <Text className="font-medium break-all">{user?.email}</Text>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <PhoneOutlined className="text-gray-600" />
                    <div>
                      <Text className="text-xs text-gray-500 block">Phone</Text>
                      <Text className="font-medium">{user?.phone_number}</Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card className="h-full border-0 shadow-lg border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MdSubject className="text-blue-600" />
                    </div>
                    <Title level={5} className="!mb-0">Subjects You Teach</Title>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructorSubjects?.map(subject => (
                      <Tag
                        key={subject.id}
                        color="blue"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {subject.name}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card className="h-full border-0 shadow-lg border-l-4 border-l-orange-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <GrGroup className="text-orange-600" />
                    </div>
                    <Title level={5} className="!mb-0">Grade Levels</Title>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructorProfile?.grade_levels?.map(grade => (
                      <Tag
                        key={grade.id}
                        color="orange"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {grade.name}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card className="h-full border-0 shadow-lg border-l-4 border-l-green-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MdClass className="text-green-600" />
                    </div>
                    <Title level={5} className="!mb-0">Active Classes</Title>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {InstructorCohorts?.map(cohort => (
                      <Tag
                        key={cohort.key}
                        color="green"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {cohort.class}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card className="h-full border-0 shadow-lg border-l-4 border-l-red-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <TbDisabled className="text-red-600" />
                    </div>
                    <Title level={5} className="!mb-0">Special Groups</Title>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {instructorProfile?.special_needs?.map(special => (
                      <Tag
                        key={special.id}
                        color="red"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {special.name}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>
            <Card className="mt-6 border-0 shadow-lg border-l-4 border-l-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrophyOutlined className="text-purple-600" />
                </div>
                <Title level={5} className="!mb-0">Certifications</Title>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <Tag
                    key={index}
                    color="purple"
                    className="px-3 py-1 rounded-full text-sm"
                  >
                    {cert}
                  </Tag>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <EditOutlined className="text-blue-600 text-lg" />
              </div>
              <Title level={4} className="!mb-0 text-gray-800">
                Edit Profile
              </Title>
            </div>

            <Form form={editForm} layout="vertical">
              <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[{ required: true, message: 'First name is required' }]}
                  >
                    <Input placeholder="First Name" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[{ required: true, message: 'Last name is required' }]}
                  >
                    <Input placeholder="Last Name" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    initialValue={selectedSubjectIds}
                    name="subjects"
                    label="Subjects you can teach"
                    rules={[{ required: true, message: 'Select at least 1 subject' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select subjects"
                      size="large"
                      maxTagCount={2}
                      maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
                    >
                      {subjects?.map((subject) => (
                        <Option key={subject.id} value={subject.id}>
                          {subject.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    initialValue={selectedGradeIds}
                    name="grade_levels"
                    label="Grade levels you can teach"
                    rules={[{ required: true, message: 'Select at least 1 grade level' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select grades"
                      size="large"
                      maxTagCount={2}
                      maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
                    >
                      {grades?.map((grade) => (
                        <Option key={grade.id} value={grade.id}>
                          {grade.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    initialValue={selectedSpecialNeedsIds}
                    name="special_needs"
                    label="Special groups you can teach"
                    rules={[{ required: true, message: 'Select at least 1 special group' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select special groups"
                      size="large"
                      maxTagCount={3}
                      maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
                    >
                      {special_needs?.map((special_need) => (
                        <Option key={special_need.id} value={special_need.id}>
                          {special_need.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Profile Picture">
                    <div className="flex items-center gap-4">
                      <Upload
                        showUploadList={false}
                        beforeUpload={() => true}
                        onChange={handleUpload}
                        className="flex"
                      >
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <Avatar
                            size={80}
                            icon={imageFile ? null : <UserOutlined />}
                            src={imageFile ? URL.createObjectURL(imageFile) : null}
                            style={{ cursor: "pointer" }}
                          />
                          <CameraOutlined
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              fontSize: 16,
                              backgroundColor: "#1890ff",
                              color: "white",
                              borderRadius: "50%",
                              padding: 4,
                              border: "2px solid white",
                            }}
                          />
                        </div>
                      </Upload>
                      <div>
                        <Text className="text-sm text-gray-600">
                          Click to upload new profile picture
                        </Text>
                      </div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
