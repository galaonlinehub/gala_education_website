import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/src/services/api/api_service";

import { useUser } from "./useUser";
import { globalOptions } from "../../config/tanstack";

export const useInstructorProfile = () => {
  const { user } = useUser();

  const getInstructorProfile = async () => {
    if (!user?.instructor_id) {
      return null;
    }

    try {
      const response = await apiGet(`/instructor/my-profile`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching instructor Profile:", error);
      throw error;
    }
  };

  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["instructor-profile", user?.instructor_id],
    queryFn: getInstructorProfile,
    enabled: !!user?.instructor_id,
    ...globalOptions,
  });

  return {
    instructorProfile: data,
    isInstructorProfilePending: isPending,
    isInstructorProfileError: isError,
    isInstructorProfileSuccess: isSuccess,
    instructorProfileError: error,
    ...rest,
  };
};
