import { useEffect, useState } from 'react';
import SearchIcon from '../../icons/searchIcon';
import styles from './BookSearch.module.scss';
import dataApi from '../../api/bookApi';
import { Book } from '../../interfaces/book';

function BookSearch() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchPhrase) return;

      setLoading(true);
      setError(null);

      try {
        const result = await dataApi.getSearchedBooks(searchPhrase);
        console.log(result);
        setBooks(result);
      } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas wyszukiwania książek');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchPhrase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>
      <input
        className={styles.inputBox}
        value={searchPhrase}
        onChange={handleInputChange}
        type="text"
        placeholder="Tytuł, autor lub ISBN"
      />

      {books.length > 0 ? (
        <ul className={styles.bookList}>
          {books.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <strong>{book.title}</strong> -{' '}
              <ul>
                {book.authors.map((author) => (
                  <li key={author.id}>{author.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && searchPhrase && <p>Brak wyników</p>
      )}
    </div>
  );
}

export default BookSearch;
