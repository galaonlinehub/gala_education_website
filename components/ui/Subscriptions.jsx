import { Card, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import {
  LuCalendar,
  LuClock,
  LuCreditCard,
  LuArchive,
  LuPlus,
  LuHistory,
  LuShield,
  LuCrown,
  LuShieldCheck,
  LuOctagonAlert,
} from "react-icons/lu";

import { useUserSubscriptions } from "@/hooks/data/useSubscription";
import { useSubscribeStore } from "@/store/subscribeStore";

import SlickSpinner from "./loading/template/SlickSpinner";

const Subscriptions = () => {
  const { current, previous, next } = useUserSubscriptions();
  const { setSubscribeOpen } = useSubscribeStore();

  const subt = useTranslations('subscription');

  return (
    <div className="xl:px-6 py-2 rounded-xl">
      <div className="text-lg md:text-2xl font-black mb-1 text-black flex items-center">
        {subt('subscription_overview')}
      </div>
      <div className="text-xs text-black mb-6 lg:mb-8 px-1">
        {subt('subscription_description')}
      </div>

      {/* Active Subscriptions */}
      <div className="mb-6 transition-all duration-300">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex flex-col xxs:flex-row xxs:justify-between gap-2 w-full mb-4 overflow-hidden">
            <div className="font-bold text-base md:text-xl text-black flex items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#001840]/10 mr-2">
                <LuShieldCheck className="h-4 w-4" />
              </div>
              {subt('active_subscriptions')}
            </div>
            <Tooltip
              color="#001840"
              title={
                <div className="text-xs">
                  {subt('feature_unavailable')}
                </div>
              }
            >
              <button
                disabled={true}
                className="flex items-center justify-center bg-[#001840] hover:bg-[#002060] text-white font-medium py-1 xs:py-2 px-2 sm:px-4 xs:gap-2 rounded-3xl xs:rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-80 overflow-hidden"
              >
                <LuPlus size={18} />
                <div className="text-white font-bold text-xs sm:text-sm">
                  {subt('add_subscription')}
                </div>
              </button>
            </Tooltip>
          </div>
          {current.isFetching && <Loader />}
          {current.isError && (
            <ErrorState message={subt('failed_to_load_current_subscription')} />
          )}
          {current.isSuccess && current.data?.length === 0 && (
            <EmptyState
              icon={<LuCrown className="h-12 w-12 text-[#001840]/40" />}
              message={subt('no_active_subscriptions')}
              subtitle={subt('subscribe_to_unlock_premium_features')}
              actionText={subt('add_subscription')}
              actionIcon={<LuPlus className="h-4 w-4 mr-1" />}
              action={() => setSubscribeOpen(true)}
            />
          )}
          {current.data?.map((sub) => (
            <SubscriptionItem
              key={sub.id}
              sub={{ ...sub, status: subt('current'), isCurrent: true }}
            />
          ))}
        </div>

        <div className="flex flex-col items-start justify-center w-full">
          <div className="font-medium text-sm mt-6 mb-2 flex items-center">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#001840]/10 mr-2">
              <LuClock className="h-3 w-3" />
            </div>
            {subt('next_subscriptions')}
          </div>
          {next.isFetching && <Loader />}
          {next.isError && (
            <ErrorState message={subt('failed_to_load_next_subscription')} />
          )}
          {next.isSuccess && next.data?.length === 0 && (
            <div className="text-gray-500 text-sm px-4 py-3 italic bg-[#001840]/5 rounded-md w-full border-l-2 border-[#001840]/30">
              {subt('no_upcoming_subscriptions')}
            </div>
          )}
          {next.data?.map((sub) => (
            <SubscriptionItem key={sub.id} sub={{ ...sub, status: "Next" }} />
          ))}
        </div>
      </div>

      {/* Previous Subscriptions */}

      <div className="border-0">
        <div className="font-bold text-xl mb-4  flex items-center">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#001840]/10 mr-2">
            <LuHistory className="h-4 w-4" />
          </div>
          {subt('previous_subscriptions')}
        </div>
        {previous.isFetching && <Loader />}
        {previous.isError && (
          <ErrorState message={subt('failed_to_load_previous_subscription')} />
        )}
        {previous.isSuccess && previous.data?.length === 0 && (
          <EmptyState
            icon={<LuHistory className="h-12 w-12" />}
            message={subt('no_subscription_history_found')}
            subtitle={subt('completed_subscriptions_info')}
          />
        )}
        {previous.data?.map((sub) => (
          <SubscriptionItem key={sub.id} sub={{ ...sub, status: subt('previous') }} />
        ))}
      </div>
    </div>
  );
};

const SubscriptionItem = ({ sub }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case subt('current'):
        return <LuShieldCheck className="h-4 w-4 text-green-400 mr-1" />;
      case subt('previous'):
        return <LuClock className="h-4 w-4 text-yellow-400 mr-1" />;
      case subt('next'):
        return <LuArchive className="h-4 w-4 text-gray-400 mr-1" />;
      default:
        return <LuShield className="h-4 w-4 text-green-400 mr-1" />;
    }
  };

  const subt = useTranslations('subscription');

  const getPlanType = (type) => {
    if (type == 'Annually Plan') {
      return subt('annual_plan')
    } else if (type == 'Monthly Plan') {
      return subt('monthly_plan')
    }
  }
  return (
    <Card
      className={`!flex !items-center !w-full !mb-4 !overflow-hidden hover:!shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${sub.isCurrent
        ? "!bg-gradient-to-r from-[#001840] to-[#003380] !text-white"
        : "!bg-white !text-gray-800"
        }`}
      styles={{ body: { padding: "18px", width: "100%" } }}
    >
      <div className="flex w-full flex-col lg:flex-row lg:items-center gap-2 md:gap-3 lg:gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-0">
          <div
            className={`flex items-center justify-center mr-4 px-4 py-1 rounded-full ${sub.isCurrent
              ? "bg-white bg-opacity-15 backdrop-blur-sm"
              : "bg-[#001840]/5"
              } shrink-0 shadow-sm`}
          >
            {getStatusIcon(sub.status)}
            <span className="text-sm font-bold">{sub.status}</span>
          </div>

          <div
            className={`h-8 w-px ${sub.isCurrent ? "bg-white bg-opacity-20" : "bg-gray-300"
              } mr-4 shrink-0 hidden md:block`}
          ></div>

          <div className="flex items-center mr-6 shrink-0">
            <LuCreditCard
              className={`h-5 w-5 ${sub.isCurrent ? "text-white" : "text-gray-600"
                } mr-2`}
            />
            <span className="font-medium">{getPlanType(sub.type)}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col xl:flex-row xl:items-center justify-between mt-4 md:mt-0 gap-3 xl:gap-0">
          <div className="font-black text-base md:text-lg lg:text-xl">
            {sub.amount?.toLocaleString("en-TZ", {
              style: "currency",
              currency: "TZS",
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Created Date */}
            <div className="flex items-center shrink-0">
              <LuClock
                className={`h-4 w-4 ${sub.isCurrent ? "text-gray-200" : "text-black"
                  } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${sub.isCurrent ? "text-gray-300" : "text-gray-500"
                    }`}
                >
                  {subt('created')}
                </span>
                <span className="text-sm font-medium block">{sub.created}</span>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex items-center shrink-0">
              <LuCalendar
                className={`h-4 w-4 ${sub.isCurrent ? "text-blue-300" : "text-blue-500"
                  } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${sub.isCurrent ? "text-gray-300" : "text-gray-500"
                    }`}
                >
                  {subt('start')}
                </span>
                <span className="text-sm font-medium block">{sub.start}</span>
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-center shrink-0">
              <LuCalendar
                className={`h-4 w-4 ${sub.isCurrent ? "text-orange-300" : "text-orange-500"
                  } mr-2`}
              />
              <div>
                <span
                  className={`text-xs ${sub.isCurrent ? "text-gray-300" : "text-gray-500"
                    }`}
                >
                  {subt('end')}
                </span>
                <span className="text-sm font-medium block">{sub.end}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const EmptyState = ({
  icon,
  message,
  subtitle,
  actionText,
  actionIcon,
  action = null,
}) => (
  <div className="flex flex-col items-center justify-center py-10 px-4 w-full bg-gradient-to-br from-[#001840]/5 to-[#001840]/10 rounded-lg border border-[#001840]/10">
    <div className="mb-4 p-4 bg-white rounded-full shadow-md">{icon}</div>
    <p className="text-lg font-medium mb-1">{message}</p>
    {subtitle && <p className="text-sm mb-4 text-gray-500">{subtitle}</p>}
    {actionText && (
      <button
        className="flex items-center justify-center bg-[#001840] hover:bg-[#002060] text-white font-medium py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        onClick={action || undefined}
      >
        {actionIcon}
        {actionText}
      </button>
    )}
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex items-center justify-center py-4 px-6 w-full bg-red-50 rounded-lg border border-red-400">
    <div className="flex items-center justify-center h-8 w-8 bg-red-100 rounded-full mr-2">
      <LuOctagonAlert className="h-5 w-5 text-red-500" />
    </div>
    <p className="text-sm text-red-600">{message}</p>
  </div>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center w-full py-10">
    <SlickSpinner size={25} color="blue" />
  </div>
);

export default Subscriptions;
