import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskCreated }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/api/tasks", {
        description,
        done: false,
        createdAt: new Date().toISOString(),
      });
      onTaskCreated(response.data);
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
