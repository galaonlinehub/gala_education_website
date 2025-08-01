"use client";
import { Button, Form, Typography, Input, message, Modal, Upload } from "antd";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa6";

import { useCreatePartnerSchool } from "@/features/admin";

const { Text } = Typography;

function CreatePartnerSchool() {
  const [form] = Form.useForm();
  const {
    handleOnFinish,
    openModal,
    handleOpen,
    handleClose,
    beforeUpload,
    handleFileChange,
    fileList,
  } = useCreatePartnerSchool();

  const onFinish = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);

    if (fileList.school_logo && fileList.school_logo.length > 0) {
      formData.append("school_logo", fileList.school_logo[0].originFileObj);
    }

    handleOnFinish(formData);
  };

  const uploadButton = (text, miniText) => (
    <div className="flex flex-col gap-1">
      <Button
        icon={<FaImage />}
        className="!w-full !bg-[#001840] hover:!opacity-90 !text-white !h-input-height !flex !items-center !justify-center !text-xs !outline-none focus:!outline-none hover:!outline-none hover:!border-transparent hover:!box-shadow-none"
      >
        {text}
      </Button>
      <Text className="text-[10px] font-normal text-gray-500 flex items-center gap-1">
        <FaImage /> Image only, max 2MB
        {miniText && (
          <span className="text-black mx-1 font-bold">({miniText})</span>
        )}
      </Text>
    </div>
  );

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-2 rounded-md border-2 border-blue-800 text-blue-800 font-bold"
      >
        + partner school
      </button>

      <Modal
        open={openModal}
        onCancel={handleClose}
        footer={null}
        title={
          <div className="text-blue-800 text-center">Create Partner School</div>
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFieldsChange={() => {
            // mutation.reset();
          }}
          className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-6 !w-full"
        >
          <div className="w-full  flex flex-col">
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter school name",
                },
              ]}
            >
              <Input
                placeholder="School Name"
                className="!h-[42px] signup-input"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter school email",
                },
              ]}
            >
              <Input placeholder="Email" className="!h-[42px] signup-input" />
            </Form.Item>

            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Please enter school phone number",
                },
              ]}
            >
              <Input
                placeholder="Phone Number"
                className="!h-[42px] signup-input"
              />
            </Form.Item>
            <Form.Item
              name="school_logo"
              rules={[
                {
                  required: true,
                  message: "School Logo is required",
                },
              ]}
              className="!w-full"
            >
              <Upload
                accept=".jpg,.jpeg,.png"
                listType="picture"
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList.school_logo}
                maxCount={1}
              >
                {uploadButton("Upload School Logo", "")}
              </Upload>
            </Form.Item>
            <Form.Item className="w-full">
              <Button
                // disabled={
                //     mutation.isPending ||
                //     !isAgreementChecked ||
                //     mutation.isSuccess ||
                //     mutation.isError
                // }
                type="primary"
                htmlType="submit"
                className={
                  "!flex !items-center !justify-center !w-full !font-normal !py-4 px-2 !text-white !border-transparent disabled:!cursor-not-allowed disabled:!opacity-70 !bg-[#010798] hover:!opacity-80"
                }
              >
                {/* {mutation.isPending ? (
                                <SlickSpinner size={14} color="white" />
                            ) : ( */}
                <div className="font-semibold w-full">Create</div>
                {/* // )} */}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default CreatePartnerSchool;
