import { useQuery } from "@tanstack/react-query";

import { globalOptions } from "@/config/tanstack";
import { apiGet } from "@/services/api/api_service";

export const useRecentPayments = () => {
  const recentPayments = useQuery({
    queryKey: "recent-payments",
    queryFn: () => apiGet("/recent-payments"),
    ...globalOptions,
  });

  return {
    recentPayments,
  };
};
