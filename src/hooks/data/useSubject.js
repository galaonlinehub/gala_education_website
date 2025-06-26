import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../../config/tanstack";
import { getSubjects } from "../../utils/fns/subject";

export const useSubject = () => {
  const {
    data: subjects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    ...globalOptions,
  });

  return {
    subjects,
    isLoading,
    isError,
  };
};
