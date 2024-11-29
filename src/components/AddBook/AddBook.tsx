import { useState } from 'react';
import AddBookIcon from '../../icons/AddBookIcon';
import CameraLens from '../../icons/CameraLens';
import styles from '../AddBook/AddBook.module.scss';
import GenresAutoComplete from './GenresAutoComplete';

export interface BookRequest {
  title: string;
  isbn: string;
  description: string;
  pageNumber: number;
  releaseDate: string;
  fileName: string;
  authors: string;
  publishingHouse: string;
  genre: string[];
  series: string;
}

function AddBook() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenresChange = (selectedOptions: string[]) => {
    setSelectedGenres(selectedOptions);
  };

  return (
    <div className={styles.mainContainer}>
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
        <div className={styles.mainInputs}>
          <div className={styles.addPhoto}>
            <CameraLens />
          </div>
          <input type="text" placeholder="Tytuł"></input>
          <GenresAutoComplete value={selectedGenres} onChange={handleGenresChange} />
        </div>
      </div>
    </div>
  );
}

export default AddBook;
