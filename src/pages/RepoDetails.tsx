import { useLocation } from 'react-router-dom';
import { Repository } from '../types';

type LocationState = {
  repository: Repository
}

const RepoDetails: React.FC = () => {
  const state = useLocation().state as LocationState;
  const repository = state.repository;

  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
      <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      {repository.owner?.login &&
        <p>Owner: <a href={`/owner/${repository.owner.login}`}>{repository.owner.login}</a></p>
      }
    </div>
  );
};

export default RepoDetails;
