import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:9090/api/tasks");
    setTasks(response.data);
  };

  const handleToggleDone = async (task) => {
    task.done = !task.done;
    await axios.put(`http://localhost:9090/api/tasks/${task.id}`, task);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : filter === "done" ? task.done : !task.done
  );

  const sortedTasks = filteredTasks.sort((a, b) =>
    sort === "date"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : a.description.localeCompare(b.description)
  );

  return (
    <div>
      <div>
        <label>
          Filter:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="not-done">Not Done</option>
          </select>
        </label>
        <label>
          Sort by:
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date</option>
            <option value="description">Description</option>
          </select>
        </label>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.done ? "line-through" : "none" }}
            >
              {task.description}
            </span>
            <button onClick={() => handleToggleDone(task)}>
              {task.done ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
