import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";

import { Modal, Button } from "antd";
import { PiWarningCircleBold } from "react-icons/pi";
import { logout } from "@/src/utils/fns/auth";
import { useRouter } from "next/navigation";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { LogoutOutlined } from "@ant-design/icons";
import notificationService from "../../notification/Notification";



const Signout = ({signOutWord}) => {
  const [signoutVisible, setSignoutVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    setSignoutVisible(false);
  };

  const handleSignout = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.href = "/";
    } catch (e) {
      notificationService.error({
        message: "Sign Out Failed",
        description: e.message,
        position: "top",
      });
    } finally {
      setLoading(false);
      setSignoutVisible(false);
    }
  };

  return (
    <div className="">
      <LuLogOut
        size={18}
        style={{ strokeWidth: 3 }}
        className="cursor-pointer hidden md:block"
        onClick={() => setSignoutVisible(true)}
      />

       <Button type="default" danger icon={<LogoutOutlined />} onClick={() => setSignoutVisible(true)} className="w-full block md:hidden items-center justify-center">
           {signOutWord}
       </Button>

      <Modal
        width={400}
        title={
          !loading && (
            <div className="flex items-center gap-1">
              <AiOutlineQuestionCircle size={24} className="text-[#001840]" />
              <span className="text-[#001840] font-extrabold text-xl">
                Sign Out
              </span>
            </div>
          )
        }
        open={signoutVisible}
        onOk={handleSignout}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn-primary]:!bg-[#001840] [&.ant-btn-primary]:!border-[#000] [&.ant-btn-primary:not(:disabled):hover]:!bg-[#000]/80 [&.ant-btn]:!text-white [&.ant-btn-primary:disabled]:!bg-gray-300 [&.ant-btn-primary:disabled]:!border-gray-300",
        }}
        cancelButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn:not(:disabled):hover]:!border-red-500 [&.ant-btn:not(:disabled):hover]:!text-red-500 [&.ant-btn:not(:disabled)]:!border-[#001840]",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center font-black text-xl pt-6 pb-2 animate-pulse text-[#001840]">
            Signing out... 😔
          </div>
        ) : (
          <p className="text-xs text-[#001840]">Are you sure you want to sign out?</p>
        )}
      </Modal>
    </div>
  );
};

export { Signout };
