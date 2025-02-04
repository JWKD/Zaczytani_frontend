import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const AuthLayout = () => {
  return (
    <>
      <Navigation />
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
