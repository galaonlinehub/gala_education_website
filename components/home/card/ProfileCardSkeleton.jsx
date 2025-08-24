import { Skeleton } from 'antd';
import React from 'react';

const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton.Image active className="w-64 h-72 rounded-lg" style={{ height: "100%", width: "100%" }} />
      <div className="text-xs flex w-full h-40 items-center flex-col">
        <Skeleton active paragraph={{ rows: 3, width: ['100%', '100%', '100%'] }} title={false} />
      </div>
    </div>
  );
};

const MultipleProfileSkeletons = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <ProfileCardSkeleton key={`profile-skeleton-${index}`} />
      ))}
    </>
  );
};

export default MultipleProfileSkeletons;