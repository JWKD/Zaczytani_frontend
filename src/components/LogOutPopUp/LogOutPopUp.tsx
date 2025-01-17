import { useNavigate } from 'react-router-dom';
import styles from './LogOutPopUp.module.scss';

function LogOutPopUp() {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
