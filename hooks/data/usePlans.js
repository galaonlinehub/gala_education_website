import { globalOptions } from "@/config/tanstack";
import { apiGet } from "@/services/api/api_service";
import { getRoleFromUrl } from "@/utils/fns/general";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";


export const usePlans = () => {

    const currentUrl = usePathname();
    const accountType = getRoleFromUrl(currentUrl);

    console.log("currentURL", currentUrl);
    console.log("acoount type", accountType);

    const getPlans = async() =>{
        const response = await apiGet(`payment-plans?type=${accountType}`);
        return response.data;
    }

    const {
        data: plans,
        isFetching: isFetchingPlans,
        error: errorOnFetchingPlans,
    } = useQuery({
        queryKey: ["payment-plan", accountType],
        queryFn: getPlans,
        // enabled: !!accountType,
        retry: 1,
        ...globalOptions,
    });

    return {
        plans,
        isFetchingPlans,
        errorOnFetchingPlans,
    }

}