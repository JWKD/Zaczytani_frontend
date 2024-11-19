// components/BookDetails.tsx
import { useEffect, useState } from 'react';
import styles from './BookDetails.module.scss';
import dataApi from '../../api/bookApi';
import { Book } from '../../interfaces/book';
import '@fontsource/roboto-serif';

interface BookDetailsProps {
  id: string;
}

function BookDetails({ id }: BookDetailsProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getBookDetails(id);
        console.log(result);
        setBook(result);
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
    book && (
      <div className={styles.bookContainer}>
        <img className={styles.bookCover} src="../src/assets/okladka.jpg"></img>
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
            <h3 className={styles.publisher}>Wydawnictwo: bla bla</h3>
          </div>
          <div className={styles.buttons}>
            <button className={styles.addButton}>Dodaj do półki</button>
            <button className={styles.currentlyButton}>Aktualnie czytam</button>
            <button className={styles.cancelButton}>Anuluj</button>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <p>
            <strong>Gatunek:</strong> fantasy
          </p>
          <p>
            <strong>Cykl:</strong> brak
          </p>
          <p>
            <strong>Ilość stron:</strong> {book.pageNumber > 0 ? book.pageNumber : 'Nie podano'}
          </p>
          <p>
            <strong>Data wydania:</strong> Brak
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn || 'Brak ISBN'}
          </p>
          <div>
            <p>
              <strong>Ocena</strong> X z Y
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
        <div className={styles.similarBooks}>
          <h2>Podobne</h2>
        </div>
        <div className={styles.reviewContainer}>
          <h2 className={styles.reviewHeader}>Recenzje</h2>
        </div>
      </div>
    )
  );
}

export default BookDetails;
