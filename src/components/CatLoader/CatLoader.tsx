import React from 'react';
import styles from './CatLoader.module.scss';

const CatLoader: React.FC = () => {
  return (
    <div className={styles.cat}>
      <div className={styles.catBody}></div>
      <div className={styles.catBody}></div>
      <div className={styles.catTail}></div>
      <div className={styles.catHead}></div>
    </div>
  );
};

export default CatLoader;
