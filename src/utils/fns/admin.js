import { apiGet } from "@/src/services/api/api_service";

export const getAdminUsers = async () => {
  const { data } = await apiGet("/users");

  return data;
};
