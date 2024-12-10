import { useEffect, useState } from 'react';
import { Book } from '../../interfaces/book';
import dataApi from '../../api/shelvesApi';
import { Shelf } from '../../interfaces/Shelf';
import styles from './ShelfDetailsComponent.module.scss';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import BookIcon from '../../icons/BookIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import defaultImage from '../../assets/defaultCover.png';

interface ShelfDetailsProps {
  id: string;
}

function ShelfDetailsComponent({ id }: ShelfDetailsProps) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shelf, setShelf] = useState<Shelf>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultShelf = await dataApi.getShelf(id);
        setShelf(resultShelf);
        const resultShelfBooks = await dataApi.getShelfBooks(id);
        setBooks(resultShelfBooks);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  async function handleChangeNameClick() {
    try {
      const resultShelf = await dataApi.getShelf(id);
      console.log(resultShelf);
      setShelf(resultShelf);
      const resultShelfBooks = await dataApi.getShelfBooks(id);
      setBooks(resultShelfBooks);
      console.log(resultShelfBooks);
    } catch (err) {
      setError('Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  }
  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.pageContainer}>
      <section className={styles.leftPanel}>
        <div className={styles.title}>
          <h2 className={styles.text}>Moja biblioteczka</h2>
          <BookIcon />
        </div>
        <div className={styles.shelfContainer}>{shelf && <ShelfComponent shelf={shelf} />}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.changeNameButton} onClick={handleChangeNameClick}>
            Zmień nazwę półki
          </button>
          <button className={styles.deleteButton}>Usuń półkę</button>
        </div>
      </section>
      <section className={styles.rightPanel}>
        <div className={styles.shelfTitle}>
          <DotHorizontal />
          <h2 className={styles.shelfText}>Półka {shelf?.name}</h2>
        </div>
        <div className={styles.booksContainer}>
          {books?.map((books: Book, index) => (
            <img key={index} src={books.imageUrl || defaultImage} className={styles.images} alt={books.title} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShelfDetailsComponent;
