import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { getEnrolledTopics } from "../utils/fns/global";
import { apiGet } from "@/src/services/api/api_service";

export const useEnrolledTopics = (cohortId, instructor_id) => {
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
    queryFn: () =>
      cohortId ? getCohortDetails(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
    ...globalOptions,
  });

  const {
    data: enrolledSubjects = [],
    isFetching: isFetchingEnrolledSubjects,
    isError: isEnrolledSubjectsError,
  } = useQuery({
    queryKey: ["enrolled-subjects"],
    queryFn: getEnrolledSubjects,
    ...globalOptions,
  });

  const {
    data: instructorDetails,
    isFetching: instructorDetailsLoading,
    isError: instructorDetailsError,
  } = useQuery({
    queryKey: ["instructor-details", instructor_id],
    queryFn: () =>
      instructor_id
        ? getInstructorDetails(instructor_id)
        : Promise.resolve(null),
    enabled: !!instructor_id,
    ...globalOptions,
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

    //ENROLLED SUBJECTS
    enrolledSubjects,
    isFetchingEnrolledSubjects,
    isEnrolledSubjectsError,

    //INSTRUCTOR DETAILS
    instructorDetails,
    instructorDetailsLoading,
    instructorDetailsError,
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

const getEnrolledSubjects = async () => {
  return [];
  try {
    const response = await apiGet("");
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getInstructorDetails = async (id) => {
  try {
    const response = await apiGet(`instructor/${id}/details`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
