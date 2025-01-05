import { useState } from 'react';
import styles from './CreateChallenge.module.scss';
import ChallengeIcon from '../../icons/ChallengeIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import { useNavigate } from 'react-router-dom';

function CreateChallenge() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleAdd() {}

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
        <div className={styles.optionsContainer}></div>
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
