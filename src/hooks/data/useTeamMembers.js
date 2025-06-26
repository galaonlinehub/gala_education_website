import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../../config/tanstack";
import { apiGet } from "@/src/services/api/api_service";

export const useTeamMembers = () => {
  const getTeamMembers = async () => {
    try {
      const response = await apiGet(`/team-members`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching team members:", error);
      throw error;
    }
  };

  const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["instructor-subjects"],
    queryFn: getTeamMembers,
    ...globalOptions,
  });

  return {
    teamMembers: data,
    isMembersPending: isPending,
    isMembersError: isError,
    isMembersSuccess: isSuccess,
    membersError: error,
    ...rest,
  };
};
