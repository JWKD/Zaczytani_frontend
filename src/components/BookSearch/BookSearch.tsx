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

  const [books, setBooks] = useState<Book[]>([]);

  const groupBooks = (authorBooks: AuthorBooks[]): Book[] => {
    const bookMap = new Map<string, Book>();

    authorBooks.forEach((author) => {
      author.books.forEach((book) => {
        const existingBook = bookMap.get(book.id);

        if (existingBook) {
          existingBook.authors.push({ id: author.id, name: author.name, imageUrl: author.imageUrl });
        } else {
          bookMap.set(book.id, {
            ...book,
            authors: [{ id: author.id, name: author.name, imageUrl: author.imageUrl }],
          });
        }
      });
    });
    return Array.from(bookMap.values());
  };

  useEffect(() => {
    setBooks([]);
    if (authorBooks.length > 0) {
      const groupedBooks = groupBooks(authorBooks);
      setBooks(groupedBooks);
    }
  }, [authorBooks]);

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

        const authorsWithBooks: AuthorBooks[] = result.map((authorData: AuthorBooks) => {
          const books: Book[] = authorData.books.map((bookData: Book) => ({
            id: bookData.id,
            title: bookData.title,
            isbn: bookData.isbn,
            description: bookData.description,
            pageNumber: bookData.pageNumber,
            realeaseDate: bookData.realeaseDate,
            imageUrl: bookData.imageUrl,
            genre: bookData.genre,
            rating: bookData.rating,
            series: bookData.series,
            publishingHouse: bookData.publishingHouse,
            ratingCount: bookData.ratingCount,
            reviews: bookData.reviews,
            readers: bookData.readers,
            authors: [
              {
                id: authorData.id,
                name: authorData.name,
                imageUrl: authorData.imageUrl,
              },
            ],
          }));

          return {
            id: authorData.id,
            name: authorData.name,
            imageUrl: authorData.imageUrl,
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

  function findAuthorById(authorBooks: AuthorBooks[], authorId: string): AuthorBooks {
    return authorBooks.find((author) => author.id === authorId)!;
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

      {books.length > 0 && searchPhrase.length > 2 ? (
        <div className={styles.bookList}>
          {books.map((book) => (
            <ul key={book.id}> 
              <li className={styles.bookItem}>
                <h3 className={styles.bookTitle} onClick={() => handleClickBook(book.id)}>
                  {book.title}:{' '}
                </h3>
                <ul className={styles.authorList}>
                  {book.authors.map((author) => (
                    <li key={author.id}>
                      <h3
                        className={styles.bookAuthor}
                        onClick={() => {
                          const foundAuthor: AuthorBooks = findAuthorById(authorBooks, author.id);
                          handleClickAuthor(foundAuthor);
                        }}
                      >
                        {author.name}
                      </h3>
                    </li>
                  ))}
                </ul>
              </li>
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
