import { useEffect, useState } from 'react';
import styles from './UserDetails.module.scss';
import { UserProfileDetails } from '../../interfaces/user';
import userApi from '../../api/userApi';
import CatLoader from '../CatLoader/CatLoader';
import DotHorizontal from '../../icons/DotsHorizontal';
import RackIcon from '../../icons/rackIcon';

function UserDetails() {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userApi.getDetails();
        setProfile(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <div className={styles.userPicture}></div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{profile?.firstName}</p>
            <p className={styles.userLastName}>{profile?.lastName} niee maaa</p>
            <p className={styles.bookCount}>Przeczytała: {profile?.totalBooksRead} książki</p>
            <p className={styles.genres}>sffdsf</p>
          </div>
          <RackIcon />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
