import ChallengeBookIcon from '../../icons/ChallengeBookIcon';
import OpenBookIcon from '../../icons/OpenBookIcon';
import challengeVariety from '../../utils/ChallengeVariety';
import styles from './ChallengeProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  max: number;
  name: string;
  criteria: string;
}

const ChallengeProgressBar: React.FC<ProgressBarProps> = ({ current, max, name, criteria }) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.icon}>
          <OpenBookIcon />
        </div>
        <div className={styles.allText}>
        <p className={styles.text}>
  Przeczytać
  <span className={styles.smallText}> {max}</span> 
  <span className={styles.function}>{challengeVariety(max, criteria)}</span>
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
  );
};

export default ChallengeProgressBar;
