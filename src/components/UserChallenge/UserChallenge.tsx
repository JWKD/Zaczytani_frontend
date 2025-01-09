import { useEffect, useState } from 'react';
import ChallengeIcon from '../../icons/ChallengeIcon';
import CupIcon from '../../icons/CupIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import styles from './UserChallenge.module.scss';
import CatLoader from '../CatLoader/CatLoader';
import { Challenge } from '../../interfaces/challenge';
import challengeApi from '../../api/challengeApi';

function UserChallenge() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progressChallenges, setProgressChallenges] = useState<Challenge[]>();

  const fetchData = async () => {
    try {
      const result = await challengeApi.getAllProgressChallenges();
      setProgressChallenges(result);
      console.log(result);
    } catch (err) {
      setError('Wystąpił nieoczekiwany problem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div style={{ width: '300px' }}>
      <CatLoader />
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
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
          <div className={styles.progressChallengesContainer}></div>
          {progressChallenges?.map((challenge) => (
            <ChallengeProgressBar
              takePart={true}
              current={challenge.booksRead}
              max={challenge.booksToRead}
              name={challenge.criteriaValue}
              criteria={challenge.criteria}
            />
          ))}
        </div>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.sectionTitle}>
          <DotHorizontal />
          <p className={styles.title}>Propozycje</p>
        </div>
        <div className={styles.proposalContainer}></div>
      </section>
    </div>
  );
}

export default UserChallenge;
