import React from 'react';
import PropTypes from 'prop-types';
import styles from './wrapper.module.css';

import Header from '../Header/Header';

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />

      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
