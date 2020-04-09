import React, {useState, useEffect, useRef} from 'react';
import '../../App.css';
import { clamp, distance } from '@popmotion/popcorn';
import {motion, useMotionValue } from 'framer-motion';
import move from 'array-move';
import { findIndex, Position } from './find-index';

import ProgressBar from '../ProgressBar/ProgressBar';
import TaskItem from './TaskItem';

function round_to_precision(x, precision) {
  var y = +x + (precision === undefined ? 0.5 : precision/2);
  return y - (y % (precision === undefined ? 1 : +precision));
}

export const TaskList = () => {
  const [nameIsClicked, setNameIsClicked] = useState(false);
  const [taskListName, setTaskListName] = useState('Task List');
  const change = () => setNameIsClicked(false);
  const [id,setId] = useState(initialId);
  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
    
  }
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setId(move(id, i, targetIndex));
  };
  
  useEffect(() => {
    
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        change();
        console.log("Enter key was pressed. Run your function.")
        // callMyFunction();
      }
    };
    if (nameIsClicked) {
    document.getElementById('input').addEventListener("keydown", listener);
    }
    return () => {
    if(nameIsClicked) {
      document.getElementById('input').removeEventListener("keydown", listener);
    }
    };

  },[]);
  const addElement = () => {
    let x = id.length;
    setId(id => [ x, ...id]);
    console.log(x);
    console.log(id)
  }
  

  return (
  <ul className="task-list">
  {!nameIsClicked && <h3 className="task-list-name" onClick={()=>setNameIsClicked(true)}>{taskListName}</h3>}
  {nameIsClicked && <input className="task-list-name" id='input' type="text" placeholder={taskListName} onChange={e => setTaskListName(e.target.value)} onBlur={change}/>}
  <ProgressBar itemCount={id.length} completedCount={count} />
  <button className="add-task-button" onClick={() => addElement()}> Add Task </button>
  {id.map((id, i) => (
  <TaskItem
  onClick={increment}
  offClick={decrement}
  key={id}
  i={i}
  id={id}
  setPosition={setPosition}
  moveItem={moveItem}
  />
  
  ))}
  </ul>
  );
  };

  export default TaskList;
  
  // Spring 

  const initialId = [0];
