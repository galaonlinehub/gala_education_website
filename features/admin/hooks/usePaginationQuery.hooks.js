import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePaginationQuery = (
  key,
  queryFn,
  page,
  additionalParams = {}
) => {
  const queryParams = { page, ...additionalParams };

  return useQuery({
    queryKey: [key, queryParams], 
    queryFn: () => queryFn(queryParams),
    placeholderData: keepPreviousData,
  });
};
