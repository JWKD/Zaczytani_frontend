import ChallengeIcon from '../../icons/ChallengeIcon';
import CupIcon from '../../icons/CupIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import styles from './UserChallenge.module.scss';

function UserChallenge() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.leftContainer}>
        <div className={styles.titleSection}>
          <p className={styles.componentName}>Wyzwania czytelnicze</p>
          <ChallengeIcon />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.topSection}>
            <CupIcon />
            <p className={styles.cupText}>Moje</p>
          </div>
          <ChallengeProgressBar
            current={100}
            max={100}
            title="Przeczytać 23 książki autorstwa Henryka Sienkiewiecz Wielkiego."
          />
          <ChallengeProgressBar current={100} max={100} title="Przeczytać 23 książek." />
        </div>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.sectionTitle}>
          <DotHorizontal />
          <p className={styles.title}>Propozycje</p>
        </div>
      </section>
    </div>
  );
}

export default UserChallenge;
