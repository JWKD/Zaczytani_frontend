import ProgressComponent from '../../components/ProgressComponent/ProgressComponent';
import ShakeButton from '../../components/ShakeButton/ShakeButton';
import ShelvesContainer from '../../components/ShelvesContainer/ShelvesContainer';
import BookIcon from '../../icons/BookIcon';
import styles from './Home.module.scss';
function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.leftPanel}>
        <div className={styles.titleContainer}>
          <p className={styles.componentName}>Aktualnie czytane</p>
          <BookIcon />
        </div>
        <ProgressComponent />
        <ShakeButton />
      </section>
      <section className={styles.rightPanel}>
        <ShelvesContainer />
      </section>
    </div>
  );
}

export default Home;
