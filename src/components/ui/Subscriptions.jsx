
import { Card } from "antd";
import React from "react";
import {
  LuCalendar,
  LuCircleCheck,
  LuClock,
  LuCreditCard,
  LuArchive,
} from "react-icons/lu";

const Subscriptions = () => {
  const subscriptions = [
    {
      id: 1,
      status: "Current",
      type: "Monthly Subscription",
      amount: "TZS 15,000",
      created: "Apr 7, 2025",
      start: "Apr 7, 2025",
      end: "Apr 6, 2026",
      isCurrent: true,
    },
    {
      id: 2,
      status: "Next",
      type: "Annual Subscription",
      amount: "TZS 30,000",
      created: "Apr 8, 2025",
      start: "Apr 7, 2026",
      end: "Apr 6, 2027",
      isCurrent: false,
    },
    {
      id: 3,
      status: "Previous",
      type: "Monthly Subscription",
      amount: "TZS 12,000",
      created: "Mar 1, 2024",
      start: "Mar 1, 2024",
      end: "Feb 28, 2025",
      isCurrent: false,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Current":
        return <LuCircleCheck className="h-4 w-4 text-green-400 mr-1" />;
      case "Next":
        return <LuClock className="h-4 w-4 text-yellow-400 mr-1" />;
      case "Previous":
        return <LuArchive className="h-4 w-4 text-gray-400 mr-1" />;
      default:
        return <LuCircleCheck className="h-4 w-4 text-green-400 mr-1" />;
    }
  };

  const SubscriptionItem = ({ sub }) => (
    <Card
      className={`!flex !items-center !w-full !mb-4 !overflow-hidden ${
        sub.isCurrent
          ? "!bg-gradient-to-r from-[#001840] to-[#003380] !text-white"
          : "!bg-white !text-gray-800"
      }`}
      styles={{ body: { padding: "16px", width: "100%" } }}
    >
      <div className="flex w-full flex-col lg:flex-row lg:items-center gap-2 md:gap-3 lg:gap-0">
        <div className="flex flex-col md:flex-row md:items-center xl:w-1/3 gap-2 lg:gap-0">
          <div
            className={`flex items-center justify-center mr-4 px-3 py-1 rounded-md ${
              sub.isCurrent ? "bg-white bg-opacity-10" : "bg-gray-200"
            } shrink-0`}
          >
            {getStatusIcon(sub.status)}
            <span className="text-sm font-bold">{sub.status}</span>
          </div>

          <div
            className={`h-8 w-px ${
              sub.isCurrent ? "bg-white bg-opacity-20" : "bg-gray-300"
            } mr-4 shrink-0 hidden md:block`}
          ></div>

          <div className="flex items-center mr-6 shrink-0">
            <LuCreditCard
              className={`h-5 w-5 ${
                sub.isCurrent ? "text-white" : "text-gray-600"
              } mr-2`}
            />
            <span className="font-medium">{sub.type}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row lg:items-center justify-between mt-4 md:mt-0 gap-2 lg:gap-0">
          <div className="font-black text-xl">{sub.amount}</div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Created Date */}
            <div className="flex items-center shrink-0">
              <LuClock
                className={`h-4 w-4 ${
                  sub.isCurrent ? "text-gray-200" : "text-black"
                } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${
                    sub.isCurrent ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Created
                </span>
                <span className="text-sm font-medium block">{sub.created}</span>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex items-center shrink-0">
              <LuCalendar
                className={`h-4 w-4 ${
                  sub.isCurrent ? "text-blue-300" : "text-blue-500"
                } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${
                    sub.isCurrent ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Start
                </span>
                <span className="text-sm font-medium block">{sub.start}</span>
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-center shrink-0">
              <LuCalendar
                className={`h-4 w-4 ${
                  sub.isCurrent ? "text-orange-300" : "text-orange-500"
                } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${
                    sub.isCurrent ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  End
                </span>
                <span className="text-sm font-medium block">{sub.end}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <div className="text-xl font-black mb-3 -ml-4">Your Subscriptions</div>
      {/* Active Subscriptions */}
      <Card className="mb-6">
        <div className="font-bold text-xl mb-4 text-gray-800">
          Active Subscriptions
        </div>
        {subscriptions
          .filter((sub) => sub.status === "Current")
          .map((sub) => (
            <SubscriptionItem key={sub.id} sub={sub} />
          ))}
        <div className="font-light text-sm mt-6 mb-2 text-gray-800">
          Next Subscriptions
        </div>
        {subscriptions
          .filter((sub) => sub.status === "Next")
          .map((sub) => (
            <SubscriptionItem key={sub.id} sub={sub} />
          ))}
      </Card>

      {/* Previous Subscriptions */}
      <Card className="">
        <div className="font-bold text-xl mb-4 text-gray-800">
          Previous Subscriptions
        </div>
        {subscriptions
          .filter((sub) => sub.status === "Previous")
          .map((sub) => (
            <SubscriptionItem key={sub.id} sub={sub} />
          ))}
      </Card>
    </div>
  );
};

export default Subscriptions;
