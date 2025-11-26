import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/services/api/api_service";
import { useUser } from "./useUser";

const getUserAttendance = async (userId, userRole) => {

  const response = await apiGet(`/attendance/${userRole}/${userId}`);
  const { success, lessons } = response.data;

  if (!success) {
    throw new Error(`Failed to fetch attendance`);
  }

  return lessons ?? [];
};

export const UseAttendance = () => {
  const { user } = useUser();


  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["get-attendance", user?.id],
    queryFn: () => getUserAttendance(user.id, user?.role),
    enabled: !!user?.id,
  });

  return {
    userAttendance: data,
    isLoadingAttendance: isLoading,
    isFetchingAttendance: isFetching,
    refetch,
  };
};
