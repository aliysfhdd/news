'use client'
import React from 'react';
import styles from './error.module.css';

const Error = () => {
  return (
    <div className={styles.error}>
      Ooops... currently too many request
    </div>
  );
};

export default Error;
