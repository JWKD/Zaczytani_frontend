import { useEffect, useState } from 'react';
import styles from './ProgressComponent.module.scss';
import defaultCover from '../../assets/defaultCover.jpg';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import dataApi from '../../api/bookApi';
import { CurrentlyReading } from '../../interfaces/book';

function ProgressComponent() {
  const [books, setBooks] = useState<CurrentlyReading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getProgress();
        setBooks(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.progressContainer}>
      {books.map((book: CurrentlyReading, index) => (
        <div className={styles.bookDetails}>
          <img key={index} className={styles.image} src={book.imageUrl || defaultCover} alt="Book cover"></img>
          <div className={styles.detailsComponenet}>
            <p className={styles.bookTitle}>{book.title}</p>
            <p className={styles.bookAuthors}>
              {book.authors.map((author) => (
                <li key={author.id} className={styles.authorName}>
                  {author.name}
                </li>
              ))}
            </p>
            <div className={styles.seriesContainer}>
              <p className={styles.bookSeries}>Cykl: </p>
              <p className={styles.bookSeriesName}>{book.series}</p>
            </div>
            <div className={styles.containerRating}>
              <p className={styles.progressName}>Progres:</p>
              <ProgressBar current={book.progress} max={book.pageNumber} />
            </div>
            <div className={styles.buttonContainer}>
              <Link to={''} className={styles.linkButton}>
                Zaktualizuj
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressComponent;
