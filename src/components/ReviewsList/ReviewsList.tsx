import Arrow from '../../icons/Arrow';
import Like from '../../icons/Like';
import Comments from '../../icons/Comments';
import styles from './ReviewsList.module.scss';
import Star from '../../icons/Star';
import profilePicture from '../../assets/profilePicture.png';

interface ReviewsListProps {
  bookId: string;
}

function ReviewsList({ bookId }: ReviewsListProps) {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.leftContainer}>
        <img src={profilePicture} alt="Avatar" />
        <div className={styles.details}>
          <p>
            <strong>Ilość notek:</strong> 5
          </p>
          <span>
            <Arrow />
          </span>

          <div className={styles.likesAndComm}>
            <span>
              <Like /> 32
            </span>
            <span>
              <Comments /> 12
            </span>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.header}>
          <div className={styles.reviewName}>Weronika Sowa</div>
          <div className={styles.reviewRating}>
            <Star />
            <p>8 / 10</p>
          </div>
        </div>
        <div className={styles.reviewContent}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam debitis eveniet, fugiat obcaecati unde atque
          sit labore cupiditate dolor qui possimus consequuntur nihil cumque vitae perferendis repudiandae, laudantium
          velit mollitia.
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
