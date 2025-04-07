"use client";
import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const ChooseAccount = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { setActiveTab } = useTabNavigator();
  const { setAccountType } = useAccountType();
  const isDisabled = pathname === "/signup";

  const handleSelect = (type) => {
    setActiveTab(0);
    setAccountType(type);
    router.push("/signup");
  };

  const items = [
    {
      key: "1",
      icon: <PiStudentBold className="text-xl" />,
      label: (
        <div
          className="flex items-center py-[2px] rounded"
          onClick={handleSelect.bind(null, "student")}
        >
          <span className="text-sm font-normal">Student</span>
        </div>
      ),
    },
    {
      key: "2",
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: (
        <div
          className="flex items-center py-[2px] rounded"
          onClick={handleSelect.bind(null, "instructor")}
        >
          <span className="text-sm font-normal">Teacher</span>
        </div>
      ),
    },
  ];

  return (
    <section>
      <Dropdown
        menu={{ items }}
        placement="bottomCenter"
        disabled={isDisabled}
        overlayClassName="rounded-md shadow-lg border border-gray-100"
        trigger={["hover"]}
        arrow={true}
      >
        <button
          className={`text-black transition-all ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
          }}
        >
          <span>Sign Up</span>
        </button>
      </Dropdown>
    </section>
  );
};

export default ChooseAccount;
