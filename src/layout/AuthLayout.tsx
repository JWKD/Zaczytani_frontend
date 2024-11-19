import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const AuthLayout = () => {
  return (
    <StyledContainer>
      <Outlet />
    </StyledContainer>
  );
};

export default AuthLayout;
