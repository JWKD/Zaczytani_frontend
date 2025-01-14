import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

type NavigationProps = {
  children?: React.ReactNode;
};

function Navigation({ children }: NavigationProps) {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Zaczytani
      </Link>
      <div className={styles.links}>{children}</div>
    </nav>
  );
}

export default Navigation;
