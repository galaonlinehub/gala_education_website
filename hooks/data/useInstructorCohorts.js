import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

import { useUser } from "./useUser";
import { globalOptions } from "../../config/tanstack";

export const useInstructorCohorts = (pageSize = null) => {
  const { user } = useUser();

  const getInstructorCohorts = async () => {
    try {
      const response = await apiGet(
        `/instructor/${user.instructor_id}/cohorts?pageSize=${pageSize}`
      );
      if (response.status === 200) {
        // Transform the raw API data to match the table structure
        const formattedData = response.data.data.map((cohort, index) => ({
          key: cohort.id,
          cohortId: cohort.id,
          class: cohort.topic?.title || "No Title",
          startDate: cohort.timetable?.start_date || "N/A",
          endDate: cohort.timetable?.end_date || "N/A",
          students: cohort.enrollments?.length || 0,

          data: cohort,
        }));

        return formattedData;
      }
    } catch (error) {
      console.warn("Error fetching instructor cohorts:", error);
      throw error; // Re-throw to let react-query handle the error state
    }
  };

  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["instructor_cohorts", user?.instructor_id, pageSize],
    queryFn: getInstructorCohorts,
    ...globalOptions,
    enabled: !!user?.instructor_id,
  });

  return {
    InstructorCohorts: data || [],
    isInstructorCohortsPending: isPending,
    isInstructorCohortsError: isError,
    isInstructorCohortsSuccess: isSuccess,
    InstructorCohortsError: error,
    ...rest,
  };
};
