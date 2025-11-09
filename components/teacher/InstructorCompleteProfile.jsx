import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Avatar,
  Upload,
  message,
} from "antd";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { LuCamera, LuUser } from "react-icons/lu";

import { useGrade } from "@/hooks/data/useGrade";
import { useSpecialNeeds } from "@/hooks/data/useSpecialNeeds";
import { useSubject } from "@/hooks/data/useSubject";
import { useUser } from "@/hooks/data/useUser";
import { LANGUAGES } from "@/utils/data/lang";
import {
  handlePhoneInput,
  reformat_phone_number,
} from "@/utils/fns/format_phone_number";

import { Stage, Success, Verify } from "../student/CompleteProfile";
import { Signout } from "../ui/auth/signup/Signout";
import SlickSpinner from "../ui/loading/template/SlickSpinner";
const { TextArea } = Input;

const InstructorCompleteProfile = () => {
  const [status, setStatus] = useState(Stage.SAVE);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const {
    isUpdatingProfile,
    updateProfileSuccess,
    user,
    updateProfile,
    updateProfileReset,
    updateProfileError,
  } = useUser();

  const tprof = useTranslations('teacher_profile')

  const render = () => {
    switch (status) {
      case Stage.SAVE:
      case Stage.EDIT:
        return (
          <Save
            user={user}
            isUpdatingProfile={isUpdatingProfile}
            updateProfileSuccess={updateProfileSuccess}
            updateProfile={updateProfile}
            updateProfileReset={updateProfileReset}
            updateProfileError={updateProfileError}
            status={status}
            setStatus={setStatus}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case Stage.VERIFY:
        return <Verify phone_number={phoneNumber} setStatus={setStatus} />;
      case Stage.SUCCESS:
        return <Success />;
    }
  };

  return (
    <Modal
      title={
        <div className="flex flex-col xs:flex-row justify-between xs:items-center w-full gap-3 mb-4">
          <div>{tprof('complete_profile')}</div>
          <div className="self-end">
            <Signout />
          </div>
        </div>
      }
      open={user?.role === 'instructor' && !user?.completed_profile && user?.has_active_subscription}
      closable={false}
      maskClosable={false}
      footer={null}
      keyboard={false}
    >
      {render()}
    </Modal>
  );
};

const Save = ({
  user,
  isUpdatingProfile,
  updateProfileSuccess,
  updateProfile,
  updateProfileReset,
  setPhoneNumber,
  updateProfileError,
  setStatus,
  status,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const { special_needs } = useSpecialNeeds();
  const { subjects } = useSubject();
  const { grades } = useGrade();
  const isEditMode = status === Stage.EDIT;

  const [messageApi, contextHolder] = message.useMessage();

  const tprof = useTranslations('teacher_profile')
  const sut = useTranslations('sign_up')
  const donate = useTranslations('donate')
  const ht = useTranslations('home_page')
  const sct = useTranslations('student_classes')

  const handleFormSubmit = async (values) => {

    try {
      const formData = new FormData();

      if (!isEditMode) {
        if (!imageFile) {
          messageApi.info(tprof('upload_profile_pic'));
          return;
        }
        formData.append("profile_picture", imageFile);
      }

      Object.entries(values).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        if (key === "phone_number") {
          const formattedPhone = `255${reformat_phone_number(value)}`;
          setPhoneNumber(formattedPhone);
          formData.append("phone_number", formattedPhone);
        } else if (!isEditMode) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(`${key}[]`, item);
            });
          } else {
            formData.append(key, value);
          }
        }
      });

      updateProfile(formData, {
        onSuccess: () => {
          setStatus(Stage.VERIFY);
          messageApi.success(tprof('profile_update_success'));
          setImageFile(null);
          form.resetFields();
        },
        onError: () => {
          messageApi.error(tprof('unexpected_error'));
        },
      });
    } catch (error) {
    }
  };

  const handleUpload = (info) => {
    messageApi.destroy();
    const file = info.file.originFileObj;

    switch (info.file.status) {
      case "uploading":
        messageApi.loading({ content: tprof('uploading_image'), key: "upload" });
        break;
      case "done":
        setImageFile(file);
        messageApi.success({
          content: tprof('upload_image_success'),
          key: "upload",
        });
        break;
      case "error":
        messageApi.error({
          content: tprof('upload_failed'),
          key: "upload",
        });
        break;
      default:
        messageApi.info({ content: "Image selected", key: "upload" });
    }
  };

  const validateNumber = (_, value) => {
    if (!value) return Promise.reject(sut('phone_required'));

    const cleanedValue = value.replace(/\D/g, "");
    if (!/^[0-9]{9}$/.test(cleanedValue)) {
      return Promise.reject(donate('phone_number_length'));
    }

    if (!/^[76][1-9][0-9]{7}$/.test(cleanedValue)) {
      return Promise.reject(sut('valid_phone'));
    }

    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      size="small"
      onValuesChange={() => {
        updateProfileReset();
      }}
      initialValues={{
        phone_number: user?.phone_number
          ? user.phone_number?.replace(/^(\+?255)/, "")
          : " ",
      }}
    >
      {contextHolder}
      <div
        className={clsx("block mb-2 font-extralight text-xs text-center", {
          "my-3": isEditMode,
        })}
      >
        {tprof('teacher_prof_modal_header')}
      </div>

      {isEditMode && (
        <div className="text-xl font-black my-4">{tprof('change_phone_number')}</div>
      )}

      {!isEditMode && (
        <>
          <div className="flex w-full items-center py-4 justify-center">
            <Upload
              showUploadList={false}
              beforeUpload={() => true}
              onChange={handleUpload}
              className="flex w-fit justify-center mb-4"
            >
              <div className="flex justify-center items-center w-full">
                <div className="relative inline-block">
                  <Avatar
                    size={80}
                    icon={imageFile ? null : <LuUser color="black" />}
                    src={imageFile ? URL.createObjectURL(imageFile) : null}
                    className="cursor-pointer"
                  />
                  <LuCamera
                    color="black"
                    size={26}
                    className="cursor-pointer absolute bottom-0 right-0 bg-[#fff] p-1 border border-[#f0f00] shadow-md rounded-full"
                  />
                </div>
              </div>
            </Upload>
          </div>
        </>
      )}
      <Form.Item
        name="phone_number"
        rules={[
          {
            required: true,
            message: (
              <span className="text-xs">{sut('enter_phone')}</span>
            ),
          },
          { validator: validateNumber },
        ]}
        validateTrigger={["onBlur", "onChange"]}
        validateFirst={true}
      >
        <Input
          placeholder={ht('phone')}
          addonBefore="+255"
          size="middle"
          className="text-xs"
          onChange={(e) => {
            const formattedValue = handlePhoneInput(e);
            form.setFieldsValue({ phone_number: formattedValue });
          }}
        />
      </Form.Item>
      {!isEditMode && (
        <>
          <Form.Item
            name="language"
            rules={[
              {
                required: true,
                message: <span className="text-xs ">{sut('language_required')}</span>,
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs "
              placeholder={sut('select_language')}
              maxTagCount={3}
              maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
            >
              {LANGUAGES?.map((language) => (
                <Select.Option key={language.id} value={language.tag}>
                  {language.language}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subjects"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-xs ">{sut('subjects_required')}</span>
                ),
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs"
              placeholder={tprof('subjects_you_teach')}
              maxTagCount={2}
              maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
            >
              {subjects?.map((subject) => (
                <Select.Option key={subject.id} value={subject.id}>
                  {subject.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="grade_levels"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-xs ">{tprof('select_atleast_one_grade_level')}</span>
                ),
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs"
              maxTagCount={2}
              maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
              placeholder={tprof('grade_levels')}
            >
              {grades?.map((level) => (
                <Select.Option key={level.id} value={level.id}>
                  {level.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="special_needs">
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs"
              maxTagCount={1}
              maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`}
              placeholder={tprof('special_groups')}
            >
              {special_needs?.map((special) => (
                <Select.Option key={special.id} value={special.id}>
                  {special.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="bio"
            rules={[
              {
                required: true,
                message: <span className="text-xs ">{tprof('bio_required')}</span>,
              },
            ]}
          >
            <TextArea
              className="!text-xs !rounded-lg !p-1 !pl-2"
              placeholder={tprof('type_bio')}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button
          disabled={
            updateProfileSuccess || isUpdatingProfile || updateProfileError
          }
          type="primary"
          className="!w-full !h-10 !text-base !font-bold !rounded-xl !shadow-md !transition-all !duration-300 !flex !items-center !justify-center !bg-[#001840] disabled:!opacity-70 hover:!bg-opacity-80 !text-white"
          htmlType="submit"
          block
          size="middle"
        >
          {!isUpdatingProfile ? (
            <span className="flex items-center">{sct('submit')}</span>
          ) : (
            <SlickSpinner size={14} color="white" />
          )}
        </Button>
      </Form.Item>

      <p className="text-center text-gray-500 text-xs mt-4">
        {tprof('update_option')}
      </p>
    </Form>
  );
};

export default InstructorCompleteProfile;
