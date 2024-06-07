import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRepositoryDetails } from '../api';

interface Params {
  owner: string;
  repo: string;
}

const RepositoryDetails: React.FC = () => {
    // TODO: deal with any
  const { owner, repo } = useParams<any>();
  const [repository, setRepository] = useState<any>(null);

  useEffect(() => {
    const getRepositoryDetails = async () => {
      if (owner && repo) { // Ensure owner and repo are not undefined
        const repoDetails = await fetchRepositoryDetails(owner, repo);
        setRepository(repoDetails);
      }
    };
    getRepositoryDetails();
  }, [owner, repo]);

  if (!repository) return <div>Loading...</div>;

  return (
    <div>
      <h2>{repository.name}</h2>
      <p>{repository.description}</p>
      <a href={repository.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
      <p>Owner: <Link to={`/owner/${repository.owner.login}`}>{repository.owner.login}</Link></p>
    </div>
  );
};

export default RepositoryDetails;
