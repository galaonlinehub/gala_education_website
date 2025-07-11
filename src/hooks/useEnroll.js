import { useState } from "react";
import { globalOptions } from "../config/tanstack";
import { useQuery } from "@tanstack/react-query";
import { useEnrollMe } from "../store/student/useEnrollMe";
import { apiGet } from "@/src/services/api/api_service";

export const useEnroll = () => {
  const { enrollCohortId } = useEnrollMe();

  const idx = enrollCohortId;

  const {
    data: enrollMeCohort,
    isFetching: enrollMeCohortIsFetching,
    isError: enrollMeCohortError,
  } = useQuery({
    queryKey: ["enrollMeCohort", idx],
    queryFn: () => getEnrollMeCohort(idx),
    ...globalOptions,
    enabled: !!idx,
    staleTime: Infinity,
  });
  return { enrollMeCohort, enrollMeCohortIsFetching, enrollMeCohortError };
};

const getEnrollMeCohort = async (idx) => {
  const res = await apiGet(`cohorts/${idx}`);
  return res.data.data;
};
