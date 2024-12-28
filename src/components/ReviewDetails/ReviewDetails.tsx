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
import SingleReview from '../SingleReview/SingleReview';

interface ReviewDetailsProps {
  bookId: string;
}

function ReviewDetails({ bookId }: ReviewDetailsProps) {
  const [review, setReview] = useState<ReviewPage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [singleReview, setSingleReview] = useState<Review>();
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [commentAdded, setCommentAdded] = useState<boolean>(false);

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
  }, [bookId, commentAdded]);

  useEffect(() => {
    changeToSingleReview();
  }, [review]);

  const changeToSingleReview = () => {
    if (review) {
      setSingleReview({
        id: review.id,
        content: review.content,
        rating: review.rating,
        likes: review.likes,
        comments: review.comments.length,
        notesCount: review.notes.length,
        user: review.user,
      });
    }
  };

  const postComment = async () => {
    if (validateForm()) {
      try {
        if (review && comment) {
          const comm = {
            content: comment,
          };
          await reviewApi.postComment(review.id, comm);
          setCommentAdded(!commentAdded);
          setComment('');
        }
      } catch (error) {
        console.error('Błąd podczas przesyłania komentarza:', error);
      }
    }
  };

  const handleChangeComment = (content: string) => {
    setComment(content);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (comment.length > 300 || comment.length <= 10) {
      newErrors.comment = 'Komentarz musi być dłuższy niż 10 znaków i krótszy niż 300 znaków!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
          {singleReview && (
            <div className={styles.review}>{<SingleReview key={JSON.stringify(singleReview)} {...singleReview} />}</div>
          )}
          <div className={styles.notes}>
            {review.notes.map((note, id) => (
              <div className={styles.note} key={id}>
                <div className={styles.noteHeader} id={note.id}>
                  <div className={styles.noteNumber}>Notka nr {id + 1}:</div>
                  <div className={styles.noteProgress}>
                    <p className={styles.progressName}>Progres:</p>
                    <ProgressBar current={note.progress} max={review.book.pageNumber} />
                  </div>
                  <div className={styles.noteRating}>
                    <Star />
                    <p>{review.rating + '  / 10'}</p>
                  </div>
                </div>
                {note.containsSpoilers ? (
                  <div className={styles.noteContentBlurred}>{note.content}</div>
                ) : (
                  <div className={styles.noteContent}>{note.content}</div>
                )}
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
            <div className={styles.commentsHeader}>Dodaj komentarz</div>
            <div className={styles.addComment}>
              <div className={styles.inputContainer}>
                <div className={styles.contentContener}>
                  <textarea
                    className={styles.content}
                    placeholder="Tutaj pisz..."
                    onChange={(e) => handleChangeComment(e.target.value)}
                    value={comment ?? ''}
                  ></textarea>
                </div>
                {errors.comment && <div className={styles.error}>{errors.comment}</div>}
              </div>
              <div className={styles.update} onClick={() => postComment()}>
                Dodaj
              </div>
            </div>

            <div className={styles.commentsHeader}>Komentarze</div>
            {review.comments.map((comment) => (
              <div className={styles.comment} key={comment.id}>
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
