import { useEffect, useState } from 'react';
import { Review, ReviewPage } from '../../interfaces/review';
import reviewApi from '../../api/reviewApi';
import styles from './ReviewDetails.module.scss';
import DotHorizontal from '../../icons/DotsHorizontal';
import defaultCover from '../../assets/defaultCover.jpg';
import ProgressBar from '../ProgressBar/ProgressBar';
import Star from '../../icons/Star';
import Checked from '../../icons/Checked';
import profilePicture from '../../assets/profilePicture.png';

interface ReviewDetailsProps {
  bookId: string;
}
function ReviewDetails({ bookId }: ReviewDetailsProps) {
  const [review, setReview] = useState<ReviewPage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await reviewApi.getReview(bookId);
        setReview(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.reviewContainer}>
      {review && (
        <div>
          <div className={styles.reviewHeader}>
            <span>
              <DotHorizontal />
            </span>
            Recenzja
          </div>
          <div className={styles.detailsCover}>
            <img src={review?.book.imageUrl ?? defaultCover} alt="Okładka" />
            <div className={styles.details}>
              <p className={styles.title}>{review.book.title}</p>
              <p className={styles.authors}>{review.book.authors.map((author) => author.name).join(', ')}</p>
              <p className={styles.series}>
                <strong>Cykl: </strong>
                {review.book.series}
              </p>
            </div>
          </div>
          <div className={styles.review}>
            {
              //<SingleReview {...review} />
            }
            Wygląd tego jajca
          </div>
          <div className={styles.notes}>
            {review.notes.map((note, id) => (
              <div className={styles.note}>
                <div className={styles.noteHeader} id={note.id}>
                  <div className={styles.noteNumber}>Notatka nr {id + 1}</div>
                  <div className={styles.noteProgress}>
                    <p className={styles.progressName}>Progres:</p>
                    <ProgressBar current={note.progress} max={review.book.pageNumber} />
                  </div>
                  <div className={styles.noteRating}>
                    <Star />
                    <p>{review.rating + '  / 10'}</p>
                  </div>
                </div>
                <div className={styles.noteContent}>{note.content}</div>
                <div className={styles.spoiler}>
                  <div className={styles.checkboxContainer}>
                    {note.containsSpoilers ? (
                      <div className={styles.checked}>
                        <Checked />
                      </div>
                    ) : (
                      <div className={styles.unchecked}></div>
                    )}
                  </div>
                  <p>zawiera spoilery</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsHeader}>Komentarze</div>
            {review.comments.map((comment) => (
              <div className={styles.comment} id={comment.id}>
                <img src={comment.user.imageUrl ?? profilePicture} alt="Avatar" />
                <div className={styles.rightPanel}>
                  <div className={styles.userName}>{comment.user.firstName + ' ' + comment.user.lastName}</div>
                  <div className={styles.commentContent}>{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewDetails;
