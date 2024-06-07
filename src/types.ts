export interface Repository {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
    owner: {
      login: string;
    };
  }
  
  export interface RepositoriesResponse {
    repositories: Repository[];
    totalPages: number;
  }  