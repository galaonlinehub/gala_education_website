import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { apiGet, apiPut } from "../services/api_service";
import { useUser } from "./useUser";

export const useReviews = (cohortId) => {
    const { user } = useUser();

    const getInstructorReviews = async () => {
        if (!user?.instructor_id) {
            return null;
        }

        try {
            const response = await apiGet(`/reviews/instructor/${user?.instructor_id}`);
            if (response.status === 200) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching instructor reviews:", error);
            throw error;
        }
    };

    const getCohortReviewsSummary = async () => {
        try {
            const response = await apiGet(`/reviews/cohort/${cohortId}/summary`);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching cohort summary:", error);
            throw error;
        }
    };

    const getInstructorReviewsSummary = async () => {
        if (!user?.instructor_id) {
            return null;
        }

        try {
            const response = await apiGet(`/reviews/instructor/${user?.instructor_id}/summary`);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching instructor summary:", error);
            throw error;
        }
    };

    const getCohortReviews = async () => {
        try {
            const response = await apiGet(`/reviews/cohort/${cohortId}`);
            if (response.status === 200) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching cohort reviews:", error);
            throw error;
        }
    };

    const instructorReviewsQuery = useQuery({
        queryKey: ["instructor-reviews", user?.instructor_id],
        queryFn: getInstructorReviews,
        enabled: !!user?.instructor_id,
        ...globalOptions,
    });

    const instructorReviewsQuerySummary = useQuery({
        queryKey: ["instructor-summary", user?.instructor_id],
        queryFn: getInstructorReviewsSummary,
        enabled: !!user?.instructor_id,
        ...globalOptions,
    });

    const cohortReviewsQuerySummary = useQuery({
        queryKey: ["cohort-summary", cohortId],
        queryFn: getCohortReviewsSummary,
        enabled: !!cohortId,
        ...globalOptions,
    });

    const cohortReviewsQuery = useQuery({
        queryKey: ["class-reviews", cohortId],
        queryFn: getCohortReviews,
        enabled: !!cohortId,
        ...globalOptions,
    });

    return {
        instructorReviews: instructorReviewsQuery.data,
        cohortReviews: cohortReviewsQuery.data,
        isInstructorReviewsPending: instructorReviewsQuery.isPending,
        isCohortReviewsPending: cohortReviewsQuery.isPending,
        isInstructorReviewsError: instructorReviewsQuery.isError,
        isCohortReviewsError: cohortReviewsQuery.isError,
        isInstructorReviewsSuccess: instructorReviewsQuery.isSuccess,
        isCohortReviewsSuccess: cohortReviewsQuery.isSuccess,
        instructorReviewsError: instructorReviewsQuery.error,
        cohortReviewsError: cohortReviewsQuery.error,

        instructorSummary: instructorReviewsQuerySummary.data,
        cohortSummary: cohortReviewsQuerySummary.data,
        isInstructorSummaryPending: instructorReviewsQuerySummary.isPending,
        isCohortSummaryPending: cohortReviewsQuerySummary.isPending,

        refetchInstructorReviews: instructorReviewsQuery.refetch,
        refetchCohortSummary: getCohortReviewsSummary,
        refetchCohortReviews: cohortReviewsQuery.refetch,
    };
};