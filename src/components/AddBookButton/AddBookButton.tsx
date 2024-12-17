import { useNavigate } from 'react-router-dom';
import AddBookIcon from '../../icons/AddBookIconButton';
import styles from './AddBookButton.module.scss';

function AddBookButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/books/add`);
  }

  return (
    <div className={styles.mainContainer} onClick={() => handleClick()}>
      <AddBookIcon />
      <p>Dodaj książkę</p>
    </div>
  );
}

export default AddBookButton;
