import { Outlet } from 'react-router-dom';
import AddBookButton from '../components/AddBookButton/AddBookButton';
import BookSearch from '../components/BookSearch/BookSearch';
import UserImage from '../components/UserImage/UserImage';
import Navigation from './Navigation/Navigation';

function HomeLayout() {
  return (
    <>
      <Navigation>
        <AddBookButton />
        <BookSearch />
        <UserImage />
      </Navigation>
      <Outlet />
    </>
  );
}

export default HomeLayout;
