import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

import { globalOptions } from "../../config/tanstack";

export const useCohortEnrolledStudents = (id) => {
  const getEnrolledStudents = async () => {
    try {
      const response = await apiGet(`/cohort/${id}/students`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching cohort enrolled students:", error);
      throw error;
    }
  };

  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["enrolled-students", id],
    queryFn: getEnrolledStudents,
    enabled: !!id,
    ...globalOptions,
  });

  return {
    enrolledStudents: data,
    enrolledStudentsPending: isPending,
    isEnrolledStudentsError: isError,
    enrolledStudentsSuccess: isSuccess,
    enrolledStudentsError: error,
    ...rest,
  };
};
