import { useNavigate } from 'react-router-dom';
import styles from './ConfirmedEmail.module.scss';
function ConfirmedEmail() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Gratulacje rejestracja powiodła się. Możesz się zalogować.</h1>
      <button className={styles.addButton} onClick={handleLogin}>
        Zaloguj
      </button>
    </div>
  );
}
export default ConfirmedEmail;
