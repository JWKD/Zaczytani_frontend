import { useEffect, useState } from 'react';
import styles from './AddBookOnShelf.module.scss';
import { Shelf } from '../../interfaces/Shelf';
import shelfApi from '../../api/shelvesApi';
import DotHorizontal from '../../icons/DotsHorizontal';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import { useNavigate } from 'react-router-dom';

interface AddBookOnShelfProps {
  bookId?: string;
  onChangeValue: (newValue: boolean) => void;
}

const AddBookOnShelf: React.FC<AddBookOnShelfProps> = ({ bookId, onChangeValue }) => {
  const [shelves, setShelves] = useState<Shelf[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await shelfApi.getShelves();
        setShelves(result.slice().reverse());
      } catch (err) {
        setError('Wystąpił nieoczekiwany problem');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToShelf = async (shelfId: string) => {
    try {
      await shelfApi.attach(shelfId, bookId ?? '');
    } catch (error) {
      console.error('Błąd podczas dodawania książki na półkę', error);
    } finally {
      navigate(`/bookshelf/getBookshelf/${shelfId}`);
      onChangeValue(false);
    }
  };
  const handleCancel = () => {
    onChangeValue(false);
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}>
      <div className={styles.shelvesContainer}>
        <div className={styles.title}>
          <DotHorizontal />
          <h2 className={styles.text}>Wybierz półkę</h2>
        </div>
        <div className={styles.shelvesGrid}>
          {shelves?.map((shelf, index) => (
            <div className={styles.shelfContainer}>
              <ShelfComponent key={index} shelf={shelf} />
              <div className={styles.addButtonContainer}>
                <button className={styles.addBookButton} onClick={addToShelf.bind(null, shelf.id)}>
                  Dodaj
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookOnShelf;
