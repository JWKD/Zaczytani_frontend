import { Container, styled } from '@mui/material';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(0, 2),
}));

const Layout = () => {
  return (
    <StyledContainer>
      <Navigation />
      <Outlet />
    </StyledContainer>
  );
};

export default Layout;
