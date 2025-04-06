import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Menu, Avatar, Typography, Divider, Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@/src/hooks/useUser";
import { MdLiveTv, MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { Signout } from "../ui/auth/signup/Signout";

const { Text, Title } = Typography;

const MobileSideBar = ({ isOpen, onClose }) => {
  const { user } = useUser();

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () =>{
    setShowSignOutModal(true);
  }

  const studentMenuItems = [
    {
      key: "dashboard",
      icon: <MdDashboard />,
      label: <Link href="/student">Dashboard</Link>,
    },
    {
      key: "live-lesson",
      icon: <MdLiveTv />,
      label: <Link href="/student/live-lesson">Live Lesson</Link>,
    },
    {
      key: "assignments",
      icon: <FaChalkboardTeacher />,
      label: <Link href="/student/assignments">Assignments</Link>,
    },
    {
      key: "social",
      icon: <FaUsers />,
      label: <Link href="/student/social">Social</Link>,
    },
  ];

  const instructorMenuItems = [
    {
      key: "dashboard",
      icon: <MdDashboard />,
      label: <Link href="/instructor/">Dashboard</Link>,
    },
    {
      key: "live-class",
      icon: <MdLiveTv />,
      label: <Link href="/instructor/live-class">Live Class</Link>,
    },
    {
      key: "social",
      icon: <FaUsers />,
      label: <Link href="/instructor/social">Social</Link>,
    },
    {
      key: "assignments",
      icon: <FaChalkboardTeacher />,
      label: <Link href="/instructor/assignments">Assignments</Link>,
    },
  ];

  return (
    <>
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <Avatar size="small" icon={<UserOutlined />} />
            <div className="flex flex-col">
              <Text className="text-xs font-extralight">{user?.email}</Text>
              <Text className="text-xs capitalize text-gray-500 font-thin">{user?.role}</Text>
            </div>
          </div>
        }
        placement="left"
        onClose={onClose}
        open={isOpen}
        width={280}
        body={{ padding: 0 }}
        header={{ padding: "12px 16px" }}
      >
        <Menu mode="inline" items={user?.role == "student" ? studentMenuItems : instructorMenuItems} defaultSelectedKeys={["home"]} onClick={onClose} />

        <Divider style={{ margin: "12px 0" }} />

        <div className="px-4 pb-4">
            {user && <Signout signOutWord={" Sign Out"} />}
        </div>

        <div className="px-4 pt-4 mt-auto">
          <Text type="secondary" className="text-xs">
            © 2025 Gala. All rights reserved.
          </Text>
        </div>
      </Drawer>
      
    </>
  );
};

export default MobileSideBar;
