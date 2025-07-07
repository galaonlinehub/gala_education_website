import { apiGet } from "@/src/services/api/api_service";

export const getAdminUsers = async () => {
    const { data } = await apiGet("/users");

    return data;
};

export const getInstructors = async (page = null) => {
    const { data } = await apiGet(`/instructors?page=${page}`);
    return data;
};

export const getStudents = async (page = null) => {
    const { data } = await apiGet(`/students?page=${page}`);
    return data;
};

export const getStudent = async (studentId) => {
    const { data } = await apiGet(`/users/${studentId}`);
    return data;
};
