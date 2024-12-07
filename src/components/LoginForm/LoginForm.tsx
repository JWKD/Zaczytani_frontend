import picture from '../../assets/loggingPicture.jpg';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import userApi from '../../api/userApi';
import styles from './LoginForm.module.scss';
import { useUser } from '../../context/UserContext';

function LoginForm() {
  const { setUser } = useUser();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');

  const handleInputLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleInputPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { login, password };

    try {
      const response = await userApi.login(user);

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setUser({
          firstName: '', //trzeba strzelić do api po informacje o userze albo przerobić api logowania zeby zwracało info o użytkowniku
          lastName: '', //trzeba strzelić do api po informacje o userze albo przerobić api logowania zeby zwracało info o użytkowniku
          isLoggedIn: true,
        });
        navigate('/');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        setMessage('Podano błędne dane');
      } else {
        setMessage('Wystąpił nieoczekiwany problem');
        console.error('Błąd podczas wysyłania danych:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={picture} alt="books" />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Zaczytani</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="login"
            className={styles.input}
            value={login}
            onChange={handleInputLoginChange}
          />
          <input
            type="password"
            placeholder="hasło"
            className={styles.input}
            value={password}
            onChange={handleInputPasswordChange}
          />
        </div>

        <p className={styles.text}>{message}</p>
        <input type="submit" value="zaloguj" className={styles.button} />

        <Link to="/auth/forgotPassword" className={styles.link}>
          Zapomniałeś hasła?
        </Link>
        <Link to="/auth/register" className={styles.link}>
          Zarejestruj się
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
