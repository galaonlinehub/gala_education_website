import React from "react";
import { Card, Button, Typography, Tag } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTabNavigator, useSelectedPlan } from "@/src/store/auth/signup";
import { useAuth } from "@/src/hooks/useAuth";

const { Text, Title } = Typography;

const ConfirmPlan = () => {
  const setSelectedPlan = useSelectedPlan((state) => state.setSelectedPlan);
  const { setActiveTab } = useTabNavigator();
  const { plans, isFetchingPlans, errorOnFetchingPlans, savingsPercentage } =
    useAuth();

  const handleConfirmPayClick = (plan) => {
    setSelectedPlan(plan);
    setActiveTab(2);
  };

  return (
    <div className="!py-16 !px-4 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center mt-4 lg:mt-8">
      {isFetchingPlans ? (
        <LoadingOutlined className="text-xl !text-blue-600"  />
      ) : (
        plans.map((plan) => (
          <Card
            key={plan?.id}
            bordered
            className="!rounded-xl !shadow-xs !transition-all !duration-300 hover:!shadow-none !w-full sm:!w-[400px] relative !border-[#010798]"
          >
            {plan?.number_of_months === 12 && (
              <div className="absolute -top-3 right-4">
                <Tag color="blue" className="!px-3 !py-1 !text-sm !font-medium">
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
                  onClick={() => handleConfirmPayClick(plan.planId)}
                  className="!bg-[#010798] !rounded-lg !px-8 !font-semibold !text-xs !h-9 !min-w-[160px] !flex !items-center !justify-center hover:!opacity-90 !transition-all !duration-300"
                  icon={<CheckCircleOutlined />}
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ConfirmPlan;
