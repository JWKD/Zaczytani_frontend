import styles from './ReviewsList.module.scss';
import { useEffect, useState } from 'react';
import { Review } from '../../interfaces/review';
import bookApi from '../../api/bookApi';
import SingleReview from '../SingleReview/SingleReview';

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
  }, [bookId]);

  return loading ? (
    <div></div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.reviews}>
      {reviews.map((review: Review) => (
        <SingleReview key={review.id} {...review} />
      ))}
    </div>
  );
}

export default ReviewsList;
