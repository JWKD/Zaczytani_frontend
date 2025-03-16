import { useState } from 'react';
import challengeApi from '../../api/challengeApi';
import ChallengeBookIcon from '../../icons/ChallengeBookIcon';
import TrashIcon from '../../icons/TrashIcon';
import challengeVariety from '../../utils/ChallengeVariety';
import styles from './ChallengeProposal.module.scss';

export interface ChallengeProposalProps {
  current: number;
  max: number;
  name: string;
  criteria: string;
  id: string;
  trashIcon: boolean;
  onChangeValue: () => void;
}

const ChallengeProposal: React.FC<ChallengeProposalProps> = ({
  current,
  max,
  name,
  criteria,
  id,
  trashIcon,
  onChangeValue,
}) => {
  const percentage = Math.floor(max > 0 ? (current / max) * 100 : 0);
  const [deletePopup, setDeletePopup] = useState(false);
  const handleClickJoin = async () => {
    try {
      await challengeApi.joinChallenge(id);
    } catch (error) {
      console.error('Błąd podczas dołączania do wyzwania:', error);
    } finally {
      onChangeValue();
    }
  };

  const handleClickDelete = async () => {
    try {
      await challengeApi.deleteChallenge(id);
    } catch (error) {
      console.error('Błąd podczas usuwania wyzwania:', error);
    } finally {
      setDeletePopup(false);
      onChangeValue();
    }
  };

  function handleDeleteCancel() {
    setDeletePopup(false);
  }
  return (
    <div className={styles.container}>
      {deletePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.deletePopupContainer}>
            <div className={styles.deleteText}>Czy na pewno chcesz usunąć?</div>
            <div className={styles.deleteButtonContainer}>
              <button className={styles.shelfDeleteButoon} onClick={handleClickDelete}>
                Tak
              </button>
              <button className={styles.shelfCancelButoon} onClick={handleDeleteCancel}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
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
      <div className={styles.buttonContainer}>
        {trashIcon ? (
          <div className={styles.deleteIconContainer} onClick={() => setDeletePopup(true)}>
            <TrashIcon />
          </div>
        ) : (
          <></>
        )}
        <button className={styles.button} onClick={handleClickJoin}>
          Dołącz
        </button>
      </div>
    </div>
  );
};

export default ChallengeProposal;
