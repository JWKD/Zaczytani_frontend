import { useEffect, useState } from 'react';
import styles from './BookDetails.module.scss';
import dataApi from '../../api/bookApi';
import { Book } from '../../interfaces/book';
import Star from '../../icons/Star';
import DefaultCover from '../../assets/defaultCover.jpg';
import DotHorizontal from '../../icons/DotsHorizontal';
import ReviewsList from '../ReviewsList/ReviewsList';
import AddBookOnShelf from '../AddBookOnShelf/AddBookOnShelf';

interface BookDetailsProps {
  id: string;
}

function BookDetails({ id }: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChangeValue = (newValue: boolean) => {
    setIsVisible(newValue);
  };

  function addBookToShelf() {
    setIsVisible(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getBookDetails(id);
        setBook(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    book && (
      <div className={styles.bookContainer}>
        {isVisible && <AddBookOnShelf onChangeValue={handleChangeValue} bookId={book?.id} />}
        <div className={styles.secondContainer}>
          <img className={styles.bookCover} src={book.imageUrl ?? DefaultCover}></img>
          <div className={styles.aboutAndButtons}>
            <div className={styles.aboutContainer}>
              <h2 className={styles.title}>{book.title}</h2>
              <h3 className={styles.authors}>
                <ul>
                  {book.authors.map((author) => (
                    <li key={author.id}>{author.name}</li>
                  ))}
                </ul>
              </h3>
              <h3 className={styles.publisher}>Wydawnictwo: {book.publishingHouse}</h3>
            </div>
            <div className={styles.buttons}>
              <button className={styles.addButton} onClick={addBookToShelf}>
                Dodaj do półki
              </button>
              <button className={styles.currentlyButton}>Aktualnie czytam</button>
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <p>
              <strong>Gatunek: </strong>
              {book.genre.join(', ')}
            </p>
            <p>
              <strong>Cykl:</strong> <>{book.series}</>
            </p>
            <p>
              <strong>Ilość stron:</strong> {book.pageNumber > 0 ? book.pageNumber : 'Brak'}
            </p>
            <p>
              <strong>Data wydania:</strong> <>{book.realeaseDate ?? 'Brak'}</>
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn || 'Brak'}
            </p>
            <div className={styles.rating}>
              <Star />
              <p>
                <strong>Ocena:</strong> {Math.round(book.rating * 10) / 10} / 10
              </p>
            </div>
            <div>
              <p>
                <strong>Ilość recenzji </strong>
                100 z 400
              </p>
            </div>
          </div>
          <p className={styles.description}>{book.description}</p>
        </div>
        <div className={styles.similarBooks}>
          <h2>Podobne</h2>
        </div>
        <h2 className={styles.reviewHeader}>
          <span>
            <DotHorizontal />
          </span>
          Recenzje
        </h2>
        <div className={styles.reviewsList}>
          <ReviewsList bookId={id} />
        </div>
      </div>
    )
  );
}

export default BookDetails;
