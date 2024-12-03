import { useEffect, useState } from 'react';
import AddBookIcon from '../../icons/AddBookIcon';
import CameraLens from '../../icons/CameraLens';
import styles from '../AddBook/AddBook.module.scss';
import GenresAutoComplete from './AutoCompletes/GenresAutoComplete';
import AuthorAutoComplete from './AutoCompletes/AuthorAutoComplete';
import PublishingHouseAutoComplete from './AutoCompletes/PublishingHouseAutoComplete';
import { useNavigate } from 'react-router-dom';
import dataApiFile from '../../api/fileApi';
import dataApiBook from '../../api/bookApi';

interface BookRequestPre {
  title: string;
  isbn: string | null;
  description: string | null;
  pageNumber: number | null;
  releaseDate: string | null;
  fileName: string | null;
  authors: string[];
  publishingHouse: string | null;
  genre: string[] | null;
  series: string | null;
}

export interface BookRequest {
  title: string;
  isbn: string | null;
  description: string | null;
  pageNumber: number | null;
  releaseDate: string | null;
  fileName: string | null;
  authors: string;
  publishingHouse: string | null;
  genre: string[] | null;
  series: string | null;
}

function AddBook() {
  const [bookRequest, setBookRequest] = useState<BookRequestPre>({
    title: '',
    isbn: null,
    description: null,
    pageNumber: null,
    releaseDate: null,
    fileName: null,
    authors: [],
    publishingHouse: null,
    genre: null,
    series: null,
  });

  const [bookRequestPost, setBookRequestPost] = useState<BookRequest>({
    title: '',
    isbn: null,
    description: null,
    pageNumber: null,
    releaseDate: null,
    fileName: null,
    authors: '',
    publishingHouse: null,
    genre: null,
    series: null,
  });

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    if (validateForm()) {
      uploadFile();
      setIsPopupVisible(true);
    }
  };
  const handleClosePopup = () => setIsPopupVisible(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

      if (allowedExtensions.includes(file.type)) {
        setFile(file);
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
      } else {
        setFile(null);
        alert('Plik musi być png jpg jpeg lub gif');
      }
    }
  };

  const uploadFile = async () => {
    try {
      if (file) {
        const result = await dataApiFile.postFile(file);
        handleChange('fileName', result);
      }
    } catch (error) {
      console.error('Błąd podczas przesyłania pliku:', error);
    }
  };

  const handleChange = (field: keyof BookRequest, value: any) => {
    if (field === 'pageNumber') {
      setBookRequest({
        ...bookRequest,
        [field]: value.trim(),
      });
    } else {
      setBookRequest({
        ...bookRequest,
        [field]: value,
      });
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  const convertBookRequest = () => {
    const authorsString = bookRequest.authors.join(', ');

    const bookRequestPost: BookRequest = {
      title: bookRequest.title,
      isbn: bookRequest.isbn,
      description: bookRequest.description,
      pageNumber: bookRequest.pageNumber,
      releaseDate: bookRequest.releaseDate,
      fileName: bookRequest.fileName,
      authors: authorsString,
      publishingHouse: bookRequest.publishingHouse,
      genre: bookRequest.genre,
      series: bookRequest.series,
    };
    setBookRequestPost(bookRequestPost);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      convertBookRequest();
    }
  };

  useEffect(() => {
    const postData = async () => {
      try {
        if (bookRequestPost.title) {
          await dataApiBook.postBookRequest(bookRequestPost);
          navigate('/user/bookrequests');
        }
      } catch (error) {
        console.error('Błąd podczas przesyłania prośby:', error);
      }
    };
    postData();
  }, [bookRequestPost]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!bookRequest.title.trim() || bookRequest.title.length > 150 || bookRequest.title.length <= 2) {
      newErrors.title = 'Tytuł musić być conajmniej 2 znakowy i krótszy niż 150 znaków!';
    }
    if (bookRequest.authors.length === 0) {
      newErrors.authors = 'Musisz dodać conajmniej jednego autora!';
    }
    if (bookRequest.isbn && (bookRequest.isbn.length < 10 || bookRequest.isbn.length > 13)) {
      newErrors.isbn = 'Numer ISBN musi mieć od 10 do 13 znaków!';
    }
    if (bookRequest.description && (bookRequest.description.length > 1000 || bookRequest.description.length <= 10)) {
      newErrors.description = 'Opis musi być dłuższy niż 10 znaków i krótszy niż 1000 znaków!';
    }
    if (bookRequest.pageNumber && (bookRequest.pageNumber < 0 || bookRequest.pageNumber >= 10000)) {
      newErrors.pageNumber = 'Liczba stron musi być większa od 0 i mniejsza od 10000!';
    }
    if (bookRequest.releaseDate) {
      const releaseDateObj = new Date(bookRequest.releaseDate);
      const currentDate = new Date();
      if (releaseDateObj > currentDate) newErrors.releaseDate = 'Data wydania nie może być z przyszłości!';
    }
    if (bookRequest.series && bookRequest.series.length > 150) {
      newErrors.series = 'Seria nie może być dłuższa niż 150 znaków!';
    }
    if (!bookRequest.genre || bookRequest.genre.length === 0) {
      newErrors.genre = 'Musisz dodać conajmniej jeden gatunek!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className={styles.mainContainer}>
      {isPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Na pewno chcesz dodać ksiażkę?</h2>
            <button className={styles.yesButton} onClick={handleAdd}>
              TAK
            </button>
            <button className={styles.noButton} onClick={handleClosePopup}>
              NIE
            </button>
          </div>
        </div>
      )}
      <div className={styles.staticContainer}>
        <h2>
          Dodaj książkę{' '}
          <span>
            <AddBookIcon />
          </span>
        </h2>
        <div className={styles.text}>
          <p>
            <strong>Witaj</strong> w naszej społeczności pasjonatów literatury! Jeśli uważasz, że jakaś wyjątkowa
            książka zasługuje na dodanie do naszej kolekcji, nie zwlekaj – zgłoś ją za pomocą tego formularza! Wpis,
            który dodasz, trafi do naszego zespołu administratorów, którzy dokładnie go przeanalizują i, jeśli spełni
            kryteria, książka zostanie dodana do ogólnodostępnej biblioteki. Każdy zgłoszony tytuł wzbogaca naszą bazę i
            sprawia, że staje się ona cennym źródłem inspiracji dla czytelników szukających nowych, fascynujących
            lektur.
          </p>
          <br />
          <p>
            Dzięki Tobie nasza strona stanie się miejscem, gdzie każdy znajdzie coś dla siebie – od bestsellerów i
            klasyki literatury, po unikalne tytuły, które trudno znaleźć gdzie indziej. Twoje zgłoszenie przyczynia się
            do rozwoju tej przestrzeni i wspiera ideę dzielenia się pasją do książek z innymi. Dołącz do nas, pomóż
            budować tę wyjątkową bazę i dziel się swoją literacką wiedzą!
          </p>
        </div>
      </div>
      <div className={styles.addBookContainer}>
        <div className={styles.photoAndInputs}>
          <div className={styles.addImage}>
            {file ? (
              <div className={styles.Photo} onClick={() => document.getElementById('fileInput')?.click()}>
                <img src={filePreview} alt="Twoja okładka" />
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            ) : (
              <div className={styles.addPhoto} onClick={() => document.getElementById('fileInput')?.click()}>
                <CameraLens />
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
            )}
          </div>

          <div className={styles.mainInputs}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Tytuł"
                onChange={(e) => handleChange('title', e.target.value)}
                value={bookRequest.title}
              ></input>
              {errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>
            <div className={styles.inputContainer}>
              <span>
                <AuthorAutoComplete
                  value={bookRequest.authors}
                  onChange={(field, selectedAuthors) => {
                    setBookRequest((prev) => ({
                      ...prev,
                      [field]: selectedAuthors,
                    }));
                  }}
                />
              </span>
              {errors.authors && <div className={styles.error}>{errors.authors}</div>}
            </div>
            <span>
              <PublishingHouseAutoComplete
                value={bookRequest.publishingHouse}
                onChange={(field, publishingHouse) => {
                  setBookRequest((prev) => ({
                    ...prev,
                    [field]: publishingHouse,
                  }));
                }}
              />
            </span>
            <div className={styles.inputContainer}>
              <span>
                <GenresAutoComplete
                  value={bookRequest.genre}
                  onChange={(field, genre) => {
                    setBookRequest((prev) => ({
                      ...prev,
                      [field]: genre,
                    }));
                  }}
                />
              </span>
              {errors.genre && <div className={styles.error}>{errors.genre}</div>}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Seria"
                onChange={(e) => handleChange('series', e.target.value)}
                value={bookRequest.series || ''}
              ></input>
              {errors.series && <div className={styles.error}>{errors.series}</div>}
            </div>
          </div>
        </div>
        <p className={styles.bookParagraph}>Opis książki:</p>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.description}
            placeholder="Tutaj pisz..."
            onChange={(e) => handleChange('description', e.target.value)}
            value={bookRequest.description ?? ''}
          ></textarea>
          {errors.description && <div className={styles.error}>{errors.description}</div>}
        </div>
        <div className={styles.lastInputs}>
          <div className={styles.inputContainer}>
            <div className={styles.pages}>
              <p>Ilość stron:</p>
              <input
                type="number"
                onChange={(e) => handleChange('pageNumber', e.target.value)}
                value={bookRequest.pageNumber ?? ''}
              />
            </div>
            {errors.pageNumber && <div className={styles.error}>{errors.pageNumber}</div>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.isbn}>
              <p>ISBN:</p>
              <input
                type="text"
                onChange={(e) => handleChange('isbn', e.target.value)}
                value={bookRequest.isbn || ''}
              />
            </div>
            {errors.isbn && <div className={styles.error}>{errors.isbn}</div>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.date}>
              <p>Data wydania:</p>
              <input
                type="date"
                onChange={(e) => handleChange('releaseDate', e.target.value)}
                value={bookRequest.releaseDate || ''}
              />
            </div>
            {errors.releaseDate && <div className={styles.error}>{errors.releaseDate}</div>}
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.addButton} onClick={handleOpenPopup}>
            DODAJ
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            ANULUJ
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
