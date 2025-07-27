import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/src/services/api/api_service";

import { globalOptions } from "../../config/tanstack";

const getGrades = async () => {
  try {
    const response = await apiGet("/grade_levels");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.warn("Error fetching grades:", error);
  }
};

export const useGrade = () => {
  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["grades"],
    queryFn: getGrades,
    ...globalOptions,
  });

  return {
    grades: data,
    isGradesPending: isPending,
    isGradeError: isError,
    isGradeSuccess: isSuccess,
    gradeError: error,
    ...rest,
  };
};
