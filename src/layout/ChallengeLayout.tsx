import { Outlet } from 'react-router-dom';
import BookSearch from '../components/BookSearch/BookSearch';
import UserImage from '../components/UserImage/UserImage';
import Navigation from './Navigation/Navigation';
import AddChallengeButton from '../components/AddChallengeButton/AddChallengeButton';

function ChallengeLayout() {
  return (
    <>
      <Navigation>
        <AddChallengeButton />
        <BookSearch />
        <UserImage />
      </Navigation>
      <Outlet />
    </>
  );
}

export default ChallengeLayout;
