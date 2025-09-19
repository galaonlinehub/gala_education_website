'use client';
import { Modal } from 'antd';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { LuEye, LuEyeOff } from 'react-icons/lu';

import Link from 'next/link';
import { Contact } from '@/components/layout/Contact';
import SlickSpinner from '@/components/ui/loading/template/SlickSpinner';
import { useLogin } from '@/hooks/ui/useLogin';
import { preventCopyPaste } from '@/utils/fns/general';
import LoginVectorSvg from '@/utils/vector-svg/sign-in/LoginVectorSvg';
import ChooseAccount from '@/components/ui/auth/signup/ChooseAccount';

const SignInPage = () => {
  const {
    localFeedback,
    loginMutation,
    onSubmit,
    register,
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    loginModal,
    errors,
    setLoginModal,
  } = useLogin();

  const t = useTranslations('signIn');

  return (
    <div className="px-6 md:px-8 lg:px-12 xl:px-16 flex justify-center text-sm">
      <div className="flex flex-col items-center pt-14 gap-2 lg:gap-3 w-full max-w-xl">
        <span className="font-black text-xs md:text-base">{t('signIn')}</span>
        <span className="font-black text-2xl md:text-4xl">{t('welcomeBack')}</span>
        <span className="text-xs md:text-sm font-medium text-center px-4 sm:px-8">
          {t('welcomeMessage')}
        </span>

        <motion.div
          animate={loginMutation.isError ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.6 }}
          key={loginMutation.isError ? 'error-shake' : 'no-shake'}
          className="w-full"
        >
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full gap-2 md:gap-3 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {localFeedback.show && (
                <motion.div
                  key={localFeedback.status}
                  initial={
                    localFeedback.status === 'error'
                      ? { opacity: 0, y: -5 }
                      : { opacity: 0, scale: 0.95 }
                  }
                  animate={
                    localFeedback.status === 'error'
                      ? { opacity: 1, y: 0 }
                      : { opacity: 1, scale: 1.08 }
                  }
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    'w-full text-xs font-medium text-center py-2 px-3 border-[0.8px] rounded-lg shadow-sm',
                    loginMutation.isError
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : loginMutation.isSuccess
                        ? 'border-green-500 text-green-600 bg-green-50'
                        : ''
                  )}
                >
                  {localFeedback.message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="font-black text-xs lg:text-sm">
                {t('emailLabel')} *
              </label>
              <input
                id="email"
                {...register('email', {
                  required: t('email.required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('email.invalid'),
                  },
                })}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className={`h-input-heigt border focus:border-[2px] rounded-md focus:outline-none p-2 border-[#030DFE] w-full text-sm ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-[12px] font-normal">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full relative">
              <label tmlFor="password" className="font-black text-xs lg:text-sm">
                {t('passwordLabel')} *
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  onCopy={preventCopyPaste}
                  onPaste={preventCopyPaste}
                  onCut={preventCopyPaste}
                  {...register('password', {
                    required: t('password.required'),
                  })}
                  autoComplete="new-password"
                  autoCorrect="off"
                  className={`h-input-heigt border focus:border-[2px] rounded-md focus:outline-none p-2 pr-10 w-full text-sm ${
                    errors.password ? 'border-red-500' : 'border-[#030DFE]'
                  }`}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-[12px] font-normal">
                  {errors.password.message}
                </span>
              )}
            </div>

            <span className="font-bold text-sm self-end">
              {t('forgotPassword.prefix')}
              <Link
                href={'/forgot-password'}
                className="font-bold sm:text-sm text-[#030DFE] ml-2 cursor-pointer"
              >
                {t('forgotPassword.link')}?
              </Link>
            </span>

            <button
              type="submit"
              disabled={loginMutation.isPending || loginMutation.isError || loginMutation.isSuccess}
              className="text-white text-base py-2 bg-[#030DFE] rounded-md w-full font-bold mt-5 disabled:opacity-50 flex items-center justify-center gap-2 disabled:cursor-not-allowed h-11"
            >
              {loginMutation.isPending ? <SlickSpinner size={14} color="white" /> : t('signIn')}
            </button>
          </motion.form>
        </motion.div>
        <div className="text-xs font-light mt-1 md:mt-2 flex gap-2">
          {t('noAccount.prefix')}

          <ChooseAccount
            btnText={t('noAccount.link')}
            textColor={'#030DFE'}
            btnClassname={'text-[#030DFE] font-semibold'}
            trigger={'click'}
          />
        </div>

        <div className="flex items-center justify-center mt-8">
          <Contact />
        </div>
      </div>
      <LoginModal
        open={loginModal.open}
        message={loginModal.message}
        setLoginModal={setLoginModal}
      />

      <LoginVectorSvg />
    </div>
  );
};

export default SignInPage;

const LoginModal = ({ open, message, setLoginModal }) => (
  <Modal
    open={open}
    footer={null}
    onCancel={() =>
      setLoginModal((p) => ({
        ...p,
        open: false,
        message: '',
      }))
    }
    title={
      <div className="font-bold w-full text-center text-2xl text-gray-800">Gala Education</div>
    }
    className="rounded-lg"
  >
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="text-lg font-semibold text-center text-gray-900">{message}</div>
      <div className="flex flex-col gap-2 text-center">
        <p className="text-sm text-gray-600">
          We are currently verifying the documents you submitted during registration.
        </p>
        <p className="text-sm text-gray-600">Verification takes 1 to 2 business days.</p>
        <p className="text-sm text-gray-600">
          We&apos;ll reach out to you via email once the process is complete — please check your
          inbox regularly.
        </p>
      </div>
      <div className="mt-4">
        <Contact />
      </div>
    </div>
  </Modal>
);
