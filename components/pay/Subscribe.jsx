import { Steps, Drawer } from "antd";
import { useTranslations } from "next-intl";

import SignupPay from "@/components/ui/auth/signup/Payment";
import { useUser } from "@/hooks/data/useUser";
import { useTabNavigator } from "@/store/auth/signup";
import { useSubscribeStore } from "@/store/subscribeStore";

import ConfirmPlan from "../ui/auth/signup/ConfirmPlan";
import { Signout } from "../ui/auth/signup/Signout";

export default function Subscribe({ openDrawer }) {
  const { user } = useUser();
  const { activeTab } = useTabNavigator();

  const { subscribeOpen } = useSubscribeStore();

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  const sut = useTranslations('sign_up')
  const subt = useTranslations('subscription')

  const steps = [
    {
      title: sut('confirm_plan'),
      content: <ConfirmPlan />,
    },
    {
      title: sut('payment'),
      content: <SignupPay />,
    },
  ];

  return (
    <Drawer
      title={
        <div className="flex justify-between w-full gap-3">
          <div className="font-black text-sm sm:text-base md:text-xl lg:text-2xl line-clamp-2">
            {subt('subscribe_to_service')}
          </div>
          <Signout />
        </div>
      }
      placement="left"
      width={1124}
      centered={false}
      open={
        subscribeOpen ||
        (user?.role === "instructor" && !user?.has_free_trial && !user?.has_active_subscription)
      }
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
