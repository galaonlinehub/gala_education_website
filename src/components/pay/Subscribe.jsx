import { Modal, Steps, Button, Drawer } from "antd";
import { createStyles, useTheme } from "antd-style";
import { useState } from "react";

import SignupPay from "@/src/components/ui/auth/signup/Payment";
import { useUser } from "@/src/hooks/data/useUser";
import { useTabNavigator } from "@/src/store/auth/signup";
import { useSubscribeStore } from "@/src/store/subscribeStore";

import ConfirmPlan from "../ui/auth/signup/ConfirmPlan";
import { Signout } from "../ui/auth/signup/Signout";

export default function Subscribe({ openDrawer }) {
  const { user } = useUser();
  const { activeTab } = useTabNavigator();

  const { subscribeOpen } = useSubscribeStore();

  console.log("User data", user)

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    // content: {
    //   top: "-80px",
    // },
  };

  const steps = [
    {
      title: "Confirm Plan",
      content: <ConfirmPlan />,
    },
    {
      title: "Payment",
      content: <SignupPay />,
    },
  ];

  return (
    <Drawer
      title={
        <div className="flex justify-between w-full gap-3">
          <div className="font-black text-sm sm:text-base md:text-xl lg:text-2xl line-clamp-2">
            Subscribe To The Service
          </div>
          <Signout />
        </div>
      }
      placement="left"
      width={1124}
      centered={false}
      open={subscribeOpen || (!user?.has_free_trial && !user?.has_active_subscription)}
      closable={false}
      styles={modalStyles}
    >
      <Steps current={activeTab} responsive={false} direction={"horizontal"}>
        {steps.map((step, index) => (
          <Steps.Step key={index} title={step.title} />
        ))}
      </Steps>
      <div className="md:mt-6">{steps[activeTab].content}</div>
    </Drawer>
  );
}
