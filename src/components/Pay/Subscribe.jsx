import { useState } from "react";
import { useUser } from "@/src/hooks/useUser";
import { Modal, Steps, Button } from "antd";
import ConfirmPlan from "../ui/auth/signup/ConfirmPlan";
import SignupPay from "@/src/components/ui/auth/signup/Payment";
import { useTabNavigator } from "@/src/store/auth/signup";

import { createStyles, useTheme } from "antd-style";
import { Signout } from "../ui/auth/signup/Signout";
const useStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    // maxHeight: 'calc(100vh-0px)',
    overflowY: "auto",
  },
  "my-modal-mask": {
    boxShadow: `inset 0 0 15px #fff`,
    overflow: "hidden",
    display: "flex",
  },
  "my-modal-header": {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },

  "my-modal-content": {
    border: "1px solid #333",
    // maxHeight: 'calc(100vh - 0px)',
    display: "flex",
    flexDirection: "column",
  },
  "modal-container": {
    overflow: "hidden",
  },
}));

export default function Subscribe() {
  const user = useUser();
  const { activeTab } = useTabNavigator();
  const { styles } = useStyle();

  const classNames = {
    body: styles["my-modal-body"],
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
    container: styles["modal-container"],
  };

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      top: "-80px",
    },
  };

  const steps = [
    {
      title: "Confirm Plan",
      content: <ConfirmPlan className="-my-16" />,
    },
    {
      title: "Payment",
      content: <SignupPay />,
    },
  ];

  return (
    <Modal
      title={
        <div className="flex justify-between w-full">
          <div className="font-black text-xl lg:text-2xl pb-3">
            Subscribe To The Service
          </div>
          <Signout />
        </div>
      }
      width={1124}
      centered={false}
      open={!user?.has_active_subscription}
      footer={null}
      closable={false}
      classNames={classNames}
      styles={modalStyles}
      rootClassName={styles["modal-container"]}
    >
      <Steps current={activeTab} responsive={false} direction={"horizontal"}>
        {steps.map((step, index) => (
          <Steps.Step key={index} title={step.title} />
        ))}
      </Steps>

      <div className="mt-6 overflow-y-auto max-h-[calc(100vh-300px)]">
        {steps[activeTab].content}
      </div>
    </Modal>
  );
}
