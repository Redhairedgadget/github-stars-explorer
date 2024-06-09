import { useLocation } from 'react-router-dom';
import { Repository } from '../types';
import styles from './RepoDetails.module.scss'

type LocationState = {
  repository: Repository
}

const RepoDetails: React.FC = () => {
  const state = useLocation().state as LocationState;
  const repository = state.repository;

  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>
      <div className={styles.repoDetailsContainer}>
        <h3>
          {repository.owner?.login &&
            <a href={`/owner/${repository.owner.login}`}>{repository.owner.login} / </a>
          }
          {repository.name}
        </h3>
        <p>{repository.description}</p>
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoDetails;
