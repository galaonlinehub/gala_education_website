import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { Modal, Button } from "antd";
import { logout } from "@/src/utils/fns/auth";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import notificationService from "../../notification/Notification";
import { useDevice } from "@/src/hooks/useDevice";
import { useUser } from "@/src/hooks/useUser";
import SlickSpinner from "../../loading/template/SlickSpinner";

const Signout = ({ onCloseSidebar }) => {
  const [signoutVisible, setSignoutVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { width } = useDevice();
  const { user } = useUser();

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
    <div>
      {width > 768 && user?.has_active_subscription && (
        <button
          onClick={() => {
            setSignoutVisible(true);
          }}
          className="w-full border border-black hover:border-red-500  hover:text-red-500 font-medium flex rounded-md items-center justify-center gap-1 px-2 py-1"
        >
          <LuLogOut />
          <span className="text-sm line-clamp-1"> Sign out</span>
        </button>
      )}

      {width <= 768 && user?.has_active_subscription && (
        <Button
          onClick={() => {
            onCloseSidebar();
            setSignoutVisible(true);
          }}
          icon={<LuLogOut />}
          className="w-full !border-red-500 text-red-500 hover:!text-red-500"
        >
          Sign out
        </Button>
      )}

      {!user?.has_active_subscription && (
        <button
          onClick={() => {
            setSignoutVisible(true);
          }}
          className="w-full border border-black hover:border-red-500 hover:text-red-500 font-medium flex rounded-md items-center justify-center gap-1 px-1 sm:px-2 py-1"
        >
          <LuLogOut className="text-xs sm:text-sm" />
          <span className="text-xs sm:text-sm line-clamp-1"> Sign out</span>
        </button>
      )}

      <Modal
        width={400}
        title={
          <div className="flex items-center gap-1">
            <AiOutlineQuestionCircle size={24} className="!text-black" />
            <span className="text-black font-extrabold text-xl">Sign Out</span>
          </div>
        }
        open={signoutVisible}
        onOk={handleSignout}
        okText="Confirm"
        onCancel={handleCancel}
        okButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn-primary]:!bg-black [&.ant-btn-primary]:!border-[#000] [&.ant-btn-primary:not(:disabled):hover]:!bg-[#000]/80 [&.ant-btn]:!text-white [&.ant-btn-primary:disabled]:!bg-gray-300 [&.ant-btn-primary:disabled]:!border-gray-300",
        }}
        cancelButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn:not(:disabled):hover]:!border-red-500 [&.ant-btn:not(:disabled):hover]:!text-red-500 [&.ant-btn:not(:disabled)]:!border-[#001840]",
        }}
      >
        <div className="mb-3 lg:mb-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center gap-1 font-black text-xl text-black">
              <SlickSpinner color="black" />
              <span className="animate-pulse">Signing out... 😔</span>
            </div>
          ) : (
            <p className="text-xs text-black">
              Are you sure you want to sign out?
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export { Signout };
