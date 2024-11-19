import styles from './Navigation.module.scss';
import '@fontsource/coiny';

type NavigationProps = {
  children?: React.ReactNode;
};

function Navigation({ children }: NavigationProps) {
  return (
    <nav className={styles.navbar}>
      <p className={styles.logo}>Zaczytani</p>
      <div className={styles.links}>{children}</div>
    </nav>
  );
}

export default Navigation;
