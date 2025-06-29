import { useEffect, useState } from "react";
import { getMetrics } from "@/src/services/socket/socket-api";

/**
 * Socket metrics hook for monitoring
 */
export const useSocketMetrics = (updateInterval = 5000) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics());
    };

    // Initial update
    updateMetrics();

    // Periodic updates
    const interval = setInterval(updateMetrics, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return metrics;
};
