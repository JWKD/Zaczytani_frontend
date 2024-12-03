import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/DefaultBookCover.png';
import styles from './ShelfComponent.module.scss';
import { Book } from '../../interfaces/book';
import { Shelf } from '../../interfaces/Shelf';

interface ShelfComponentProps {
  shelf: Shelf;
}

const ShelfComponent: React.FC<ShelfComponentProps> = ({ shelf }) => {
  return (
    <div className={styles.shelfContainer}>
      <div className={styles.booksContainer}>
        {shelf.books.slice(0, 2).map((book: Book, index) => (
          <img key={index} src={book.imageUrl || defaultImage} className={styles.images} alt={book.title} />
        ))}
        <Link to="/user/shelf/details" className={styles.imageWithText}>
          <img src={defaultImage} className={styles.images} alt="Book Cover" />
          <div className={styles.textOverlay}>Zobacz więcej...</div>
        </Link>
      </div>
      <div className={styles.bar}></div>
      <div className={styles.text}>{shelf.title}</div>
    </div>
  );
};

export default ShelfComponent;
