import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../../config/tanstack";
import { apiGet } from "../../services/api_service";


export const useStudentReviews = (cohortId, instructorId) => {

    const getInstructorReviews = async () => {

        try {
            const response = await apiGet(`/reviews/instructor/${instructorId}/my-review`);
            if (response.status === 200) {
                return response.data?.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching student instructor reviews:", error);
            throw error;
        }
    };

    const getCohortReviews = async () => {

        try {
            const response = await apiGet(`/reviews/cohort/${cohortId}/my-review`);
            if (response.status === 200) {
                return response.data?.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching student cohort reviews:", error);
            throw error;
        }
    };

    const instructorReviews = useQuery({
        queryKey: ["student-instructor-reviews", instructorId],
        queryFn: getInstructorReviews,
        enabled: !!instructorId,
        ...globalOptions,
    });

    const cohortReviews = useQuery({
        queryKey: ["student-cohort-reviews", cohortId],
        queryFn: getCohortReviews,
        enabled: !!cohortId,
        ...globalOptions,
    });


    return {
        studentInstructorReviews: instructorReviews.data,
        studentInstructorReviewsPending: instructorReviews.isPending,
        studentInstructorReviewsError: instructorReviews.isError,
        studentInstructorReviewsSuccess: instructorReviews.isSuccess,
        studentInstructorReviewsError: instructorReviews.error,
        refetchInstructorReviews: instructorReviews.refetch,
        refetchCohortReviews: cohortReviews.refetch,
        studentCohortReviews: cohortReviews.data,
        studentCohortReviewsPending: cohortReviews.isPending,
        studentCohortReviewsError: cohortReviews.isError,
        studentCohortReviewsSuccess: cohortReviews.isSuccess,
        studentCohortReviewsError: cohortReviews.error,
    };
};