"use client";
import React, { useState, useEffect } from "react";
import { Avatar, Input, Form, Button, message, Tooltip } from "antd";
import { useUser } from "@/src/hooks/useUser";
import { useDevice } from "@/src/hooks/useDevice";
import { img_base_url } from "@/src/config/settings";
import {
  LuBookOpenText,
  LuCalendar,
  LuCircleCheckBig,
  LuClock4,
  LuMail,
  LuMapPin,
  LuPencil,
  LuPhone,
  LuSave,
  LuTrophy,
  LuX,
  LuImage,
  LuLoaderCircle,
} from "react-icons/lu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiPut } from "@/src/services/api_service";

const StudentProfile = () => {
  const { user, updateProfile, isUpdatingProfile } = useUser();
  const { width } = useDevice();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [editName, setEditName] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch recent activities
  const {
    data: activities,
    isLoading: activitiesLoading,
    isError: activitiesError,
  } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: async () => {
      const response = await apiGet("recent-activities");
      return response.data || [];
    },
    enabled:false,
    placeholderData: [
      { date: "2024-01-15", action: "Completed Advanced React Course" },
      { date: "2024-01-10", action: "Earned 'Top Performer' Badge" },
      { date: "2024-01-05", action: "Started Machine Learning Basics" },
      { date: "2024-01-01", action: "Joined Platform" },
    ],
  });

  // Update user info mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await apiPut(`/update-user/${user.id}`, userData);
      return response.data;
    },
    onSuccess: () => {
      message.success("Profile updated successfully");
      queryClient.invalidateQueries(["auth-user"]);
    },
    onError: (error) => {
      message.error(`Update failed: ${error.message}`);
    },
  });

  // Update profile picture mutation
  const updateProfilePictureMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await apiPut("update-profile-picture", formData);
      return response.data;
    },
    onSuccess: () => {
      message.success("Profile picture updated successfully");
      queryClient.invalidateQueries(["user"]);
      setProfilePicture(null);
    },
    onError: (error) => {
      message.error(`Profile picture update failed: ${error.message}`);
    },
  });

  const handleNameSave = (values) => {
    updateProfile({
      first_name: values.name.split(" ")[0],
      last_name: values.name.split(" ")[1] || "",
    });
    setEditName(false);
  };

  const handleContactSave = (values) => {
    updateProfile({
      email: values.email,
      phone_number: values.phone,
      location: values.location,
    });
    setEditContact(false);
  };

  const handleSkillsSave = (values) => {
    const skillsArray = values.skills.split(",").map((skill) => skill.trim());
    updateUserMutation.mutate({
      skills: skillsArray,
    });
    setEditSkills(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);

      const formData = new FormData();
      formData.append("profile_picture", file);
      updateProfile(formData);
    }
  };

  // Calculate stats
  const classesTotal = user?.classes_bought || 12;
  const classesCompleted = user?.completed_classes || 8;
  const classesInProgress = user?.in_progress_classes || 4;
  const achievements = user?.achievements || 5;
  const completionRate = Math.round((classesCompleted / classesTotal) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative group">
              <Avatar
                size={width > 768 ? 96 : 64}
                src={`${img_base_url}${user?.profile_picture}` || undefined}
                className="border-2 border-blue-500"
                icon={
                  !user?.profile_picture && (
                    <span className="text-xl md:text-3xl lg:text-5xl font-black text-[#001840]">
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
                <div
                  className="cursor-pointer group"
                  onDoubleClick={() => setEditName(true)}
                >
                  <div className="flex items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#001840]">
                      {user?.first_name || "Sarah"}{" "}
                      {user?.last_name || "Johnson"}
                    </h1>
                    <LuPencil
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500"
                      onClick={() => setEditName(true)}
                    />
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {user?.role || "Student"}
                  </div>
                </div>
              ) : (
                <Form
                  onFinish={handleNameSave}
                  initialValues={{
                    name: `${user?.first_name || "Sarah"} ${
                      user?.last_name || "Johnson"
                    }`,
                  }}
                >
                  <Form.Item name="name" className="mb-1">
                    <Input
                      className="font-bold text-xl"
                      suffix={
                        <div className="flex gap-2">
                          <Tooltip title="Save">
                            <Button
                              type="text"
                              icon={<LuSave className="text-green-500" />}
                              onClick={() => form.submit()}
                              loading={updateUserMutation.isPending}
                            />
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <Button
                              type="text"
                              icon={<LuX className="text-red-500" />}
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
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          {/* Learning Progress Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
            <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
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
                    className="text-sm font-medium"
                    style={{
                      color:
                        completionRate > 70
                          ? "#10b981"
                          : completionRate > 40
                          ? "#3b82f6"
                          : "#ef4444",
                    }}
                  >
                    {completionRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            {activitiesLoading && (
              <div className="flex justify-center py-8">
                <LuLoaderCircle className="text-blue-500 text-2xl animate-spin" />
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

        {/* Sidebar - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
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
                <div className="flex gap-2">
                  <Tooltip title="Save">
                    <Button
                      type="text"
                      icon={<LuSave className="text-green-500" />}
                      onClick={() => form.submit()}
                      loading={updateUserMutation.isPending}
                    />
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Button
                      type="text"
                      icon={<LuX className="text-red-500" />}
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
                  <div className="pl-6 font-medium">{user?.email}</div>
                </div>

                <div className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center text-gray-500">
                      <LuPhone /> <span>Phone</span>
                    </div>
                  </div>
                  <div className="pl-6 font-medium">{user?.phone_number}</div>
                </div>

                <div className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center text-gray-500">
                      <LuMapPin /> <span>Location</span>
                    </div>
                  </div>
                  <div className="pl-6 font-medium">
                    {user?.location || "--"}
                  </div>
                </div>

                <div>
                  <div className="flex gap-2 items-center text-gray-500">
                    <LuCalendar /> <span>Joined</span>
                  </div>
                  <div className="pl-6 font-medium">
                    {user?.created_at || "--"}
                  </div>
                </div>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleContactSave}
                initialValues={{
                  email: user?.email || "sarah.johnson@email.com",
                  phone: user?.phone_number || "+1 (555) 123-4567",
                  location: user?.location || "New York, USA",
                }}
              >
                <Form.Item
                  name="email"
                  label={
                    <span className="flex items-center gap-2">
                      <LuMail /> Email
                    </span>
                  }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={
                    <span className="flex items-center gap-2">
                      <LuPhone /> Phone
                    </span>
                  }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="location"
                  label={
                    <span className="flex items-center gap-2">
                      <LuMapPin /> Location
                    </span>
                  }
                >
                  <Input />
                </Form.Item>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <LuCalendar /> Joined
                  </div>
                  <div className="pl-6">
                    <span className="font-medium">
                      {user?.joined_date || "January 2024"}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      (Not editable)
                    </span>
                  </div>
                </div>

                <Form.Item className="mt-4">
                  <Button
                    className="bg-[#001840] hover:bg-[#001840]/80"
                    type="primary"
                    htmlType="submit"
                    loading={updateUserMutation.isPending}
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="ml-2 hover:text-red-500 hover:border-red-500"
                    onClick={() => setEditContact(false)}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Skills</h2>
              {!editSkills ? (
                <Tooltip title="Edit Skills">
                  <Button
                    type="text"
                    icon={<LuPencil className="text-blue-500" />}
                    onClick={() => setEditSkills(true)}
                  />
                </Tooltip>
              ) : (
                <div className="flex gap-2">
                  <Tooltip title="Save">
                    <Button
                      type="text"
                      icon={<LuSave className="text-green-500" />}
                      onClick={() => form.submit()}
                      loading={updateUserMutation.isPending}
                    />
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <Button
                      type="text"
                      icon={<LuX className="text-red-500" />}
                      onClick={() => setEditSkills(false)}
                    />
                  </Tooltip>
                </div>
              )}
            </div>

            {!editSkills ? (
              <div className="flex flex-wrap gap-2">
                {(
                  user?.skills || [
                    "JavaScript",
                    "React",
                    "Python",
                    "Data Science",
                  ]
                ).map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <Form
                form={form}
                onFinish={handleSkillsSave}
                initialValues={{
                  skills: (
                    user?.skills || [
                      "JavaScript",
                      "React",
                      "Python",
                      "Data Science",
                    ]
                  ).join(", "),
                }}
              >
                <Form.Item name="skills">
                  <Input.TextArea
                    placeholder="Enter skills separated by commas"
                    rows={4}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="bg-[#001840] hover:bg-[#001840]/80"
                    type="primary"
                    htmlType="submit"
                    loading={updateUserMutation.isPending}
                  >
                    Save Skills
                  </Button>
                  <Button
                    className="ml-2 hover:text-red-500 hover:border-red-500"
                    onClick={() => setEditSkills(false)}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
