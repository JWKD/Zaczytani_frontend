import { useNavigate } from 'react-router-dom';
import styles from './LogOutPopUp.module.scss';
import { useUser } from '../../context/UserContext';

function LogOutPopUp() {
  const navigate = useNavigate();
  const { logout } = useUser();
  function handleLogOut() {
    logout();
    navigate('/auth/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.element}>Zmień zdjęcie profilowe</div>
      <div className={styles.element}>Zmień hasło</div>
      <div className={styles.element} onClick={handleLogOut}>
        Wyloguj
      </div>
    </div>
  );
}

export default LogOutPopUp;
