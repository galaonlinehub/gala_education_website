import { apiGet } from "@/src/services/api/api_service";

export const getTopics = async (subjectId, gradeId) => {
  try {
    console.log("Fetching topics for subject:", subjectId, "grade:", gradeId);
    const response = await apiGet(
      `/topics/subject/${subjectId}/grade_level/${gradeId}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error fetching topics:", error.message);
  }
  return [];
};
