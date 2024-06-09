import { Link } from "react-router-dom";

const Header: React.FC  = () => {
  return (
    <header>
      <h1>
        <Link to="/">Top ⭐ Repositories</Link>
      </h1>
    </header>
  );
}

export default Header