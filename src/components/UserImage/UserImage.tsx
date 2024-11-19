import picture from '../../assets/profilePicture.png';
import styles from './UserImage.module.scss';

function UserImage() {
  return (
    <>
      <img src={picture} alt="Loging-picture" className={styles.profilePicture}></img>
    </>
  );
}

export default UserImage;
