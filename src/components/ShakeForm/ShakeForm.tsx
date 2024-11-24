import { useState } from 'react';
import ShakeButton from '../ShakeButton/ShakeButton';
import styles from './ShakeForm.module.scss';
import image from '../../assets/shakeImage.png';
import confetti from 'canvas-confetti';

function ShakeForm() {
  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    launchConfetti();
    setTimeout(() => {
      setIsShaking(false);
    }, 1200);
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      startVelocity: 40,
      ticks: 200,
      colors: ['#ff6f61', '#ffcc00', '#66ff66', '#33ccff'],
    });
  };

  return (
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
