import { useEffect, useState } from 'react';
import { Book } from '../../interfaces/book';

import { DeleteShelf, Shelf, UpdateShelf } from '../../interfaces/Shelf';
import styles from './ShelfDetailsComponent.module.scss';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import BookIcon from '../../icons/BookIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import defaultImage from '../../assets/defaultCover.jpg';
import RatingIcon from '../../icons/RatingIcon';
import { useNavigate } from 'react-router-dom';
import shelfApi from '../../api/shelvesApi';
import TrashIcon from '../../icons/TrashIcon';
import DeleteBookFromShelf from '../DeleteBookFromShelf/DeleteBookFromShelf';

interface ShelfDetailsProps {
  id: string;
}

function ShelfDetailsComponent({ id }: ShelfDetailsProps) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shelf, setShelf] = useState<Shelf>();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [validError, setValidationError] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [deleteBookPopUp, setDeleteBookPopUp] = useState<boolean>(false);
  const [bookToDelte, setBookToDelete] = useState<string>('');
  const navigate = useNavigate();

  const [newShelf, setNewShelf] = useState<UpdateShelf>({
    shelfId: id,
    name: '',
    description: '',
  });

  const [deleteShelf] = useState<DeleteShelf>({
    shelfId: id,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultShelf = await shelfApi.getShelf(id);
        setShelf(resultShelf);
        const resultShelfBooks = await shelfApi.getShelfBooks(id);
        setBooks(resultShelfBooks);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNewShelfNameChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    setNewShelf((prevShelf) => ({
      ...prevShelf,
      name: e.target.value,
    }));
  };

  const validateInput = (value: string): string => {
    if (value.trim().length < 3) {
      return 'Nazwa półki musi mieć co najmniej 3 znaki.';
    }
    if (value.trim().length > 25) {
      return 'Nazwa półki nie może przekraczać 25 znaków.';
    }
    return '';
  };

  const saveDataButton = async () => {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setValidationError(validationError);
      return;
    }
    try {
      await shelfApi.updateShelf(newShelf);
    } catch (error) {
      console.error('Błąd podczas zmiany nazwy:', error);
    } finally {
      navigate('/');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await shelfApi.deleteShelf(deleteShelf);
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    } finally {
      navigate('/');
    }
  };

  function deleteBook(bookId: string) {
    setDeleteBookPopUp(true);
    setBookToDelete(bookId);
  }

  function handleDeleteShelf() {
    setDeletePopup(true);
  }

  const handleChangeValue = (newValue: boolean) => {
    setDeleteBookPopUp(newValue);
  };

  function closePopUp() {
    setIsPopupVisible(false);
  }

  function handleDeleteCancel() {
    setDeletePopup(false);
  }

  async function handleChangeNameClick() {
    setIsPopupVisible(true);
  }
  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}>
      {isPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <input
              type="string"
              value={inputValue}
              className={styles.newNameInput}
              onChange={handleNewShelfNameChange}
              placeholder="Wpisz nową nazwę półki"
            ></input>
            {validError && <p className={styles.errorText}>{validError}</p>}
            <div className={styles.popUpButtonContainer}>
              <button className={styles.yesButton} onClick={saveDataButton}>
                Zapisz
              </button>
              <button className={styles.noButton} onClick={closePopUp}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
      {deletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.deletePopupContainer}>
            <div className={styles.deleteText}>Czy na pewno chcesz usunąć?</div>
            <div className={styles.deleteButtonContainer}>
              <button className={styles.shelfDeleteButoon} onClick={handleDeleteConfirm}>
                Tak
              </button>
              <button className={styles.shelfCancelButoon} onClick={handleDeleteCancel}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
      <section className={styles.leftPanel}>
        <div className={styles.title}>
          <h2 className={styles.text}>Moja biblioteczka</h2>
          <BookIcon />
        </div>
        <div className={styles.shelfContainer}>{shelf && <ShelfComponent shelf={shelf} />}</div>
        {!shelf?.isDefault && (
          <div className={styles.buttonContainer}>
            <button className={styles.changeNameButton} onClick={handleChangeNameClick}>
              Zmień nazwę półki
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteShelf}>
              Usuń półkę
            </button>
          </div>
        )}
      </section>
      <section className={styles.rightPanel}>
        <div className={styles.shelfTitle}>
          <DotHorizontal />
          <h2 className={styles.shelfText}>Półka {shelf?.name}</h2>
        </div>
        <div className={styles.booksContainer}>
          {books?.map((books: Book, index) => (
            <div key={index} className={styles.oneBook}>
              {deleteBookPopUp && bookToDelte === books.id && (
                <DeleteBookFromShelf onChangeValue={handleChangeValue} shelfId={id} bookId={books.id} />
              )}
              <img src={books.imageUrl || defaultImage} className={styles.image} alt={books.title}></img>
              <div className={styles.bookTitle}>{books.title}</div>
              <div className={styles.bookAuthor}>
                <ul>
                  {books.authors.map((author) => (
                    <li key={author.id} className={styles.authorName}>
                      {author.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.ratingContainer}>
                  <RatingIcon />
                  <p className={styles.rating}>{Math.floor(books.rating)}</p>
                </div>
                <div className={styles.deleteIconContainer} onClick={() => deleteBook(books.id)}>
                  <TrashIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShelfDetailsComponent;
