import ShakeButton from '../../components/ShakeButton/ShakeButton';
import ShelvesContainer from '../../components/ShelvesContainer/ShelvesContainer';
import styles from './Home.module.scss';
function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.leftPanel}>
        <ShakeButton />
      </section>
      <section className={styles.rightPanel}>
        <ShelvesContainer />
      </section>
    </div>
  );
}

export default Home;
