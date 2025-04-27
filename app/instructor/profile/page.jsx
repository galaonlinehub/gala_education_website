'use client';
import React, { useState } from 'react';
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
    Tooltip
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
    UserAddOutlined
} from '@ant-design/icons';
import { FaIdCard } from "react-icons/fa";
import { BsPerson, BsPersonBadge } from 'react-icons/bs';
import { MdSubject, MdClass } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { TbDisabled } from "react-icons/tb";
import { CiTrophy } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";

import { useUser } from '@/src/hooks/useUser';

import { useInstructorCohorts } from '@/src/hooks/useInstructorCohorts';
import { useInstructorSubjects } from '@/src/hooks/useInstructorSubjects';
import { useInstructorProfile } from '@/src/hooks/useInstructorProfile';
import { useSubject } from '@/src/hooks/useSubject';
import { useGrade } from '@/src/hooks/useGrade';
import { useSpecialNeeds } from '@/src/hooks/useSpecialNeeds';
import { LuUser } from 'react-icons/lu';
import { img_base_url } from "@/src/config/settings";


const { Content } = Layout;
const { Option } = Select;

const TeacherProfile = () => {

    const { user, updateInstructorProfile } = useUser();
    const { InstructorCohorts } = useInstructorCohorts();
    const { instructorSubjects } = useInstructorSubjects();
    const { subjects } = useSubject();
    const { grades } = useGrade();
    const { instructorProfile } = useInstructorProfile();

    const { special_needs } = useSpecialNeeds();

    const [imageFile, setImageFile] = useState(null);


    // State management
    const [isEditing, setIsEditing] = useState(false);
    const [editForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    const certifications = [
        "Ordinary level Education Certificate",
        "Advanced level Education Certificate"
    ];

    // Track window width for responsive design
    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                message.success({ content: "Image uploaded successfully!", key: "upload" });
                break;
            case "error":
                message.error({ content: "Upload failed. Please try again.", key: "upload" });
                break;
            case "removed":
                setImageFile(null);
                message.info({ content: "Image removed", key: "upload" });
                break;
            default:
                message.info({ content: "Image selected", key: "upload" });
        }
    };

    // Handler for saving edited profile
    const handleSave = async () => {
        try {
            const values = await editForm.validateFields();

            // Create FormData object for file upload
            const formData = new FormData();

            // Properly handle profile picture
            if (imageFile) {
                formData.append('profile_picture', imageFile);
            } else {
                // For sending null/empty value to the backend, use an empty string
                // Most backends will interpret this as a request to clear the field
                formData.append('profile_picture', '');
            }

            // Append all other form values
            Object.keys(values).forEach(key => {
                // Skip the profile_picture from form values since we handle it separately
                if (key !== 'profile_picture') {
                    // Handle arrays (like subjects, special_needs, grade_levels)
                    if (Array.isArray(values[key])) {
                        values[key].forEach(value => {
                            formData.append(`${key}[]`, value);
                        });
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            // Make the API call
            const userData = await updateInstructorProfile(formData);

            setIsEditing(false);
            message.success('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error('Failed to update profile: ' +
                (error.response?.data?.message || 'Unknown error'));
        }
    };

    // Handler for canceling edit
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
        ?.filter(subject => instructorSubjects?.some(sub => sub.name === subject.name))
        .map(subject => subject.id);

    const selectedGradeIds = grades
        ?.filter(grade => instructorProfile?.grade_levels.some(gl => gl.name === grade.name))
        .map(grade => grade.id);

    const selectedSpecialNeedsIds = special_needs
        ?.filter(special => instructorProfile?.special_needs.some(sn => sn.name === special.name))
        .map(special => special.id);





    return (
        <Layout className="min-h-screen bg-gray-50">
            <Content className={`p-6 ${isMobile ? 'px-2' : ''}`}>
                <span className='flex text-xs lg:text-sm justify-center w-full font-extralight mb-5 text-blue-600'>Your profile will be visible to Student users</span>

                {/* Main Profile Card */}
                <Card className="mb-6 shadow-md">
                    <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-start mb-4`}>
                        <div className={`flex ${isMobile ? 'flex-col items-center w-full' : 'items-center'}`}>
                            <Avatar
                                src={
                                    user?.profile_picture &&
                                    `${img_base_url + user?.profile_picture}`
                                }
                                size={isMobile ? 64 : 96}
                                className={isMobile ? 'mb-4 mx-auto' : 'mr-6'}
                                icon={<LuUser className="text-black" />}
                            />

                            <div className='text-center lg:text-start flex flex-col'>

                                <span type="secondary" className={isMobile ? 'text-base' : 'text-lg'}>{user?.first_name} {user?.last_name}</span>
                                <span className="m-0 text-xsn first-letter:capitalize font-extralight lg:text-sm">{user?.role}</span>

                            </div>
                        </div>

                        {!isEditing ? (
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={handleEdit}
                                className={isMobile ? 'w-full mt-6' : ''}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <Space className={isMobile ? 'w-full flex justify-center mt-6' : ''}>
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    onClick={handleSave}
                                    className={isMobile ? 'flex-1' : ''}
                                >
                                    Save
                                </Button>
                                <Button onClick={handleCancel} className={isMobile ? 'flex-1' : ''}>Cancel</Button>
                            </Space>
                        )}
                    </div>

                    <Divider className="my-4" />

                    {!isEditing ? (
                        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'}`}>
                            <div>
                                <span className='text-sm font-semibold'>Personal Information</span>
                                <List size={isMobile ? 'small' : 'large'}>

                                    <List.Item>
                                        <div className="flex items-center break-all">
                                            <BsPerson className="mr-2 flex-shrink-0" />
                                            <span>{user?.first_name}</span>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="flex items-center break-all">
                                            <BsPerson className="mr-2 flex-shrink-0" />
                                            <span>{user?.last_name}</span>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="flex items-center break-all">
                                            <MailOutlined className="mr-2 flex-shrink-0" />
                                            <span>{user?.email}</span>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className="flex items-center">
                                            <PhoneOutlined className="mr-2 flex-shrink-0" />
                                            <span>{user?.phone_number}</span>
                                        </div>
                                    </List.Item>
                                </List>
                            </div>



                            <div>
                                <span className='text-sm font-semibold'>Teacher Statistics</span>
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4 mt-4">
                                    <Statistic
                                        title="Students"
                                        value={user?.student_count}
                                        prefix={<GrGroup color='#1e90ff' size={20} />}
                                    />
                                    <Statistic
                                        title="Active classes"
                                        value={user?.active_cohorts}
                                        prefix={<MdClass color='#228b22' size={20} />}
                                    />
                                    <Statistic
                                        title="Rating"
                                        value={user?.rating || 0}
                                        precision={1}
                                        prefix={<FaStar color='orange' size={20} />}
                                        suffix="/5"
                                    />
                                    <Statistic
                                        title="Reviews"
                                        value={user?.reviews || 0}
                                        prefix={<BiSolidCommentDetail size={20} />}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Form
                            form={editForm}
                            layout="vertical"
                        >
                            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
                                <div>
                                    <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: <span className="text-xs">First name is required</span>, }]}>
                                        <Input placeholder="First Name" />
                                    </Form.Item>
                                    <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: <span className="text-xs">Last name is required</span>, }]}>
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                    <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: <span className="text-xs">Email is required</span>, }]}>
                                        <Input placeholder="Email Address" prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Form.Item initialValue={selectedSpecialNeedsIds} rules={[{ required: true, message: <span className="text-xs">Select atleast 1 Special group</span>, }]} name="special_needs" label="Special groups you can teach">
                                        <Select
                                            mode="multiple"
                                            placeholder="Select special groups"
                                            style={{ width: '100%' }}
                                            maxTagCount={1}
                                            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
                                        >
                                            {special_needs?.map((special_need) => (
                                                <Option key={special_need.id} value={special_need.id}>
                                                    {special_need.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>



                                </div>

                                <div>
                                    <Form.Item name="phone_number" label="Phone Number" rules={[
                                        {
                                            required: true,
                                            message: <span className="text-xs">Please enter your phone number</span>,
                                        },
                                        {
                                            validator: async (_, value) => {
                                                if (!value) return Promise.resolve();

                                                // Check if the number starts with 6 or 7
                                                if (!/^255/.test(value)) {
                                                    return Promise.reject(<span className="text-xs">Phone number must start with 255</span>);
                                                }

                                                // Check if the number has exactly 9 digits
                                                if (!/^\d{12}$/.test(value)) {
                                                    return Promise.reject(<span className="text-xs">Phone number must be exactly 12 digits</span>);
                                                }

                                                return Promise.resolve();
                                            },
                                        },
                                    ]}>
                                        <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
                                    </Form.Item>
                                    <Form.Item initialValue={selectedSubjectIds} name="subjects" label="Subjects you can teach" rules={[{ required: true, message: <span className="text-xs">Select atleast 1 subject</span>, }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Select subjects"
                                            style={{ width: '100%' }}
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

                                    <Form.Item initialValue={selectedGradeIds} name="grade_levels" label="Grade levels you can teach" rules={[{ required: true, message: <span className="text-xs">Select atleast 1 grade level</span>, }]}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Select grades"
                                            style={{ width: '100%' }}
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


                                    <div className="flex w-full items-start justify-start">
                                        <Upload showUploadList={false} beforeUpload={() => true} onChange={handleUpload} className="flex w-fit justify-center mb-4">
                                            <div className="flex justify-center items-center w-full">
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <Avatar size={60} icon={imageFile ? null : <UserOutlined />} src={imageFile ? URL.createObjectURL(imageFile) : null} style={{ cursor: "pointer" }} />
                                                    <CameraOutlined
                                                        style={{
                                                            cursor: "pointer",
                                                            position: "absolute",
                                                            bottom: 0,
                                                            right: 0,
                                                            fontSize: 16,
                                                            backgroundColor: "#fff",
                                                            borderRadius: "50%",
                                                            padding: 4,
                                                            border: "1px solid #f0f0f0",
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Upload>
                                    </div>

                                </div>
                            </div>


                        </Form>
                    )}
                </Card>

                {/* Bio Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6'>
                    <Card style={{ borderColor: '#1890ff' }} className="mb-6 shadow-md">
                        <div className='flex gap-2 items-center'>
                            <MdSubject color='blue' size={20} />
                            <span>Subjects you can teach</span>
                        </div>
                        <Divider />
                        <div className="mt-1 flex flex-wrap">
                            {instructorSubjects?.map(subject => (
                                <Tooltip title={subject.name} key={subject.id}>
                                    <Tag
                                        color="blue"
                                        key={subject.id}
                                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                                        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                    >
                                        {subject.name}
                                    </Tag>
                                </Tooltip>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ borderColor: "#ffa500" }} className="mb-6 shadow-md">
                        <div className='flex gap-2 items-center'>
                            <GrGroup color='orange' size={20} />
                            <span>Grades you can teach</span>
                        </div>
                        <Divider />
                        <div className="mt-3 flex flex-wrap">
                            {instructorProfile?.grade_levels.map(grade => (
                                <Tooltip title={grade.name} key={grade.id}>
                                    <Tag
                                        color="orange"
                                        key={grade.id}
                                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                                        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                    >
                                        {grade.name}
                                    </Tag>
                                </Tooltip>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ borderColor: "#32cd32" }} className="shadow-md mb-6">
                        <div className='flex gap-2 items-center'>
                            <MdClass color='green' size={20} />
                            <span>Classes</span>
                        </div>
                        <Divider />
                        <div className="mt-3 flex flex-wrap">
                            {InstructorCohorts?.map(cohort => (
                                <Tooltip title={cohort.class} key={cohort.key}>
                                    <Tag
                                        color="green"
                                        key={cohort.key}
                                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                                        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                    >
                                        {cohort.class}
                                    </Tag>
                                </Tooltip>
                            ))}
                        </div>
                    </Card>

                    <Card style={{ borderColor: "#ff6347" }} className="mb-6 shadow-md">
                        <div className='flex gap-2 items-center'>
                            <TbDisabled color='red' size={20} />
                            <span>Special groups you can teach</span>
                        </div>
                        <Divider />
                        <div className="mt-3 flex flex-wrap">
                            {instructorProfile?.special_needs.map(special => (
                                <Tooltip title={special.name} key={special.id}>
                                    <Tag
                                        color="red"
                                        key={special.id}
                                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                                        style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                    >
                                        {special.name}
                                    </Tag>
                                </Tooltip>
                            ))}
                        </div>
                    </Card>


                    <Card
                        style={{ borderColor: "#800080" }}
                        className="mb-6 shadow-md w-full overflow-hidden"
                    >
                        <div className='flex gap-2 items-center'>
                            <TrophyOutlined style={{ color: 'purple', fontSize: '20px' }} />
                            <span>Certifications</span>
                        </div>

                        <Divider  />

                        <div className="mt-3 flex flex-wrap">
                            {certifications.map((cert, index) => (
                                <Tooltip title={cert} key={index}>
                                    <Tag
                                        color="purple"
                                        className="mb-1 mr-1 text-xs lg:text-sm py-1 px-3"
                                        style={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {cert}
                                    </Tag>
                                </Tooltip>
                            ))}
                        </div>
                    </Card>
                </div>


            </Content>
        </Layout >
    );
};

export default TeacherProfile;