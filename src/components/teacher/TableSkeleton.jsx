import React from 'react';
import { Table, Skeleton, Space } from 'antd';

const TableSkeleton = () => {
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: () => <Skeleton.Button active size="small" shape="square" />,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: () => (
        <Space>
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Button active size="small" shape="square" style={{ width: 80 }} />
        </Space>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: () => (
        <Space>
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Button active size="small" shape="square" style={{ width: 80 }} />
        </Space>
      ),
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      render: () => (
        <Space>
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Button active size="small" shape="square" style={{ width: 30 }} />
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Skeleton.Button active size="small" shape="square" style={{ width: 100 }} />
      ),
    }
  ];

  const skeletonData = [
    { key: '1' },
    { key: '2' }
  ];

  return (
    <div className="overflow-x-auto">
      <Table 
        columns={columns} 
        dataSource={skeletonData} 
        pagination={false}
        className="skeleton-table"
      />
    </div>
  );
};

export default TableSkeleton;