import { useEffect, useState } from 'react';
import { Author, Book, RecommendedBooksHomeProps } from '../../interfaces/book';
import bookApi from '../../api/bookApi';
import styles from './RecommendedBooksHome.module.scss';
import defaultCover from '../../assets/defaultCover.jpg';
import Star from '../../icons/Star';
import { useNavigate } from 'react-router-dom';
import DotHorizontal from '../../icons/DotsHorizontal';

function RecommendedBooksHome() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const props: RecommendedBooksHomeProps = {
          pageSize: 1,
        };
        const result = await bookApi.postRecommendedBooks(props);
        setBooks(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleClickBook(id: string) {
    navigate(`/books/${id}`);
  }

  return loading ? (
    <div></div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.books}>
      <div className={styles.recommend}>
        <DotHorizontal />
        <h2 className={styles.text}>Proponowane</h2>
      </div>
      {books.map((book: Book) => (
        <li key={book.id}>
          <div className={styles.book} onClick={() => handleClickBook(book.id)}>
            <img className={styles.bookCover} src={book.imageUrl ?? defaultCover} alt="Zdjęcie książki" />
            <div className={styles.aboutBook}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <ul className={styles.ulAuthors}>
                {book.authors.map((author: Author) => (
                  <li key={author.id}>
                    <h3 className={styles.authorsOfBook}>{author.name}</h3>
                  </li>
                ))}
                <h3 className={styles.series}>{book.series}</h3>
                <h3 className={styles.rating}>
                  <Star />
                  <strong>Ocena: </strong> {Math.round(book.rating * 10) / 10} / 10
                </h3>
                <h3 className={styles.review}>
                  {book.readers} czytelników - {book.reviews} recenzji
                </h3>
              </ul>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default RecommendedBooksHome;
