import styles from './ShakeButton.module.scss';
import image from '../../assets/shakeomatPicture.png';
import { useNavigate } from 'react-router-dom';

function ShakeButton() {
  const navigate = useNavigate();

  const HandleClick = () => {
    navigate('/user/shake');
  };
  return (
    <button className={styles.shakeomatButton} onClick={HandleClick}>
      <img src={image} alt="Books" className={styles.shakeomatImage} />
      <div className={styles.shakeomatText}>
        <strong className={styles.text}>Shakeomat</strong>
        <br />
        <span>Wylosuj książkę do czytania.</span>
      </div>
    </button>
  );
}

export default ShakeButton;
