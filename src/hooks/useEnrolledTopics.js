import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { getEnrolledTopics } from "../utils/fns/global";
import { apiGet } from "../services/api_service";

export const useEnrolledTopics = (cohortId) => {
  const {
    data: enrolledTopics,
    isFetching: enrolledTopicsLoading,
    error: enrolledTopicsError,
  } = useQuery({
    queryKey: ["enrolledTopics"],
    queryFn: getEnrolledTopics,
    ...globalOptions,
  });

  const {
    data: cohortDetails,
    isFetching: cohortDetailsLoading,
    error: cohortDetailsError,
  } = useQuery({
    queryKey: ["cohort-details", cohortId],
    queryFn: () => cohortId ? getCohortDetails(cohortId) : Promise.resolve(null),  
    enabled: !!cohortId, 
    ...globalOptions
  });

  return {
    // ENROLLED TOPICS
    enrolledTopics,
    enrolledTopicsLoading,
    enrolledTopicsError,

    // COHORT DETAILS
    cohortDetails,
    cohortDetailsLoading,
    cohortDetailsError,
  };
};

const getCohortDetails = async (cohortId) => {
  try {
    const response = await apiGet(`cohort/${cohortId}/details`);
    return response.data;  
  } catch (e) {
    console.error(e);
    throw e;
  }
};
