import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { getEnrolledTopics } from "../utils/fns/global";

export const useEnrolledTopics = () => {
  const {
    data: enrolledTopics,
    isFetching: enrolledTopicsLoading,
    error: enrolledTopicsError,
  } = useQuery({
    queryKey: ["enrolledTopics"],
    queryFn: getEnrolledTopics,
    // ...globalOptions,
  });

  return {
    enrolledTopics,
    enrolledTopicsLoading,
    enrolledTopicsError,
  };
};
