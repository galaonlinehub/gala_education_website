import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { apiGet } from "@/src/services/api/api_service";
import { useUser } from "./useUser";

export const useInstructorSubjects = () => {
  const { user } = useUser();

  const getInstructor = async () => {
    if (!user?.instructor_id) {
      return null;
    }

    try {
      const response = await apiGet(`/user/subjects`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching instructor subjects:", error);
      throw error;
    }
  };

  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["instructor-subjects", user?.instructor_id],
    queryFn: getInstructor,
    enabled: !!user?.instructor_id,
    ...globalOptions,
  });

  return {
    instructorSubjects: data,
    isInstructorSubjectsPending: isPending,
    isInstructorSubjectsError: isError,
    isInstructorSubjectsSuccess: isSuccess,
    instructorError: error,
    ...rest,
  };
};
