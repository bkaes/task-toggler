import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';

import Timer from '../Timer/Timer';
import { clamp, distance } from '@popmotion/popcorn';
import { motion, useMotionValue } from 'framer-motion';
import move from 'array-move';
import { findIndex, Position } from './find-index';
const playButton = require('../../Assets/noun_play.svg') as string;
const stopButton = require('../../Assets/noun_square.svg') as string;


const TaskItem = ({ id, setPosition, moveItem, i, onClick, offClick }) => {
  let [isTracking, setIsTracking] = useState(false);
  const [taskName, setTaskName] = useState('Task Name');
  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef(null);
  const dragOriginY = useMotionValue(0);
  const change = () => setNameIsClicked(false);

  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });
  useEffect(() => {
    
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        change();
        console.log("Enter key was pressed. Run your function.")
        // callMyFunction();
      }
    };

    document.addEventListener("keydown", listener);
    console.log("Enter key was pressed. Run your function.")
    return () => {
    document.removeEventListener("keydown", listener);
    };

  }, []);
  const onClickity = () => {
    setIsChecked(!isChecked);
    if (isChecked === false) {
      onClick()
    }
    else {
      offClick()
    }
  }
  return (

    <motion.li className="task-item"
      ref={ref}
      initial={false}
      animate={isDragging ? onTop : flat}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.04 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      <input className="checkbox" type="checkbox" onChange={onClickity} />
      <div className="task-name">
      {!nameIsClicked && <p onClick={()=>setNameIsClicked(true)}>{taskName}</p>}
      {nameIsClicked && <input id='input' type="text" placeholder={taskName} onChange={e => setTaskName(e.target.value)} onBlur={change}/>}
      </div>
      
      {!isTracking && <p className="timer-display"> </p>}
      {isTracking && < Timer isTracking={isTracking} />}
      <button className="task-time-button"
        onClick={() => {
          setIsTracking(isTracking = !isTracking);
        }}>
        {isTracking && <img src={stopButton} />}
        {!isTracking && <img src={playButton} />}
      </button>
    </motion.li>
  )
}
export default TaskItem;

  // Spring configs
  const onTop = { zIndex: 1 };
  const flat = {
  zIndex: 0,
  transition: { delay: 0 }
  };
  
  const heights = {
  number : 1200
  };
  