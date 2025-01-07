import { useEffect, useState } from 'react';
import styles from './UserDetails.module.scss';
import { UserProfileDetails } from '../../interfaces/user';
import userApi from '../../api/userApi';
import CatLoader from '../CatLoader/CatLoader';
import DotHorizontal from '../../icons/DotsHorizontal';
import RackIcon from '../../icons/RackIcon';
import { Link } from 'react-router-dom';
import UserImage from '../UserImage/UserImage';
import { Book } from '../../interfaces/book';
import ProfilePageBook from '../ProfilePageBook.tsx/ProfilePageBook';

function UserDetails() {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookVariety, setBookVariety] = useState<string | null>(' ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userApi.getDetails();
        setProfile(result);
        BookVariety(profile?.totalBooksRead || 0);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function BookVariety(number: number) {
    if (number === 0) {
      setBookVariety('0 książek');
    } else if (number === 1) {
      setBookVariety(`1 książkę`);
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      setBookVariety(`${number} książki`);
    } else {
      setBookVariety(`${number} książek`);
    }
  }

  return loading ? (
    <CatLoader />
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}>
      <div className={styles.topText}>
        <DotHorizontal />
        <p className={styles.pageText}>Mój Profil</p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.userContainer}>
          <div className={styles.container}>
            <div className={styles.userPicture}>
              <UserImage />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>
                {profile?.firstName} {profile?.lastName}
              </p>
              <p className={styles.bookCount}>Przeczytane: {bookVariety}</p>
              <p className={styles.genres}>{profile?.favoriteGenres.join(', ')}</p>
            </div>
          </div>
          <div className={styles.rack}>
            <RackIcon />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/user/bookrequests" className={styles.bookRequestsbutton}>
            Moje zgłoszenia
          </Link>
        </div>
        <div className={styles.decorationsContainer}>
          <p className={styles.badgesName}>Odznaczenia:</p>
          <div className={styles.badgesBack}></div>
        </div>
        <div className={styles.shelvesContainer}>
          <div className={styles.shelvesTextContainer}>
            <p>Aktualnie czytane</p>
            <p className={styles.afterReadText}>Przeczytane</p>
          </div>
          <div className={styles.shelvesBottom}>
            <div className={styles.currentBooksContainer}>
              {profile?.currentlyReading
                .slice(0, 2)
                .map((book: Book) => <ProfilePageBook book={book} fullStar={false} />)}
            </div>
            <div className={styles.line}></div>
            <div className={styles.readBooksContainer}>
              {profile?.readBooks.slice(0, 6).map((book: Book) => <ProfilePageBook book={book} fullStar={true} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
