import { Input } from "antd";
import React from "react";
import { useFormContext } from "react-hook-form";

function AddSubtopic({ topicIndex, subtopicIndex, removeSubtopic }) {
  const { register } = useFormContext();

  return (
    <div className="border-b-[0.8px] border-gray-200 grid grid-cols-2 py-2 gap-2 w-full">
      <Input {...register(`topics.${topicIndex}.subtopics.${subtopicIndex}.title`)} placeholder="title" />
      <Input {...register(`topics.${topicIndex}.subtopics.${subtopicIndex}.description`)} placeholder="description" />
      <button
        type="button"
        onClick={removeSubtopic}
        className="rounded border-2 w-fit p-1 text-xs border-red-500 text-red-500 cursor-pointer col-span-2"
      >
        Remove Subtopic
      </button>
    </div>
  );
}

export default AddSubtopic;

