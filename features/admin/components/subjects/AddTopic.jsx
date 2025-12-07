'use client';
import { Input } from 'antd';
import { useFieldArray, useFormContext } from 'react-hook-form';

import AddSubtopic from './AddSubtopic';

function AddTopic({ index, removeTopic, totalTopics }) {
  const { control, setValue, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `topics.${index}.subtopics`,
  });

  return (
    <div className="border-b-[0.8px] border-gray-200 grid grid-cols-2 py-2 gap-2">
      <div className="text-sm col-span-2 font-bold text-gray-400">Topic {index + 1}</div>
      <Input {...useFormContext().register(`topics.${index}.title`)} placeholder="title" />
      <Input
        {...useFormContext().register(`topics.${index}.description`)}
        placeholder="description"
      />
      <Input
        {...useFormContext().register(`topics.${index}.gradeLevel`)}
        placeholder="grade level"
      />
      <div />
      <div className="col-span-2 px-5">
        <div className="flex gap-2 items-center border-b-[1px] border-gray-200 w-full pb-2">
          <span className="text-xs font-semibold text-gray-400">Topic {index + 1} subtopics</span>
          <button
            type="button"
            onClick={() => append({ title: '', description: '' })}
            className="rounded border-2 w-fit p-1 text-xs border-blue-500 text-blue-500 cursor-pointer"
          >
            + add subtopic
          </button>
        </div>
        {fields.map((field, subIndex) => (
          <div key={field.id} className="flex items-center gap-x-2">
            <span className="text-gray-300">{subIndex + 1}. </span>
            <AddSubtopic
              topicIndex={index}
              subtopicIndex={subIndex}
              removeSubtopic={() => remove(subIndex)}
            />
          </div>
        ))}
      </div>
      <div className="col-span-2 flex gap-2">
        {index === totalTopics - 1 && (
          <button
            type="button"
            onClick={() =>
              setValue('topics', [
                ...getValues('topics'),
                {
                  title: '',
                  description: '',
                  gradeLevel: '',
                  subtopics: [{ title: '', description: '' }],
                },
              ])
            }
            className="rounded border-2 w-fit p-2 text-xs border-blue-500 text-blue-500 cursor-pointer"
          >
            + add topic
          </button>
        )}
        {totalTopics > 1 && (
          <button
            type="button"
            onClick={removeTopic}
            className="rounded border-2 w-fit p-2 text-xs border-red-500 text-red-500 cursor-pointer"
          >
            Remove Topic
          </button>
        )}
      </div>
    </div>
  );
}

export default AddTopic;
