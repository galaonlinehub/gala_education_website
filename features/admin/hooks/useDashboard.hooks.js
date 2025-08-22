import { useQuery } from "@tanstack/react-query";
import { FaUserTie } from "react-icons/fa6";
import { LuBookOpenText } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";

import { globalOptions } from "@/config/tanstack";
import { apiGet } from "@/services/api/api_service";

export const useDashboard = () => {
  const {
    data: response,
    isFetching: isFetchingMetrics,
    error: metricsError,
  } = useQuery({
    queryKey: ["admin-dashboard-metrics"],
    queryFn: () => apiGet("/dashboard/metrics"),
    ...globalOptions,
  });

  const metrics = Array.isArray(response?.data) ? response.data : [];

  const metricsConfig = [
    {
      title: "Students",
      icon: PiStudentFill,
      bg: "bg-purple-300/20 text-purple-500",
    },
    {
      title: "Instructors",
      icon: FaUserTie,
      bg: "bg-blue-300/20 text-blue-500",
    },
    {
      title: "Cohorts",
      icon: LuBookOpenText,
      bg: "bg-orange-500/15 text-orange-500",
    },
  ];

  return {
    metrics,
    isFetchingMetrics,
    metricsError,
    metricsConfig,
  };
};
