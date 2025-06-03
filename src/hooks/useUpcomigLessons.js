import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { apiGet } from "../services/api_service";

const getUpcomingLessons = async () => {
  const { status, data } = await apiGet("/upcoming-lessons");
  if (status !== 200) throw new Error(`Failed to fetch upcoming lessons: ${status}`);
  return data;
};

export const useUpcomingLessons = () => {
  const { data = [], isFetching, isLoading } = useQuery({
    queryKey: ["upcoming-lessons"],
    queryFn: getUpcomingLessons,
    // ...globalOptions,
  });

  return { upcomingLessons: data, isFetchingUpcomingLessons: isFetching , isLoadingUpcomingLessons: isLoading};   
};

