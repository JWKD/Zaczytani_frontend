import { Link } from 'react-router-dom';
import picture from '../../assets/profilePicture.png';
import styles from './UserImage.module.scss';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { UserProfileDetails } from '../../interfaces/user';

function UserImage() {
  const [profile, setProfile] = useState<UserProfileDetails>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await userApi.getDetails();
      setProfile(result);
    };

    fetchData();
  }, []);
  return (
    <Link to="/user/profile" className={styles.link}>
      <img src={profile?.imageUrl || picture} alt="Loging-picture" className={styles.profilePicture}></img>
    </Link>
  );
}

export default UserImage;
