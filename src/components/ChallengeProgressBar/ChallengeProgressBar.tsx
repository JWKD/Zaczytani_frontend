import OpenBookIcon from '../../icons/OpenBookIcon';
import challengeVariety from '../../utils/ChallengeVariety';
import styles from './ChallengeProgressBar.module.scss';
import TrashIcon from '../../icons/TrashIcon';
import { useState } from 'react';
import challengeApi from '../../api/challengeApi';

interface ProgressBarProps {
  id: string;
  current: number;
  max: number;
  name: string;
  criteria: string;
  deleteIcon: boolean;
  onChangeValue: () => void;
}

const ChallengeProgressBar: React.FC<ProgressBarProps> = ({
  id,
  current,
  max,
  name,
  criteria,
  deleteIcon,
  onChangeValue,
}) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);
  const [deletePopup, setDeletePopup] = useState(false);

  const handleClickDetach = async () => {
    try {
      await challengeApi.detachChallenge(id);
    } catch (error) {
      console.error('Błąd podczas usuwania wyzwania:', error);
    } finally {
      setDeletePopup(false);
      onChangeValue();
    }
  };

  return (
    <div className={styles.container}>
      {deletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.deletePopupContainer}>
            <div className={styles.deleteText}>Czy na pewno chcesz opuścić wyzwanie?</div>
            <div className={styles.deleteButtonContainer}>
              <button className={styles.shelfDeleteButoon} onClick={handleClickDetach}>
                Tak
              </button>
              <button className={styles.shelfCancelButoon} onClick={() => setDeletePopup(false)}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.chllengeContainer}>
        <div className={styles.textContainer}>
          <div className={styles.icon}>
            <OpenBookIcon />
          </div>
          <div className={styles.allText}>
            <p className={styles.text}>
              Przeczytać<p className={styles.smallText}> {max}</p>
              <p className={styles.function}>{challengeVariety(max, criteria)}</p>{' '}
            </p>
            <div className={styles.dotContainer}>
              <p className={styles.name}> {name || ''}</p>
              {criteria !== 'BooksCount' && <p>.</p>}
            </div>
          </div>
        </div>
        <div className={styles.trashContainer}>
          {deleteIcon ? (
            <div className={styles.deleteIconContainer} onClick={() => setDeletePopup(true)}>
              <TrashIcon />
            </div>
          ) : (
            <></>
          )}
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
