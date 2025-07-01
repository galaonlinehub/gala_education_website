import React, { useState } from "react";
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
import { useUser } from "@/src/hooks/data/useUser";
import { useSpecialNeeds } from "@/src/hooks/data/useSpecialNeeds";
import { useSubject } from "@/src/hooks/data/useSubject";
import { useGrade } from "@/src/hooks/data/useGrade";
import { Stage, Success, Verify } from "../student/CompleteProfile";
import { LANGUAGES } from "@/src/utils/data/lang";
import {
  handlePhoneInput,
  reformat_phone_number,
} from "@/src/utils/fns/format_phone_number";
import { LuCamera, LuUser } from "react-icons/lu";
import SlickSpinner from "../ui/loading/template/SlickSpinner";
import clsx from "clsx";
import { Signout } from "../ui/auth/signup/Signout";
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
          <div>Complete your profile</div>
          <div className="self-end">
            <Signout />
          </div>
        </div>
      }
      open={!user?.completed_profile && user?.has_active_subscription}
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

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (!isEditMode) {
        if (!imageFile) {
          message.info("Please upload a profile image");
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
          message.success("Profile updated successfully");
          setImageFile(null);
          form.resetFields();
        },
        onError: () => {
          message.error("Unexpected error occurred");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = (info) => {
    message.destroy();
    const file = info.file.originFileObj;

    switch (info.file.status) {
      case "uploading":
        message.loading({ content: "Uploading image...", key: "upload" });
        break;
      case "done":
        setImageFile(file);
        message.success({
          content: "Image uploaded successfully!",
          key: "upload",
        });
        break;
      case "error":
        message.error({
          content: "Upload failed. Please try again.",
          key: "upload",
        });
        break;
      case "removed":
        setImageFile(null);
        message.info({ content: "Image removed", key: "upload" });
        break;
      default:
        message.info({ content: "Image selected", key: "upload" });
    }
  };

  const validateNumber = (_, value) => {
    if (!value) return Promise.reject("Phone number is required");

    const cleanedValue = value.replace(/\D/g, "");
    if (!/^[0-9]{9}$/.test(cleanedValue)) {
      return Promise.reject("Please enter 9 digits (e.g., 752451811)");
    }

    if (!/^[76][1-9][0-9]{7}$/.test(cleanedValue)) {
      return Promise.reject("Enter valid phone number");
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
      <div
        className={clsx("block mb-2 font-extralight text-xs text-center", {
          "my-3": isEditMode,
        })}
      >
        This process ensures that only qualified and experienced teachers gain
        access to our online community.
      </div>

      {isEditMode && (
        <div className="text-xl font-black my-4">Change phone number</div>
      )}

      {!isEditMode && (
        <>
          <div className="flex w-full items-center justify-center">
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
              <span className="text-xs">Please enter your phone number</span>
            ),
          },
          { validator: validateNumber },
        ]}
        validateTrigger={["onBlur", "onChange"]}
        validateFirst={true}
      >
        <Input
          placeholder="Phone number"
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
                message: <span className="text-xs ">Language is required</span>,
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs "
              placeholder="Select language(s)"
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
                  <span className="text-xs ">Subject(s) is required</span>
                ),
              },
            ]}
          >
            <Select
              mode="multiple"
              size="middle"
              className="!text-xs"
              placeholder="Subjects you can teach"
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
                  <span className="text-xs ">Grade level(s) is required</span>
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
              placeholder="Levels you can teach"
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
              placeholder="Special groups you can teach (OPTIONAL)"
            >
              {special_needs?.map((special) => (
                <Select.Option key={special.id} value={special.id}>
                  {special.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="bio" rules={[
            {
              required: true,
              message: (
                <span className="text-xs ">Bio is required</span>
              ),
            },
          ]}>
            <TextArea
              className="!text-xs !rounded-lg !p-1 !pl-2"
              placeholder="Type your bio. This will be visible to students"
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
            <span className="flex items-center">Submit</span>
          ) : (
            <SlickSpinner size={14} color="white" />
          )}
        </Button>
      </Form.Item>

      <p className="text-center text-gray-500 text-xs mt-4">
        You can update your details anytime in your profile
      </p>
    </Form>
  );
};

export default InstructorCompleteProfile;
