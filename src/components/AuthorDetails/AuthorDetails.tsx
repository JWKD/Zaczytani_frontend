import { useLocation, useNavigate } from 'react-router-dom';
import { Author, AuthorBooks, Book } from '../../interfaces/book';
import { useEffect, useState } from 'react';
import styles from './AuthorDetails.module.scss';
import Star from '../../icons/Star';
import varietOfBooks from '../../utils/utils';
import profillePicture from '../../assets/profilePicture.png';
import DefaultCover from '../../assets/defaultCover.jpg';

interface AuthorDetailsProps {
  author: AuthorBooks;
}

function AuthorDetails() {
  const location = useLocation();
  const state = location.state as AuthorDetailsProps;
  const author = state?.author;
  const navigate = useNavigate();
  const [genres, setGenres] = useState<string>('');

  useEffect(() => {
    if (!author) {
      navigate('/*');
    }
    getGenres();
  }, [author, navigate]);

  if (!author) {
    return null;
  }

  function handleClickBook(id: string) {
    navigate(`/books/${id}`);
  }

  function getGenres() {
    const allGenres: string[] = author.books.flatMap((book) => book.genre);
    const uniqueGenres: string[] = Array.from(new Set(allGenres));
    const genresJoined: string = uniqueGenres.join(', ');
    setGenres(genresJoined);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondContainer}>
        <div className={styles.authorConainer}>
          <img className={styles.authorImg} src={author.imageUrl ?? profillePicture} alt="Zdjęcie autora" />
          <div className={styles.aboutAuthor}>
            <h2 className={styles.authorName}>{author.name}</h2>
            <h3 className={styles.booksLength}>
              {author.books.length} {varietOfBooks(author.books.length)}
            </h3>
            <h4 className={styles.genres}>{genres}</h4>
          </div>
        </div>
        <div className={styles.booksContainer}>
          <ul className={styles.ulBooks}>
            {author.books.map((book: Book) => (
              <li key={book.id}>
                <div className={styles.book} onClick={() => handleClickBook(book.id)}>
                  <img className={styles.bookCover} src={book.imageUrl ?? DefaultCover} alt="Zdjęcie książki" />
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetails;
