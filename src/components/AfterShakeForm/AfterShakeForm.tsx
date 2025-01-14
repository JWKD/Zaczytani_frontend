import styles from './AfterShakeForm.module.scss';
import { Book } from '../../interfaces/book';
import Star from '../../icons/Star';
import ShakeButton from '../ShakeButton/ShakeButton';
import defaultCover from '../../assets/defaultCover.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddBookOnShelf from '../AddBookOnShelf/AddBookOnShelf';

interface AfterShakeFormProps {
  book?: Book;
}

function AfterShakeForm({ book }: AfterShakeFormProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChangeValue = (newValue: boolean) => {
    setIsVisible(newValue);
  };

  function addBookToShelf() {
    setIsVisible(true);
  }
  return (
    <div className={styles.afterShakeContainer}>
      {isVisible && <AddBookOnShelf onChangeValue={handleChangeValue} bookId={book?.id} />}
      <ShakeButton />
      <div className={styles.shakeomatMain}>
        <img className={styles.bookCover} src={book?.imageUrl || defaultCover} alt="Okładka książki" />
        <h1 className={styles.bookTitle}>{book?.title}</h1>
        <h2 className={styles.authors}>
          <ul>{book?.authors.map((author) => <li key={author.id}>{author.name}</li>)}</ul>
        </h2>
        <div className={styles.bookRatingContainer}>
          <Star />
          <p className={styles.rating}>{book?.rating}</p>
        </div>
        <button className={styles.addToShelfButton} onClick={addBookToShelf}>
          Dodaj do półki
        </button>
        <Link to={'/books/' + book?.id} className={styles.bookDetailsButton}>
          Wyświetl szczegóły książki
        </Link>
      </div>
    </div>
  );
}

export default AfterShakeForm;
