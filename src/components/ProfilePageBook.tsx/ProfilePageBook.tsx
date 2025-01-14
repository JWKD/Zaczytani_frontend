import { Link } from 'react-router-dom';
import { Book } from '../../interfaces/book';
import styles from './ProfilePageBook.module.scss';
import defaultImage from '../../assets/defaultCover.jpg';
import RatingIcon from '../../icons/RatingIcon';
import Star from '../../icons/Star';

export interface ProfileBook {
  book: Book;
  fullStar: boolean;
}

const ProfilePageBook: React.FC<ProfileBook> = ({ book, fullStar }) => {
  return (
    <div className={styles.bookContainer}>
      <Link to={`/books/${book.id}`}>
        <img src={book.imageUrl || defaultImage} className={styles.image} alt={book.title}></img>
      </Link>
      <div className={styles.bookTitle}>{book.title}</div>
      <div className={styles.bookAuthor}>
        <ul>
          {book.authors.slice(0, 1).map((author) => (
            <li key={author.id} className={styles.authorName}>
              {author.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.ratingContainer}>
          {fullStar ? <RatingIcon /> : <Star />}
          <p className={styles.rating}>{Math.floor(book.rating)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageBook;
