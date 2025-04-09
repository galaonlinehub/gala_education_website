import React, { useState } from "react";
import { Layout, Card, Typography, Space, Modal, Form, Input, Button, Row, Col, Select, Statistic, Avatar, Tag, Table, Upload, message } from "antd";
import { UserOutlined, CameraOutlined, BookOutlined, ClockCircleOutlined, CalendarOutlined, TeamOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";
import { useSpecialNeeds } from "@/src/hooks/useSpecialNeeds";
import { useSubject } from "@/src/hooks/useSubject";
import { useGrade } from "@/src/hooks/useGrade";
import { apiPost } from "@/src/services/api_service";

const InstructorCompleteProfile = () => {
  const { user } = useUser();
  const { type } = useDevice();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const { special_needs } = useSpecialNeeds();
  const { subjects } = useSubject();
  const { grades } = useGrade();

  const languages = [
    { language: "English", id: 1, tag: "english" },
    { language: "Swahili", id: 2, tag: "swahili" },
  ];

  console.log("Subjects", subjects);

  const handleFormSubmit = async (values) => {
    try {
      if (!imageFile) {
        message.info("Please upload a profile image");
        return;
      }

      values.phone_number = values.phone_number.startsWith("255")
        ? values.phone_number
        : `255${values.phone_number}`;

      // Create a FormData object
      const formData = new FormData();

      // Append the file
      formData.append('profile_picture', imageFile);



      // Append all other form values
      Object.keys(values).forEach(key => {
        // Handle arrays (like your multi-select fields)
        if (Array.isArray(values[key])) {
          values[key].forEach(value => {
            formData.append(`${key}[]`, value);
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      await apiPost("/complete-instructor-profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    } catch (error) {
      console.error(error);
    }
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

  return (
    <Modal
      title={<div className="text-center text-xs">Just a few more details before you start your journey</div>}
      open={!user?.phone_number_verified && !user?.subscription_required}
      closable={false}
      maskClosable={false}

      footer={null}
      keyboard={false}
      className="persistent-modal"
    >
      <Form form={form} onFinish={handleFormSubmit} layout="vertical" size="small">
        <span className="block mb-2 font-extralight text-xs text-center ">This process ensures that only qualified and experienced teachers gain access to our online community.</span>

        <div className="flex w-full items-center justify-center">
          <Upload showUploadList={false} beforeUpload={() => true} onChange={handleUpload} className="flex w-fit justify-center mb-4">
            <div className="flex justify-center items-center w-full">
              <div style={{ position: "relative", display: "inline-block" }}>
                <Avatar size={80} icon={imageFile ? null : <UserOutlined />} src={imageFile ? URL.createObjectURL(imageFile) : null} style={{ cursor: "pointer" }} />
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

        <Row gutter={[12, 0]}>
          {" "}
          {/* Reduced gutter size */}
          <Col span={24}>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: <span className="text-xs ">Please enter your phone number</span>,
                },
                {
                  validator: async (_, value) => {
                    const phoneRegex = /^[67]\d{8}$/;
                    if (!value) return Promise.resolve();
                    if (!phoneRegex.test(value)) {
                      return Promise.reject(<span className="text-xs ">Phone number must be 9 digits starting with 6 or 7</span>);
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Phone number" addonBefore="255" size="middle" className="text-xs" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="language" rules={[{ required: true, message: <span className="text-xs ">Language is required</span> }]}>
              <Select mode="multiple" size="middle" className="!text-xs " placeholder="Select language(s)" maxTagCount={3} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}>
                {languages?.map((language) => (
                  <Select.Option key={language.id} value={language.tag}>
                    {language.language}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="subjects" rules={[{ required: true, message: <span className="text-xs ">Subject(s) is required</span> }]}>
              <Select mode="multiple" size="middle" className="!text-xs" placeholder="Subjects you can teach" maxTagCount={2} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}>
                {subjects?.map((subject) => (
                  <Select.Option key={subject.id} value={subject.id}>
                    {subject.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="grade_levels" rules={[{ required: true, message: <span className="text-xs ">Grade level(s) is required</span> }]}>
              <Select mode="multiple" size="middle" className="!text-xs" maxTagCount={2} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} placeholder="Levels you can teach">
                {grades?.map((level) => (
                  <Select.Option key={level.id} value={level.id}>
                    {level.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="special_needs" rules={[{ required: true, message: <span className="text-xs">Special group(s) is required</span> }]}>
              <Select mode="multiple" size="middle" className="!text-xs" maxTagCount={1} maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} placeholder="Special groups you can teach">
                {special_needs?.map((special) => (
                  <Select.Option key={special.id} value={special.id}>
                    {special.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" className="bg-[#001840] hover:!bg-blue-900" htmlType="submit" block size="middle">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InstructorCompleteProfile;
