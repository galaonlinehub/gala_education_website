"use client";
import { Button, Form, Typography, Input, message, Modal, Upload } from "antd";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";


const { Text } = Typography;

function CreatePartnerSchool() {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const beforeUpload = (file) => {
        const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(
            file.type
        );
        const isValidSize = file.size / 1024 / 1024 < 2;

        if (!isImage) {
            message.error("Only valid picture is allowed");
            return Upload.LIST_IGNORE;
        }

        if (!isValidSize) {
            message.error("Picture must be smaller than 2MB");
            return Upload.LIST_IGNORE;
        }

        return true;
    };

    const handleFileChange = ({ fileList }, type) => {
        const validFiles = fileList.filter((file) => {
            const isImage = ["image/jpeg", "image/jpg", "image/png"].includes(
                file.type
            );
            const isNotError = file.status !== "error";
            const isUnder2MB = file.size && file.size / 1024 / 1024 < 2;

            return isImage && isNotError && isUnder2MB;
        });

        setFileList((prev) => ({
            ...prev,
            [type]: validFiles,
        }));
    };

    const onFinish = () => {};

    const uploadButton = (text, miniText) => (
        <div className="flex flex-col gap-1">
            <Button
                icon={<LuUpload />}
                className="!w-full !bg-[#001840] hover:!opacity-90 !text-white !h-input-height !flex !items-center !justify-center !text-xs !outline-none focus:!outline-none hover:!outline-none hover:!border-transparent hover:!box-shadow-none"
            >
                {text}
            </Button>
            <Text className="text-[10px] font-normal text-gray-500 flex items-center gap-1">
                <FaImage /> Image only, max 2MB
                {miniText && (
                    <span className="text-black mx-1 font-bold">
                        ({miniText})
                    </span>
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
                    <div className="text-blue-800 text-center">
                        Create Partner School
                    </div>
                }
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    onFieldsChange={() => {
                        mutation.reset();
                    }}
                    className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-6 !w-full"
                >
                    <div className="w-full lg:w-6/12 flex flex-col">
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
                            <Input
                                placeholder="Email"
                                className="!h-[42px] signup-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="Phonenumber"
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
                            name="school_photo"
                            rules={[
                                { required: true, message: "CV is required" },
                            ]}
                            className="!w-full"
                        >
                            <Upload
                                accept=".jpg,.jpeg,.png"
                                listType="picture"
                                beforeUpload={beforeUpload}
                                onChange={(info) =>
                                    handleFileChange(info, "school_photo")
                                }
                                fileList={fileList.cv}
                                maxCount={1}
                            >
                                {uploadButton("Upload School", "")}
                            </Upload>
                        </Form.Item>
                    <Form.Item className="w-full lg:w-2/12">
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
                                "!flex !items-center !justify-center !w-full !font-normal !py-4 !text-white !border-transparent disabled:!cursor-not-allowed disabled:!opacity-70 !bg-[#010798] hover:!opacity-80"
                            }
                        >
                            {/* {mutation.isPending ? (
                                <SlickSpinner size={14} color="white" />
                            ) : ( */}
                            <span className="font-semibold">Apply</span>
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
