import styles from './AddShelfPopUp.module.scss';
import defaultImage from '../../assets/DefaultBookCover.png';
import Plus from '../../icons/Plus';

function AddShelfPopUp() {
  return (
    <div className={styles.shelfPopUpContainer}>
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
        <input placeholder=""></input>
      </div>
    </div>
  );
}

export default AddShelfPopUp;
