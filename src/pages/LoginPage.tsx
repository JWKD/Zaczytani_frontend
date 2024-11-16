import picture from '../assets/loggingPicture.jpg';
import { useState, ChangeEvent } from 'react';
import { Box, Link, Typography, InputBase, Button, styled, textFieldClasses } from '@mui/material';
import dataApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const StyledButton = styled(Button)({
  width: '100%',
  maxWidth: '250px',
  backgroundColor: '#a07e6d',
  color: '#ffffff',
  padding: '10px',
  borderRadius: '15px',
  marginBottom: '16px',
  '&:hover': {
    backgroundColor: '#8a6757',
  },
});

const StyledInput = styled(InputBase)({
  width: '100%',
  maxWidth: '250px',
  padding: '10px',
  marginBottom: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  border: '1px solid #ccc',
});

const StyledTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: '400',
  fontFamily: 'Coiny',
  fontStyle: 'normal',
  color: '#8a4b3e',
  marginBottom: '20px',
});

const StyledLink = styled(Link)({
  color: '#7ea0a6',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const StyledImage = styled('img')({
  width: '250px',
  height: '250px',
  borderRadius: '8px',
  borderColor: 'whitesmoke',
});

const StyledImageContainer = styled(Box)({
  marginRight: '24px', //
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledCard = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.primary.light,
}));

const StyledText = styled(Typography)({
  fontSize: '1rem',
  color: 'red',
  marginBottom: '20px',
});
function LoginPage() {
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

  const handleSubmit = async () => {
    const user = { login, password };

    try {
      const response = await dataApi.createUser(user);

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
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
    <StyledContainer>
      <StyledCard className="container">
        <StyledImageContainer className="image-container">
          <StyledImage src={picture} alt="Loging-picture"></StyledImage>
        </StyledImageContainer>
        <StyledForm>
          <StyledTitle>Zaczytani</StyledTitle>
          <StyledInput
            type="text"
            placeholder="login"
            className="input"
            value={login}
            onChange={handleInputLoginChange}
          ></StyledInput>
          <StyledInput
            type="password"
            placeholder="hasło"
            className="input"
            value={password}
            onChange={handleInputPasswordChange}
          ></StyledInput>
          <StyledText>{message}</StyledText>
          <StyledButton onClick={handleSubmit}>ZALOGUJ</StyledButton>
          <StyledLink href="#" className="link">
            Zapomniałeś hasła?
          </StyledLink>
          <StyledLink href="#" className="link">
            Zarejestruj się
          </StyledLink>
        </StyledForm>
      </StyledCard>
    </StyledContainer>
  );
}

export default LoginPage;
