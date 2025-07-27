"use client";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";

import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";

const ChooseAccount = ({ btnText, textColor, btnIcon, btnClassname, placement , trigger }) => {
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
        placement={placement}
        disabled={isDisabled}
        // overlayClassName="rounded-md shadow-lg border border-gray-100"
        trigger={[trigger]}
        arrow={true}
      >
        <div className={`flex ${btnClassname} gap-2 items-center`}>
          {btnIcon}
          <button
            className={`text-black transition-all ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={(e) => {
              if (isDisabled) {
                e.preventDefault();
                return;
              }
            }}
          >
            <span className={`text-${textColor}`}>{btnText}</span>
          </button>
        </div>
      </Dropdown>
    </section>
  );
};

export default ChooseAccount;
