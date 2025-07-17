import { apiGet, apiPost } from "@/src/services/api/api_service";

export const getPartnerSchools = async ({ page = 1, search = "" }) => {
    const queryParams = new URLSearchParams({ page: String(page), search });

    const { data } = await apiGet(`/partner-schools?${queryParams.toString()}`);
    return data;
};

export const getPartnerSchool = async (partnerSchoolId) => {
    const { data } = await apiGet(`/partner-schools/${partnerSchoolId}`);
    return data;
};

export const createPartnerSchool = async (partnerSchoolData) => {
    const { data } = await apiPost(`/partner-schools`, partnerSchoolData, {
        "Content-Type": "multipart/form-data",
    });
    return data;
};
