import { useQuery } from "@tanstack/react-query";

import { useUser } from "./useUser";
import { globalOptions } from "../../config/tanstack";
import { apiGet, apiPut } from "../../services/api/api_service";

export const useReviews = (cohortId, instructorId) => {
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

        try {
            const id = user.instructor_id ?? instructorId;
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

    const id = user?.instructor_id ?? instructorId;

    const instructorReviewsQuery = useQuery({
        queryKey: ["instructor-reviews", id],
        queryFn: getInstructorReviews,
        enabled: !!id,
        ...globalOptions,
    });


    const instructorReviewsQuerySummary = useQuery({
        queryKey: ["instructor-summary",id],
        queryFn: getInstructorReviewsSummary,
        enabled: !!id,
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