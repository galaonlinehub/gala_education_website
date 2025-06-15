import { useQuery } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { apiPost } from "@/src/services/api/api_service"


export const useLesson = () => {

    const getLessonToken = async (roomLink) => {
        try {
            const response = await apiPost(`/jaas/token`, { "roomName": roomLink });
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.warn("Error fetching lesson token:", error);
            throw error;
        }
    };


    const { data, isPending, isError, isSuccess, error, ...rest } = useQuery({
        queryKey: ["lesson-token"],
        queryFn: () => Promise.resolve(null),
        enabled: false,
        ...globalOptions,
    });

    return {
        lessonToken: data,
        lessonTokenPending: isPending,
        isLessonTokenError: isError,
        lessonTokenSuccess: isSuccess,
        lessonTokenError: error,
        getLessonToken,
        ...rest,
    };
};