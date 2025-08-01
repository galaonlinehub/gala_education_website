import { Skeleton } from "antd";

const StudentDashboardSkeleton = () => {
  return (
    <div className="flex lg:gap-x-5 justify-center items-start flex-col lg:flex-row px-1 py-16">
      <div className="flex-col w-full lg:w-2/3 flex px-4">
        <Skeleton.Node active className="!w-full !h-32" />

        <div className="pt-5">
          <div className="flex justify-between items-center w-full">
            <Skeleton.Node active className="!h-6 !w-32 !rounded" />
            <Skeleton.Node active className="!h-6 !w-32 !rounded" />
          </div>

          <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
            {[1, 2, 3].map((_, index) => (
              <Skeleton.Node
                key={index}
                active
                className="!flex-none !w-60 !h-28 !p-2 !rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="pt-5 mb-10 lg:mb-0 w-full">
          <Skeleton.Node active className="!h-6 !w-32 !rounded !mb-4" />

          <div className="overflow-x-auto">
            <div className="min-w-[600px] flex flex-col gap-3">
              <Skeleton.Node active className="!w-full !h-8 !rounded-md" />

              {[1, 2, 3].map((_, index) => (
                <Skeleton.Node
                  key={index}
                  active
                  className="!flex !items-center !justify-between !text-xs !rounded-md !w-full !h-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Skeleton.Node
        active
        className="!w-full !lg:w-1/3 !h-[500px] !lg:h-[600px] !rounded-xl"
      />
    </div>
  );
};

export default StudentDashboardSkeleton;
