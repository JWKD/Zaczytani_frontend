import { ChangeEvent, useEffect, useState } from 'react';
import styles from './BookSearch.module.scss';
import dataApi from '../../api/bookApi';
import { AuthorBooks, Book } from '../../interfaces/book';
import SearchIcon from '../../icons/SearchIcon';
import { useNavigate } from 'react-router-dom';
import Delete from '../../icons/Delete';

function BookSearch() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [authorBooks, setAuthorBooks] = useState<AuthorBooks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchPhrase || searchPhrase.length < 3) {
        setAuthorBooks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await dataApi.getSearchedBooks(searchPhrase);
        console.log(result);
        // Przekształcenie danych z API do odpowiedniej struktury
        const authorsWithBooks: AuthorBooks[] = result.map((authorData: any) => {
          const books: Book[] = authorData.books.map((bookData: any) => ({
            id: bookData.id,
            title: bookData.title,
            isbn: bookData.isbn,
            description: bookData.description,
            pageNumber: bookData.pageNumber,
            authors: [
              {
                id: authorData.id,
                name: authorData.name,
              },
            ],
          }));

          return {
            id: authorData.id,
            name: authorData.name,
            books: books,
          };
        });

        setAuthorBooks(authorsWithBooks);
      } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas wyszukiwania książek');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchPhrase]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  function handleClickBook(id: string) {
    navigate(`/books/${id}`);
  }

  function handleClickAuthor(author: AuthorBooks) {
    navigate(`/authors/${author.id}`, { state: { author } });
  }

  function handleClickDelete() {
    setSearchPhrase('');
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.iconAndInput}>
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
        {searchPhrase.length > 2 && (
          <span className={styles.delete} onClick={() => handleClickDelete()}>
            <Delete />
          </span>
        )}
      </div>

      {authorBooks.length > 0 && searchPhrase.length > 2 ? (
        <div className={styles.bookList}>
          {authorBooks.map((author) => (
            <ul>
              {author.books.map((book) => (
                <li key={book.id}>
                  <h3 className={styles.bookTitle} onClick={() => handleClickBook(book.id)}>
                    {book.title}:{' '}
                  </h3>
                  <h3 className={styles.bookAuthor} onClick={() => handleClickAuthor(author)}>
                    {author.name}
                  </h3>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ) : (
        !loading && !error
      )}
    </div>
  );
}

export default BookSearch;
