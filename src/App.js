import React, { useState } from 'react';
import TaskComponent from "./components/TaskComponent";

const App = () => {
    // const [tasks, setTasks] = useState([]);

    // const handleTaskCreated = (newTask) => {
    //     setTasks([...tasks, newTask]);
    // };

    return (
      <div>
        <h1>To-Do App</h1>
        <TaskComponent />
      </div>
    );
};

export default App;
