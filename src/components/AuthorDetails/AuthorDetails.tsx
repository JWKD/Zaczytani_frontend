import { useLocation, useNavigate } from 'react-router-dom';
import { Author, AuthorBooks, Book } from '../../interfaces/book';
import { useEffect } from 'react';
import styles from './AuthorDetails.module.scss';
import Star from '../../icons/Star';
import imag from '../../assets/okladka.jpg';

interface AuthorDetailsProps {
  author: AuthorBooks; // Tablica książek jako props
}

function AuthorDetails() {
  const location = useLocation();
  const state = location.state as AuthorDetailsProps;
  const author = state?.author;
  const navigate = useNavigate();

  useEffect(() => {
    if (!author) {
      // Jeśli autor nie istnieje, przekierowujemy na stronę główną (lub stronę błędu)
      navigate('*'); // Możesz zmienić na "/home" lub inną stronę, którą preferujesz
    }
  }, [author, navigate]);

  if (!author) {
    // Możemy tutaj zwrócić null lub inny komunikat
    return null; // Unikamy renderowania w przypadku braku autora
  }

  function odmianaKsiazek(liczba: number): string {
    if (liczba === 1) return 'książka';
    if (liczba >= 2 && liczba <= 4) return 'książki';
    if (liczba % 10 >= 2 && liczba % 10 <= 4 && !(liczba % 100 >= 12 && liczba % 100 <= 14)) {
      return 'książki';
    }
    return 'książek';
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondContainer}>
        <div className={styles.authorConainer}>
          <img src={imag} alt="Zdjęcie autora" />
          <div className={styles.aboutAuthor}>
            <h2 className={styles.authorName}>{author.name}</h2>
            <h3 className={styles.booksLength}>
              {author.books.length} {odmianaKsiazek(author.books.length)}
            </h3>
            <h4 className={styles.genres}>Gatunki tego typu romanse komedie itp</h4>
          </div>
        </div>
        <div className={styles.booksContainer}>
          <ul className={styles.ulBooks}>
            {author.books.map((book: Book) => (
              <li key={book.id}>
                <div className={styles.book}>
                  <img className={styles.bookCover} src={imag} alt="Zdjęcie książki" />
                  <div className={styles.aboutBook}>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    <ul className={styles.ulAuthors}>
                      {book.authors.map((author: Author) => (
                        <li key={author.id}>
                          <h3 className={styles.authorsOfBook}>{author.name}</h3>
                        </li>
                      ))}
                      <h3 className={styles.series}>Cykl bla bla</h3>
                      <h3 className={styles.rating}>
                        <Star />
                        Ocena bla bla
                      </h3>
                      <h3 className={styles.review}>Recenzje bla bla</h3>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetails;
