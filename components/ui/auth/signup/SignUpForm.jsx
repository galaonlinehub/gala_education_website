'use client';
import { Form, Input, Select, Button, Progress } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import {
  LuCheck,
  LuCircleCheck,
  LuEye,
  LuEyeOff,
  LuLock,
  LuMail,
  LuShieldCheck,
  LuUser,
} from 'react-icons/lu';
import { Contact } from '@/components/layout/Contact';
import { useAuth } from '@/hooks/data/useAuth';
import { disabilities } from '@/utils/data/disabilities';
import { preventCopyPaste } from '@/utils/fns/general';
import EmailVerification from './EmailVerification';
import SlickSpinner from '../../loading/template/SlickSpinner';
import { Link } from '@/src/i18n/navigation';

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const router = useRouter();
  const {
    getPasswordStatus,
    getPasswordRequirements,
    handlePasswordChange,
    onFinish,
    emailExists,
    passwordStrength,
    passwordFocused,
    setPasswordFocused,
    setEmailExists,
    mutation,
    setRegisterError,
    registerError,
  } = useAuth(password);

  const t = useTranslations('sign_up');
  const ht = useTranslations('home_page');

  return (
    <div className="flex justify-center lg:px-8 w-full">
      <div className="max-w-2xl lg:w-full">
        {registerError && (
          <div
            className={clsx(
              'p-1 border-[0.8px] text-xs text-center mb-4 w-full rounded-md',
              mutation.isSuccess
                ? 'border-green-700 text-green-400 bg-green-50'
                : mutation.isError
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-700 text-gray-700'
            )}
          >
            {registerError}
          </div>
        )}
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          onFieldsChange={() => {
            mutation.reset();
            setRegisterError('');
          }}
          layout="vertical"
          className="!space-y-4"
        >
          <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-4">
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: t('enter_first_name') }]}
              className="!mb-0"
            >
              <Input
                prefix={<LuUser className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('first_name')}
                className="!h-11 signup-input"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[{ required: true, message: t('enter_last_name') }]}
              className="!mb-0"
            >
              <Input
                prefix={<LuUser className="!text-gray-400" />}
                autoComplete="new-password"
                placeholder={ht('second_name')}
                className="!h-11 signup-input"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            validateTrigger={['onBlur', 'onChange', 'onSubmit']}
            rules={[
              { required: true, message: t('enter_email') },
              { type: 'email', message: t('valid_email_address') },
            ]}
            validateStatus={emailExists ? 'error' : undefined}
          >
            <div>
              <Input
                autoComplete="new-password"
                autoCapitalize="off"
                spellCheck="false"
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
                prefix={<LuMail className="!text-gray-400" />}
                placeholder={ht('email')}
                className="!h-11 signup-input"
                onChange={() => {
                  setEmailExists('');
                }}
              />
              {emailExists && <div className="ant-form-item-explain-error">{emailExists}</div>}
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: t('enter_password') },
              {
                validator: (_, value) => {
                  if (value && passwordStrength < 100) {
                    return Promise.reject(t('password_requirements'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div className="space-y-1">
              <Input.Password
                autoComplete="new-password"
                prefix={<LuLock className="!text-gray-400" />}
                placeholder={ht('password')}
                className="!h-11 signup-input"
                onChange={(e) => {
                  handlePasswordChange(e);
                  setPassword(e.target.value);
                }}
                onCopy={preventCopyPaste}
                onPaste={preventCopyPaste}
                onCut={preventCopyPaste}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                iconRender={(visible) => (
                  <span className="hover:!text-blue-500 !transition-colors">
                    {visible ? <LuEye /> : <LuEyeOff />}
                  </span>
                )}
              />
              {passwordFocused && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <Progress
                    percent={passwordStrength}
                    size="small"
                    strokeColor={getPasswordStatus().color}
                    className="!mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {getPasswordRequirements(password).map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <LuCircleCheck className={req.met ? '!text-green-500' : '!text-gray-300'} />
                        <span className="text-xs text-gray-600">{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t('confirm_your_password') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t('password_mismatch'));
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              prefix={<LuShieldCheck className="!text-gray-400" />}
              placeholder={ht('confirm_password')}
              className="!h-11 signup-input"
              iconRender={(visible) => (
                <span className="hover:!text-blue-500 !transition-colors">
                  {visible ? <LuEye /> : <LuEyeOff />}
                </span>
              )}
            />
          </Form.Item>

          <Form.Item name="special_needs">
            <Select
              placeholder={`${ht('special_needs')} (${ht('optional')})`}
              options={disabilities}
              className="!w-full !rounded-lg !min-h-[2.75rem]"
            />
          </Form.Item>

          <Form.Item initialValue="student" name="role" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item className="!mb-0">
            <Button
              disabled={
                mutation.isPending || !isAgreementChecked || mutation.isSuccess || mutation.isError
              }
              type="primary"
              htmlType="submit"
              className={
                '!flex !items-center !justify-center !py-4 !border-transparent !rounded-lg !w-full !h-11  !transition-colors !text-base !text-white !font-medium disabled:!cursor-not-allowed disabled:!opacity-70 !bg-[#010798] hover:!opacity-80'
              }
              icon={mutation.isPending ? null : <LuShieldCheck />}
            >
              {mutation.isPending ? (
                <SlickSpinner size={16} color="white" />
              ) : (
                <span>{t('create_account')}</span>
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-gray-600 mt-4 flex items-center justify-center gap-x-1 flex-wrap">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={isAgreementChecked}
              onChange={(e) => setIsAgreementChecked(e.target.checked)}
              className="appearance-none w-5 h-5 border-2 border-[#010798] rounded
               checked:bg-[#010798] cursor-pointer
               transition-all duration-300 ease-in-out
               hover:border-opacity-80 focus:ring-2 focus:ring-[#010798] focus:ring-opacity-40 flex items-center justify-center outline-none"
            />
            <LuCheck
              className={clsx(
                'absolute left-0.5 top-0.5',
                'pointer-events-none transition-all duration-300 ease-in-out',
                {
                  'text-white': isAgreementChecked,
                  'text-transparent': !isAgreementChecked,
                }
              )}
              size={16}
              strokeWidth={4}
            />
          </div>

          <span>{t('read_and_agreed')}</span>
          <Link className="text-blue-600 hover:text-blue-700" href={'/terms-and-privacy'}>
            {t('terms_of_service')}
          </Link>
          <span> {t('and')} </span>
          <Link href={'/terms-and-privacy'} className="text-blue-600 hover:text-blue-700">
            {t('privacy_policy')}
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600 mt-3 md:mt-4">
          <span>{t('already_have_account')}</span>
          <Link className=" text-blue-600 hover:text-blue-700 pl-1" href={'/signin'}>
            {t('sign_in')}
          </Link>
        </div>

        <Contact className="mt-3 md:mt-5" />
      </div>
      <EmailVerification />
    </div>
  );
};

export default SignUpForm;
