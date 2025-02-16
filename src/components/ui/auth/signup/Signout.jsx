import React, { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { Modal } from "antd";
import { PiWarningCircleBold } from "react-icons/pi";
import { logout } from "@/src/utils/fns/auth";
import { useRouter } from "next/navigation";

const Signout = () => {
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
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setSignoutVisible(false);
    }
  };

  return (
    <div>
      <LuLogOut
        size={18}
        style={{ strokeWidth: 3 }}
        className="cursor-pointer"
        onClick={() => setSignoutVisible(true)}
      />
      <Modal
        width={400}
        title={
          !loading && (
            <div className="flex items-center gap-1">
              <PiWarningCircleBold
                style={{ strokeWidth: 3 }}
                size={24}
                className="text-blue-700"
              />
              <span className="text-black font-black">Sign Out</span>
            </div>
          )
        }
        open={signoutVisible}
        onOk={handleSignout}
        onCancel={handleCancel}
        okButtonProps={{ disabled: loading }}
        cancelButtonProps={{ disabled: loading }}
      >
        {loading ? (
          <div className="flex justify-center items-center font-black text-xl pt-6 pb-2 animate-pulse">
            Signing out... 😔
          </div>
        ) : (
          <p className="text-xs">Are you sure you want to sign out?</p>
        )}
      </Modal>
    </div>
  );
};

export { Signout };
