import React, { useEffect, useState } from "react";
import {padStart} from 'lodash';
import '../../App.css';

//set Time at start from Click in CurrentTime
//get Current time
//subtract time at start from current time
//WhileTracking CountUp


const Timer = (props) => {
  const tracking = useState(props.isTracking);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  let strSecs = ""
  let strMins = ""
  let strHours = ""
  useEffect(() => {
    let interval = null;
    if (tracking && seconds < 59) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      } , 1000);
    }
    else if (tracking && seconds === 59 && minutes < 59) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds = 0);
        setMinutes(minutes => minutes + 1);
      } , 1000);
    }
    else if (tracking && seconds === 59 && minutes === 59) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds = 0);
        setMinutes(minutes => minutes = 0);
        setHours(hours => hours +1 );
      } , 1000);
    }
    else if (!tracking) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });
  strSecs = seconds.toString();
  strMins = minutes.toString();
  strHours = hours.toString();
  let display = 
    padStart(strHours, 2, "0") 
    + ":"
    + padStart(strMins, 2, "0")
    + ":"
    + padStart(strSecs, 2, "0");
  return (
      <p className="timer-display">
        { display }
      </p>
    )
}


export default Timer;