import { useQueries } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

import { globalOptions } from "../../config/tanstack";

const getSubscriptions = async (type) => {
  const endpoint = `/user-subscriptions?type=${type}`;

  try {
    const response = await apiGet(endpoint);
    if (response?.status === 200 && response.data) {
      return response.data ?? [];
    } else {
      return [];
    }
    throw new Error(`Unexpected status: ${response.status}`);
  } catch (error) {
    console.warn(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const useUserSubscriptions = () => {
  const types = ["current", "previous", "next"];

  const queries = useQueries({
    queries: types.map((type) => ({
      queryKey: ["subscriptions", type],
      queryFn: () => getSubscriptions(type),
      ...globalOptions,
    })),
  });

  const [current, previous, next] = queries;

  return { current, previous, next };
};
