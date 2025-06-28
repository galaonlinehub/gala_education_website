import React, { useState } from "react";
import {
  Card,
  Progress,
  Avatar,
  Tooltip,
  Skeleton,
  Button,
  Modal,
  Divider,
  Input,
  message
} from "antd";
import { ExclamationCircleOutlined, StarOutlined } from "@ant-design/icons";
import { LuChevronRight, LuListChecks, LuStar, LuUsers } from "react-icons/lu";
import Link from "next/link";
import { BsStar, BsStarFill } from "react-icons/bs";
import { PiStarBold, PiStarFill, PiStarLight } from "react-icons/pi";
import { apiPost } from "@/src/services/api_service";
const { TextArea } = Input;

const TopicCard = ({ details, detailsLink }) => {
  const [passedValue, setPassedValue] = useState("");
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [comment, setComment] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  console.log("Cohort data", details);



  const [rateValue, setRateValue] = useState(null);

  const openRatingmodal = (value) => {
    setPassedValue(value);
    setOpenRatingModal(true);
  };

  const closeModal = () => {
    setOpenRatingModal(false);
    setRateValue(null);
    setComment('');
  };

  const handleRating = (value) => {
    setRateValue(value);
    console.log("Selected rating:", value);
  };

  const handleSubmitRating = async (value) => {


    if (rateValue == null && comment == '') {
      messageApi.info('Please provide a rating or comment!');
      return;
    }

    const response = await apiPost('/reviews', {
      type: value == 'Teacher' ? 'instructor' : 'cohort',
      id: value == 'Teacher' ? details.instructor_id : details.cohort_id,
      rating: rateValue ?? '',
      comment: comment ?? ''
    });

    setOpenRatingModal(false);
    setRateValue(null);
    setComment('');

    messageApi.success(response.data);

  }

  return (
    <>
      {contextHolder}
      <Card
        key={details.id}
        className="!overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="text-xl font-black text-[#001840] group-hover:text-[#2563eb] transition-colors mb-2">
          {details.cohort_name}
        </div>

        <div className="flex justify-between items-start mb-3">
          <div className="max-w-[70%]">
            <p className="text-gray-600 text-[10px] mb-1">{details?.subject}</p>
            <p className="text-gray-600 font-bold text-sm line-clamp-1">
              {details?.topic_name}
            </p>
          </div>
          <Tooltip title={`${details?.percent_of_completion}% Completed`}>
            <Progress
              type="circle"
              percent={details?.percent_of_completion}
              strokeWidth={12}
              size={50}
              strokeColor={{
                "0%": "#001840",
                "100%": `${details.color === "blue"
                  ? "#1890ff"
                  : details.color === "green"
                    ? "#52c41a"
                    : "#722ed1"
                  }`,
              }}
            />
          </Tooltip>
        </div>

        <div className="border-t pt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar
                className="!bg-transparent/90"
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${details.instructor}`}
              />
              <span className="text-sm font-medium line-clamp-1 capitalize">
                {details.instructor_name}
              </span>
            </div>
            <Tooltip title="Enrolled Students">
              <div className="flex items-center gap-1 text-gray-600">
                <LuUsers />
                <span className="text-sm">
                  {details?.total_student_enrolled}
                </span>
              </div>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            {details.assignmentsDue > 0 ? (
              <div className="flex items-center text-amber-600">
                <ExclamationCircleOutlined className="mr-1" />
                <span className="text-sm">
                  {details.assignmentsDue} assignments due
                </span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <LuListChecks className="mr-1" />
                <span className="text-sm">All caught up!</span>
              </div>
            )}
            <Link href={detailsLink}>
              <div className="flex items-center text-[#001840] font-medium">
                <span className="text-sm font-bold mr-2">Details</span>
                <LuChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 justify-between mt-5 p-1.5 border rounded-xl items-center text-[#001840] font-medium">
              <Button
                onClick={() => openRatingmodal("Class")}
                className="!font-semibold !bg-[#001840] !text-white flex-1 min-w-[150px]"
              >
                Rate Class
              </Button>
              <Button
                onClick={() => openRatingmodal("Teacher")}
                className="!font-semibold !bg-[#001840] !text-white flex-1 min-w-[150px]"
              >
                Rate Teacher
              </Button>
            </div>
          </div>

        </div>


        <Modal
          open={openRatingModal}
          onCancel={closeModal}
          onOk={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal}>
              Cancel
            </Button>,
            <Button className="!bg-[#001840] !text-white" key="sbmit" onClick={() => handleSubmitRating(passedValue)}>
              Submit
            </Button>,
          ]}
        >
          <Divider>
            <div className="flex justify-center gap-2">
              <span className="font-light">Rate</span>{" "}
              {passedValue == "Teacher" ? (
                <span className="font-bold">{details.instructor_name}</span>
              ) : (
                <span className="font-bold">{details.cohort_name}</span>
              )}
            </div>
          </Divider>


          <div className="flex flex-col justify-center text-center items-center">
            {passedValue == "Teacher" ?
              <p className="text-sm">
                Rate this teacher fairly based on teaching effectiveness,
                communication, and support. Share your honest thoughts to help
                us enhance teaching quality.
              </p> : <p className="text-sm">
                Consider your academic growth and engagement when rating this
                class. Rate how well this class supported your learning goals.
              </p>}
            <div className="w-full mt-3 flex gap-2 items-center justify-center">
              {[1, 2, 3, 4, 5].map((star, index) => {
                const isActive = star <= rateValue;
                const StarIcon = isActive ? PiStarFill : PiStarLight;
                return (
                  <StarIcon
                    key={index}
                    size={40}
                    color={isActive ? "#ffdf00" : "gray"}
                    onClick={() => handleRating(star)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </div>
            <div className="w-full mt-5 flex">
              <TextArea
                rows={4}
                name="student_comment"
                placeholder="Write your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

            </div>
          </div>

        </Modal>
      </Card>
    </>
  );
};

const TopicCardSkeleton = () => {
  return (
    <Card className="!overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <div className="w-[95%] flex flex-col">
          <Skeleton.Input active size="medium" className="!w-[95%] mb-[3px]" />
          <Skeleton.Input active size="small" className="!w-[30%] !mb-[2px]" />
          <Skeleton.Input active className="w-full" />
        </div>

        <Skeleton.Avatar active size={64} shape="circle" />
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skeleton.Avatar active size="medium" />
            <Skeleton.Input active size="small" className="w-[80%]" />
          </div>

          <Skeleton.Input active size="small" className="w-[50%]" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton.Input active size="small" className="w-[120px]" />
          <Skeleton.Input active size="small" className="w-[80px]" />
        </div>
      </div>
    </Card>
  );
};

export default TopicCardSkeleton;

export { TopicCard, TopicCardSkeleton };
