import { useMutation } from "@tanstack/react-query"

import { askGalaAi } from "@/src/features/ai"

export const useGalaAiResponse = ()=>{
    return useMutation({
        mutationFn:(prompt)=>askGalaAi(prompt)
    })
} 