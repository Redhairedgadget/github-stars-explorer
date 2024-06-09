import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const fetchTopStarredRepositories = async (page: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/repositories`, {
        params: {
          q: 'stars:>1', // github search for stars works properly only if > 1 is provided
          sort: 'stars',
          order: 'desc',
          per_page: 20,
          page
        }
      });

      // Get total pages from the Link header
        const linkHeader = response.headers.link;
        const totalPages = linkHeader ? parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)[1]) : 1;
      
      console.log({
        repositories: response.data.items,
        totalPages
      })
      return {
        repositories: response.data.items,
        totalPages
      }
    } catch (error) {
      // return error
      console.error('Error fetching top starred repositories:', error);
      throw error;
    }
};

export const fetchOwnerDetails = async (owner: string) => {
  const response = await axios.get(`${API_BASE_URL}/users/${owner}`);
  return response.data;
};