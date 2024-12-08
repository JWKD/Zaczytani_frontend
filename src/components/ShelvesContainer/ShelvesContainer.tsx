import { useEffect, useState } from 'react';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import styles from './ShelvesContainer.module.scss';
import DotHorizontal from '../../icons/DotsHorizontal';
import { Shelf } from '../../interfaces/Shelf';
import AddShelfComponent from '../ShelfComponent/AddSheflComponent/AddSheflComponent';
import dataApi from '../../api/shelvesApi';
import AfterShakeForm from '../AfterShakeForm/AfterShakeForm';
import AddShelfPopUp from '../AddShelfPopUp/AddShelfPopUp';

function ShelvesContainer() {
  const [shelves, setShelves] = useState<Shelf[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickadd, SetClickAdd] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getShelves();
        setShelves(result);
      } catch (err) {
        setError('Wystąpił nieoczekiwany problem');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleClick() {
    SetClickAdd(true);
  }

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : clickadd ? (
    <AddShelfPopUp />
  ) : (
    <div className={styles.shelvesContainer}>
      <div className={styles.title}>
        <DotHorizontal />
        <h2 className={styles.text}>Moja biblioteczka</h2>
      </div>
      <div className={styles.shelvesGrid}>
        {shelves?.map((shelf, index) => <ShelfComponent key={index} shelf={shelf} />)}
        <button className={styles.addShelfButton} onClick={handleClick}>
          <AddShelfComponent />
        </button>
      </div>
    </div>
  );
}

export default ShelvesContainer;
