'use client';
import { Card, Button, Typography, message, Badge, Divider } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { LuCircleCheckBig, LuUser, LuX } from 'react-icons/lu';

import { Contact } from '@/components/layout/Contact';
import { PLAN_CONFIRMED_KEY } from '@/config/settings';
import { useAuth } from '@/hooks/data/useAuth';
import { useUser } from '@/hooks/data/useUser';
import { apiPost } from '@/services/api/api_service';
import { useSubscribeStore } from '@/store/subscribeStore';
import { localStorageFn } from '@/utils/fns/client';
import { encrypt } from '@/utils/fns/encryption';
import { getRoleFromUrl } from '@/utils/fns/general';

import SlickSpinner from '../../loading/template/SlickSpinner';
import { usePlans } from '@/hooks/data/usePlans';

const { Text } = Typography;

const ConfirmPlan = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { savingsPercentage } = useAuth();
  const { plans, isFetchingPlans, errorOnFetchingPlans } = usePlans();
  const { user, refetchUser } = useUser();
  const currentUrl = usePathname();

  const { setSubscribeOpen } = useSubscribeStore();

  const accountType = getRoleFromUrl(currentUrl);

  const isInstructor = accountType === 'instructor';
  const isStudent = accountType === 'student';

  const handleConfirmPayClick = (plan) => {
    const encriptedPlan = encrypt(plan);
    localStorageFn.set(PLAN_CONFIRMED_KEY, encriptedPlan);
    router.push("/signup/instructor/plans/pay")
  };


  const activateFreeTrial = async () => {
    setLoading(true);
    const response = await apiPost('/create-user-pass', { email: user?.email });
    refetchUser();

    const { active } = response.data;

    if (active) {
      setLoading(false);
      messageApi.success(payt('free_trial_activation'));
    } else {
      setLoading(false);
      messageApi.error(payt('free_trial_activation_failed'));
    }
  };

  useEffect(() => {
    if (user) {
      const userAccountType = currentUrl.split('/')[2];
      if (userAccountType === 'student' || userAccountType === 'instructor') {
        //:TODO
      }
    }
  }, [currentUrl, user]);

  const payt = useTranslations('payments');
  const subt = useTranslations('subscription');

  const getPlanType = (type) => {
    if (type == 'Annually Plan') {
      return subt('annual_plan');
    } else if (type == 'Monthly Plan') {
      return subt('monthly_plan');
    }
  };

  console.log("plans are here", plans)

  return (
    <div className="!px-4 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center">
      {contextHolder}

      {isFetchingPlans ? (
        <div className="mt-32">
          <SlickSpinner color="#030DFE" />
        </div>
      ) : plans ? (
        <div className="flex flex-col items-center justify-center mt-4 md:mt-8 py-8">
          {accountType === 'student' && (
            <Link href={'/signin'} className="w-fit">
              {' '}
              <button className="rounded-full py-3 px-8 bg-[#010798] text-white my-6 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-500 hover:bg-[#010798]/90">
                Try Free Version
              </button>
            </Link>
          )}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center">
            {plans?.map((plan) => (
              <div key={plan?.id} className="!w-full xs:!w-[65%] sm:!w-[370px] relative">
                <Badge.Ribbon
                  text={`${subt('save_up_to')} ${savingsPercentage(plans)}%`}
                  color="#010798"
                  placement="end"
                  className={
                    plan?.number_of_months !== 12 ? 'hidden' : 'xs:![--ant-ribbon-offset:17.5%] '
                  }
                >
                  <Card className="!rounded-xl !shadow-none !transition-all !duration-300 hover:!shadow-sm !w-full !border-[#010798] [&_.ant-card-body]:!p-0 sm:[&_.ant-card-body]:!p-3 !py-4">
                    <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 p-3 md:p-6">
                      <div className="text-center overflow-hidden">
                        <div className="!mb-2 !font-bold text-base md:text-2xl">
                          {getPlanType(plan?.name)}
                        </div>
                        <Text className="text-gray-500 text-xs sm:text-sm">
                          {payt('non_refundable')}
                        </Text>
                      </div>
                      <div className="text-center text-gray-700 text-xs sm:text-sm overflow-hidden">
                        {isInstructor ? (
                          <>{payt('access_description')}</>
                        ) : (
                          <>{payt('access_description_student')}</>
                        )}
                      </div>
                      <div className="text-center overflow-hidden">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <div className="text-base md:text-3xl !font-bold">TZS</div>
                          <div className="!font-bold text-xl md:text-3xl">
                            {plan.amount.toLocaleString()}
                          </div>
                        </div>
                        {plan?.number_of_months === 12 && (
                          <Text className="block text-sm mt-2">
                            {payt('thats_just')}
                            <span className="font-black mx-1">
                              TZS {(plan.amount / 12).toLocaleString()}
                            </span>
                            {payt('per_month')}
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
                          {payt('continue')}
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
              <span className="font-extrabold">{payt('note')}</span>:{' '}
              {payt('subscription_package_description')}
            </div>
          )}

          <div className="mt-5 flex flex-col w-full items-center justify-center">
            <Divider />
            <span className="font-bold"> {user?.has_free_trial  ? '' : 'Or'}</span>
            <div className="py-4 flex flex-col gap-1">
              <Button
                loading={loading}
                onClick={user?.has_free_trial ? () => setSubscribeOpen(false) : activateFreeTrial}
                icon={user?.has_free_trial ? <LuX /> : <LuUser />}
                className="!font-semibold !bg-[#010798] !h-9 !text-white hover:!opacity-80 !border-none"
              >
                {user?.has_free_trial ? subt('close') : subt('continue_with_free_trial')}
              </Button>
              <span className="text-xs text-blue-600">{payt('free_trial_access')}</span>
            </div>
            <Contact useBillingContact={true} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mt-8">
          <span className="font-bold text-sm md:text-2xl text-center">
            {payt('no_payment_plan')}
          </span>
          <div className="my-3">
            <Contact useBillingContact={true} />
          </div>
          <Button onClick={() => router.push('/')}>{payt('return_home')}</Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmPlan;
