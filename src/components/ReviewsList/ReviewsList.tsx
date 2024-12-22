import Arrow from '../../icons/Arrow';
import Like from '../../icons/Like';
import Comments from '../../icons/Comments';
import styles from './ReviewsList.module.scss';
import Star from '../../icons/Star';
import profilePicture from '../../assets/profilePicture.png';
import { useEffect, useState } from 'react';
import { Review } from '../../interfaces/review';
import bookApi from '../../api/bookApi';

interface ReviewsListProps {
  bookId: string;
}

function ReviewsList({ bookId }: ReviewsListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await bookApi.getReviews(bookId);
        setReviews(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.reviews}>
      {reviews.map((review: Review) => (
        <div className={styles.reviewContainer}>
          <div className={styles.leftContainer}>
            <img src={review.user.imageUrl ?? profilePicture} alt="Avatar" />
            <div className={styles.details}>
              <p>
                <strong>Ilość notek:</strong> {review.notesCount}
              </p>
              <span>
                <Arrow />
              </span>

              <div className={styles.likesAndComm}>
                <span>
                  <Like /> {review.likes}
                </span>
                <span>
                  <Comments /> {review.comments}
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam debitis eveniet, fugiat obcaecati unde
              atque sit labore cupiditate dolor qui possimus consequuntur nihil cumque vitae perferendis repudiandae,
              laudantium velit mollitia.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
