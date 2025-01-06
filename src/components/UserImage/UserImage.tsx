import { Link } from 'react-router-dom';
import picture from '../../assets/profilePicture.png';
import styles from './UserImage.module.scss';

function UserImage() {
  return (
    <Link to="/user/profile">
      <img src={picture} alt="Loging-picture" className={styles.profilePicture}></img>
    </Link>
  );
}

export default UserImage;
