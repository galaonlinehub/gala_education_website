import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

import { globalOptions } from "../../config/tanstack";

const getLiveLessons = async (category = "ongoing") => {
  const { status, data } = await apiGet(`/get-lessons/${category}`);
  if (status !== 200)
    throw new Error(`Failed to fetch live lessons: ${status}`);
  return data;
};

export const useLiveLessons = (category = "ongoing") => {
  const {
    data = [],
    isPending,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-lessons", category],
    queryFn: () => getLiveLessons(category),
    // ...globalOptions,
  });

  return {
    liveLessons: data,
    isFetchingLiveLessons: isPending,
    isLoadingLiveLessons: isLoading,
    refetch
  };
};