import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import UserImage from '../components/UserImage/UserImage';
import BookSearch from '../components/BookSearch/BookSearch';

const Layout = () => {
  return (
    <>
      <Navigation>
        <BookSearch />
        <UserImage />
      </Navigation>
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

export default Layout;
