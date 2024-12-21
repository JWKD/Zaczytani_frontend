import { useEffect, useState } from 'react';
import { CurrentlyReadingBookDetails, CurrentlyReadingBookReview } from '../../interfaces/review';
import reviewApi from '../../api/reviewApi';
import styles from './CurrentlyReadingReview.module.scss';
import DotHorizontal from '../../icons/DotsHorizontal';
import defaultCover from '../../assets/defaultCover.jpg';
import StarFilled from '../../icons/StarFilled';
import StarEmpty from '../../icons/StarEmpty';
import Checked from '../../icons/Checked';
import { useNavigate } from 'react-router-dom';
import BookIcon from '../../icons/BookIcon';

interface CurrentlyReadingReviewProps {
  bookId: string;
}

function CurrentlyReadingReview({ bookId }: CurrentlyReadingReviewProps) {
  const [book, setBook] = useState<CurrentlyReadingBookDetails | null>(null);
  const [review, setReview] = useState<CurrentlyReadingBookReview>({
    content: '',
    rating: 1,
    progress: 0,
    isFinal: false,
    containsSpoilers: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await reviewApi.getCurrentlyReadingBookDetails(bookId);
        setBook(result);
        setReview({
          ...review,
          progress: result.progress,
        });
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const postReview = async () => {
    try {
      await reviewApi.postCurrentlyReadingBookReview(bookId, review);
    } catch (error) {
      console.error('Błąd podczas przesyłania recenzji:', error);
    }
  };

  const handleMouseEnter = (star: number) => setHovered(star);
  const handleMouseLeave = () => setHovered(null);
  const handleClick = (star: number) =>
    setReview({
      ...review,
      rating: star,
    });

  const toggleCheckbox = () => {
    setReview({
      ...review,
      containsSpoilers: !review.containsSpoilers,
    });
  };

  const handleChangeProgress = (pages: number) => {
    setReview({
      ...review,
      progress: pages,
    });
  };
  const handleChangeContent = (description: string) => {
    setReview({
      ...review,
      content: description,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleUpdate = () => {
    if (validateForm()) {
      postReview();
      navigate('/');
    }
  };
  const handleFinal = () => {
    if (validateForm()) {
      if (book)
        setReview({
          ...review,
          progress: book.pageNumber,
          isFinal: true,
        });
      navigate('/');
    }
  };

  useEffect(() => {
    if (review.isFinal) postReview();
  }, [review.isFinal]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (review.content && (review.content.length > 300 || review.content.length <= 10)) {
      newErrors.content = 'Recenzja musi być dłuższa niż 10 znaków i krótsza niż 300 znaków!';
    }
    if (book)
      if (
        !review.progress ||
        review.progress < 0 ||
        review.progress > book.pageNumber ||
        review.progress < book.progress
      ) {
        newErrors.pageNumber = `Liczba stron musi być większa od 0, większa/równa do poprzedniego progresu i mniejsza od ${book.pageNumber + 1}!`;
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.mainContainer}>
      <div className={styles.currentlyReading}>
        Aktualnie czytane
        <span>
          <BookIcon />
        </span>
      </div>
      {book && (
        <div className={styles.secondContainer}>
          <div className={styles.updateText}>
            <DotHorizontal />
            <p className={styles.updateTextP}>Zaktualizuj progres</p>
          </div>
          <div className={styles.thirdContainer}>
            <div className={styles.detailsCover}>
              <img src={book?.imageUrl ?? defaultCover} alt="Okładka" />
              <div className={styles.details}>
                <p className={styles.title}>{book.title}</p>
                <p className={styles.authors}>{book.authors.map((author) => author.name).join(', ')}</p>
                <p className={styles.series}>
                  <strong>Cykl: </strong>
                  {book.series}
                </p>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.page}>
                Jestem na stronie{' '}
                <input
                  type="number"
                  placeholder="numer strony"
                  onChange={(e) => handleChangeProgress(Number(e.target.value))}
                  value={review.progress === 0 ? '' : (review.progress ?? '')}
                />
                /{book.pageNumber}
              </div>
              {errors.pageNumber && <div className={styles.error}>{errors.pageNumber}</div>}
            </div>
            <div className={styles.rating}>
              <p>Ocena: </p>
              <div>
                {Array.from({ length: 10 }, (_, i) => {
                  const starIndex = i + 1;
                  const isFilled = hovered ? starIndex <= hovered : starIndex <= review.rating;

                  return (
                    <span
                      key={starIndex}
                      onMouseEnter={() => handleMouseEnter(starIndex)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(starIndex)}
                      style={{ cursor: 'pointer' }}
                    >
                      {isFilled ? <StarFilled /> : <StarEmpty />}
                    </span>
                  );
                })}
              </div>
            </div>
            <p className={styles.review}>Recenzja:</p>
            <div className={styles.inputContainerNext}>
              <div className={styles.contentContener}>
                <textarea
                  className={styles.content}
                  placeholder="Tutaj pisz..."
                  onChange={(e) => handleChangeContent(e.target.value)}
                  value={review.content ?? ''}
                ></textarea>
              </div>
              {errors.content && <div className={styles.error}>{errors.content}</div>}
            </div>
            <div className={styles.spoiler}>
              <div className={styles.checkboxContainer}>
                {review.containsSpoilers ? (
                  <div className={styles.checked} onClick={() => toggleCheckbox()}>
                    <Checked />
                  </div>
                ) : (
                  <div className={styles.unchecked} onClick={() => toggleCheckbox()}></div>
                )}
              </div>
              <p>zawiera spoilery</p>
            </div>
            <div className={styles.buttons}>
              <div className={styles.update} onClick={() => handleUpdate()}>
                Zaaktualizuj
              </div>
              <div className={styles.final} onClick={() => handleFinal()}>
                Ocena końcowa
              </div>
              <div className={styles.cancel} onClick={() => handleCancel()}>
                Anuluj
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentlyReadingReview;
