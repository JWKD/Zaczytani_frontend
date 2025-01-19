import { useState } from 'react';
import styles from './ChangePassword.module.scss';
import { useNavigate } from 'react-router-dom';
import KeyIcon from '../../icons/KeyIcon';
import userApi from '../../api/userApi';
import { ChangePasswordPost } from '../../interfaces/user';
import { AxiosError } from 'axios';
import { useUser } from '../../context/UserContext';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { logout } = useUser();
  const navigate = useNavigate();

  const postData = async () => {
    try {
      const payload: ChangePasswordPost = { newPassword: newPassword, oldPassword: oldPassword };
      await userApi.changePassword(payload);
      logout();
      navigate('/auth/login');
    } catch (error) {
      const err = error as AxiosError;
      const newErrors: { [key: string]: string } = {};
      if (err.status === 400) {
        newErrors.wrong = 'Podaj poprawne hasło';
      } else {
        newErrors.wrong = 'Wystąpił nieoczekiwany problem';
        console.error('Błąd podczas wysyłania danych:', error);
      }
      setErrors(newErrors);
    }
  };

  const handleChangePassword = () => {
    if (validateForm()) {
      postData();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (newPassword !== confirmPassword) {
      newErrors.different = 'Upewnij się czy hasła są takie same!';
    }
    if (
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      newPassword.length < 6
    ) {
      newErrors.password = `Hasło musi składać się conajmniej z 6 znaków i zawierać małą literę, wielką literę, cyfrę i znak specjalny`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleChangeOldPassword = (password: string) => {
    setOldPassword(password);
  };

  const handleChangeNewPassword = (password: string) => {
    setNewPassword(password);
  };

  const handleChangeNewPasswordTwo = (password: string) => {
    setConfirmPassword(password);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        Zmiana hasła <KeyIcon />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.oldPassword}>
          <input
            type="password"
            placeholder="Stare hasło"
            value={oldPassword}
            onChange={(e) => handleChangeOldPassword(e.target.value)}
          />
        </div>
        {errors.wrong && <div className={styles.error}>{errors.wrong}</div>}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.newPassword}>
          <input
            type="password"
            placeholder="Nowe hasło"
            value={newPassword}
            onChange={(e) => handleChangeNewPassword(e.target.value)}
          />
        </div>
        {errors.password && <div className={styles.error}>{errors.password}</div>}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.newPassword}>
          <input
            type="password"
            placeholder="Nowe hasło"
            value={confirmPassword}
            onChange={(e) => handleChangeNewPasswordTwo(e.target.value)}
          />
        </div>

        {errors.different && <div className={styles.error}>{errors.different}</div>}
      </div>
      <div className={styles.buttons}>
        <button className={styles.addButton} onClick={handleChangePassword}>
          Zmień
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Anuluj
        </button>
      </div>
    </div>
  );
}
export default ChangePassword;
