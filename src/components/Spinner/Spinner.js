import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Loader type="ThreeDots" color="#3F51B5" height={80} width={80} />
    </div>
  );
};

export default Spinner;
