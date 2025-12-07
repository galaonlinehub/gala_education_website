"use client";
import React, { useState } from "react";
import { Modal, Input, Select, Button, Form, message } from "antd";
import { FaPaperPlane } from "react-icons/fa";

const { TextArea } = Input;

export const RequestMaterialModal = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Request Submitted:", values);
            message.success("Request submitted successfully! We'll notify you soon.");
            setLoading(false);
            form.resetFields();
            onCancel();
        }, 1500);
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            title={
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#001840]">Request Study Material</h2>
                    <p className="text-sm text-gray-500 font-normal">
                        Can't find what you're looking for? Let us know and we'll do our best to add it to our collection.
                    </p>
                </div>
            }
            className="rounded-xl overflow-hidden"
            width={700}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="pt-2"
                requiredMark="optional"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="name"
                        label={<span className="font-bold text-[#001840]">Your Name *</span>}
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input placeholder="Enter your full name" className="h-10 rounded-lg" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span className="font-bold text-[#001840]">Email Address *</span>}
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" }
                        ]}
                    >
                        <Input placeholder="your.email@example.com" className="h-10 rounded-lg" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="materialType"
                    label={<span className="font-bold text-[#001840]">Material Type *</span>}
                    rules={[{ required: true, message: "Please select material type" }]}
                >
                    <Select
                        placeholder="Select type"
                        className="h-10 rounded-lg"
                        options={[
                            { value: "Notes", label: "Notes" },
                            { value: "Past Papers", label: "Past Papers" },
                            { value: "Videos", label: "Videos" },
                            { value: "Other", label: "Other" },
                        ]}
                    />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="subject"
                        label={<span className="font-bold text-[#001840]">Subject *</span>}
                        rules={[{ required: true, message: "Please select a subject" }]}
                    >
                        <Select
                            placeholder="Select Subject"
                            className="h-10 rounded-lg"
                            options={[
                                { value: "Mathematics", label: "Mathematics" },
                                { value: "Chemistry", label: "Chemistry" },
                                { value: "Physics", label: "Physics" },
                                { value: "Biology", label: "Biology" },
                                { value: "History", label: "History" },
                                { value: "English", label: "English" },
                                { value: "Other", label: "Other" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="grade"
                        label={<span className="font-bold text-[#001840]">Grade Level *</span>}
                        rules={[{ required: true, message: "Please select a grade" }]}
                    >
                        <Select
                            placeholder="Select Grade"
                            className="h-10 rounded-lg"
                            options={[
                                { value: "Grade 9", label: "Grade 9" },
                                { value: "Grade 10", label: "Grade 10" },
                                { value: "Grade 11", label: "Grade 11" },
                                { value: "Grade 12", label: "Grade 12" },
                            ]}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="topic"
                    label={<span className="font-bold text-[#001840]">Specific Topic *</span>}
                    rules={[{ required: true, message: "Please enter the topic" }]}
                >
                    <Input placeholder="e.g., Quadratic Equations, Photosynthesis, etc." className="h-10 rounded-lg bg-gray-50 border-gray-200" />
                </Form.Item>

                <Form.Item
                    name="additionalInfo"
                    label={<span className="font-bold text-[#001840]">Additional Information</span>}
                >
                    <TextArea
                        rows={3}
                        placeholder="Any specific details about what you're looking for? (e.g., year for past papers, specific format preferences, etc.)"
                        className="rounded-lg bg-gray-50 border-gray-200 resize-none"
                    />
                </Form.Item>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                    <p className="text-sm text-blue-800">
                        <span className="font-bold">Note:</span> We'll review your request and notify you via email once the material is available. This typically takes 24-48 hours.
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button onClick={onCancel} className="h-10 px-6 font-semibold rounded-lg">
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<FaPaperPlane />}
                        className="bg-[#001840] hover:bg-[#002a6e] h-10 px-6 font-bold rounded-lg flex items-center shadow-lg shadow-blue-900/20 text-white border-none"
                    >
                        Submit Request
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
