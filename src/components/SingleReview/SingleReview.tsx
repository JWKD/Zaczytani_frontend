import { useState } from 'react';
import { Review } from '../../interfaces/review';
import reviewApi from '../../api/reviewApi';
import Arrow from '../../icons/Arrow';
import Comments from '../../icons/Comments';
import Star from '../../icons/Star';
import Liked from '../../icons/Liked';
import Like from '../../icons/Like';
import styles from './SingleReview.module.scss';
import profilePicture from '../../assets/profilePicture.png';
import { useNavigate } from 'react-router-dom';

function SingleReview(initialReview: Review) {
  const [review, setReview] = useState<Review>(initialReview);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();

  const postLike = async (id: string) => {
    try {
      await reviewApi.postLike(id);
      setIsLiked(true);
      setReview((prevReview) => ({ ...prevReview, likes: prevReview.likes + 1 }));
    } catch (error) {
      console.error('Błąd podczas polubienia:', error);
    }
  };

  const postUnlike = async (id: string) => {
    try {
      await reviewApi.postUnlike(id);
      setIsLiked(false);
      setReview((prevReview) => ({ ...prevReview, likes: prevReview.likes - 1 }));
    } catch (error) {
      console.error('Błąd podczas cofnięcia polubienia:', error);
    }
  };

  const handleLike = (id: string) => {
    isLiked ? postUnlike(id) : postLike(id);
  };

  const handleComment = () => {
    navigate(`/review/${review.id}`);
  };

  const handleReport = () => {
    navigate(`/report/${review.id}`);
  };

  return (
    <div className={styles.reviewContainer} id={review.id}>
      <div className={styles.leftContainer}>
        <img src={review.user.imageUrl ?? profilePicture} alt="Avatar" />
        <div className={styles.details}>
          <p>
            <strong>Ilość notek:</strong> {review.notesCount}
          </p>
          <span className={styles.report} title="Zgłoś użytkownika" onClick={() => handleReport()}>
            <Arrow />
          </span>

          <div className={styles.likesAndComm}>
            <span onClick={() => handleLike(review.id)}>
              {isLiked && <Liked />}
              {!isLiked && <Like />}
              {review.likes}
            </span>
            <span onClick={() => handleComment()}>
              <Comments /> {review.comments}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.header}>
          <div className={styles.reviewName}>{review.user.firstName + ' ' + review.user.lastName} </div>
          <div className={styles.reviewRating}>
            <Star />
            <p>{review.rating + '  / 10'}</p>
          </div>
        </div>
        <div className={styles.reviewContent}>{review.content}</div>
      </div>
    </div>
  );
}

export default SingleReview;
