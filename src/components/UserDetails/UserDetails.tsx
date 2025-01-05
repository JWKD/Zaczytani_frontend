import { useEffect, useState } from 'react';
import styles from './UserDetails.module.scss';
import { UserProfileDetails } from '../../interfaces/user';
import userApi from '../../api/userApi';

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
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}></div>
  );
}

export default UserDetails;
