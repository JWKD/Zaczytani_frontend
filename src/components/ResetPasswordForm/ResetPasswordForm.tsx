import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ResetPasswordForm.module.scss';
import { useState } from 'react';
import { ResetPassword } from '../../interfaces/user';
import { validatePassword } from '../../utils/validators';
import userApi from '../../api/userApi';
import RegisterIcon from '../../icons/RegisterIcon';

function ResetPasswordForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetCode = queryParams.get('resetCode');
  const email = queryParams.get('email');
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [reset, setReset] = useState<ResetPassword>({
    email: '',
    resetCode: '',
    newPassword: '',
  });

  const postData = async () => {
    try {
      await userApi.resetPassword(reset);
      navigate('/auth/login');
    } catch (error) {
      const newErrors: { [key: string]: string } = {};
      newErrors.wrong = 'Wystąpił nieoczekiwany problem, sprawdź połączenie z internetem i spróbuj ponownie.';
      console.error('Błąd podczas wysyłania danych:', error);
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    navigate('/auth/login');
  };

  const handleChange = (field: keyof ResetPassword, value: string) => {
    setReset({
      ...reset,
      email: email || '',
      resetCode: resetCode || '',
      [field]: value,
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleChangeConfirmPassword = (password: string) => {
    setConfirmPassword(password);
  };

  const handleClick = () => {
    if (validatePassword(reset.newPassword, confirmPassword).isValid) {
      postData();
    } else {
      setErrors(validatePassword(reset.newPassword, confirmPassword).newErrors);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.header}>
          Resetowanie hasła <RegisterIcon />
        </div>
        <div className={styles.text}>
          <strong>Witaj</strong> w naszej społeczności pasjonatów literatury!
        </div>
      </div>
      <div className={styles.rightContainer}>
        <p className={styles.text}>Wprowadź nowe hasło</p>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Nowe hasło"
              onChange={(e) => handleChange('newPassword', e.target.value)}
              value={reset.newPassword}
            ></input>
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Powtórz nowe hasło"
              onChange={(e) => handleChangeConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></input>
            {errors.different && <div className={styles.error}>{errors.different}</div>}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.postButton} onClick={handleClick}>
            Zmień hasło
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
