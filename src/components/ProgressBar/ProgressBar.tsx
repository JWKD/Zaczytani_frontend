import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div className={styles.progressText}>
          {current}/{max}
        </div>
        <div className={styles.progressBar} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className={styles.percentRating}>{percentage}%</p>
    </div>
  );
};

export default ProgressBar;
