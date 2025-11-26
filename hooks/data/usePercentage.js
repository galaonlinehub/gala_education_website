import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/services/api/api_service";
import { useUser } from "./useUser";

const getPercentageAttendance = async (userId) => {
  const response = await apiGet(`/attendance/percentage/${userId}`);
  const { success, percentage_attendance} = response.data;

  if(success){
    return percentage_attendance ?? 0;
  }
};

export const useAttendancePercentage = () => {
  const { user } = useUser();

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["get-attendance-percentage", user?.id],
    queryFn: () => getPercentageAttendance(user.id),
    enabled: !!user?.id,
  });

  return {
    percentageAttendance: data,
    isLoadingPecrntageAttendance: isPending,
    refetch,
  };
};
