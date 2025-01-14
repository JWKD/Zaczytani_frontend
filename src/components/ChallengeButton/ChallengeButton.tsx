import { Link } from 'react-router-dom';
import styles from './ChallengeButton.module.scss';
import ChallengeIcon from '../../icons/ChallengeIcon';

function ChallengeButton() {
  return (
    <Link to="/user/challenge" className={styles.buttonContainer}>
      <div className={styles.icon}>
        <ChallengeIcon />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>Wyzwania</p>
      </div>
    </Link>
  );
}

export default ChallengeButton;
