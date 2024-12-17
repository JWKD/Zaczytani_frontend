import { useState } from 'react';
import ShakeButton from '../ShakeButton/ShakeButton';
import styles from './ShakeForm.module.scss';
import image from '../../assets/shakeImage.png';
import confetti from 'canvas-confetti';
import dataApi from '../../api/bookApi';
import { Book } from '../../interfaces/book';
import AfterShakeForm from '../AfterShakeForm/AfterShakeForm';

function ShakeForm() {
  const [isShaking, setIsShaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [myBook, setBook] = useState<Book>();
  const [isShakingBook, setIsShakingBook] = useState(false);
  const handleShake = () => {
    setIsShaking(true);

    const saveData = async () => {
      try {
        const result = await dataApi.postRandomBook();
        setBook(result);
        setIsShakingBook(true);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      saveData();
      setIsShaking(false);
      launchConfetti();
    }, 1200);
    launchConfetti();
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 350,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      startVelocity: 40,
      ticks: 200,
      colors: ['#ff6f61', '#ffcc00', '#66ff66', '#33ccff'],
    });
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : isShakingBook ? (
    <AfterShakeForm book={myBook} />
  ) : (
    <div className={styles.shakeomatContainer}>
      <ShakeButton />
      <div className={styles.shakeomatMain}>
        <img src={image} alt="Book" className={`${styles.shakeomatBookImage} ${isShaking ? styles.animate : ''}`} />
        <button className={styles.shakeomatActionButton} onClick={handleShake}>
          Szejk szejk!
        </button>
      </div>
    </div>
  );
}

export default ShakeForm;
