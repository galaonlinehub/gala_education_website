import { apiGet } from "@/src/services/api_service"

export const getAdminUsers = async()=>{
    const response = await apiGet("/users")
    console.log(response)
    return data
}