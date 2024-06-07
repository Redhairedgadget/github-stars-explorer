import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopStarredRepositories } from '../api';
import { useQuery } from 'react-query';
import { RepositoriesResponse } from './../types';

const RepositoryList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error, isSuccess } = useQuery<RepositoriesResponse>(
    ['repositories', currentPage],
    () => fetchTopStarredRepositories(currentPage),
    { keepPreviousData: true, staleTime: Infinity }
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      <h1>Top Starred Repositories</h1>
      {isSuccess &&
        <div>
          <ul>
            {data.repositories.map(repo => (
              <li key={repo.id}>
                <Link to={`/repository/${repo.owner.login}/${repo.name}`}>
                  {repo.name} - {repo.stargazers_count} ⭐ 
                </Link>
              </li>
            ))}
          </ul>

        {data.totalPages > 1 && 
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>Page {currentPage}</span>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages} 
            >
              Next
            </button>
          </div>
        }
        </div>
      }
    </div>
  );
  
};

export default RepositoryList;
