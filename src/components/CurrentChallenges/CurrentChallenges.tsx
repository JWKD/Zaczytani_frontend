import { useEffect, useState } from 'react';
import ChallengeIcon from '../../icons/ChallengeIcon';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import styles from './CurrentChallenges.module.scss';
import { Challenge } from '../../interfaces/challenge';
import challengeApi from '../../api/challengeApi';
import CatLoader from '../CatLoader/CatLoader';

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
      setProgressChallenges(result.slice().reverse());
    } catch (err) {
      setError('Wystąpił nieoczekiwany problem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeValue = () => {};

  return loading ? (
    <div style={{ width: '100px' }}>
      <CatLoader />
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
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
              id={challenge.id}
              current={challenge.booksRead}
              max={challenge.booksToRead}
              name={challenge.criteriaValue}
              criteria={challenge.criteria}
              deleteIcon={false}
              onChangeValue={handleChangeValue}
            />
          ))}
      </div>
    </div>
  );
};

export default CurrentChallenges;
