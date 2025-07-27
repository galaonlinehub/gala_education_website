import { useQuery } from "@tanstack/react-query";

import { globalOptions } from "../../config/tanstack";
import { getTopics } from "../../utils/fns/topic";

export const useTopic = (subjectId, gradeId) => {
  const {
    data: topics,
    isLoading,
    isError,
    error,
    ...rest
  } = useQuery({
    queryKey: ["topics", subjectId, gradeId],
    queryFn: () => getTopics(subjectId, gradeId),
    enabled: !!subjectId && !!gradeId,
    ...globalOptions,
  });

  return {
    topics,
    isTopicLoadig: isLoading,
    isTopicError: isError,
    topicError: error,
    ...rest,
  };
};
