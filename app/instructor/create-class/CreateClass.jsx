import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Steps,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Drawer,
  Alert,
  Skeleton,
  Tag,
  Input,
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
import { useGrade } from "@/src/hooks/useGrade";
import { useTopic } from "@/src/hooks/useTopic";
import { DAYS_MAP } from "@/src/utils/data/days_of_the_week";
import { useCohort } from "@/src/hooks/useCohort";
import { LoadingOutlined } from "@ant-design/icons";
import { weekOptions } from "@/src/utils/data/weekData";
import notificationService from "@/src/components/ui/notification/Notification";
import { apiGet } from "@/src/services/api/api_service";
import { useSubTopics } from "@/src/hooks/useSubTopics";
import { useInstructorSubjects } from "@/src/hooks/useInstructorSubjects";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaArrowTurnDown } from "react-icons/fa6";

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

  const [loading, setLoading] = useState(false);
  const [cohortName, setCohortName] = useState("");

  const [value, setValueData] = useState("");
  const [isValid, setIsValid] = useState(true);

  const [currentActiveSubtopic, setCurrentActiveSubtopic] = useState(0);

  const [subtopicValues, setSubtopicValues] = useState([]);

  const { TextArea } = Input;

  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      topic: "",
      price: "",
      frequency: "",
      startDate: "",
      days: [""],
      times: [""],
      durations: [""],
      description: "",
      subtopics: subtopicValues,
    },
  });

  const formData = watch();

  const handleDrawerClose = useCallback(() => {
    const resetForm = () => {
      setSubtopicValues({});
      reset({
        subject: "",
        topic: "",
        price: "",
        frequency: "",
        startDate: "",
        days: [""],
        times: [""],
        durations: [""],
        description: "",
        subtopics: {},
      });
      setStep(0);
      setCohortName("");
      setValueData("");
      setIsValid(true);
    };

    resetForm();
    setOpenAddNewClass(false);
  }, [reset, setOpenAddNewClass]);

  const updateForm = (key, value) => {
    setValue(key, value);
  };

  const { instructorSubjects } = useInstructorSubjects();
  const { topics, isTopicLoadig, isTopicError, topicError } = useTopic(
    formData.subject,
    formData.level
  );
  const { grades, isGradesPending, isGradeError, gradeError, refetch } =
    useGrade();

  const { createCohort, isFetching, cohorts } = useCohort();

  const { getSubTopics, subTopics, isSubtopicsPending, isSubtopicsError } =
    useSubTopics();

  useEffect(() => {
    if (createCohort.isSuccess) {
      const timer = setTimeout(() => {
        handleDrawerClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [createCohort.isSuccess, handleDrawerClose]);

  const checkDescription = (v) => {
    const wordCount = v
      .trim()
      .split(/\s+/)
      .filter((word) => /\w/.test(word)).length;

    return wordCount >= 10;
  };

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
        return (
          formData.startDate &&
          subTopics?.length > 0 &&
          (() => {
            // First check if subtopics exists and is an array
            if (!formData.subtopics || !Array.isArray(formData.subtopics)) {
              return false;
            }

            // Then check each subtopic
            return subTopics.every((topic) => {
              try {
                // Find this subtopic in the array
                const subtopicEntry = formData.subtopics.find(
                  (item) =>
                    item &&
                    typeof item === "object" &&
                    item.subtopic === topic.id
                );

                // Check if it exists and has valid num_lessons value
                return (
                  subtopicEntry &&
                  subtopicEntry.num_lessons !== "" &&
                  !isNaN(parseInt(subtopicEntry.num_lessons)) &&
                  parseInt(subtopicEntry.num_lessons) >= 1 &&
                  parseInt(subtopicEntry.num_lessons) <= 5
                );
              } catch (error) {
                console.error("Error validating subtopic:", error);
                return false;
              }
            });
          })()
        );
      case 3:
        return formData.price && checkDescription(formData.description);
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Forma data here:", formData);
      await createCohort.mutateAsync(formData);
      e.target.reset();
      setOpenAddNewClass(false);
    } catch (error) {
      console.error("Failed to create cohort:", error);
    }
  };

  const getGeneratedCohort = async (topicId, section) => {
    switch (section) {
      case "subject_section":
        setLoading(false);
        break;
      case "level_section":
        setLoading(false);
        break;
      case "topic_section":
        setLoading(true);
        try {
          var cohort = await apiGet(`/get_cohort_name/${topicId}`);

          setLoading(false);
          setCohortName(cohort.data);
        } catch (error) {
          notificationService.error("Failed to retrieve cohort name", 3);
          setLoading(false);
        }
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const header = (msg) => {
    return (
      <div className="w-full flex justify-between">
        <span>{msg}</span>
        <span className="font-black">{cohortName}</span>
      </div>
    );
  };

  const goToNextStep = () => {
    setCurrentActiveSubtopic(currentActiveSubtopic + 1);
  };

  const steps = [
    {
      title: "Subject & Topic Details",
      header: header("Subject & Topic Details"),
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
                  setCohortName(null);
                  getGeneratedCohort("null_id", "subject_section");
                }}
                placeholder="Select a subject"
                suffixIcon={<FiBook className="text-gray-400" />}
              >
                {instructorSubjects &&
                  instructorSubjects.map((sub) => (
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
                    setCohortName(null);
                    getGeneratedCohort("null_id", "level_section");
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
                  onChange={(v) => {
                    updateForm("topic", v);
                    getGeneratedCohort(v, "topic_section");
                    getSubTopics(v);
                    setCurrentActiveSubtopic(0);
                    setSubtopicValues({});
                  }}
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
      title: `Schedule`,
      header: header("Schedule"),
      subtitle: (
        <div>
          Set your class Schedule{" "}
          <span className="text-gray-400 text-[9px]">
            (Min duration 30mins , max duration 120mins)
          </span>
        </div>
      ),
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
                    Duration {i + 1}{" "}
                  </label>
                  <InputNumber
                    min="30"
                    max="120"
                    type="number"
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
      title: `Lesson Plan`,
      header: header("Lesson Plan"),
      subtitle: (
        <div>
          Specificy the number of lessons it will take to complete each
          Sub-topic:
        </div>
      ),
      icon: <RiCalendarScheduleLine />,
      content: (
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="">
                <DatePicker
                  minDate={dayjs().add(1, "day")}
                  prefix={<FiCalendar className="text-gray-400 mr-2" />}
                  style={componentStyles.datePicker}
                  className="pl-10"
                  value={formData.startDate ? dayjs(formData.startDate) : null}
                  onChange={(date, dateString) => {
                    updateForm("startDate", dateString);
                    // calculateEndDate(formData.weeks, dateString);
                  }}
                  suffixIcon={null}
                />
              </div>
            </div>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                padding: "0 10px 0 0",
              }}
            >
              <Steps
                direction="vertical"
                size="small"
                current={currentActiveSubtopic}
                items={
                  isSubtopicsPending ? (
                    <div className="flex flex-col gap-1">
                      <LoadingOutlined /> <span>Loading sub-topics...</span>
                    </div>
                  ) : subTopics?.length > 0 ? (
                    subTopics.map((topic, index) => ({
                      title: topic.title,
                      description: (
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Number of lessons?"
                            style={{ width: "100%" }}
                            value={
                              Array.isArray(subtopicValues)
                                ? subtopicValues.find(
                                    (item) => item.subtopic === topic.id
                                  )?.num_lessons || ""
                                : ""
                            }
                            disabled={currentActiveSubtopic < index}
                            min="1"
                            max="5"
                            onChange={(e) => {
                              const newValue = e.target.value;

                              // Ensure subtopicValues is an array
                              const currentValues = Array.isArray(
                                subtopicValues
                              )
                                ? subtopicValues
                                : [];

                              // Check if this subtopic already exists in the array
                              const existingIndex = currentValues.findIndex(
                                (item) => item.subtopic === topic.id
                              );

                              let newSubtopicValues;
                              if (existingIndex >= 0) {
                                // Update existing entry
                                newSubtopicValues = [...currentValues];
                                newSubtopicValues[existingIndex] = {
                                  subtopic: topic.id,
                                  num_lessons: newValue,
                                };
                              } else {
                                // Add new entry
                                newSubtopicValues = [
                                  ...currentValues,
                                  {
                                    subtopic: topic.id,
                                    num_lessons: newValue,
                                  },
                                ];
                              }

                              setSubtopicValues(newSubtopicValues);
                              updateForm("subtopics", newSubtopicValues);
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;

                              // Ensure subtopicValues is an array
                              const currentValues = Array.isArray(
                                subtopicValues
                              )
                                ? subtopicValues
                                : [];

                              if (parseInt(value) < 1 || value === "") {
                                const existingIndex = currentValues.findIndex(
                                  (item) => item.subtopic === topic.id
                                );
                                const newSubtopicValues = [...currentValues];

                                if (existingIndex >= 0) {
                                  newSubtopicValues[existingIndex] = {
                                    subtopic: topic.id,
                                    num_lessons: "1",
                                  };
                                } else {
                                  newSubtopicValues.push({
                                    subtopic: topic.id,
                                    num_lessons: "1",
                                  });
                                }

                                setSubtopicValues(newSubtopicValues);
                                updateForm("subtopics", newSubtopicValues);
                              } else if (parseInt(value) > 5) {
                                const existingIndex = currentValues.findIndex(
                                  (item) => item.subtopic === topic.id
                                );
                                const newSubtopicValues = [...currentValues];

                                if (existingIndex >= 0) {
                                  newSubtopicValues[existingIndex] = {
                                    subtopic: topic.id,
                                    num_lessons: "5",
                                  };
                                } else {
                                  newSubtopicValues.push({
                                    subtopic: topic.id,
                                    num_lessons: "5",
                                  });
                                }

                                setSubtopicValues(newSubtopicValues);
                                updateForm("subtopics", newSubtopicValues);
                              }
                            }}
                          />
                          {currentActiveSubtopic === index &&
                          currentActiveSubtopic < subTopics.length - 1 ? (
                            <Button
                              color="blue"
                              type="primary"
                              disabled={
                                !Array.isArray(subtopicValues) ||
                                !subtopicValues.find(
                                  (item) => item.subtopic === topic.id
                                )?.num_lessons
                              }
                              onClick={goToNextStep}
                              icon={<FaArrowTurnDown />}
                            ></Button>
                          ) : null}
                        </div>
                      ),
                    }))
                  ) : (
                    []
                  )
                }
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Pricing",
      header: header("Pricing"),
      subtitle: "Set duration and pricing",
      icon: <FiCreditCard />,
      content: (
        <div className="space-y-6">
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

          <div>
            <label className="block text-[12px] font-medium text-gray-700 mb-1">
              Description
            </label>

            <TextArea
              rows={4}
              placeholder="Please enter at least 10 words"
              maxLength={6000}
              // value={formData.description}
              onChange={(v) => {
                updateForm("description", v.target.value);
              }}
              onBlur={handleBlur}
              // status={isValid ? "" : "error"}
            />
            <div style={{ marginTop: "8px" }}>
              Word count:{" "}
              {formData.description.trim()
                ? formData.description
                    .trim()
                    .trim()
                    .split(/\s+/)
                    .filter((word) => /\w/.test(word)).length
                : 0}
              /10 minimum
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Drawer
      open={openAddNewClass}
      onClose={handleDrawerClose}
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
            {steps[step].header}
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
              } ${
                createCohort.isSuccess
                  ? "!bg-green-600 !cursor-not-allowed !pointer-events-none"
                  : ""
              }`}
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
                <div className="flex items-center gap-1 !text-[11px]">
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
