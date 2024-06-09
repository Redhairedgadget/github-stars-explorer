import { useParams } from 'react-router-dom';
import { useFetchOwnerDetails } from '../apis/useFetchOwnerDetails';
import styles from './OwnerDetails.module.scss'
import {ReactComponent as LocationIcon} from '../assets/LocationIcon.svg'
import Spinner from '../components/ui/Spinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const Owner: React.FC = () => {
  const { owner } = useParams<{owner: string}>();
  const ownerDetails = useFetchOwnerDetails(owner!)

  if (ownerDetails.isLoading) {
    return <Spinner />
  }

  if (ownerDetails.isError) {
    return <ErrorMessage message={ownerDetails.error.message} />;
  }

  return (
    <div>
      <div>
        <button onClick={() => window.history.back()}>Back</button>
      </div>

      {ownerDetails.isSuccess && (
        <div className={styles.ownerDetails}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={ownerDetails.data.avatar_url} alt={`${ownerDetails.data.login}'s avatar`} />
            </div>

            <div className={styles.info}>
              <h1 className={styles.name}>{ownerDetails.data.login}</h1>
              <p className={styles.bio}>{ownerDetails.data.bio}</p>
              {ownerDetails.data.location && <p><LocationIcon style={{ fill: 'var(--very-light-gray)' }}/> {ownerDetails.data.location}</p>}
              <a href={ownerDetails.data.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </div>
        </div>
      )}
    </div>
  );
};

export default Owner;
