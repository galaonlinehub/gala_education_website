import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePaginationQuery = (
  key,
  queryFn,
  page,
  additionalParams
) => {
  return useQuery({
    queryKey: [key, page, additionalParams],
    queryFn: () => queryFn({ page, ...additionalParams }),
    placeholderData: keepPreviousData,
  });
};
