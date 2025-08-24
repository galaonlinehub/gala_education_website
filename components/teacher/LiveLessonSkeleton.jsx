import { Card, Skeleton, Space } from 'antd';
import React, { useState } from 'react';

const ClassCardSkeleton = () => {
  return (
    <Card
      className="flex flex-col w-full rounded-xl bg-white"
      styles={{ body: { padding: "8px", width: "100%" } }}
    >
      {/* Tag skeleton */}
      <div className="w-24 h-5 bg-gray-200 rounded-full mb-2"></div>
      
      <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-8 py-2">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Class name and instructor skeleton */}
          <div className="min-w-[140px]">
            <Skeleton.Input active size="small" className="w-full mb-1" />
            <div className="flex items-center gap-1">
              <Skeleton.Avatar active size="small" />
              {/* <Skeleton.Input active size="small" className="w-20" /> */}
            </div>
          </div>

          {/* Date & Time skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className='flex flex-col gap-1'>
              <Skeleton.Input active size="small" className="w-10 mb-1" />
              <Skeleton.Input active size="small" className="!w-48" />
            </div>
          </div>

          {/* Enrolled skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className='flex flex-col gap-1'>
              <Skeleton.Input active size="small" className="!w-10 mb-1" />
              <Skeleton.Input active size="small" className="!w-36" />
            </div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="flex items-center">
          <Skeleton.Button active className="w-16 h-8" />
        </div>
      </div>

      {/* Collapse skeleton */}
      <div className="mt-4 bg-transparent">
        <Space direction="vertical" className="w-full">
          <Skeleton.Input active className="w-32 h-3" />
        </Space>
      </div>
    </Card>
  );
};

// Usage example with array
const LiveLessonSkeleton = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-4">
      {loading ? (
        // Show 4 skeletons using array
        Array(4).fill(null).map((_, index) => (
          <ClassCardSkeleton key={index} />
        ))
      ) : (
        // Render actual content when loaded
        <div>Your actual class cards would render here</div>
      )}
    </div>
  );
};

export default LiveLessonSkeleton;