import { useState } from 'react';
import styles from './CreateChallenge.module.scss';
import ChallengeIcon from '../../icons/ChallengeIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import { useNavigate } from 'react-router-dom';
import CheckmarkIcon from '../../icons/CheckmarkIcon';
import CircleIcon from '../../icons/CircleIcon';
import { PostChallenge } from '../../interfaces/challenge';
import SingleGenreAutoComplete from './AutoComplites/SingleGenreAutoComplite';
import SingleAuthorAutoComplete from './AutoComplites/SingleAuthorAutoComplite';
import challengeApi from '../../api/challengeApi';

function CreateChallenge() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [genre, setGenre] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [selectedOprionId, setSelectedOptionId] = useState<string>('BooksCount');
  const [validationMessage, setMessage] = useState<string>();
  const [challenge, setChallenge] = useState<PostChallenge>({
    booksToRead: 1,
    critiera: 'BooksCount',
    criteriaValue: null,
  });
  const navigate = useNavigate();

  const handleChange = (field: keyof PostChallenge, value: any) => {
    if (field === 'critiera') {
      if (value === 'BooksCount') {
        setChallenge({
          ...challenge,
          [field]: value,
          criteriaValue: null,
        });
        setSelectedOptionId(value);
      } else if (value === 'Genre') {
        setChallenge({
          ...challenge,
          [field]: value,
          criteriaValue: genre,
        });
        setSelectedOptionId(value);
      } else if (value === 'Author') {
        setChallenge({
          ...challenge,
          [field]: value,
          criteriaValue: author,
        });
        setSelectedOptionId(value);
      }
    } else {
      setChallenge({
        ...challenge,
        [field]: value,
      });
    }
  };

  function handleAdd() {
    const isValidLocal =
      challenge.booksToRead >= 1 &&
      challenge.booksToRead <= 3000 &&
      (selectedOprionId === 'BooksCount' ||
        (selectedOprionId === 'Genre' && genre !== '') ||
        (selectedOprionId === 'Author' && author !== ''));

    if (!isValidLocal) {
      setIsValid(false);
      setMessage('Sprawdź poprawność danych przed wysłaniem.');
      return;
    }

    setIsValid(true);
    postChallengeToApi();
  }

  async function postChallengeToApi() {
    try {
      await challengeApi.postChallenge(challenge);
      console.log('Wyzwanie zostało dodane!');
    } catch (error) {
      console.error('Błąd podczas dodawania wyzwania:', error);
    } finally {
      alert('Wyzwanie dodano pomyślnie!');
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}>
      <section className={styles.leftContainer}>
        <div className={styles.titleSection}>
          <p className={styles.componentName}>Dodaj wyzwanie</p>
          <ChallengeIcon />
        </div>
        <p className={styles.pageText}>
          <b>Witaj</b> w naszej literackiej społeczności! Masz pomysł na ciekawe wyzwanie czytelnicze? Stwórz je i
          podziel się z innymi użytkownikami! Twoje wyzwanie może inspirować do odkrywania nowych książek, gatunków czy
          autorów. Dzięki Tobie społeczność wzbogaci się o świeże pomysły, które motywują do regularnego sięgania po
          książki i rozwijania literackich pasji. Dołącz do nas i twórz wyzwania, które rozpalą wyobraźnię innych
          czytelników!
        </p>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.sectionTitle}>
          <DotHorizontal />
          <p className={styles.title}>Wybierz dogodną opcję i uzupełnij luki</p>
        </div>
        <div className={styles.optionsContainer}>
          <div className={styles.bookCountOption}>
            <div className={styles.markContainer} onClick={() => handleChange('critiera', 'BooksCount')}>
              {selectedOprionId === 'BooksCount' ? <CheckmarkIcon /> : <CircleIcon />}
            </div>
            Przeczytać
            <input
              className={styles.input}
              placeholder="liczba"
              type="number"
              onChange={(e) => handleChange('booksToRead', e.target.value)}
              value={challenge.booksToRead ?? ''}
            />
            książek.
          </div>
          <div className={styles.genreOption}>
            <div className={styles.markContainer} onClick={() => handleChange('critiera', 'Genre')}>
              {selectedOprionId === 'Genre' ? <CheckmarkIcon /> : <CircleIcon />}
            </div>
            Przeczytać
            <input
              className={styles.input}
              placeholder="liczba"
              type="number"
              onChange={(e) => handleChange('booksToRead', e.target.value)}
              value={challenge.booksToRead ?? ''}
            />
            książek
            <SingleGenreAutoComplete
              value={genre}
              onChange={(field, genre) => {
                setChallenge((prev) => ({
                  ...prev,
                  [field]: genre,
                }));
                setGenre(genre);
              }}
            />
            .
          </div>
          <div className={styles.authorOption}>
            <div className={styles.markContainer} onClick={() => handleChange('critiera', 'Author')}>
              {selectedOprionId === 'Author' ? <CheckmarkIcon /> : <CircleIcon />}
            </div>
            Przeczytać
            <input
              className={styles.input}
              placeholder="liczba"
              type="number"
              onChange={(e) => handleChange('booksToRead', e.target.value)}
              value={challenge.booksToRead ?? ''}
            />
            książek autorstwa
            <SingleAuthorAutoComplete
              value={author}
              onChange={(field, author) => {
                setChallenge((prev) => ({
                  ...prev,
                  [field]: author,
                }));
                setAuthor(author);
              }}
            />
            .
          </div>
          <div className={styles.validationContainer}>
            {isValid ? <p></p> : <p className={styles.validation}>{validationMessage}</p>}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.addButton} onClick={handleAdd}>
            Dodaj
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </section>
    </div>
  );
}

export default CreateChallenge;
