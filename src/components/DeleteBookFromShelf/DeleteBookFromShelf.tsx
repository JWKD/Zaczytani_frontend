import { useNavigate } from 'react-router-dom';
import shelfApi from '../../api/shelvesApi';
import styles from './DeleteBookFromShelf.module.scss';

interface DeleteBookFromShelfProps {
  bookId: string;
  shelfId: string;
  onChangeValue: (newValue: boolean) => void;
}

const DeleteBookFromShelf: React.FC<DeleteBookFromShelfProps> = ({ bookId, shelfId, onChangeValue }) => {
  const navigate = useNavigate();
  const deleteBookFromShelf = async () => {
    try {
      await shelfApi.detach(shelfId, bookId);
    } catch (error) {
      console.error('Błąd podczas usuwania', error);
    } finally {
      onChangeValue(false);
      navigate('/');
    }
  };

  const handleCancel = () => {
    onChangeValue(false);
  };
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.deletePopupContainer}>
        <div className={styles.deleteText}>Czy na pewno chcesz usunąć?</div>
        <div className={styles.deleteButtonContainer}>
          <button className={styles.shelfDeleteButoon} onClick={deleteBookFromShelf}>
            Tak
          </button>
          <button className={styles.shelfCancelButoon} onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookFromShelf;
