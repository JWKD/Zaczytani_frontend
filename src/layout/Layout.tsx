import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import UserImage from '../components/UserImage/UserImage';

const Layout = () => {
  return (
    <>
      <Navigation>
        <UserImage />
      </Navigation>
      <Outlet />
    </>
  );
};

export default Layout;
