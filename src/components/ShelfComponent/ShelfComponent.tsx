import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/DefaultBookCover.png';
import styles from './ShelfComponent.module.scss';
import { Book } from '../../interfaces/book';
import { Shelf } from '../../interfaces/Shelf';
import dataApi from '../../api/shelvesApi';

interface ShelfComponentProps {
  shelf: Shelf;
}

const ShelfComponent: React.FC<ShelfComponentProps> = ({ shelf }) => {
  const [books, setBook] = useState<Book[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getShelfBooks(shelf.id);
        setBook(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shelf.id]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.shelfContainer}>
      <div className={styles.booksContainer}>
        {books
          ?.slice(0, 2)
          .map((books: Book, index) => (
            <img key={index} src={books.imageUrl || defaultImage} className={styles.images} alt={books.title} />
          ))}
        <Link to="/user/shelf/details" className={styles.imageWithText}>
          <img src={defaultImage} className={styles.images} alt="Book Cover" />
          <div className={styles.textOverlay}>Zobacz więcej...</div>
        </Link>
      </div>
      <div className={styles.bar}></div>
      <div className={styles.text}>{shelf.name}</div>
    </div>
  );
};

export default ShelfComponent;
