import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Steps,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Drawer,
} from "antd";
import {
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiBook,
  FiBookOpen,
  FiCreditCard,
} from "react-icons/fi";
import dayjs from "dayjs";
import { useSubject } from "@/src/hooks/useSubject";
import { useGrade } from "@/src/hooks/useGrade";
import { useTopic } from "@/src/hooks/useTopic";
import { DAYS_MAP } from "@/src/utils/data/days_of_the_week";
import { useCohort } from "@/src/hooks/useCohort";

const componentStyles = {
  select: {
    width: "100%",
    height: "48px !important",
    "& .ant-select-selector": {
      height: "48px !important",
      padding: "0 16px !important",
      borderRadius: "8px !important",
      border: "1px solid #E5E7EB !important",
      "&:hover": {
        borderColor: "#01840 !important",
      },
    },
    "& .ant-select-selection-item": {
      lineHeight: "46px !important",
    },
  },
  datePicker: {
    width: "100%",
    height: "48px !important",
    borderRadius: "8px !important",
    "&:hover": {
      borderColor: "#01840 !important",
    },
  },
  inputNumber: {
    width: "100%",
    height: "48px !important",
    borderRadius: "8px !important",
    "&:hover": {
      borderColor: "#01840 !important",
    },
  },
};

const ClassCreationWizard = ({ openAddNewClass, setOpenAddNewClass }) => {
  const [step, setStep] = useState(0);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      topic: "",
      price: "",
      frequency: "",
      startDate: "",
      endDate: "",
      days: [""],
      times: [""],
      durations: [""],
    },
  });

  const formData = watch();

  const updateForm = (key, value) => {
    setValue(key, value);
  };

  const { subjects } = useSubject();
  const { topics, isTopicLoadig, isTopicError, topicError } = useTopic(
    formData.subject,
    formData.level
  );
  const { grades, isGradesPending, isGradeError, gradeError, refetch } =
    useGrade();

  const { createCohort, isFetching, cohorts } = useCohort();

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.subject && formData.topic;
      case 1:
        return (
          formData.days.every((day) => day) &&
          formData.times.every((time) => time) &&
          formData.durations.every((duration) => duration)
        );
      case 2:
        return formData.startDate && formData.endDate && formData.price;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCohort.mutateAsync(formData);
      e.target.reset();
    } catch (error) {
      console.error("Failed to create cohort:", error);
    }
  };


  const steps = [
    {
      title: "Subject & Topic Details",
      subtitle: "Choose your subject and topic",
      icon: <FiBookOpen />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="w-full">
              <label className="block font-medium text-gray-700 mb-1 text-[12px]">
                Subject
              </label>
              <Select
                style={componentStyles.select}
                value={formData.subject}
                onChange={(v) => {
                  updateForm("subject", v);
                  updateForm("level", "");
                  updateForm("topic", "");
                }}
                placeholder="Select a subject"
                suffixIcon={<FiBook className="text-gray-400" />}
              >
                {subjects &&
                  subjects.map((sub) => (
                    <Select.Option key={sub.id} value={sub.id}>
                      {sub.name}
                    </Select.Option>
                  ))}
              </Select>
            </div>

            {formData.subject && (
              <div className="w-full">
                <label className="block font-medium text-gray-700 mb-1 text-[12px]">
                  Level
                </label>
                <Select
                  style={componentStyles.select}
                  value={formData.level}
                  onChange={(v) => {
                    updateForm("level", v);
                    updateForm("topic", "");
                  }}
                  placeholder="Select a subject"
                  suffixIcon={<FiBook className="text-gray-400" />}
                >
                  {grades &&
                    grades.map((g) => (
                      <Select.Option key={g.id} value={g.id}>
                        {g.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            )}

            {formData.level && formData.subject && (
              <div className="w-full">
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <Select
                  style={componentStyles.select}
                  value={formData.topic}
                  onChange={(v) => updateForm("topic", v)}
                  placeholder="Select a topic"
                  suffixIcon={<FiBookOpen className="text-gray-400" />}
                >
                  {isTopicLoadig ? (
                    <Select.Option value="loading">Loading...</Select.Option>
                  ) : isTopicError ? (
                    <Select.Option value="error">
                      Error loading topics
                    </Select.Option>
                  ) : (
                    topics.map((t) => (
                      <Select.Option key={t.id} value={t.id}>
                        {t.title}
                      </Select.Option>
                    ))
                  )}
                </Select>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Schedule",
      subtitle: "Set your class schedule",
      icon: <FiClock />,
      content: (
        <div className="space-y-2">
          <div className="w-full">
            <label className="block text-[12px] font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <Select
              style={componentStyles.select}
              value={formData.frequency}
              onChange={(v) => {
                updateForm("frequency", v);
                updateForm("days", v === "1" ? [""] : ["", ""]);
                updateForm("times", v === "1" ? [""] : ["", ""]);
                updateForm("durations", v === "1" ? [""] : ["", ""]);
              }}
              placeholder="How often?"
              suffixIcon={<FiClock className="text-gray-400" />}
            >
              <Select.Option value="1">Once per week</Select.Option>
              <Select.Option value="2">Twice per week</Select.Option>
              <Select.Option value="3">Three times per week</Select.Option>
              <Select.Option value="4"> Four times per week</Select.Option>
              <Select.Option value="5">Five times per week</Select.Option>
              <Select.Option value="6">Six times per week</Select.Option>
              <Select.Option value="7">Every Day</Select.Option>
            </Select>
          </div>

          {formData.frequency &&
            [...Array(parseInt(formData.frequency))].map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1">
                    Day {i + 1}
                  </label>
                  <Select
                    style={componentStyles.select}
                    value={formData.days[i]}
                    onChange={(v) => {
                      const newDays = [...formData.days];
                      newDays[i] = v;
                      updateForm("days", newDays);
                    }}
                    placeholder={`Select day`}
                  >
                    {Object.keys(DAYS_MAP).map((day) => (
                      <Select.Option key={day} value={day}>
                        {day}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1">
                    Time {i + 1}
                  </label>
                  <TimePicker
                    style={componentStyles.datePicker}
                    value={
                      formData.times[i]
                        ? dayjs(formData.times[i], "HH:mm")
                        : null
                    }
                    onChange={(time, timeString) => {
                      const newTimes = [...formData.times];
                      newTimes[i] = timeString;
                      updateForm("times", newTimes);
                    }}
                    format="HH:mm"
                    suffixIcon={<FiClock className="text-gray-400" />}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1">
                    Duration {i + 1}
                  </label>
                  <InputNumber
                    style={componentStyles.datePicker}
                    value={formData.durations[i] || null}
                    onChange={(value) => {
                      const newDurations = [...formData.durations];
                      newDurations[i] = value;
                      updateForm("durations", newDurations);
                    }}
                    addonAfter={
                      <span className="font-black text-[10px]">Min</span>
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      ),
    },

    {
      title: "Pricing",
      subtitle: "Set duration and pricing",
      icon: <FiCreditCard />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="">
                <DatePicker
                  prefix={<FiCalendar className="text-gray-400 mr-2" />}
                  style={componentStyles.datePicker}
                  className="pl-10"
                  value={formData.startDate ? dayjs(formData.startDate) : null}
                  onChange={(date, dateString) =>
                    updateForm("startDate", dateString)
                  }
                  suffixIcon={null}
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <DatePicker
                  prefix={<FiCalendar className="text-gray-400 mr-2" />}
                  style={componentStyles.datePicker}
                  className="pl-10"
                  value={formData.endDate ? dayjs(formData.endDate) : null}
                  onChange={(date, dateString) =>
                    updateForm("endDate", dateString)
                  }
                  suffixIcon={null}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1">
              Price
            </label>

            <InputNumber
              prefix={
                <>
                  <span className="font-black mr-2">Tshs</span>
                </>
              }
              style={componentStyles.inputNumber}
              className="!pl-2"
              placeholder="Enter price"
              value={formData.price}
              onChange={(value) => updateForm("price", value)}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Drawer
      open={openAddNewClass}
      onClose={() => setOpenAddNewClass(false)}
      footer={null}
      width={850}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div className="p-8">
        <Steps
          current={step}
          className="!mb-12"
          items={steps.map((s, index) => ({
            title: s.title,
          }))}
        />

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[step].title}
          </h2>
          <p className="text-gray-500 mt-1">{steps[step].subtitle}</p>
        </div>

        <div className="min-h-[220px] m-4">{steps[step].content}</div>

        <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200">
          <Button
            type="default"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            icon={<FiArrowLeft />}
            className={`!flex !items-center !border-none !px-4 !bg-black !text-white !text-[11px] ${
              step === 0 ? "!bg-black/30" : ""
            }`}
          >
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`!bg-black !border-none !text-white !px-4 !flex !items-center !gap-2 !text-[11px] hover:!bg-black/90 ${
                !canProceed() ? "!bg-black/30" : ""
              }`}
            >
              Next
              <FiArrowRight />
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!canProceed() || createCohort.isPending}
              className={`!bg-black !border-none !text-white !px-6 !flex !items-center !gap-2 hover:!bg-[#01840]/90 ${
                !canProceed() || createCohort.isPending ? "!bg-black/30" : ""
              } ${createCohort.isSuccess ? "!bg-green-600 !cursor-not-allowed !pointer-events-none" : ""}`}
            >
              {createCohort.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : createCohort.isSuccess ? (
                <div className="flex items-center gap-1">
                  <FiCheck />
                  Created!
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  Create Class
                  <FiCheck />
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ClassCreationWizard;
