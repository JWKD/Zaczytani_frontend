import styles from './ShakeButton.module.scss';
import image from '../../assets/shakeomatPicture.png';
import { Link } from 'react-router-dom';

function ShakeButton() {
  return (
    <Link to="/user/shake" className={styles.shakeomatButton}>
      <img src={image} alt="Books" className={styles.shakeomatImage} />
      <div className={styles.shakeomatText}>
        <span className={styles.text}>Shakeomat</span>
        <span className={styles.bottomText}>Wylosuj książkę do czytania.</span>
      </div>
    </Link>
  );
}

export default ShakeButton;
