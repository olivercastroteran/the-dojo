import { Temple } from '../../assets';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLogout } from '../../hooks';

const Navbar = () => {
  const { logout, isPending } = useLogout();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={logout} disabled={isPending}>
            {isPending ? 'Logging out...' : 'Logout'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
