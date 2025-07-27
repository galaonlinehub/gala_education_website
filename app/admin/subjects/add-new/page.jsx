"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, Select, Steps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { FaBackward, FaTrash } from "react-icons/fa6";

import { apiGet, apiPost } from "@/src/services/api/api_service";


function AddNew() {
  const [current, setCurrent] = React.useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      subject: { name: "", description: "" },
      gradeLevel: "",
      topics: [
        {
          title: "",
          description: "",
          subtopics: [
            {
              title: "",
              description: "",
            },
          ],
        },
      ],
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const submitFormData = async (data) => {
    const response = await apiPost("create-subject-topic-subtopic", data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["subjects"]);
      router.push("/admin/subjects");
    },
    onError: (error) => {
      console.error("Error submitting form:", error.message);
    },
    onSettled: () => {
      console.log("Mutation settled (success or error)");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const onChange = (value) => {
    setCurrent(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: "finish",
            title: "Subject details",
          },
          {
            status: "process",
            title: "Topic and Subtopics",
          },
        ]}
      />

      {current === 0 ? (
        <SubjectDetails
          control={control}
          errors={errors}
          setCurrent={setCurrent}
        />
      ) : (
        <TopicsAndSubtopics
          control={control}
          errors={errors}
          setCurrent={setCurrent}
        />
      )}
    </form>
  );
}

const SubjectDetails = ({ control, errors, setCurrent }) => {
  const getGradeLevels = async () => {
    const { data } = await apiGet("grade_levels");

    return data;
  };

  const { data: gradeLevels } = useQuery({
    queryKey: ["gradeLevels"],
    queryFn: getGradeLevels,
  });

  console.log(gradeLevels);

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="col-span-2 flex justify-end">
        <div
          className="bg-blue-500 w-24 self-end text-xs p-2 cursor-pointer text-white text-center rounded"
          onClick={() => setCurrent(1)}
        >
          Next
        </div>
      </div>

      <div>
        <Controller
          name="subject.name"
          control={control}
          rules={{ required: "Subject name is required" }}
          render={({ field }) => (
            <Input
              placeholder="Subject name"
              value={field.value}
              onChange={field.onChange}
              status={errors.subject?.name ? "error" : ""}
            />
          )}
        />
        {errors.subject?.name && (
          <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div className="">
        <Controller
          name="subject.description"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="grade_level"
          control={control}
          rules={{ required: "Education level is required" }}
          render={({ field }) => (
            <Select
              placeholder="Select education level"
              style={{ width: "100%" }}
              options={
                gradeLevels?.map((grade) => ({
                  value: grade.id,
                  label: grade.name,
                })) || []
              }
              value={field.value || undefined}
              onChange={(value) => field.onChange(value)}
              status={errors.subject?.level ? "error" : ""}
            />
          )}
        />
        {errors.subject?.level && (
          <p className="text-red-500 text-xs mt-1">
            {errors.subject.level.message}
          </p>
        )}
      </div>
    </div>
  );
};

const TopicsAndSubtopics = ({ control, errors, setCurrent }) => {
  const {
    fields: topicFields,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: "topics",
  });

  return (
    <div className="py-2">
      <div
        className="bg-blue-500 text-xs p-2 mb-3 flex items-center gap-2 cursor-pointer text-white text-center rounded w-24"
        onClick={() => setCurrent(0)}
      >
        <FaBackward /> Previous
      </div>

      <div className="p-2 rounded shadow bg-white/35">
        {topicFields.map((topicField, topicIndex) => (
          <Topic
            key={topicField.id}
            control={control}
            errors={errors}
            topicIndex={topicIndex}
            removeTopic={removeTopic}
            isLast={topicIndex === topicFields.length - 1}
            appendTopic={() =>
              appendTopic({
                title: "",
                description: "",
                gradeLevel: "",
                subtopics: [{ title: "", description: "" }],
              })
            }
          />
        ))}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded text-sm"
          >
            Save Subject
          </button>
        </div>
      </div>
    </div>
  );
};

