import { useQuery } from "@tanstack/react-query"
import { fetchOwnerDetails } from "./api"

type OwnerDetails = {
    login: string
    avatar_url: string
    bio: string
    location: string
    html_url: string
}

export const useFetchOwnerDetails = (owner: string) => {
    return useQuery<OwnerDetails, Error>({
        queryKey:['owner', owner], 
        queryFn:() => fetchOwnerDetails(owner)
    })
}