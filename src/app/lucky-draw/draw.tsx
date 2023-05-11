'use client'
import React, { useState } from 'react';
import { accumulatePoint } from "@/utils";

const OPTION_POINT=[10_000,1_000,5_000]
const Draw = () => {
  const [point, setPoint] = useState(0);
  const drawLuck=()=>{
    let luckyPoint=OPTION_POINT[Math.floor(Math.random() * OPTION_POINT.length)]
    setPoint(luckyPoint)
    accumulatePoint(luckyPoint)
  }
  return (
    <>
      <p>Horray You got {point}</p>
      <button onClick={drawLuck}>Draw Luck</button>
    </>
  );
};

export default Draw;
