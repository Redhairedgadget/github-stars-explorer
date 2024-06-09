import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        staleTime: 60 * (60  * 1000), // 1 hour
      },
    },
  })

export default queryClient;
