import challengeApi from '../../api/challengeApi';
import ChallengeBookIcon from '../../icons/ChallengeBookIcon';
import challengeVariety from '../../utils/ChallengeVariety';
import styles from './ChallengeProposal.module.scss';

export interface ChallengeProposalProps {
  current: number;
  max: number;
  name: string;
  criteria: string;
  id: string;
  onChangeValue: () => void;
}

const ChallengeProposal: React.FC<ChallengeProposalProps> = ({ current, max, name, criteria, id, onChangeValue }) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);
  const handleClick = async () => {
    try {
      await challengeApi.joinChallenge(id);
    } catch (error) {
      console.error('Błąd podczas dołączania do wyzwania:', error);
    } finally {
      onChangeValue();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.textContainer}>
          <div className={styles.icon}>
            <ChallengeBookIcon />
          </div>
          <div className={styles.allText}>
            <p className={styles.text}>
              Przeczytać<p className={styles.smallText}> {max}</p>
              <p className={styles.function}>{challengeVariety(max, criteria)}</p>
            </p>
            <div className={styles.dotContainer}>
              <p className={styles.name}> {name || ''}</p>
              {criteria !== 'BooksCount' && <p>.</p>}
            </div>
          </div>
        </div>
        <div className={styles.percentageSection}>
          <div className={styles.barContainer}>
            <div className={styles.progressText}>
              {current}/{max}
            </div>
            <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
          </div>
          <p className={styles.percentRating}>{percentage}%</p>
        </div>
      </div>
      <button className={styles.button} onClick={handleClick}>
        Dołącz
      </button>
    </div>
  );
};

export default ChallengeProposal;
