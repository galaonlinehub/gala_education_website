"use client";
import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";
import { Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ChooseAccont = () => {
  const description = "Delete the task";

  const text = "Choose account type to open";
  const buttonWidth = 80;

  const router = useRouter();
  const { setAccountType } = useAccountType();
  const [open, setOpen] = React.useState(false);
  const { activeTab } = useTabNavigator();

  const handleTeacherClick = () => {
    setAccountType("instructor");
    handleCancel();
    router.push("/signup");
  };

  const handleStudentClick = () => {
    setAccountType("student");
    handleCancel();
    router.push("/signup");
  };

  const showPopconfirm = () => {
    if (activeTab > 0) return;
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const isDisabled = activeTab > 0;

  return (
    <section>
      <Popconfirm
        open={open}
        icon={<ExclamationCircleOutlined className="!text-[#010798]" />}
        placement="bottom"
        title={
          <span className="text-xs font-thin">Choose your account type</span>
        }
        okText="Teacher"
        cancelText="Student"
        okButtonProps={{
          disabled: isDisabled,
          onClick: handleTeacherClick,
          style: {
            width: 50,
            height: "20px",
            backgroundColor: "#001840",
            color: "white",
            fontSize: "10px",
            padding: "1px",
            fontWeight: 50,
            opacity: isDisabled ? 0.5 : 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
          },
        }}
        cancelButtonProps={{
          disabled: isDisabled,
          onClick: handleStudentClick,
          style: {
            width: 50,
            height: "23px",
            backgroundColor: "#001840",
            color: "white",
            fontSize: "10px",
            padding: "1px",
            fontWeight: 50,
            opacity: isDisabled ? 0.5 : 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
          },
        }}
        onOpenChange={handleCancel}
      >
        <span
          className={`cursor-pointer ${
            isDisabled ? "opacity-20 cursor-not-allowed" : ""
          }`}
          onClick={showPopconfirm}
        >
          Register
        </span>
      </Popconfirm>
    </section>
  );
};

export default ChooseAccont;
