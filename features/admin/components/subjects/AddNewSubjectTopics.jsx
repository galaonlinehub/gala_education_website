"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddTopic from "./AddTopic";

function AddNewSubjectTopics() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  return (
    <div className="p-2 rounded shadow bg-white/35">
      {fields.map((field, index) => (
        <AddTopic
          key={field.id}
          index={index}
          removeTopic={() => remove(index)}
          totalTopics={fields.length}
        />
      ))}
      <button
        type="button"
        onClick={() => append({ title: "", description: "", gradeLevel: "", subtopics: [{ title: "", description: "" }] })}
        className="rounded border-2 w-fit p-2 text-xs border-blue-500 text-blue-500 cursor-pointer mt-2"
      >
        + add topic
      </button>
    </div>
  );
}

export default AddNewSubjectTopics;
