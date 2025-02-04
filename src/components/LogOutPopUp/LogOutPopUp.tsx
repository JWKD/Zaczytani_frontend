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
  function handleChangePassword() {
    navigate('/user/changepassword');
  }

  return (
    <div className={styles.container}>
      <div className={styles.element}>Zmień zdjęcie profilowe</div>
      <div className={styles.element} onClick={handleChangePassword}>
        Zmień hasło
      </div>
      <div className={styles.element} onClick={handleLogOut}>
        Wyloguj
      </div>
    </div>
  );
}

export default LogOutPopUp;
