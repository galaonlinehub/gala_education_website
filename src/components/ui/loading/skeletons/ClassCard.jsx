import { Skeleton, Card } from "antd";

const ClassCard = () => {
  return (
    <Skeleton.Node
      active={true}
      className="!rounded-md !h-[100px] !w-[220px]"
    />
  );
};

const TopicSkeleton = () => (
  <Card
    styles={{ body: { padding: "0px" } }}
    // bodyStyle={{ padding: 6 }}
    className="!rounded-md !w-[220px] !flex-none"
  >
    <Skeleton
      active
      title={false}
      paragraph={{
        rows: 3,
        width: ["60%", "80%", "50%"],
      }}
    />
  </Card>
);

export { ClassCard, TopicSkeleton };
