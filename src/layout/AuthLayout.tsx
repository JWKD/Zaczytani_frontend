import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const AuthLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default AuthLayout;
