import { useMutation } from "@tanstack/react-query";
import { globalOptions } from "../config/tanstack";
import { apiGet } from "@/src/services/api/api_service";

export const useSubTopics = () => {
    const getSubTopics = async (id) => {
        const response = await apiGet(`/topic/${id}/subtopics`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Failed to fetch subtopics");
    };

    const {
        mutate: getSubTopicsMutate,
        data: subTopics,
        isPending: isSubtopicsPending,
        isError: isSubtopicsError,
        isSuccess: isSubtopicsSuccess,
        error: SubtopicsError,
        ...rest
    } = useMutation({
        mutationFn: getSubTopics,
        ...globalOptions,
    });

    return {
        getSubTopics: getSubTopicsMutate,
        subTopics,
        isSubtopicsPending,
        isSubtopicsError,
        isSubtopicsSuccess,
        SubtopicsError,
        ...rest,
    };
};
