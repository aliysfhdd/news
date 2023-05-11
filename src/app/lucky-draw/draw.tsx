'use client'
import React, {useEffect, useState} from 'react';
import {accumulatePoint, getCurrentTicket, numberFormat} from "@/utils";

const OPTION_POINT=[50_0000,20_000,10_000,0]
const Draw = () => {
  const [point, setPoint] = useState(0);
  const [ticket, setTicket] = useState(0);
  const drawLuck=()=>{
    if(ticket>0){
      let isHaveBigPoint=JSON.parse(localStorage.getItem('big_point') || 'false')
      let luckyPoint;
      if(isHaveBigPoint){
        luckyPoint=OPTION_POINT.slice(1)[Math.floor(Math.random() * (OPTION_POINT.length-1))]
      }
      else{
        luckyPoint=OPTION_POINT[Math.floor(Math.random() * OPTION_POINT.length)]
      }
      if(luckyPoint===0){
        alert("Oops, you got nothing. Try again later!")
      }
      if(luckyPoint===OPTION_POINT[0]){
        localStorage.setItem('big_point', 'true')
      }
      accumulatePoint(luckyPoint,ticket)
      setPoint(luckyPoint)
      setTicket((current)=>current-1)
    }
    else{
      alert("You didn't have enough ticket")
    }
  }
  useEffect(()=>{
    setTicket(getCurrentTicket())
  },[])
  return (
    <>
      {point>0 && <p>Horray You got {numberFormat(point)}</p>}
      <p>Your ticket: {ticket}</p>
      <button onClick={drawLuck}>Draw Luck</button>
    </>
  );
};

export default Draw;
