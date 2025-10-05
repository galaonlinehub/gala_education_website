import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUser";
import { globalOptions } from "../../config/tanstack";
import { apiGet, apiPut } from "../../services/api/api_service";

export const useReviews = () => {
  const { user } = useUser();

  const getInstructorReviews = async () => {
    console.log("here is insturctor id:", instructorId);
    try {
      const id = user?.instructor_id ?? instructorId;
      const response = await apiGet(`/reviews/instructor/${id}`);

      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching instructor reviews:", error);
      throw error;
    }
  };



  const getInstructorReviewsSummary = async () => {
    try {
      const id = user?.instructor_id;
      const response = await apiGet(`/reviews/instructor/${id}/summary`);

      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.warn("Error fetching instructor summary:", error);
      throw error;
    }
  };


  const id = user?.instructor_id;

  const instructorReviewsQuery = useQuery({
    queryKey: ["instructor-reviews", id],
    queryFn: getInstructorReviews,
    enabled: !!id,
    ...globalOptions,
  });

  const instructorReviewsQuerySummary = useQuery({
    queryKey: ["instructor-summary", id],
    queryFn: getInstructorReviewsSummary,
    enabled: !!id,
    ...globalOptions,
  });


  return {
    instructorReviews: instructorReviewsQuery.data,
    isInstructorReviewsPending: instructorReviewsQuery.isPending,
    isInstructorReviewsError: instructorReviewsQuery.isError,
    isInstructorReviewsSuccess: instructorReviewsQuery.isSuccess,
    instructorReviewsError: instructorReviewsQuery.error,

    instructorSummary: instructorReviewsQuerySummary.data,
    isInstructorSummaryPending: instructorReviewsQuerySummary.isPending,

    refetchInstructorReviews: instructorReviewsQuery.refetch,
  };
};
