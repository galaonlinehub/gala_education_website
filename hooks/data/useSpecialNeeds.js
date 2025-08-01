import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

import { globalOptions } from "../../config/tanstack";

const getSpecialNeeds = async () => {
  try {
    const response = await apiGet("/special_needs");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.warn("Error fetching special needs:", error);
  }
};

export const useSpecialNeeds = () => {
  const { data, isFetching, isError, isSuccess, error, ...rest } = useQuery({
    queryKey: ["special_needs"],
    queryFn: getSpecialNeeds,
    ...globalOptions,
  });

  return {
    special_needs: data,
    isSpecialNeedsPending: isFetching,
    isSpecialNeedsError: isError,
    isSpecialNeedsSuccess: isSuccess,
    SpecialNeedsError: error,
    ...rest,
  };
};
