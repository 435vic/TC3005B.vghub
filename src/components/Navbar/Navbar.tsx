import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function NavBar() {
  const { currentUser, userData, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout');
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navlinks}>
        <Link to="/">home</Link>
        <Link to="/dashboard">dashboard</Link>
        <Link to="/search">search</Link>
        {currentUser ? (
          <>
            <Link to="/profile">profile</Link>
            <span className={styles.userInfo}>
              {userData?.firstName || currentUser.email}
            </span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
