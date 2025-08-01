"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Input, Form, Button, message, Tooltip } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import {
  LuBookOpenText,
  LuCalendar,
  LuCircleCheckBig,
  LuClock4,
  LuMail,
  LuPencil,
  LuPhone,
  LuSave,
  LuTrophy,
  LuX,
  LuImage,
  LuLoaderCircle,
  LuPlus,
} from "react-icons/lu";

import { CancelSchoolPartner } from "@/components/student/CancelSchoolPartner";
import SlickSpinner from "@/components/ui/loading/template/SlickSpinner";
import { img_base_url } from "@/config/settings";
import { useUser } from "@/hooks/data/useUser";
import { useDevice } from "@/hooks/misc/useDevice";
import { apiGet, apiPut } from "@/services/api/api_service";
import { useSchoolPartnerStore } from "@/store/student/schoolPartnerStore";

const StudentProfile = () => {
  const { user, updateProfile, isUpdatingProfile } = useUser();
  const { width } = useDevice();
  const [formContacts] = Form.useForm();
  const [formName] = Form.useForm();

  const queryClient = useQueryClient();

  const [editName, setEditName] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const open = useSchoolPartnerStore((state) => state.open);

  const {
    data: activities,
    isFetching: activitiesLoading,
    isError: activitiesError,
  } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const response = await apiGet("/recent-activities");
      return response.data || [];
    },
    enabled: false,
    placeholderData: [],
  });

  const updateProfilePictureMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiPut("/update-user", data, {
        "Content-Type": "multipart/form-data",
      });
    },
    onSuccess: () => {
      message.success("Profile picture updated successfully");
      queryClient.invalidateQueries(["auth-user"]);
      setProfilePicture(null);
    },
    onError: (error) => {
      message.error(`Profile picture update failed, Try again later`);
    },
  });

  const handleNameSave = (values) => {
    if (!formName.isFieldsTouched()) {
      return;
    }
    const [first_name, last_name] = values.name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (
      !first_name ||
      !/^[A-Za-z]+$/.test(first_name) ||
      (last_name && !/^[A-Za-z]+$/.test(last_name))
    ) {
      message.error(
        first_name
          ? "Names must only contain letters."
          : "Please enter a valid name 🤔"
      );
      setEditName(false);
      return;
    }

    updateProfile({ first_name, ...(last_name && { last_name }) });
    setEditName(false);
  };

  const handleContactSave = (values) => {
    updateProfile({
      email: values.email,
      phone_number: values.phone,
    });
    setEditContact(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);

      const formData = new FormData();
      formData.append("profile_picture", file);
      updateProfilePictureMutation.mutate(formData);
    }
  };

  const classesTotal = user?.total_cohorts;
  const classesCompleted = user?.completed_cohorts;
  const classesInProgress = user?.in_progress_cohorts;
  const achievements = user?.completed_cohorts;
  const completionRate = user?.completion_rate;

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm shadow-black/25 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative group">
              <Avatar
                size={width > 768 ? 96 : 64}
                src={`${img_base_url}${user?.profile_picture}` || undefined}
                className="border-2 border-blue-700 bg-transparent"
                icon={
                  !user?.profile_picture && (
                    <span className="text-xl md:text-3xl lg:text-5xl font-black text-blue-700">
                      {user?.first_name?.charAt(0)?.toUpperCase()}
                    </span>
                  )
                }
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <label htmlFor="profile-picture" className="cursor-pointer">
                  <LuImage className="text-white text-2xl" />
                  <input
                    type="file"
                    id="profile-picture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </label>
              </div>
              {updateProfilePictureMutation.isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <LuLoaderCircle className="text-white text-2xl animate-spin" />
                </div>
              )}
            </div>

            <div className="mt-2 sm:mt-0">
              {!editName ? (
                <Tooltip
                  title={
                    <div className="text-xs">
                      Double tap to change your name
                    </div>
                  }
                >
                  <div
                    className="cursor-pointer group"
                    onDoubleClick={() => setEditName(true)}
                  >
                    <div className="flex items-center">
                      <h1 className="text-2xl md:text-3xl font-bold text-black capitalize">
                        {user?.name}
                      </h1>
                      <LuPencil
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                        onClick={() => setEditName(true)}
                      />
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {user?.role}
                    </div>
                  </div>
                </Tooltip>
              ) : (
                <Form
                  form={formName}
                  onFinish={handleNameSave}
                  initialValues={{
                    name: `${user?.name}`,
                  }}
                >
                  <Form.Item name="name" className="mb-1">
                    <Input
                      className="font-bold text-xl"
                      suffix={
                        <div className="flex gap-1 items-center justify-center">
                          <Tooltip title="Save">
                            <Button
                              type="text"
                              icon={
                                <LuSave size={20} className="!text-green-500" />
                              }
                              onClick={formName.submit}
                              loading={isUpdatingProfile}
                            />
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <Button
                              type="text"
                              icon={<LuX size={20} className="!text-red-500" />}
                              onClick={() => setEditName(false)}
                            />
                          </Tooltip>
                        </div>
                      }
                    />
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>

          <div className="flex flex-row items-start gap-6 md:gap-10">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Classes Bought</span>
              <div className="flex gap-2 items-center p-2">
                <LuBookOpenText className="text-blue-600" size={28} />
                <span className="font-bold text-2xl">{classesTotal}</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Achievements</span>
              <div className="flex gap-2 items-center p-2">
                <LuTrophy className="text-amber-500" size={28} />
                <span className="font-bold text-2xl">{achievements}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm shadow-black/25 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Learning Progress</h2>
              {!user.partner_school && (
                <button
                  onClick={open}
                  className="text-xs text-white bg-[#001840] font-medium rounded-md px-2 py-1 hover:scale-105 ease-in-out transition-all duration-300 border-[1px] border-[#001840] flex items-center gap-0.5"
                >
                  <LuPlus size={15} strokeWidth={2} />
                  <span> Add your school</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Completed
                  </div>
                  <div className="text-lg font-semibold">
                    {classesCompleted}
                  </div>
                </div>
                <LuCircleCheckBig className="text-green-500 text-xl" />
              </div>

              <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    In Progress
                  </div>
                  <div className="text-lg font-semibold">
                    {classesInProgress}
                  </div>
                </div>
                <LuClock4 className="text-blue-500 text-xl" />
              </div>

              <div className="bg-gray-50 rounded-md p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Completion Rate
                  </div>
                  <div className="text-lg font-semibold">{completionRate}%</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <div
                    className={clsx("text-sm font-medium", {
                      "text-green-500": completionRate > 70,
                      "text-blue-500":
                        completionRate > 40 && completionRate <= 70,
                      "text-red-500": completionRate <= 40,
                    })}
                  >
                    {completionRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-lg shadow-sm shadow-black/25 p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            {activitiesLoading && (
              <div className="flex justify-center py-8">
                <SlickSpinner size={18} />
              </div>
            )}

            {activitiesError && (
              <div className="text-center py-6 text-red-500">
                Failed to load recent activities. Please try again later.
              </div>
            )}

            {!activitiesLoading &&
              !activitiesError &&
              activities?.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No recent activities found.
                </div>
              )}

            {!activitiesLoading &&
              !activitiesError &&
              activities?.length > 0 && (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-4 py-1"
                    >
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-500">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm shadow-black/25 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Contact Information</h2>
              {!editContact ? (
                <Tooltip title="Edit Contact Information">
                  <Button
                    type="text"
                    icon={<LuPencil className="text-blue-500" />}
                    onClick={() => setEditContact(true)}
                  />
                </Tooltip>
              ) : (
                <div className="flex">
                  <Tooltip title="Save">
                    <Button
                      type="text"
                      icon={<LuSave size={20} className="!text-green-500" />}
                      onClick={() => formContacts.submit()}
                      loading={isUpdatingProfile}
                    />
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Button
                      type="text"
                      icon={<LuX size={20} className="!text-red-500" />}
                      onClick={() => setEditContact(false)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>

            {!editContact ? (
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center text-gray-500">
                      <LuMail /> <span>Email</span>
                    </div>
                  </div>
                  <div className="pl-6 font-medium truncate">{user?.email}</div>
                </div>

                <div className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center text-gray-500">
                      <LuPhone /> <span>Phone</span>
                    </div>
                  </div>
                  <div className="pl-6 font-medium">{user?.phone_number}</div>
                </div>
                <div>
                  <div className="flex gap-2 items-center text-gray-500">
                    <LuCalendar /> <span>Joined</span>
                  </div>
                  <div className="pl-6 font-medium">{user?.created_at}</div>
                </div>
              </div>
            ) : (
              <Form
                form={formContacts}
                layout="vertical"
                onFinish={handleContactSave}
                initialValues={{
                  email: user?.email,
                  phone: user?.phone_number,
                }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <LuMail /> Email
                  </div>
                  <div className="pl-6">
                    <span className="font-medium">{user?.email}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      (Not editable)
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <LuPhone /> Phone
                  </div>
                  <div className="pl-6">
                    <span className="font-medium">{user?.phone_number}</span>
                    <span className="text-gray-500 text-xs ml-2">
                      (Not editable)
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <LuCalendar /> Joined
                  </div>
                  <div className="pl-6">
                    <span className="font-medium">
                      {user?.created_at || "--"}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      (Not editable)
                    </span>
                  </div>
                </div>

                <Form.Item className="mt-4">
                  <Button
                    className="bg-[#001840] hover:!bg-[#001840]/80 !text-xs"
                    type="primary"
                    htmlType="submit"
                  >
                    {isUpdatingProfile ? <>Saving...</> : <>Save</>}
                  </Button>
                  <Button
                    className="ml-2 hover:!text-red-500 hover:!border-red-500 !text-xs"
                    onClick={() => setEditContact(false)}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
          {user?.partner_school && (
            <div className="bg-white rounded-lg shadow-sm shadow-black/25 p-6 mb-6 flex flex-col gap-2 overflow-hidden">
              <div className="flex justify-between items-center">
                <span>Your School</span>
                <div className="flex gap-2 items-center">
                  <Tooltip color="#001840" title="Change school">
                    <button
                      onClick={open}
                      className="rounded-full p-1.5 hover:scale-105 transation-all ease-in-out duration-200 text-xs hover:bg-blue-200 hover:text-blue-600"
                    >
                      <LuPencil />
                    </button>
                  </Tooltip>
                  <CancelSchoolPartner />
                </div>
              </div>
              <span className="font-bold">{user.partner_school}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
