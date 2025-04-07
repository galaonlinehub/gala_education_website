import React, { useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { Card, Button, Typography, Tag } from "antd";
import { encrypt } from "@/src/utils/fns/encryption";
import { localStorageFn } from "@/src/utils/fns/client";
import { useAccountType, useTabNavigator } from "@/src/store/auth/signup";
import { PLAN_CONFIRMED_KEY } from "@/src/config/settings";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const { Text, Title } = Typography;

const ConfirmPlan = () => {
  const { setActiveTab } = useTabNavigator();
  const { setAccountType } = useAccountType();
  const router = useRouter();
  const { plans, isFetchingPlans, errorOnFetchingPlans, savingsPercentage } =
    useAuth();
  const { user } = useUser();
  const currentUrl = usePathname();
  const queryClient = useQueryClient();

  const handleConfirmPayClick = (plan) => {
    const encriptedPlan = encrypt(plan);
    localStorageFn.set(PLAN_CONFIRMED_KEY, encriptedPlan);
    setActiveTab(user ? 1 : 2);
  };

  useEffect(() => {
    if (user) {
      const accountType = currentUrl.slice(1);
      if (accountType === "student" || "instructor") {
        setAccountType(accountType);
      }
    }
  }, [currentUrl, queryClient, setAccountType, setActiveTab, user]);

  return (
    <div className="!px-4 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center mt-4">
      {isFetchingPlans ? (
        <LoadingOutlined className="text-xl !text-blue-600" />
      ) : plans ? (
        plans.map((plan) => (
          <Card
            key={plan?.id}
            bordered
            className="!rounded-xl !shadow-xs !transition-all !duration-300 hover:!shadow-none !w-full sm:!w-[370px] relative !border-[#010798]"
          >
            {plan?.number_of_months === 12 && (
              <div className="absolute -top-3 right-4">
                <Tag color="blue" className="!px-3 !py-1 !text-xs !font-medium">
                  Save up to {savingsPercentage(plans)}%
                </Tag>
              </div>
            )}
            <div className="!flex !flex-col !gap-12 !py-6 !px-6">
              <div className="text-center">
                <Title level={3} className="!mb-2 !font-bold">
                  {plan?.name}
                </Title>
                <Text className="text-gray-500 text-sm">
                  7-day-money-back-guarantee
                </Text>
              </div>
              <Text className="text-center text-gray-700">
                This fee grants you full access to Gala Education&apos;s
                teaching platform, allowing you to connect with students, manage
                lessons, and utilize our advanced tools and resources to deliver
                high-quality education.
              </Text>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Text className="!text-2xl !font-bold">TZS</Text>
                  <Text className="!text-3xl !font-bold">
                    {plan.amount.toLocaleString()}
                  </Text>
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
              <div className="!mt-auto w-full flex items-center justify-center">
                <Button
                  type="primary"
                  onClick={() => handleConfirmPayClick(plan)}
                  className="!bg-[#010798] !rounded-lg !px-8 !font-semibold !text-xs !h-9 !min-w-[160px] !flex !items-center !justify-center hover:!opacity-90 !transition-all !duration-300"
                  icon={<CheckCircleOutlined />}
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-bold text-sm md:text-2xl">
            {" "}
            No any payment plan for a moment!!
          </span>
          <Button type="link" className="text-xs text">
            Contact Support
          </Button>
          <Button onClick={() => router.push("/")}>Return Home</Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmPlan;
