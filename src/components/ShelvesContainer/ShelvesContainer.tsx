import { useEffect, useState } from 'react';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import styles from './ShelvesContainer.module.scss';
import DotHorizontal from '../../icons/DotsHorizontal';
import { Shelf } from '../../interfaces/Shelf';
import AddShelfComponent from '../ShelfComponent/AddSheflComponent/AddSheflComponent';
import shelfApi from '../../api/shelvesApi';
import AddShelfPopUp from '../AddShelfPopUp/AddShelfPopUp';
import CatLoader from '../CatLoader/CatLoader';

function ShelvesContainer() {
  const [shelves, setShelves] = useState<Shelf[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickAdd, SetClickAdd] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const result = await shelfApi.getShelves();
      setShelves(result.slice().reverse());
    } catch (err) {
      setError('Wystąpił nieoczekiwany problem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeValue = (newValue: boolean) => {
    fetchData();
    SetClickAdd(newValue);
  };

  function handleClick() {
    SetClickAdd(true);
  }

  return loading ? (
    <div style={{ width: '300px' }}>
      <CatLoader />
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : clickAdd ? (
    <AddShelfPopUp onChangeValue={handleChangeValue} />
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
