import { useState } from 'react';
import RegisterIcon from '../../icons/RegisterIcon';
import styles from './Register.module.scss';
import { RegisterPost } from '../../interfaces/user';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/userApi';
import { AxiosError } from 'axios';
function Register() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [register, setRegister] = useState<RegisterPost>({
    login: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  const handleChange = (field: keyof RegisterPost, value: any) => {
    setRegister({
      ...register,
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

  const handleCancel = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    if (validateForm()) {
      postData();
    }
  };

  const postData = async () => {
    try {
      const result = await userApi.register(register);
      if (result.status === 204) setSuccess(true);
    } catch (error) {
      const err = error as AxiosError;
      const newErrors: { [key: string]: string } = {};
      if (err.status === 400) {
        newErrors.taken = 'Login jest już zajęty';
      } else {
        newErrors.wrong = 'Wystąpił nieoczekiwany problem';
        console.error('Błąd podczas wysyłania danych:', error);
      }
      setErrors(newErrors);
    }
  };

  const resendEmail = async () => {
    if (!isDisabled) {
      try {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 60000);

        const email = { email: register.email };
        await userApi.resendEmail(email);
      } catch (error) {
        console.error('Błąd podczas ponownego wysłania maila:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (register.password !== confirmPassword) {
      newErrors.different = 'Upewnij się czy hasła są takie same!';
    }
    if (
      !/[A-Z]/.test(register.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(register.password) ||
      !/\d/.test(register.password) ||
      !/[a-z]/.test(register.password) ||
      register.password.length < 6
    ) {
      newErrors.password = `Hasło musi składać się conajmniej z 6 znaków i zawierać małą literę, wielką literę, cyfrę i znak specjalny`;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)) {
      newErrors.email = `Wpisz poprawny adres e-mail!`;
    }
    if (register.firstName.length < 3 || register.firstName.length >= 50) {
      newErrors.firstName = `Imię jest wymagane i musi mieć conajmniej 3 litery i nie więcej niż 50!`;
    }
    if (register.lastName.length < 3 || register.lastName.length >= 50) {
      newErrors.lastName = `Nazwisko jest wymagane i musi mieć conajmniej litery i nie więcej niż 50!`;
    }
    if (register.login.length < 3 || register.login.length >= 50) {
      newErrors.login = `Login jest wymagany i musi mieć conajmniej 3 litery i nie więcej niż 50!`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.staticContainer}>
        <div className={styles.header}>
          Zarejestruj się <RegisterIcon />
        </div>
        <div className={styles.text}>
          <strong>Witaj</strong> w naszej społeczności pasjonatów literatury!
        </div>
      </div>
      <div className={styles.dynamicContainer}>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Login"
              onChange={(e) => handleChange('login', e.target.value)}
              value={register.login}
            ></input>
            {errors.login && <div className={styles.error}>{errors.login}</div>}
            {errors.taken && <div className={styles.error}>{errors.taken}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Imię"
              onChange={(e) => handleChange('firstName', e.target.value)}
              value={register.firstName}
            ></input>
            {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Nazwisko"
              onChange={(e) => handleChange('lastName', e.target.value)}
              value={register.lastName}
            ></input>
            {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Hasło"
              onChange={(e) => handleChange('password', e.target.value)}
              value={register.password}
            ></input>
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Powtórz hasło"
              onChange={(e) => handleChangeConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></input>
            {errors.different && <div className={styles.error}>{errors.different}</div>}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange('email', e.target.value)}
              value={register.email}
            ></input>
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
        </div>
        {success && (
          <div className={styles.success}>
            <div className={styles.text}>Sprawdź swoją skrzynkę pocztową w celu weryfikacji adresu email.</div>
            <div className={styles.resend}>Nie otrzymałeś wiadomości? Naciśnij przycisk by wysłać ponownie.</div>
            {isDisabled && <button className={styles.resendButton}>Wysłano</button>}
            {!isDisabled && (
              <button className={styles.resendButton} onClick={resendEmail}>
                Wyślij ponownie
              </button>
            )}
          </div>
        )}
        {!success && (
          <div className={styles.buttons}>
            <button className={styles.addButton} onClick={handleRegister}>
              Zarejestruj
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
