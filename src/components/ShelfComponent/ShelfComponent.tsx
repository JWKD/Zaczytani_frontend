import { Link } from 'react-router-dom';
import defaultImage from '../../assets/defaultCover.jpg';
import defaultImageBlank from '../../assets/defaultCover.jpg';
import styles from './ShelfComponent.module.scss';
import { Shelf } from '../../interfaces/Shelf';
export interface ShelfComponentProps {
  shelf: Shelf;
}

const ShelfComponent: React.FC<ShelfComponentProps> = ({ shelf }) => {
  return (
    <div className={styles.shelfContainer}>
      <div className={styles.booksContainer}>
        {shelf.imageUrl
          ?.slice(0, 2)
          .map((image: string, index) => (
            <img key={index} src={image || defaultImage} className={styles.images} alt={`okładka`} />
          ))}
        <Link to={`/bookshelf/getBookshelf/${shelf.id}`} className={styles.imageWithText}>
          <img src={defaultImageBlank} className={styles.images} alt="Book Cover" />
          <div className={styles.textOverlay}>Zobacz więcej...</div>
        </Link>
      </div>
      <div className={styles.bar}></div>
      <div className={styles.text}>{shelf.name}</div>
    </div>
  );
};

export default ShelfComponent;
