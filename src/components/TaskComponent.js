import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterDone, setFilterDone] = useState(null);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [filterDone, sortOrder]);

  const fetchTasks = async () => {
    try {
      let url = "/api/tasks";
      if (filterDone !== null) {
        url = `/api/tasks/done?done=${filterDone}`;
      } else if (sortOrder) {
        url = `/api/tasks/sorted?order=${sortOrder}`;
      }
      const response = await axios.get(url);
      const formattedTasks = response.data.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt).toLocaleString(),
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tasks", { description: newTask });
      const createdTask = response.data;
      setTasks([...tasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (id, done) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, { done });
      const updatedTask = response.data;
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
    }
  };

  return (
    <div
      className="task-component"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <h1>Tasks</h1>
      <div>
        <label>Filter by Done:</label>
        <select
          value={filterDone || "all"}
          onChange={(e) =>
            setFilterDone(e.target.value === "all" ? null : e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="true">Done</option>
          <option value="false">Not Done</option>
        </select>
      </div>
      <div>
        <label>Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul style={{ padding: 0, listStyleType: "none" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <span
              style={{ textDecoration: task.done ? "line-through" : "none" }}
            >
              {task.description}
            </span>
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: task.done ? "yellow" : "green",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleUpdateTask(task.id, !task.done)}
            >
              {task.done ? "Undo" : "Done"}
            </button>
            <br />
            <small>Created At: {task.createdAt}</small>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateTask} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task description"
          required
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskComponent;
