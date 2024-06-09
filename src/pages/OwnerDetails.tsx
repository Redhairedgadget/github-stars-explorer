import { useParams } from 'react-router-dom';
import { useFetchOwnerDetails } from '../apis/useFetchOwnerDetails';

const Owner: React.FC = () => {
  const { owner } = useParams<{owner: string}>();
  const ownerDetails = useFetchOwnerDetails(owner!)

  if (ownerDetails.isLoading) {
    return <p>Loading...</p>;
  }

  if (ownerDetails.isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      {ownerDetails.isSuccess && (
        <div>
          <div className='header'>
            <button onClick={() => window.history.back()}>Back</button>
            <h1>{ownerDetails.data.login}</h1>
          </div>
          <img src={ownerDetails.data.avatar_url} alt={ownerDetails.data.login} width="100" />
          <p>{ownerDetails.data.bio}</p>
          <p>Location: {ownerDetails.data.location}</p>
          <a href={ownerDetails.data.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Owner;
