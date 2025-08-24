import { apiGet } from "@/services/api/api_service";

export const getSubjects = async () => {
  try {
    const response = await apiGet("/subjects");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error fetching subjects:", error.message);
  }
  return [];
};
