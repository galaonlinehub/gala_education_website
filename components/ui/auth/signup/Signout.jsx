import { Modal, Button } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";

import { useDevice } from "@/hooks/misc/useDevice";
import { logout } from "@/utils/fns/auth";

import StuckSpinner from "../../loading/template/StuckSpinner";
import notificationService from "../../notification/Notification";

const Signout = ({ onCloseSidebar }) => {
  const [signoutVisible, setSignoutVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { width } = useDevice();

  const handleCancel = () => {
    setSignoutVisible(false);
  };

  const sot = useTranslations('sign_out');

  const handleSignout = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.href = "/";
    } catch (e) {
      notificationService.error({
        message: sot('sign_out_failed'),
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
      {width > 768 && (
          <button
            onClick={() => {
              setSignoutVisible(true);
            }}
            className="w-full border border-black hover:border-red-500  hover:text-red-500 font-medium flex rounded-md items-center justify-center gap-1 px-2 py-1"
          >
            <LuLogOut />
            <span className="text-sm line-clamp-1">{sot('sign_out')}</span>
          </button>
        )}

      {width <= 768 && (
          <Button
            onClick={() => {
              onCloseSidebar();
              setSignoutVisible(true);
            }}
            icon={<LuLogOut />}
            className="w-full !border-black text-red-500 hover:!text-red-500"
          >
            {sot('sign_out')}
          </Button>
        )}

      {/* {(
        (user?.role === "student") ||
        (user?.role === "instructor" && !user?.has_active_subscription)
      ) && (
          <button
            onClick={() => {
              setSignoutVisible(true);
            }}
            className="w-full border border-black hover:border-red-500 hover:text-red-500 font-medium flex rounded-md items-center justify-center gap-1 px-1 sm:px-2 py-1"
          >
            <LuLogOut className="text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm line-clamp-1"> {sot('sign_out')}</span>
          </button>
        )} */}

      <Modal
        width={400}
        title={
          <div className="flex items-center gap-1">
            <AiOutlineQuestionCircle size={24} className="!text-black" />
            <span className="text-black font-extrabold text-xl">{sot('sign_out')}</span>
          </div>
        }
        open={signoutVisible}
        onOk={handleSignout}
        okText={sot('confirm')}
        cancelText={sot('cancel')}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn-primary]:!bg-[#001840] [&.ant-btn-primary]:!border-0 [&.ant-btn-primary:not(:disabled):hover]:!bg-[#001840]/80 [&.ant-btn]:!text-white [&.ant-btn-primary:disabled]:!bg-[#001840]/60 [&.ant-btn-primary:disabled]:!border-0",
        }}
        cancelButtonProps={{
          disabled: loading,
          className:
            "[&.ant-btn:not(:disabled):hover]:!border-red-500 [&.ant-btn:not(:disabled):hover]:!text-red-500 [&.ant-btn:not(:disabled)]:!border-[#001840] [&.ant-btn]:!text-[#001840]",
        }}
      >
        <div className="mb-3 lg:mb-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center gap-1 font-black text-xl text-black">
              <StuckSpinner color="black" />
              <span className="animate-pulse">{sot('signing_out')}</span>
            </div>
          ) : (
            <p className="text-xs text-black">
              {sot('sign_out_confirm')}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export { Signout };