const Topic = ({
  control,
  errors,
  topicIndex,
  removeTopic,
  isLast,
  appendTopic,
}) => {
  const {
    fields: subtopicFields,
    append: appendSubtopic,
    remove: removeSubtopic,
  } = useFieldArray({
    control,
    name: `topics.${topicIndex}.subtopics`,
  });

  return (
    <div className="border-b-[0.8px] border-gray-200 grid grid-cols-2 py-2 gap-2">
      <div className="col-span-2 flex justify-between items-center">
        <div className="text-sm font-bold text-gray-400">
          Topic {topicIndex + 1}
        </div>
        {topicIndex > 0 && (
          <div
            onClick={() => removeTopic(topicIndex)}
            className="text-red-500 cursor-pointer flex items-center gap-1 text-xs"
          >
            <FaTrash /> Remove Topic
          </div>
        )}
      </div>

      <div>
        <Controller
          name={`topics.${topicIndex}.title`}
          control={control}
          rules={{ required: "Topic title is required" }}
          render={({ field }) => (
            <Input
              placeholder="title"
              value={field.value}
              onChange={field.onChange}
              status={errors.topics?.[topicIndex]?.title ? "error" : ""}
            />
          )}
        />
        {errors.topics?.[topicIndex]?.title && (
          <p className="text-red-500 text-xs mt-1">
            {errors.topics[topicIndex].title.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name={`topics.${topicIndex}.description`}
          control={control}
          render={({ field }) => (
            <Input
              placeholder="description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div></div>

      <div className="col-span-2 px-5">
        <div className="flex gap-2 items-center border-b-[1px] border-gray-200 w-full pb-2">
          <span className="text-xs font-semibold text-gray-400">
            Topic {topicIndex + 1} subtopics
          </span>
          <div
            onClick={() => appendSubtopic({ title: "", description: "" })}
            className="rounded border-2 w-fit p-1 text-xs border-blue-500 text-blue-500 cursor-pointer"
          >
            + add subtopic
          </div>
        </div>

        {subtopicFields.map((subtopicField, subtopicIndex) => (
          <div key={subtopicField.id} className="flex items-center gap-x-2">
            <span className="text-gray-300">{subtopicIndex + 1}. </span>
            <Subtopic
              control={control}
              errors={errors}
              topicIndex={topicIndex}
              subtopicIndex={subtopicIndex}
              removeSubtopic={removeSubtopic}
              showRemoveButton={subtopicFields.length > 1}
            />
          </div>
        ))}
      </div>

      {isLast && (
        <div
          onClick={appendTopic}
          className="rounded border-2 w-fit p-2 text-xs border-blue-500 text-blue-500 cursor-pointer"
        >
          + add topic
        </div>
      )}
    </div>
  );
};

const Subtopic = ({
  control,
  errors,
  topicIndex,
  subtopicIndex,
  removeSubtopic,
  showRemoveButton,
}) => {
  return (
    <div className="border-b-[0.8px] border-gray-200 grid grid-cols-2 py-2 gap-2 w-full">
      <div>
        <Controller
          name={`topics.${topicIndex}.subtopics.${subtopicIndex}.title`}
          control={control}
          rules={{ required: "Subtopic title is required" }}
          render={({ field }) => (
            <Input
              placeholder="title"
              value={field.value}
              onChange={field.onChange}
              status={
                errors.topics?.[topicIndex]?.subtopics?.[subtopicIndex]?.title
                  ? "error"
                  : ""
              }
            />
          )}
        />
        {errors.topics?.[topicIndex]?.subtopics?.[subtopicIndex]?.title && (
          <p className="text-red-500 text-xs mt-1">
            {errors.topics[topicIndex].subtopics[subtopicIndex].title.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Controller
          name={`topics.${topicIndex}.subtopics.${subtopicIndex}.description`}
          control={control}
          render={({ field }) => (
            <Input
              placeholder="description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {showRemoveButton && (
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => removeSubtopic(subtopicIndex)}
          />
        )}
      </div>
    </div>
  );
};

export default AddNew;
