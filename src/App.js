import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './Components/TaskList/TaskList.tsx';



function App() {
  return (
    <div className="App">
      <header> <h1>Task Tracker</h1>  </header>
      <body>
        <TaskList />

      </body>
    </div>
  );
}

export default App;
