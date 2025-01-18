import { Outlet } from 'react-router-dom';
import AddBookButton from '../components/AddBookButton/AddBookButton';
import BookSearch from '../components/BookSearch/BookSearch';
import UserImage from '../components/UserImage/UserImage';
import Navigation from './Navigation/Navigation';
import ChallengeButton from '../components/ChallengeButton/ChallengeButton';

function HomeLayout() {
  return (
    <>
      <Navigation>
        <ChallengeButton />
        <AddBookButton />
        <BookSearch />
        <UserImage />
      </Navigation>
      <div
        style={{
          maxWidth: '1390px',
          margin: '0 auto',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default HomeLayout;
