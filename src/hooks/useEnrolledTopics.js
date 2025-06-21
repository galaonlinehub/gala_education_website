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
    queryKey: ["instructor-details", cohortId],
    queryFn: () =>
      cohortId ? getInstructorDetails(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
    ...globalOptions,
  });

  const {
    data: classSyllabus,
    isFetching: classSyllabusFetching,
    isError: classSyllabusError,
  } = useQuery({
    queryKey: ["class-syllabus", cohortId],
    queryFn: () =>
      cohortId ? getClassSyllabus(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
    ...globalOptions,
  });

  const {
    data: classSchedule,
    isFetching: classScheduleFetching,
    isError: classScheduleError,
  } = useQuery({
    queryKey: ["class-schedule", cohortId],
    queryFn: () =>
      cohortId ? getClassSchedule(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
    ...globalOptions,
  });

  const {
    data: classMaterials,
    isFetching: classMaterialsFetching,
    isError: classMaterialsErrors,
  } = useQuery({
    queryKey: ["class-material", cohortId],
    queryFn: () =>
      cohortId ? getClassMaterials(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
    ...globalOptions,
  });

  const {
    data: classAssigments,
    isFetching: classAssigmentsFetching,
    isError: classAssignmentsError,
  } = useQuery({
    queryKey: ["class-material", cohortId],
    queryFn: () =>
      cohortId ? getClassAssignment(cohortId) : Promise.resolve(null),
    enabled: !!cohortId,
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

    //Class syllabus
    classSyllabus,
    classSyllabusFetching,
    classSyllabusError,

    //class schedule
    classSchedule,
    classScheduleFetching,
    classScheduleError,

    //class materials
    classMaterials,
    classMaterialsFetching,
    classMaterialsErrors,

    //class assignment
    classAssigments,
    classAssigmentsFetching,
    classAssignmentsError,
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
  try {
    const response = await apiGet(`/user/subjects`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getInstructorDetails = async (cohortId) => {
  try {
    const response = await apiGet(`cohort/${cohortId}/instructor`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getClassSyllabus = async (cohortId) => {
  try {
    const response = await apiGet(`cohort/${cohortId}/syllabus`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getClassSchedule = async (cohortId) => {
  try {
    const response = await apiGet(`cohort/${cohortId}/schedule`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
const getClassMaterials = async (cohortId) => {
  return [];
  try {
    const response = await apiGet(`cohort/${cohortId}/schedule`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};


const getClassAssignment = async (cohortId) => {
  return [];
  try {
    const response = await apiGet(`cohort/${cohortId}/schedule`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};


// const getClassMaterials = async (cohortId) => {
//   return [];
//   try {
//     const response = await apiGet(`cohort/${cohortId}/schedule`);
//     return response.data;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// };