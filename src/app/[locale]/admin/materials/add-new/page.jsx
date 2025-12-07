'use client';
import { FilePdfOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, message, Select, Upload } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuUpload } from 'react-icons/lu';

import { useGrade } from '@/hooks/data/useGrade';
import { useSubject } from '@/hooks/data/useSubject';
import { useTopic } from '@/hooks/data/useTopic';
import { apiPost } from '@/services/api/api_service';

function AddMaterial() {
  const [fileList, setFileList] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      type: '',
      subject_id: '',
      grade_level_id: '',
      topic_id: '',
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { subjects, isLoading: isLoadingSubjects } = useSubject();
  const { grades, isGradesPending: isLoadingGrades } = useGrade();

  const materialType = watch('type');
  const subjectId = watch('subject_id');
  const gradeLevelId = watch('grade_level_id');

  const { topics, isTopicLoadig: isLoadingTopics } = useTopic(subjectId, gradeLevelId);

  const beforeUpload = (file) => {
    const isPdf = file.type === 'application/pdf';
    const isMp4 = file.type === 'video/mp4';
    const isValidSize = file.size / 1024 / 1024 < 10; // 10MB limit

    const allowedTypes = materialType === 'video' ? ['video/mp4'] : ['application/pdf'];
    const isAllowedType = isPdf || isMp4;

    if (!isAllowedType) {
      message.error(
        materialType === 'video'
          ? 'Only MP4 files are allowed for videos'
          : 'Only PDF files are allowed'
      );
      return Upload.LIST_IGNORE;
    }

    if (!allowedTypes.includes(file.type)) {
      message.error(
        materialType === 'video'
          ? 'Only MP4 files are allowed for videos'
          : 'Only PDF files are allowed'
      );
      return Upload.LIST_IGNORE;
    }

    if (!isValidSize) {
      message.error('File must be smaller than 10MB');
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    const allowedTypes = materialType === 'video' ? ['video/mp4'] : ['application/pdf'];
    const validFiles = newFileList.filter(
      (file) =>
        file.status !== 'error' && allowedTypes.includes(file.type) && file.size / 1024 / 1024 < 10
    );
    setFileList(validFiles);
  };

  const submitFormData = async (data) => {
    // Check if file is uploaded
    if (!fileList || fileList.length === 0) {
      throw new Error(
        materialType === 'video' ? 'Please upload an MP4 file' : 'Please upload a PDF file'
      );
    }

    const file = fileList[0]?.originFileObj || fileList[0];

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('subject_id', data.subject_id);
    formData.append('file', file);

    if (data.type === 'notes' && data.topic_id) {
      formData.append('topic_id', data.topic_id);
    }

    const response = await apiPost('study-materials', formData, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      message.success('Material created successfully!');
      queryClient.invalidateQueries(['study-materials']);
      reset();
      setFileList([]);
      router.push('/admin/materials');
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'Failed to create material');
    },
  });

  const onSubmit = (data) => {
    // Validate file upload
    if (!fileList || fileList.length === 0) {
      message.error(
        materialType === 'video' ? 'Please upload an MP4 file' : 'Please upload a PDF file'
      );
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Material</h1>
        <p className="text-sm text-gray-600 mt-1">
          Create a new material (past paper, notes, or video)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Material Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="text-red-500">*</span>
          </label>
          <Controller
            name="type"
            control={control}
            rules={{ required: 'Material type is required' }}
            render={({ field }) => (
              <Select
                placeholder="Select material type"
                style={{ width: '100%' }}
                value={field.value || undefined}
                onChange={(value) => {
                  field.onChange(value);
                  // Reset topic, grade level, and file when type changes
                  setValue('topic_id', '');
                  setValue('grade_level_id', '');
                  setFileList([]); // Clear file when type changes
                }}
                status={errors.type ? 'error' : ''}
                options={[
                  { value: 'past_paper', label: 'Past Paper' },
                  { value: 'notes', label: 'Notes' },
                  { value: 'video', label: 'Video' },
                ]}
              />
            )}
          />
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <Controller
            name="subject_id"
            control={control}
            rules={{ required: 'Subject is required' }}
            render={({ field }) => (
              <Select
                placeholder="Select a subject"
                style={{ width: '100%' }}
                loading={isLoadingSubjects}
                value={field.value || undefined}
                onChange={(value) => {
                  field.onChange(value);
                  // Reset topic and grade level when subject changes
                  setValue('topic_id', '');
                  setValue('grade_level_id', '');
                }}
                status={errors.subject_id ? 'error' : ''}
                options={
                  subjects?.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                  })) || []
                }
              />
            )}
          />
          {errors.subject_id && (
            <p className="text-red-500 text-xs mt-1">{errors.subject_id.message}</p>
          )}
        </div>

        {/* Grade Level and Topic - Only show if type is "notes" (not for video or past_paper) */}
        {materialType === 'notes' && (
          <>
            {/* Grade Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level <span className="text-red-500">*</span>
              </label>
              <Controller
                name="grade_level_id"
                control={control}
                rules={{
                  required: materialType === 'notes' ? 'Grade level is required for notes' : false,
                }}
                render={({ field }) => (
                  <Select
                    placeholder="Select a grade level"
                    style={{ width: '100%' }}
                    loading={isLoadingGrades}
                    value={field.value || undefined}
                    onChange={(value) => {
                      field.onChange(value);
                      // Reset topic when grade level changes
                      setValue('topic_id', '');
                    }}
                    status={errors.grade_level_id ? 'error' : ''}
                    options={
                      grades?.map((grade) => ({
                        value: grade.id,
                        label: grade.name,
                      })) || []
                    }
                  />
                )}
              />
              {errors.grade_level_id && (
                <p className="text-red-500 text-xs mt-1">{errors.grade_level_id.message}</p>
              )}
            </div>

            {/* Topic - Only show if grade level and subject are selected */}
            {subjectId && gradeLevelId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="topic_id"
                  control={control}
                  rules={{
                    required: materialType === 'notes' ? 'Topic is required for notes' : false,
                  }}
                  render={({ field }) => (
                    <Select
                      placeholder="Select a topic"
                      style={{ width: '100%' }}
                      loading={isLoadingTopics}
                      value={field.value || undefined}
                      onChange={field.onChange}
                      status={errors.topic_id ? 'error' : ''}
                      options={
                        topics?.map((topic) => ({
                          value: topic.id,
                          label: topic.title || topic.name,
                        })) || []
                      }
                    />
                  )}
                />
                {errors.topic_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.topic_id.message}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File <span className="text-red-500">*</span>
          </label>
          <Upload
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            maxCount={1}
            accept={materialType === 'video' ? '.mp4' : '.pdf'}
            onRemove={() => {
              setFileList([]);
            }}
          >
            <Button icon={<LuUpload />} className="w-full" disabled={mutation.isPending}>
              Click to Upload {materialType === 'video' ? 'MP4' : 'PDF'}
            </Button>
          </Upload>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            {materialType === 'video' ? (
              <>📹 MP4 only, max 10MB</>
            ) : (
              <>
                <FilePdfOutlined /> PDF only, max 10MB
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end pt-4">
          <Button type="default" onClick={() => router.back()} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="bg-blue-500"
          >
            {mutation.isPending ? 'Creating...' : 'Create Material'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMaterial;
