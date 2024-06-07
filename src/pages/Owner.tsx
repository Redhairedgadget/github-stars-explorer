import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOwnerDetails } from '../api';

interface Params {
  owner: string;
  login: string;
  avatar_url: string;
  bio: string;
  location: string;
  html_url: string;
}

const Owner: React.FC = () => {
    // TODO: deal with any
  const { owner } = useParams<any>();
  const [ownerDetails, setOwnerDetails] = useState<Params | undefined>(undefined);

  useEffect(() => {
    const getOwnerDetails = async () => {
      if (owner) { // Ensure owner is not undefined
        const details = await fetchOwnerDetails(owner);
        setOwnerDetails(details);
      }
    };
    getOwnerDetails();
  }, [owner]);

  if (!ownerDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{ownerDetails.login}</h2>
      <img src={ownerDetails.avatar_url} alt={ownerDetails.login} width="100" />
      <p>{ownerDetails.bio}</p>
      <p>Location: {ownerDetails.location}</p>
      <a href={ownerDetails.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
    </div>
  );
};

export default Owner;
