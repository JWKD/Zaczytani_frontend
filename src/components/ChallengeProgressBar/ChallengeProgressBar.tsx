import OpenBookIcon from '../../icons/OpenBookIcon';
import styles from './ChallengeProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  max: number;
  title: string;
}

const ChallengeProgressBar: React.FC<ProgressBarProps> = ({ current, max, title }) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.icon}>
          <OpenBookIcon />
        </div>
        <p className={styles.text}>{title}</p>
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
