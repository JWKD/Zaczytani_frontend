import styles from './AddShelfComponent.module.scss';
import defaultImage from '../../../assets/DefaultBookCover.png';
import Plus from '../../../icons/Plus';

function AddShelfComponent() {
  return (
    <div className={styles.shelfContainer}>
      <div className={styles.booksContainer}>
        <img src={defaultImage} className={styles.images} alt="Book Cover" />
        <div className={styles.imageWithText}>
          <img src={defaultImage} className={styles.images} alt="Book Cover" />
          <div className={styles.textOverlay}>
            <Plus />
          </div>
        </div>
        <img src={defaultImage} className={styles.images} alt="Book Cover" />
      </div>
      <div className={styles.bar}></div>
      <div className={styles.text}>Dodaj nową półkę</div>
    </div>
  );
}

export default AddShelfComponent;
