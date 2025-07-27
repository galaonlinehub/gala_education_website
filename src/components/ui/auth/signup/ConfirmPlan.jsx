
import React, { useEffect, useState } from "react";
import { Card, Button, Typography, message, Badge, Divider } from "antd";
import { encrypt } from "@/src/utils/fns/encryption";
import { localStorageFn } from "@/src/utils/fns/client";
import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";
import { PLAN_CONFIRMED_KEY } from "@/src/config/settings";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import { Contact } from "@/src/components/layout/Contact";
import { PLAN_CONFIRMED_KEY } from "@/src/config/settings";
import { useAuth } from "@/src/hooks/data/useAuth";
import { useUser } from "@/src/hooks/data/useUser";
import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";
import { localStorageFn } from "@/src/utils/fns/client";
import { encrypt } from "@/src/utils/fns/encryption";

import SlickSpinner from "../../loading/template/SlickSpinner";
import { LuCircleCheckBig, LuPersonStanding, LuUser, LuX } from "react-icons/lu";
import SlickSpinner from "../../loading/template/SlickSpinner";
import { Contact } from "@/src/components/layout/Contact";
import { apiPost } from "@/src/services/api/api_service";
import { LoadingOutlined } from "@ant-design/icons";
import Subscribe from "@/src/components/Pay/Subscribe";
import { useSubscribeStore } from "@/src/store/subscribeStore";

const { Text } = Typography;

const ConfirmPlan = () => {
  const { setActiveTab, activeTab } = useTabNavigator();
  const { setAccountType, accountType } = useAccountType();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { plans, isFetchingPlans, errorOnFetchingPlans, savingsPercentage } =
    useAuth();
  const { user, refetchUser } = useUser();
  const currentUrl = usePathname();

  const { setSubscribeOpen } = useSubscribeStore();

  const isInstructor = accountType === "instructor";
  const isStudent = accountType === "student";

  const handleConfirmPayClick = (plan) => {
    const encriptedPlan = encrypt(plan);
    localStorageFn.set(PLAN_CONFIRMED_KEY, encriptedPlan);
    setActiveTab(activeTab + 1);
  };

  const activateFreeTrial = async () => {
    setLoading(true)
    const response = await apiPost('/create-user-pass', { email: user?.email })
    refetchUser()


    const { active } = response.data;

    if (active) {
      setLoading(false)
      messageApi.success('Your free trial has been activated!')
    } else {
      setLoading(false)
      messageApi.error('Free trial activation failed!')
    }

  }

  useEffect(() => {
    if (user) {
      const userAccountType = currentUrl.split("/")[1];
      if (userAccountType === "student" || userAccountType === "instructor") {
        setAccountType(userAccountType);
      }
    }
  }, [currentUrl, setAccountType, user]);

  console.log("User", user)

  return (
    <div className="!px-4 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center mt-4">
      {contextHolder}

      {isFetchingPlans ? (
        <div className="mt-32">
          <SlickSpinner color="#030DFE" />
        </div>
      ) : plans ? (
        <div className="flex flex-col items-center justify-center">

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center">
            {plans.map((plan) => (
              <div
                key={plan?.id}
                className="!w-full xs:!w-[65%] sm:!w-[370px] relative"
              >
                <Badge.Ribbon
                  text={`Save up to ${savingsPercentage(plans)}%`}
                  color="#010798"
                  placement="end"
                  className={
                    plan?.number_of_months !== 12
                      ? "hidden"
                      : "xs:![--ant-ribbon-offset:17.5%] "
                  }
                >
                  <Card className="!rounded-xl !shadow-none !transition-all !duration-300 hover:!shadow-sm !w-full !border-[#010798] [&_.ant-card-body]:!p-0 sm:[&_.ant-card-body]:!p-3 !py-4">
                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 p-3 md:p-6">
                      <div className="text-center overflow-hidden">
                        <div className="!mb-2 !font-bold text-base md:text-2xl">
                          {plan?.name}
                        </div>
                        <Text className="text-gray-500 text-xs sm:text-sm">
                          Non-refundable-payment
                        </Text>
                      </div>
                      <div className="text-center text-gray-700 text-xs sm:text-sm overflow-hidden">
                        {isInstructor ? (
                          <>
                            This fee grants you full access to Gala
                            Education&apos;s teaching platform, allowing you to
                            connect with students, manage lessons, and utilize
                            our advanced tools and resources to deliver
                            high-quality education.
                          </>
                        ) : (
                          <>
                            This fee grants you full access to Gala
                            Education&apos;s learning platform, allowing you to
                            connect with teachers, access lessons, track your
                            progress, and use our advanced tools and resources
                            to achieve high-quality learning.
                          </>
                        )}
                      </div>
                      <div className="text-center overflow-hidden">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <div className="text-base md:text-3xl !font-bold">
                            TZS
                          </div>
                          <div className="!font-bold text-xl md:text-3xl">
                            {plan.amount.toLocaleString()}
                          </div>
                        </div>
                        {plan?.number_of_months === 12 && (
                          <Text className="block text-sm mt-2">
                            That&apos;s just
                            <span className="font-black mx-1">
                              TZS {(plan.amount / 12).toLocaleString()}
                            </span>
                            per month
                          </Text>
                        )}
                      </div>
                      <div className="!mt-auto w-full flex items-center justify-center overflow-hidden">
                        <Button
                          type="primary"
                          onClick={() => handleConfirmPayClick(plan)}
                          className="!bg-[#010798] !rounded-lg !px-8 !font-semibold !text-xs !h-9 !flex !items-center !justify-center hover:!opacity-90 !transition-all !duration-300"
                          icon={<LuCircleCheckBig />}
                        >
                          CONTINUE
                        </Button>
                      </div>

                    </div>
                  </Card>
                </Badge.Ribbon>
              </div>

            ))}

          </div>
          {isStudent && (
            <div className="mt-5 text-center w-full lg:w-3/4">
              <span className="font-extrabold">Note</span>: This subscription
              package grants access to the platform and its network of available
              teachers. It does not cover individual class fees. Students are
              required to subscribe separately to each class they wish to attend
              after gaining access.
            </div>
          )}

          <div className="mt-5 flex flex-col w-full items-center justify-center">
            <Divider />
            <span className="font-bold"> {user?.has_free_trial ? '' : 'Or'}</span>
            <div className="py-4 flex flex-col gap-1">
              <Button loading={loading} onClick={user?.has_free_trial ? () => setSubscribeOpen(false) : activateFreeTrial}
                icon={user?.has_free_trial ? <LuX /> : <LuUser />}
                className="!font-semibold !bg-[#010798] !h-9 !text-white hover:!opacity-80">{user?.has_free_trial ? 'Close' : 'Continue with Free Trial'}</Button>
              <span className="text-xs text-blue-600">Free trial will only offer you limited access</span>
            </div>
            <Contact useBillingContact={true} />
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mt-8">
          <span className="font-bold text-sm md:text-2xl text-center">
            No any payment plan for a moment!!
          </span>
          <div className="my-3">
            <Contact useBillingContact={true} />
          </div>
          <Button onClick={() => router.push("/")}>Return Home</Button>
        </div>
      )}

    </div>
  );
};

export default ConfirmPlan;
