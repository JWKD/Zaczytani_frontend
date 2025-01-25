import { useState } from 'react';
import styles from './ForgotPasswordForm.module.scss';
import { ForgotPasswordEmail } from '../../interfaces/user';
import { validateEmail } from '../../utils/validators';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import RegisterIcon from '../../icons/RegisterIcon';

function ForgotPasswordForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  const [forgot, setForgot] = useState<ForgotPasswordEmail>({
    email: '',
  });

  const postData = async () => {
    try {
      const result = await userApi.forgotPassword(forgot);
      setIsVisible(true);
      if (result.status === 200) setSuccess(true);
    } catch (error) {
      setIsVisible(true);
      const newErrors: { [key: string]: string } = {};
      newErrors.wrong = 'Wystąpił nieoczekiwany problem, sprawdź połączenie z internetem i spróbuj ponownie.';
      console.error('Błąd podczas wysyłania danych:', error);
      setErrors(newErrors);
    }
  };

  const handleChange = (field: keyof ForgotPasswordEmail, value: string) => {
    setForgot({
      ...forgot,
      [field]: value,
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleClick = () => {
    if (validateEmail(forgot.email).isValid) {
      setIsVisible(false);
      postData();
    } else {
      setErrors(validateEmail(forgot.email).newErrors);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.staticContainer}>
        <div className={styles.header}>
          Resetowanie hasła <RegisterIcon />
        </div>
        <div className={styles.text}>
          <strong>Witaj</strong> w naszej społeczności pasjonatów literatury!
        </div>
      </div>
      <div className={styles.dynamicContainer}>
        <div className={styles.inputContainer}>
          <p className={styles.text}>Wpisz E-mail przypisany do twojego konta</p>
          <div className={styles.errorContainer}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange('email', e.target.value)}
              value={forgot.email}
            ></input>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
            {errors.wrong && <div className={styles.error}>{errors.wrong}</div>}
            {success && <div className={styles.successText}>Sprawdź swoją skrzynkę pocztową.</div>}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {isVisible ? (
            <button className={styles.postButton} onClick={handleClick}>
              Wyślij
            </button>
          ) : (
            <button className={styles.postButton}>Wysyłanie..</button>
          )}
          <button className={styles.cancelButton} onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
