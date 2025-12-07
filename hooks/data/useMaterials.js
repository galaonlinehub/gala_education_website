import React from 'react'
import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/services/api/api_service";

const getMaterials = async (type = "notes") => {
  try {
    const response = await apiGet(`/study-materials?type=${type}`);
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
}

export const useMaterials = (type = "notes") => {

  const { data, isError, isPending } = useQuery({
    queryKey: ["get-materials", type],
    queryFn: () => getMaterials(type),
    // ...globalOptions,
  });

  return {
    materials: data?.data || [],
    meta: data?.meta || {},
    materialsLoading: isPending,
    isError
  }
}

export default useMaterials