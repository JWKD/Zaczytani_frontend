import { Link } from 'react-router-dom';
import picture from '../../assets/profilePicture.png';
import styles from './UserImage.module.scss';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { UserProfileDetails } from '../../interfaces/user';

function UserImage() {
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
    <div className={styles.link}>
      <img src={picture} alt="Loging-picture" className={styles.profilePicture}></img>
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <Link to="/user/profile" className={styles.link}>
      <img src={profile?.imageUrl || picture} alt="Loging-picture" className={styles.profilePicture}></img>
    </Link>
  );
}

export default UserImage;
