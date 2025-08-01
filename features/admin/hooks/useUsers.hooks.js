import { useQuery } from "@tanstack/react-query";

import { getStudent, getStudents } from "@/features/admin";

export const useStudents = (page) => {
  return useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page),
  });
};

export const useStudent = (studentId) => {
  return useQuery({
    queryKey: ["student"],
    queryFn: () => getStudent(studentId),
  });
};
