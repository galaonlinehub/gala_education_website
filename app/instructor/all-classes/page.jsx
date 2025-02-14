'use client';
import React, { useState } from 'react';
import { Table, Button, Card } from 'antd';
import { FaChalkboardTeacher, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const InstructorClasses = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Introduction to Computer Science',
      startDate: '2024-01-15',
      endDate: '2024-05-20'
    },
    {
      id: 2,
      name: 'Advanced React Programming',
      startDate: '2024-02-01',
      endDate: '2024-06-10'
    },
    {
      id: 3,
      name: 'Data Structures and Algorithms',
      startDate: '2024-01-20',
      endDate: '2024-05-25'
    },
    {
      id: 4,
      name: 'Machine Learning Fundamentals',
      startDate: '2024-02-10',
      endDate: '2024-06-15'
    },
    {
      id: 5,
      name: 'Cloud Computing Essentials',
      startDate: '2024-01-25',
      endDate: '2024-05-30'
    },
    {
      id: 6,
      name: 'Mobile App Development',
      startDate: '2024-02-05',
      endDate: '2024-06-05'
    }
  ]);

  const columns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate'
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button 
            icon={<FaEye className="text-blue-500" />} 
            size="small" 
            onClick={() => handleView(record)}
          >
            View Details
          </Button>
         
        </div>
      )
    }
  ];

  const handleView = (record) => {
    console.log('View', record);
  };


  return (
    <Card className="w-full mx-auto p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <FaChalkboardTeacher className="mr-2 text-2xl text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">
          My Classes
        </h2>
      </div>
      <Table 
        columns={columns} 
        dataSource={classes} 
        rowKey="id"
        className="w-full"
        pagination={{
          pageSize: 5,
          showSizeChanger: true
        }}
      />
    </Card>
  );
};

export default InstructorClasses;