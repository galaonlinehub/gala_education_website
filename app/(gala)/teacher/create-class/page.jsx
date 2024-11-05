'use client'

import React, { useState } from 'react'
import { Form, Input, Select, DatePicker, Button, Typography, Space, Tag } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

export default function CreateClass() {
  const [form] = Form.useForm()
  const availableForms = ['Form One', 'Form Two', 'Form Three']
  const [selectedForms, setSelectedForms] = useState([])

  const handleSelect = (value) => {
    if (value && !selectedForms.includes(value)) {
      setSelectedForms([...selectedForms, value])
      form.setFieldsValue({ availableTo: undefined })
    }
  }

  const removeItem = (item) => {
    setSelectedForms(selectedForms.filter((selected) => selected !== item))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <Title level={3} className="text-center mb-4">
          Create a Class
        </Title>
        <Paragraph className="text-center mb-6">
          Welcome! Create a new class by entering a topic or subject name. This makes it easier for students to find and
          connect with you when they are searching for specific subjects or topics.
        </Paragraph>

        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item name="className" label="Class Name" rules={[{ required: true, message: 'Please enter a class name' }]}>
            <Input placeholder="Enter a class name" />
          </Form.Item>

          <Form.Item name="price" label="Enter Price" rules={[{ required: true, message: 'Please enter a price' }]}>
            <Input placeholder="Enter price" />
          </Form.Item>

          <Form.Item name="availableTo" label="Available to">
            <Select placeholder="Select a Class" onChange={handleSelect}>
              {availableForms.map((form) => (
                <Select.Option key={form} value={form}>
                  {form}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="mb-4">
            <Space size={[0, 8]} wrap>
              {selectedForms.map((item) => (
                <Tag
                  key={item}
                  closable
                  onClose={() => removeItem(item)}
                  className="bg-[#001840] text-white border-none"
                  closeIcon={<CloseOutlined className="text-white" />}
                >
                  {item}
                </Tag>
              ))}
            </Space>
          </div>

          <Form.Item name="dateRange" label="Class Duration" rules={[{ required: true, message: 'Please select a date range' }]}>
            <RangePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a class description' }]}
          >
            <TextArea rows={4} placeholder="Enter class description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full md:w-auto float-right">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}