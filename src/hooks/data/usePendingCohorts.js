import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../../config/tanstack";
import { apiGet } from "@/src/services/api/api_service";

export const usePendingCohorts = () => {
  const {
    data: pendingCohorts,
    isFetching: isFetchingPendingCohorts,
    isError: errorFetchinPendingCohorts,
  } = useQuery({
    queryKey: ["pending-cohorts"],
    queryFn: getPendingCohorts,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    enabled: true,
    placeholderData: [],
    ...globalOptions,
  });

  return {
    pendingCohorts,
    isFetchingPendingCohorts,
    errorFetchinPendingCohorts,
  };
};

const getPendingCohorts = async () => {
  try {
    const res = await apiGet("/pending-cohorts");
    return res.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch pending cohorts", e);
  }
};

