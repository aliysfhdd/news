import React from 'react';
import Draw from "@/app/lucky-draw/draw";
import styles from './page.module.css';

const LuckyDraw = () => {
  return (
    <div className={styles.luckyDraw}>
      See Your Luck!
      <Draw/>
    </div>
  );
};

export default LuckyDraw;
