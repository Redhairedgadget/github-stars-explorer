import { fetchTopStarredRepositories } from "./api"
import { RepositoriesResponse } from "../types"
import { useQuery } from "@tanstack/react-query"

export const useFetchRepos = (currentPage: number) => {
    return useQuery<RepositoriesResponse, Error>({
        queryKey: ['repositories', currentPage],
        queryFn:() => fetchTopStarredRepositories(currentPage),
    })
}
