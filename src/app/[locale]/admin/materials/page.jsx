'use client';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message, Popconfirm } from 'antd';
import Link from 'next/link';
import DataTable from 'react-data-table-component';

import { apiDelete, apiGet } from '@/services/api/api_service';
import { customStyles } from '@/styles/admin/datatable/customStyles';

function Materials() {
  const queryClient = useQueryClient();

  const getMaterials = async () => {
    const { data } = await apiGet('study-materials');
    return data?.data || [];
  };

  const { data: materials, isLoading } = useQuery({
    queryKey: ['study-materials'],
    queryFn: getMaterials,
  });

  const deleteMaterial = useMutation({
    mutationFn: async (materialId) => {
      const response = await apiDelete(`study-materials/${materialId}`);
      return response.data;
    },
    onSuccess: () => {
      message.success('Material deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['study-materials'] });
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to delete material');
    },
  });

  const handleDelete = (materialId) => {
    deleteMaterial.mutate(materialId);
  };

  const formatType = (type) => {
    if (!type) return '-';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const columns = [
    {
      name: 'Type',
      selector: (row) => formatType(row.type),
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => row.title || '-',
      sortable: true,
      width: '200px',
      minWidth: '150px',
      cell: (row) => (
        <div style={{ width: '100%', maxWidth: '200px' }}>
          {row.title ? (
            <span
              className={`font-medium ${
                row.type === 'past_paper' ? 'text-[#001840]' : 'text-gray-800'
              }`}
              title={row.title}
              style={{
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {row.title}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
      wrap: false,
    },
    {
      name: 'Subject',
      selector: (row) => row.subject?.name || '-',
      sortable: true,
      width: '150px',
      minWidth: '120px',
    },
    {
      name: 'Grade Level',
      selector: (row) => row.grade_level?.name || '-',
      sortable: true,
    },
    {
      name: 'Topic',
      selector: (row) => row.topic?.title || row.topic?.name || '-',
      sortable: true,
    },
    {
      name: 'File',
      selector: (row) => row.file_name || '-',
      sortable: true,
      cell: (row) =>
        row.file_url ? (
          <a
            href={row.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {row.file_name || 'View File'}
          </a>
        ) : (
          row.file_name || '-'
        ),
    },
    {
      name: 'Created At',
      selector: (row) => formatDate(row.created_at),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Popconfirm
          title="Delete Material"
          description="Are you sure you want to delete this material?"
          onConfirm={() => handleDelete(row.id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true, loading: deleteMaterial.isPending }}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={deleteMaterial.isPending}
          />
        </Popconfirm>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div>
      <DataTable
        title={
          <div className="w-full flex justify-between px-2">
            <span className="text-xs text-blue-500">Materials</span>
            <Link
              href={'/admin/materials/add-new'}
              className="text-xs text-blue-500 hover:underline"
            >
              + Add Material
            </Link>
          </div>
        }
        columns={columns}
        data={materials || []}
        customStyles={customStyles}
        progressPending={isLoading}
        // pagination
      />
    </div>
  );
}

export default Materials;
