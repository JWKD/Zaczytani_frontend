import { useEffect, useState } from 'react';
import ChallengeIcon from '../../icons/ChallengeIcon';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import styles from './CurrentChallenges.module.scss';
import { Challenge } from '../../interfaces/challenge';
import challengeApi from '../../api/challengeApi';

interface CurrentChallengesProps {
  challengeQuantity: number;
}

const CurrentChallenges: React.FC<CurrentChallengesProps> = ({ challengeQuantity }) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <p className={styles.componentName}>Wyzwania czytelnicze</p>
        <ChallengeIcon />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.progressChallengesContainer}></div>
        {progressChallenges
          ?.slice(0, challengeQuantity)
          .map((challenge) => (
            <ChallengeProgressBar
              current={challenge.booksRead}
              max={challenge.booksToRead}
              name={challenge.criteriaValue}
              criteria={challenge.criteria}
            />
          ))}
      </div>
    </div>
  );
};

export default CurrentChallenges;
