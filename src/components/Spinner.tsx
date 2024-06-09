import React from 'react';
import styles from './Spinner.module.scss';
import { ReactComponent as GithubLogo } from '../assets/GithubLogo.svg'

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner} data-testid="spinner">
      <GithubLogo id={styles.githubLogo} />
    </div>
  );
}

export default Spinner;