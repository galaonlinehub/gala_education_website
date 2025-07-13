import { apiGet } from "@/src/services/api/api_service";

export const getPartnerSchools = async (page = null) => {
    const { data } = await apiGet(`/partner-schools?page=${page}`);
    console.log(data)
    return data;
};

export const getPartnerSchool = async (partnerSchoolId) => {
    const { data } = await apiGet(`/partner-schools/${partnerSchoolId}`);
    return data;
};
