import { Link } from "react-router-dom";
import styles from './Header.module.scss'

const Header: React.FC  = () => {
  return (
    <header className={styles.header}>
      <h2>
        <Link to="/">Github STARS</Link>
      </h2>
    </header>
  );
}

export default Header