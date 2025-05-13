import { Link } from 'react-router';
import styles from './Navbar.module.css';

export default function NavBar() {
 return <nav className={`${styles.navbar}`}>
    <div className={styles.navlinks}>
        <Link to="/">home</Link>
        <Link to="/dashboard">dashboard</Link>
        <Link to="/search">search</Link>
        <Link to="/profile">profile</Link>
    </div>
 </nav>
}
