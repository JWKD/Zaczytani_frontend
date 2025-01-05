import { Link } from 'react-router-dom';
import styles from './AddChallengeButton.module.scss';
import AddBookIconButton from '../../icons/AddBookIconButton';

function AddChallengeButton() {
  return (
    <Link to="/user/challenge/add" className={styles.buttonContainer}>
      <AddBookIconButton />
      <p className={styles.text}>Dodaj wyzwanie</p>
    </Link>
  );
}

export default AddChallengeButton;
