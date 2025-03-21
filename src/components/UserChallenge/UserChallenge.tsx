import { useEffect, useState } from 'react';
import ChallengeIcon from '../../icons/ChallengeIcon';
import CupIcon from '../../icons/CupIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import ChallengeProgressBar from '../ChallengeProgressBar/ChallengeProgressBar';
import styles from './UserChallenge.module.scss';
import CatLoader from '../CatLoader/CatLoader';
import { Challenge, NewChallenge } from '../../interfaces/challenge';
import challengeApi from '../../api/challengeApi';
import ChallengeProposal from '../ChallengeProposal/ChallengeProposal';

function UserChallenge() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [progressChallenges, setProgressChallenges] = useState<Challenge[]>();
  const [proposalChallenges, setProposalChallenges] = useState<NewChallenge[]>();
  const [myChallenges, setMyChallenges] = useState<NewChallenge[]>();
  const [childTrigger, setChildTrigger] = useState(false);

  const handleChangeValue = () => {
    setChildTrigger((prev) => !prev);
  };
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

  const fetchProposal = async () => {
    try {
      const proposalResult = await challengeApi.getAllNewChallenges();
      setProposalChallenges(proposalResult.slice().reverse());
    } catch (err) {
      setError('Wystąpił nieoczekiwany problem');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyChallenges = async () => {
    try {
      const myChallenges = await challengeApi.getAllMyChallenges();
      setMyChallenges(myChallenges);
    } catch (err) {
      setError('Wystąpił nieoczekiwany problem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProposal();
    fetchMyChallenges();
  }, [childTrigger]);

  return loading ? (
    <div
      style={{
        width: '500px',
        margin: '0 auto',
      }}
    >
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
          <div className={styles.progressChallengesContainer}>
            {progressChallenges?.map((challenge) => (
              <ChallengeProgressBar
                id={challenge.challengeId}
                key={challenge.id}
                current={challenge.booksRead}
                max={challenge.booksToRead}
                name={challenge.criteriaValue}
                criteria={challenge.criteria}
                deleteIcon={true}
                onChangeValue={handleChangeValue}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.sectionTitle}>
          <DotHorizontal />
          <p className={styles.title}>Propozycje</p>
        </div>
        <div className={styles.proposalContainer}>
          {proposalChallenges?.map((challenge) => (
            <ChallengeProposal
              key={challenge.id}
              onChangeValue={handleChangeValue}
              current={0}
              max={challenge.booksToRead}
              name={challenge.criteriaValue}
              criteria={challenge.criteria}
              id={challenge.id}
              trashIcon={false}
            />
          ))}
        </div>
        <div className={styles.sectionTitle}>
          <DotHorizontal />
          <p className={styles.title}>Moje wyzwania</p>
        </div>
        <div className={styles.proposalContainer}>
          {myChallenges?.map((challenge) => (
            <ChallengeProposal
              onChangeValue={handleChangeValue}
              current={0}
              max={challenge.booksToRead}
              name={challenge.criteriaValue}
              criteria={challenge.criteria}
              id={challenge.id}
              trashIcon={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserChallenge;
